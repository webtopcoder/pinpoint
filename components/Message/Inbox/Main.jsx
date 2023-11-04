import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Table, Row, Col, Button, Select } from "antd";
import {
  bulkMailAction,
  deleteMail,
  downloadFile,
  getInbox,
  updateMail,
  getIsReadEmail,
  replyCompose,
  getReplyByID
} from "@/redux/Mail/actions";
import useNotify from "@/hooks/useNotify";
import useInboxColumns from "./useInboxColumns";
import useMedia from "@/hooks/useMedia";

const Main = ({
  ongetInbox,
  onactionInbox,
  ondeletemail,
  onupdatemail,
  inbox,
  onGetIsReadEmails,
  user_id,
}) => {

  const router = useRouter();
  const isWebDevice = useMedia('(min-width:700px)');
  const [loading, setLoading] = useState(false);
  const { notify } = useNotify();
  const [bulkoptionValue, setBulkoption] = useState([]);
  const bulkoptionChange = (value) => {
    setBulkoption(value);
  };

  const markAsReadOrStar = (mailId, field, status) => {
    const updateField = field === "is_read" ? "is_read" : "is_star";
    const updateCallback = (res, error) => {
      if (error) {
        notify("error", error?.response?.data?.message ?? "Something went wrong");
        return;
      }

      onGetIsReadEmails({});
      ongetInbox({
        pagination: {
          current: 1,
          pageSize: 10,
        },
      }, () => { });
    };

    onupdatemail(mailId, { [updateField]: status }, updateCallback);
  };

  const { columns, Devicecolumns } = useInboxColumns({
    user_id,
    getInbox: ongetInbox,
    onDeleteMail: ondeletemail,
    ongetIsReadEmails: onGetIsReadEmails,
    markAsReadOrStar
  });

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });


  useEffect(() => {
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
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectRowkeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const bulkaction = () => {
    onactionInbox({ action: bulkoptionValue, mailIds: selectedRowkeyslist }, (res, error) => {
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
          <Row justify="space-around" vgutter={8}>
            <Col span={24}>
              <>
                <Select
                  defaultValue="bluk"
                  onChange={(e) => bulkoptionChange(e)}
                  style={{ width: 120, marginRight: 10 }}
                  options={
                    [
                      {
                        value: "bluk",
                        label: "Bluk Action",
                        disabled: true
                      },
                      {
                        value: "read",
                        label: "Mark Read",
                      },
                      {
                        value: "unread",
                        label: "Mark Unread",
                      },
                      // {
                      //   value: "star",
                      //   label: "Mark Star",
                      // },
                      // {
                      //   value: "unstar",
                      //   label: "Mark Unstar",
                      // },
                      {
                        value: "delete",
                        label: "Delete",
                      },
                    ]
                  }
                />
                <Button
                  onClick={() =>
                    bulkaction()
                  }
                  style={{
                    backgroundColor: "#175594",
                    borderColor: "#175594",
                    color: "white",
                  }}
                >
                  Apply
                </Button>
              </>
            </Col>
          </Row>
          <Table
            columns={isWebDevice ? columns : Devicecolumns}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            className="inbox-table"
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  router.push({
                    pathname: '/message/inbox/detail',
                    query: {
                      id: record?._id
                    }
                  });
                }, // click row
              };
            }}
            showHeader={false}
            dataSource={inbox}
            loading={loading}
            rowKey={(rows) => rows._id}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
          />
        </Col>
      </Row>
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
  onGetIsReadEmails: () => dispatch(getIsReadEmail()),
  onreplyCompose: (data, cb) => dispatch(replyCompose(data, cb)),
  ongetReplyByID: (id, cb) => dispatch(getReplyByID(id, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);