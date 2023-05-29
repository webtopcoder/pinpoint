import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import PartnerLocation from "@/components/Locations/PartnerLocation";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import Layout from "../../../../layout";

const Location = () => {
  return (
    <>
      <PageTitle page="PROFILE - LOCATION" />

      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <PartnerLocation />
        </div>
      </div>
    </>
  );
};

Location.requireAuth = true;
Location.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Location;
