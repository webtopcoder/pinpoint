import React, { useState } from 'react';
import styles from './settings.module.css';
import { Col, Row, Switch, Button } from 'antd';
import { useRouter } from 'next/router';
import {
    DoubleLeftOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import AddUserModal from './addModal';

const data = [
    {
        email: 'netprince1210@gmail.com',
        role: 'Owner',
        _id: 1,
    },
    {
        email: 'netprince1210@gmail.com',
        role: 'Admin',
        _id: 2,
    }
]
const SettingAddUser = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const handleCancel = () => setShowModal(false);
    const handleOk = () => {

        setShowModal(false);
    }
    return (
        <div className="container">
            <div className={styles.page_title}>
                Settings - Additional Users
            </div>
            <div className={styles.setting_container}>
                <Row className='mb-5'>
                    <Col md={12} xs={12} sm={12}>
                        <Button type="primary" shape="round" icon={<DoubleLeftOutlined />} onClick={() => router.push('/partner/settings')}>Go back</Button>
                    </Col>
                    <Col md={12} xs={12} sm={12} className={styles.right_pane}>
                        <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={() => setShowModal(true)}>Add User</Button>
                    </Col>
                </Row>
                {
                    data && data.map((user, i) => <Row className={styles.list + ' mt-3'}>
                        <Col md={16} xs={24} sm={24} className={styles.left_pane}>
                            <div>{user.email}</div>
                            <div className={styles.role}>{user.role}</div>
                        </Col>
                        <Col md={8} xs={24} sm={24} className={styles.right_pane}>
                            <Button type="primary" shape="round" icon={<DeleteOutlined />}>Delete</Button>
                        </Col>
                    </Row>)
                }
            </div>
            <AddUserModal modal={showModal} onOk={handleOk} onCancel={handleCancel}/>
        </div>
    )
}

export default SettingAddUser;