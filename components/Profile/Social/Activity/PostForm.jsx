import React, { useState, useEffect } from "react";
import {
    Space, Form, message, Button, Upload, Divider, Mentions
} from 'antd';
import { Card, CardBody } from "reactstrap";
import { UploadOutlined, FormOutlined } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";
import { profileService } from "@/services/index";

const PostForm = ({ view_user_id, allActivities }) => {
    const { notify } = useNotify();
    const [composeForm] = Form.useForm();
    const [followAndFollowing, setfollowAndFollowing] = useState([]);
    const [postloading, setPostLoading] = useState(false);
    const [upload_name, setUploadFile] = useState([]);
    const isWebDevice = useMedia('(min-width:700px)');

    useEffect(() => {
        profileService.getFollowerAndFollowings()
            .then((res) => {
                setfollowAndFollowing(res?.data);
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }, []);

    const followAndFollowingList = Array.from(
        new Set(
            followAndFollowing?.map((item) => {
                let user;
                if (item.following) {
                    user = item?.following;
                }

                if (item.follower) {
                    user = item?.follower;
                }
                return user?.username;
            })
        )
    ).map((username) => ({
        label: username,
        value: username,
    }));

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG/PDF file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Attached File must smaller than 10MB!');
        }
        return isJpgOrPng && isLt2M;
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

    async function onFinish(values) {
        setPostLoading(true);
        const form_data = new FormData();
        upload_name.map((file) => form_data.append("images", file.originFileObj));
        form_data.append("content", values.message);
        const data = {
            userId: view_user_id,
            formData: form_data,
        };

        await profileService.postThink(data)
            .then(async (res) => {
                if (res.success) {
                    await setPostLoading(false)
                    await allActivities(view_user_id, 1, "");
                    composeForm.resetFields();
                    setUploadFile([]);
                    notify("success", res.msg);
                } else notify("error", res.msg);
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }


    return (
        <Card className="px-1">
            <CardBody>
                <Form
                    form={composeForm}
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                    className="direct-message-form"
                >
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
                        <Mentions
                            rows={7}
                            style={{
                                width: "100%",
                            }}
                            placeholder="Let us know what you think! input @ to mention user"
                            prefix={["@"]}
                            options={followAndFollowingList}
                        />
                    </Form.Item>
                    <Form.Item name="fileupload"
                        help={`File must smaller than 10MB! Only accept ${process.env.NEXT_PUBLIC_IMAGE_ACCPET}.`}>
                        <Upload multiple method="get" {...props}>
                            <Button icon={<UploadOutlined />} style={{ marginRight: 10, fontSize: 13 }}>
                                Upload Files
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Divider />
                    <Form.Item >
                        <Space style={{
                            float: 'right'
                        }}>
                            <Button type="primary" htmlType="submit" icon={<FormOutlined />} loading={postloading}>
                                POST
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </CardBody>
        </Card>
    );
};


export default PostForm;
