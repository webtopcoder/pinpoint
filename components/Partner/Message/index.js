import React, { useState, useRef, useEffect } from "react";
import {
  InboxOutlined,
  SendOutlined,
  FormOutlined,
  UploadOutlined,
  BellOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Row, Col, Select, Button, Layout } from "antd";
import MailInbox from "@/components/Partner/Message/Inbox";
import MailSent from "@/components/Partner/Message/Sent";
import MailCompose from "@/components/Partner/Message/compose";
import MailSendInvite from "@/components/Partner/Message/Invite/sent";
import MailPendingInvite from "@/components/Partner/Message/Invite/pending";
import MailNotices from "@/components/Partner/Message/Notice";
import { useRouter } from "next/router";
import useMedia from "@/hooks/useMedia";
const { Content } = Layout;

const Mail = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  const router = useRouter();
  const { user } = router.query;
  useEffect(() => {
    user && setTab("compose");
  }, [user]);

  const childFunc = useRef(null);
  const items = [
    {
      label: isWebDevice ? "INBOX" : '',
      key: "inbox",
      icon: (
        <Avatar
          icon={<InboxOutlined />}
          style={{
            backgroundImage: "linear-gradient(#4f60a7, #2bb2d2)",
            color: "white",
            justifyContent: "center",
            alignContent: "center",
          }}
        />
      ),
    },
    {
      label: isWebDevice ? "SENT" : '',
      key: "sent",
      icon: (
        <Avatar
          icon={<SendOutlined />}
          style={{
            backgroundImage: "linear-gradient(#61be54, #d7e168)",
            color: "white",
            justifyContent: "center",
            alignContent: "center",
          }}
        />
      ),
    },
    {
      label: isWebDevice ? "COMPOSE" : '',
      key: "compose",
      icon: (
        <Avatar
          icon={<FormOutlined />}
          style={{
            backgroundImage: "linear-gradient(#753ec1, #b753f6)",
            color: "white",
            justifyContent: "center",
            alignContent: "center",
          }}
        />
      ),
    },
    {
      label: isWebDevice ? "NOTICES" : '',
      key: "notices",
      icon: (
        <Avatar
          icon={<BellOutlined />}
          style={{
            backgroundImage:
              "linear-gradient(rgb(241 104 119), rgb(210 74 89))",
            color: "white",
            justifyContent: "center",
            alignContent: "center",
          }}
        />
      ),
    },
    {
      label: isWebDevice ? "SEND INVITES" : '',
      key: "send_invites",
      icon: (
        <Avatar
          icon={<SendOutlined />}
          style={{
            backgroundImage: "linear-gradient(#4f60a7, #2bb2d2)",
            color: "white",
            justifyContent: "center",
            alignContent: "center",
          }}
        />
      ),
    },
    {
      label: isWebDevice ? "PENDING INVITES" : '',
      key: "pending_invites",
      icon: (
        <Avatar
          icon={<MailOutlined />}
          style={{
            backgroundImage: "linear-gradient(#fe624b, #f9c52a)",
            color: "white",
            justifyContent: "center",
            alignContent: "center",
          }}
        />
      ),
    },
  ];
  const [bulkoptionValue, setBulkoption] = useState([]);

  const bulkoptionChange = (value) => {
    setBulkoption(value);
  };

  const [selectedlist, setCheckList] = useState([]);

  useEffect(
    () => console.log("re-render because x changed:", bulkoptionValue),
    [bulkoptionValue]
  );

  const [tab, setTab] = useState("inbox");
  const onClickTab = (e) => setTab(e.key);
  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content>
        <div className="mailbox-banner-area-partner">
          <div className="mail-container">
            <div className="mailbox-container">
              <Row gutter={[16, 24]} justify="space-around">
                <Col span={24}>
                  <Menu
                    className="partner-message-menu"
                    selectedKeys={[tab]}
                    mode="horizontal"
                    items={items}
                    onClick={onClickTab}
                  />
                </Col>
              </Row>
              <Row
                gutter={[16, 10]}
                justify="space-around"
                style={{
                  marginTop: isWebDevice ? 50 : 20,
                }}
              >
                <Col span={24}>
                  {tab === "inbox" || tab === "sent" ? (
                    <>
                      {" "}
                      <Select
                        defaultValue="bluk"
                        onChange={(e) => bulkoptionChange(e)}
                        style={{ width: 120, marginRight: 10 }}
                        options={
                          tab == "inbox"
                            ? [
                              {
                                value: "bluk",
                                label: "Bluk Action",
                              },
                              {
                                value: "read",
                                label: "Mark Read",
                              },
                              {
                                value: "unread",
                                label: "Mark Unread",
                              },
                              {
                                value: "delete",
                                label: "Delete",
                              },
                            ]
                            : [
                              {
                                value: "bluk",
                                label: "Bluk Action",
                              },
                              {
                                value: "delete",
                                label: "Delete",
                              },
                            ]
                        }
                      />
                      <Button
                        onClick={() =>
                          childFunc.current(bulkoptionValue, selectedlist)
                        }
                        style={{
                          backgroundColor: "#4fc1e9",
                          borderColor: "#4fc1e9",
                          color: "white",
                        }}
                      >
                        Apply
                      </Button>
                    </>
                  ) : (
                    <div className="mail_space"></div>
                  )}
                </Col>

                <Col span={24}>
                  <div className="mail-content">
                    {tab === "inbox" && (
                      <MailInbox
                        childlistfunc={setCheckList}
                        childFunc={childFunc}
                        bulkvalue={bulkoptionValue}
                      />
                    )}
                    {tab === "sent" && (
                      <MailSent
                        childlistfunc={setCheckList}
                        childFunc={childFunc}
                        bulkvalue={bulkoptionValue}
                      />
                    )}
                    {tab === "notices" && (
                      <MailNotices
                        childlistfunc={setCheckList}
                        childFunc={childFunc}
                        bulkvalue={bulkoptionValue}
                      />
                    )}
                    {tab === "compose" && (
                      <MailCompose emailID={router.query.email} />
                    )}
                    {tab === "send_invites" && <MailSendInvite />}
                    {tab === "pending_invites" && <MailPendingInvite />}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Mail;
