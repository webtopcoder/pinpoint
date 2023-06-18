import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { connect } from 'react-redux';
import { Layout, Upload, Space, Tag, Card, Col, Row, Rate, Divider, Button, Dropdown, List, Modal, Typography, DatePicker, Select, message, Form, Input } from 'antd';
import quickArrival from "@/public/images/partner/quick_arrival.png";
import quickDeparture from "@/public/images/partner/quick_departure.png";
import food from "@/public/images/landing/food.png";
import { FieldTimeOutlined, DownOutlined, EnvironmentFilled, PlusCircleOutlined, UploadOutlined, SettingOutlined, EditOutlined, EllipsisOutlined, MessageOutlined, LikeOutlined } from '@ant-design/icons';
import { FacebookShareButton, FacebookShareCount, FacebookIcon } from 'react-share'
import firebase from 'firebase/compat/app'
import { FirebaseStorage } from './storage/uploadToFirebase.js'
const storage = new FirebaseStorage()




const defaultLink = `https://www.google.com/maps/place/Nha+Trang,+Kh%C3%A1nh+H%C3%B2a,+Vietnam/@lat,lng,12z/`

const subcategoryList = [
    {
        index: 0,
        label: 'Nha Trang',
        value: 'Nha Trang',
        latitude: 12.2596256,
        longitude: 109.1641,
        link: `https://www.google.com/maps/place/Nha+Trang,+Kh%C3%A1nh+H%C3%B2a,+Vietnam/@12.2596256,109.1641,12z/`
    },
    {
        index: 0,
        label: 'Nha Trang',
        value: 'Nha Trang',
        latitude: 12.2596256,
        longitude: 109.1641,
        link: `https://www.google.com/maps/place/Nha+Trang,+Kh%C3%A1nh+H%C3%B2a,+Vietnam/@12.2596256,109.1641,12z/`
    },
]


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
        index: 0
    },
    {
        title: 'Title 2',
        index: 1
    },
    {
        title: 'Title 3',
        index: 2
    },
    {
        title: 'Title 4',
        index: 3
    },
]

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

    const [formInfo, setFormInfo] = useState({

    })

    const [upload_name, setUploadFile] = useState([]);

    const [modal2Open, setModal2Open] = useState(false);
    const [modal1Open, setModal1Open] = useState(false);
    const [shareButtonLoaded, setFbShareButtonLoaded] = useState(false)

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


    const getRandomArbitrary = (min, max) => {
        return Math.trunc(Math.random() * (max - min) + min)
    }


    const uploadPicFirebase = async (file) => {

        // alert(`form :${JSON.stringify(formInfo)}`)

        const firebaseConfig = {
            apiKey: "AIzaSyBhKtn4TK7LY4cG6zOZ8RPWBx12IDrxAhc",
            authDomain: "my-first-project-ce24e.firebaseapp.com",
            databaseURL: "https://my-first-project-ce24e.firebaseio.com",
            projectId: "my-first-project-ce24e",
            storageBucket: "my-first-project-ce24e.appspot.com",
            messagingSenderId: "627497957398",
            appId: "1:627497957398:web:8049cba44bd6c2ee49dd37"
        }



        try {
            firebase.initializeApp(firebaseConfig)
            let r = getRandomArbitrary(1, 1000000)
            const result = await storage.uploadFileAsync(`/pinpoint/image/image_${r}`, file)
            const link = result.downloadLink
            alert(`uploaded successfully`)
            formInfo.imageId = r
            formInfo.imageToken = link.substring(link.indexOf('token=') + 6, link.length)
            setFormInfo({ ...formInfo })


        } catch (ex) {
            alert(ex)
        }
    }


    const uploadPic = () => {
        document.getElementById('filer').click()
    }

    const onFormSubmit = () => {
        if (!formInfo.imageId || !formInfo.imageToken) alert('image required')
        if (!formInfo.imageId || !formInfo.imageToken) return

        let shareButton = document.getElementById('fbShareBtn')
        if (shareButton) shareButton.click()

    }

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


    const newArrival = (item) => {
        alert(JSON.stringify(item))
    }

    return (
        <Layout className="site-layout" style={{
            background: '#211f1f'
        }}>




            <Content style={{ margin: '60px 40px' }}>

                <input id={'filer'} style={{ display: 'none' }} type="file" onChange={(e) => { uploadPicFirebase(e.target.files[0]) }} />

                <div className="site-card-wrapper">
                    <Content className="custom-subcontent">
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6} style={{
                                marginTop: 30
                            }}>

                                {formInfo.name && formInfo.description && formInfo.imageId && formInfo.imageToken &&
                                    <FacebookShareButton
                                        style={{ display: 'none' }}
                                        id="fbShareBtn"
                                        url={`https://linkshare-production.up.railway.app/share?title=${formInfo.name}&description=${formInfo.description}&imageId=${formInfo.imageId}&imageToken=${formInfo.imageToken}`}
                                        quotes={"Quotes"}  //"Your Quotes"
                                        hashtag={"Hashtag"} // #hashTag
                                    >
                                        <FacebookIcon />
                                    </FacebookShareButton>
                                }

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
                                                <Button onClick={() => { 'click' }} >
                                                    Arrival
                                                </Button>
                                                // <button onClick={() => { newArrival(item) }} >
                                                //     Arrival
                                                // </button>
                                                ,
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
                            A Location is a specific location of a business <br /> You may have multiple locations and this will act as their individual profile.
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
                                <Input placeholder="This will be your individual locations name" value={formInfo.name} onChange={(e) => { formInfo.name = e.target.value; setFormInfo({ ...formInfo }) }} />
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
                                    onChange={(option) => {
                                        subcategoryList.forEach((item) => {
                                            // alert(`${JSON.stringify(item.value)} === ${JSON.stringify(option)}`)
                                            if (item.value === option[0]) {
                                                // alert(item.link)
                                                formInfo.location = item.link;
                                                setFormInfo({ ...formInfo })
                                            }
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Location Description">
                                <TextArea placeholder="Anything you want your customers to know" rows={4} value={form.description} onChange={(e) => { formInfo.description = e.target.value; setFormInfo({ ...formInfo }) }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="fileupload">
                                <Row>
                                    <Col span={8}>
                                        {/* <Upload listType="picture" {...props}> */}
                                        <Button icon={<UploadOutlined />} style={{ marginRight: 10 }} onClick={() => { uploadPic() }} >Location Image</Button>
                                        {/* </Upload> */}
                                    </Col>
                                    <Col span={8} offset={8}>
                                        <Button
                                            onClick={() => { onFormSubmit() }}
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