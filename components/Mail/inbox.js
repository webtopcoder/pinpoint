import React, { useState, useEffect } from 'react';
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
import { getInbox } from '@/redux/Mail/actions';
import bpthumicon from "@/public/images/bpthum.png";

const Inbox = ({ ongetInbox, inboxitems }) => {

    const columnes = [

        {
            title: 'From',
            align: 'center',
            width: '30%',
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
                            <a href="https://pinpointfoodtruck.com/members/codydixon/">Cody Dixon<i class="fas fa-check youzify-account-verified youzify-small-verified-icon"></i></a>
                            <span className="thread-count">(11)</span>
                            <span className="bp-screen-reader-text">1 unread</span>
                        </div>
                        <span className="activity">December 4, 2022 at 7:37 pm</span>
                    </div>
                </div>

            ),
        },
        {
            title: 'Subject',
            dataIndex: 'age',
            align: 'center',
            render: (_, record) => (
                <div className='thread-info'>
                    <p>
                        <Tooltip title="View Message" color={'blue'}>
                            <a>gretting</a>
                        </Tooltip>
                    </p>
                    <p className="thread-excerpt">Here is my fiverr profile link : –&gt; […]</p>
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
                        <a className='mail-delete'>
                            <DeleteFilled className='delete-style' />
                        </a>
                    </Tooltip>
                </Space>
            ),
        }
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        },
    ];

    useEffect(() => {
        ongetInbox();
    }, [])

    const [selectionType, setSelectionType] = useState('checkbox');
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (

        <Row className='mail-inbox'>
            <Col md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                <Select
                    defaultValue="lucy"
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
                <Button style={{ backgroundColor: "#4fc1e9", borderColor: "#4fc1e9", color: "white" }}>Apply</Button>
            </Col>
            <Col md={24} sm={24} xs={24}>
                <Table
                    columns={columnes}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    dataSource={data}
                />
            </Col>

        </Row>
    )
}


const mapStateToProps = ({ mail }) => ({
    inboxitems: mail.inboxlist
})

const mapDispatchToProps = dispatch => ({
    ongetInbox: () => dispatch(getInbox()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);