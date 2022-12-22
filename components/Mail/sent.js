import React, { useState, useEffect, useCallback } from 'react';
import {
    Table,
    Row,
    Col,
    Select,
    Button,
    Space,
    Tooltip,
} from 'antd'
import { connect } from 'react-redux';
import { EyeOutlined, DeleteFilled } from '@ant-design/icons';
import Image from "next/image";
import { getSent } from '@/redux/Mail/actions';
import { deleteSent } from '@/redux/Mail/actions';
import bpthumicon from "@/public/images/bpthum.png";
import toast from "@/components/Toast";

const Sent = ({ ongetSent, ondeleteSent }) => {

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    const columnes = [
        {
            title: ''
        },
        {
            title: 'From',
            align: 'left',
            width: '30%',
            sorter: true,
            render: (_, record) => (
                <div className='thread-sender'>
                    <div className="thread-avatar">
                        <Image
                            src={bpthumicon}
                            alt="user"
                        />
                    </div>
                    <div className="thread-from">
                        <div className="from">
                            <a href="https://pinpointfoodtruck.com/members/codydixon/">{record.to}
                                <i class="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                            </a>
                            <span className="thread-count">(11)</span>
                            <span className="bp-screen-reader-text">1 unread</span>
                        </div>
                        <span className="activity">December 4, 2022 at 7:37 pm</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Subjdect',
            dataIndex: 'age',
            align: 'center',
            render: (_, record) => (
                <div className='thread-info'>
                    <p>
                        <Tooltip title="View Message" color={'blue'}>
                            <a>{record.subject}</a>
                        </Tooltip>
                    </p>
                    <p className="thread-excerpt">{record.message}</p>
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Mark as Read" color={'blue'}>
                        <a className='mark-read'>
                            <EyeOutlined className='eye-style' />
                        </a>
                    </Tooltip>
                    <Tooltip title="Are you sure?" color={'blue'}>
                        <a onClick={() => delete_sent(record._id)} className='mail-delete'>
                            <DeleteFilled className='delete-style' />
                        </a>
                    </Tooltip>
                </Space>
            ),
        }
    ];

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    useEffect(() => {
        setLoading(true);
        ongetSent(tableParams, res => {
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

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const delete_sent = (delete_id) => {

        const delete_array = [];
        delete_array.push(delete_id);

        ondeleteSent(delete_array, 'delete', res => {
            if (res.success) {
                res.success ? notify("success", res.msg) : notify("error", res.msg)

                setLoading(true);
                ongetSent(tableParams, res => {
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
    const [bulkoptionValue, setBulkoption] = useState([]);

    const bulkoptionChange = (value) => {
        setBulkoption(value);
    };

    const [selectionType, setSelectionType] = useState('checkbox');

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

            setSelectRowkeys(selectedRowKeys)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const bulkaction = () => {

        console.log(selectedRowkeyslist, bulkoptionValue)
        ondeleteSent(selectedRowkeyslist, bulkoptionValue, res => {
            if (res.success) {
                res.success ? notify("success", res.msg) : notify("error", res.msg)

                setLoading(true);
                ongetSent(tableParams, res => {
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
        <Row className='mail-inbox'>
            <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Select
                    defaultValue=""
                    onChange={(e) => bulkoptionChange(e)}
                    style={{ width: 120, marginRight: 10 }}
                    options={[
                        {
                            value: 'bluk',
                            label: 'Bluk Action',
                        },
                        {
                            value: 'mark-read',
                            label: 'Mark Read',
                        },
                        {
                            value: 'delete',
                            label: 'Delete',
                        },
                    ]}
                />
                <Button onClick={() => bulkaction()} style={{ backgroundColor: "#4fc1e9", borderColor: "#4fc1e9", color: "white" }}>Apply</Button>
            </Col>
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
    )
}

const mapStateToProps = ({ mail }) => ({
    sentTotal: mail.senttotal,
    sentitems: mail.sentlist
})

const mapDispatchToProps = dispatch => ({
    ongetSent: (tableParams, cb) => dispatch(getSent(tableParams, cb)),
    ondeleteSent: (delete_id, bulkaction, cb) => dispatch(deleteSent(delete_id, bulkaction, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sent);