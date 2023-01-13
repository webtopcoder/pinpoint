import React from 'react';
import { Modal, Row, Col, Input, Select } from 'antd';
import styles from './settings.module.css';

const AddUserModal = ({ modal, onOk, onCancel }) => {

    return (
        <Modal
            className={styles.partner_setting_adduser + ' settings'}
            okText="Add User"
            cancelText="Cancel"
            open={modal}
            onOk={onOk}
            onCancel={onCancel}
        >
            <div className={styles.partner_setting_logo}></div>
            <Row className={styles.modal_title}>
                Add Additional User
            </Row>
            <Row className={styles.modalform}>
                Additional User Email
                <Input placeholder='Enter email here' />
            </Row>
            <Row className={styles.modalform + ' mt-1'}>
                Permissions Type
                <Select style={{ width: '100%' }} defaultValue={'admin'}>
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="owner">Owner</Select.Option>
                </Select>
            </Row>
            <Row className='mt-3'>
                <Col md={8}>
                    <div className={styles.role_title}>Owner</div>
                    <div className={styles.role_comment}>
                        Access to everything
                    </div>
                </Col>
                <Col md={8}>
                    <div className={styles.role_title}>Admin</div>
                    <div className={styles.role_comment}>
                        Everything BUT access to payments and adding/removing additional users.
                    </div>
                </Col>
                <Col md={8}>
                    <div className={styles.role_title}>Basic</div>
                    <div className={styles.role_comment}>
                        Can only mark the Arrival or Departure of a location.
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}

export default AddUserModal;