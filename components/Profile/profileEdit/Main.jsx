import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AvatarUpload from "./AvatarUpload";
import UserBasicInfo from "./UserBasicInfo";
import PartnerBasicInfo from "./PartnerBasicInfo";
import SocialLinks from "./SocialLinks";
import ChangePassword from "./ChangePassword";
import NotificationSetting from "./NotificationSetting";
import { profileService } from "@/services/index";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Container,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap";
import classnames from "classnames";

const index = ({ userRole }) => {
    const [editInfo, setUserInfo] = useState();
    const [activeTab, setactiveTab] = useState("1");

    useEffect(() => {
        profileService.getInfo()
            .then(async (res) => {
                await setUserInfo(res?.data)
            })
            .catch((error) => {
                console.log(error);
                return;
            });
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <div className="checkout-tabs">
                        <Row>
                            <Col lg="2">
                                <Nav className="flex-column" pills>
                                    <Row>
                                        <Col lg="12" sm="6">
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === "1" })}
                                                    onClick={() => {
                                                        setactiveTab("1");
                                                    }}>
                                                    <i className="bx bxs-info-circle d-block check-nav-icon mt-4 mb-2" />
                                                    <p className="font-weight-bold mb-4">Information</p>
                                                </NavLink>
                                            </NavItem>
                                        </Col>
                                        <Col lg="12" sm="6">
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === "2" })}
                                                    onClick={() => {
                                                        setactiveTab("2");
                                                    }}
                                                >
                                                    <i className="bx bx-globe d-block check-nav-icon mt-4 mb-2" />
                                                    <p className="font-weight-bold mb-4">Social Links</p>
                                                </NavLink>
                                            </NavItem>
                                        </Col>
                                        <Col lg="12" sm="6">
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === "3" })}
                                                    onClick={() => {
                                                        setactiveTab("3");
                                                    }}
                                                >
                                                    <i className="bx bxs-lock d-block check-nav-icon mt-4 mb-2" />
                                                    <p className="font-weight-bold mb-4">Change Password</p>
                                                </NavLink>
                                            </NavItem>
                                        </Col>
                                        <Col lg="12" sm="6">
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === "4" })}
                                                    onClick={() => {
                                                        setactiveTab("4");
                                                    }}
                                                >
                                                    <i className="bx bxs-bell d-block check-nav-icon mt-4 mb-2" />
                                                    <p className="font-weight-bold mb-4">Notifications</p>
                                                </NavLink>
                                            </NavItem>
                                        </Col>
                                    </Row>

                                </Nav>
                            </Col>
                            <Col lg="10">
                                <Card>
                                    <CardBody>
                                        <TabContent activeTab={activeTab}>
                                            <TabPane tabId="1" className="basic-info">
                                                <div className="login-form">
                                                    <CardTitle className="mb-2">Basic Information</CardTitle>
                                                    <AvatarUpload editInfo={editInfo?.profile} />
                                                    {userRole === "user" ? <UserBasicInfo /> : <PartnerBasicInfo />}

                                                </div>
                                            </TabPane>
                                            <TabPane tabId="2" className="basic-info">
                                                <div className="login-form">
                                                    <CardTitle className="mb-2">Social Links</CardTitle>
                                                    <SocialLinks />
                                                </div>
                                            </TabPane>
                                            <TabPane tabId="3" className="basic-info">
                                                <div className="login-form" >
                                                    <CardTitle className="mb-2">Reset Password</CardTitle>
                                                    <ChangePassword />
                                                </div>
                                            </TabPane>
                                            <TabPane tabId="4" className="basic-info">
                                                <div className="login-form" >
                                                    <CardTitle className="mb-2">Notifications</CardTitle>
                                                    <NotificationSetting />
                                                </div>
                                            </TabPane>
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = ({ user }) => {
    return {
        userRole: user.role,
    };
};

export default connect(mapStateToProps, undefined)(index);
