import { Row, Col, Card, CardTitle, CardBody, Button } from "reactstrap"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useNotify from "@/hooks/useNotify";
import { useRouter } from "next/router";
import ViewMap from "@/public/images/viewmap.png";

function ViewMapSection() {
    const router = useRouter();
    const { notify } = useNotify();

    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <Card className="overflow-hidden">
                        <div className="bg-white bg-soft">
                            <Row>
                                <Col xs="12">
                                    <div className="p-4">
                                        <h5 style={{ fontWeight: 700 }}>Where are the goods at Find on map?</h5>
                                        <button
                                            onClick={() => router.push('/interactivemap')}
                                            style={{
                                                fontSize: 13
                                            }}
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            <i className="bx bx-map-alt font-size-16 align-middle me-2"></i>{" "}
                                            View Map
                                        </button>
                                    </div>

                                </Col>
                            </Row>
                        </div>
                        <Image src={ViewMap} alt="login group" />
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default ViewMapSection;
