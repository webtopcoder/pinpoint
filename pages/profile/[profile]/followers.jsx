import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import ProfileFollowers from "@/components/Profile/ProfileFollowers";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import BasicLayout from "../../../layout";
import { profileService } from "@/services/index";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const Followers = ({ user_id, userRole }) => {
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
      <PageTitle page="PROFILE - FOLLOWERS" />
      <div className="page-pin-area">
        <Profileheader headerInfo={headerInfo} loading={loading} own_page={own_page} getHeader={getHeader} userRole={userRole} />
        <div className="pin-profile-section">
          <Submenu />
          <ProfileFollowers getHeader={getHeader} userRole={userRole} user_id={user_id} />
        </div>
      </div>
    </>
  );
};

Followers.requireAuth = true;
Followers.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
    userRole: user.role,
  };
};

export default connect(mapStateToProps)(Followers);

