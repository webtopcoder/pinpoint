import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import useNotify from "@/hooks/useNotify";
import { Layout, Col, Row, Switch } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { getSettingsValue, postSettingsValue } from "@/src/redux/User/actions";

const { Content } = Layout;

const Setting = ({
  onSettingsToggle,
  onGettingSettingsValue,
  user_settings,
}) => {
  const router = useRouter();
  const { notify } = useNotify();
  const [settings, setSettings] = useState();

  useEffect(() => {
    setSettings(
      user_settings?.reduce(
        (acc, obj) => ({ ...acc, [obj.key]: obj.value }),
        {}
      )
    );
  }, [user_settings]);

  useEffect(() => {
    onGettingSettingsValue((res, error) => {
      if (error) {
        console.log("error");
      } else {
      }
    });
  }, [onGettingSettingsValue]);

  const optionToggle = (option, keyName) => {
    const data = {
      key: `user:${keyName}`,
      value: option.toString(),
    };
    onSettingsToggle(data, (res, error) => {
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
          {settings ? (
            <>
              <Row className={styles.list}>
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
              </Row>
              <Row className={styles.list + " mt-3"}>
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
              </Row>
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

const matchStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
    user_settings: user.settings,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSettingsToggle: (data, cb) => dispatch(postSettingsValue(data, cb)),
  onGettingSettingsValue: (cb) => dispatch(getSettingsValue(cb)),
});
export default connect(matchStateToProps, mapDispatchToProps)(Setting);
