import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import { Layout } from "antd";
import AddUsers from "@/components/Partner/Settings/addUser";

const AddUser = () => {
  return (
    <>
      <PageTitle page="Settings | Additional Users" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: "130vh",
            backgroundColor: "#272753",
          }}
        >
          <LeftSidebar />
          <AddUsers />
        </Layout>
      </div>
    </>
  );
};

AddUser.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};
export default AddUser;
