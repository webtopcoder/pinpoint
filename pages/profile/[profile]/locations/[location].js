import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import PartnerLocation from "@/components/Partner/Profile/PartnerLocation";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import Layout from "../../../../layout";

const Location = ({ location }) => {
  // dummy static data for testing now
  const dummyLocation = {
    _id: "1",
    name: "Example Food Truck #1",
    avatar: "",
    isActive: true,
    lastSeen: "2 weeks ago",
    likeCount: 106,
    reviewCount: 89,
    rating: 4,
    description:
      "Example Food Truck #1 specializes in authentic Mexican food! Just like your grandma used to make! Come try us out and see for yourselves!",
    location: "Jacksonville, FL",
    posts: [
      {
        from_user: {
          username: "Example Food Truck #1",
          id: "1",
        },

        image: ["63c402aaac00ac8f14d939421673799684099-undefined.png"],
        content: "good boi",
        like: [],
        _id: "63c42804ac00ac8f14d93e79",
        createdAt: "2023-01-15T16:21:24.104Z",
      },
      {
        from_user: {
          username: "Sample User",
          id: "63c402aaac00ac8f14d93942",
          realname: {
            first: "Partner",
            last: "John",
          },
        },
        to_user: {
          username: "Sample User 2",
          id: "63c402aaac00ac8f14d93942",
          realname: {
            first: "Partner",
            last: "John",
          },
        },
        image: ["63c402aaac00ac8f14d939421673799684099-undefined.png"],
        content: "good boi",
        like: [],
        _id: "63c42804ac00ac8f14d93e79",
        createdAt: "2023-01-15T16:21:24.104Z",
      },
      {
        from_user: {
          username: "Example Food Truck #1",
          id: "1",
        },

        image: ["63c402aaac00ac8f14d939421673799684099-undefined.png"],
        content: "good boi",
        like: [],
        _id: "63c42804ac00ac8f14d93e79",
        createdAt: "2023-01-15T16:21:24.104Z",
      },
    ],
  };
  return (
    <>
      <PageTitle page="Locations" />

      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <PartnerLocation {...dummyLocation} />
        </div>
      </div>
    </>
  );
};

Location.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Location;
