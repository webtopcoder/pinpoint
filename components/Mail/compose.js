import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Row, Card, Col, Form, Input, Switch, Upload, Button } from 'antd';

const Compose = () => {

    const [composeForm] = Form.useForm();

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Row className='mail-inbox'>
            <Col md={24} sm={24} xs={24}>

                <Card>
                    <Form form={composeForm} layout="vertical" autoComplete="off">
                        <Form.Item name="name" label="Send To (Username or Friend's Name)">
                            <Input />
                        </Form.Item>
                        <Form.Item name="notice" label="This is a notice">
                            <Switch />
                        </Form.Item>
                        <Form.Item name="subject" label="Subject">
                            <Input />
                        </Form.Item>
                        <Form.Item name="message" label="Message">
                            <textarea rows={5} id="message" className="mail-compose-message" />
                        </Form.Item>
                        <Form.Item>
                            <Row>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />} style={{marginRight: 10}}>Click to Upload</Button>
                                </Upload>
                                <Button type='primary'>SEND MESSAGE</Button>
                            </Row>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Compose;