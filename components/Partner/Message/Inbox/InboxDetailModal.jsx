import useNotify from "@/hooks/useNotify";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  TimePicker,
  Typography,
  Upload,
} from "antd";
import Image from "next/image";
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from 'moment';

const { Title } = Typography;
const { TextArea } = Input;

function InboxDetailModal({
  modalopen,
}) {

  const [replymsg, setReply] = useState('');
  const [replyForm] = Form.useForm();
  const [upload_name, setUploadFile] = useState([]);
  const [expand, setExpand] = useState(true);

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

  const onFinish = (values) => {

    const form_data = new FormData();

    upload_name.map((file) => form_data.append("files", file.originFileObj));
    form_data.append("from", record_detail?.to?._id);
    form_data.append("role", record_detail?.to?.role);
    form_data.append("to", record_detail?.from?._id);
    form_data.append("reply", record_detail?._id);
    form_data.append("message", values.message);
    replyfunc(form_data, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
      } else {
        setExpand(true);
        replyForm.resetFields();
        notify("success", res.msg);
      }
    });
  };

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={modalopen}
      footer={null}
      closable={true}
      keyboard={false}
      width={1000}
    >
      {record && (
        <div id="message-thread">
          <div
            id="thread-message-9"
            className="message-box odd Inbox-by-2 message-not-starred"
          >
            <div className="message-metadata">
              <img
                src={
                  avatarurl + record?.from?.profile?.avatar?.filepath
                }
                alt="user"
                loader={loader}
                className="avatar"
                width={100}
                height={100}
              />
              <div className="message-metadata-head">
                <Tooltip title="View Profile" color={"blue"}>
                  <a
                    onClick={() =>
                      window.open(
                        baseUrl +
                        "/profile/" +
                        record?.from?._id +
                        "/activity",
                        "_blank"
                      )
                    }
                  >
                    @{record?.from?.username}
                    <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                  </a>
                </Tooltip>
                <div className="message-meta">
                  <span className="activity">
                    {new Date(record.createdAt).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        hour12: true,
                        minute: "2-digit",
                        second: "2-digit",
                      }
                    )}
                  </span>
                </div>
              </div>
              <div className="message-star-actions">
                {record?.files?.length !== 0 ? (
                  <Dropdown.Button
                    menu={{
                      items: record?.files?.map((item) => ({
                        key: item.filepath,
                        label: item.filepath,
                      })),
                      onClick: onMenuClick,
                    }}
                    icon={<DownloadOutlined />}
                  >
                    Attached Files
                  </Dropdown.Button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="message-content">
              <p className="message-subject">{record.subject}</p>
              <pre>{record.message}</pre>
            </div>
            <div className="clear"></div>
          </div>
        </div>

      )}
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name?.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Button
        style={{
          fontSize: 12,
        }}
        onClick={() => {
          setExpand(!expand);
        }}
        type="link"
      >
        {expand ? <UpOutlined /> : <DownOutlined />} reply
      </Button>
      <Form
        form={replyForm}
        onFinish={onFinish}
        layout="inline"
        autoComplete="off"
      >
        <Col span={20}>
          <Form.Item
            hidden={expand}
            name="message"
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
            <TextArea
              value={replymsg}
              placeholder="Reply message"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
              onChange={(e) => setReply(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="fileupload" hidden={expand}
          >
            <Upload method="get" {...props}>
              <Button icon={<UploadOutlined />} style={{ marginRight: 10 }}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item name="submit" style={{
            textAlign: 'right',
            marginTop: '10px'
          }} hidden={expand}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="btn-submit"
            >
              SEND
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
}


export default memo(InboxDetailModal);
