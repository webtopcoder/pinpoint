import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import PartnershipDashboard from "@/components/Partner/Partnership";
import { Layout } from "antd";

const Partnership = () => {
  return (
    <>
      <PageTitle page="Partnership" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: "130vh",
          }}
        >
          <LeftSidebar />
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
