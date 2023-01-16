import { getHeader } from "@/src/redux/Profile/actions";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";

const Submenu = ({ headerInfo, ongetHeader }) => {
  const router = useRouter();
  const view_user_id = router.query.profile;

  useEffect(() => {
    if (router.isReady) {
      const { profile } = router.query;
      ongetHeader(profile);
    }
  }, [router.isReady]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="user-profile-submenu">
          <ul>
            <li>
              <Link href={`/profile/${view_user_id}/activity`}>
                <a
                  className={
                    router.pathname == `/profile/[profile]/activity`
                      ? "active"
                      : ""
                  }
                >
                  Activity
                </a>
              </Link>
            </li>

            <li>
              <Link href={`/profile/${view_user_id}/shout-outs`}>
                <a
                  className={
                    router.pathname == `/profile/[profile]/shout-outs`
                      ? "active"
                      : ""
                  }
                >
                  Shout outs
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/profile/${view_user_id}/followers`}>
                <a
                  className={
                    router.pathname == `/profile/[profile]/followers`
                      ? "active"
                      : ""
                  }
                >
                  Followers
                </a>
              </Link>
            </li>
            {headerInfo?.profile?.usertype == "partner" ? (
              <li>
                <Link href={`/profile/${view_user_id}/locations`}>
                  <a
                    className={
                      router.pathname == `/profile/[profile]/locations`
                        ? "active"
                        : ""
                    }
                  >
                    Locations
                  </a>
                </Link>
              </li>
            ) : (
              <li>
                <Link href={`/profile/${view_user_id}/favorites`}>
                  <a
                    className={
                      router.pathname == `/profile/[profile]/favorites`
                        ? "active"
                        : ""
                    }
                  >
                    Favorites
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ profile, user }) => {
  return {
    user_id: user.loginInfo.id,
    headerInfo: profile.headerInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ongetHeader: (data) => dispatch(getHeader(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Submenu);
