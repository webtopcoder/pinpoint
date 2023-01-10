import React, { useState, useEffect, useCallback } from 'react';
import {
    Table,
    Row,
    Col,
    Button,
    Space,
    Tooltip,
    Modal,
    Dropdown
} from 'antd'
import { connect } from 'react-redux';
import { EyeOutlined, EyeInvisibleOutlined, DeleteFilled, DownloadOutlined } from '@ant-design/icons';
import Image from "next/image";
import { getInbox } from '@/redux/Mail/actions';
import { actionInbox } from '@/redux/Mail/actions';
import toast from "@/components/Toast";
import config from '@/utils/config';
import baseUrl from '@/utils/baseUrl';



const Inbox = ({ ongetInbox, onactionInbox, childFunc, bulkvalue, childlistfunc }) => {

    const onMenuClick = (e) => {
        ondownloadFile(e.key);
        window.open(attachurl + e.key, '_blank')
    };

    const [open, setOpen] = useState(false);
    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);
    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);
    const avatarurl = `http://${config.server}:${config.port}/avatar/`;

    const columnes = [
        {
            title: '',
            width: '1%'
        },
        {
            title: 'From',
            align: 'center',
            width: '40%',
            sorter: true,
            render: (_, record) => (
                <div className='thread-sender'>
                    <div className="thread-avatar">
                        <img
                            src={avatarurl + '/' + record.from_user.avatar}
                            alt="user"
                            className='avatar'
                            width={45}
                            height={45}
                        />
                    </div>
                    <div className="thread-from">
                        <div className="from">
                            <Tooltip title="View Profile" color={'blue'}>
                                <a
                                    onClick={() => window.open(baseUrl + '/user/' + record.from_user.id + '/activity', '_blank')}>@{
                                        record.from_user.username
                                    }
                                    <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                                </a>
                            </Tooltip>
                            <span className="">&nbsp;({record.count})</span>
                        </div>
                        <span className="activity">last received: {
                            new Date(record.inbox[0].createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: 'numeric', hour12: true, minute: '2-digit', second: '2-digit' })
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
                            <a onClick={() => selectedInboxinfo(record)}>{
                                record.inbox[0].subject.length > 30 ? record.inbox[0].subject.substring(0, 30) + "..." : record.inbox[0].subject
                            }</a>
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
                    {
                        !record.is_read ?
                            <Tooltip title="Mark as Read" color={'blue'}>
                                <a onClick={() => mark_Inbox(record.inbox[0].from, !record.is_read)} className='mark-read'>
                                    <EyeOutlined className='eye-style' />
                                </a>
                            </Tooltip>
                            :
                            <Tooltip title="Mark as Read" color={'blue'}>
                                <a onClick={() => mark_Inbox(record.inbox[0].from, !record.is_read)} className='mark-read'>
                                    <EyeInvisibleOutlined className='eye-style' />
                                </a>
                            </Tooltip>
                    }
                    <Tooltip title="Are you sure?" color={'blue'}>
                        <a onClick={() => delete_Inbox(record.inbox[0].from)} className='mail-delete'>
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

        childFunc.current = bulkaction;
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

    const mark_Inbox = (mark_id, read_status) => {

        const mark_array = [];
        mark_array.push(mark_id);
        const data = {
            mailId: mark_array,
            action: 'mark',
            is_read: read_status
        }
        onactionInbox(data, res => {
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
        const data = {
            mailId: delete_array,
            action: 'delete',
            is_read: true
        }

        onactionInbox(data, res => {
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
    const [selectionType, setSelectionType] = useState('checkbox');
    useEffect(() => {
        childlistfunc(selectedRowkeyslist);
    }, [selectedRowkeyslist])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectRowkeys(selectedRowKeys);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            console.log(selectedRowkeyslist)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const bulkaction = (value, list) => {
        const actiontype = '';
        const is_readtype = false;

        if (value === 'bluk') {
            notify("error", 'Please select Bluk Action');
            return;
        }
        else if (value == 'read') {
            actiontype = 'mark'
            is_readtype = true
        }

        else if (value == 'unread') {
            actiontype = 'mark'
            is_readtype = false
        }

        else {
            actiontype = 'delete'
            is_readtype = true
        }

        const data = {
            mailId: list,
            action: actiontype,
            is_read: is_readtype
        }

        onactionInbox(data, res => {
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
                <Col md={24} sm={24} xs={24}>
                    <Table
                        columns={columnes}
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                        }}
                        dataSource={data}
                        loading={loading}
                        rowKey={(rows) => rows.inbox[0].from}
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
                {record_details.inbox?.map((record, index) =>
                    <div id='message-thread'>
                        <div id="thread-message-9" className="message-box odd Inbox-by-2 message-not-starred">
                            <div className="message-metadata">
                                <img
                                    src={avatarurl + '/' + record.from_user.avatar}
                                    alt="user"
                                    className='avatar'
                                    width={100}
                                    height={100}
                                />
                                <div className='message-metadata-head'>
                                    <Tooltip title="View Profile" color={'blue'}>
                                        <a
                                            onClick={() => window.open(baseUrl + '/user/' + record.from_user.id + '/activity', '_blank')}>@{record.from_user.username}
                                            <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                                        </a>
                                    </Tooltip>
                                    <div className="message-meta">
                                        <span className="activity">{new Date(record.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: 'numeric', hour12: true, minute: '2-digit', second: '2-digit' })}</span>
                                    </div>

                                </div>
                                <div className="message-star-actions">
                                    {(record.files).length !== 0 ? <Dropdown.Button
                                        menu={{
                                            items: record.files.map((item, i) => ({ key: item, label: item })),
                                            onClick: onMenuClick,
                                        }}
                                        icon={<DownloadOutlined />}
                                    >
                                        Attached Files
                                    </Dropdown.Button> : ''}
                                </div>
                            </div>
                            <div className="message-content">
                                <p className='message-subject'>{record.subject}</p>
                                <pre>{record.message}</pre>
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
    onactionInbox: (action_id, bulkaction, cb) => dispatch(actionInbox(action_id, bulkaction, cb)),
})

export default connect(undefined, mapDispatchToProps)(Inbox);