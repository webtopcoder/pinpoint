import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Tooltip, Modal, Dropdown, Input, Upload, Form, message, List, Skeleton, Avatar, Space, Divider } from "antd";
import { connect } from "react-redux";
import { DownloadOutlined, UploadOutlined, DownOutlined, UpOutlined, ClockCircleOutlined } from "@ant-design/icons";
import {
  bulkMailAction,
  deleteMail,
  downloadFile,
  getInbox,
  updateMail,
  getIsReadEmails,
  replyCompose,
  getReplyByID
} from "@/redux/Mail/actions";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import useInboxColumns from "./useInboxColumns";
import { getDiffToNow } from "@/utils/date";
import Link from "next/link";
import { useRouter } from "next/router";

const { TextArea } = Input;
const avatarurl = `${apiBaseUrl}/avatar/`;
const attachurl = `${apiBaseUrl}/avatar/`;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Inbox = ({
  ondownloadFile,
  ongetInbox,
  onactionInbox,
  ondeletemail,
  onupdatemail,
  childFunc,
  childlistfunc,
  inbox,
  onGetIsReadEmails,
  onreplyCompose,
  ongetReplyByID,
  user_id
}) => {

  const [open, setOpen] = useState(false);
  const [replymsg, setReply] = useState('');
  const [replyForm] = Form.useForm();
  const [upload_name, setUploadFile] = useState([]);
  const [expand, setExpand] = useState(true);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reply_detail, setSaveReply] = useState();

  const { notify } = useNotify();
  const router = useRouter();

  const { record_detail, columns } = useInboxColumns({
    setOpen,
    user_id,
    setSaveReply,
    setInitLoading,
    ongetReply: ongetReplyByID,
    getInbox: ongetInbox,
    onDeleteMail: ondeletemail,
    onUpdateMail: onupdatemail,
    ongetIsReadEmails: onGetIsReadEmails
  });

  const onMenuClick = (e) => {
    ondownloadFile(e.key);
    window.open(attachurl + e.key, "_blank");
  };

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    childFunc.current = bulkaction;
    search(tableParams);
  }, []);

  async function search(filter) {
    await setLoading(true);
    await ongetInbox(filter, (res) => {
      setLoading(false);
      setTableParams({
        ...filter,
        pagination: {
          ...filter.pagination,
          total: res.totalResults,
        },
      });
    });
  }

  const onFinish = (values) => {
    const form_data = new FormData();
    const myID = localStorage.getItem("user_id");

    upload_name.map((file) => form_data.append("files", file.originFileObj));
    form_data.append("from", myID);
    form_data.append("role", record_detail?.to?.role);
    form_data.append("to", myID === record_detail?.to?._id ? record_detail?.from?._id : record_detail?.to?._id);
    form_data.append("reply", record_detail?._id);
    form_data.append("message", values.message);
    onreplyCompose(form_data, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
      } else {
        setExpand(true);
        setSaveReply(res.result.results);
        setUploadFile([]);
        replyForm.resetFields();
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

  async function handleTableChange(pagination, filters, sorter) {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    await search({
      pagination,
      filters,
      ...sorter,
    });
  }

  const [selectedRowkeyslist, setSelectRowkeys] = useState([]);

  useEffect(() => {
    childlistfunc(selectedRowkeyslist);
  }, [selectedRowkeyslist]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectRowkeys(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const bulkaction = (value, list) => {
    onactionInbox({ action: value, mailIds: list }, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
      } else {
        notify("success", res.message);
        setLoading(true);
        ongetInbox(tableParams, (res) => {
          setLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: res.totalResults,
            },
          });
        });
      }
    });
  };

  return (
    <>
      <Row className="mail-inbox">
        <Col md={24} sm={24} xs={24}>
          <Table
            columns={columns}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            dataSource={inbox}
            loading={loading}
            rowKey={(rows) => rows._id}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
          />
        </Col>
      </Row>
      <Modal
        centered
        open={open}
        closable={true}
        keyboard={false}
        width={1000}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        {record_detail && (
          <div id="message-thread">
            <div
              id="thread-message-9"
              className="message-box odd Inbox-by-2 message-not-starred"
            >
              <div className="message-metadata">
                <Avatar shape="square" size={50} src={avatarurl + record_detail?.from?.profile?.avatar?.filepath} />
                <div className="message-metadata-head">
                  {record_detail?.from?.role !== "admin" ? <Tooltip title="View Profile" color={"blue"}>
                    <a
                      onClick={() =>
                        router.push(`/profile/${record_detail?.from?._id}/activity`)
                      }
                    >
                      @{record_detail?.from?.username}
                      <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                    </a>
                  </Tooltip> : <span>Administrator</span>}
                  <div className="message-meta">
                    <span className="activity">
                      {new Date(record_detail.createdAt).toLocaleDateString(
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
                  {record_detail?.files?.length !== 0 ? (
                    <Dropdown.Button
                      menu={{
                        items: record_detail?.files?.map((item) => ({
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
                <p className="message-subject">{record_detail.subject}</p>
                <pre>{record_detail.message}</pre>
              </div>
              <div className="clear"></div>
            </div>
          </div>
        )}
        <Button
          style={{
            fontSize: 12,
          }}
          onClick={() => {
            setExpand(!expand);
          }}
          type="link"
        >
          {expand ? <UpOutlined /> : <DownOutlined />} Reply
        </Button>
        <Form
          form={replyForm}
          onFinish={onFinish}
          layout="horizontal"
          autoComplete="off"
        >
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
          <Form.Item name="fileupload" hidden={expand}
          >
            <Upload method="get" className="avatar-uploader" {...props}>
              <Button icon={<UploadOutlined />} style={{ marginRight: 10 }}>
                Upload
              </Button>
            </Upload>
            <Button style={{ float: 'right' }} className="btn-submit" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {reply_detail?.length > 0 ?
          <>
            <Divider orientation="left" plain>
              Replied List
            </Divider>
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="vertical"
              dataSource={reply_detail}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    item?.files?.length !== 0 ? (
                      <Dropdown.Button
                        menu={{
                          items: item?.files?.map((item) => ({
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
                    ),
                    <IconText icon={ClockCircleOutlined} text={getDiffToNow(item?.createdAt) + " ago"} key="list-vertical-star-o" />,
                  ]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={<Avatar shape="square" size={50} src={avatarurl + item?.from?.profile?.avatar?.filepath} />}
                      title={item.from.role !== "admin" ? <Link href={`/profile/${item.from.id}/activity`}>{"@" + item?.from?.username}</Link> : <span>Admin</span>}
                      description={item?.message}
                    />
                  </Skeleton>
                </List.Item>
              )}
            /></> : ''}
      </Modal >

    </>
  );
};
const mapStateToProps = ({ mail, user }) => ({
  inbox: mail.inboxlist,
  user_id: user.user_id
});

const mapDispatchToProps = (dispatch) => ({
  ongetInbox: (tableParams, cb) => dispatch(getInbox(tableParams, cb)),
  onactionInbox: (data, cb) => dispatch(bulkMailAction(data, cb)),
  ondownloadFile: (filename) => dispatch(downloadFile(filename)),
  ondeletemail: (id, cb) => dispatch(deleteMail(id, cb)),
  onupdatemail: (id, form, cb) => dispatch(updateMail(id, form, cb)),
  onGetIsReadEmails: () => dispatch(getIsReadEmails()),
  onreplyCompose: (data, cb) => dispatch(replyCompose(data, cb)),
  ongetReplyByID: (id, cb) => dispatch(getReplyByID(id, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
