import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import { Layout } from "antd";
import AddUsers from "@/components/Partner/Settings/addUser";
import useMedia from "@/hooks/useMedia";

const AddUser = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="ADDITIONAL USERS" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: isWebDevice ? "130vh" : '50vh',
            backgroundColor: "#272753",
          }}
        >
          {isWebDevice ? <LeftSidebar /> : ""}
          <AddUsers />
        </Layout>
      </div>
    </>
  );
};

AddUser.requireAuth = true;
AddUser.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};
export default AddUser;
