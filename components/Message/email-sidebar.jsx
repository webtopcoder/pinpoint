import React, { useState, useEffect } from "react"
import {
  Button,
  Card,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Badge } from "antd";
import classnames from "classnames";
import { mailService } from "@/services/index";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const EmailSideBar = ({ role, activeTab, setactiveTab, Invitemodal, setInvitemodal, Composemodal, setComposemodal }) => {

  const [data, setData] = useState();
  const router = useRouter();
  useEffect(async () => {
    await mailService.getEmailsByID()
      .then(async (res) => {
        await setData(res)
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }, []);

  return (
    <React.Fragment>
      <Card className="email-leftbar">
        <Button
          type="button"
          color="danger"
          className="btn waves-effect waves-light"
          onClick={() => {
            setComposemodal(!Composemodal);
          }}
          block
        >
          <i className="bx bx-send font-size-16 align-middle me-2"></i>{" "}
          Compose
        </Button>
        <div style={{
          height: 10
        }}></div>
        <Button
          type="button"
          color="danger"
          className="btn waves-effect waves-light"
          onClick={() => {
            setInvitemodal(!Invitemodal);
          }}
          block
        >
          <i className="bx bxs-collection font-size-16 align-middle me-2"></i>{" "}
          Send Invites
        </Button>
        <div className="mail-list mt-4">
          <Nav tabs className="nav-tabs-custom" vertical role="tablist">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "1",
                })}
                onClick={() => {
                  setactiveTab("1");
                  router.push('/message/inbox')
                }}
              >
                <i className="bx bx-envelope me-2"></i> Inbox{" "}
                {
                  data?.inbox !== 0 && <span className="ml-1 float-end"> <Badge style={{ backgroundColor: '#175594' }} count={data?.inbox} /></span>
                }
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "2",
                })}
                onClick={() => {
                  setactiveTab("2");
                  router.push('/message/sent')
                }}
              >
                <i className="bx bx-mail-send me-2"></i>Sent
                {
                  data?.sent !== 0 && <span className="ml-1 float-end"><Badge style={{ backgroundColor: '#175594' }} count={data?.sent} /></span>
                }
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "2",
                })}
                onClick={() => {
                  setactiveTab("2");
                  router.push('/message/star')
                }}
              >
                <i className="bx bx-star me-2"></i>Starred
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "3",
                })}
                onClick={() => {
                  setactiveTab("3");
                  router.push('/message/invite')

                }}
              >
                <i className="bx bx-collection me-2"></i>Invites
                {
                  data?.invite !== 0 && <span className="ml-1 float-end"><Badge style={{ backgroundColor: '#175594' }} count={data?.invite} /></span>
                }
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </Card>
    </React.Fragment>
  )
}

const mapStateToProps = ({ mail, user }) => ({
  user_id: user.user_id,
  role: user.role
});

export default connect(mapStateToProps, undefined)(EmailSideBar);
