import React from "react";
import styles from "./settings.module.css";
import { Layout, Row } from "antd";
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
        className="partner-layout"
      >
        <div className="site-card-wrapper">
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