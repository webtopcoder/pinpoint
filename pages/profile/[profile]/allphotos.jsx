import React, { useEffect } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileAllPhotos from "@/components/User/Profile/ProfileAllPhotos";
import Layout from "../../../layout";

const Allphotos = () => {
  return (
    <>
      <PageTitle page="All Photos" />
      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <ProfileAllPhotos />
        </div>
      </div>
    </>
  );
};

Allphotos.requireAuth = true;
Allphotos.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Allphotos;
