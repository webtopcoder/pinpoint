import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { connect } from 'react-redux';
import { Layout, Upload, Space, Tag, Card, Col, Row, Rate, Divider, Button, Dropdown, List, Modal, Typography, DatePicker, Select, message, Form, Input } from 'antd';
import quickArrival from "@/public/images/partner/quick_arrival.png";
import quickDeparture from "@/public/images/partner/quick_departure.png";
import food from "@/public/images/landing/food.png";
import {
    FieldTimeOutlined, DownOutlined, EnvironmentFilled, PlusCircleOutlined, UploadOutlined, SettingOutlined, EditOutlined, EllipsisOutlined, MessageOutlined, LikeOutlined
} from '@ant-design/icons';

const subcategoryList = [];
for (let i = 10; i < 36; i++) {
    subcategoryList.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];



const { Option } = Select;

const { TextArea } = Input;

const { Title, Text, Paragraph } = Typography;

const { Content } = Layout;

const IconText = ({ icon, text }) => (
    <Space>
        {icon}
        {text}
    </Space>
);

const style = {
    background: '#0092ff',
    padding: '8px 0',
};

const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
];

const partnerLocations = () => {

    const items = [
        {
            label: <a href="https://www.antgroup.com">View Location Profile</a>,
            key: '0',
        },
        {
            label: <a onClick={() => setModal1Open(true)}>Modify Location</a>,
            key: '1',
        },
    ];

    const [value, setValue] = useState(3);


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
                    margin: '60px 40px',
                }}
            >
                <div className="site-card-wrapper">
                    <Content className="custom-subcontent">
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6} style={{
                                marginTop: 30
                            }}>
                                <Button type="primary" onClick={() => setModal2Open(true)} icon={<PlusCircleOutlined />}>
                                    Add Location
                                </Button>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Title style={{
                                    textAlign: 'center'
                                }}>Partner Locations</Title>
                            </Col>
                            <Col className="gutter-row" span={6} style={{
                                textAlign: 'right'
                            }}>
                                <Image src={food} alt="Snow" width={50} height={70} />
                            </Col>
                        </Row>
                        <Row style={{
                            marginTop: 30
                        }}>
                            <List
                                grid={{
                                    column: 3,
                                }}
                                dataSource={data}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Card
                                            actions={[
                                                <Button type="link" >
                                                    Arrival
                                                </Button>,
                                                <Button type="link" >
                                                    Departure
                                                </Button>,
                                                <Dropdown
                                                    menu={{
                                                        items,
                                                    }}
                                                    trigger={['click']}
                                                >
                                                    <EllipsisOutlined />
                                                </Dropdown>
                                            ]}
                                            headStyle={{
                                                color: 'white',
                                                textAlign: 'center'
                                            }}
                                            bodyStyle={{
                                                color: 'white',
                                            }}
                                            title='Example Food Truck #1'
                                            className="partner-locations-card"
                                        // extra={<a href="#">More</a>}
                                        >
                                            <Row gutter={16} style={{
                                                textAlign: 'center'

                                            }}>
                                                <Col className="gutter-row" span={12}>
                                                    <IconText icon={<LikeOutlined style={{
                                                        fontSize: 30
                                                    }} />} text={<Text style={{
                                                        fontSize: 40,
                                                        color: 'white'
                                                    }}>150</Text>}
                                                        key="list-vertical-like-o" />
                                                </Col>
                                                <Col className="gutter-row" span={12}>
                                                    <IconText icon={<MessageOutlined style={{
                                                        fontSize: 30
                                                    }} />} text={<Text style={{
                                                        fontSize: 40,
                                                        color: 'white'
                                                    }}>30</Text>} key="list-vertical-message" />
                                                </Col>
                                            </Row>
                                            <Divider style={{
                                                borderColor: 'white'
                                            }} dashed><Tag style={{
                                            }} color="#87d068">Active</Tag></Divider>
                                            <Row style={{
                                                marginTop: 20,
                                                textAlign: 'center'
                                            }}>
                                                <Col className="gutter-row" span={24}>
                                                    <Space>
                                                        <Text style={{
                                                            color: 'white'
                                                        }}>Jacksonvile, FL</Text>

                                                    </Space>
                                                    <Space>
                                                        <Text style={{
                                                            color: 'white'
                                                        }}>Last See 5 hours ago</Text>
                                                    </Space>
                                                    <Space>
                                                        <Rate style={{}} allowHalf disabled defaultValue={2} tooltips={desc} onChange={setValue} value={value} />
                                                    </Space>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </Row>
                    </Content>
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
                    <Col xs={0} sm={0} md={8} lg={0} xl={0}>
                    </Col>
                    <Col xs={20} sm={20} md={8} lg={22} xl={22} style={{
                        margin: 'auto',
                        textAlign: 'center'
                    }}>
                        <Title style={{
                            textAlign: 'center',
                            fontWeight: 900
                        }} level={2}>Add Location
                        </Title>
                        <Paragraph>
                            A Location is a specific location of a business. <br /> You may have multiple locations and this will act as their individual profile.
                        </Paragraph>
                    </Col>
                    <Col xs={4} sm={4} md={8} lg={2} xl={2} style={{
                        textAlign: 'right'
                    }}>
                        <Image src={food} alt="Snow" width={50} height={70} />
                    </Col>
                </Row>
                <Divider style={{
                }} dashed>
                </Divider>
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Location Name" required name="requiredMarkValue">
                                <Input placeholder="This will be your individual locations name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Partner Location" required tooltip="This is a required field">
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Select all that apply"
                                    options={subcategoryList}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Location Description">
                                <TextArea placeholder="Anything you want your customers to know" rows={4} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="fileupload">
                                <Row>
                                    <Col span={8}>
                                        <Upload listType="picture" {...props}>
                                            <Button icon={<UploadOutlined />} style={{ marginRight: 10 }}>Location Image</Button>
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
                                            }}>Add Location
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
                    <Col xs={0} sm={0} md={8} lg={0} xl={0}>
                    </Col>
                    <Col xs={20} sm={20} md={8} lg={22} xl={22} style={{
                        margin: 'auto',
                        textAlign: 'center'
                    }}>
                        <Title style={{
                            textAlign: 'center',
                            fontWeight: 900
                        }} level={2}>Modify Location
                        </Title>
                        <Paragraph>
                            A Location is a specific location of a business. <br /> You may have multiple locations and this will act as their individual profile.
                        </Paragraph>
                    </Col>
                    <Col xs={4} sm={4} md={8} lg={2} xl={2} style={{
                        textAlign: 'right'
                    }}>
                        <Image src={food} alt="Snow" width={50} height={70} />
                    </Col>
                </Row>
                <Divider style={{
                }} dashed>
                </Divider>
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Location Name" required name="requiredMarkValue">
                                <Input placeholder="This will be your individual locations name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Partner Location" required tooltip="This is a required field">
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Select all that apply"
                                    options={subcategoryList}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Location Description">
                                <TextArea placeholder="Anything you want your customers to know" rows={4} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="fileupload">
                                <Row>
                                    <Col span={8}>
                                        <Upload listType="picture" {...props}>
                                            <Button icon={<UploadOutlined />} style={{ marginRight: 10 }}>Location Image</Button>
                                        </Upload>
                                    </Col>
                                    <Col span={16} style={{
                                        textAlign: 'right'
                                    }}>
                                        <Space>
                                            <Button
                                                type='primary'
                                                htmlType="submit"
                                                className="btn-submit"
                                                style={{
                                                    display: 'initial',
                                                    float: 'right',
                                                }}
                                                danger
                                                >Delete Location
                                            </Button>
                                            <Button
                                                type='primary'
                                                htmlType="submit"
                                                className="btn-submit"
                                                style={{
                                                    display: 'initial',
                                                    float: 'right',
                                                }}>Save Changes
                                            </Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Layout>
    );
};


export default connect(undefined, undefined)(partnerLocations);