import React, { useState } from "react";
import food from "@/public/images/landing/food.png";
import { Modal, Row, Col, Select, Input, Button, Typography, Form, Space } from "antd";
import styles from "./settings.module.css";
import Image from "next/image";
import useNotify from "@/hooks/useNotify";
import { settingService } from "@/services/index";
import useMedia from "@/hooks/useMedia";

const { Title } = Typography;
const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!'
  },
  number: {
    range: 'Must be between ${min} and ${max}'
  }
};

const EditUserModal = ({
  modal,
  onCancel,
  getSettingUsers,
  locations,
  userinfo
}) => {

  const isWebDevice = useMedia('(min-width:700px)');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(userinfo?.role);
  const { notify } = useNotify();

  async function changeType(value) {
    await setType(value);
  };

  async function handleOnOk(values) {
    setLoading(true);
    await settingService.updateAdditionalUser(userinfo._id, values).then(async () => {
      await setLoading(false);
      await getSettingUsers();
      onCancel();
      form.resetFields();
      notify("success", "Settings Changed.");
    })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  };

  return (
    <Modal
      className={styles.partner_setting_adduser + " settings"}
      open={modal}
      closable={false}
      onCancel={onCancel}
      footer={null}
    >
      <Row>
        <Col xs={0} sm={0} md={8} lg={2} xl={2}></Col>
        <Col
          xs={20}
          sm={20}
          md={8}
          lg={18}
          xl={18}
          style={{
            margin: "auto",
          }}

        >
          <Title
            style={{
              textAlign: "center",
              fontWeight: 900,
            }}
            level={isWebDevice ? 2 : 4}
          >
            Update Info
          </Title>
        </Col>
        <Col
          xs={4}
          sm={4}
          md={8}
          lg={3}
          xl={3}
          style={{
            textAlign: "right",
          }}
        >
          <Image src={food} alt="Snow" width={50} height={70} />
        </Col>
      </Row>
      <Form
        form={form}
        onFinish={handleOnOk}
        layout="vertical"
        fields={[
          {
            name: ["email"],
            value: userinfo?.email,
          },
          {
            name: ["role"],
            value: userinfo?.role,
          },
          {
            name: ["locations"],
            value: userinfo?.locations?.map(
              (item) => item
            ),
          },
        ]}
        validateMessages={validateMessages}
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label=" Additional User Email"
              rules={[
                {
                  required: true,
                  type: 'email'
                },
              ]}
              required
              name="email"
            >
              <Input placeholder="email@examle.com" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Permissions Type"
              rules={[
                {
                  required: true,
                },
              ]}
              name="role"
              required
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={[{ label: 'Owner', value: 'Owner' }, { label: 'Location Manager', value: 'Location Manager' }]}
              // onChange={changeType}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              tooltip="This is a required field for Location manager"
              label="Access Locations"
              name="locations"
            >
              <Select
                disabled={type === "Location Manager" || userinfo?.role === "Location Manager" ? false : true}
                mode="multiple"
                showSearch={false}
                allowClear
                style={{
                  width: "100%",
                }}
                options={locations.map((location) => ({
                  value: location._id,
                  label: location.title,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{
            padding: isWebDevice ? 10 : 0
          }}>
            <div className={styles.role_title}>Owner</div>
            <div className={styles.role_comment}>Access to everything</div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{
            padding: isWebDevice ? 10 : 0
          }}>
            <div className={styles.role_title}>Location Manager</div>
            <div className={styles.role_comment}>
              Can only mark the Arrival or Departure of a location.
            </div>
          </Col>
        </Row>
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Space size="small">
            <Button type="primary" loading={loading}
              htmlType="submit">
              Update
            </Button>
            <Button onClick={onCancel}>
              Cancel
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default EditUserModal;