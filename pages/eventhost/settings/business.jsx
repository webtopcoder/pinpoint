import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../../layout";
import LeftSidebar from "@/components/Layout/Eventhost/Sidebar";
import { Layout } from "antd";
import Business from "@/components/Eventhost/Settings/business";
import useMedia from "@/hooks/useMedia";

const SettingBusiness = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="MODIFY BUSINESS DETAILS" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: isWebDevice ? "130vh" : '50vh',
            backgroundColor: "#272753",
          }}
        >
          {isWebDevice ? <LeftSidebar /> : ""}
          <Business />
        </Layout>
      </div>
    </>
  );
};

SettingBusiness.requireAuth = true;
SettingBusiness.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};
export default SettingBusiness;
