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

const SettingAddUser = ({
  user_settings,
  onGetSettingsValue,
  onSettingsToggle,
}) => {
  const router = useRouter();
  const [data, setData] = useState();

  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => setShowModal(false);
  const handleOk = () => {
    setShowModal(false);
  };
  useEffect(() => {
    onGetSettingsValue((res, error) => {
      if (error) {
        console.log("error");
      }
    });
  }, [onGetSettingsValue]);
  useEffect(() => {
    setData(additionalUserSettings?.value);
  }, [user_settings]);
  const additionalUserSettings = user_settings.find(
    (setting) => (setting.key = "user:additionalUser")
  );
  const handleDelete = (e, deleteData) => {
    e.preventDefault();
    const filtered = data.filter((user) => user != deleteData);
    const newData = {
      key: `user:additionalUser`,
      value: filtered,
    };
    onSettingsToggle(newData, (res, error) => {
      if (error) {
        console.log("error");
      } else {
        notify("success", "Settings Changed.");
      }
    });
  };
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
                    onClick={(e) => handleDelete(e, user)}
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
  onSettingsToggle: (data, cb) => dispatch(postSettingsValue(data, cb)),
});
export default connect(matchStateToProps, mapDispatchToProps)(SettingAddUser);
