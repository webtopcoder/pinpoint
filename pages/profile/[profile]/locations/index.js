import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import PartnerLocations from "@/components/Partner/Profile/PartnerLocations";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import Layout from "../../../../layout";

const Locations = ({ locations }) => {
  // dummy static data for testing now
  const location = [
    {
      _id: "1",
      name: "Example Food Truck #1",
      isActive: true,
      lastSeen: "2 weeks ago",
      likeCount: 106,
      reviewCount: 89,
      rating: 5,
      description:
        "Example Food Truck #1 specializes in authentic Mexican food! Just like your grandma used to make! Come try us out and see for yourselves!",
      location: "Jacksonville, FL",
    },
    {
      _id: "2",
      name: "Example Food Truck #2",
      isActive: true,
      lastSeen: "2 weeks ago",
      likeCount: 16,
      reviewCount: 60,
      rating: 3.5,
      description:
        "Example Food Truck #2 specializes in authentic Mexican food! Just like your grandma used to make! Come try us out and see for yourselves!",
      location: "Jacksonville, FL",
    },
    {
      _id: "3",
      name: "Example Food Truck #3",
      isActive: false,
      lastSeen: "2 weeks ago",
      likeCount: 29,
      reviewCount: 100,
      rating: 3,
      description:
        "Example Food Truck #3 specializes in authentic Mexican food! Just like your grandma used to make! Come try us out and see for yourselves!",
      location: "Atlantic Beach, FL",
    },
  ];

  return (
    <>
      <PageTitle page="Locations" />

      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <PartnerLocations locations={location} />
        </div>
      </div>
    </>
  );
};

Locations.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Locations;
