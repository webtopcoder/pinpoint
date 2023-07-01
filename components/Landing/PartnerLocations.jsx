import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "@/utils/baseUrl";
import { GoogleMap, Marker } from '@react-google-maps/api';
import { userService } from "@/services/index";

const PartnerLocations = () => {
  const containerStyle = {
    width: '100%',
    height: '400px',
    padding: '15px'
  }

  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const faviconUrl = `${apiBaseUrl}/location.png`;
  const [activePartners, setactivePartners] = useState();

  const onMapLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    activePartners?.forEach((item) => bounds.extend({ lat: item?.address?.latitude, lng: item?.address?.longitude }));
    // map.fitBounds(bounds);
  };

  useEffect(async () => {
    await navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await setPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.log(error);
      }
    );

    await userService.getActivepartners()
      .then((res) => {
        setactivePartners(res)
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }, []);
  return (
    <GoogleMap
      zoom={4}
      center={position}
      onLoad={onMapLoad}
      onDblClick={(e) => {
        setPosition(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2)));
      }}
      options={{
        gestureHandling: "greedy",
        fullscreenControl: false
      }}
      mapContainerStyle={containerStyle}
    >
      {activePartners?.map((item) => (
        <Marker key={item?._id} position={{ lat: item?.address?.latitude, lng: item?.address?.longitude }}
          icon={{
            url: faviconUrl,
            scaledSize: new google.maps.Size(30, 50), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(15, 46), // anchor
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default PartnerLocations;
