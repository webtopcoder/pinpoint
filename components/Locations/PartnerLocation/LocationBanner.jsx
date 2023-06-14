import { HeartFilled, HeartOutlined, TagFilled, EnvironmentFilled, EnvironmentOutlined, ClockCircleFilled } from "@ant-design/icons";
import {
  Image as Antimage,
  Button,
  Space,
  Typography,
  List,
  Skeleton,
  Avatar,
  Card,
  Badge,
  Row,
  Col,
  Rate,
  Tag
} from "antd";
import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";

const { Text } = Typography;
const avatarurl = `${apiBaseUrl}/avatar/`;

function LocationBanner({
  location,
  onFavoriteLocation,
  onUnFavoriteLocation,
  userRole
}) {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');

  if (!location) return <Skeleton active />;
  return (
    <>
      <Row>
        <Col span={isWebDevice ? 18 : 24} offset={isWebDevice ? 3 : 0} style={{}}>
          <Badge.Ribbon
            text={location.isActive ? "Active" : "Inactive"}
            placement="start"
            color={location.isActive ? "green" : "red"}
          >
            <Card
              style={{
                color: "white",
                cursor: "pointer",
              }}
              headStyle={{
                color: "white",
                textAlign: "center",
              }}
              className="partner-locations-card"
              actions={[
                <Rate
                  disabled
                  allowHalf
                  tooltips={[
                    "terrible",
                    "bad",
                    "normal",
                    "good",
                    "wonderful",
                  ]}
                  value={location.rating}
                />,
                userRole !== "partner" ?
                  location.isFavorite ? (
                    <Button
                      type="primary"
                      icon={<HeartFilled />}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        onUnFavoriteLocation(location._id, (_, error) => {
                          if (error) {
                            notify(
                              "error",
                              error?.response?.data?.message ||
                              "Something went wrong"
                            );
                            return;
                          }

                          notify(
                            "success",
                            "Location removed from Favorites"
                          );
                        });
                      }}
                    >
                      {isWebDevice ? 'Remove from Favorites' : ''}
                    </Button>
                  ) : (
                    <Button
                      icon={<HeartOutlined />}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        onFavoriteLocation(location._id, (_, error) => {
                          if (error) {
                            notify(
                              "error",
                              error?.response?.data?.message ||
                              "Something went wrong"
                            );
                            return;
                          }

                          notify("success", "Location added to Favorites");
                        });
                      }}
                    >

                      {isWebDevice ? 'Add to Favorites' : ''}
                    </Button>
                  ) : ''
              ]}
            >
              <Row
                gutter={16}
                style={{
                  textAlign: "center",
                }}
              >
                <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                </Col>
                <Col
                  xs={24} sm={24} md={8} lg={8} xl={8}
                  style={{
                    top: -100,
                  }}
                >
                  <Space size="small" direction="vertical">
                    <Avatar
                      style={{
                        cursor: "pointer",
                        background: "rgb(223 216 216)",
                      }}
                      size={150}
                      icon={
                        location.images?.length > 0 &&
                          location.images[0]?.filepath ? (
                          <Image
                            src={avatarurl + location.images[0]?.filepath}
                            height={200}
                            width={200}
                            alt="locationImage"
                          />
                        ) : (
                          <EnvironmentFilled />
                        )
                      }
                    />
                    <Text
                      style={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: 20,
                      }}
                    >
                      {location?.title}
                    </Text>
                  </Space>
                </Col>
                <Col
                  span="24"
                  style={{
                    top: -60,
                  }}
                >
                  <Space direction="vertical" className="gutter-row" span={24}>
                    <Space>
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        {location?.description}
                      </Text>
                    </Space>
                    <Space>
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        <ClockCircleFilled />&nbsp;&nbsp;
                        {location?.isActive ? "Departure Time" : "Last Departure"}
                        : {
                          new Date(location?.departureAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            hour12: true,
                            minute: "2-digit",
                            second: "2-digit",
                          })
                        }
                      </Text>
                    </Space>
                    <Space direction="vertical">
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        <EnvironmentOutlined /> {location?.mapLocation?.address}
                      </Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={isWebDevice ? 3 : 0} />
                <Col
                  span={isWebDevice ? 18 : 24}
                  style={{
                    top: -5,
                  }}
                >
                  <Space size={[0, 'small']} wrap>
                    {location?.subCategories
                      ?.map((item) => <Tag icon={<TagFilled />} color="processing" >{item.name}</Tag>)
                    }

                  </Space>
                </Col>
              </Row>
            </Card>
          </Badge.Ribbon>
        </Col>
      </Row>
    </>
  );
}

export default LocationBanner;
