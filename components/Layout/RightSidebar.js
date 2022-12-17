import React from "react";
import { Col, Row, Badge, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Image from "next/image"
import { connect } from "react-redux";

//SimpleBar
import SimpleBar from "simplebar-react";
// Logo
import Logo from "@/public/images/landing/logo.png";
import mailIcon from '@/public/images/landing/user-mail.png';
import LIcon from '@/public/images/landing/l.png';


const RightSidebar = ({ visible }) => {
  return (
    <React.Fragment>
      <div className="right-bar" id="right-bar" style={{ display: `${visible ? '' : 'none'}` }}>
        <SimpleBar style={{ height: "900px" }}>
          <Row style={{paddingLeft: 20, paddingRight: 20, justifyContent: 'center'}}>
            <Image src={Logo} alt="logo" width={280} height={80} />
          </Row>
          <Row style={{marginTop: 20}}>
            <Col md={8} sm={8} xs={8}>
            </Col>
            <Col md={8} sm={8} xs={8} style={{textAlign: 'center'}}>
              <Avatar size={100} style={{backgroundColor: 'gray'}} icon={<UserOutlined style={{fontSize: 80}}/>}/>
            </Col>
            <Col md={8} sm={8} xs={8} style={{textAlign: 'center'}}>
              <div><Badge dot={true}><Image src={mailIcon} alt="mail" width={60} height={40}/></Badge></div>
              <div><Badge dot={true}><Image src={LIcon} alt="l" width={30} height={30}/></Badge></div>
            </Col>
          </Row>
          <Row>
            <div className="view-profile">View Profile</div>
          </Row>
          <Row>
            <div className="edit-profile">edit profile</div>
          </Row>
          <Row className="sidebar-menu-item" onClick={() => alert()}>
            Home
          </Row>
          <Row className="sidebar-menu-item">
            Interactive Map
          </Row>
          <Row className="sidebar-menu-item">
            Locations
          </Row>
          <Row className="sidebar-menu-item">
            Contact Us
          </Row>
          <Row className="sidebar-menu-item">
            FAQ
          </Row>

        </SimpleBar>
      </div>
      <div className="rightbar-overlay"></div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { ...state.Layout };
};

export default connect(mapStateToProps, {
  
})(RightSidebar);
