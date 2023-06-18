import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import EventHostEvents from "@/components/Eventhost/Events/EventHostEvents";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import Layout from "../../../../layout";
import { profileService } from "@/services/index";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const Events = ({ user_id, userRole }) => {
  const router = useRouter();
  const view_user_id = router.query.profile;
  const own_page = user_id === view_user_id;
  const [loading, setLoading] = useState(true);
  const [headerInfo, setHeaderInfo] = useState();

  async function getHeader() {
    setLoading(true);
    const result = await profileService.getHeader(view_user_id);
    await setHeaderInfo(result)
    setLoading(false);
  }

  useEffect(() => {
    getHeader();
  }, [view_user_id]);

  return (
    <>
      <PageTitle page="PROFILE - EVENTS" />
      <div className="page-pin-area">
        <Profileheader headerInfo={headerInfo} loading={loading} own_page={own_page} getHeader={getHeader} userRole={userRole} />
        <div className="pin-profile-section">
          <Submenu headerInfo={headerInfo} />
          <EventHostEvents />
        </div>
      </div>
    </>
  );
};

Events.requireAuth = true;
Events.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
    userRole: user.role,
  };
};

export default connect(mapStateToProps)(Events);