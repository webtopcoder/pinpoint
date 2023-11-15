import React, { useState, useEffect } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap"; 3
import { apiBaseUrl } from "@/utils/baseUrl";
import { logout } from "@/src/redux/User/actions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Tag } from "antd";

const ProfileMenu = ({ fullName, role, avatarImg, onLogout }) => {
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
                    <span className="desktop d-none d-xl-inline-block ms-2 me-1">{localStorage.getItem('fullname')}</span>
                    <i className="bx bx-chevron-down d-xl-inline-block desktop"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <div className="mt-4 mt-md-0" style={{
                        textAlign: 'center',
                        padding: 10
                    }}>
                        <img className="rounded-circle avatar-lg" alt="200x200" src={avatarurl + avatarImg} data-holder-rendered="true" />
                        <h6 style={{ marginTop: 10, marginBottom: 0 }}>{localStorage.getItem('fullname')}</h6>
                        <span>@{localStorage.getItem('username')}</span>
                        <p>
                            <Tag color="#55acee">
                                {role}
                            </Tag>
                        </p>
                    </div>
                    <div className="dropdown-divider" style={{
                        marginLeft: 0
                    }} />
                    {role === "partner" &&
                        <DropdownItem tag="a" onClick={() =>
                            router.push(`/partner/dashboard`)
                        }>
                            {" "}
                            <i className="bx bxs-dashboard font-size-16 align-middle me-1" />
                            My Dashboard
                        </DropdownItem>}
                    <DropdownItem tag="a" onClick={() =>
                        router.push(`/profile/${localStorage.getItem('user_id')}/activity`)
                    }>
                        {" "}
                        <i className="bx bx-user font-size-16 align-middle me-1" />
                        View Profile
                    </DropdownItem>
                    <DropdownItem tag="a" onClick={() => router.push('/message/inbox')}>
                        {" "}
                        <i className="bx bx-envelope font-size-16 align-middle me-1" />
                        Message
                    </DropdownItem>
                    <DropdownItem tag="a" onClick={() => router.push('/profile/setting')}>
                        <i className="bx bx-cog font-size-16 align-middle me-1" />
                        Setting
                    </DropdownItem>

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
