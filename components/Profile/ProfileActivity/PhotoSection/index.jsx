import React from "react";
import { Row, Col, Card, CardTitle, CardBody, Button } from "reactstrap"
import Slide from "./slide";
import { useRouter } from "next/router";

function index({
    myAllPhotos,
    headerInfo
}) {

    const router = useRouter();

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
                                        <a onClick={() => router.push(`/profile/${headerInfo?.profile?._id}`)} className="text-white font-size-14">View All</a>
                                        <i className="bx bx-right-arrow-alt font-size-16 me-1"></i>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <CardBody className="p-0">
                            <Slide myallPhotos={myAllPhotos.slice(0, 8)} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment >
    );
}

export default index;
