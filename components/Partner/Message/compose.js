import useNotify from "@/hooks/useNotify";
import { mailCompose } from "@/redux/Mail/actions";
import { getmyFollowers } from "@/redux/User/actions";
import { getuserInfoByID } from "@/redux/User/actions";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Upload,
  Radio
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const { TextArea } = Input;

const Compose = ({ ongetmyFollowers, onmailCompose, myfollowerList, role, ongetuserInfoByID }) => {
  const [composeForm] = Form.useForm();
  const [upload_name, setUploadFile] = useState([]);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [adminselected, setAdminSelected] = useState(false);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  const { notify } = useNotify();

  const { user: sendToUserId } = router.query;

  const options = myfollowerList?.map((follow) => ({
    value: follow?.follower?.username,
    label: follow?.follower?.username,
  }));

  useEffect(() => {
    if (router.isReady) {
      ongetmyFollowers();
    }
  }, [router.isReady]);

  const onCheck = (e) => {
    setComponentDisabled(e.target.checked);
  };

  const onsendAdmin = (e) => {
    setAdminSelected(e.target.checked);
  };

  const onChange = (e) => {
    e.target.value !== "followers" && e.target.value !== "admin" ? setComponentDisabled(false) : setComponentDisabled(true)
  };

  const onFinish = (values) => {

    setUpdating(true);
    const form_data = new FormData();
    upload_name.map((file) => form_data.append("files", file.originFileObj));

    switch (values.isNotice) {
      case "admin":
        form_data.append("to", values.isNotice);
        break;
      case "followers":
        form_data.append("isNotice", componentDisabled.toString());
        break;
      default:
        if (!sendToUserId) {
          form_data.append("to", values.name);
        }
        else {
          const followingUser = Array();
          followingUser.push(values.name[0].value)
          form_data.append("to", followingUser);
        }
    }

    form_data.append("subject", values.subject);
    form_data.append("message", values.message);
    onmailCompose(form_data, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
      } else {
        setUpdating(false);
        composeForm.resetFields();
        setUploadFile([]);
        notify("success", res.msg);
      }
    });
  };

  const props = {
    name: "upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        const fileUploadInfo = info.fileList;
        setUploadFile(fileUploadInfo);
      }

      if (info.file.status == "removed") {
        if (info.fileList.length == 0) setUploadFile("");
        else {
          const fileUploadInfo = info.fileList;
          setUploadFile(fileUploadInfo);
        }
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (sendToUserId && options?.length > 0) {
      ongetuserInfoByID(sendToUserId, (res, error) => {
        if (error) {
          notify(
            "error",
            error?.response?.data?.message ?? "Something went wrong"
          );
        } else {
          composeForm.setFieldsValue({
            name: [{
              value: res,
              label: res
            }],
          });
        }
      });
    }
  }, [sendToUserId, options]);

  return (
    <Row className="mail-inbox">
      <Col md={24} sm={24} xs={24}>
        <Card>
          <Form
            form={composeForm}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item name="isNotice" label="">
              <Radio.Group disabled={sendToUserId ? true : false} onChange={onChange} defaultValue="custom">
                {role === "partner" ? <Radio.Button value="followers">To Followers(Notice)</Radio.Button> : ''}
                <Radio.Button value="admin">To Administrator</Radio.Button>
                <Radio.Button value="custom">Custom</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="name"
              label="Send To (Username or Friend's Name)"
              rules={[
                {
                  required: componentDisabled || adminselected ? false : true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Select
                disabled={sendToUserId || componentDisabled || adminselected ? true : false}
                mode="multiple"
                size="middle"
                placeholder="Please select Users"
                style={{
                  width: "50%",
                }}
                options={options}
              />
            </Form.Item>
            <Form.Item name="subject" label="Subject">
              <Input
                style={{
                  width: "50%",
                }}
              />
            </Form.Item>
            <Form.Item
              name="message"
              label="Message"
              rules={[
                {
                  required: true,
                  message: "Please input Message!",
                },
                {
                  whitespace: true,
                  message: "Please input Message!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="fileupload">
              <Row>
                <Upload method="get" {...props}>
                  <Button icon={<UploadOutlined />} style={{ marginRight: 10 }}>
                    Click to Upload
                  </Button>
                </Upload>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-submit"
                  style={{
                    display: "table",
                    justifyContent: "space-between",
                    margin: "0 auto 0",
                    padding: "10px 40px",
                    height: "100%",
                  }}
                  loading={updating}
                >
                  SEND MESSAGE
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row >
  );
};

const mapStateToProps = ({ user }) => {
  return {
    myfollowerList: user.myFollowers,
    role: user.role,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onmailCompose: (data, cb) => dispatch(mailCompose(data, cb)),
  ongetuserInfoByID: (id, cb) => dispatch(getuserInfoByID(id, cb)),
  ongetmyFollowers: () => dispatch(getmyFollowers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Compose);
