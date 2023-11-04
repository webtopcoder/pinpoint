import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Select } from "antd";
import { connect } from "react-redux";
import {
  bulkMailAction,
  deleteSentMail,
  downloadFile,
  getSent,
  updateMail,
  getIsReadEmails,
  replyCompose,
  getReplyByID
} from "@/redux/Mail/actions";
import useNotify from "@/hooks/useNotify";
import useSentColumns from "./useSentColumns";
import useMedia from "@/hooks/useMedia";
import { useRouter } from "next/router";

const Main = ({
  ongetSent,
  onactionInbox,
  ondeleteSentMail,
  onupdatemail,
  sent,
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

  const markAsReadOrUnRead = (mailId, is_read) => {
    onupdatemail(mailId, { is_read }, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
        return;
      }
      // notify("success", res.message);
      onGetIsReadEmails();
      ongetSent(
        {
          pagination: {
            current: 1,
            pageSize: 10,
          },
        },
        () => { }
      );
    });
  };

  const { columns, Devicecolumns } = useSentColumns({
    user_id,
    getSent: ongetSent,
    onDeleteSentMail: ondeleteSentMail,
    ongetIsReadEmails: onGetIsReadEmails,
    markAsReadOrUnRead
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
    await ongetSent(filter, (res) => {
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
        ongetSent(tableParams, (res) => {
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
                    pathname: '/message/sent/detail',
                    query: {
                      id: record?._id
                    }
                  });
                }, // click row
              };
            }}
            showHeader={false}
            dataSource={sent}
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
  sent: mail.sentlist,
  user_id: user.user_id
});

const mapDispatchToProps = (dispatch) => ({
  ongetSent: (tableParams, cb) => dispatch(getSent(tableParams, cb)),
  onactionInbox: (data, cb) => dispatch(bulkMailAction(data, cb)),
  ondownloadFile: (filename) => dispatch(downloadFile(filename)),
  ondeleteSentMail: (id, cb) => dispatch(deleteSentMail(id, cb)),
  onupdatemail: (id, form, cb) => dispatch(updateMail(id, form, cb)),
  onGetIsReadEmails: () => dispatch(getIsReadEmails()),
  onreplyCompose: (data, cb) => dispatch(replyCompose(data, cb)),
  ongetReplyByID: (id, cb) => dispatch(getReplyByID(id, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);