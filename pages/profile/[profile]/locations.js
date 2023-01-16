import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import PartnerLocation from "@/components/Partner/Profile/PartnerLocation";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import Layout from "../../../layout";

const Locations = ({ locations }) => {
  // dummy static data for testing now
  const location = [
    {
      _id: "1",
      name: "Example1",
      isActive: true,
      lastSeen: "2 weeks ago",
      rating: 4,
      description: "loerm30",
      location: "lousiana",
    },
    {
      _id: "2",
      name: "Example1",
      isActive: true,
      lastSeen: "2 weeks ago",
      rating: 4,
      description: "loerm30",
      location: "lousiana",
    },
    {
      _id: "3",
      name: "Example1",
      isActive: true,
      lastSeen: "2 weeks ago",
      rating: 4,
      description: "loerm30",
      location: "lousiana",
    },
  ];

  return (
    <>
      <PageTitle page="Locations" />

      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <PartnerLocation locations={location} />
        </div>
      </div>
    </>
  );
};

Locations.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Locations;
