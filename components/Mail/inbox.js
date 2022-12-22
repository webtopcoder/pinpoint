import React, { useState, useEffect, useCallback } from 'react';
import {
    Table,
    Row,
    Col,
    Select,
    Button,
    Space,
    Tooltip,
    Modal
} from 'antd'
import { connect } from 'react-redux';
import { EyeOutlined, DeleteFilled } from '@ant-design/icons';
import Image from "next/image";
import { getInbox } from '@/redux/Mail/actions';
import { deleteInbox } from '@/redux/Mail/actions';
import bpthumicon from "@/public/images/bpthum.png";
import toast from "@/components/Toast";

const Inbox = ({ ongetInbox, ondeleteInbox }) => {
    const [open, setOpen] = useState(false);

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    const columnes = [
        {
            title: '',
            width: '5%'
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
                            <a href="https://pinpointfoodtruck.com/members/codydixon/">{
                                record.Inbox[0].to
                            }
                                <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                            </a>
                            <span className="thread-count">&nbsp;({record.count})</span>
                        </div>
                        <span className="activity">last received: {
                            new Date(record.Inbox[0].createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: 'numeric', hour12: true, minute: '2-digit', second: '2-digit' })
                        }</span>
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
                            <a onClick={() => selectedInboxinfo(record)}>{record.Inbox[0].subject}</a>
                        </Tooltip>
                    </p>
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
                        <a onClick={() => mark_Inbox(record._id)} className='mark-read'>
                            <EyeOutlined className='eye-style' />
                        </a>
                    </Tooltip>
                    <Tooltip title="Are you sure?" color={'blue'}>
                        <a onClick={() => delete_Inbox(record._id)} className='mail-delete'>
                            <DeleteFilled className='delete-style' />
                        </a>
                    </Tooltip>
                </Space>
            ),
        }
    ];

    const [record_details, setSaveInboxDetail] = useState([]);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const selectedInboxinfo = (recordInfo) => {
        setSaveInboxDetail(recordInfo);
        setOpen(true);
    };
    useEffect(() => {
        setLoading(true);
        ongetInbox(tableParams, res => {
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

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const mark_Inbox = (mark_id) => {

        const delete_array = [];
        delete_array.push(mark_id);

        ondeleteInbox(delete_array, 'mark', res => {
            if (res.success) {
                res.success ? notify("success", res.msg) : notify("error", res.msg)
                setLoading(true);
                ongetInbox(tableParams, res => {
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

    const delete_Inbox = (delete_id) => {

        const delete_array = [];
        delete_array.push(delete_id);

        ondeleteInbox(delete_array, 'delete', res => {
            if (res.success) {
                res.success ? notify("success", res.msg) : notify("error", res.msg)

                setLoading(true);
                ongetInbox(tableParams, res => {
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

        ondeleteInbox(selectedRowkeyslist, bulkoptionValue, res => {
            if (res.success) {
                res.success ? notify("success", res.msg) : notify("error", res.msg)
                setLoading(true);
                ongetInbox(tableParams, res => {
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
        <>
            <Row className='mail-inbox'>
                {/* <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
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
                                value: 'mark',
                                label: 'Mark Read',
                            },
                            {
                                value: 'delete',
                                label: 'Delete',
                            },
                        ]}
                    />
                    <Button onClick={() => bulkaction()} style={{ backgroundColor: "#4fc1e9", borderColor: "#4fc1e9", color: "white" }}>Apply</Button>
                </Col> */}
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
            <Modal
                centered
                open={open}
                closable={false}
                keyboard={false}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={[
                    <Button type="primary" onClick={() => setOpen(false)}>cancel</Button>
                ]}
            >

                {record_details.Inbox?.map((record, index) =>

                    <div id='message-thread'>
                        <div id="thread-message-9" className="message-box odd Inbox-by-2 message-not-starred">
                            <div className="message-metadata">
                                <Image
                                    src={bpthumicon}
                                    alt="user"
                                    className='avatar'
                                    width={45}
                                    height={45}
                                />

                                <div className='message-metadata-head'>
                                    <a href="https://pinpointfoodtruck.com/members/codydixon/">{record.to}<i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i></a>

                                    <div className="message-meta">
                                        <span className="activity">{new Date(record.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: 'numeric', hour12: true, minute: '2-digit', second: '2-digit' })}</span>
                                    </div>
                                </div>
                                <div className="message-star-actions">
                                    <a className="bp-tooltip message-action-star" href="https://pinpointfoodtruck.com/members/dixoncody5/messages/star/9/b53c97fbaa/"><span className="icon"></span> <span className="bp-screen-reader-text">{record.subject}</span>

                                    </a>
                                </div>
                            </div>
                            <div className="message-content">
                                <p>{record.message}</p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    ongetInbox: (tableParams, cb) => dispatch(getInbox(tableParams, cb)),
    ondeleteInbox: (delete_id, bulkaction, cb) => dispatch(deleteInbox(delete_id, bulkaction, cb)),
})

export default connect(undefined, mapDispatchToProps)(Inbox);