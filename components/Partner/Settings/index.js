import React from 'react';
import styles from './settings.module.css';
import { Col, Row, Switch } from 'antd';
import { useRouter } from 'next/router';

const Setting = () => {
    const router = useRouter();
    return (
        <div className="container">
            <div className={styles.page_title}>
                Settings
            </div>
            <div className={styles.setting_container}>
                <Row className={styles.list}>
                    <Col md={16} xs={16} sm={16} className={styles.left_pane}>Notify me when I receive a like, comment or rating.</Col>
                    <Col md={8} xs={8} sm={8} className={styles.right_pane}>
                        <Switch
                            checkedChildren='Yes'
                            unCheckedChildren='No'
                            defaultChecked
                        />
                    </Col>
                </Row>
                <Row className={styles.list + ' mt-3'}>
                    <Col md={16} xs={16} sm={16} className={styles.left_pane}>Notify me when I receive a follow request.</Col>
                    <Col md={8} xs={8} sm={8} className={styles.right_pane}>
                        <Switch
                            checkedChildren='Yes'
                            unCheckedChildren='No'
                            defaultChecked
                        />
                    </Col>
                </Row>
                <Row className={styles.list + ' mt-3'}>
                    <Col md={16} xs={16} sm={16} className={styles.left_pane}>Notify me when I get a mention.</Col>
                    <Col md={8} xs={8} sm={8} className={styles.right_pane}>
                        <Switch
                            checkedChildren='Yes'
                            unCheckedChildren='No'
                            defaultChecked
                        />
                    </Col>
                </Row>
                <Row className={styles.list + ' mt-3'}>
                    <Col md={16} xs={16} sm={16} className={styles.left_pane}>Notify me when I have a Location status change.</Col>
                    <Col md={8} xs={8} sm={8} className={styles.right_pane}>
                        <Switch
                            checkedChildren='Yes'
                            unCheckedChildren='No'
                            defaultChecked
                        />
                    </Col>
                </Row>
                <Row className={styles.list_round + ' mt-3'} onClick={() => router.push('/partner/settings/adduser')}>
                    Additional Users
                </Row>
                <Row className={styles.list_round + ' mt-3'} onClick={() => router.push('/partner/settings/business')}>
                    Modify Business Details
                </Row>
                <Row className={styles.list_round + ' mt-3'}>
                    Partnership Payment Details
                </Row>
            </div>
        </div>
    )
}

export default Setting;