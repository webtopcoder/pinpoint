import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { connect } from 'react-redux';
import { Layout, Upload, Tag, Card, Col, Row, Button, Divider, Badge, Modal, Typography, DatePicker, Select, message, Form, Input, Space } from 'antd';
import quickArrival from "@/public/images/partner/quick_arrival.png";
import quickDeparture from "@/public/images/partner/quick_departure.png";
import food from "@/public/images/landing/food.png";
import {
    UploadOutlined
} from '@ant-design/icons';

const { Option } = Select;

const { TextArea } = Input;

const { Title, Text, Paragraph } = Typography;

const { Content } = Layout;

const Partnership = () => {

    const [form] = Form.useForm();
    const [upload_name, setUploadFile] = useState([]);

    const [modal2Open, setModal2Open] = useState(false);
    const [modal1Open, setModal1Open] = useState(false);

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };
    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    const handleChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    const props = {
        name: 'upload',
        onChange(info) {
            if (info.file.status !== 'uploading') {
                const fileUploadInfo = info.fileList;
                setUploadFile(fileUploadInfo);
            }

            if (info.file.status == 'removed') {
                if (info.fileList.length == 0)
                    setUploadFile('');
                else {
                    const fileUploadInfo = info.fileList;
                    setUploadFile(fileUploadInfo);
                }
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Layout className="site-layout" style={{
            background: '#211f1f'
        }}>
            <Content
                style={{
                    margin: '100px 40px',
                }}
            >
                <div className="site-card-wrapper">
                    <Row gutter={[32, 32]}>
                        <Col xs={24} sm={24} md={20} lg={20} xl={20} offset={2} >
                            <Paragraph style={{
                                color: 'white',
                                fontSize: 20,
                                textAlign: 'center',
                                padding: 10,
                                background: 'teal',
                                borderRadius: 10
                            
                            }}>
                                Pinpoint Partnership - Being a Pinpoint Partner will give you access to our interactive map feature. This will allow you to post your active locations for Pinpoint Users to see. Your Partnership will be billed monthly (30 days following your payment) and is able to be cancelled at any point. If cancelled, the cancellation will go into affect at the end of your current Partnership period.
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={[32, 32]} style={{
                        marginTop: 20
                    }}>
                        <Col xs={12} sm={8} md={4} lg={4} xl={4}>
                        </Col>
                        <Col xs={12} sm={8} md={6} lg={8} xl={8}>
                            <Badge.Ribbon text="Active" color="green">

                                <Card className="membership-card-style" title="Free"
                                    headStyle={{
                                        fontSize: 25,
                                        fontWeight: 700
                                    }} bordered={false}>
                                    <Space direction="vertical">
                                        <Space wrap>
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: 700
                                            }}>$</Text>
                                            <Text style={{
                                                fontSize: 50,
                                                fontWeight: 700
                                            }}>0</Text>
                                        </Space>
                                        <Space wrap>
                                            <Button type="primary" size='large' disabled>
                                                Already Joined
                                            </Button>

                                            <Divider></Divider>
                                        </Space>
                                        <Space>
                                            <Text style={{
                                                fontSize: 15,
                                            }}>Everything is Free
                                            </Text>

                                        </Space>
                                        <Space>
                                            <Text style={{
                                                fontSize: 15,
                                            }}>Allow to post the active locations
                                            </Text>

                                        </Space>

                                    </Space>
                                </Card>
                            </Badge.Ribbon>

                        </Col>
                        <Col xs={12} sm={8} md={6} lg={8} xl={8}>
                            <Card className="membership-card-style" title="Premium" headStyle={{
                                fontSize: 25,
                                fontWeight: 700
                            }} bordered={false}>
                                <Space direction="vertical">
                                    <Space wrap>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 700
                                        }}>$</Text>
                                        <Text style={{
                                            fontSize: 50,
                                            fontWeight: 700
                                        }}>25</Text>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 700
                                        }}>/ month</Text>
                                    </Space>
                                    <Space wrap>
                                        <Button type="primary" size='large'>
                                            Buy Now
                                        </Button>
                                        <Divider></Divider>

                                    </Space>
                                    <Space>
                                        <Text style={{
                                            fontSize: 15,
                                        }}>Everything is Free
                                        </Text>

                                    </Space>
                                    <Space>
                                        <Text style={{
                                            fontSize: 15,
                                        }}>Allow to post the active locations
                                        </Text>

                                    </Space>

                                </Space>


                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Modal
                className="dashboard-modal"
                centered
                open={modal2Open}
                width={700}
                closable={false}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                footer={null}
            >
                <Row>
                    <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                    </Col>
                    <Col xs={20} sm={20} md={8} lg={8} xl={8} style={{
                        margin: 'auto'
                    }}>
                        <Title style={{
                            textAlign: 'center',
                            fontWeight: 900
                        }} level={2}>Arrival</Title>
                    </Col>
                    <Col xs={4} sm={4} md={8} lg={8} xl={8} style={{
                        textAlign: 'right'
                    }}>
                        <Image src={food} alt="Snow" width={50} height={70} />
                    </Col>
                </Row>
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Row>
                        <Col xs={24} sm={24} md={6} lg={8} xl={8}>
                            <Form.Item label="Departure" required name="requiredMarkValue">
                                <DatePicker format="DD/MM/YYYY h:mm:ss A" use12Hours showTime onChange={onChange} onOk={onOk} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={18} lg={16} xl={16}>
                            <Form.Item label="Partner Location" required tooltip="This is a required field">
                                <Select
                                    size='middle'
                                    defaultValue="a1"
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Option style={{
                                        display: 'flex'
                                    }} value={1}>Item 1
                                        <Tag style={{
                                            textAlign: 'right',
                                            float: 'right'
                                        }} color="#87d068">Active</Tag>
                                    </Option>
                                    <Option value={2}>Item 2
                                        <Tag style={{
                                            textAlign: 'right',
                                            float: 'right'
                                        }} color="#f50">Inactive</Tag>
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Let us know what you think!">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="fileupload">
                                <Row>
                                    <Col span={8}>
                                        <Upload listType="picture" {...props}>
                                            <Button icon={<UploadOutlined />} style={{ marginRight: 10 }}>Upload a Photo</Button>
                                        </Upload>
                                    </Col>
                                    <Col span={8} offset={8}>
                                        <Button
                                            type='primary'
                                            htmlType="submit"
                                            className="btn-submit"
                                            style={{
                                                display: 'initial',
                                                float: 'right',
                                            }}>Let's Go
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Modal
                className="dashboard-modal"
                centered
                open={modal1Open}
                width={700}
                closable={false}
                onOk={() => setModal1Open(false)}
                onCancel={() => setModal1Open(false)}
                footer={null}
            >
                <Row>
                    <Col xs={2} sm={4} md={8} lg={8} xl={8}>
                    </Col>
                    <Col xs={2} sm={4} md={8} lg={8} xl={8} style={{
                        margin: 'auto'
                    }}>
                        <Title style={{
                            textAlign: 'center',
                            fontWeight: 900
                        }} level={2}>Departure</Title>
                    </Col>
                    <Col xs={2} sm={4} md={8} lg={8} xl={8} style={{
                        textAlign: 'right'
                    }}>
                        <Image src={food} alt="Snow" width={50} height={70} />
                    </Col>
                </Row>
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Partner Location" required tooltip="This is a required field">
                                <Select
                                    size='middle'
                                    defaultValue="a1"
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Option style={{
                                        display: 'flex'
                                    }} value={1}>Item 1
                                        <Tag style={{
                                            marginTop: 4,
                                            textAlign: 'right',
                                            float: 'right'
                                        }} color="#87d068">Active</Tag>
                                    </Option>
                                    <Option value={2}>Item 2
                                        <Tag style={{
                                            marginTop: 4,
                                            textAlign: 'right',
                                            float: 'right'
                                        }} color="#f50">Inactive</Tag>
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Row>
                                <Col xs={2} sm={4} md={6} lg={8} xl={10}>

                                </Col>
                                <Col xs={2} sm={4} md={8} lg={8} xl={14} >
                                    <Button
                                        type='primary'
                                        htmlType="submit"
                                        className="btn-submit"
                                        style={{
                                            display: 'initial',
                                            float: 'right',
                                        }}>Depart
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Layout>
    );
};


export default connect(undefined, undefined)(Partnership);