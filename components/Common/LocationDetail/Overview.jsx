import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import ArrivalBannerExpired from "./ArrivalBannerExpired";

//import images

const Overview = ({ location, expand, setExpand, user_id }) => {
    return (
        <React.Fragment>
            <Col xl={4}>
                <Card>
                    <CardBody>
                        <h5 className="fw-semibold">Previous Arrivals</h5>
                        {location?.expiredArrival?.arrivalData?.length > 0 && (
                            <ArrivalBannerExpired
                                location={location}
                                arrivals={location?.expiredArrival}
                                expand={expand}
                                setExpand={setExpand}
                                user_id={user_id}
                            />
                        )}
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default Overview;