import React from "react";
import Image from "next/image";
import {
  Upload,
  Col,
  Row,
  Divider,
  Button,
  Modal,
  Typography,
  Form,
  Input,
} from "antd";
import food from "@/public/images/landing/food.png";
import { UploadOutlined } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";
import { createLocation, getLocations } from "@/src/redux/Location/actions";
import { connect } from "react-redux";

const { TextArea } = Input;

const { Title, Paragraph } = Typography;

function AddLocationModal({
  open,
  user_id,
  setModalOpen,
  uploadProps,
  uploadFile,
  onAddLocation,
  ongetLocations,
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();
  return (
    <Modal
      className="dashboard-modal"
      centered
      open={open}
      width={700}
      closable={false}
      onOk={() => {
        setModalOpen(false);
      }}
      onCancel={() => setModalOpen(false)}
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
            Add Location
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
      <Form
        form={form}
        onFinish={(values) => {
          const formData = new FormData();

          uploadFile.map((file) =>
            formData.append("images", file.originFileObj)
          );

          formData.append("title", values.title);
          formData.append("description", values.description);

          onAddLocation(formData, (_, err) => {
            if (err) {
              notify(
                "error",
                err?.response?.data?.message || "Something went error"
              );
              return;
            }
            setModalOpen(false);
            notify("success", "Location added successfully");
            ongetLocations({ partner: user_id }, (_, error) => {
              if (error) {
                notify(
                  "error",
                  error?.response?.data?.message ?? "Something went wrong"
                );
              }
            });
          });
        }}
        layout="vertical"
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Location Name" required name="title">
              <Input placeholder="This will be your individual locations name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Location Description" name="description">
              <TextArea
                placeholder="Anything you want your customers to know"
                rows={4}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name="images">
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
                    Add Location
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

const mapStateToProps = ({ user }) => ({
  user_id: user.user_id,
});

const mapDispatchToProps = (dispatch) => ({
  ongetLocations: (data, cb) => dispatch(getLocations(data, cb)),
  onAddLocation: (data, cb) => dispatch(createLocation(data, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationModal);
