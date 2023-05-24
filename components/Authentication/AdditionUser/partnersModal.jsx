import { Avatar, Button, Modal, Row, Col, Skeleton, List, Input, Form } from 'antd';
import { useEffect, useState } from 'react';
import { formatDate } from "@/utils/date";
import { useRouter } from "next/router";
import useMedia from "@/hooks/useMedia";
import { apiBaseUrl } from "@/utils/baseUrl";

function PartnersModal({
    open,
    setModalOpen,
    partners,
    handleLogin
}) {
    const router = useRouter();
    const isWebDevice = useMedia('(min-width:700px)');
    const [initLoading, setInitLoading] = useState(false);
    const avatarurl = `${apiBaseUrl}/avatar/`;

    return (
        <Modal
            className="dashboard-modal"
            centered
            open={open}
            width={1200}
            closable={false}
            onCancel={() => setModalOpen(false)}
            footer={null}
        >
            <Row>
                <Col md={24} sm={24} xs={24}>
                    <List
                        className="demo-loadmore-list"
                        loading={initLoading}
                        itemLayout="horizontal"
                        dataSource={partners}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Form

                                        name="basic"
                                        style={{
                                            maxWidth: 600,
                                        }}
                                        onFinish={(values) => handleLogin(values, item.owner._id)}
                                        layout='inline'
                                    >
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                            ]}

                                        >
                                            <Input.Password placeholder='Password' />
                                        </Form.Item>
                                        <Form.Item
                                            wrapperCol={{
                                                offset: 8,
                                                span: 16,
                                            }}
                                        >
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    ,
                                ]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        avatar={<Avatar src={avatarurl + item.owner?.profile?.avatar?.filepath} />}
                                        title={<a href="https://ant.design">{item.owner.email}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </Modal>
    );
}

export default PartnersModal;
