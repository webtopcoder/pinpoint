import React from "react";
import styles from "./settings.module.css";
import { Layout, Col, Row, Switch } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

const { Content } = Layout;

const Setting = () => {
  const router = useRouter();
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
          <Row className={styles.list}>
            <Col md={16} xs={16} sm={16} className={styles.left_pane}>
              Notify me when I receive a like, comment or rating.
            </Col>
            <Col md={8} xs={8} sm={8} className={styles.right_pane}>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked
              />
            </Col>
          </Row>
          <Row className={styles.list + " mt-3"}>
            <Col md={16} xs={16} sm={16} className={styles.left_pane}>
              Notify me when I receive a follow request.
            </Col>
            <Col md={8} xs={8} sm={8} className={styles.right_pane}>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked
              />
            </Col>
          </Row>
          <Row className={styles.list + " mt-3"}>
            <Col md={16} xs={16} sm={16} className={styles.left_pane}>
              Notify me when I get a mention.
            </Col>
            <Col md={8} xs={8} sm={8} className={styles.right_pane}>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked
              />
            </Col>
          </Row>
          <Row className={styles.list + " mt-3"}>
            <Col md={16} xs={16} sm={16} className={styles.left_pane}>
              Notify me when I have a Location status change.
            </Col>
            <Col md={8} xs={8} sm={8} className={styles.right_pane}>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked
              />
            </Col>
          </Row>
          <Row
            className={styles.list_round + " mt-3"}
            onClick={() => router.push("/partner/settings/adduser")}
          >
            Additional Users
          </Row>
          <Row
            className={styles.list_round + " mt-3"}
            onClick={() => router.push("/partner/settings/business")}
          >
            Modify Business Details
          </Row>

          <Link href="/partner/partnership">
            <Row className={styles.list_round + " mt-3"}>
              Partnership Payment Details
            </Row>
          </Link>
        </div>
      </Content>
    </Layout>
  );
};

export default Setting;
