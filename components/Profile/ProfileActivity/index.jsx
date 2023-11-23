//optimized
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { profileService } from "@/services/index";
import WelcomeProfile from "@/components/Profile/ProfileActivity/WelcomeProfile";
import PhotoSection from "@/components/Profile/ProfileActivity/PhotoSection";
import Statistic from "@/components/Profile/ProfileActivity/Statistic";
import NavMenu from "@/components/Profile/ProfileActivity/NavMenu";
import ViewMapSection from "@/components/Profile/ProfileActivity/ViewMapSection";
import Breadcrumbs from "@/components/Common/Breadcrumb"
import { downloadFile } from "@/redux/Mail/actions";
import { Container, Row, Col } from "reactstrap";
import { Spin } from "antd";
import classnames from "classnames";
import useMedia from "@/hooks/useMedia";

const index = ({
  ondownloadFile,
  user_id,
  userRole,
  headerInfo,
  own_page,
  getHeader,
  profileLoading
}) => {

  const [myAllPhotos, setAllphotos] = useState([]);
  const [activeMenu, setActiveMenu] = useState('main');
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const router = useRouter();
  const isWebDevice = useMedia('(min-width:700px)');
  const view_user_id = router?.query?.profile;
  const [paginationInfo, setPaginationInfo] = useState({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  async function initializeProfile(profileId) {
    const allPhotos = await profileService.getAllphotos(profileId, false, paginationInfo);
    await setAllphotos(allPhotos?.image);
    await profileService.updateProfileViewsCount(profileId);
  }

  useEffect(() => {
    initializeProfile(view_user_id);
  }, [router.isReady, view_user_id]);

  const renderLeftSide = () => (
    <Col xl="3">
      <div className={classnames('activity-leftside', { 'd-none': !isWebDevice && (activeMenu === 'main' || activeMenu === 'photo') })}>
        <Spin spinning={profileLoading}>
          <WelcomeProfile
            headerInfo={headerInfo}
            own_page={own_page}
            getHeader={getHeader}
            userRole={userRole}
          />
        </Spin>
      </div>
    </Col>
  );

  const renderMiddleSection = () => (
    <Col xl="6" className={classnames({ 'd-none': !isWebDevice && (activeMenu === 'info' || activeMenu === 'photo') })}>
      <Spin spinning={profileLoading}>
        <Statistic headerInfo={headerInfo} />
        <NavMenu
          view_user_id={view_user_id}
          userRole={userRole}
          view_user_role={headerInfo?.profile?.usertype}
          getHeader={getHeader}
          user_id={user_id}
          customActiveTab={customActiveTab}
          setcustomActiveTab={setcustomActiveTab}
        />
      </Spin>
    </Col>
  );

  const renderRightSide = () => (
    <Col xl="3">
      <div className={classnames('activity-rightside', { 'd-none': !isWebDevice && (activeMenu === 'info' || activeMenu === 'main') })}>
        <Spin spinning={profileLoading}>
          <PhotoSection
            myAllPhotos={myAllPhotos}
            headerInfo={headerInfo}
            own_page={own_page}
            getHeader={getHeader}
            userRole={userRole}
          />
        </Spin>
        <div className="auth-space"></div>
        <Spin spinning={profileLoading}>
          <ViewMapSection
            myAllPhotos={myAllPhotos}
            headerInfo={headerInfo}
            own_page={own_page}
            getHeader={getHeader}
            userRole={userRole}
          />
        </Spin>
      </div>
    </Col>
  );

  return (
    <React.Fragment>
      <div className={classnames('page-content', { 'pt-1': !isWebDevice },)}>
        <Container fluid>
        <Breadcrumbs title="Profile" breadcrumbItem={headerInfo?.profile?.fullname} />
          <Row>
            {renderLeftSide()}
            {renderMiddleSection()}
            {renderRightSide()}
          </Row>
        </Container>
      </div>
      <div className="bottom-activity-menu mobile">
        <div className="app-footer border-0 shadow-lg bg-primary-gradiant">
          <a
            className={classnames('nav-content-bttn', { 'active': activeMenu === 'info' })}
            onClick={() => {
              setActiveMenu('info');
            }}><i className="bx bx-info-circle"></i>{" "}Info</a>
          <a
            className={classnames('nav-content-bttn', { 'active': activeMenu === 'main' })}
            onClick={() => {
              setActiveMenu('main');
            }}
          ><i className="bx bxs-dashboard"></i>{" "}Main</a>
          <a
            className={classnames('nav-content-bttn', { 'active': activeMenu === 'photo' })}
            onClick={() => {
              setActiveMenu('photo');
            }}
            data-tab="chats" ><i className="bx bxs-image"></i>{" "}Photo</a>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
    followAndFollowing: user.followAndFollowing,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ondownloadFile: (filename) => dispatch(downloadFile(filename)),
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
