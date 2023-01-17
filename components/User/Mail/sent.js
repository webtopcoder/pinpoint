import React, { useState, useEffect, useCallback } from "react";
import { Table, Row, Col, Button, Space, Tooltip, Modal, Dropdown } from "antd";
import { connect } from "react-redux";
import { DeleteFilled, DownloadOutlined } from "@ant-design/icons";
import Image from "next/image";
import { getSent } from "@/redux/Mail/actions";
import { downloadFile } from "@/redux/Mail/actions";
import { deleteSent } from "@/redux/Mail/actions";
import toast from "@/components/Toast";
import config from "@/utils/config";
import baseUrl from "@/utils/baseUrl";

const Sent = ({
  ondownloadFile,
  ongetSent,
  ondeleteSent,
  childlistfunc,
  childFunc,
}) => {
  const onMenuClick = (e) => {
    ondownloadFile(e.key);
    window.open(attachurl + e.key, "_blank");
  };
  const [open, setOpen] = useState(false);
  const avatarurl = `http://${config.server}:${config.port}/avatar/`;
  const attachurl = `http://${config.server}:${config.port}/mail/`;
  const myLoader = ({ src }) => {
    return src;
  };
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = useCallback(() => {
    toast.dismiss();
  }, []);

  const columnes = [
    {
      title: "",
      width: "1%",
    },
    {
      title: "To",
      align: "center",
      width: "40%",
      sorter: true,
      render: (_, record) => (
        <div className="thread-sender">
          <div className="thread-avatar">
            <Image
              src={avatarurl + "/" + record.to_user.avatar}
              alt="user"
              width={40}
              height={40}
            />
          </div>
          <div className="thread-from">
            <div className="from">
              <Tooltip title="View Profile" color={"blue"}>
                <a
                  onClick={() =>
                    window.open(
                      baseUrl + "/user/" + record.to_user.id + "/activity",
                      "_blank"
                    )
                  }
                >
                  @{record.to_user.username}
                  <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                </a>
              </Tooltip>
              <span className="">&nbsp;({record.count})</span>
            </div>
            <span className="activity">
              last sent:{" "}
              {new Date(record.sent[0].createdAt).toLocaleDateString(
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
      ),
    },
    {
      title: "Subject",
      dataIndex: "age",
      align: "center",
      render: (_, record) => (
        <div className="thread-info">
          <p>
            <Tooltip title="View Message" color={"blue"}>
              <a onClick={() => selectedSentinfo(record)}>
                {record.sent[0].subject.length > 30
                  ? record.sent[0].subject.substring(0, 30) + "..."
                  : record.sent[0].subject}
              </a>
            </Tooltip>
          </p>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Are you sure?" color={"blue"}>
            <a onClick={() => delete_sent(record._id)} className="mail-delete">
              <DeleteFilled className="delete-style" />
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const [record_details, setSaveSentDetail] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const selectedSentinfo = (recordInfo) => {
    setSaveSentDetail(recordInfo);
    setOpen(true);
  };
  useEffect(() => {
    childFunc.current = bulkaction;
    setLoading(true);
    ongetSent(tableParams, (res) => {
      setData(res.data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.total,
        },
      });
    });
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const delete_sent = (delete_id) => {
    const delete_array = [];
    delete_array.push(delete_id);

    const data = {
      mailId: delete_array,
      action: "delete",
      is_read: false,
    };

    ondeleteSent(data, (res) => {
      if (res.success) {
        res.success ? notify("success", res.msg) : notify("error", res.msg);

        setLoading(true);
        ongetSent(tableParams, (res) => {
          setData(res.data);
          setLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: res.total,
            },
          });
        });
      }
    });
  };
  const [selectedRowkeyslist, setSelectRowkeys] = useState([]);

  const [selectionType, setSelectionType] = useState("checkbox");

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
    const data = {
      mailId: list,
      action: value,
      is_read: false,
    };

    ondeleteSent(data, (res) => {
      if (res.success) {
        res.success ? notify("success", res.msg) : notify("error", res.msg);

        setLoading(true);
        ongetSent(tableParams, (res) => {
          setData(res.data);
          setLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: res.total,
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
            columns={columnes}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            dataSource={data}
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
        closable={false}
        keyboard={false}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={900}
        footer={[
          <Button
            type="primary"
            onClick={() => setOpen(false)}
            key="button-cancel"
          >
            cancel
          </Button>,
        ]}
      >
        {record_details.sent?.map((record, index) => (
          <div id="message-thread" key={index}>
            <div
              id="thread-message-9"
              className="message-box odd sent-by-2 message-not-starred"
            >
              <div className="message-metadata">
                <Image
                  src={avatarurl + "/" + record.to_user.avatar}
                  alt="user"
                  className="avatar"
                  width={100}
                  height={100}
                />
                <div className="message-metadata-head">
                  <Tooltip title="View Profile" color={"blue"}>
                    <a
                      onClick={() =>
                        window.open(
                          baseUrl + "/user/" + record.to_user.id + "/activity",
                          "_blank"
                        )
                      }
                    >
                      @{record.to_user.username}
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
                  {record.files.length !== 0 ? (
                    <Dropdown.Button
                      menu={{
                        items: record.files.map((item, i) => ({
                          key: item,
                          label: item,
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
        ))}
      </Modal>
    </>
  );
};

const mapStateToProps = ({ mail }) => ({
  sentTotal: mail.senttotal,
  sentitems: mail.sentlist,
});

const mapDispatchToProps = (dispatch) => ({
  ongetSent: (tableParams, cb) => dispatch(getSent(tableParams, cb)),
  ondeleteSent: (data, cb) => dispatch(deleteSent(data, cb)),
  ondownloadFile: (filename) => dispatch(downloadFile(filename)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sent);
