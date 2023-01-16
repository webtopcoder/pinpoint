import React, { useEffect } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import PartnerFollowers from "@/components/Partner/Profile/profileFollowers";
import { getFollowers } from "@/redux/Profile/actions";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import BasicLayout from "../../../layout";
import { connect } from "react-redux";

const Followers = ({ followersInfo }) => {
  return (
    <>
      <PageTitle page="Profile Followers" />
      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <PartnerFollowers followerInfo={followersInfo} />
        </div>
      </div>
    </>
  );
};

Followers.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

const mapStateToProps = ({ profile }) => {
  return {
    followersInfo: profile.followersInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ongetFollowers: (data) => dispatch(getFollowers(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Followers);
