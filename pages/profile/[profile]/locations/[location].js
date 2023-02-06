import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import PartnerLocation from "@/components/Partner/Profile/PartnerLocation";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import Layout from "../../../../layout";
import { connect } from "react-redux";

const Location = () => {
  return (
    <>
      <PageTitle page="Locations" />

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

Location.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default connect()(Location);
