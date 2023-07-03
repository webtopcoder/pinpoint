import React from "react";
import useNotify from "@/hooks/useNotify";
import {
  MessageOutlined,
  LikeOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Popconfirm,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import { Avatar, Card } from "antd";
import { useState } from "react";
import ArrivalModal from "./ArrivalModal";
import { connect } from "react-redux";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import DepartureModal from "./DepartureModal";
import ModifyEventModal from "./ModifyEventModal";
import { useRouter } from "next/router";
import { eventService, locationService } from "@/services/index";
import Image from "next/image";

const { Text, Paragraph } = Typography;

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

  const [arrivalModalOpen, setArrivalModalOpen] = useState(false);
  const [departureModalOpen, setDepartureModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ellipsis, setEllipsis] = useState(true);

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
            <Button icon={<EyeOutlined />} type="link" onClick={() => {
              router.push(`${baseUrl}/profile/${event?.partner?._id ?? event?.partner}/events/${event?._id}`)
            }}>
              View
            </Button>,
            <Button icon={<EditOutlined />} type="link" onClick={() => {
              setModifyModalOpen(true)
            }}>
              Modify
            </Button>,
            <Popconfirm
              title="Delete this Event"
              description="Are you sure to delete?"
              okText="Yes"
              onConfirm={async (e) => {
                e.preventDefault();
                await eventService.DeleteEvent(event?._id)
                  .then(async () => {
                    setModifyModalOpen(false);
                    notify("success", "Event Deleted successfully");
                    await initialize(null);
                  })
                  .catch((error) => {
                    setLoading(false);
                    notify(
                      "error",
                      error?.response?.data?.message || "Something went wrong"
                    );
                    return;
                  });

              }}
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="link" danger>
                Delete
              </Button>
            </Popconfirm>
            ,
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
        <Col
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          <Space direction="vertical" className="gutter-row" span={24}>
            <Space>
              <Paragraph
                style={{
                  color: "white",
                  textAlign: 'left'
                }}
                ellipsis={
                  ellipsis
                    ? {
                      rows: 2,
                      expandable: true,
                      symbol: 'more',
                      onEllipsis: function (event) {
                        console.log(event)
                      },
                      onExpand: function (event) {
                        console.log(event)
                      }
                    }
                    : {
                      onEllipsis: function (event) {
                        console.log(event)
                      }
                    }
                }
              >
                {event?.description}
              </Paragraph>
              {/* <Text
                  style={{
                    color: "white",
                  }}
                >
                  {event?.description}
                </Text> */}
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
