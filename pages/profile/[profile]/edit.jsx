import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import Edit from "@/components/Partner/Profile/Edit";
import { Layout } from "antd";
import { connect } from "react-redux";

const PartnerEdit = ({ role }) => {
  return (
    <>
      <PageTitle page="Profile Edit" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: "130vh",
          }}
        >
          {role === "partner" && <LeftSidebar />}
          <Edit />
        </Layout>
      </div>
    </>
  );
};

PartnerEdit.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

const mapStateToProps = (state) => {
  return {
    role: state.user.role,
  };
};

export default connect(mapStateToProps)(PartnerEdit);
