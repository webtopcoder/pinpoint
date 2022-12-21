import React, { useCallback } from "react";
import { Col, Row, Badge, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import Image from "next/image"
import { connect } from "react-redux";
//SimpleBar
import Link from "next/link";
import SimpleBar from "simplebar-react";
// Logo
import Logo from "@/public/images/landing/logo.png";
import mailIcon from '@/public/images/landing/user-mail.png';
import LIcon from '@/public/images/landing/l.png';
import { logout } from '@/src/redux/User/actions';
import toast from "@/components/Toast";

const RightSidebar = ({ visible, token, onLogout }) => {

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const router = useRouter();
  const onLogoutHandler = () => {
    onLogout(res => {
      console.log(token)
      router.push('/home');
    })
  }
  const handlePageRender = (page) => {
    if (token) {
      router.push(page);
    } else {
      notify("error", "Please login")
    }
  }
  const handleOriginPageRender = (page) => {
    router.push(page);
  }

  return (
    <React.Fragment>
      <div className="right-bar" id="right-bar" style={{ display: `${visible ? '' : 'none'}` }}>
        <SimpleBar style={{ height: "900px" }}>
          <Row style={{ paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
            <Image src={Logo} alt="logo" width={280} height={80} />
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col md={8} sm={8} xs={8} style={{ textAlign: 'center', paddingTop: 10 }}>
              {token && <div>
                <Link href="/mail/inbox"><Badge dot={true}><Image src={mailIcon} alt="mail" width={60} height={40} /></Badge>
                </Link></div>}
              {token && <div><Badge dot={true}><Image src={LIcon} alt="l" width={30} height={30} /></Badge></div>}
            </Col>
            <Col md={8} sm={8} xs={8} style={{ textAlign: 'center' }}>
              <Avatar size={100} style={{ backgroundColor: 'gray' }} icon={<UserOutlined style={{ fontSize: 80 }} />} />
            </Col>

            <Col md={8} sm={8} xs={8} style={{ textAlign: 'center', paddingTop: 25 }}>
              {token && <LogoutOutlined style={{ color: '#686868', fontSize: 40, }} onClick={() => onLogoutHandler()} />}
            </Col>
          </Row>
          {token &&
            <Row>
              <div className="view-profile" onClick={() => handlePageRender('/user/profile/activity')}>
                View Profile
              </div>
            </Row>
          }
          {token &&
            <Row>
              <div className="edit-profile" onClick={() => handleOriginPageRender('/user/profile/edit')}>
                edit Profile
              </div>
            </Row>
          }
          {!token &&
            <Row>
              <Link href="/">
                <div className="view-profile">
                  Login
                </div>
              </Link>
            </Row>
          }
          {!token &&
            <Row>
              <Link href="/">
                <div className="edit-profile">
                  Signup
                </div>
              </Link>
            </Row>
          }
          <Row className="sidebar-menu-item" onClick={() => handleOriginPageRender('/home')}>
            Home
          </Row>
          <Row className="sidebar-menu-item" onClick={() => handlePageRender('/user/map/interactive-map')}>
            Interactive Map
          </Row>
          <Row className="sidebar-menu-item" onClick={() => handleOriginPageRender('/home/#pinpoint_location')}>
            Locations
          </Row>
          <Row className="sidebar-menu-item" onClick={() => handleOriginPageRender('/home/#pinpoint_contactus')}>
            Contact Us
          </Row>
          <Row className="sidebar-menu-item" onClick={() => handleOriginPageRender('/faq')}>
            FAQ
          </Row>

        </SimpleBar>
      </div>
      <div className="rightbar-overlay"></div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    ...state.Layout,
    token: state.user.token
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: (cb) => dispatch(logout(cb))
})

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
