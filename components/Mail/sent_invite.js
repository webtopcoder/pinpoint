import React from 'react';
import { Row, Col, Card, Form, Input, Button } from 'antd';

const SentInvite = () => {

    const [composeForm] = Form.useForm();

    return (

        <Row className='mail-inbox'>
            <Col md={24} sm={24} xs={24}>
                <Card>
                    <div className='title'>
                        Fill out the form below to invite a new user to join this site.
                        Upon submission of the form, an email will be sent to the invitee containing a link to accept your invitation.
                        You may also add a custom message to the email.
                    </div>
                    <Form form={composeForm} layout="vertical" autoComplete="off">
                        <Form.Item name="name" label="Email address of new user">
                            <Input />
                        </Form.Item>
                        <Form.Item name="content" label="Add a personalized message to the invitation (optional)">
                            <textarea rows={5} className="mail-compose-message" />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary'>Submit</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default SentInvite;