import { EnvironmentFilled, DownOutlined } from "@ant-design/icons";
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
import CheckInArrivalExpired from "@/components/Locations/PartnerLocation/CheckInArrivalExpired";
import LikeArrvial from "@/components/Locations/PartnerLocation/LikeArrvial";
import { apiBaseUrl } from "@/utils/baseUrl";

const { Meta } = Card;
const { Title } = Typography;
const imgurl = `${apiBaseUrl}/avatar/`;
const avatarurl = `${apiBaseUrl}/avatar/`;

function ArrivalBannerExpired({ location, arrivals, expand, setExpand }) {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <div>
      <div className="avatar-area green-color" style={{
        paddingTop: 0
      }}>
        {arrivals?.arrivalData.map((arrival, index) => (
          <div className="avatar-respond" style={{
            marginTop: 15,
            backgroundColor: 'rgb(241 241 241)'
          }}>
            <div style={{ display: "flex", marginTop: 0 }} className="pin-post-header-section">
              <div className="pin-post-label">
                <Card
                  style={{
                    border: "0px",
                    background: 'rgb(241 241 241)'
                  }}
                >
                  <Meta
                    avatar={
                      location.images.length !== 0 &&
                        location.images[0]?.filepath ? (
                        <Avatar
                          height={64}
                          width={64}
                          src={avatarurl + location.images[0]?.filepath}
                        />
                      ) : (
                        <Avatar size={64} icon={<EnvironmentFilled />} />
                      )
                    }
                    title={
                      <Space direction={isWebDevice ? 'vertical' : 'vertical'} size="10">
                        <Title level={4}>{location?.title}</Title>
                        <Tag icon={<EnvironmentFilled />} color="rgb(245 60 60)">
                          {location?.mapLocation?.city}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Space direction="inline" size="small">
                        <Title icon={<EnvironmentFilled />} level={5} style={{
                          fontSize: '13px'
                        }}> {new Date(arrival?.departureAt).toLocaleDateString(undefined, {
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
              <div>{arrival.arrivalText}</div>
              <div style={{ marginLeft: "auto" }}>
                {
                  arrival?.images[0]?.filepath ? (
                    <Image
                      src={imgurl + arrival?.images[0]?.filepath}
                      height="100px"
                      width="100px"
                      alt="avatar"
                    />
                  ) : ""
                }

              </div>
            </div>
            <div style={{ display: isWebDevice ? "flex" : "block", marginTop: "30px" }}>
              <div style={{ marginLeft: "auto", order: "2" }}>
                <Space size="middle">
                  <CheckInArrivalExpired
                    arrvialID={arrival.id}
                    text={arrival.checkIn.length ? arrival.checkIn.length : 0}
                    notify={notify}
                  />
                  <LikeArrvial
                    arrvialID={arrival.id}
                    text={arrival.like ? arrival.like.count : 0}
                    key="list-vertical-like-o"
                  />
                </Space>
              </div>
            </div>
          </div>
        ))}
        {arrivals?.total > 3 ?
          <a
            style={{
              marginTop: 15,
              display: 'block',
              textAlign: 'center',
              fontSize: 15,
              color: "rgb(255 255 255)"
            }}
            onClick={() => {
              setExpand(!expand);
            }}
          ><DownOutlined rotate={expand ? 180 : 0} /> {expand ? "Hide" : `Show All(${arrivals?.total})`}
          </a> : ""}
      </div>
    </div>
  );
}

export default ArrivalBannerExpired;
