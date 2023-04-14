import useNotify from "@/hooks/useNotify";
import { getSettingsValue, postSettingsValue } from "@/src/redux/User/actions";
import { Col, Row, Switch } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "@/components/Partner/Settings/settings.module.css";

function ToggleSettings({
  onSettingsToggle,
  onGettingSettingsValue,
  user_settings,
}) {
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
    onGettingSettingsValue((_, error) => {
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
    onSettingsToggle(data, (_, error) => {
      if (error) {
        console.log("error");
      } else {
        notify("success", "Settings Changed.");
      }
    });
  };

  return settings ? (
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
              settings["user:likeCommentRating"] == "true" ? true : false
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
            checked={settings["user:followRequest"] == "true" ? true : false}
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
            size="large"
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
          Notify me when my favorites are active.
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
  ) : null;
}

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

export default connect(matchStateToProps, mapDispatchToProps)(ToggleSettings);
