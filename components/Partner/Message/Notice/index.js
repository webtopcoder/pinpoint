import { deleteMail, getNotice } from "@/redux/Mail/actions";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import { Button, Col, Dropdown, Modal, Row, Table, Tooltip } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import useNoticeColumns from "./useNoticeColumn";
import config from "@/utils/config";

const avatarurl = `${apiBaseUrl}/avatar/`;

const Notices = ({ ondeleteSent, ongetNotice, noticelist }) => {
  const [open, setOpen] = useState(false);

  const { columns, record_detail } = useNoticeColumns({
    setOpen,
    onDeleteNotice: ondeleteSent,
    getNotice: ongetNotice,
  });

  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    setLoading(true);
    ongetNotice(tableParams, (res) => {
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
    console.log(pagination);
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <>
      <Row className="mail-inbox">
        <Col md={24} sm={24} xs={24}>
          <Table
            columns={columns}
            dataSource={noticelist}
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
        {record_detail && (
          <div id="message-thread">
            <div
              id="thread-message-9"
              className="message-box odd sent-by-2 message-not-starred"
            >
              <div className="message-metadata">
                <img
                  src={
                    avatarurl +
                    "/" +
                    record_detail?.to?.profile?.avatar?.filepath
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
  noticelist: mail.noticelist,
});

const mapDispatchToProps = (dispatch) => ({
  ongetNotice: (tableParams, cb) => dispatch(getNotice(tableParams, cb)),
  ondeleteSent: (data, cb) => dispatch(deleteMail(data, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
