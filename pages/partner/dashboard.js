import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import PartnerDashboard from "@/components/Partner/Dashboard";
import { Layout } from "antd";
import useMedia from "@/hooks/useMedia";

const Dashboard = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="Dashboard" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: isWebDevice ? "130vh" : 'auto',
          }}
        >
          {isWebDevice ? <LeftSidebar /> : ""}
          <PartnerDashboard />
        </Layout>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default Dashboard;
