import { Row, Col, Card, CardBody } from "reactstrap";
import React from "react";
import classnames from "classnames";

function Statistic({ headerInfo }) {
    console.log(headerInfo)
    const isPartner = headerInfo?.profile?.usertype === "partner";
    return (
        <Row>
            <Col md={isPartner ? 3 : 6} sm="6" className="px-1">
                <Card className="mini-stats-wid mb-2">
                    <CardBody>
                        <div className="d-flex">
                            <div className="flex-grow-1">
                                <p className="text-muted fw-semibold">Likes</p>
                                <h4 className="mb-0">{headerInfo?.profile?.favorites}</h4>
                            </div>
                            <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                <span className="avatar-title rounded-circle bg-redLightColor">
                                    <i className="bx bxs-heart font-size-24"></i>
                                </span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col md={isPartner ? 3 : 6} sm="6" className={classnames({ 'px-1': isPartner })}>
                <Card className="mini-stats-wid mb-2">
                    <CardBody>
                        <div className="d-flex">
                            <div className="flex-grow-1">
                                <p className="text-muted fw-semibold">Followers</p>
                                <h4 className="mb-0">{headerInfo?.profile?.followers}</h4>
                            </div>
                            <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                <span className="avatar-title rounded-circle bg-redLightColor">
                                    <i className={isPartner ? "bx bx-user-plus font-size-24" : "bx bx-star font-size-24"}></i>
                                </span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            {isPartner && (
                <>
                    <Col md={3} sm="6" className="px-1">
                        <Card className="mini-stats-wid mb-2">
                            <CardBody>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <p className="text-muted fw-semibold">Rating</p>
                                        <h4 className="mb-0">{headerInfo?.profile?.followers}</h4>
                                    </div>
                                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                        <span className="avatar-title rounded-circle bg-redLightColor">
                                            <i className="bx bx-star font-size-24"></i>
                                        </span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={3} sm="6" className="px-1">
                        <Card className="mini-stats-wid mb-2">
                            <CardBody>
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <p className="text-muted fw-semibold">Locations</p>
                                        <h4 className="mb-0">{headerInfo?.profile?.location}</h4>
                                    </div>
                                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                        <span className="avatar-title rounded-circle bg-redLightColor">
                                            <i className="bx bxs-map font-size-24"></i>
                                        </span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </>
            )}
        </Row>
    );
}

export default Statistic;
