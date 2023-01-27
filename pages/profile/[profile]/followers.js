import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import ProfileFollowers from "@/components/Profile/ProfileFollowers";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import BasicLayout from "../../../layout";
import { connect } from "react-redux";

const Followers = () => {
  return (
    <>
      <PageTitle page="Profile Followers" />
      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <ProfileFollowers />
        </div>
      </div>
    </>
  );
};

Followers.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default connect()(Followers);
