import React from "react";
import useNotify from "@/hooks/useNotify";
import {
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
import ArrivalModal from "./ArrivalModal";
import { connect } from "react-redux";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import DepartureModal from "./DepartureModal";
import ModifyEventModal from "./ModifyEventModal";
import { useRouter } from "next/router";
import { eventService, locationService } from "@/services/index";
import Image from "next/image";

const { Text } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const avatarurl = `${apiBaseUrl}/avatar/`;

const EventCard = ({
  onDepartureSet,
  event,
  showActions = false,
  user_id,
  setEvents,
  events,
  additionLocatoins,
}) => {

  console.log()
  const [arrivalModalOpen, setArrivalModalOpen] = useState(false);
  const [departureModalOpen, setDepartureModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);
  const [loading, setLoading] = useState(true);

  let count = 0;

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

  async function initialize(status) {
    await eventService.getEvents({ partner: user_id, isActive: status })
      .then(async (res) => {
        setLoading(false);
        if (additionLocatoins.length > 0) {
          const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
          await setEvents(filteredData);
        }
        else {
          await setEvents(res.results);
        }
      })
      .catch((error) => {
        setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

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
      initialize(null);
    });
  };

  const items = [
    {
      label: (
        <Link
          href={`${baseUrl}/profile/${event?.partner?._id ?? event?.partner}/events/${event._id}`}
        >
          View Event Profile
        </Link>
      ),
      key: "0",
    },
    {
      label: <a onClick={() => setModifyModalOpen(true)}>Modify Event</a>,
      key: "1",
    },
  ];

  const [rating, setRating] = useState(event?.reviews?.length > 0 ? (event?.reviews?.reduce((acc, review) => {
    if (review.rating !== 0) count++
    return acc + review.rating;
  }, 0)) / count : 0);

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
        title={event?.title}
        className="partner-locations-card"
        actions={
          showActions && [
            event?.isActive ? (
              <Button type="link" disabled>
                Arrival
              </Button>
            ) : (
              <Button type="link" onClick={() => setArrivalModalOpen(true)}>
                Arrival
              </Button>
            ),
            event.isActive ? (
              <Button type="link" onClick={async () => {
                await eventService.quickDeparture({ eventId: event?._id })
                  .then(async () => {
                    notify("success", "Successfully departed");
                    await initialize(null);
                  })
                  .catch((error) => {
                    notify(
                      "error",
                      error?.response?.data?.message || "Something went wrong"
                    );
                    return;
                  });
              }}>
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
          router.push(`/profile/${event?.partner?._id ?? event?.partner}/events/${event?._id}`);
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
                  event?.images?.length !== 0 &&
                    event?.images[0]?.filepath ? (
                    <Image
                      src={avatarurl + event?.images[0]?.filepath}
                      height={200}
                      width={200}
                    />
                  ) : ""
                }>
                {event?.images?.length !== 0 &&
                  event?.images[0]?.filepath ? "" : 'No Photo'}
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
                    {event?.totalLike ?? 0}
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
                    {event?.reviews?.length ?? 0}
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
            <Tag style={{}} color={event.isActive ? "#87d068" : "#ff4d4f"}>
              {event?.isActive ? "Active" : "Inactive"}
            </Tag>
          </Divider>
          <Col
            style={{
              marginTop: 20,
              textAlign: "center",
            }}
          >
            <Space direction="vertical" className="gutter-row" span={24}>
              {/* <Space>
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  {event?.mapLocation?.address}
                </Text>
              </Space> */}
              <Space>
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  {event?.isActive ? "Departure Time" : "Last Departure"}
                  : {
                    new Date(event?.departureAt).toLocaleDateString(undefined, {
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
                  tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
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
        setEvents={setEvents}
        events={events}
        event={event}
        uploadFile={uploadFile}
      />
      <DepartureModal
        modalOpen={departureModalOpen}
        setModalOpen={setDepartureModalOpen}
        setLocations={setEvents}
        locations={events}
      />
      <ModifyEventModal
        modalOpen={modifyModalOpen}
        setModalOpen={setModifyModalOpen}
        setEvents={setEvents}
        additionLocatoins={additionLocatoins}
        event={event}
        uploadProps={uploadProps}
        uploadFile={uploadFile}
      />
    </>
  );
};

const matchStateToProps = ({ user }) => {
  return {
    additionLocatoins: user.additionLocatoins,
    user_id: user.user_id,
  };
};

export default connect(matchStateToProps)(EventCard);
