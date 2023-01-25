import food from "@/public/images/landing/food.png";
import quickArrival from "@/public/images/partner/quick_arrival.png";
import quickDeparture from "@/public/images/partner/quick_departure.png";
import {
  getLocations,
  quickDeparture as quickDepartureAction,
  quickArrival as quickArrivalAction,
} from "@/src/redux/Location/actions";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Row,
  Select,
  Tag,
  TimePicker,
  Typography,
  Upload,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import toast from "../Toast";

const { Option } = Select;

const { TextArea } = Input;

const { Title } = Typography;

const { Content } = Layout;

const PartnerDashboard = ({
  userId,
  locations,
  onquickArrival,
  onquickDeparture,
  ongetLocations,
}) => {
  const router = useRouter();
  const [arrivalForm] = Form.useForm();
  const [departureForm] = Form.useForm();
  const [upload_name, setUploadFile] = useState([]);

  const [modal2Open, setModal2Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (modal2Open) {
        ongetLocations({ isActive: false, partner: userId }, (res, error) => {
          if (error) {
            notify("error", "Something went wrong!");
            return;
          }
        });
      }

      if (modal1Open) {
        ongetLocations({ isActive: true, partner: userId }, (res, error) => {
          if (error) {
            notify("error", "Something went wrong!");
            return;
          }
        });
      }
    }
  }, [modal1Open, modal2Open, router.isReady]);

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const props = {
    name: "upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        const fileUploadInfo = info.fileList;
        setUploadFile(fileUploadInfo);
      }

      if (info.file.status == "removed") {
        if (info.fileList.length == 0) setUploadFile("");
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

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      {" "}
      <Content
        style={{
          margin: "60px 40px",
        }}
      >
        {" "}
        <div className="site-card-wrapper">
          <Row gutter={[32, 32]}>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Partner Locations"
                bordered={false}
              >
                {" "}
                2{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Active Locations"
                bordered={false}
              >
                {" "}
                1{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Followers"
                bordered={true}
              >
                {" "}
                155{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Profile Views"
                bordered={false}
              >
                {" "}
                75{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Business Rating"
                bordered={false}
              >
                {" "}
                4.2{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Check In's"
                bordered={false}
              >
                {" "}
                32{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-quickpost-style"
                title="Quick Post"
                bordered={true}
              >
                +
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}></Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <div
                className="dashboard-imagebutton"
                onClick={() => setModal2Open(true)}
              >
                <Image
                  className="imagebutton-img"
                  src={quickArrival}
                  alt="Snow"
                />
                <div className="centered">
                  Quick
                  <br />
                  Arrival
                </div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <div
                className="dashboard-imagebutton"
                onClick={() => setModal1Open(true)}
              >
                <Image
                  className="imagebutton-img"
                  src={quickDeparture}
                  alt="Snow"
                />
                <div className="centered">
                  Quick
                  <br />
                  Departure
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      {/* Arrival Modal */}
      <Modal
        className="dashboard-modal"
        centered
        open={modal2Open}
        width={700}
        closable={false}
        onOk={() => {
          arrivalForm.submit();
          setModal2Open(false);
        }}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        {" "}
        <Row>
          <Col xs={0} sm={0} md={8} lg={8} xl={8}></Col>
          <Col
            xs={20}
            sm={20}
            md={8}
            lg={8}
            xl={8}
            style={{
              margin: "auto",
            }}
          >
            <Title
              style={{
                textAlign: "center",
                fontWeight: 900,
              }}
              level={2}
            >
              Arrival
            </Title>
          </Col>
          <Col
            xs={4}
            sm={4}
            md={8}
            lg={8}
            xl={8}
            style={{
              textAlign: "right",
            }}
          >
            <Image src={food} alt="Snow" width={50} height={70} />
          </Col>
        </Row>
        <Form
          form={arrivalForm}
          onFinish={(values) => {
            onquickArrival(
              {
                locationId: values.arrivalLocation,
                departureAt: values.departureAt,
                arrivalText: values.arrivalText,
              },
              (res, error) => {
                setModal2Open(false);
                if (error) {
                  notify("error", "Something went wrong");
                  return;
                }
                arrivalForm.resetFields();
                notify("success", "Successfully arrived");
              }
            );
          }}
          layout="vertical"
        >
          {" "}
          <Row>
            <Col xs={24} sm={24} md={6} lg={8} xl={8}>
              <Form.Item
                label="Departure"
                rules={[
                  {
                    required: true,
                    message: "Please select time for departure",
                  },
                ]}
                required
                name="departureAt"
              >
                <TimePicker
                  format="h:mm A"
                  use12Hours
                  onChange={onChange}
                  onOk={onOk}
                />
              </Form.Item>{" "}
            </Col>
            <Col xs={24} sm={24} md={18} lg={16} xl={16}>
              <Form.Item
                label="Partner Location"
                required
                name="arrivalLocation"
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,
                    message: "Please select a location",
                  },
                ]}
              >
                <Select
                  size="middle"
                  onChange={handleChange}
                  style={{
                    width: "100%",
                  }}
                  options={locations.map((location) => ({
                    value: location._id,
                    label: location.title,
                  }))}
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name="arrivalText" label="Let us know what you think!">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name="fileupload">
                <Row>
                  <Col span={8}>
                    <Upload listType="picture" {...props}>
                      <Button
                        icon={<UploadOutlined />}
                        style={{
                          marginRight: 10,
                        }}
                      >
                        {" "}
                        Upload a Photo
                      </Button>
                    </Upload>
                  </Col>
                  <Col span={8} offset={8}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                      style={{
                        display: "initial",
                        float: "right",
                      }}
                    >
                      Let`&apos;`s Go
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {/* Departure Modal */}
      <Modal
        className="dashboard-modal"
        centered
        open={modal1Open}
        width={700}
        closable={false}
        onOk={() => {
          departureForm.submit();
          setModal1Open(false);
        }}
        onCancel={() => setModal1Open(false)}
        footer={null}
      >
        <Row>
          <Col xs={2} sm={4} md={8} lg={8} xl={8}></Col>
          <Col
            xs={2}
            sm={4}
            md={8}
            lg={8}
            xl={8}
            style={{
              margin: "auto",
            }}
          >
            <Title
              style={{
                textAlign: "center",
                fontWeight: 900,
              }}
              level={2}
            >
              Departure
            </Title>
          </Col>
          <Col
            xs={2}
            sm={4}
            md={8}
            lg={8}
            xl={8}
            style={{
              textAlign: "right",
            }}
          >
            <Image src={food} alt="Snow" width={50} height={70} />
          </Col>
        </Row>

        <Form
          form={departureForm}
          onFinish={(values) => {
            onquickDeparture(
              {
                locationId: values.departureLocation,
              },
              (res, error) => {
                setModal1Open(false);
                if (error) {
                  notify("error", "Error");
                  return;
                }

                departureForm.resetFields();
                notify("success", "Successfully departed");
              }
            );
          }}
          layout="vertical"
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="Partner Location"
                name="departureLocation"
                required
                rules={[
                  {
                    required: true,
                    message: "Please select a location",
                  },
                ]}
                tooltip="This is a required field"
              >
                <Select
                  size="middle"
                  onChange={handleChange}
                  style={{
                    width: "100%",
                  }}
                  options={locations.map((location) => ({
                    value: location._id,
                    label: location.title,
                  }))}
                ></Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
                <Col xs={2} sm={4} md={8} lg={8} xl={14}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-submit"
                    style={{
                      display: "initial",
                      float: "right",
                    }}
                  >
                    Depart
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Layout>
  );
};
const matchStateToProps = ({ location, user }) => {
  return {
    locations: location.userLocations,
    userId: user.user_id,
  };
};

const matchDispatchToProps = (dispatch) => ({
  onquickArrival: (data, cb) => dispatch(quickArrivalAction(data, cb)),
  onquickDeparture: (data, cb) => dispatch(quickDepartureAction(data, cb)),
  ongetLocations: (data, cb) => dispatch(getLocations(data, cb)),
});

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(PartnerDashboard);
