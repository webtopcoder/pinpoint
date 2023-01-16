import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const Submenu = () => {
  const router = useRouter();
  const view_user_id = router.query.profile;

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
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.loginInfo.id,
  };
};

export default connect(mapStateToProps, undefined)(Submenu);
