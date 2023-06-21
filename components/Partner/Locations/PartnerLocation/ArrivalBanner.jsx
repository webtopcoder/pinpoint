import { EnvironmentFilled, ShareAltOutlined } from "@ant-design/icons";
import {
  Space,
  Typography,
  Card,
  Tag,
  Avatar,
} from "antd";
import { FacebookShareButton, FacebookIcon } from 'react-share';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useMedia from "@/hooks/useMedia";
import useNotify from "@/hooks/useNotify";
import CheckInArrivalActive from "./CheckInArrivalActive";
import LikeArrvial from "./LikeArrvial";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import moment from 'moment'
import { useRouter } from "next/router";

const { Meta } = Card;
const { Title } = Typography;
const avatarurl = `${apiBaseUrl}/avatar/`;
const imgurl = `${apiBaseUrl}/avatar/`;

function ArrivalBanner({ location, user_id }) {

  const { notify } = useNotify();
  const [position, setPosition] = useState({
    lat: 30.3321838,
    lng: -81.65565099999999,
  });
  const router = useRouter();
  const url = baseUrl + router.asPath;
  const arrivallocation = location?.location?.title;
  const arrivalText = location?.location?.isArrival?.arrivalText;
  const arrivalImage = location?.location?.isArrival?.images[0]?.filepath;
  const arrivalID = location?.location?.isArrival?.id;
  const date = location?.location?.updatedAt;
  const isWebDevice = useMedia('(min-width:700px)');
  const [checkIncounts, setCheckIncounts] = useState(location?.location?.isArrival?.checkIn?.length);

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

  const distance = (calculateDistance(position?.lat, position?.lng, location?.location?.mapLocation?.latitude, location?.location?.mapLocation?.longitude)) * 0.621371;
  let dateString = moment(date).format('DD-MM-YYYY');

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
                    location?.location?.images.length !== 0 &&
                      location?.location?.images[0]?.filepath ? (
                      <Avatar
                        height={64}
                        width={64}
                        src={avatarurl + location?.location?.images[0]?.filepath}
                      />
                    ) : (
                      <Avatar size={64} icon={<EnvironmentFilled />} />
                    )
                  }
                  title={
                    <Space direction={isWebDevice ? 'horizontal' : 'vertical'} size={isWebDevice ? 'middle' : 'small'}>
                      <Title level={4}>{location?.location?.title}</Title>
                      <Tag icon={<EnvironmentFilled />} color="rgb(32 203 29)">
                        {location?.location?.mapLocation?.city}
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
            <FacebookShareButton
              id="fbShareBtn"
              url={`https://api.thepinpointsocial.com/api/v1/share?title=${arrivallocation}&url=${url}&description=${arrivalText}&city=${location?.location?.mapLocation?.city}&date=${dateString}&imageUrl=${encodeURIComponent(imgurl + arrivalImage)}`}

              quotes={"Quotes"}  //"Your Quotes"
              hashtag={"Hashtag"} // #hashTag
            >
              <ShareAltOutlined style={{
                fontSize: 25
              }} />
            </FacebookShareButton>
            <div style={{ marginLeft: "auto", order: "2" }}>
              <Space size="middle">
                <CheckInArrivalActive
                  distance={distance}
                  setCheckIncounts={setCheckIncounts}
                  arrvialID={arrivalID}
                  text={checkIncounts ? checkIncounts : 0}
                  notify={notify}
                  user_id={user_id}
                />
                <LikeArrvial
                  arrvialID={arrivalID}
                  text={location?.location?.isArrival?.like ? location?.location?.isArrival?.like.count : 0}
                  key="list-vertical-like-o"
                  user_id={user_id}
                  notify={notify}
                />
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ArrivalBanner;
