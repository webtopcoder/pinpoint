import React, { useState, useRef, useEffect } from "react";
import {
  InboxOutlined,
  SendOutlined,
  FormOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Row, Col, Select, Button } from "antd";
import PageTitle from "@/components/Layout/PageTitle";
import useSWR from "swr";
import MailInbox from "@/components/User/Mail/inbox";
import MailSent from "@/components/User/Mail/sent";
import MailCompose from "@/components/User/Mail/compose";
import MailSendInvite from "@/components/User/Mail/sent_invite";
import MailPendingInvite from "@/components/User/Mail/pending_invite";
import Layout from "../../../layout";
import { useRouter } from "next/router";

// export function useAuthSession() {

//     const { data: user } = useSWR("api/session");

//     useEffect(() => {
//       if (!user) Router.push("/");
//     }, [user]);
//     return user;
//   }

const Index = () => {
  const router = useRouter();
  let emailID = "";
  useEffect(() => {
    if (router.isReady) {
      emailID = router.query.email;
      emailID && setTab("compose");
    }
  }, [router.isReady]);

  const childFunc = useRef(null);
  const items = [
    {
      label: "INBOX",
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
      label: "SENT",
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
      label: "COMPOSE",
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
      label: "SEND INVITES",
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
      label: "PENDING_INVITES",
      key: "pending_invites",
      icon: (
        <Avatar
          icon={<UploadOutlined />}
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
    <>
      <PageTitle page="Message" />
      <div className="mailbox-banner-area-css">
        <div className="mail-container">
          <div className="mailbox-container">
            <Row justify="space-around" vgutter={8}>
              <Col span={6}></Col>
              <Col span={17}>
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
            </Row>
            <Row justify="space-around" vgutter={8}>
              <Col span={6}>
                <Menu
                  className="user-message-menu"
                  selectedKeys={[tab]}
                  mode="inline"
                  items={items}
                  onClick={onClickTab}
                />
              </Col>

              <Col span={17}>
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
    </>
  );
};

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Index;
