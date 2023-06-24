import React from "react";
import useNotify from "@/hooks/useNotify";
import {
  CheckCircleOutlined,
  EllipsisOutlined,
  TagFilled,
  CloseCircleOutlined
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Row,
  Space,
  Tag,
  Typography,
  message,
  Form
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
import moment from 'moment';

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
  const [arrivalModalOpen, setArrivalModalOpen] = useState(false);
  const [departureModalOpen, setDepartureModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);
  const [loading, setLoading] = useState(true);

  const startDateObj = moment.utc(event?.startDate);
  const startDate = startDateObj.local().format("M/D/YYYY h:mmA");
  const endDateObj = moment.utc(event?.endDate);
  const endDate = endDateObj.local().format("M/D/YYYY h:mmA");

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
        title={event?.title}
        className="partner-locations-card"
        actions={
          showActions && [
            <Link
              href={{
                pathname: "/eventhost/event-schedule-detail",
                query: { id: event?._id },
              }}
              as={`/eventhost/event-schedule-detail?id=${event?._id}`}
            >
              <Button type="link">
                View
              </Button>
            </Link>,
            //    <Button
            //    type="link"
            //    onClick={() => {
            //      router.push(`/eventhost/event-schedule-detail?id=${event?._id}`)
            //    }}
            //  >
            //    View
            //  </Button>,
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
              Edit
            </Button>
            ,
            <Button type="link">
              Delete
            </Button>,
          ]
        }
      >
        <Row
          gutter={16}
          style={{
            textAlign: "center",
            alignItems: 'center'
          }}
        >
          <Col span={16}>
            <Avatar
              shape="square"
              style={{ border: "3px solid black", cursor: "pointer" }}
              size={200}
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
          <Col span={8}>
            <Space direction="vertical">
              <IconText
                icon={
                  <CheckCircleOutlined
                    style={{
                      fontSize: 50,
                      color: '#87d068'
                    }}
                  />
                }
                text={
                  <Text
                    style={{
                      fontSize: 40,
                      color: '#87d068'
                    }}
                  >
                    {event?.totalLike ?? 0}
                  </Text>
                }
                key="list-vertical-like-o"
              />
              <IconText
                icon={
                  <CloseCircleOutlined
                    style={{
                      fontSize: 50,
                      color: '#f50'

                    }}
                  />
                }
                text={
                  <Text
                    style={{
                      fontSize: 40,
                      color: '#f50'
                    }}
                  >
                    {event?.reviews?.length ?? 0}
                  </Text>
                }
                key="list-vertical-message"
              />
            </Space>
          </Col>
        </Row>
        <Divider
          style={{
            borderColor: "white",
          }}
          dashed
        >
          <Tag color="#108ee9">Schedule Details</Tag>

        </Divider>
        <Col
          style={{
            marginTop: 20,
            textAlign: "center",
          }}
        >
          <Form
            className="event-sechedule"
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              label="Event"
            >
              <Text strong>{event?.event?.title}</Text>
            </Form.Item>

            <Form.Item
              label="Location"
            >
              <Text strong>{event?.centerAddress}</Text>
            </Form.Item>
            <Form.Item
              label="Date & Time"
            >
              <Text strong>{`${startDate} ~ ${endDate}`}</Text>
            </Form.Item>
            <Form.Item
              label="Categories"
            >
              <Space size={[0, 'small']} wrap>
                {event?.categories
                  ?.map((item) => <Tag icon={<TagFilled />} >{item.name}</Tag>)
                }
              </Space>
            </Form.Item>
          </Form>
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
            {/* <Space>
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
              </Space> */}
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
