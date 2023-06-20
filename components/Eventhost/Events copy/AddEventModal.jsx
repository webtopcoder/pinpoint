import React, { useEffect, useRef, useState } from "react";
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
import { eventService } from "@/services/index";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

function AddEventModal({
  open,
  user_id,
  setModalOpen,
  uploadProps,
  uploadFile,
  setEvents,
  additionLocatoins,
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={open}
      width={700}
      closable={true}
      onCancel={() => setModalOpen(false)}
      footer={null}
    >
      <Row>
        <Col xs={0} sm={0} md={8} lg={0} xl={0}></Col>
        <Col
          xs={24}
          sm={24}
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
            Add Event
          </Title>
          <Paragraph>
            A Event is a specific location of your business. You can edit the details of this event if it changes location or you can create another Event if you constantly change locations. Each Event will have it’s own profile and Reviews.
          </Paragraph>
        </Col>
        <Col
          xs={0}
          sm={0}
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
        onFinish={async (values) => {
          setLoading(true);
          const formData = new FormData();
          uploadFile.map((file) =>
            formData.append("images", file.originFileObj)
          );
          formData.append("title", values.title);
          formData.append("description", values.description);

          await eventService.AddEvent(formData)
            .then(async () => {
              await setLoading(false);
              notify("success", "Event added successfully");
              form.resetFields();
              await eventService.getEvents({ partner: user_id, isActive: null })
                .then(async (res) => {
                  if (additionLocatoins.length > 0) {
                    const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
                    await setEvents(filteredData);
                  }
                  else
                    await setEvents(res.results);
                })
                .catch((error) => {
                  notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                  );
                  return;
                });
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
        layout="vertical"
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Event Name"
              rules={[
                {
                  required: true,
                  message: "Please Insert Event Name",
                },
              ]}
              required
              name="title"
            >
              <Input placeholder="This will be your individual event name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Event Description" name="description">
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
                  <Upload method="get" listType="picture" {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      style={{ marginRight: 10 }}
                      maxCount={1}
                    >
                      Event Image
                    </Button>
                  </Upload>
                </Col>
                <Col span={8} offset={8}>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    className="btn-submit"
                    style={{
                      display: "initial",
                      float: "right",
                    }}
                  >
                    Add Event
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

export default AddEventModal;
