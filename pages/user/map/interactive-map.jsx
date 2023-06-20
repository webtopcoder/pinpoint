import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import { setCookie, getCookie } from 'cookies-next';
import ListViewModal from "@/components/User/InteractiveMap/ListView";
import { Button, Space, notification, Typography, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Layout from "../../../layout";
import { apiBaseUrl } from "@/utils/baseUrl";
import baseUrl from "@/utils/baseUrl";
import { locationService } from "@/services/index";
import { browserName } from 'react-device-detect';
import useNotify from "@/hooks/useNotify";
import DirectionDrawer from "@/components/User/InteractiveMap/DirectionDrawer";
import ToolBanner from "@/components/User/InteractiveMap/ToolBanner";

const { Paragraph, Text } = Typography;
let cityCircle = null;
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const InteractiveMap = () => {
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
            <a id="directionButton" type="button" ><img width="30" height="30" src="${faviconUrl}/direction.png"/></a>&nbsp&nbsp
            </div>
      </div>
    </div>`
  }

  function attachEventToDirectionButton() {
    const directionButton = document.getElementById("directionButton");
    if (directionButton) {
      directionButton.addEventListener("click", directionbuttonfun);
    }
  }

  let selectedItem = "", selectedMode, map, directionsService, directionsRenderer, markers = [];
  const [open, setOpen] = useState(false);
  const [activeLocations, setActiveLocations] = useState([]);
  const [mapzoom, setZoom] = useState(10);
  const [api, contextHolder] = notification.useNotification();
  const [radiusLocations, setRadiusLocations] = useState([]);
  const faviconUrl = `${apiBaseUrl}`;
  const [position, setPosition] = useState({
    lat: 30.3321838,
    lng: -81.65565099999999,
  });
  const [selectedlo, setSelectlo] = useState();
  const [transitMethod, setTransitMethod] = useState(undefined);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dirService, setDirservice] = useState();
  const [dirRender, setDirrender] = useState();
  const [inputValue, setInputValue] = useState(5);

  const { notify } = useNotify();
  const onClose = () => {
    setOpen(false);
  };

  async function handleSeg(value) {
    await setLoading(true);
    selectedMode = value
    await setTransitMethod(value);
    await dirRender.setPanel(document.getElementById("sidebar"));
    await calculateAndDisplayRoute2(dirService, dirRender, value, selectedlo);
  };

  async function directionbuttonfun() {
    await setOpen(true);
    await setLoading(true);
    await setSelectlo(selectedItem);
    document.getElementById("sidebar").innerHTML = "";
    await directionsRenderer.setPanel(document.getElementById("sidebar"));
    await calculateAndDisplayRoute2(directionsService, directionsRenderer, "DRIVING", selectedItem);
  }

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
    });
  }

  async function onFinish(Form) {
    const result = await locationService.getAllLocations(false, true, Form);
    await setActiveLocations(result?.results)
    await setRadiusLocations([]);
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
    onFinish([]);
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
      <PageTitle page="INTERACTIVE MAP" />
      <div className="page-interactive-area bg-black">
        <div className="container">
          <div className="page-interactive-content">
            <h1>Where are the goods at?</h1>
            <span className="sub-title">BROUGHT TO YOU BY PINPOINT</span>
          </div>
          <ToolBanner
            setPosition={setPosition}
            getCurrentLocation={getCurrentLocation}
            onChange={onChange}
            inputValue={inputValue}
            onFinish={onFinish}
            fullScreen={fullScreen}
            setAddModalOpen={setAddModalOpen}
          />
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
          <DirectionDrawer loading={loading} handleSeg={handleSeg} onClose={onClose} open={open} />
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
