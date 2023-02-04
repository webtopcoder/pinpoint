import React, { useEffect, useState } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import {
  Layout,
  Upload,
  Space,
  Col,
  Row,
  Divider,
  Button,
  Modal,
  Typography,
  Select,
  message,
  Form,
  Input,
} from "antd";
import food from "@/public/images/landing/food.png";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import LocationCard from "../LocationCard";
import { getLocations } from "@/src/redux/Location/actions";
import useNotify from "@/hooks/useNotify";
import AddLocationModal from "../Locations/AddLocationModal";

const { TextArea } = Input;

const { Title, Paragraph } = Typography;

const { Content } = Layout;

const PartnerLocations = ({ locations, user_id, ongetLocations }) => {
  const [uploadFile, setUploadFile] = useState([]);

  const [addModalOpen, setAddModalOpen] = useState(false);

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

  useEffect(() => {
    ongetLocations({ partner: user_id }, (_, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
      }
    });
  }, []);

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content
        style={{
          margin: "60px 40px",
        }}
      >
        <div className="site-card-wrapper">
          <Content className="custom-subcontent">
            <Row gutter={16}>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginTop: 30,
                }}
              >
                <Button
                  type="primary"
                  onClick={() => setAddModalOpen(true)}
                  icon={<PlusCircleOutlined />}
                >
                  Add Location
                </Button>
              </Col>
              <Col className="gutter-row" span={12}>
                <Title
                  style={{
                    textAlign: "center",
                  }}
                >
                  Partner Locations
                </Title>
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  textAlign: "right",
                }}
              >
                <Image src={food} alt="Snow" width={50} height={70} />
              </Col>
            </Row>
            <Row
              gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}
              style={{
                marginTop: 30,
              }}
              justify="space-around"
            >
              {locations.map((location, index) => (
                <Col span={8} key={index}>
                  <LocationCard location={location} showActions={true} />
                </Col>
              ))}
            </Row>
          </Content>
        </div>
      </Content>

      <AddLocationModal
        open={addModalOpen}
        setModalOpen={setAddModalOpen}
        uploadProps={uploadProps}
        uploadFile={uploadFile}
      />
    </Layout>
  );
};

const subcategoryList = [];
for (let i = 10; i < 36; i++) {
  subcategoryList.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

function ModifyModal({
  open: modifyModalOpen,
  setModalOpen: setModifyModalOpen,
  uploadProps,
  uploadFile,
}) {
  const [form] = Form.useForm();
  return (
    <Modal
      className="dashboard-modal"
      centered
      open={modifyModalOpen}
      width={700}
      closable={false}
      onOk={() => setModifyModalOpen(false)}
      onCancel={() => setModifyModalOpen(false)}
      footer={null}
    >
      <Row>
        <Col xs={0} sm={0} md={8} lg={0} xl={0}></Col>
        <Col
          xs={20}
          sm={20}
          md={8}
          lg={22}
          xl={22}
          style={{
            margin: "auto",
            textAlign: "center",
          }}
        >
          <Title
            style={{
              textAlign: "center",
              fontWeight: 900,
            }}
            level={2}
          >
            Modify Location
          </Title>
          <Paragraph>
            A Location is a specific location of a business. <br /> You may have
            multiple locations and this will act as their individual profile.
          </Paragraph>
        </Col>
        <Col
          xs={4}
          sm={4}
          md={8}
          lg={2}
          xl={2}
          style={{
            textAlign: "right",
          }}
        >
          <Image src={food} alt="Snow" width={50} height={70} />
        </Col>
      </Row>
      <Divider style={{}} dashed></Divider>
      <Form form={form} layout="vertical">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Location Name" required name="requiredMarkValue">
              <Input placeholder="This will be your individual locations name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Partner Location"
              required
              tooltip="This is a required field"
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Select all that apply"
                options={subcategoryList}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Location Description">
              <TextArea
                placeholder="Anything you want your customers to know"
                rows={4}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name="fileupload">
              <Row>
                <Col span={8}>
                  <Upload listType="picture" {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      style={{ marginRight: 10 }}
                    >
                      Location Image
                    </Button>
                  </Upload>
                </Col>
                <Col
                  span={16}
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                      style={{
                        display: "initial",
                        float: "right",
                      }}
                      danger
                    >
                      Delete Location
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                      style={{
                        display: "initial",
                        float: "right",
                      }}
                    >
                      Save Changes
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

const mapStateToProps = ({ user, location }) => {
  return {
    locations: location.userLocations,
    user_id: user.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetLocations: (data, cb) => dispatch(getLocations(data, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerLocations);
