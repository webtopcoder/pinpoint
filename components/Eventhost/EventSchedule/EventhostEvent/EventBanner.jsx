import { HeartFilled, HeartOutlined, TagFilled, EnvironmentFilled, EnvironmentOutlined, ClockCircleFilled } from "@ant-design/icons";
import {
  Button,
  Space,
  Typography,
  Skeleton,
  Avatar,
  Card,
  Badge,
  Row,
  Col,
  Rate,
  Tag
} from "antd";
import Image from "next/image";
import React from "react";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";
import { eventService } from "@/services/index";

const { Text } = Typography;
const avatarurl = `${apiBaseUrl}/avatar/`;

function EventBanner({
  event,
  setEventInfo,
  userRole
}) {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');

  if (!event) return <Skeleton active />;
  return (
    <>
      <Row>
        <Col span={isWebDevice ? 18 : 24} offset={isWebDevice ? 3 : 0} style={{}}>
          <Badge.Ribbon
            text={event?.event?.isActive ? "Active" : "Inactive"}
            placement="start"
            color={event?.event?.isActive ? "green" : "red"}
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
                  value={event?.event?.rating}
                />,
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
                        event?.event?.images?.length > 0 &&
                          event?.event?.images[0]?.filepath ? (
                          <Image
                            src={avatarurl + event.event?.images[0]?.filepath}
                            height={200}
                            width={200}
                            alt="eventImage"
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
                      {event?.event?.title}
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
                        {event?.event?.description}
                      </Text>
                    </Space>
                    <Space>
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        <ClockCircleFilled />&nbsp;&nbsp;
                        {event?.isActive ? "Departure Time" : "Last Departure"}
                        : {
                          new Date(event?.event?.departureAt).toLocaleDateString(undefined, {
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
                  </Space>
                </Col>
              </Row>
            </Card>
          </Badge.Ribbon>
        </Col>
      </Row >
    </>
  );
}

export default EventBanner;
