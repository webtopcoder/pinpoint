import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { Row, Card, Col, Form, Input, Upload, Button, message } from 'antd';
import { mailCompose } from '@/redux/Mail/actions';
import toast from "@/components/Toast";

const Compose = ({ onmailCompose }) => {

    const [composeForm] = Form.useForm();
    const [upload_name, setUploadFile] = useState([]);

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    const onFinish = (values) => {
        const form_data = new FormData();

        upload_name.map((file, index) =>
            form_data.append('files', file.originFileObj)
        )
        form_data.append('to', values.name);
        form_data.append('subject', values.subject);
        form_data.append('message', values.message);

        onmailCompose(form_data, res => {
            if (res.success) {
                composeForm.resetFields();
                notify("success", res.msg)
            }
            else notify("error", res.msg)
        });
    };
    const props = {
        name: 'upload',
        onChange(info) {
            console.log(info)
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
        <Row className='mail-inbox'>
            <Col md={24} sm={24} xs={24}>
                <Card>
                    <Form form={composeForm} onFinish={onFinish} layout="vertical" autoComplete="off">
                        <Form.Item
                            name="name"
                            label="Send To (Username or Friend's Name)"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!'
                                },
                                {
                                    whitespace: true,
                                    message: 'Please input your Username!'
                                }
                            ]}>
                            <Input style={{
                                width: '50%'
                            }} />
                        </Form.Item>
                        <Form.Item name="subject" label="Subject">
                            <Input style={{
                                width: '50%'
                            }} />
                        </Form.Item>
                        <Form.Item
                            name="message"
                            label="Message"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Message!'
                                },
                                {
                                    whitespace: true,
                                    message: 'Please input Message!'
                                }
                            ]}>
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="fileupload">
                            <Row>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />} style={{ marginRight: 10 }}>Click to Upload</Button>
                                </Upload>
                                <Button
                                    type='primary'
                                    htmlType="submit"
                                    className="btn-submit"
                                    style={{
                                        display: 'table',
                                        justifyContent: 'space-between',
                                        margin: '0 auto 0',
                                        padding: '10px 40px',
                                        height: '100%'
                                    }}>SEND MESSAGE</Button>
                            </Row>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}


const mapDispatchToProps = dispatch => ({
    onmailCompose: (data, cb) => dispatch(mailCompose(data, cb))
})
export default connect(undefined, mapDispatchToProps)(Compose);