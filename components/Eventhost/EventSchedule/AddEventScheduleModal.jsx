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
  Select,
  Space,
  DatePicker
} from "antd";
import moment from 'moment';
import food from "@/public/images/landing/food.png";
import { UploadOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";
import { eventService, categoryService } from "@/services/index";
import EventArea from "./Event-Google-Map";
import dayjs from 'dayjs';

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

function AddEventScheduleModal({
  initialize,
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
  const [selectedDate, setSelectedDate] = useState(false);
  const [polygons, setPolygons] = useState();
  const [centerAddress, setCenterAddress] = useState({
    latitude: null,
    longitude: null,
    address: ''
  });

  useEffect(() => {
    categoryService.getCategory().then(async res => {
      await setCategoryInfo(res?.allcategories)
    }).catch((error) => {
      console.log(error)
    });

    eventService.getEvents({ partner: user_id, isActive: null })
      .then(async (res) => {
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

  useEffect(() => {
    form.resetFields(['edate']);
    setSelectedDate(false);
  }, [selectedDate]);

  const disabledDate = (current, value) => {
    // Can not select days before today and today
    const today = dayjs().startOf('day');

    if (current && !(current >= today && current <= dayjs().add(2, 'day').endOf('day'))) {
      return true;
    }

    if (value && value[0] && value[1]) {
      const dateDiff = value[1].diff(value[0], 'days');
      if (dateDiff > 16) {
        form.resetFields(['edate']);
      }
    }
    return false;
  };

  const disabledRangeTime = (current, type) => {
    const currentDay = dayjs().startOf('day');
    const isToday = current && current.isSame(currentDay, 'day');
    const currentHour = dayjs().format('h');
    const currentMinute = dayjs().minute();

    if (type === 'start' && isToday) {
      return {
        disabledHours: () => range(0, 12).splice(0, currentHour),
        disabledMinutes: () => range(0, 60).splice(0, currentMinute + 1),
        disabledSeconds: () => [],
      };
    }

    if (type === 'end' && isToday) {
      return {
        disabledHours: () => range(0, 12).splice(0, currentHour),
        disabledMinutes: () => range(0, 60).splice(0, currentMinute + 1),
        disabledSeconds: () => [],
      };
    }
  };


  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      const start = dayjs(dates[0]);
      const end = dayjs(dates[1]);
      const hoursDifference = end.diff(start, 'hour');
      if (hoursDifference > 16) {
        notify(
          "error",
          "The duration of schdule can'be over 16 hours"
        )

        setSelectedDate(true);
      }
    }
  };

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={open}
      width={800}
      closable={false}
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
        initialValues={
          {
            type: 'public'
          }
        }
        onFinish={async (values) => {
          setLoading(true);
          const formData = new FormData();
          if (polygons[0].length === 0) {
            notify("error", "Please Select Area.");
            return;
          }
          uploadFile.map((file) =>
            formData.append("images", file.originFileObj)
          );
          formData.append("event", values?.event);
          formData.append("type", values?.type);
          formData.append("title", values?.title);
          formData.append("area", JSON.stringify(polygons[0]));
          formData.append("startDate", values?.edate[0]);
          formData.append("centerAddress", JSON.stringify(centerAddress));
          formData.append("coordinates", JSON.stringify([centerAddress.longitude, centerAddress.latitude]));
          formData.append("endDate", values?.edate[1]);
          formData.append("categories", values.categories);

          await eventService.AddEventSchedule(formData)
            .then(async () => {
              await setLoading(false);
              notify("success", "Event added successfully");
              form.resetFields();
              await setPolygons(null);
              await initialize();
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
          <Col xs={24} sm={24} md={24} lg={13} xl={13}>
            <Form.Item
              label=""
              required
              name="type"
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="public">Open to Public</Radio.Button>
                <Radio.Button value="private">Private/Ticketed Event</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={11} xl={11}>
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
              <RangePicker
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                format="YYYY-MM-DD h:mm a"
                use12Hours={true}
                onCalendarChange={handleDateChange}
                showTime={{
                  defaultValue: dayjs('00:00:00', 'HH:mm'),
                  hideDisabledOptions: true,
                }} />

            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Schedule Title"
              rules={[
                {
                  required: true,
                  message: "Please Insert Schedule Title",
                },
              ]}
              required
              name="title"
            >
              <Input />
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
              <Select
                allowClear
              >
                {event?.map((option, index) => (
                  <Option key={index + 1} value={option._id}>{option.title}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Please Select Your Area For New Event">
              <EventArea polygons={polygons} setCenterAddress={setCenterAddress} setPolygons={setPolygons} />
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
                maxTagCount={3}>
                <Option key={0} value="all">All</Option>
                {categoryInfo?.map((option, index) => (
                  <Option key={index + 1} value={option.id}>{option.name}</Option>
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
                    >
                      Event Image
                    </Button>
                  </Upload>
                </Col>
                <Col span={8} offset={8}>
                  <Space>
                    <Button
                      icon={<CloseOutlined />}
                      danger
                      style={{
                        display: "initial",
                        float: "right",
                      }}
                      onClick={() => {
                        setModalOpen(false)
                      }}
                      type="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      icon={<PlusOutlined />}
                      loading={loading}
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                      style={{
                        display: "initial",
                        float: "right",
                      }}
                    >
                      Add
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

export default AddEventScheduleModal;
