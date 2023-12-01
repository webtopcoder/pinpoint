import React, { useEffect, useState, useRef } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Layout from "../layout";
import { apiBaseUrl } from "@/utils/baseUrl";
import { locationService, eventService } from "@/services/index";
import { DrawingManager, GoogleMap, Polygon, Marker, InfoWindow, Circle, DirectionsService, DirectionsRenderer, MarkerClusterer } from '@react-google-maps/api';
import { Button, Space, notification, Typography, Row, Col, Popover, Tooltip } from "antd";
import { EyeFilled, LoadingOutlined, FilterOutlined } from "@ant-design/icons";
import DirectionDrawer from "@/components/User/InteractiveMap/DirectionDrawer";
import FilterDrawer from "@/components/User/InteractiveMap/FilterDrawer";
import ListViewModal from "@/components/User/InteractiveMap/ListView";
import MarkCard from "@/components/User/InteractiveMap/MarkCard";
import MarkCardArea from "@/components/User/InteractiveMap/MarkCardArea";
import useNotify from "@/hooks/useNotify";
import { browserName } from 'react-device-detect';
import { setCookie, getCookie } from 'cookies-next';
import useMedia from "@/hooks/useMedia";
import { useRouter } from "next/router";

const { Paragraph, Text } = Typography;

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const InteractiveMap = () => {

  const { notify } = useNotify();
  const defaultCenter = {
    lat: 28.626137,
    lng: 79.821603,
  }
  const isWebDevice = useMedia('(min-width:700px)');
  const [mapRef, setMapRef] = useState();
  const polygonRefs = useRef([]);
  const activePolygonIndex = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const [activeLocations, setActiveLocations] = useState([]);
  const [radiusLocations, setRadiusLocations] = useState([]);
  const [filterForm, setfilterForm] = useState([]);
  const [eventSchedules, setEventSchedules] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [mapzoom, setZoom] = useState(5);
  const [flag, setFlag] = useState(false);
  const faviconUrl = `${apiBaseUrl}`;
  const [position, setPosition] = useState(defaultCenter);
  const [inputValue, setInputValue] = useState(5);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [directions, setDirections] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState({
    time: '',
    position: {},
    map: true,
    range: 5,
    flag: true,
    isActive: true
  });


  const router = useRouter();

  const containerStyle = {
    width: '100%',
    height: '100vh',
    textAlign: isWebDevice ? 'center' : 'right',
    padding: '15px'
  }

  const PublicpolygonOptions = {
    fillOpacity: 0.5,
    fillColor: '#108ee9',
    strokeColor: '#108ee9',
    strokeWeight: 2,
  }

  const PrivatepolygonOptions = {
    fillOpacity: 0.5,
    fillColor: '#f50',
    strokeColor: '#f50',
    strokeWeight: 2,
  }

  const options = {
    strokeColor: '#531dab',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#531dab',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: inputValue * 1000 * 1.6,
    zIndex: 1
  }

  const clusterOptions = {
    gridSize: 60,
    imagePath: '',
    styles: [
      {
        textColor: 'white',
        height: 50,
        width: 50,
        url: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="20"></text></svg>',
      },
      {
        textColor: 'white',
        height: 70,
        width: 70,
        url: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="red"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="24"></text></svg>',
      },
      {
        textColor: 'white',
        height: 90,
        width: 90,
        url: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="red"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="28"></text></svg>',
      },
    ],
  };
  const onLoad = circle => {
    console.log('Circle onLoad circle: ', circle)
  }

  const onClickPolygon = (index) => {
    activePolygonIndex.current = index;
  }


  const onLoadPolygon = (polygon, index) => {
    polygonRefs.current[index] = polygon;
  }

  const onClose = () => {
    setOpen(false);
    setFilterOpen(false)
    setDirections(null);
  }

  const onUnmount = circle => {
    console.log('Circle onUnmount circle: ', circle)
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

  function getCurrentLocation() {
    navigator.geolocation.watchPosition(position => {
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
    // cityCircle.setRadius(newValue * 1000 * 1.6);
  };

  const handleZoom = () => {
    const zoomLevel = mapRef?.getZoom();
    zoomLevel !== undefined ? setZoom(zoomLevel) : '';
    zoomLevel < 3 ? setZoom(3) : ''
  };

  async function handleSeg(value) {
    await setLoading(true);
    await setTravelMode(value);
  };

  async function onFinish(Form) {
    await setfilterForm(Form);
    !isWebDevice && setFilterOpen(false);
    const result = await locationService.getAllLocations(false, true, Form);
    await setActiveLocations(result?.results);
  }

  async function filteredAcitveLocation() {
    const filteredLocations = await Promise.all(
      activeLocations.map(async (item) => {
        const d = google.maps.geometry?.spherical?.computeDistanceBetween(
          new google.maps.LatLng(position?.lat, position?.lng),
          new google.maps.LatLng(item?.mapLocation?.latitude, item?.mapLocation?.longitude)
        );

        if (d < inputValue * 1000 * 1.6) {
          return item;
        }
        return null;
      })
    );
    const validLocations = filteredLocations.filter((item) => item !== null);
    await setRadiusLocations(validLocations);
  }

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    activeLocations?.forEach((item) => bounds.extend({ lat: item?.mapLocation?.latitude, lng: item?.mapLocation?.longitude }));
    // map.fitBounds(bounds);
  };


  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.setZoom(mapzoom);
    // mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
    setSelectedDestination(activeLocations.find((item) => item._id === id));
  };

  const updateRoute = (currentLocation) => {
    const directionsService = new google.maps.DirectionsService();
    if (currentLocation && selectedDestination) {
      const origin = new google.maps.LatLng(currentLocation.lat, currentLocation.lng);
      const destination = new google.maps.LatLng(selectedDestination.mapLocation.latitude, selectedDestination.mapLocation.longitude);

      directionsService.route(
        {
          origin,
          destination,
          travelMode: travelMode === "DRIVING" ? google.maps.TravelMode.DRIVING : travelMode === "BICYCLING"
            ? google.maps.TravelMode.BICYCLING : travelMode === "WALKING"
              ? google.maps.TravelMode.WALKING : google.maps.TravelMode.TRANSIT
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error('Directions request failed due to ' + status);
          }
        }
      );
    }
  };

  async function handleDirections() {
    const directionsService = new google.maps.DirectionsService();
    if (selectedDestination) {
      const origin = new google.maps.LatLng(position.lat, position.lng);
      const destination = new google.maps.LatLng(selectedDestination.mapLocation.latitude, selectedDestination.mapLocation.longitude);
      await setLoading(true);

      directionsService.route(
        {
          origin,
          destination,
          travelMode: travelMode === "DRIVING" ? google.maps.TravelMode.DRIVING : travelMode === "BICYCLING"
            ? google.maps.TravelMode.BICYCLING : travelMode === "WALKING"
              ? google.maps.TravelMode.WALKING : google.maps.TravelMode.TRANSIT
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setOpen(true);
            setLoading(false);
            setDirections(result);
          } else {
            setLoading(false);
            notify(
              "error",
              "No Support"
            );
          }
        }
      );
    }
  };

  useEffect(async () => {
    const flag = getCookie('notify');
    browserName === "Safari" && flag === true ? openNotification() : "";
    await onFinish(filterForm);
    await eventService.getEventSchedule(filter)
      .then(async (res) => {
        setLoading(false);
        await setEventSchedules(res.results);
      })
      .catch((error) => {
        setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });

    const watchId = await navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await setPosition({ lat: latitude, lng: longitude });
        updateRoute({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(async () => {
    await filteredAcitveLocation();
  }, [inputValue, position, activeLocations]);

  useEffect(async () => {
    await handleDirections();
  }, [travelMode]);

  return (
    <>
      {contextHolder}
      <PageTitle page="INTERACTIVE MAP" />

      <div
        className="profile-authentication-area bg-f8fbff">
        <GoogleMap
          zoom={mapzoom}
          onZoomChanged={handleZoom}
          center={position}
          onLoad={onMapLoad}
          onDblClick={(e) => {
            mapRef?.setZoom(mapzoom);
            setPosition(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2)));
          }}
          options={{
            gestureHandling: "greedy",
            fullscreenControl: false,
            minZoom: 3,
            maxZoom: 25,
            mapTypeControl: false,
            streetViewControl: false,

          }}
          mapContainerStyle={containerStyle}
        >
          {
            eventSchedules?.map((iterator, index) => (
              <Polygon
                key={index}
                onLoad={(event) => onLoadPolygon(event, index)}
                onMouseDown={() => onClickPolygon(index)}
                options={iterator?.type === "public" ? PublicpolygonOptions : PrivatepolygonOptions}
                paths={iterator?.area}
              />
            ))
          }
          <Circle
            onLoad={onLoad}
            onUnmount={onUnmount}
            center={position}
            options={options}
          />
          <Popover
            trigger="hover"
            content={"sdfsdf"} title="Title">
            <Marker position={position} />
          </Popover>
          <MarkerClusterer options={clusterOptions}>
            {(clusterer) => (
              <div>
                {!flag ? activeLocations?.map((item) => (
                  <Marker key={item?._id} position={{ lat: item?.mapLocation?.latitude, lng: item?.mapLocation?.longitude }}
                    icon={{
                      url: `${faviconUrl}/avatar/${item?.partner?.category?.image?.filepath}`,
                      scaledSize: new google.maps.Size(25, 40), // scaled size
                      origin: new google.maps.Point(0, 0), // origin
                      anchor: new google.maps.Point(15, 46), // anchor
                    }}
                    style={{ width: 0, height: 0 }}
                    clusterer={clusterer}
                    onMouseOver={() => {
                      setIsOpen(true);
                      handleMarkerClick(item?._id, item?.mapLocation?.latitude, item?.mapLocation?.longitude, item?.mapLocation?.address);
                    }}
                  >
                    {isOpen && infoWindowData?.id === item?._id && (
                      <InfoWindow
                        options={{
                          maxWidth: 300
                        }}
                        onMouseOut={() => {
                          setIsOpen(false);
                        }}
                        position={{ lat: item?.mapLocation?.latitude, lng: item?.mapLocation?.longitude }}
                        placement="right"
                        onCloseClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        <MarkCard item={item} router={router} handleDirections={handleDirections} loading={loading} />
                      </InfoWindow>
                    )}
                  </Marker>
                )) : null}
                {radiusLocations?.map((item) => (
                  <Marker key={item?._id} position={{ lat: item?.mapLocation?.latitude, lng: item?.mapLocation?.longitude }}
                    icon={{
                      url: `${faviconUrl}/avatar/${item?.partner?.category?.image?.filepath}`,
                      scaledSize: new google.maps.Size(30, 50), // scaled size
                      origin: new google.maps.Point(0, 0), // origin
                      anchor: new google.maps.Point(15, 46), // anchor
                    }}
                    style={{ width: 0, height: 0 }}
                    clusterer={clusterer}
                    onMouseOver={() => {
                      setIsOpen(true);
                      handleMarkerClick(item?._id, item?.mapLocation?.latitude, item?.mapLocation?.longitude, item?.mapLocation?.address);
                    }}
                  >
                    {isOpen && infoWindowData?.id === item?._id && (
                      <InfoWindow
                        position={{ lat: item?.mapLocation?.latitude, lng: item?.mapLocation?.longitude }}
                        onCloseClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        <MarkCard item={item} router={router} handleDirections={handleDirections} loading={loading} />
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
                {eventSchedules?.map((item) => (
                  <Marker key={item?._id} position={{ lat: item?.centerAddress?.latitude, lng: item?.centerAddress?.longitude }}
                    icon={{
                      url: `${faviconUrl}/event.png`,
                      scaledSize: new google.maps.Size(25, 40), // scaled size
                      origin: new google.maps.Point(0, 0), // origin
                      anchor: new google.maps.Point(15, 46), // anchor
                    }}
                    style={{ width: 0, height: 0 }}
                    clusterer={clusterer}
                    onMouseOver={() => {
                      setIsOpen(true);
                      handleMarkerClick(item?._id, item?.mapLocation?.latitude, item?.mapLocation?.longitude, item?.mapLocation?.address);
                    }}
                  >
                    {isOpen && infoWindowData?.id === item?._id && (
                      <InfoWindow
                        position={{ lat: item?.centerAddress?.latitude, lng: item?.centerAddress?.longitude }}
                        onCloseClick={() => {
                          setIsOpen(false);
                        }}>
                        <MarkCardArea item={item} router={router} handleDirections={handleDirections} loading={loading} />
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
              </div>
            )}
          </MarkerClusterer>
          {directions && (
            <DirectionsRenderer
              panel={document.getElementById('sidebar')}
              options={{
                suppressMarkers: true,
                directions: directions,
                polylineOptions: {
                  strokeColor: '#0000FF',
                  strokeOpacity: 0.8,
                  strokeWeight: 5
                }
              }}
            />
          )}
          <Row>
            <Col span="8">
              <Button style={{ marginTop: 80, float: 'left' }} onClick={async () => {
                await setFilterOpen(true);
              }} icon={<FilterOutlined />} size="middle" danger>Filter
              </Button>
            </Col>
            <Col span="8">
              <Button style={{ marginTop: 80 }} onClick={async () => {
                await setFlag(!flag);
                if (flag) {
                  await onFinish(filterForm);
                }
                else await filteredAcitveLocation();
              }} icon={<EyeFilled />} size={'middle'}>{!flag ? "Hide All Active" : "Show All Active"}
              </Button>
            </Col>
          </Row>
        </GoogleMap>
        {/* <ListViewModal
          open={addModalOpen}
          locations={radiusLocations}
          setModalOpen={setAddModalOpen}
          alllocations={activeLocations}
        /> */}
        <DirectionDrawer handleSeg={handleSeg} loading={loading} onClose={onClose} open={open} />
        <FilterDrawer onFinish={onFinish} inputValue={inputValue} onChange={onChange} getCurrentLocation={getCurrentLocation} setPosition={setPosition} loading={loading} onClose={onClose} open={filterOpen} />
      </div>
    </>
  );
};

InteractiveMap.requireAuth = true;

InteractiveMap.getLayout = function getLayout(page) {
  return <Layout whiteMenu={true}>{page}</Layout>;
};

export default InteractiveMap;
