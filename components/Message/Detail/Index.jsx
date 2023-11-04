import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import DetailRight from "./Main";
import Sidebar from "../email-sidebar";
import Compose from "../email-compose";
import Invite from "../email-invite";

const index = ({ tab }) => {
  const [activeTab, setactiveTab] = useState(tab);
  const [Composemodal, setComposemodal] = useState(false);
  const [Invitemodal, setInvitemodal] = useState(false);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xs="12">
              {/* Render Email SideBar */}
              <Sidebar activeTab={activeTab} Composemodal={Composemodal} setComposemodal={setComposemodal} Invitemodal={Invitemodal} setInvitemodal={setInvitemodal} setactiveTab={setactiveTab} />
              <Compose modal={Composemodal} setmodal={setComposemodal} />
              <Invite modal={Invitemodal} setmodal={setInvitemodal} />
              <Card className="email-rightbar mb-3" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId={tab}>
                    <DetailRight tab={tab} />
                  </TabPane>
                </TabContent>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default index;
