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
import EventCard from "./Events/EventCard";
import useNotify from "@/hooks/useNotify";
import AddEventModal from "./Events/AddEventModal";
import useMedia from "@/hooks/useMedia";
import { eventService } from "@/services/index";

const { Title } = Typography;
const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

const Events = ({ user_id, additionLocatoins }) => {
  const [uploadFile, setUploadFile] = useState([]);
  const isWebDevice = useMedia('(min-width:700px)');
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const { notify } = useNotify();

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
    console.log(32423434)
    await eventService.getEvents({ partner: user_id, isActive: null })
      .then(async (res) => {
        setLoading(false);
        if (additionLocatoins.length > 0) {
          const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
          await setEvents(filteredData);
        }
        else
          await setEvents(res.results);
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
                    Add Event
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
                    Events
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
                gutter={16}
                style={{
                  marginTop: 30,
                }}
                xs={24} sm={24} md={8} lg={8} xl={6}
                justify="space-around"
              >
                <Col className="gutter-row" span={24}>
                  <List
                    grid={{
                      gutter: 10,
                      xs: 1,
                      sm: 1,
                      md: 1,
                      lg: 2,
                      xl: 3,
                      xxl: 3,
                    }}
                    dataSource={events}
                    renderItem={(item) => (
                      <List.Item>
                        <EventCard events={events} setEvents={setEvents} event={item} showActions={true} />
                      </List.Item>
                    )}
                  />
                </Col>

              </Row>
            </Content>
          </div>
        </Spin>
      </Content>
      <AddEventModal
        open={addModalOpen}
        setEvents={setEvents}
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

export default connect(mapStateToProps)(Events);
