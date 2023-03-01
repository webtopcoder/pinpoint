import React, { useState, useEffect } from "react";
import { Table, Row, Col, Tooltip, Modal, Dropdown } from "antd";
import { connect } from "react-redux";
import { DownloadOutlined } from "@ant-design/icons";
import { bulkMailAction, getSent } from "@/redux/Mail/actions";
import { downloadFile } from "@/redux/Mail/actions";
import { deleteMail } from "@/redux/Mail/actions";
import config from "@/utils/config";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import useSentColumns from "./useSentColumns";

const avatarurl = `${apiBaseUrl}/avatar/`;
const attachurl = `${apiBaseUrl}/avatar/`;

const Sent = ({
  ondownloadFile,
  ongetSent,
  ondeleteSent,
  sentitems,
  childlistfunc,
  childFunc,
  onBulkDelete,
}) => {
  const onMenuClick = (e) => {
    ondownloadFile(e.key);
    window.open(attachurl + e.key, "_blank");
  };
  const [open, setOpen] = useState(false);
  const { notify } = useNotify();
  const { columns, record_detail } = useSentColumns({
    setOpen,
    onDeleteSent: ondeleteSent,
    getSent: ongetSent,
  });

  const [loading, setLoading] = useState(false);
  const [selectedRowkeyslist, setSelectRowkeys] = useState([]);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    childFunc.current = bulkaction;
    setLoading(true);
    ongetSent(tableParams, (res) => {
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
  };

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
    onBulkDelete({ action: value, mailIds: list }, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
      } else {
        notify("success", res.message);
        setLoading(true);
        ongetSent(tableParams, (res) => {
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
            dataSource={sentitems}
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
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={900}
        footer={null}
      >
        {record_detail && (
          <div id="message-thread">
            <div
              id="thread-message-9"
              className="message-box odd sent-by-2 message-not-starred"
            >
              <div className="message-metadata">
                <img
                  src={avatarurl + record_detail?.to?.profile?.avatar?.filepath}
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
                            record_detail?.to?._id +
                            "/activity",
                          "_blank"
                        )
                      }
                    >
                      @{record_detail?.to?.username}
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
                  {record_detail.files.length !== 0 ? (
                    <Dropdown.Button
                      menu={{
                        items: record_detail.files.map((item) => ({
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
  sentTotal: mail.senttotal,
  sentitems: mail.sentlist,
});

const mapDispatchToProps = (dispatch) => ({
  ongetSent: (tableParams, cb) => dispatch(getSent(tableParams, cb)),
  ondeleteSent: (data, cb) => dispatch(deleteMail(data, cb)),
  ondownloadFile: (filename) => dispatch(downloadFile(filename)),
  onBulkDelete: (data, cb) => dispatch(bulkMailAction(data, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sent);
