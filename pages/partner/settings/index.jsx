import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import Setting from "@/components/Partner/Settings";
import { Layout } from "antd";
import useMedia from "@/hooks/useMedia";

const Settings = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="SETTINGS" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: isWebDevice ? "130vh" : '50vh',
          }}
        >
          {isWebDevice ? <LeftSidebar /> : ""}
          <Setting />
        </Layout>
      </div>
    </>
  );
};

Settings.requireAuth = true;
Settings.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};
export default Settings;