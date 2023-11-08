import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { profileService } from "@/services/index";
import WelcomeProfile from "@/components/Profile/ProfileActivity/WelcomeProfile";
import PhotoSection from "@/components/Profile/ProfileActivity/PhotoSection";
import Statistic from "@/components/Profile/ProfileActivity/Statistic";
import NavMenu from "@/components/Profile/ProfileActivity/NavMenu";
import ViewMapSection from "@/components/Profile/ProfileActivity/ViewMapSection";
import { downloadFile } from "@/redux/Mail/actions";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import useMedia from "@/hooks/useMedia";

const index = ({
  ondownloadFile,
  user_id,
  usertype,
  userRole,
  headerInfo,
  own_page,
  getHeader
}) => {

  const [myallPhotos, setAllphotos] = useState([]);
  const [activeMenu, setActiveMenu] = useState('main');
  const router = useRouter();
  const isWebDevice = useMedia('(min-width:700px)');
  const view_user_id = router?.query?.profile;
  const [paginationInfo, setPageInfo] = useState({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  async function initFunc(profileId) {
    const allphotos = await profileService.getAllphotos(profileId, false, paginationInfo);
    await setAllphotos(allphotos?.image);
    await profileService.updateProfileViewsCount(profileId);
  }

  useEffect(() => {
    initFunc(view_user_id);
  }, [router.isReady, view_user_id]);

  return (
    <React.Fragment>
      <div className={classnames('page-content', { 'pt-1': !isWebDevice, 'pt-38': isWebDevice },)}>
        <Container fluid>
          <Row>
            <Col xl="3">
              <div className={classnames('activity-leftside', { 'd-none': !isWebDevice && (activeMenu === 'main' || activeMenu === 'photo') })}>
                <WelcomeProfile headerInfo={headerInfo} own_page={own_page} getHeader={getHeader} userRole={userRole} />
              </div>
            </Col>
            <Col xl="6" className={classnames({ 'd-none': !isWebDevice && (activeMenu === 'info' || activeMenu === 'photo') })}>
              <Statistic headerInfo={headerInfo} />
              <div className="auth-space"></div>
              <NavMenu view_user_id={view_user_id} view_user_role={headerInfo?.profile?.usertype} user_id={user_id} />
            </Col>
            <Col xl="3">
              <div className={classnames('activity-rightside', { 'd-none': !isWebDevice && (activeMenu === 'info' || activeMenu === 'main') })}>
                <PhotoSection myallPhotos={myallPhotos} headerInfo={headerInfo} own_page={own_page} getHeader={getHeader} userRole={userRole} />
                <div className="auth-space"></div>
                <ViewMapSection myallPhotos={myallPhotos} headerInfo={headerInfo} own_page={own_page} getHeader={getHeader} userRole={userRole} />
              </div>
            </Col>
            <Col xl="12" className="">
            </Col>
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
