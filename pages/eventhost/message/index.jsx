import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../../layout";
import LeftSidebar from "@/components/Layout/Eventhost/Sidebar";
import Mail from "@/components/Eventhost/Message";
import { Layout } from "antd";
import useMedia from "@/hooks/useMedia";

const EventhostMail = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="MESSAGE" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: "130vh",
          }}
        >
          {isWebDevice ? <LeftSidebar /> : ""}
          <Mail />
        </Layout>
      </div>
    </>
  );
};

EventhostMail.requireAuth = true;
EventhostMail.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default EventhostMail;
