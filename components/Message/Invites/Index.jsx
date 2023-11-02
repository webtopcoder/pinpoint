import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import InviteRight from "./Main";
import Sidebar from "../email-sidebar";
import Compose from "../email-compose";
import Invite from "../email-invite";

const index = () => {
  const [activeTab, setactiveTab] = useState("3");
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
              <div className="email-rightbar mb-3">
                <Card style={{ padding: 20 }}>
                  {/* Render Email Top Tool Bar */}
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="3">
                      <InviteRight />
                    </TabPane>
                  </TabContent>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default index;
