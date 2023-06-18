import { EnvironmentFilled } from "@ant-design/icons";
import {
  Space,
  Typography,
  Card,
  Tag,
  Avatar
} from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useMedia from "@/hooks/useMedia";
import useNotify from "@/hooks/useNotify";
import CheckInArrivalActive from "./CheckInArrivalActive";
import LikeArrvial from ".//LikeArrvial";
import { apiBaseUrl } from "@/utils/baseUrl";

const { Meta } = Card;
const { Title } = Typography;
const avatarurl = `${apiBaseUrl}/avatar/`;
const imgurl = `${apiBaseUrl}/avatar/`;

function ArrivalBanner({ event }) {

  const { notify } = useNotify();
  const [position, setPosition] = useState({
    lat: 30.3321838,
    lng: -81.65565099999999,
  });
  console.log(event.event)
  const arrivalText = event?.event?.isArrival?.arrivalText;
  const arrivalImage = event?.event?.isArrival?.images[0]?.filepath;
  const arrivalID = event?.event?.isArrival?.id;
  const date = event?.event?.updatedAt;
  const isWebDevice = useMedia('(min-width:700px)');
  const [checkIncounts, setCheckIncounts] = useState(event?.event?.isArrival?.checkIn?.length);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({
        lat: latitude,
        lng: longitude,
      });
    });
  }, []);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the earth in kilometers

    // Convert latitude and longitude to radians
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance in kilometers
    return distance;
  }

  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  const distance = (calculateDistance(position?.lat, position?.lng, event?.event?.mapLocation?.latitude, event?.event?.mapLocation?.longitude)) * 0.621371;
  return (
    <div>
      <div className="avatar-area green-color" style={{
        paddingTop: 0
      }}>
        <div className="avatar-respond" style={{
          marginTop: 5
        }}>
          <div style={{ display: "flex", marginTop: 0 }} className="pin-post-header-section">
            <div className="pin-post-label">
              <Card
                style={{
                  border: "0px",
                }}
              >
                <Meta
                  avatar={
                    event?.event?.images.length !== 0 &&
                    event?.event?.images[0]?.filepath ? (
                      <Avatar
                        height={64}
                        width={64}
                        src={avatarurl + event?.event?.images[0]?.filepath}
                      />
                    ) : (
                      <Avatar size={64} icon={<EnvironmentFilled />} />
                    )
                  }
                  title={
                    <Space direction={isWebDevice ? 'horizontal' : 'vertical'} size={isWebDevice ? 'middle' : 'small'}>
                      <Title level={4}>{event?.event?.title}</Title>
                      <Tag icon={<EnvironmentFilled />} color="rgb(32 203 29)">
                        {event?.event?.mapLocation?.city}
                      </Tag>
                    </Space>
                  }
                  description={
                    <Space direction="inline" size="small">
                      <Title icon={<EnvironmentFilled />} level={5} style={{
                        fontSize: '13px'
                      }}> {new Date(date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        hour12: true,
                        minute: "2-digit",
                        second: "2-digit",
                      })}</Title>
                    </Space>
                  }
                />
              </Card>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <div>{arrivalText}</div>
            <div style={{ marginLeft: "auto" }}>
              {
                arrivalImage ? (
                  <Image
                    src={imgurl + arrivalImage}
                    height="100px"
                    width="100px"
                    alt="img"
                  />
                ) : ""
              }
            </div>
          </div>
          <div style={{ display: isWebDevice ? "flex" : "block", marginTop: "30px" }}>
            <div style={{ marginLeft: "auto", order: "2" }}>
              <Space size="middle">
                <CheckInArrivalActive
                  distance={distance}
                  setCheckIncounts={setCheckIncounts}
                  arrvialID={arrivalID}
                  text={checkIncounts ? checkIncounts : 0}
                  notify={notify}
                />
                <LikeArrvial
                  arrvialID={arrivalID}
                  text={event?.event?.isArrival?.like ? event?.event?.isArrival?.like.count : 0}
                  key="list-vertical-like-o"
                />
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArrivalBanner;
