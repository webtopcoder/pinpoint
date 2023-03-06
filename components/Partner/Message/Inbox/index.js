import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Tooltip, Modal, Dropdown } from "antd";
import { connect } from "react-redux";
import { DownloadOutlined } from "@ant-design/icons";
import Image from "next/image";
import {
  bulkMailAction,
  deleteMail,
  downloadFile,
  getInbox,
  updateMail,
} from "@/redux/Mail/actions";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import useInboxColumns from "./useInboxColumns";
import { getIsReadEmails } from "@/src/redux/Mail/actions";

const avatarurl = `${apiBaseUrl}/avatar/`;
const attachurl = `${apiBaseUrl}/avatar/`;

const loader = ({ src }) => {
  return `${src}`;
};

const Inbox = ({
  ondownloadFile,
  ongetInbox,
  onactionInbox,
  ondeletemail,
  onupdatemail,
  childFunc,
  childlistfunc,
  inbox,
  onGetIsReadEmails
}) => {
  const [open, setOpen] = useState(false);

  const { notify } = useNotify();
  const { record_detail, columns } = useInboxColumns({
    setOpen,
    getInbox: ongetInbox,
    onDeleteMail: ondeletemail,
    onUpdateMail: onupdatemail,
    ongetIsReadEmails: onGetIsReadEmails
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
                <img
                  src={
                    avatarurl + record_detail?.from?.profile?.avatar?.filepath
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
  onactionInbox: (data, cb) => dispatch(bulkMailAction(data, cb)),
  ondownloadFile: (filename) => dispatch(downloadFile(filename)),
  ondeletemail: (id, cb) => dispatch(deleteMail(id, cb)),
  onupdatemail: (id, form, cb) => dispatch(updateMail(id, form, cb)),
  onGetIsReadEmails: () => dispatch(getIsReadEmails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
