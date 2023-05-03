import React from "react";
import useNotify from "@/hooks/useNotify";
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
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import DepartureModal from "./Locations/DepartureModal";
import ModifyModal from "./Locations/ModifyModal";
import { quickDeparture, getLocations } from "@/src/redux/Location/actions";
import { getDiffToNow } from "@/utils/date";
import { useRouter } from "next/router";

import Image from "next/image";

const { Text } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const avatarurl = `${apiBaseUrl}/avatar/`;

const LocationCard = ({
  onDepartureSet,
  ongetLocations,
  location,
  showActions = false,
  user_id,
}) => {
  const [arrivalModalOpen, setArrivalModalOpen] = useState(false);
  const [departureModalOpen, setDepartureModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);

  const { notify } = useNotify();
  const router = useRouter();

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

  const departure = (location_id) => {
    const form = {
      locationId: location_id,
    };
    onDepartureSet(form, (_, error) => {
      if (error) {
        notify("error", "Error");
        return;
      }
      notify("success", "Successfully departed");
      ongetLocations({ partner: user_id }, (_, error) => {
        if (error) {
          notify(
            "error",
            error?.response?.data?.message ?? "Something went wrong"
          );
        }
      });
    });
  };

  const items = [
    {
      label: (
        <Link
          href={`${baseUrl}/profile/${location.partner._id ?? location.partner}/locations/${location._id}`}
        >
          View Location Profile
        </Link>
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
        hoverable
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
            location.isActive ? (
              <Button type="link" disabled>
                Arrival
              </Button>
            ) : (
              <Button type="link" onClick={() => setArrivalModalOpen(true)}>
                Arrival
              </Button>
            ),
            location.isActive ? (
              <Button type="link" onClick={() => departure(location._id)}>
                Departure
              </Button>
            ) : (
              <Button type="link" disabled>
                Departure
              </Button>
            ),
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
        <div onClick={() => {
          router.push(`/profile/${location.partner._id ?? location.partner}/locations/${location._id}`);
        }}>
          <Row
            gutter={16}
            style={{
              textAlign: "center",
            }}
          >
            <Col span={24}>
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
                  ) : ""
                }>
                {location.images.length !== 0 &&
                  location.images[0]?.filepath ? "" : 'No Photo'}
              </Avatar>
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
        </div>
      </Card >
      <ArrivalModal
        openArrival={arrivalModalOpen}
        setArrivalModalOpen={setArrivalModalOpen}
        uploadProps={uploadProps}
        locationInfo={location}
        uploadFile={uploadFile}
      />
      <DepartureModal
        modalOpen={departureModalOpen}
        setModalOpen={setDepartureModalOpen}
      />
      <ModifyModal
        modalOpen={modifyModalOpen}
        setModalOpen={setModifyModalOpen}
        locationInfo={location}
        uploadProps={uploadProps}
        uploadFile={uploadFile}
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
    onDepartureSet: (data, cb) => dispatch(quickDeparture(data, cb)),
    ongetLocations: (payload, callback) =>
      dispatch(getLocations(payload, callback)),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(LocationCard);
