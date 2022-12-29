import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import { Col, InputNumber, Row, Slider, Button, Tooltip, Space } from 'antd';
import { FullscreenOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Image from "next/image";
import food from "@/public/images/landing/food.png";
import Layout from '../../../layout';

var cityCircle = null;
var map;
const pinpoint = null;
const InteractiveMap = () => {
  const formatter = (value) => `${value}mile`;
  
  const [position, setPosition] = useState({
    lat: 37.553326,
    lng: -94.8110983
  })
  const [inputValue, setInputValue] = useState(5);
  const onChange = (newValue) => {
    setInputValue(newValue);
    cityCircle.setRadius(newValue * 1000 * 1.6)
  };
  function initMap() {
    window.navigator.geolocation.getCurrentPosition(success, (error) => {
      console.log(error)
    });
  }

  function success(pos) {
    map = new google.maps.Map(document.getElementById("interactive-map"), {
      center: position,
      zoom: 5,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: [
          google.maps.MapTypeId.ROADMAP
        ]
      }
    });

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
    map.addListener("click", (e) => {
      map.setZoom(11);
      // map.setCenter(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2)))
      map.setCenter(new google.maps.LatLng(36, -80))
      setPosition(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2)));
      // cityCircle.setCenter(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2)));
      cityCircle.setCenter(new google.maps.LatLng(36, -80));
      for (var i = 0; i < pinpoint.length; i++) {
        var d = (google.maps.geometry.spherical.computeDistanceBetween(
          // new google.maps.LatLng(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2))),
          new google.maps.LatLng(36, -80),
          pinpoint[i].position
        )).toFixed(2);
        if (d < inputValue * 1000 * 1.6) {
          const marker = new google.maps.Marker({
            position: pinpoint[i].position,
            icon: {
              url: 'http://127.0.0.1:8080/favicon.png',
              scaledSize: new google.maps.Size(30, 50), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(0, 0) // anchor
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

    });
  };
  const fullScreen = () => {
    const elementToSendFullscreen = map.getDiv().firstChild;
    if (isFullscreen(elementToSendFullscreen)) {
      exitFullscreen();
    } else {
      requestFullscreen(elementToSendFullscreen);
    }
  }

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
    initMap();
    pinpoint = [
      {
        position: new google.maps.LatLng(36, -80),
        content: `<div style="width: 100px; height: 100px; background-color: 'white'">
          <image src="http://127.0.0.1:8080/pin1.png" style="width: 100%; height: 100%"/>
        </div>`
      },
      {
        position: new google.maps.LatLng(39, -87),
        content: '<div id="content">' +
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
          "</div>"
      },
      {
        position: new google.maps.LatLng(43, -90),
        content: '<div id="content">' +
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
          "</div>"
      },
      {
        position: new google.maps.LatLng(35, -86),
        content: '<div id="content">' +
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
          "</div>"
      },
      {
        position: new google.maps.LatLng(35, -110),
        content: '<div id="content">' +
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
          "</div>"
      },
      {
        position: new google.maps.LatLng(47, -110),
        content: '<div id="content">' +
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
          "</div>"
      },
      {
        position: new google.maps.LatLng(45, -100),
        content: '<div id="content">' +
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
          "</div>"
      }
    ]
  }, [])
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
                  <Image
                    src={food}
                    alt="user"
                    className="shout-radius"
                  />
                </div>
                <form className="search-form">
                  <input
                    type="search"
                    className="search-field"
                    placeholder="Enter Address or Share Location"
                  />
                  <button type="submit">
                    <i className="bx bx-current-location"></i>
                  </button>
                </form>

              </div>
              <div className="shout-metadata">
                <span>Search Radius:</span>
                <Row>
                  <Col span={20}>
                    <Slider
                      tooltip={{
                        formatter
                      }}
                      min={1}
                      max={20}
                      onChange={onChange}
                      value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={1}
                      max={20}
                      style={{
                        margin: '0 16px',
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
                      name="state"
                      className="form-control"
                    >
                      <option value="0">Select Category</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      name="state"
                      className="form-control"
                    >
                      <option value="0">Select SubCategory</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="pin-post-footer-section">
                      <div className="pin-edit-button-section">
                        <button
                          type="submit"
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
                          <Button type="primary" style={{
                            height: 70
                          }} icon={<FullscreenOutlined style={{
                            fontSize: 40
                          }} />}
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
                          <Button type="primary" style={{
                            height: 70
                          }} icon={<UnorderedListOutlined style={{
                            fontSize: 40
                          }} />} />
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

            </div>
          </div>
        </div>

      </div>
    </>
  );
};

InteractiveMap.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default InteractiveMap;
