import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import { Col, Row, Layout, Button, Popconfirm, List, Space } from "antd";
import { useRouter } from "next/router";
import { DoubleLeftOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddUserModal from "./addModal";
import EditUserModal from "./editModal";
import useNotify from "@/hooks/useNotify";
import { settingService, locationService } from "@/services/index";

const { Content } = Layout;

const SettingAddUser = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const { notify } = useNotify();
  const [showModal, setShowModal] = useState(false);
  const [additionalUsers, setadditionalUsers] = useState();
  const handleCancel = () => setShowModal(false);
  const handleOk = () => {
    setShowModal(false);
  };

  async function getSettingUsers() {
    const result = await settingService.GetSettingsValue();
    const filtered = result?.results?.find(
      (setting) => setting.key == "user:additionalUser"
    );
    await setData(result.results);
    if (filtered?.value) {
      await setadditionalUsers(filtered.value);
    }

    const res_locations = await locationService.getLocations({ partner: localStorage.getItem('user_id'), isActive: null });
    await setLocations(res_locations.results)
  }

  useEffect(() => {
    getSettingUsers();
  }, []);

  async function handleDelete(e, deleteData) {
    e.preventDefault();
    const filtered = additionalUsers.filter((user) => user != deleteData);
    const newData = {
      key: `user:additionalUser`,
      value: filtered,
    };

    const res = await settingService.SettingsToggle(newData);
    await getSettingUsers();
    notify("success", "Settings Changed.");
  };

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
        <div className="site-card-wrapper">
          <Row className="mb-5">
            <Col md={12} xs={12} sm={12}>
              <Button
                type="primary"
                shape="round"
                icon={<DoubleLeftOutlined />}
                onClick={() => router.push("/partner/settings")}
              >
                Go back
              </Button>
            </Col>
            <Col md={12} xs={12} sm={12} className={styles.right_pane}>
              <Button
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                onClick={() => setShowModal(true)}
              >
                Add User
              </Button>
            </Col>
          </Row>
          <List
            itemLayout="horizontal"
            dataSource={additionalUsers}
            renderItem={(user) => (
              <Row className={styles.list + " mt-3"}>
                <Col md={16} xs={24} sm={24} className={styles.left_pane}>
                  <div>{user.email}</div>
                  <div className={styles.role}>{user.role}</div>
                </Col>
                <Col md={8} xs={24} sm={24} className={styles.right_pane}>
                  <Space>
                    <Button type="primary"  onClick={() => setShowModal(true)} icon={<EditOutlined />}>Edit</Button>
                    <Popconfirm
                      title="Delete User?"
                      description="Are you sure to delete this user?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={(e) => handleDelete(e, user)}
                    >
                      <Button
                        type="primary"
                        icon={<DeleteOutlined />}
                        danger
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  </Space>
                </Col>
              </Row>
            )}
          />
          <AddUserModal
            modal={showModal}
            onOk={handleOk}
            user_settings={data}
            getSettingUsers={getSettingUsers}
            locations={locations}
            onCancel={handleCancel}
          />
          <EditUserModal
            modal={showModal}
            onOk={handleOk}
            user_settings={data}
            getSettingUsers={getSettingUsers}
            locations={locations}
            onCancel={handleCancel}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default SettingAddUser;
