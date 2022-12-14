import React, { useState } from "react";
import { InboxOutlined, SendOutlined, FormOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import PageTitle from "@/components/Layout/PageTitle";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import MailInbox from "@/components/Mail/inbox";
import MailSent from "@/components/Mail/sent";
import MailCompose from "@/components/Mail/compose";
import MailSendInvite from "@/components/Mail/sent_invite";
import MailPendingInvite from "@/components/Mail/pending_invite";

const Inbox = () => {
    const items = [
        {
            label: 'INBOX',
            key: 'inbox',
            icon: <Avatar icon={<InboxOutlined />}
                style={{
                    backgroundImage: 'linear-gradient(#4f60a7, #2bb2d2);',
                    color: 'white',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            />,
        },
        {
            label: 'SENT',
            key: 'sent',
            icon: <Avatar icon={<SendOutlined />}
                style={{
                    backgroundImage: 'linear-gradient(#61be54, #d7e168);',
                    color: 'white',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            />,
        },
        {
            label: 'COMPOSE',
            key: 'compose',
            icon: <Avatar icon={<FormOutlined />}
                style={{
                    backgroundImage: 'linear-gradient(#753ec1, #b753f6);',
                    color: 'white',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            />,
        },
        {
            label: 'SEND INVITES',
            key: 'send_invites',
            icon: <Avatar icon={<SendOutlined />}
                style={{
                    backgroundImage: 'linear-gradient(#4f60a7, #2bb2d2);',
                    color: 'white',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            />,
        },
        {
            label: 'PENDING_INVITES',
            key: 'pending_invites',
            icon: <Avatar icon={<UploadOutlined />}
                style={{
                    backgroundImage: 'linear-gradient(#fe624b, #f9c52a);',
                    color: 'white',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            />,
        }
    ];
    const [tab, setTab] = useState('inbox');

    const onClickTab = e => setTab(e.key);
    return (
        <>
            <PageTitle page="Landing" />
            <Header />
            <div className="mailbox-banner-area-css">
                <div className="mail-container">
                    <div className="mailbox-container">
                        <div className="menu-bar">
                            <div className="row">
                                <Menu selectedKeys={[tab]} mode="horizontal" items={items} onClick={onClickTab} />
                            </div>
                        </div>
                        <div className="mail-content">
                            {tab === 'inbox' && <MailInbox />}
                            {tab === 'sent' && <MailSent />}
                            {tab === 'compose' && <MailCompose />}
                            {tab === 'send_invites' && <MailSendInvite />}
                            {tab === 'pending_invites' && <MailPendingInvite />}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Inbox;
