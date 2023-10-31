import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import Edit from "@/components/Profile/profileEdit/Main";
import { Layout } from "antd";
import { connect } from "react-redux";
import useMedia from "@/hooks/useMedia";

const EditProfile = () => {
  return (
    <>
      <PageTitle page="PROFILE EDIT" />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Setting</h1>
          </div>
        </div>
      </div>
      <div className="profile-authentication-area bg-f8fbff">
        <Edit />
      </div >
    </>
  );
};


EditProfile.requireAuth = true;
EditProfile.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default EditProfile;
