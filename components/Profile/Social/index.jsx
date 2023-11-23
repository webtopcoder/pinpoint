//optimized
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { profileService } from "@/services/index";
import WelcomeProfile from "@/components/Profile/ProfileActivity/WelcomeProfile";
import FollowersList from "./FollowersList";
import PhotoSection from "@/components/Profile/ProfileActivity/PhotoSection";
import Posts from "./Activity/Posts";
import Breadcrumbs from "@/components/Common/Breadcrumb"
import ViewMapSection from "@/components/Profile/ProfileActivity/ViewMapSection";
import { downloadFile } from "@/redux/Mail/actions";
import { Container, Row, Col } from "reactstrap";
import { Spin } from "antd";
import classnames from "classnames";
import useMedia from "@/hooks/useMedia";
import useNotify from "@/hooks/useNotify";

const index = ({
  ondownloadFile,
  user_id,
  userRole,
  headerInfo,
  getHeader,
  profileLoading
}) => {

  const { notify } = useNotify();
  const [myAllPhotos, setAllphotos] = useState([]);
  const [activeMenu, setActiveMenu] = useState('main');
  const [loading, setLoading] = useState(true);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [LoadMoreAllStatus, setLoadMoreAll] = useState(false);
  const [activityTotal, setActivityTotal] = useState();

  const router = useRouter();
  const isWebDevice = useMedia('(min-width:700px)');
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

  async function allSocials(id, count, search) {
    await profileService.getSocials(id, count, search)
      .then((res) => {
        if (res.success) {
          res?.posts?.length === 0 ? setLoadMoreAll(true) : ''
          setInitLoading(false);
          setLoading(false);
          if (count !== 1) {
            const newData = data.concat(res.posts);
            setData(newData);
            setList(newData);
          }
          else {
            setData(res.posts);
            setList(res.posts);
          }
          window.dispatchEvent(new Event("resize"));
          setActivityTotal(res.activityTotal)
        } else notify("error", res.msg);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  useEffect(() => {
    initializeProfile(user_id);
    allSocials(user_id, 1, "")
  }, [router.isReady, user_id]);


  const renderLeftSide = () => (
    <Col xl="3">
      <div className={classnames('activity-leftside', { 'd-none': !isWebDevice && (activeMenu === 'main' || activeMenu === 'photo') })}>
        <Spin spinning={profileLoading}>
          <WelcomeProfile
            headerInfo={headerInfo}
            getHeader={getHeader}
            userRole={userRole}
            own_page={true}
          />
        </Spin>
      </div>
    </Col>
  );

  const renderMiddleSection = () => (
    <Col xl="6" className={classnames({ 'd-none': !isWebDevice && (activeMenu === 'info' || activeMenu === 'photo') })}>
      <Spin spinning={profileLoading}>
        <FollowersList
          user_id={user_id}
        />
        <div className="auth-space"></div>
        <Posts
          initLoading={initLoading}
          loading={loading}
          user_id={user_id}
          list={list}
          data={data}
          setLoading={setLoading}
          setList={setList}
          allActivities={allSocials}
          LoadMoreAllStatus={LoadMoreAllStatus}
          activityTotal={activityTotal}
        />
        {/* <NavMenu
          userRole={userRole}
          getHeader={getHeader}
          user_id={user_id}
        /> */}
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
            getHeader={getHeader}
            userRole={userRole}
          />
        </Spin>
        <div className="auth-space"></div>
        <Spin spinning={profileLoading}>
          <ViewMapSection
            myAllPhotos={myAllPhotos}
            headerInfo={headerInfo}
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
          <Breadcrumbs title="Home" breadcrumbItem="Pinpoint Social" />
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
