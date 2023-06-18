import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import useNotify from "@/hooks/useNotify";
import food from "@/public/images/landing/food.png";
import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Modal,
  Row,
  Col,
  Typography,
  Input,
  Divider,
  Select,
  Upload,
  Button,
  Space,
  Popconfirm
} from "antd";
import Image from "next/image";
import { apiBaseUrl } from "@/utils/baseUrl";
import useMedia from "@/hooks/useMedia";
import { eventService } from "@/services/index";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const avatarurl = `${apiBaseUrl}/avatar/`;

function ModifyModal({
  uploadProps,
  modalOpen,
  setModalOpen,
  event,
  user_id,
  uploadFile,
  setEvents,
  additionLocatoins
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');

  async function initialize(status) {
    await eventService.getEvents({ partner: user_id, isActive: status })
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
  }

  async function delete_event(e, id) {
    e.preventDefault();
    await eventService.DeleteEvent(id)
      .then(async () => {
        setModalOpen(false);
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

  };

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={modalOpen}
      width={700}
      closable={true}
      onOk={() => setModalOpen(false)}
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
            Modify Event
          </Title>
          <Paragraph>
            A Event is a specific event of a business. <br /> You may have
            multiple events and this will act as their individual profile.
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
          console.log(uploadFile.length)
          const formData = new FormData();
          if (uploadFile.length > 0)
            uploadFile.map((file) =>
              formData.append("images", file.originFileObj)
            );

          formData.append("title", values.title);
          formData.append("description", values.description);

          await eventService.UpdateEventByID(event._id, formData)
            .then(async () => {
              notify("success", "Event Updated successfully");
              await initialize(null);
            })
            .catch((error) => {
              notify(
                "error",
                error?.response?.data?.message || "Something went wrong"
              );
              return;
            });
        }}
        layout="vertical"
        fields={[
          {
            name: ["title"],
            value: event.title,
          },
          {
            name: ["description"],
            value: event.description,
          },
        ]}
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
              <Input placeholder="This will be your individual Event name" />
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
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Upload
                    method="get"
                    listType="picture"
                    maxCount={1}
                    defaultFileList={
                      event?.images.length > 0
                        ? [
                          {
                            uid: "0",
                            name: event?.images[0]?.filepath,
                            status: "done",
                            url: avatarurl + event?.images[0]?.filepath,
                            thumbUrl:
                              avatarurl + event?.images[0]?.filepath,
                          },
                        ]
                        : ""
                    }
                    {...uploadProps}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{ marginRight: 10 }}
                    >
                      Change Event Image
                    </Button>
                  </Upload>
                </Col>
                <Col
                  xs={24} sm={24} md={16} lg={16} xl={16}
                  style={{
                    textAlign: isWebDevice ? "right" : 'center',
                    marginTop: isWebDevice ? 0 : 10
                  }}
                >
                  <Space>
                    <Popconfirm
                      title="Delete this Event"
                      description="Are you sure to delete?"
                      okText="Yes"
                      onConfirm={(e) => {
                        delete_event(e, event?._id)
                      }}
                      cancelText="No"
                    >
                      <Button
                        hidden={event?.isActive || additionLocatoins?.length > 0 ? true : false}
                        type="primary"
                        htmlType="submit"
                        className="btn-submit"
                        style={{
                          display: "initial",
                          float: "right",
                        }}
                        danger
                      >
                        Delete Event
                      </Button>
                    </Popconfirm>

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

const mapStateToProps = ({ user }) => ({
  user_id: user.user_id,
});


export default connect(mapStateToProps, undefined)(ModifyModal);
