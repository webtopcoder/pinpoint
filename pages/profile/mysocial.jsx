//optimized
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PageTitle from "@/components/Layout/PageTitle";
import ProfileSocials from "@/components/Profile/Social";
import Layout from "../../layout";
import { profileService } from "@/services/index";

const Social = ({ user_id, userRole }) => {
  const [profileLoading, setProfileLoading] = useState(true);
  const [headerInfo, setHeaderInfo] = useState(null);

  const getHeader = async () => {
    setProfileLoading(true);
    try {
      const result = await profileService.getHeader(user_id);
      setHeaderInfo(result);
    } catch (error) {
      // Handle error here
      console.error("Error fetching header:", error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    getHeader();
  }, []);

  return (
    <>
      <PageTitle page="PROFILE" />
      <div className="page-profile-area">
      </div>
      <div className="profile-authentication-area bg-f8fbff">
        <ProfileSocials
          headerInfo={headerInfo}
          profileLoading={profileLoading}
          getHeader={getHeader}
          userRole={userRole}
        />
      </div>
    </>
  );
};

Social.requireAuth = true;
Social.getLayout = function getLayout(page) {
  return <Layout whiteMenu={true}>{page}</Layout>;
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
    userRole: user.role,
  };
};

export default connect(mapStateToProps)(Social);

