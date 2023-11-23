import { Row, Col, Card, CardTitle, CardBody, Button } from "reactstrap"
import React from "react";
import Slide from "./slide";

function index({
    userRole,
    getHeader,
    myAllPhotos
}) {

    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <Card className="overflow-hidden">
                        <div className="bg-darkblue bg-soft">
                            <Row>
                                <Col xs="6">
                                    <div className="text-white ptlrt-10">
                                        <h5 className="text-white">Photos</h5>
                                    </div>
                                </Col>
                                <Col xs="6">
                                    <div className="text-white ptlrt-10 text-end">
                                        <a href="#" className="text-white font-size-14">View All</a>
                                        <i className="bx bx-right-arrow-alt font-size-16 me-1"></i>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <CardBody className="p-0">
                            <Slide myallPhotos={myAllPhotos} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default index;
