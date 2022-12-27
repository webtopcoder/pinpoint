import React, { useState, useCallback } from "react";
import Image from "next/image";
import { connect } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { Image as Antimage, Button, Upload, message, Form, Input, Row, Col } from 'antd';
import food from "@/public/images/landing/food.png";
import { useRouter } from 'next/router';
import { postThink } from '@/redux/Profile/actions';
import toast from "@/components/Toast";
import config from '@/utils/config';
import userImg1 from "@/public/images/user/user1.jpg";


const profileActivity = ({ onpostThink, activityInfo }) => {

    const myLoader = ({ src }) => {
        return src
    }
    const imgurl = `http://${config.server}:${config.port}/post/`;

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);
    const router = useRouter();
    const view_user_id = router.query.profile

    const [composeForm] = Form.useForm();

    const [upload_name, setUploadFile] = useState([]);

    const onFinish = (values) => {
        const form_data = new FormData();

        upload_name.map((file, index) =>
            form_data.append('image', file.originFileObj)
        )
        form_data.append('content', values.message);
        form_data.append('userid', view_user_id);


        onpostThink(form_data, res => {
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
        <div className="blog-details-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-7 col-md-12">
                        <div className="avatar-area green-color">
                            <div className="avatar-respond">
                                <div className="pin-post-header-section">
                                    <div className="pin-post-label">
                                        <p className="comment-notes">
                                            <span id="email-notes">
                                                Let us know what you think!
                                            </span>
                                        </p>
                                    </div>
                                    <div className="pin-post-logo">
                                        <Image
                                            src={food}
                                            alt="blog-details"
                                            width={50}
                                            height={70}
                                        />
                                    </div>
                                </div>
                                <div className="avatar-form">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <Form form={composeForm} onFinish={onFinish} layout="vertical" autoComplete="off">
                                                <Form.Item
                                                    name="message"
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
                                                <Form.Item listType="picture" name="fileupload">
                                                    <Row>
                                                        <Col span={8}>
                                                            <Upload listType="picture" {...props}>
                                                                <Button icon={<UploadOutlined />} style={{ marginRight: 10 }}>Click to Upload</Button>
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
                                                                    height: 50,
                                                                    padding: '10px 40px',
                                                                }}>POST
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="avatar-area green-color">
                            <div className="avatar-respond">
                                <div className="avatar-form">
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="shout-area green-color">
                                                <div className="shout-body">
                                                    <div className="shout-author vcard">
                                                        <div className="avatar">
                                                            <Image
                                                                src={userImg1}
                                                                alt="user"
                                                                className="shout-radius"
                                                            />
                                                        </div>
                                                        <b className="fn">Dennis Stephens</b>
                                                        <div className="shout-target">
                                                            <span>
                                                                dennis0303stephens@gmail.com
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="shout-metadata">
                                                        <span>
                                                            dennis0303stephens@gmail.com
                                                        </span>
                                                    </div>

                                                    <div className="shout-content">
                                                        <div className="pin-post-label">
                                                            <p className="comment-notes">
                                                                <span id="email-notes">
                                                                    Lorem ipsum dolor sit amet, consectetur
                                                                    adipisicing elit, sed do eiusmod tempor
                                                                    incididunt ut labore et dolore magna aliqua. Ut
                                                                    enim ad minim veniam
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="pin-post-logo">
                                                            <p className="comment-notes">
                                                                <i className="bx bx-like like-icon"></i> &nbsp;150 Likes
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shout-area green-color">
                                                <div className="shout-body">
                                                    <div className="shout-author vcard">
                                                        <div className="avatar">
                                                            <Image
                                                                src={userImg1}
                                                                alt="user"
                                                                className="shout-radius"
                                                            />
                                                        </div>
                                                        <b className="fn">Dennis Stephens</b>
                                                        <div className="shout-target">
                                                            <span>
                                                                dennis0303stephens@gmail.com
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="shout-metadata">
                                                        <span>
                                                            dennis0303stephens@gmail.com
                                                        </span>
                                                    </div>

                                                    <div className="shout-content">
                                                        <div className="pin-post-label">
                                                            <p className="comment-notes">
                                                                <span id="email-notes">
                                                                    Lorem ipsum dolor sit amet, consectetur
                                                                    adipisicing elit, sed do eiusmod tempor
                                                                    incididunt ut labore et dolore magna aliqua. Ut
                                                                    enim ad minim veniam
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="pin-post-logo">
                                                            <p className="comment-notes">
                                                                <i className="bx bx-like like-icon"></i> &nbsp;150 Likes
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shout-area green-color">
                                                <div className="shout-body">
                                                    <div className="shout-author vcard">
                                                        <div className="avatar">
                                                            <Image
                                                                src={userImg1}
                                                                alt="user"
                                                                className="shout-radius"
                                                            />
                                                        </div>
                                                        <b className="fn">Dennis Stephens</b>
                                                        <div className="shout-target">
                                                            <span>
                                                                dennis0303stephens@gmail.com
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="shout-metadata">
                                                        <span>
                                                            dennis0303stephens@gmail.com
                                                        </span>
                                                    </div>

                                                    <div className="shout-content">
                                                        <div className="pin-post-label">
                                                            <p className="comment-notes">
                                                                <span id="email-notes">
                                                                    Lorem ipsum dolor sit amet, consectetur
                                                                    adipisicing elit, sed do eiusmod tempor
                                                                    incididunt ut labore et dolore magna aliqua. Ut
                                                                    enim ad minim veniam
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="pin-post-logo">
                                                            <p className="comment-notes">
                                                                <i className="bx bx-like like-icon"></i> &nbsp;150 Likes
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 col-md-12">
                        <div className="left-sidebar">
                            <aside className="widget-area">
                                <div className="avatar-area green-color">
                                    <div className="avatar-respond">
                                        <div className="pin-post-header-section">
                                            <div className="pin-about-section">
                                                <h4 className="comment-notes">
                                                    <span id="email-notes">
                                                        About Me
                                                    </span>
                                                </h4>
                                                <div dangerouslySetInnerHTML={{ __html: activityInfo && activityInfo?.about }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="avatar-respond">
                                        <div className="pin-post-header-section">
                                            <div className="pin-about-section">
                                                <h4 className="comment-notes">
                                                    <span id="email-notes">
                                                        Photos
                                                    </span>
                                                </h4>
                                                <div className="row">
                                                    <Antimage.PreviewGroup>
                                                        {activityInfo?.profile?.image && activityInfo.image.map((image, index) =>
                                                            <Antimage loader={myLoader} width={'25%'} src={imgurl + '/' + image} />
                                                        )}
                                                    </Antimage.PreviewGroup>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="avatar-respond">
                                        <div className="pin-post-header-section">
                                            <div className="pin-about-section">
                                                <h4 className="comment-notes">
                                                    <span id="email-notes">
                                                        Social Links
                                                    </span>
                                                </h4>
                                                <ul className="social-links">
                                                    {
                                                        activityInfo?.social?.facebook ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.facebook}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="flaticon-facebook-app-symbol"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                    {
                                                        activityInfo?.social?.twitter ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.twitter}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="flaticon-twitter"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                    {
                                                        activityInfo?.social?.snapchat ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.snapchat}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="flaticon-snapchat"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                    {
                                                        activityInfo?.social?.instagram ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.instagram}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="flaticon-instagram"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                    {
                                                        activityInfo?.viewInfo?.profile?.social?.tiktok ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.tiktok}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="flaticon-tik-tok"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                    {
                                                        activityInfo?.social?.website ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.website}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="bx bx-world"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    onpostThink: (data, cb) => dispatch(postThink(data, cb))
})
export default connect(undefined, mapDispatchToProps)(profileActivity);