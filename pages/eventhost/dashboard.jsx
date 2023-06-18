import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LeftSidebar from "@/components/Layout/Eventhost/Sidebar";
import EventhostDashboard from "@/components/Eventhost/Dashboard";
import { Layout } from "antd";
import useMedia from "@/hooks/useMedia";

const Dashboard = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="DASHBOARD" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: isWebDevice ? "130vh" : 'auto',
          }}
        >
          {isWebDevice ? <LeftSidebar /> : ""}
          <EventhostDashboard />
        </Layout>
      </div>
    </>
  );
};

Dashboard.requireAuth = true;

Dashboard.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default Dashboard;
