import React from "react";
import Link from "next/link";
import { useRouter } from "next/router"

const Submenu = () => {

    const router = useRouter()
   
    return (
        <div className="container">
            <div className="row justify-content-center">

                <div className="user-profile-submenu">
                    <ul>
                        <li>
                            <Link href="/user/profile/activity">
                                <a className={router.pathname == "/user/profile/activity" ? "active" : ""}>Activity</a>
                            </Link>
                        </li>
                        
                        <li>
                            <Link href="/user/profile/shout-outs">
                                <a className={router.pathname == "/user/profile/shout-outs" ? "active" : ""}>Shout Outs</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/user/profile/followers">
                                <a className={router.pathname == "/user/profile/followers" ? "active" : ""}>Followers</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/user/profile/favorites">
                                <a className={router.pathname == "/user/profile/favorites" ? "active" : ""}>Favorites</a>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </div >
    );
};

export default Submenu;
