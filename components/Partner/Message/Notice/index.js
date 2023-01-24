import { deleteSent, getNotice } from "@/redux/Mail/actions";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import useNoticeColumns from "./useNoticeColumn";

const Notices = ({ ondeleteSent, ongetNotice, noticelist }) => {
  const [open, setOpen] = useState(false);

  const { columns } = useNoticeColumns({
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
    </>
  );
};

const mapStateToProps = ({ mail }) => ({
  noticelist: mail.noticelist,
});

const mapDispatchToProps = (dispatch) => ({
  ongetNotice: (tableParams, cb) => dispatch(getNotice(tableParams, cb)),
  ondeleteSent: (data, cb) => dispatch(deleteSent(data, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
