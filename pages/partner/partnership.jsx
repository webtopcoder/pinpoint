import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import PartnershipDashboard from "@/components/Partner/Partnership";
import NavMenu from "@/components/Partner/NavMenu";
import {
  Row,
  Col,
  Container,
} from "reactstrap";
const Partnership = () => {
  return (
    <>
      <PageTitle page="DASHBOARD" />
      <div className="auth-space"></div>
      <div className="profile-authentication-area pt-100 bg-f8fbff">
        <div className="page-content">
          <Container fluid={true}>
            <div className="checkout-tabs">
              <Row>
                <Col lg="2">
                  <NavMenu menu="5" />
                </Col>
                <Col lg="10">
                  <PartnershipDashboard />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div >
    </>
  );
};

Partnership.requireAuth = true;

Partnership.getLayout = function getLayout(page) {
  return <BasicLayout whiteMenu={true}>{page}</BasicLayout>;

};

export default Partnership;
