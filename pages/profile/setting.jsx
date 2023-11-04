import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import Edit from "@/components/Profile/profileEdit/Main";

const Setting = () => {
  return (
    <>
      <PageTitle page="SETTING" />
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

Setting.requireAuth = true;
Setting.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default Setting;
