import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../../layout";
import LeftSidebarPartner from "@/components/Layout/Partner/Sidebar";
import LeftSidebarEventhost from "@/components/Layout/Eventhost/Sidebar";
import Edit from "@/components/Profile/Edit";
import { Layout } from "antd";
import { connect } from "react-redux";
import useMedia from "@/hooks/useMedia";

const PartnerEdit = ({ role }) => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="PROFILE EDIT" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: isWebDevice ? "130vh" : 'auto',
          }}
        >
          {role === "partner" && isWebDevice ?
            <LeftSidebarPartner /> :
            role === "eventhost" && isWebDevice ?
              <LeftSidebarEventhost /> : ""}
          <Edit />
        </Layout>
      </div>
    </>
  );
};


PartnerEdit.requireAuth = true;
PartnerEdit.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

const mapStateToProps = (state) => {
  return {
    role: state.user.role,
  };
};

export default connect(mapStateToProps)(PartnerEdit);
