import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";
import { useRouter } from "next/router";
import {
    downloadFile,
    updateMail,
    getIsReadEmail,
    replyCompose,
    getReplyByID
} from "@/redux/Mail/actions";
import { UploadOutlined, DownOutlined, UpOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Upload, Form, message, Input, Spin, Image } from "antd";
import { getDiffToNow } from "@/utils/date";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import { mailService } from "@/services/index";
import { map } from "lodash";
import classNames from "classnames";
import useMedia from "@/hooks/useMedia";

const avatarurl = `${apiBaseUrl}/avatar/`;
const { TextArea } = Input;

const EmailDetail = ({ onGetIsReadEmails, ongetReplyByID, onreplyCompose, onupdatemail, ondownloadFile, tab }) => {
    const router = useRouter();
    const [record_detail, setSaveInboxDetail] = useState();
    const { id } = router.query;
    const [reply_detail, setSaveReply] = useState();
    const { notify } = useNotify();
    const [initLoading, setInitLoading] = useState(true);
    const isWebDevice = useMedia('(min-width:700px)');

    const markAsReadOrStar = (mailId, field, status) => {
        const updateField = field === "is_read" ? "is_read" : "is_star";
        const updateCallback = (res, error) => {
            if (error) {
                notify("error", error?.response?.data?.message ?? "Something went wrong");
                return;
            }
            onGetIsReadEmails({});
        };

        onupdatemail(mailId, { [updateField]: status }, updateCallback);
    };

    useEffect(async () => {

        await setInitLoading(true);
        const result = await mailService.getInboxByID(id);
        await setSaveInboxDetail(result?.results[0]);
        ongetReplyByID(result?.results[0]?._id, (res, error) => {
            if (error) {
                notify(
                    "error",
                    error?.response?.data?.message ?? "Something went wrong"
                );
                return;
            }
            else {
                setSaveReply(res.results);
                markAsReadOrStar(result?.results[0]?._id, 'is_read', true);
            }
        });
        setInitLoading(false)
    }, [id]);

    const [replymsg, setReply] = useState('');
    const [replyForm] = Form.useForm();
    const [expand, setExpand] = useState(true);
    const [upload_name, setUploadFile] = useState([]);
    const onMenuClick = (filepath) => {
        window.open(avatarurl + filepath, "_blank");
    };

    const onFinish = (values) => {
        const form_data = new FormData();
        const myID = localStorage.getItem("user_id");
        upload_name.map((file) => form_data.append("files", file.originFileObj));
        form_data.append("from", myID);
        form_data.append("role", record_detail?.to?.role);
        form_data.append("to", myID === record_detail?.to?._id ? record_detail?.from?._id : record_detail?.to?._id);
        form_data.append("reply", record_detail?._id);
        form_data.append("message", values.message);
        onreplyCompose(form_data, (res, error) => {
            if (error) {
                notify(
                    "error",
                    error?.response?.data?.message ?? "Something went wrong"
                );
            } else {
                setExpand(true);
                setSaveReply(res.result.results);
                setUploadFile([]);
                replyForm.resetFields();
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
        <Spin spinning={initLoading}>
            <Row>
                <CardBody className="border-bottom p-2">
                    <div className="d-flex align-items-center">
                        <h4 className="mb-0 card-title font-size-16 flex-grow-1">
                            {record_detail?.subject}
                        </h4>
                        <div className="flex-shrink-0">
                            <Button type="link" onClick={() => {
                                const link = tab == 1 ? '/message/inbox' : '/message/sent'
                                router.push(link);
                            }} icon={<LeftOutlined />}>Back</Button>
                        </div>
                    </div>
                </CardBody>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <div className="d-flex py-3">
                                <div className="avatar-lg me-3">
                                    <div className={classNames('avatar-title', 'rounded-circle', 'text-primary', { 'avatar-size': !isWebDevice })}>
                                        <img
                                            className="d-flex me-0 rounded-circle"
                                            src={avatarurl + record_detail?.from?.profile?.avatar?.filepath}
                                            alt="skote"
                                        />
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="font-size-14 mb-1">
                                        {record_detail?.from?.name}{" "}
                                        <small className="text-muted float-end">
                                            <i class="bx bx-time-five"></i>&nbsp;  {getDiffToNow(record_detail?.createdAt)} ago
                                        </small>
                                    </h5>
                                    <p className="text-muted">
                                        @{record_detail?.from?.username}
                                    </p>
                                    <p className="text-muted">
                                        {record_detail?.message}
                                    </p>
                                    <Image.PreviewGroup
                                    >
                                        {record_detail?.files?.map((item) => (
                                            <Image width={200} src={avatarurl + item?.filepath} />
                                        ))}
                                    </Image.PreviewGroup>
                                </div>
                            </div>

                            {reply_detail?.length > 0 ?
                                <>
                                    <h5 className="font-size-15">
                                        <i className="bx bx-message-dots text-muted align-middle me-1"></i>{" "}
                                        Reply Messages :
                                    </h5>
                                    {_.map(reply_detail, (item, i) => (
                                        <div className="d-flex py-3 border-top">
                                            <div className="avatar-xs me-3">
                                                <div className={classNames('avatar-title', 'rounded-circle', 'text-primary', { 'avatar-size': !isWebDevice })}>
                                                    <img
                                                        src={avatarurl + item?.from?.profile?.avatar?.filepath}
                                                        alt=""
                                                        className="img-fluid d-block rounded-circle"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-14 mb-1">
                                                    {item?.from?.name}{" "}
                                                    <small className="text-muted float-end">
                                                        <i class="bx bx-time-five"></i>&nbsp; {getDiffToNow(item?.createdAt)} ago
                                                    </small>
                                                </h5>
                                                <p className="text-muted">
                                                    @{item?.from?.username}
                                                </p>
                                                <p className="text-muted">
                                                    {item?.message}
                                                </p>
                                                <Image.PreviewGroup
                                                >
                                                    {item?.files?.map((file) => (
                                                        <Image width={200} src={avatarurl + file?.filepath} />
                                                    ))}
                                                </Image.PreviewGroup>
                                            </div>
                                        </div>
                                    ))}
                                </> : ''}
                            <Button
                                style={{
                                    fontSize: 12,
                                }}
                                onClick={() => {
                                    setExpand(!expand);
                                }}
                                type="link"
                            >
                                {expand ? <UpOutlined /> : <DownOutlined />} Reply
                            </Button>
                            <Form
                                form={replyForm}
                                onFinish={onFinish}
                                layout="horizontal"
                                autoComplete="off"
                                style={{
                                    maxWidth: 600,
                                    margin: 5
                                }}
                            >
                                <Form.Item
                                    hidden={expand}
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
                                    <TextArea
                                        value={replymsg}
                                        placeholder="Reply message"
                                        autoSize={{
                                            minRows: 3,
                                            maxRows: 5,
                                        }}

                                        onChange={(e) => setReply(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item name="fileupload" hidden={expand}>
                                    <Upload multiple method="get" className="avatar-uploader" {...props}>
                                        <Button icon={<UploadOutlined />} style={{ marginRight: 10 }}>
                                            Upload
                                        </Button>
                                    </Upload>
                                    <Button style={{ float: 'right' }} className="btn-submit" type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Spin>
    );
};

const mapStateToProps = ({ mail, user }) => ({
    inbox: mail.inboxlist,
    user_id: user.user_id
});

const mapDispatchToProps = (dispatch) => ({
    ondownloadFile: (filename) => dispatch(downloadFile(filename)),
    onreplyCompose: (data, cb) => dispatch(replyCompose(data, cb)),
    ongetReplyByID: (id, cb) => dispatch(getReplyByID(id, cb)),
    onGetIsReadEmails: (param) => dispatch(getIsReadEmail(param)),
    onupdatemail: (id, form, cb) => dispatch(updateMail(id, form, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailDetail)