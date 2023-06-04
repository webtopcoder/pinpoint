import React, { useEffect, useState, useRef } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import { setCookie, getCookie } from 'cookies-next';
import ListViewModal from "@/components/User/InteractiveMap/ListView";
import {
  Col, InputNumber, Row, Slider, Button, Tooltip, Select, Form, Space, notification, Typography, Drawer, Spin, Segmented, Avatar
} from "antd";
import { FullscreenOutlined, UnorderedListOutlined, LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
import food from "@/public/images/landing/food.png";
import Layout from "../../../layout";
import { apiBaseUrl } from "@/utils/baseUrl";
import baseUrl from "@/utils/baseUrl";
import { categoryService, locationService } from "@/services/index";
import { browserName } from 'react-device-detect';
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";

const { Option } = Select;
const { Paragraph, Text } = Typography;

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};
var cityCircle = null;

const InteractiveMap = () => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    componentRestrictions: { country: "us" },
    fields: [
      "address_components",
      "adr_address",
      "formatted_address",
      "geometry",
      "name",
    ],
  };

  const markerDescription = (data) => {
    return `<div class="card mb-3" style="max-width: 640px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${faviconUrl}/avatar/${data?.arrivalImages[0]?.filepath}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${data?.title}</h5>
            <p class="card-text">${data?.description}</p>
            <p class="card-text"><small class="text-muted">Departure Time: ${new Date(data?.departureAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      hour12: true,
      minute: "2-digit",
      second: "2-digit",
    })
      }</small></p>
            <a onClick="window.open('${baseUrl}/profile/${data.partner?._id}/locations/${data._id}', '_blank')" type="button" class="btn btn-primary">View Detail</a>&nbsp&nbsp
            </div>
      </div>
    </div>`
    // <a id="directionButton" type="button" ><img width="30" height="30" src="${faviconUrl}/direction.png"/></a>&nbsp&nbsp
  }

  function directionbuttonfun() {
    setOpen(true);
    setLoading(true);
    setSelectlo(selectedItem);
    document.getElementById("sidebar").innerHTML = "";
    directionsRenderer.setPanel(document.getElementById("sidebar"));
    calculateAndDisplayRoute1(directionsService, directionsRenderer, selectedItem);
  }

  function attachEventToDirectionButton() {
    const directionButton = document.getElementById("directionButton");
    if (directionButton) {
      directionButton.addEventListener("click", directionbuttonfun);
    }
  }

  let selectedItem = "", selectedMode = "DRIVING", map, directionsService, directionsRenderer, markers = [];
  const formatter = (value) => `${value}mile`;
  const isWebDevice = useMedia('(min-width:700px)');
  const [open, setOpen] = useState(false);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [activeLocations, setActiveLocations] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [mapzoom, setZoom] = useState(10);
  const [api, contextHolder] = notification.useNotification();
  const [radiusLocations, setRadiusLocations] = useState([]);
  const faviconUrl = `${apiBaseUrl}`;
  const [position, setPosition] = useState();
  const [selectedlo, setSelectlo] = useState();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dirService, setDirservice] = useState();
  const [dirRender, setDirrender] = useState();
  const [inputValue, setInputValue] = useState(5);

  const { notify } = useNotify();
  const onClose = () => {
    setOpen(false);
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => {
          setCookie('notify', true); // - client side
          api.destroy()
        }}>
          Don't display agian
        </Button>
        <Button type="primary" size="small" onClick={() => api.destroy()}>
          Cancel
        </Button>
      </Space>
    );
    api.info({
      message: 'Info',
      description: <>
        <Paragraph>
          To view google map in safari browser, you need to configure following step.
        </Paragraph>
        <Paragraph>
          <Text strong>
            Safari-&gt;Preferences-Advanced-&gt;check "SHow Develop menu in menu bar". Now from the Develop menu select "Experiemental Features" and scroll down to "WebGL via Metal" and uncheck it.',
          </Text>
        </Paragraph>
      </>,
      btn,
      placement: 'bottomLeft',
      duration: null,
      onClose: close,
    });
  }

  async function onFinish(Form) {
    const result = await locationService.getAllLocations(false, true, Form);
    await setActiveLocations(result?.results)
    await setRadiusLocations([]);
  }

  async function onUpdateField(value) {
    const result = await categoryService.getSubcategory(value);
    const subarr = [];
    result?.subCategories?.map((item, index) => {
      const subitem = {
        value: item._id,
        label: item.name,
      };
      subarr.push(subitem);
    });
    setSubcategoryList(subarr);
  }

  async function ongetCategory() {
    const result = await categoryService.getCategory();
    await setCategoryInfo(result?.allcategories);
  }

  function setMapOnAll() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function hideMarkers() {
    setMapOnAll();
  }

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({
        lat: latitude,
        lng: longitude,
      });
    });

    document.querySelector(".search-field").value = ""
  }

  const onChange = (newValue) => {
    setInputValue(newValue);
    cityCircle.setRadius(newValue * 1000 * 1.6);
  };

  function createCenterControl() {
    let currentInfoWindow = null; // Track the currently opened info window
    const controlButton = document.createElement("button");
    // Set CSS for the control.
    controlButton.style.backgroundColor = "#fff";
    controlButton.style.border = "2px solid #fff";
    controlButton.style.borderRadius = "3px";
    controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlButton.style.color = "rgb(25,25,25)";
    controlButton.style.cursor = "pointer";
    controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
    controlButton.style.fontSize = "16px";
    controlButton.style.lineHeight = "38px";
    controlButton.style.margin = "8px 0 22px";
    controlButton.style.padding = "0 5px";
    controlButton.style.textAlign = "center";
    controlButton.textContent = "Show All Active";
    controlButton.title = "Click to recenter the map";
    controlButton.type = "button";
    // Setup the click event listeners: simply set the map to Chicago.

    controlButton.addEventListener("click", () => {
      controlButton.textContent === "Show All Active"
        ? (controlButton.textContent = "Hide All Active")
        : (controlButton.textContent = "Show All Active");
      if (controlButton.textContent === "Hide All Active") {

        for (var i = 0; i < activeLocations?.length; i++) {
          const location = `${activeLocations[i]?.mapLocation?.latitude},${activeLocations[i]?.mapLocation?.longitude}`
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(activeLocations[i]?.mapLocation?.latitude, activeLocations[i]?.mapLocation?.longitude),
            icon: {
              url: faviconUrl + "/avatar/" + activeLocations[i]?.partner?.category?.image?.filepath,
              scaledSize: new google.maps.Size(30, 50), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(15, 46), // anchor
            },
            draggable: true,
            map: map,
          });

          markers.push(marker);
          const infowindow = new google.maps.InfoWindow({
            content: markerDescription(activeLocations[i]),
            ariaLabel: "Food Truck",
          });

          marker.addListener("click", () => {
            selectedItem = location;
            if (currentInfoWindow) {
              currentInfoWindow.close();
            }
            infowindow.open({
              anchor: marker,
              map,
            });
            currentInfoWindow = infowindow; // Update the currently opened info window
          });

          infowindow.addListener("domready", attachEventToDirectionButton);
        }

      } else {
        hideMarkers();
      }
    });

    return controlButton;
  }

  useEffect(() => {
    const flag = getCookie('notify');
    browserName === "Safari" && flag === true ? openNotification() : "";
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({
        lat: latitude,
        lng: longitude,
      });
    });

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      setPosition({
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      });
    });

    ongetCategory();
    onFinish(false, true, []);
  }, []);


  useEffect(() => {
    map = new google.maps.Map(document.getElementById("interactive-map"), {
      center: position,
      zoom: mapzoom,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP],
      },
      gestureHandling: "greedy"
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true, // Suppress default markers
      map: map
    });
    setDirservice(directionsService);
    setDirrender(directionsRenderer);
    initMap();
  }, [position, activeLocations]);

  const handleSeg = (value) => {
    setLoading(true);
    dirRender.setPanel(document.getElementById("sidebar"));
    calculateAndDisplayRoute2(dirService, dirRender, value, selectedlo);
  };

  function initMap() {
    let currentInfoWindow = null; // Track the currently opened info window
    const centerControlDiv = document.createElement("div");
    const centerControl = createCenterControl(map);

    // Append the control to the DIV.
    centerControlDiv.appendChild(centerControl);

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    cityCircle = new google.maps.Circle({
      strokeColor: "#276f85",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#276f85",
      fillOpacity: 0.35,
      map,
      center: position,
      radius: inputValue * 1000 * 1.6,
    });

    new google.maps.Marker({
      position: position,
      map,
      title: "Hello World!",
    });
    setRadiusLocations([]);

    for (var i = 0; i < activeLocations?.length; i++) {
      var d = (google.maps.geometry?.spherical?.computeDistanceBetween(
        // new google.maps.LatLng(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2))),
        new google.maps.LatLng(position?.lat, position?.lng),
        new google.maps.LatLng(activeLocations[i]?.mapLocation?.latitude, activeLocations[i]?.mapLocation?.longitude)
      ))?.toFixed(2);


      if (d < inputValue * 1000 * 1.6) {

        const location = `${activeLocations[i]?.mapLocation?.latitude},${activeLocations[i]?.mapLocation?.longitude}`
        radiusLocations.push(activeLocations[i]);
        setRadiusLocations(radiusLocations);
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(activeLocations[i]?.mapLocation?.latitude, activeLocations[i]?.mapLocation?.longitude),
          icon: {
            url: faviconUrl + "/avatar/" + activeLocations[i]?.partner?.category?.image?.filepath,
            scaledSize: new google.maps.Size(30, 50), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(15, 46), // anchor
          },
          draggable: true,
          map: map,
        });

        const infowindow = new google.maps.InfoWindow({
          content: markerDescription(activeLocations[i]),
          // content: markerDescription(activeLocations[i]?.arrivalImages[0]?.filepath, activeLocations[i]?.title, activeLocations[i]?.description),
          ariaLabel: "Food Truck",
        });

        marker.addListener("click", () => {
          selectedItem = location;
          if (currentInfoWindow) {
            currentInfoWindow.close();
          }

          infowindow.open({
            anchor: marker,
            map,
          });

          currentInfoWindow = infowindow; // Update the currently opened info window
        });

        infowindow.addListener("domready", attachEventToDirectionButton);
      }
    }

    function showMarkers() {
      setMapOnAll(map);
    }

    map.addListener("dblclick", (e) => {
      // setMapOnAll(null);
      map.setZoom(mapzoom);
      // map.setCenter(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2)))
      map.setCenter(
        new google.maps.LatLng(e.latLng.toJSON().lat, e.latLng.toJSON().lng)
      );
      setPosition(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2)));
      // cityCircle.setCenter(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2)));
      cityCircle.setCenter(
        new google.maps.LatLng(e.latLng.toJSON().lat, e.latLng.toJSON().lng)
      );
    });

    google.maps.event.addDomListener(map, 'zoom_changed', function () {
      var zoom = map.getZoom();
      setZoom(zoom);
    });
  }

  function calculateAndDisplayRoute1(directionsService, directionsRenderer, location) {
    let mainMode;
    const end = location?.split(",");
    switch (selectedMode) {
      case 'BICYCLING':
        mainMode = google.maps.TravelMode.BICYCLING;
        break;
      case 'TRANSIT':
        mainMode = google.maps.TravelMode.TRANSIT;
        break;
      case 'WALKING':
        mainMode = google.maps.TravelMode.WALKING;
        break;
      default:
        mainMode = google.maps.TravelMode.DRIVING;
        break;
    }

    if (selectedItem !== "") {
      directionsService
        .route({
          origin: new google.maps.LatLng(position?.lat, position?.lng),
          destination: new google.maps.LatLng(end[0], end[1]),
          travelMode: mainMode,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          notify(
            "error",
            "No Support"
          );
        });
    }
  }

  function calculateAndDisplayRoute2(directionsService, directionsRenderer, mode, location) {
    selectedMode = mode;
    let mainMode;
    const end = location?.split(",");
    switch (selectedMode) {
      case 'BICYCLING':
        mainMode = google.maps.TravelMode.BICYCLING;
        break;
      case 'TRANSIT':
        mainMode = google.maps.TravelMode.TRANSIT;
        break;
      case 'WALKING':
        mainMode = google.maps.TravelMode.WALKING;
        break;
      default:
        mainMode = google.maps.TravelMode.DRIVING;
        break;
    }

    if (location !== "") {
      directionsService
        .route({
          origin: new google.maps.LatLng(position?.lat, position?.lng),
          destination: new google.maps.LatLng(end[0], end[1]),
          travelMode: mainMode,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          notify(
            "error",
            "No Support"
          );
        });
    }
  }

  const fullScreen = () => {
    const elementToSendFullscreen = map.getDiv().firstChild;
    if (isFullscreen(elementToSendFullscreen)) {
      exitFullscreen();
    } else {
      requestFullscreen(elementToSendFullscreen);
    }
  };

  function isFullscreen(element) {
    return (
      (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement) == element
    );
  }

  function requestFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullScreen) {
      element.msRequestFullScreen();
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  return (
    <>
      {contextHolder}
      <PageTitle page="INTERACTIVE MPA" />
      <div className="page-interactive-area bg-black">
        <div className="container">
          <div className="page-interactive-content">
            <h1>Where are the goods at?</h1>
            <span className="sub-title">BROUGHT TO YOU BY PINPOINT</span>
          </div>
          <div className="shout-area followers green-color">
            <div className="shout-body">
              <div className="shout-author vcard">
                <div className="avatar desktop">
                  <Image src={food} alt="user" className="shout-radius" />
                </div>
                <form className="search-form" action="javascript:void(0);">
                  <input
                    type="search"
                    className="search-field"
                    ref={inputRef}
                    placeholder="Enter Address or Share Location"
                  />
                  <button onClick={getCurrentLocation}>
                    <i className="bx bx-current-location"></i>
                  </button>
                </form>
              </div>
              <div className="shout-metadata">
                <p>Search Radius:</p>
                <Row>
                  <Col xs={24} sm={24} md={19} lg={19} xl={19}>
                    <Slider
                      tooltip={{
                        formatter,
                      }}
                      trackStyle={{
                        background: "#175594",
                      }}
                      handleStyle={{
                        background: "white",
                      }}
                      min={1}
                      max={50}
                      onChange={onChange}
                      value={typeof inputValue === "number" ? inputValue : 0}
                    />
                  </Col>
                  <Col xs={0} sm={0} md={3} lg={3} xl={3}>
                    <InputNumber
                      min={1}
                      max={50}
                      style={{
                        width: 60,
                        margin: "0 16px",
                      }}
                      value={inputValue}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
              </div>
            </div>
            <div className="shout-button-group">
              <div className="container">
                <div className="col-lg-12 col-md-12">
                  <Form
                    name="validate_other"
                    onFinish={onFinish}
                    style={{
                      maxWidth: 600,
                    }}
                    layout="vertical"
                  >
                    <Form.Item
                      name="category"
                      hasFeedback
                    >
                      <Select
                        size="large"
                        onChange={(e) => onUpdateField(e)}
                        placeholder="Select Category">
                        <Option key={0} value="all">All</Option>
                        {categoryInfo?.map((option, index) => (
                          <Option key={index + 1} value={option._id}>{option.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="subcategory"
                      hasFeedback
                    >
                      <Select
                        mode="multiple"
                        showSearch={false}
                        allowClear
                        maxTagCount={2}
                        style={{
                          width: "100%",
                        }}
                        size="large"
                        placeholder="Select Subcategory"
                        options={subcategoryList}
                      />
                    </Form.Item>
                    <Form.Item label="">
                      <Button
                        size="large" style={{
                          marginTop: 10,
                          width: "100%",
                        }} type="primary" htmlType="submit">
                        Pinpoint
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
            <div className="shout-end-group">
              <div className="container">
                <Space direction="horizontal" wrap>
                  <Tooltip title="Full Screen">
                    <Button
                      type="primary"
                      style={{
                        width: 70,
                        height: 70,
                      }}
                      icon={
                        <FullscreenOutlined
                          style={{
                            fontSize: 40,
                          }}
                        />
                      }
                      onClick={() => fullScreen()}
                    />
                  </Tooltip>
                  <Tooltip title="List View">
                    <Button
                      type="primary"
                      style={{
                        width: 70,
                        height: 70,
                      }}
                      onClick={() => setAddModalOpen(true)}
                      icon={
                        <UnorderedListOutlined
                          style={{
                            fontSize: 40,
                          }}
                        />
                      }
                    />
                  </Tooltip>
                </Space>
              </div>
            </div>
          </div>
          <div className="google-map-area green-color">
            <Spin spinning={loading} indicator={antIcon}>
              <div id="interactive-map"></div>
            </Spin>
          </div>
          <ListViewModal
            open={addModalOpen}
            setModalOpen={setAddModalOpen}
            locations={radiusLocations}
            alllocations={activeLocations}
          />
          <Drawer
            mask={false}
            maskClosable={false}
            title="Instruction"
            placement={isWebDevice ? "right" : "bottom"}
            onClose={onClose}
            open={open}
            width={400}
            extra={
              <Space>
                <Button onClick={onClose}>Cancel</Button>
              </Space>
            }
          >
            <Spin spinning={loading} indicator={antIcon}>
              <Segmented
                onChange={handleSeg}
                options={[
                  {
                    label: (
                      <div
                        style={{
                          padding: 4,
                        }}
                      >
                        <Avatar src={`${faviconUrl}/car.png`} />
                        <div>DRIVING</div>
                      </div>
                    ),
                    value: 'DRIVING',
                  },
                  {
                    label: (
                      <div
                        style={{
                          padding: 4,
                        }}
                      >
                        <Avatar src={`${faviconUrl}/bike.png`} />
                        <div>BICYCLING</div>
                      </div>
                    ),
                    value: 'BICYCLING',
                  },
                  {
                    label: (
                      <div
                        style={{
                          padding: 4,
                        }}
                      >
                        <Avatar src={`${faviconUrl}/walking.png`} />
                        <div>WALKING</div>
                      </div>
                    ),
                    value: 'WALKING',
                  },
                  {
                    label: (
                      <div
                        style={{
                          padding: 4,
                        }}
                      >
                        <Avatar src={`${faviconUrl}/bus.png`} />
                        <div>TRANSIT</div>
                      </div>
                    ),
                    value: 'TRANSIT',
                  },
                ]}
              />
              <div id="sidebar"></div>
            </Spin>
          </Drawer>
        </div>
      </div>
    </>
  );
};

InteractiveMap.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

InteractiveMap.requireAuth = true;

export default InteractiveMap;
