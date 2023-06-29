import React, { useEffect, useState } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import {
  Layout,
  Col,
  Row,
  Button,
  Typography,
  message,
  List,
  Spin
} from "antd";
import food from "@/public/images/landing/food.png";
import { PlusCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import EventCard from "./EventSchedule/EventCard";
import useNotify from "@/hooks/useNotify";
import AddEventScheduleModal from "./EventSchedule/AddEventScheduleModal";
import useMedia from "@/hooks/useMedia";
import { eventService } from "@/services/index";

const { Title } = Typography;
const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

const EventSchedule = ({ user_id, additionLocatoins }) => {
  const [uploadFile, setUploadFile] = useState([]);
  const isWebDevice = useMedia('(min-width:700px)');
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const { notify } = useNotify();
  const [filter, setFilter] = useState({
    time: '',
    position: {},
    range: 5,
    flag: false
  });

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

  async function initialize() {
    await eventService.getEventSchedule(filter)
      .then(async (res) => {
        await setLoading(false);
        await setEvents(res?.results);
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

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content
        className="partner-layout"
      >
        <Spin
          indicator={antIcon}
          spinning={loading}
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div className="site-card-wrapper">
            <Content className="custom-subcontent">
              <Row gutter={16}>
                <Col
                  className="gutter-row"
                  xs={12} sm={12} md={8} lg={8} xl={6}
                  style={{
                    marginTop: 30,
                  }}
                >
                  <Button
                    disabled={additionLocatoins.length > 0 ? true : false}
                    type="primary"
                    onClick={() => setAddModalOpen(true)}
                    icon={<PlusCircleOutlined />}
                  >
                    Add Schedule Event
                  </Button>
                </Col>
                <Col className="gutter-row"
                  xs={0} sm={0} md={8} lg={8} xl={12}
                >
                  <Title
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Scheduled Events
                  </Title>
                </Col>
                <Col
                  className="gutter-row"
                  span={isWebDevice ? 6 : 12}
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Image src={food} alt="Snow" width={50} height={70} />
                </Col>
              </Row>
              <Row
                gutter={8}
                style={{
                  marginTop: 30,
                }}
                xs={24} sm={24} md={12} lg={8} xl={6}
                justify="space-around"
              >
                <Col className="gutter-row" span={24}>
                  <List
                    grid={{
                      gutter: 1,
                      xs: 1,
                      sm: 1,
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                    dataSource={events}
                    renderItem={(item) => (
                      <List.Item>
                        <EventCard events={events} initialize={initialize} setEvents={setEvents} event={item} showActions={true} />
                      </List.Item>
                    )}
                  />
                </Col>

              </Row>
            </Content>
          </div>
        </Spin>
      </Content>
      <AddEventScheduleModal
        open={addModalOpen}
        initialize={initialize}
        setModalOpen={setAddModalOpen}
        uploadProps={uploadProps}
        uploadFile={uploadFile}
        user_id={user_id}
        additionLocatoins={additionLocatoins}
      />
    </Layout>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
    additionLocatoins: user.additionLocatoins,
  };
};

export default connect(mapStateToProps)(EventSchedule);
