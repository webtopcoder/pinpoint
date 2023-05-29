import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import PartnerLocations from "@/components/Locations/PartnerLocations";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import Layout from "../../../../layout";

const Locations = () => {
  return (
    <>
      <PageTitle page="PROFILE - LOCATIONS" />
      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <PartnerLocations />
        </div>
      </div>
    </>
  );
};

Locations.requireAuth = true;
Locations.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Locations;
