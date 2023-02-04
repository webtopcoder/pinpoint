import React from "react";
import {
  EnvironmentFilled,
  MessageOutlined,
  LikeOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import { Avatar, Card } from "antd";
import Link from "next/link";
import { useState } from "react";
import ArrivalModal from "./Locations/ArrivalModal";
import { connect } from "react-redux";
import baseUrl from "@/utils/baseUrl";
import DepartureModal from "./Locations/DepartureModal";
import ModifyModal from "./Locations/ModifyModal";
import config from "@/utils/config";
import Image from "next/image";

const { Text } = Typography;

const subcategoryList = [];
for (let i = 10; i < 36; i++) {
  subcategoryList.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const avatarurl = `http://${config.server}:${config.port}/avatar/`;

const LocationCard = ({ location, showActions = false }) => {
  const [arrivalModalOpen, setArrivalModalOpen] = useState(false);
  const [departureModalOpen, setDepartureModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);

  const [uploadName, setUploadFile] = useState([]);

  const uploadProps = {
    name: "upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        const fileUploadInfo = info.fileList;
        setUploadFile(fileUploadInfo);
      }

      if (info.file.status == "removed") {
        if (info.fileList.length == 0) setUploadFile([]);
        else {
          const fileUploadInfo = info.fileList;
          setUploadFile(fileUploadInfo);
        }
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const items = [
    {
      label: (
        <a
          onClick={() =>
            window.open(
              baseUrl +
              "/profile/" +
              location.partner._id +
              "/locations/" +
              location._id,
              "_blank"
            )
          }
        >
          View Location Profile
        </a>
      ),
      key: "0",
    },
    {
      label: <a onClick={() => setModifyModalOpen(true)}>Modify Location</a>,
      key: "1",
    },
  ];

  const [rating, setRating] = useState(location.rating ?? 0);

  return (
    <>
      <Card
        style={{
          color: "white",
          cursor: "pointer",
        }}
        headStyle={{
          color: "white",
          textAlign: "center",
        }}
        title={location.title}
        className="partner-locations-card"
        actions={
          showActions && [
            <Button type="link" onClick={() => setArrivalModalOpen(true)}>
              Arrival
            </Button>,
            <Button type="link" onClick={() => setDepartureModalOpen(true)}>
              Departure
            </Button>,
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <EllipsisOutlined />
            </Dropdown>,
          ]
        }
      >
        <Row
          gutter={16}
          style={{
            textAlign: "center",
          }}
        >
          <Col span={24}>
            <Link
              href={`/profile/${location.partner._id}/locations/${location._id}`}
            >
              <Avatar
                style={{ border: "3px solid black", cursor: "pointer" }}
                size={100}
                icon={
                  location.images.length !== 0 &&
                    location.images[0]?.filepath ? (
                    <Image
                      src={avatarurl + location.images[0]?.filepath}
                      height={200}
                      width={200}
                    />
                  ) : (
                    <EnvironmentFilled />
                  )
                }
              />
            </Link>
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{
            textAlign: "center",
          }}
        >
          <Col className="gutter-row" span={12}>
            <IconText
              icon={
                <LikeOutlined
                  style={{
                    fontSize: 30,
                  }}
                />
              }
              text={
                <Text
                  style={{
                    fontSize: 40,
                    color: "white",
                  }}
                >
                  {location.like?.count ?? 0}
                </Text>
              }
              key="list-vertical-like-o"
            />
          </Col>
          <Col className="gutter-row" span={12}>
            <IconText
              icon={
                <MessageOutlined
                  style={{
                    fontSize: 30,
                  }}
                />
              }
              text={
                <Text
                  style={{
                    fontSize: 40,
                    color: "white",
                  }}
                >
                  {location.reviewCount ?? 0}
                </Text>
              }
              key="list-vertical-message"
            />
          </Col>
        </Row>
        <Divider
          style={{
            borderColor: "white",
          }}
          dashed
        >
          <Tag style={{}} color={location.isActive ? "#87d068" : "#ff4d4f"}>
            {location.isActive ? "Active" : "Inactive"}
          </Tag>
        </Divider>
        <Col
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          <Space direction="vertical" className="gutter-row" span={24}>
            <Space>
              <Text
                style={{
                  color: "white",
                }}
              >
                {location?.mapLocation?.address}
              </Text>
            </Space>
            <Space>
              <Text
                style={{
                  color: "white",
                }}
              >
                last seen {location.lastSeen}
              </Text>
            </Space>
            <Space>
              <Rate
                disabled
                allowHalf
                defaultValue={2}
                tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
                onChange={(value) => setRating(value)}
                value={rating}
              />
            </Space>
          </Space>
        </Col>
      </Card>
      <ArrivalModal
        openArrival={arrivalModalOpen}
        setArrivalModalOpen={setArrivalModalOpen}
        uploadProps={uploadProps}
      />
      <DepartureModal
        modalOpen={departureModalOpen}
        setModalOpen={setDepartureModalOpen}
      />
      <ModifyModal
        uploadProps={uploadProps}
        modalOpen={modifyModalOpen}
        setModalOpen={setModifyModalOpen}
      />
    </>
  );
};

const matchStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    // updateLocation: (location) => dispatch(updateLocation(location)),
    // deleteLocation: (location) => dispatch(deleteLocation(location)),
    // createLocation: (location) => dispatch(createLocation(location)),
    // updateLocation: (location) => dispatch(updateLocation(location)),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(LocationCard);
