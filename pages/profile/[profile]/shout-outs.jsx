import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileShoutout from "@/components/User/Profile/ProfileShout";
import Layout from "../../../layout";

const Shout = () => {
  return (
    <>
      <PageTitle page="PROFILE - SHOUT OUT" />
      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <ProfileShoutout />
        </div>
      </div>
    </>
  );
};

Shout.requireAuth = true;
Shout.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Shout;
