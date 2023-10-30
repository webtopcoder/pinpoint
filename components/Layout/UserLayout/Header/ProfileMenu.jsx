import React, { useState, useEffect } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { apiBaseUrl } from "@/utils/baseUrl";

//i18n
// Redux
import Link from "@/utils/ActiveLink";

// users

// import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = () => {
    // Declare a new state variable, which we'll call "menu"
    const [menu, setMenu] = useState(false);
    const avatarurl = `${apiBaseUrl}/avatar/`;

    const [username, setusername] = useState("Admin");

    // useEffect(() => {
    //     if (localStorage.getItem("authUser")) {
    //         if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //             const obj = JSON.parse(localStorage.getItem("authUser"));
    //             setusername(obj.displayName);
    //         } else if (
    //             process.env.REACT_APP_DEFAULTAUTH === "fake" ||
    //             process.env.REACT_APP_DEFAULTAUTH === "jwt"
    //         ) {
    //             const obj = JSON.parse(localStorage.getItem("authUser"));
    //             setusername(obj.username);
    //         }
    //     }
    // }, [props.success]);

    return (
        <React.Fragment>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="d-inline-block"
            >
                <DropdownToggle
                    className="btn header-item "
                    id="page-header-user-dropdown"
                    tag="button"
                >

                    <img src={avatarurl + '20145331-1688404255867-648c4a84b8ec1739a9319690.png'} className="rounded-circle header-profile-user"
                        alt="Header Avatar" />
                    <span className="desktop d-none d-xl-inline-block ms-2 me-1">{username}</span>
                    <i className="bx bx-chevron-down d-xl-inline-block desktop"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem tag="a" href="/profile">
                        {" "}
                        <i className="bx bx-user font-size-16 align-middle me-1" />
                        View Profile
                    </DropdownItem>
                    <DropdownItem tag="a" href="/crypto-wallet">
                        <i className="bx bx-wallet font-size-16 align-middle me-1" />
                        Edit Profile
                    </DropdownItem>
                    <DropdownItem tag="a" href="#">
                        <i className="bx bx-wrench font-size-16 align-middle me-1" />
                        Setting
                    </DropdownItem>
                    <div className="dropdown-divider" style={{
                        marginLeft: 0
                    }} />
                    <a href="/logout" className="dropdown-item">
                        <span><i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />Log out</span>
                    </a>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};



export default ProfileMenu;
