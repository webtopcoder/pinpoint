import React, { useState } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import {
    Layout,
    Upload,
    Space,
    Tag,
    Card,
    Col,
    Row,
    Rate,
    Divider,
    Button,
    Dropdown,
    List,
    Modal,
    Typography,
    Select,
    message,
    Form,
    Input,
    DatePicker
} from "antd";
import food from "@/public/images/landing/food.png";
import {
    PlusCircleOutlined,
    UploadOutlined,
    EllipsisOutlined,
    MessageOutlined,
    LikeOutlined,
} from "@ant-design/icons";
import baseUrl from '@/utils/baseUrl';

const subcategoryList = [];
for (let i = 10; i < 36; i++) {
    subcategoryList.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

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

const data = [
    {
        title: "Title 1",
    },
    {
        title: "Title 2",
    },
    {
        title: "Title 3",
    },
    {
        title: "Title 4",
    },
];

const partnerLocations = () => {

                                                        

    const items = [
        {
            label: <a  onClick={() => window.open(baseUrl + '/profile/' + '63b8cda22accca2d22031c37' + '/locations/2', '_blank')}>View Location Profile</a>,
            key: "0",
        },
        {
            label: <a onClick={() => setModal1Open(true)}>Modify Location</a>,
            key: "1",
        },
    ];

    const [value, setValue] = useState(3);

    const [form] = Form.useForm();
    const [upload_name, setUploadFile] = useState([]);

    const [modal2Open, setModal2Open] = useState(false);
    const [modal1Open, setModal1Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);
    const [modal4Open, setModal4Open] = useState(false);
    const props = {
        name: "upload",
        onChange(info) {
            if (info.file.status !== "uploading") {
                const fileUploadInfo = info.fileList;
                setUploadFile(fileUploadInfo);
            }

            if (info.file.status == "removed") {
                if (info.fileList.length == 0) setUploadFile("");
                else {
                    const fileUploadInfo = info.fileList;
                    setUploadFile(fileUploadInfo);
                }
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

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

    return (
        <Layout
            className="site-layout"
            style={{
                background: "#211f1f",
            }}
        >
            <Content
                style={{
                    margin: "60px 40px",
                }}
            >
                <div className="site-card-wrapper">
                    <Content className="custom-subcontent">
                        <Row gutter={16}>
                            <Col
                                className="gutter-row"
                                span={6}
                                style={{
                                    marginTop: 30,
                                }}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => setModal2Open(true)}
                                    icon={<PlusCircleOutlined />}
                                >
                                    Add Location
                                </Button>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Title
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    Partner Locations
                                </Title>
                            </Col>
                            <Col
                                className="gutter-row"
                                span={6}
                                style={{
                                    textAlign: "right",
                                }}
                            >
                                <Image src={food} alt="Snow" width={50} height={70} />
                            </Col>
                        </Row>
                        <Row
                            style={{
                                marginTop: 30,
                            }}
                        >
                            <List
                                grid={{
                                    column: 3,
                                }}
                                dataSource={data}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Card
                                            actions={[
                                                <Button type="link" onClick={() => setModal3Open(true)}>Arrival</Button>,
                                                <Button type="link" onClick={() => setModal4Open(true)}>Departure</Button>,
                                                <Dropdown
                                                    menu={{
                                                        items,
                                                    }}
                                                    trigger={["click"]}
                                                >
                                                    <EllipsisOutlined />
                                                </Dropdown>,
                                            ]}
                                            headStyle={{
                                                color: "white",
                                                textAlign: "center",
                                            }}
                                            bodyStyle={{
                                                color: "white",
                                            }}
                                            title="Example Food Truck #1"
                                            className="partner-locations-card"
                                        // extra={<a href="#">More</a>}
                                        >
                                            <Row
                                                gutter={16}
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Col className="gutter-row" span={12}>
                                                    <IconText
                                                        icon={
                                                            <LikeOutlined
                                                                style={{
                                                                    fontSize: 30,
                                                                }}
                                                            />
                                                        }
                                                        text={
                                                            <Text
                                                                style={{
                                                                    fontSize: 40,
                                                                    color: "white",
                                                                }}
                                                            >
                                                                150
                                                            </Text>
                                                        }
                                                        key="list-vertical-like-o"
                                                    />
                                                </Col>
                                                <Col className="gutter-row" span={12}>
                                                    <IconText
                                                        icon={
                                                            <MessageOutlined
                                                                style={{
                                                                    fontSize: 30,
                                                                }}
                                                            />
                                                        }
                                                        text={
                                                            <Text
                                                                style={{
                                                                    fontSize: 40,
                                                                    color: "white",
                                                                }}
                                                            >
                                                                30
                                                            </Text>
                                                        }
                                                        key="list-vertical-message"
                                                    />
                                                </Col>
                                            </Row>
                                            <Divider
                                                style={{
                                                    borderColor: "white",
                                                }}
                                                dashed
                                            >
                                                <Tag style={{}} color="#87d068">
                                                    Active
                                                </Tag>
                                            </Divider>
                                            <Row
                                                style={{
                                                    marginTop: 20,
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Col className="gutter-row" span={24}>
                                                    <Space>
                                                        <Text
                                                            style={{
                                                                color: "white",
                                                            }}
                                                        >
                                                            Jacksonvile, FL
                                                        </Text>
                                                    </Space>
                                                    <Space>
                                                        <Text
                                                            style={{
                                                                color: "white",
                                                            }}
                                                        >
                                                            Last See 5 hours ago
                                                        </Text>
                                                    </Space>
                                                    <Space>
                                                        <Rate
                                                            style={{}}
                                                            allowHalf
                                                            disabled
                                                            defaultValue={2}
                                                            tooltips={desc}
                                                            onChange={setValue}
                                                            value={value}
                                                        />
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
                    <Col xs={0} sm={0} md={8} lg={0} xl={0}></Col>
                    <Col
                        xs={20}
                        sm={20}
                        md={8}
                        lg={22}
                        xl={22}
                        style={{
                            margin: "auto",
                            textAlign: "center",
                        }}
                    >
                        <Title
                            style={{
                                textAlign: "center",
                                fontWeight: 900,
                            }}
                            level={2}
                        >
                            Add Location
                        </Title>
                        <Paragraph>
                            A Location is a specific location of a business. <br /> You may
                            have multiple locations and this will act as their individual
                            profile.
                        </Paragraph>
                    </Col>
                    <Col
                        xs={4}
                        sm={4}
                        md={8}
                        lg={2}
                        xl={2}
                        style={{
                            textAlign: "right",
                        }}
                    >
                        <Image src={food} alt="Snow" width={50} height={70} />
                    </Col>
                </Row>
                <Divider style={{}} dashed></Divider>
                <Form form={form} layout="vertical">
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                label="Location Name"
                                required
                                name="requiredMarkValue"
                            >
                                <Input placeholder="This will be your individual locations name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                label="Partner Location"
                                required
                                tooltip="This is a required field"
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: "100%",
                                    }}
                                    placeholder="Select all that apply"
                                    options={subcategoryList}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Location Description">
                                <TextArea
                                    placeholder="Anything you want your customers to know"
                                    rows={4}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="fileupload">
                                <Row>
                                    <Col span={8}>
                                        <Upload listType="picture" {...props}>
                                            <Button
                                                icon={<UploadOutlined />}
                                                style={{ marginRight: 10 }}
                                            >
                                                Location Image
                                            </Button>
                                        </Upload>
                                    </Col>
                                    <Col span={8} offset={8}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="btn-submit"
                                            style={{
                                                display: "initial",
                                                float: "right",
                                            }}
                                        >
                                            Add Location
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
                    <Col xs={0} sm={0} md={8} lg={0} xl={0}></Col>
                    <Col
                        xs={20}
                        sm={20}
                        md={8}
                        lg={22}
                        xl={22}
                        style={{
                            margin: "auto",
                            textAlign: "center",
                        }}
                    >
                        <Title
                            style={{
                                textAlign: "center",
                                fontWeight: 900,
                            }}
                            level={2}
                        >
                            Modify Location
                        </Title>
                        <Paragraph>
                            A Location is a specific location of a business. <br /> You may
                            have multiple locations and this will act as their individual
                            profile.
                        </Paragraph>
                    </Col>
                    <Col
                        xs={4}
                        sm={4}
                        md={8}
                        lg={2}
                        xl={2}
                        style={{
                            textAlign: "right",
                        }}
                    >
                        <Image src={food} alt="Snow" width={50} height={70} />
                    </Col>
                </Row>
                <Divider style={{}} dashed></Divider>
                <Form form={form} layout="vertical">
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                label="Location Name"
                                required
                                name="requiredMarkValue"
                            >
                                <Input placeholder="This will be your individual locations name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                label="Partner Location"
                                required
                                tooltip="This is a required field"
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: "100%",
                                    }}
                                    placeholder="Select all that apply"
                                    options={subcategoryList}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Location Description">
                                <TextArea
                                    placeholder="Anything you want your customers to know"
                                    rows={4}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="fileupload">
                                <Row>
                                    <Col span={8}>
                                        <Upload listType="picture" {...props}>
                                            <Button
                                                icon={<UploadOutlined />}
                                                style={{ marginRight: 10 }}
                                            >
                                                Location Image
                                            </Button>
                                        </Upload>
                                    </Col>
                                    <Col
                                        span={16}
                                        style={{
                                            textAlign: "right",
                                        }}
                                    >
                                        <Space>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="btn-submit"
                                                style={{
                                                    display: "initial",
                                                    float: "right",
                                                }}
                                                danger
                                            >
                                                Delete Location
                                            </Button>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="btn-submit"
                                                style={{
                                                    display: "initial",
                                                    float: "right",
                                                }}
                                            >
                                                Save Changes
                                            </Button>
                                        </Space>
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
                open={modal3Open}
                width={700}
                closable={false}
                onOk={() => setModal3Open(false)}
                onCancel={() => setModal3Open(false)}
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
                open={modal4Open}
                width={700}
                closable={false}
                onOk={() => setModal4Open(false)}
                onCancel={() => setModal4Open(false)}
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

export default connect(undefined, undefined)(partnerLocations);
