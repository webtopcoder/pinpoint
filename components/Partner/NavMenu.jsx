import React from "react";
import {
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import classnames from "classnames";
import { useRouter } from "next/router";

const NavMenu = ({ menu }) => {

    const router = useRouter();
    return (
        <Nav className="flex-column" pills>
            <Row>
                <Col lg="12" sm="6">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: menu === "1" })}
                            onClick={() => {
                                router.push('/partner/dashboard')
                            }}>
                            <i className="bx bxs-home-circle d-block check-nav-icon mt-2 mb-2" />
                            <p className="font-weight-bold mb-2">Dashboard</p>
                        </NavLink>
                    </NavItem>
                </Col>
                <Col lg="12" sm="6">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: menu === "2" })}
                            onClick={() => {
                            }}
                        >
                            <i className="bx bx-cart-alt d-block check-nav-icon mt-2 mb-2" />
                            <p className="font-weight-bold mb-2">Orders</p>
                        </NavLink>
                    </NavItem>
                </Col>
                <Col lg="12" sm="6">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: menu === "3" })}
                            onClick={() => {
                            }}
                        >
                            <i className="bx bx-detail d-block check-nav-icon mt-2 mb-2" />
                            <p className="font-weight-bold mb-2">Bookings</p>
                        </NavLink>
                    </NavItem>
                </Col>
                <Col lg="12" sm="6">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: menu === "4" })}
                            onClick={() => {
                                router.push('/partner/locations')
                            }}
                        >
                            <i className="bx bx-map-pin d-block check-nav-icon mt-2 mb-2" />
                            <p className="font-weight-bold mb-2">Locations</p>
                        </NavLink>
                    </NavItem>
                </Col>
                <Col lg="12" sm="6">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: menu === "5" })}
                            onClick={() => {
                                router.push('/partner/partnership')
                            }}
                        >
                            <i className="bx bx-group d-block check-nav-icon mt-2 mb-2" />
                            <p className="font-weight-bold mb-2">PartnerShip</p>
                        </NavLink>
                    </NavItem>
                </Col>
            </Row>
        </Nav>
    )
};


export default NavMenu;
