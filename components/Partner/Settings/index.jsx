import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import useNotify from "@/hooks/useNotify";
import { Layout, Col, Row, Switch } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { settingService } from "@/services/index";

const { Content } = Layout;

const Setting = () => {
  const router = useRouter();
  const { notify } = useNotify();
  const [settings, setSettings] = useState();

  async function getSettingUsers() {
    const result = await settingService.GetSettingsValue();
    await setSettings(
      result?.results?.reduce(
        (acc, obj) => ({ ...acc, [obj.key]: obj.value }),
        {}
      )
    );
  }

  useEffect(() => {
    getSettingUsers();
  }, []);

  async function optionToggle(option, keyName) {
    const data = {
      key: `user:${keyName}`,
      value: option.toString(),
    };

    await settingService.SettingsToggle(data).then(() => {
      notify("success", "Settings Changed.");
    })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });;
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
          {settings ? (
            <>
              {/* <Row className={styles.list}>
                <Col md={16} xs={16} sm={16} className={styles.left_pane}>
                  Notify me when I receive a like, comment or rating.
                </Col>
                <Col md={8} xs={8} sm={8} className={styles.right_pane}>
                  <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    checked={
                      settings["user:likeCommentRating"] == "true"
                        ? true
                        : false
                    }
                    onChange={(checked) => {
                      optionToggle(checked, "likeCommentRating");
                    }}
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
                    checked={
                      settings["user:followRequest"] == "true" ? true : false
                    }
                    onChange={(checked) => {
                      optionToggle(checked, "followRequest");
                    }}
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
                    checked={settings["user:mention"] == "true" ? true : false}
                    onChange={(checked) => {
                      optionToggle(checked, "mention");
                    }}
                  />
                </Col>
              </Row> */}
              {/* <Row className={styles.list + " mt-3"}>
                <Col md={16} xs={16} sm={16} className={styles.left_pane}>
                  Notify me when I have a Location status change.
                </Col>
                <Col md={8} xs={8} sm={8} className={styles.right_pane}>
                  <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    checked={settings["user:location"] == "true" ? true : false}
                    onChange={(checked) => {
                      optionToggle(checked, "location");
                    }}
                  />
                </Col>
              </Row> */}
            </>
          ) : (
            ""
          )}
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
