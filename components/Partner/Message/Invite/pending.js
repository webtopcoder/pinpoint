import React, { useState, useEffect } from "react";
import { Table, Row, Col } from "antd";
import { connect } from "react-redux";
import { deleteMail } from "@/redux/Mail/actions";
import { getPending } from "@/redux/Mail/actions";
import { resendPending } from "@/redux/Mail/actions";
import usePendingColumns from "./usePendingColumns";

const PendingInvite = ({
  pendinglist,
  ondeleteSent,
  ongetPending,
  onresendPending,
}) => {
  const { columns } = usePendingColumns({
    onDeleteMail: ondeleteSent,
    onResendInvite: onresendPending,
    onGetPending: ongetPending,
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
    ongetPending(tableParams, (res) => {
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
            dataSource={pendinglist}
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
  pendinglist: mail.pendinglist,
  pendingtotal: mail.pendingtotal,
});

const mapDispatchToProps = (dispatch) => ({
  onresendPending: (id, cb) => dispatch(resendPending(id, cb)),
  ongetPending: (tableParams, cb) => dispatch(getPending(tableParams, cb)),
  ondeleteSent: (data, cb) => dispatch(deleteMail(data, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingInvite);
