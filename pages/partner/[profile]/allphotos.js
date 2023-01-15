import React, { useEffect } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Partner/Header";
import Submenu from "@/components/Layout/Partner/Submenu";
import ProfileAllPhotos from "@/components/User/Profile/profileAllPhotos";
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

Allphotos.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Allphotos;
