import useNotify from "@/hooks/useNotify";
import { Col, Row, Switch } from "antd";
import { useEffect, useState } from "react";
import { settingService } from "@/services/index";
import styles from "@/components/Partner/Settings/settings.module.css";

function ToggleSettings({ userRole }) {
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

  async function optionToggle(option, keyName) {
    const data = {
      key: `user:${keyName}`,
      value: option.toString(),
    };

    await settingService.SettingsToggle(data).then(() => {
      getSettingUsers();
    })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });;
  };
  useEffect(() => {
    getSettingUsers();
  }, []);

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
          {userRole === 'partner' ? ' Notify me when I have a Location status change.' : ' Notify me when my favorites are active.'}
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


export default ToggleSettings;
