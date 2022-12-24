import React from "react";
import Link from "next/link";
import { useRouter } from "next/router"
import { connect } from "react-redux";

const Submenu = ({ user_id }) => {

    const router = useRouter()

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="user-profile-submenu">
                    <ul>
                        <li>
                            <Link href={`/user/${user_id}/activity`}>
                                <a className={router.pathname == `/user/[profile]/activity` ? "active" : ""}>Activity</a>
                            </Link>
                        </li>

                        <li>
                            <Link href={`/user/${user_id}/shout-outs`}>
                                <a className={router.pathname == `/user/[profile]/shout-outs` ? "active" : ""}>Shout outs</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/user/${user_id}/followers`}>
                                <a className={router.pathname == `/user/[profile]/followers` ? "active" : ""}>Followers</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/user/${user_id}/favorites`}>
                                <a className={router.pathname == `/user/[profile]/favorites` ? "active" : ""}>Favorites</a>
                            </Link>

                        </li>
                    </ul>
                </div>

            </div>
        </div >
    );
};


const mapStateToProps = ({ user }) => {
    return {
        user_id: user.loginInfo.id
    };
};

export default connect(mapStateToProps, undefined)(Submenu);
