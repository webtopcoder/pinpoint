import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import { Col, Row, Layout, Button, Popconfirm, List, Space, Tag, Switch } from "antd";
import { useRouter } from "next/router";
import { DoubleLeftOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddUserModal from "./addModal";
import EditUserModal from "./editModal";
import useNotify from "@/hooks/useNotify";
import { settingService, locationService } from "@/services/index";

const { Content } = Layout;

const SettingAddUser = () => {
  const router = useRouter();
  const [locations, setLocations] = useState([]);
  const { notify } = useNotify();
  const [showAddModal, setShowAddModal] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [additionalUsers, setadditionalUsers] = useState();
  const handleAddCancel = () => setShowAddModal(false);
  const handleEditCancel = () => setShowEditModal(false);
  const handleOk = () => {
    setShowModal(false);
  };

  async function getSettingUsers() {
    const result = await settingService.GetSettingsValue();
    const filtered = result?.results?.find(
      (setting) => setting.key == "user:additionalUser"
    );

    if (filtered?.extra) {
      await setadditionalUsers(filtered.extra);
    }
    const res_locations = await locationService.getLocations({ partner: localStorage.getItem('user_id'), isActive: null });
    await setLocations(res_locations.results)
  }

  async function handleCheck(checked, id) {
    await settingService.updateAdditionalUser(id, { status: checked ? 'active' : 'inactive' });
    await getSettingUsers();
  };

  useEffect(() => {
    getSettingUsers();
  }, []);

  async function handleDelete(e, id) {
    e.preventDefault();
    await settingService.deleteAdditionUser(id);
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
                onClick={() => setShowAddModal(true)}
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
                  <div>{user.email}{" "}<Tag color={user.status === "pending" ? "magenta" : (user.status === "active" ? 'green' : 'red')}>{user.status}</Tag></div>
                  <div className={styles.role}>{user.role}</div>
                </Col>
                <Col md={8} xs={24} sm={24} className={styles.right_pane}>
                  <Space>
                    {user.status !== "pending" ? <Switch checkedChildren="Active" onChange={(checked) => handleCheck(checked, user._id)} unCheckedChildren="Inactive" defaultChecked={user.status === "active" ? true : false} />
                      : ""}
                    <Button type="primary" onClick={async () => {
                      await setUserInfo(user);
                      await setShowEditModal(true);
                    }} icon={<EditOutlined />}>Edit</Button>
                    <Popconfirm
                      title="Delete User?"
                      description="Are you sure to delete this user?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={(e) => handleDelete(e, user._id)}
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
        </div>
        <AddUserModal
          modal={showAddModal}
          onOk={handleOk}
          getSettingUsers={getSettingUsers}
          locations={locations}
          onCancel={handleAddCancel}
        />
        <EditUserModal
          modal={showEditModal}
          onOk={handleOk}
          userinfo={userInfo}
          getSettingUsers={getSettingUsers}
          locations={locations}
          onCancel={handleEditCancel}
        />
      </Content>
    </Layout>
  );
};

export default SettingAddUser;
