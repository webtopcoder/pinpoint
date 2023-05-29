import { Avatar, Button, Modal, Row, Col, Skeleton, List, Input, Form } from 'antd';
import { useRouter } from "next/router";
import { apiBaseUrl } from "@/utils/baseUrl";
import useMedia from "@/hooks/useMedia";

function PartnersModal({
    open,
    setModalOpen,
    partners,
    handleLogin,
    loading,
}) {
    const router = useRouter();
    const isWebDevice = useMedia('(min-width:700px)');
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
                        itemLayout={isWebDevice ? "horizontal" : "vertical"}
                        dataSource={partners}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Form
                                        wrapperCol={{
                                        }}
                                        name="basic"
                                        style={{
                                            maxWidth: 600,
                                            marginLeft: 60
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

                                        >
                                            <Button loading={loading} type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    ,
                                ]}
                            >
                                <Skeleton direction={isWebDevice ? "vertical" : 'horizontal'} avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        avatar={<Avatar size={50} src={avatarurl + item.owner?.profile?.avatar?.filepath} />}
                                        title={<a>{item.owner.email}</a>}
                                        description={<span>The partner invited you as {item.role}</span>}
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
