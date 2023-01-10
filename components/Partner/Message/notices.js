import React, { useState, useEffect, useCallback } from 'react';
import {
    Table,
    Row,
    Col,
    Button,
    Space,
    Tooltip,
    Tag
} from 'antd'
import { connect } from 'react-redux';
import { deleteSent } from '@/redux/Mail/actions';
import { getPending } from '@/redux/Mail/actions';
import { resendPending } from '@/redux/Mail/actions';
import toast from "@/components/Toast";
import config from '@/utils/config';

const Notices = ({ ondeleteSent, ongetPending, onresendPending }) => {

    const attachurl = `http://${config.server}:${config.port}/mail/`;

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    const columnes = [
        {
            title: 'Subject',
            align: 'center',
            width: '30%',
            sorter: true,
            render: (_, record) => (
                <div className='thread-sender'>
                    <div className="thread-from">
                        <div className="from">
                            <p className='pending_email'>{
                                record.to
                            }
                                <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                            </p>
                        </div>
                        <span className="activity">{
                            new Date(record.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: 'numeric', hour12: true, minute: '2-digit', second: '2-digit' })
                        }</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Notice Message',
            dataIndex: 'age',
            align: 'center',
            render: (_, record) => (
                <div className='thread-info'>
                    <p>
                        <Tooltip title={record.message} color={'blue'}>
                            <a onClick={() => selectedSentinfo(record)}>
                                {
                                    record.message.length > 10000 ? record.message.substring(0, 30) + "..." : record.message
                                }
                            </a>
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
                    {record.is_read ?
                        <Tag color="success">Accepted</Tag>
                        :
                        <Button onClick-={() => resend_pending(record.to)} type="primary">Resend</Button>
                    }
                    <Button onClick={() => delete_pending(record.to)} type="primary" danger>Delete</Button>
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
        ongetPending(tableParams, res => {
            setData(res.pending);
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
        console.log(pagination)
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const delete_pending = (delete_id) => {

        const delete_array = [];
        delete_array.push(delete_id);

        const data = {
            mailId: delete_array,
            action: 'delete',
            is_read: false
        }

        ondeleteSent(data, res => {
            if (res.success) {
                res.success ? notify("success", res.msg) : notify("error", res.msg)

                setLoading(true);
                ongetPending(tableParams, res => {
                  
                    setData(res.pending);
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

    const resend_pending = (delete_id) => {
        
        onresendPending(delete_id, res => {
            if (res.success) {
                res.success ? notify("success", res.msg) : notify("error", res.msg)

            }
        });
    };

    return (
        <>
            <Row className='mail-inbox'>
                <Col md={24} sm={24} xs={24}>
                    <Table
                        columns={columnes}
                        dataSource={data}
                        loading={loading}
                        rowKey={(rows) => rows._id}
                        pagination={tableParams.pagination}
                        onChange={handleTableChange}
                    />
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = ({ mail }) => ({
    sentTotal: mail.senttotal,
    sentitems: mail.sentlist
})

const mapDispatchToProps = dispatch => ({
    onresendPending: (id, cb) => dispatch(resendPending(id, cb)),
    ongetPending: (tableParams, cb) => dispatch(getPending(tableParams, cb)),
    ondeleteSent: (data, cb) => dispatch(deleteSent(data, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notices);