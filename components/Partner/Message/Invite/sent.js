import React from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Form, Input, Button } from "antd";
import { sentInvite } from "@/redux/Mail/actions";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";

const SentInvite = ({ onsentInvite }) => {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const [composeForm] = Form.useForm();
  const onFinish = (values) => {
    onsentInvite(values, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong!"
        );
      } else {
        composeForm.resetFields();
        notify("success", "Invite Sent Successfully");
      }
    });
  };
  return (
    <Row className="mail-inbox">
      <Col md={24} sm={24} xs={24}>
        <Card>
          <div className="title">
            Fill out the form below to invite a new user to join this site. Upon
            submission of the form, an email will be sent to the invitee
            containing a link to accept your invitation. You may also add a
            custom message to the email.
          </div>
          <Form
            form={composeForm}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email address of new user"
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
              label="Add a personalized message to the invitation (optional)"
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="btn-submit"
                style={{
                  display: "table",
                  justifyContent: "space-between",
                  margin: "10px auto 0",
                  padding: "10px 40px",
                  height: "100%",
                  width: isWebDevice ? "auto" : "100%",
                  float: isWebDevice ? "right" : "left"
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onsentInvite: (data, cb) => dispatch(sentInvite(data, cb)),
});
export default connect(undefined, mapDispatchToProps)(SentInvite);
