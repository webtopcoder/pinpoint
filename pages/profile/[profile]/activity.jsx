import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileActivity from "@/components/Profile/ProfileActivity";
import Layout from "../../../layout";
import { profileService } from "@/services/index";
import { useRouter } from "next/router";

const Activity = ({ user_id, userRole }) => {
  const router = useRouter();
  const view_user_id = router.query.profile;
  const own_page = user_id === view_user_id;
  const [Profileloading, setProfileLoading] = useState(true);
  const [headerInfo, setHeaderInfo] = useState();

  async function getHeader() {
    setProfileLoading(true);
    const result = await profileService.getHeader(view_user_id);
    await setHeaderInfo(result)
    setProfileLoading(false);
  }

  useEffect(() => {
    getHeader();
  }, [view_user_id]);

  return (
    <>
      <PageTitle page="PROFILE" />
      <div className="page-profile-area">
      </div>
      <div className="profile-authentication-area bg-f8fbff">
        <ProfileActivity headerInfo={headerInfo} Profileloading={Profileloading} own_page={own_page} getHeader={getHeader} userRole={userRole} usertype={headerInfo?.profile?.usertype} />
      </div>
    </>
  );
};

Activity.requireAuth = true;
Activity.getLayout = function getLayout(page) {
  return <Layout whiteMenu={true}>{page}</Layout>;
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
    userRole: user.role,
  };
};

export default connect(mapStateToProps)(Activity);
