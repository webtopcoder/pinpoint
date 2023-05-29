import React, { useEffect } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileAllPhotos from "@/components/Profile/ProfileAllPhotos";
import Layout from "../../../layout";

const Allphotos = () => {
  return (
    <>
      <PageTitle page="PROFILE - All PHOTOS" />
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
