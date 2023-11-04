import React, { useState } from "react";
import {
    Modal,
    ModalBody,
    ModalHeader,
} from "reactstrap";
import useNotify from "@/hooks/useNotify";
import { SendOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Space,
    Alert,
} from "antd";
import { sentInvite } from "@/redux/Mail/actions";
import { connect } from "react-redux";

const { TextArea } = Input;

const EmailInvite = ({ onsentInvite, modal, setmodal }) => {

    const { notify } = useNotify();
    const [composeForm] = Form.useForm();
    const [updating, setUpdating] = useState(false);
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const onReset = () => {
        composeForm.resetFields();
    };

    const onFinish = (values) => {
        setUpdating(true);
        onsentInvite(values, (res, error) => {
            if (error) {
                setUpdating(false);
                notify(
                    "error",
                    error?.response?.data?.message ?? "Something went wrong!"
                );
            } else {
                setUpdating(false);
                composeForm.resetFields();
                notify("success", "Invite Sent Successfully");
            }
        });
    };
    return (
        <Modal
            isOpen={modal}
            autoFocus={true}
            centered={true}
            toggle={() => {
                setmodal(!modal);
            }}
        >
            <div className="modal-content">
                <ModalHeader
                    toggle={() => {
                        setmodal(!modal);
                    }}
                >
                    New Invitation
                </ModalHeader>
                <ModalBody>
                    <Row className="mail-inbox">
                        <Col md={24} sm={24} xs={24}>
                            <Alert
                                message="Informational Notes"
                                description="You can invite friends to join Pinpoint by adding their email below. They will receive an email link to sign up."
                                type="info"
                                showIcon
                            />
                            <div className="auth-space"></div>
                            <Form
                                form={composeForm}
                                layout="vertical"
                                onFinish={onFinish}
                                initialValues={{
                                    requiredMarkValue: requiredMark,
                                }}
                                onValuesChange={onRequiredTypeChange}
                                autoComplete="off"
                                requiredMark={requiredMark}
                            >
                                <Form.Item
                                    name="email"
                                    label="Email address of new user"
                                    required
                                    rules={[
                                        {
                                            type: "email",
                                            message: "The input is not valid E-mail!",
                                        },
                                        {
                                            required: true,
                                            message: "Please input Email address!",
                                        },
                                        {
                                            whitespace: true,
                                            message: "Please input Email Address!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="message"
                                    label="Add a personalized message"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                                <Form.Item >
                                    <Space style={{
                                        float: 'right'
                                    }}>
                                        <Button type="primary" htmlType="submit" icon={<SendOutlined />} loading={updating}>
                                            Send
                                        </Button>
                                        <Button htmlType="button" onClick={onReset}>
                                            Reset
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row >
                </ModalBody>
            </div>
        </Modal>

    );
};

const mapDispatchToProps = (dispatch) => ({
    onsentInvite: (data, cb) => dispatch(sentInvite(data, cb)),
});
export default connect(undefined, mapDispatchToProps)(EmailInvite);
