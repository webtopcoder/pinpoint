import React, { useState } from "react";
import {
    Space, Form,
    Input,
    message,
    Button, Upload, Divider
} from 'antd';
import { connect } from "react-redux";
import { mailCompose } from "@/redux/Mail/actions";
import { UploadOutlined, SendOutlined, InboxOutlined } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";

const { TextArea } = Input;

const MessageForm = ({ onmailCompose, username }) => {
    const [composeForm] = Form.useForm();
    const [upload_name, setUploadFile] = useState([]);
    const [updating, setUpdating] = useState(false);
    const { notify } = useNotify();

    const onFinish = (values) => {
        setUpdating(true);
        const form_data = new FormData();
        upload_name.map((file) => form_data.append("files", file.originFileObj));
        const followingUser = Array();
        followingUser.push(username)
        form_data.append("to", followingUser);
        form_data.append("subject", values.subject);
        form_data.append("message", values.message);
        onmailCompose(form_data, (res, error) => {
            if (error) {
                notify(
                    "error",
                    error?.response?.data?.message ?? "Something went wrong"
                );
            } else {
                setUpdating(false);
                composeForm.resetFields();
                setUploadFile([]);
                notify("success", res.msg);
            }
        });
    };

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

    return (
        <Form
            form={composeForm}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            className="direct-message-form"
        >
            <Form.Item name="subject">
                <Input placeholder="subject" />
            </Form.Item>
            <Form.Item
                name="message"
                rules={[
                    {
                        required: true,
                        message: "Please input Message!",
                    },
                    {
                        whitespace: true,
                        message: "Please input Message!",
                    },
                ]}
            >
                <TextArea prefix={<InboxOutlined className="site-form-item-icon" />} placeholder="message..." rows={4} />
            </Form.Item>
            <Form.Item name="fileupload"
                help={`File must smaller than 10MB! Only accept ${process.env.NEXT_PUBLIC_IMAGE_ACCPET}.`}>
                <Upload method="get" {...props}>
                    <Button icon={<UploadOutlined />} style={{ marginRight: 10, fontSize: 13 }}>
                        Upload Photo
                    </Button>
                </Upload>
            </Form.Item>
            <Divider />
            <Form.Item >
                <Space style={{
                    float: 'right'
                }}>
                    <Button type="primary" htmlType="submit" icon={<SendOutlined />} loading={updating}>
                        Send
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

const mapStateToProps = ({ user }) => {
    return {
        myfollowerList: user.myFollowers,
        role: user.role,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onmailCompose: (data, cb) => dispatch(mailCompose(data, cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
