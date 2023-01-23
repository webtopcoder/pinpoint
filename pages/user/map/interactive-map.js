import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PageTitle from "@/components/Layout/PageTitle";
import {
  Col,
  InputNumber,
  Row,
  Slider,
  Button,
  Tooltip,
  Cascader,
  Select,
} from "antd";
import { FullscreenOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Image from "next/image";
import food from "@/public/images/landing/food.png";
import Layout from "../../../layout";
import config from "@/utils/config";
import { getCategory } from "@/redux/User/actions";
import { getsubCategory } from "@/redux/User/actions";

const categoryOptions = [];
for (let i = 10; i < 36; i++) {
  categoryOptions.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

var cityCircle = null;
var map;
const pinpoint = null;

const InteractiveMap = ({ ongetCateogry, onsubgetCateogry, categoryInfo }) => {
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
    types: ["establishment"],
  };

  const [form, setForm] = useState({
    category: "",
    subcategory: "",
  });

  const [subcategoryList, setSubcategoryList] = useState([]);

  const onUpdateField = (e) => {
    const field = e.target.name;

    if (e.target.name == "category") {
      onsubgetCateogry(e.target.value, (res) => {
        const subarr = [];
        res.subCategories?.map((item, index) => {
          const subitem = {
            value: item.name,
            label: item.name,
          };
          subarr.push(subitem);
        });
        setSubcategoryList(subarr);
      });
    }

    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };

    setForm(nextFormState);
  };

  const faviconUrl = `http://${config.server}:${config.port}/`;
  const formatter = (value) => `${value}mile`;

  const [position, setPosition] = useState({
    lat: 37.553326,
    lng: -94.8110983,
  });
  let markers = [];

  function setMapOnAll() {
    // console.log(markers)
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function hideMarkers() {
    // console.log('hide')
    setMapOnAll();
  }
  const [inputValue, setInputValue] = useState(5);
  const onChange = (newValue) => {
    setInputValue(newValue);
    cityCircle.setRadius(newValue * 1000 * 1.6);
  };

  function createCenterControl(map) {
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
        for (var i = 0; i < pinpoint.length; i++) {
          const marker = new google.maps.Marker({
            position: pinpoint[i].position,
            icon: {
              url: faviconUrl + "favicon.png",
              scaledSize: new google.maps.Size(30, 50), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0), // anchor
            },

            map: map,
          });

          markers.push(marker);

          const infowindow = new google.maps.InfoWindow({
            content: pinpoint[i].content,
            ariaLabel: "Food Truck",
          });
          marker.addListener("mouseover", () => {
            infowindow.open({
              anchor: marker,
              map,
            });
          });
          marker.addListener("mouseout", () => {
            infowindow.close();
          });
        }
      } else {
        hideMarkers();
      }
    });
    return controlButton;
  }

  useEffect(() => {
    function initMap() {
      window.navigator.geolocation.getCurrentPosition(success, (error) => {
        console.log(error);
      });
    }
    initMap();
  }, [position]);

  const getResult = () => {
    function initMap() {
      window.navigator.geolocation.getCurrentPosition(success, (error) => {
        console.log(error);
      });
    }
    initMap();
  };
  function success(pos) {
    map = new google.maps.Map(document.getElementById("interactive-map"), {
      center: position,
      zoom: 5,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP],
      },
    });

    const centerControlDiv = document.createElement("div");
    // Create the control.
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

    for (var i = 0; i < pinpoint.length; i++) {
      var d = google.maps.geometry?.spherical
        ?.computeDistanceBetween(
          // new google.maps.LatLng(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2))),
          new google.maps.LatLng(position.lat, position.lng),
          pinpoint[i].position
        )
        ?.toFixed(2);

      if (d < inputValue * 1000 * 1.6) {
        const marker = new google.maps.Marker({
          position: pinpoint[i].position,
          icon: {
            url: faviconUrl + "favicon.png",
            scaledSize: new google.maps.Size(30, 50), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0), // anchor
          },

          map: map,
        });

        const infowindow = new google.maps.InfoWindow({
          content: pinpoint[i].content,
          ariaLabel: "Food Truck",
        });
        marker.addListener("mouseover", () => {
          infowindow.open({
            anchor: marker,
            map,
          });
        });
        marker.addListener("mouseout", () => {
          infowindow.close();
        });
      }
    }

    function showMarkers() {
      setMapOnAll(map);
    }

    map.addListener("click", (e) => {
      // setMapOnAll(null);
      map.setZoom(11);
      console.log(e.latLng.toJSON());
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
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      setPosition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });

    pinpoint = [
      {
        position: new google.maps.LatLng(36, -80),
        content: `<div style="width: 100px; height: 100px; background-color: 'white'">
          <image src=${
            faviconUrl + "pin1.png"
          } style="width: 100%; height: 100%"/>
        </div>`,
      },
      {
        position: new google.maps.LatLng(39, -87),
        content:
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>",
      },
      {
        position: new google.maps.LatLng(43, -90),
        content:
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>",
      },
      {
        position: new google.maps.LatLng(35, -86),
        content:
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>",
      },
      {
        position: new google.maps.LatLng(35, -110),
        content:
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>",
      },
      {
        position: new google.maps.LatLng(47, -110),
        content:
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>",
      },
      {
        position: new google.maps.LatLng(45, -100),
        content:
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>",
      },
    ];

    ongetCateogry();
  }, []);

  return (
    <>
      <PageTitle page="Interactive Map" />
      <div className="page-interactive-area bg-black">
        <div className="container">
          <div className="page-interactive-content">
            <h1>Where are the goods at?</h1>
            <span className="sub-title">BROUGHT TO YOU BY PINPOINT</span>
          </div>
          <div className="shout-area followers green-color">
            <div className="shout-body">
              <div className="shout-author vcard">
                <div className="avatar">
                  <Image src={food} alt="user" className="shout-radius" />
                </div>
                <form className="search-form">
                  <input
                    type="search"
                    className="search-field"
                    ref={inputRef}
                    placeholder="Enter Address or Share Location"
                  />
                  <button type="submit">
                    <i className="bx bx-current-location"></i>
                  </button>
                </form>
              </div>
              <div className="shout-metadata">
                <p>Search Radius:</p>
                <Row>
                  <Col span={21}>
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
                      max={25}
                      onChange={onChange}
                      value={typeof inputValue === "number" ? inputValue : 0}
                    />
                  </Col>
                  <Col span={3}>
                    <InputNumber
                      min={1}
                      max={25}
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
                  <div className="form-group">
                    <select
                      value={form.category}
                      onChange={onUpdateField}
                      name="category"
                      className="form-control"
                    >
                      <option value="0">Select Category</option>
                      {categoryInfo.map((option, index) => (
                        <option key={index} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Select Subcategory"
                      options={subcategoryList}
                    />
                  </div>
                  <div className="form-group">
                    <div className="pin-post-footer-section">
                      <div className="pin-edit-button-section">
                        <button
                          onClick={getResult}
                          className="btn-style-one red-light-color"
                        >
                          Pinpoint
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shout-end-group">
              <div className="container">
                <div className="col-lg-12 col-md-12">
                  <div className="form-group">
                    <div className="pin-post-footer-section">
                      <div className="pin-edit-button-section">
                        <Tooltip title="Full Screen">
                          <Button
                            type="primary"
                            style={{
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
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="pin-post-footer-section">
                      <div className="pin-edit-button-section">
                        <Tooltip title="List View">
                          <Button
                            type="primary"
                            style={{
                              height: 70,
                            }}
                            icon={
                              <UnorderedListOutlined
                                style={{
                                  fontSize: 40,
                                }}
                              />
                            }
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="google-map-area green-color">
            <div id="interactive-map">
              <div id="floating-panel">
                <input id="hide-markers" type="button" value="Hide Markers" />
                <input id="show-markers" type="button" value="Show Markers" />
                <input
                  id="delete-markers"
                  type="button"
                  value="Delete Markers"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

InteractiveMap.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const mapStateToProps = ({ user }) => ({
  categoryInfo: user.partnerCategory.categories,
  subcategoryInfo: user.partnersubCategory,
});

const mapDispatchToProps = (dispatch) => ({
  ongetCateogry: () => dispatch(getCategory()),
  onsubgetCateogry: (categoryID, cb) =>
    dispatch(getsubCategory(categoryID, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveMap);
