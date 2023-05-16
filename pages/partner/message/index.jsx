import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import Mail from "@/components/Partner/Message";
import { Layout } from "antd";
import useMedia from "@/hooks/useMedia";

const PartnerMail = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="Message" />
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

PartnerMail.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default PartnerMail;
