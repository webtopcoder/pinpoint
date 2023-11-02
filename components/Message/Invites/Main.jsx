import React, { useState, useEffect } from "react";
import { Table, Row, Col, Select, Button } from "antd";
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

    const [bulkoptionValue, setBulkoption] = useState([]);
    const [selectedRowkeyslist, setSelectRowkeys] = useState([]);

    const bulkoptionChange = (value) => {
        setBulkoption(value);
    };

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
        // onactionInbox({ action: bulkoptionValue, mailIds: selectedRowkeyslist }, (res, error) => {
        //   if (error) {
        //     notify(
        //       "error",
        //       error?.response?.data?.message ?? "Something went wrong"
        //     );
        //   } else {
        //     notify("success", res.message);
        //     setLoading(true);
        //     ongetInbox(tableParams, (res) => {
        //       setLoading(false);
        //       setTableParams({
        //         ...tableParams,
        //         pagination: {
        //           ...tableParams.pagination,
        //           total: res.totalResults,
        //         },
        //       });
        //     });
        //   }
        // });
    };

    useEffect(() => {
        setLoading(true);
        search(tableParams);
    }, []);

    async function search(filter) {
        await setLoading(true);
        ongetPending(filter, (res) => {
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
        setTableParams({ pagination, filters, ...sorter });
        await search({ pagination, filters, ...sorter });
    }

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
                                                value: "resend",
                                                label: "Resend",
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
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
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
});

const mapDispatchToProps = (dispatch) => ({
    onresendPending: (id, cb) => dispatch(resendPending(id, cb)),
    ongetPending: (tableParams, cb) => dispatch(getPending(tableParams, cb)),
    ondeleteSent: (data, cb) => dispatch(deleteMail(data, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingInvite);
