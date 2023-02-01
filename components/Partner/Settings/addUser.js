import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import { Col, Row, Layout, Button } from "antd";
import { useRouter } from "next/router";
import {
  DoubleLeftOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddUserModal from "./addModal";
import { getSettingsValue, postSettingsValue } from "@/src/redux/User/actions";
import { connect } from "react-redux";

const { Content } = Layout;

const SettingAddUser = ({ user_settings, onGetSettingsValue }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => setShowModal(false);
  const handleOk = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (router.isReady) {
      onGetSettingsValue((res, error) => {
        if (error) {
          console.log("error");
        }
      });
    }
  }, [onGetSettingsValue]);
  const additionalUserSettings = user_settings.find(
    (setting) => (setting.key = "user:additionalUser")
  );
  const data = additionalUserSettings?.value;

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content
        style={{
          margin: "100px 100px",
        }}
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
          {data &&
            data.map((user, i) => (
              <Row className={styles.list + " mt-3"} key={i}>
                <Col md={16} xs={24} sm={24} className={styles.left_pane}>
                  <div>{user.email}</div>
                  <div className={styles.role}>{user.role}</div>
                </Col>
                <Col md={8} xs={24} sm={24} className={styles.right_pane}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}
          <AddUserModal
            modal={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
          />
        </div>
      </Content>
    </Layout>
  );
};

const matchStateToProps = ({ user }) => {
  return {
    user_settings: user.settings,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onGetSettingsValue: (cb) => dispatch(getSettingsValue(cb)),
});
export default connect(matchStateToProps, mapDispatchToProps)(SettingAddUser);
