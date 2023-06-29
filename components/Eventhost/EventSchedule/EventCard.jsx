import React from "react";
import useNotify from "@/hooks/useNotify";
import {
  CheckCircleOutlined,
  EllipsisOutlined,
  LoadingOutlined,
  TagFilled,
  CloseCircleOutlined
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Tooltip,
  Row,
  Space,
  Tag,
  Typography,
  message,
  Form,
  Badge,
  Popconfirm
} from "antd";
import { Avatar, Card } from "antd";
import Link from "next/link";
import useMedia from "@/hooks/useMedia";
import { useState } from "react";
import { connect } from "react-redux";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import ModifyEventModal from "./ModifyEventModal";
import { useRouter } from "next/router";
import { eventService } from "@/services/index";
import Image from "next/image";
import { formatDateEvent, getDiffeForEventSchedule } from "@/utils/date";

const { Text } = Typography;

const IconText = ({ icon, text, tooltip }) => (
  <Tooltip title={tooltip} placement="top">
    <Space>
      {icon}
      {text}
    </Space>
  </Tooltip>
);

const avatarurl = `${apiBaseUrl}/avatar/`;

const EventCard = ({
  event,
  showActions = false,
  user_id,
  setEvents,
  events,
  additionLocatoins,
  initialize
}) => {

  const isWebDevice = useMedia('(min-width:700px)');
  const [arrivalModalOpen, setArrivalModalOpen] = useState(false);
  const [departureModalOpen, setDepartureModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);
  const [loading, setLoading] = useState(true);

  const { notify } = useNotify();
  const router = useRouter();
  const isExpired = getDiffeForEventSchedule(event?.endDate) > 24 ? true : false;

  const approvedCount = (event?.request.filter(obj => obj.isActive === "approve"))?.length;
  const pendingCount = (event?.request.filter(obj => obj.isActive === "pending"))?.length;
  const declinCount = (event?.request.filter(obj => obj.isActive === "decline"))?.length;
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
      <Badge.Ribbon color={isExpired ? "red" : "green"} text={isExpired ? "Expired" : "Active"}>
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
              // <Button type="link" onClick={async () => {
              //   await eventService.quickDeparture({ eventId: event?._id })
              //     .then(async () => {
              //       notify("success", "Successfully departed");
              //       await initialize();
              //     })
              //     .catch((error) => {
              //       notify(
              //         "error",
              //         error?.response?.data?.message || "Something went wrong"
              //       );
              //       return;
              //     });
              // }}>
              //   Edit
              // </Button>
              // ,
              <Popconfirm
                title="Delete Event Schedule"
                description="Are you sure you want to delete this schedule?"
                okText="Yes"
                cancelText="No"
                onConfirm={async () => {
                  await eventService.deleteEventSchedule(event?._id)
                    .then(async () => {
                      notify("success", "Successfully Deleted");
                      await initialize();
                    })
                    .catch((error) => {
                      notify(
                        "error",
                        error?.response?.data?.message || "Something went wrong"
                      );
                      return;
                    });
                }
                }
              >
                <Button type="link" >
                  Delete
                </Button>
              </Popconfirm>
              ,
            ]
          }
        >
          <Row
            gutter={16}
            justify="left"
            style={{
              alignItems: 'center'
            }}
          >
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Avatar
                shape="square"
                style={{ border: "3px solid black", cursor: "pointer" }}
                size={250}
                icon={
                  event?.images?.length !== 0 &&
                    event?.images[0]?.filepath ? (
                    <Image
                      src={avatarurl + event?.images[0]?.filepath}
                      height={250}
                      width={250}
                    />
                  ) : ""
                }>
                {event?.images?.length !== 0 &&
                  event?.images[0]?.filepath ? "" : 'No Photo'}
              </Avatar>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Space direction={isWebDevice ? "vertical" : "horizontal"} size={isWebDevice ? "small" : 'large'}>
                <IconText
                  icon={
                    <LoadingOutlined
                      style={{
                        fontSize: 40,
                        color: '#2db7f5'
                      }}
                    />
                  }
                  tooltip="Pending"
                  text={
                    <Text
                      style={{
                        fontSize: 40,
                        color: '#2db7f5'
                      }}
                    >
                      {pendingCount ?? 0}
                    </Text>
                  }
                />
                <IconText
                  icon={
                    <CheckCircleOutlined
                      style={{
                        fontSize: 40,
                        color: '#87d068'
                      }}
                    />
                  }
                  tooltip="Approved"
                  text={
                    <Text
                      style={{
                        fontSize: 40,
                        color: '#87d068'
                      }}
                    >
                      {approvedCount ?? 0}
                    </Text>
                  }
                />
                <IconText
                  icon={
                    <CloseCircleOutlined
                      style={{
                        fontSize: 40,
                        color: '#f50'
                      }}
                    />
                  }
                  tooltip="Declined"
                  text={
                    <Text
                      style={{
                        fontSize: 40,
                        color: '#f50'
                      }}
                    >
                      {declinCount ?? 0}
                    </Text>
                  }
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
            <Tag color="#108ee9">{event?.type}</Tag>
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
                <Text strong>{event?.centerAddress?.address}</Text>
              </Form.Item>
              <Form.Item
                label="Date & Time"
              >
                <Text strong>{`${formatDateEvent(event?.startDate)} ~ ${formatDateEvent(event?.endDate)}`}</Text>
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
          </Col>
        </Card>
      </Badge.Ribbon >

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
