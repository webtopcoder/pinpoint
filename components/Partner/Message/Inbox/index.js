import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Tooltip, Modal, Dropdown } from "antd";
import { connect } from "react-redux";
import { DownloadOutlined } from "@ant-design/icons";
import Image from "next/image";
import {
  deleteSent,
  downloadFile,
  getInbox,
  updateMail,
} from "@/redux/Mail/actions";
import { actionInbox } from "@/redux/Mail/actions";
import config from "@/utils/config";
import baseUrl from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import useInboxColumns from "./useInboxColumns";

const avatarurl = `http://${config.server}:${config.port}/avatar/`;
const attachurl = `http://${config.server}:${config.port}/avatar/`;

const Inbox = ({
  ondownloadFile,
  ongetInbox,
  onactionInbox,
  ondeletemail,
  onupdatemail,
  childFunc,
  bulkvalue,
  childlistfunc,
  inbox,
}) => {
  const [open, setOpen] = useState(false);

  const { notify } = useNotify();
  const { record_detail, columns } = useInboxColumns({
    setOpen,
    getInbox: ongetInbox,
    onDeleteMail: ondeletemail,
    onUpdateMail: onupdatemail,
  });

  const onMenuClick = (e) => {
    ondownloadFile(e.key);
    window.open(attachurl + e.key, "_blank");
  };

  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    childFunc.current = bulkaction;
    setLoading(true);
    ongetInbox(tableParams, (res) => {
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.total,
        },
      });
    });
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

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
      console.log(selectedRowkeyslist);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const bulkaction = (value, list) => {
    let actiontype = "";
    let is_readtype = false;

    if (value === "bluk") {
      notify("error", "Please select Bluk Action");
      return;
    } else if (value == "read") {
      actiontype = "mark";
      is_readtype = true;
    } else if (value == "unread") {
      actiontype = "mark";
      is_readtype = false;
    } else {
      actiontype = "delete";
      is_readtype = true;
    }

    const data = {
      mailId: list,
      action: actiontype,
      is_read: is_readtype,
    };

    onactionInbox(data, (res) => {
      if (res.success) {
        res.success ? notify("success", res.msg) : notify("error", res.msg);
        setLoading(true);
        ongetInbox(tableParams, (res) => {
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
            columns={columns}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            dataSource={inbox}
            loading={loading}
            rowKey={(rows) => rows.from}
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
        width={1000}
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
        {record_detail && (
          <div id="message-thread">
            <div
              id="thread-message-9"
              className="message-box odd Inbox-by-2 message-not-starred"
            >
              <div className="message-metadata">
                <Image
                  src={
                    avatarurl +
                    "/" +
                    record_detail?.from?.profile?.avatar?.filepath
                  }
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
                          baseUrl +
                            "/profile/" +
                            record_detail?.from?._id +
                            "/activity",
                          "_blank"
                        )
                      }
                    >
                      @{record_detail?.from?.username}
                      <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                    </a>
                  </Tooltip>
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
      </Modal>
    </>
  );
};
const mapStateToProps = ({ mail }) => ({
  inbox: mail.inboxlist,
});

const mapDispatchToProps = (dispatch) => ({
  ongetInbox: (tableParams, cb) => dispatch(getInbox(tableParams, cb)),
  onactionInbox: (action_id, bulkaction, cb) =>
    dispatch(actionInbox(action_id, bulkaction, cb)),
  ondownloadFile: (filename) => dispatch(downloadFile(filename)),
  ondeletemail: (id, cb) => dispatch(deleteSent(id, cb)),
  onupdatemail: (id, form, cb) => dispatch(updateMail(id, form, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
