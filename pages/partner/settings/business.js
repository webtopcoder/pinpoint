import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import { Layout } from "antd";
import Business from "@/components/Partner/Settings/business";

const SettingBusiness = () => {
  return (
    <>
      <PageTitle page="Settings | Modifiy Business Details" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: "130vh",
            backgroundColor: "#272753",
          }}
        >
          <LeftSidebar />
          <Business />
        </Layout>
      </div>
    </>
  );
};

SettingBusiness.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};
export default SettingBusiness;
