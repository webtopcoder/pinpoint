import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import PartnerDashboard from "@/components/Partner/Dashboard/Main";
import NavMenu from "@/components/Partner/NavMenu";
import useMedia from "@/hooks/useMedia";
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
const Dashboard = () => {
  const isWebDevice = useMedia('(min-width:700px)');
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
                  <NavMenu menu="1" />
                </Col>
                <Col lg="10">
                  <PartnerDashboard />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div >
    </>
  );
};

Dashboard.requireAuth = true;

Dashboard.getLayout = function getLayout(page) {
  return <BasicLayout whiteMenu={true}>{page}</BasicLayout>;

};

export default Dashboard;
