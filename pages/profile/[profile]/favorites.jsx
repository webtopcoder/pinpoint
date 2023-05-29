import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileFavorites from "@/components/Profile/ProfileFavorites";
import Layout from "../../../layout";

const Favorites = () => {
  return (
    <>
      <PageTitle page="PROFILE - FAVORITES" />
      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <ProfileFavorites />
        </div>
      </div>
    </>
  );
};

Favorites.requireAuth = true;
Favorites.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Favorites;
