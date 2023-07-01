import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Space,
  Col,
  Row,
  Divider,
  Button,
  Modal,
  Typography,
  Form,
  Input,
  Select
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import food from "@/public/images/landing/food.png";
import useNotify from "@/hooks/useNotify";
import { categoryService, eventService } from "@/services/index";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Paragraph } = Typography;

function AddAttendee({
  open,
  schedule,
  setSchedule,
  user_id,
  scheduleId,
  setModalOpen,
  additionLocatoins,
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();
  const [loading, setLoading] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState([]);

  useEffect(() => {
    categoryService.getCategory().then(async res => {
      await setCategoryInfo(res?.allcategories)
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={open}
      width={700}
      closable={false}
      onCancel={() => setModalOpen(false)}
      footer={null}>
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
          }}>
          <Title
            style={{
              textAlign: "center",
              fontWeight: 900,
            }}
            level={2}>
            Add Attendee
          </Title>
          {/* <Paragraph>
            A Event is a specific location of your business. You can edit the details of this event if it changes location or you can create another Event if you constantly change locations. Each Event will have it’s own profile and Reviews.
          </Paragraph> */}
        </Col>
        <Col
          xs={0}
          sm={0}
          md={8}
          lg={2}
          xl={2}
          style={{
            textAlign: "right",
          }} >
          <Image src={food} alt="Snow" width={50} height={70} />
        </Col>
      </Row>
      <Divider style={{}} dashed></Divider>
      <Form
        form={form}
        onFinish={async (values) => {
          setLoading(true);
          await eventService.RequestAccessManually(scheduleId, values)
            .then(async () => {
              await setLoading(false);
              notify("success", "Attendee added successfully");
              await schedule?.request?.push({ ...values, isActive: 'approve' });
              await setSchedule(schedule);
              form.resetFields();
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
        requiredMark="optional"
      >
        <Row gutter={[8, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="First Name"
              name="firstname"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="Last Name"
              name="lastname">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="Email"
              name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label="Business Name"
              rules={[
                {
                  required: true,
                  message: "Please Insert Business Name",
                },
              ]}
              required
              name="businessname">
              <Input />
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
              name="category">
              <Select
                showSearch={false}
                allowClear
                placeholder="Select Category">
                <Option key={0} value="all">All</Option>
                {categoryInfo?.map((option, index) => (
                  <Option key={index + 1} value={option.name}>{option.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item>
              <Row>
                <Col span={8}>
                </Col>
                <Col span={8} offset={8}>
                  <Space style={{
                    float: 'right'
                  }}>
                    <Button
                      type="primary"
                      onClick={() => setModalOpen(false)}
                      className="btn-submit"
                      danger>
                      cancel
                    </Button>
                    <Button
                      loading={loading}
                      icon={<PlusOutlined />}
                      type="primary"
                      htmlType="submit"
                      className="btn-submit">
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

export default AddAttendee;
