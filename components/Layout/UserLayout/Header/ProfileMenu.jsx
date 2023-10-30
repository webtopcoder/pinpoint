import React, { useState, useEffect } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { apiBaseUrl } from "@/utils/baseUrl";
import { logout } from "@/src/redux/User/actions";
import { connect } from "react-redux";
import { useRouter } from "next/router";

//i18n
// Redux
import Link from "@/utils/ActiveLink";

const ProfileMenu = ({ fullName, avatarImg, onLogout }) => {
    // Declare a new state variable, which we'll call "menu"
    const router = useRouter();
    const [menu, setMenu] = useState(false);
    const avatarurl = `${apiBaseUrl}/avatar/`;

    const onLogoutHandler = () => {
        onLogout(() => {
            router.push("/");
        });
    };

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
                    {avatarImg ? <img src={avatarurl + avatarImg} className="rounded-circle header-profile-user"
                        alt="Header Avatar" /> : <i className="bx bxs-user-circle d-xl-inline-block" style={{
                            fontSize: 32
                        }}></i>}
                    <span className="desktop d-none d-xl-inline-block ms-2 me-1">{fullName}</span>
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
                    <a onClick={() => onLogoutHandler()} className="dropdown-item">
                        <span><i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />Log out</span>
                    </a>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};



const mapDispatchToProps = (dispatch) => ({
    onLogout: (cb) => dispatch(logout(cb)),
});

export default connect(undefined, mapDispatchToProps)(ProfileMenu);
