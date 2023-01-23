import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import PartnerDashboard from "@/components/Partner/Dashboard";
import { Layout } from "antd";

const Dashboard = () => {
  return (
    <>
      <PageTitle page="Dashboard" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: "130vh",
          }}
        >
          <LeftSidebar />
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
