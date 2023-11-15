import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText
} from "reactstrap";
import { useRouter } from "next/router";
import QuickPostForm from "./quickPost";

const LeftSide = ({
    dashboardInfo
}) => {

    const router = useRouter();
    return (
        <Col md={9}>
            <Row className="mb-2">
                <Col md={4} sm="12" className="px-1">
                    <Card className="mini-stats-wid mb-2  bg-redLightColor shadow-lg">
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-white fw-semibold">Profile Views</p>
                                    <h4 className="mb-0 text-white">
                                        {dashboardInfo?.profileViews}
                                    </h4>
                                </div>
                                <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                    <span className="avatar-title rounded-circle bg-white">
                                        <i className="bx bx-search-alt-2 font-size-24 text-danger"></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4" sm="12" className="px-1">
                    <Card className="mini-stats-wid mb-2 bg-redLightColor shadow-lg">
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-white fw-semibold">Check Ins</p>
                                    <h4 className="mb-0 text-white">
                                        {dashboardInfo?.checkIns}
                                    </h4>
                                </div>
                                <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                    <span className="avatar-title rounded-circle bg-white">
                                        <i className="bx bx-badge-check font-size-24 text-danger"></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4" sm="12" className="px-1">
                    <Card className="mini-stats-wid mb-2 bg-redLightColor shadow-lg">
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-white fw-semibold">Active Locations</p>
                                    <h4 className="mb-0 text-white">
                                        {dashboardInfo?.activeLocations}
                                    </h4>
                                </div>
                                <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                    <span className="avatar-title rounded-circle bg-white">
                                        <i className={"bx bx-map-pin font-size-24 text-danger"}></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={3} sm="6" className="px-1">
                    <Card className="mini-stats-wid mb-2 shadow-lg">
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-semibold">Rating</p>
                                    <h4 className="mb-0">
                                        {dashboardInfo?.businessRating == "NaN" ? 0 : dashboardInfo?.businessRating}
                                    </h4>
                                </div>
                                <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon desktop">
                                    <span className="avatar-title rounded-circle bg-redLightColor">
                                        <i className="bx bx-star font-size-24"></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="3" sm="6"  className="px-1">
                    <Card className="mini-stats-wid mb-2 shadow-lg">
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-semibold">Likes</p>
                                    <h4 className="mb-0">{dashboardInfo?.likes}</h4>
                                </div>
                                <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon desktop">
                                    <span className="avatar-title rounded-circle bg-redLightColor">
                                        <i className="bx bxs-heart font-size-24"></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="3" sm="6"  className="px-1">
                    <Card className="mini-stats-wid mb-2 shadow-lg">
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-semibold">Followers</p>
                                    <h4 className="mb-0">{dashboardInfo?.followers}</h4>
                                </div>
                                <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon desktop">
                                    <span className="avatar-title rounded-circle bg-redLightColor">
                                        <i className={"bx bx-user-plus font-size-24"}></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm="6" className="px-1">
                    <Card className="mini-stats-wid mb-2 shadow-lg">
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-semibold">Locations</p>
                                    <h4 className="mb-0">   {dashboardInfo?.partnerLocations}</h4>
                                </div>
                                <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon desktop">
                                    <span className="avatar-title rounded-circle bg-redLightColor">
                                        <i className="bx bxs-map font-size-24"></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card body className="bg-postgradient mb-3 shadow-lg">
                        <Row className="p-3">
                            <Col md="12">
                                <CardTitle className="mt-0 text-white fs-4 py-2">Speak your followers!</CardTitle>
                                <CardText className="text-white">
                                    They're eager to hear from you!
                                </CardText>
                                <QuickPostForm />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Col>
    );
};

export default LeftSide;