import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LocationsDashboard from "@/components/Partner/Locations/Main";
import NavMenu from "@/components/Partner/NavMenu";
import {
  Row,
  Col,
  Container,
} from "reactstrap";

const Locations = () => {
  return (
    <>
      <PageTitle page="LOCATIONS" />
      <div className="auth-space"></div>
      <div className="profile-authentication-area pt-100 bg-f8fbff">
        <div className="page-content">
          <Container fluid={true}>
            <div className="checkout-tabs">
              <Row>
                <Col lg="2">
                  <NavMenu menu="4" />
                </Col>
                <Col lg="10">
                  <LocationsDashboard />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div >
    </>
  );
};

Locations.requireAuth = true;

Locations.getLayout = function getLayout(page) {
  return <BasicLayout whiteMenu={true}>{page}</BasicLayout>;

};

export default Locations;
