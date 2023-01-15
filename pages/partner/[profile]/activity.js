import React, { useEffect } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Partner/Header";
import Submenu from "@/components/Layout/Partner/Submenu";
import ProfileActivity from "@/components/Partner/Profile/profileActivity";
import Layout from "../../../layout";
import { connect } from "react-redux";

const Activity = () => {
  return (
    <>
      <PageTitle page="Activity" />
      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <ProfileActivity />
        </div>
      </div>
    </>
  );
};

Activity.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Activity;
