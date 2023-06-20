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
  Radio,
  DatePicker,
  Select
} from "antd";
import food from "@/public/images/landing/food.png";
import { UploadOutlined } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";
import { eventService, categoryService } from "@/services/index";
import EventArea from "./Event-Google-Map";
import dayjs from 'dayjs';

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

function AddEventModal({
  open,
  user_id,
  setModalOpen,
  uploadProps,
  uploadFile,
  additionLocatoins,
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();
  const [loading, setLoading] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [event, setEvents] = useState([]);
  const [polygons, setPolygons] = useState();

  useEffect(() => {
    categoryService.getCategory().then(async res => {
      await setCategoryInfo(res?.allcategories)
    }).catch((error) => {
      console.log(error)
    });

    eventService.getEvents({ isActive: null })
      .then(async (res) => {
        console.log(res.results)
        await setEvents(res.results);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });

  }, []);

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={open}
      width={800}
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
            Schedule Event
          </Title>
          <Paragraph>
            Have an Event coming up? Put it on our schedule! This will allow you to attract vendors as all of our Partners will be able to request access to your Event. Restrict the Partners types your want to see this Event by selecting the Categories you are accepting.
          </Paragraph>
          <Text italic>***all payments and cancellations for this event will be held outside of the Pinpoint platform by you, the Event Host. </Text>

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
          formData.append("event", values?.event);
          formData.append("type", values?.type);
          formData.append("area", polygons);
          formData.append("date", values?.edate);
          formData.append("categories", values?.categories);

          await eventService.AddEventSchedule(formData)
            .then(async () => {
              await setLoading(false);
              notify("success", "Event added successfully");
              form.resetFields();
              // await eventService.getEvents({ partner: user_id, isActive: null })
              //   .then(async (res) => {
              //     if (additionLocatoins.length > 0) {
              //       const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
              //       await setEvents(filteredData);
              //     }
              //     else
              //       await setEvents(res.results);
              //   })
              //   .catch((error) => {
              //     notify(
              //       "error",
              //       error?.response?.data?.message || "Something went wrong"
              //     );
              //     return;
              //   });
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
          <Col xs={24} sm={24} md={24} lg={15} xl={15}>
            <Form.Item
              label=""
              required
              name="type"
            >
              <Radio.Group defaultValue="public" buttonStyle="solid">
                <Radio.Button value="public">Open to Public</Radio.Button>
                <Radio.Button value="private">Private/Ticketed Event</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={9} xl={9}>
            <Form.Item
              label=""
              rules={[
                {
                  required: true,
                  message: "Please Insert Event Name",
                },
              ]}
              required
              name="edate"
            >
              <DatePicker
                format="YYYY-MM-DD h:mm a"
                use12Hours={true}
                showTime={{
                  defaultValue: dayjs('00:00:00', 'HH:mm'),
                }}
              />

            </Form.Item>
          </Col>
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
              name="event"
            >
              {/* <Input placeholder="This will be your individual event name" /> */}
              <Select
                // mode="multiple"
                // showSearch={false}
                allowClear
                // maxTagCount={3}
                size="large"
                placeholder="Select Event">
                {event?.map((option, index) => (
                  <Option key={index + 1} value={option._id}>{option.title}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Please Select Your area For New Event" rules={[
              {
                required: true,
                message: "Please Insert Event Name",
              },
            ]}>
              <EventArea polygons={polygons} setPolygons={setPolygons} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Accepted Categories"
              rules={[
                {
                  required: true,
                  message: "Please Select Accepted Categories",
                },
              ]}
              required
              name="categories"
            >
              <Select
                mode="multiple"
                showSearch={false}
                allowClear
                maxTagCount={3}
                size="large"
                placeholder="Select Category">
                <Option key={0} value="all">All</Option>
                {categoryInfo?.map((option, index) => (
                  <Option key={index + 1} value={option._id}>{option.name}</Option>
                ))}
              </Select>
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
                    Add To Schedule
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
