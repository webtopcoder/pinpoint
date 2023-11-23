//optimized
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PageTitle from "@/components/Layout/PageTitle";
import ProfileActivity from "@/components/Profile/ProfileActivity";
import Layout from "../../../layout";
import { profileService } from "@/services/index";
import { useRouter } from "next/router";

const Activity = ({ user_id, userRole }) => {
  const router = useRouter();
  const viewUserId = router.query.profile;
  const ownPage = user_id === viewUserId;
  const [profileLoading, setProfileLoading] = useState(true);
  const [headerInfo, setHeaderInfo] = useState(null);

  const getHeader = async () => {
    setProfileLoading(true);
    try {
      const result = await profileService.getHeader(viewUserId);
      setHeaderInfo(result);
    } catch (error) {
      // Handle error here
      console.error("Error fetching header:", error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    if (viewUserId) {
      getHeader();
    }
  }, [viewUserId]);

  return (
    <>
      <PageTitle page="PROFILE" />
      <div className="page-profile-area">
      </div>
      <div className="profile-authentication-area bg-f8fbff">
        <ProfileActivity
          headerInfo={headerInfo}
          profileLoading={profileLoading}
          ownPage={ownPage}
          getHeader={getHeader}
          userRole={userRole}
        />
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

