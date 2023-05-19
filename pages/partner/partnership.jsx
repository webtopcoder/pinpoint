import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import PartnershipDashboard from "@/components/Partner/Partnership";
import { Layout } from "antd";
import useMedia from "@/hooks/useMedia";

const Partnership = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="PARTNERSHIP | PINPOINT" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: isWebDevice ? "130vh" : 'auto',
          }}
        >
          {isWebDevice ? <LeftSidebar /> : ""}
          <PartnershipDashboard />
        </Layout>
      </div>
    </>
  );
};

Partnership.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default Partnership;
