import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Layout, List, Divider, Col } from "antd";
import { favoriteLocation, unfavoriteLocation, getLocationById } from "@/src/redux/Location/actions";
import useNotify from "@/hooks/useNotify";
import { useRouter } from "next/router";
import ArrivalBanner from "@/components/Locations/PartnerLocation/ArrivalBanner";
import ReviewBox from "@/components/Locations/PartnerLocation/ReviewBox";
import LocationBanner from "@/components/Locations/PartnerLocation/LocationBanner";
import PostForm from "@/components/Locations/PartnerLocation/PostForm";
import ArrivalBannerExpired from "@/components/Locations/PartnerLocation/ArrivalBannerExpired";

const { Content } = Layout;

function temporarySwapHalf(array) {
  var left = null;
  var right = null;
  var length = array.length;
  for (left = 0; left < length / 2; left += 1) {
    right = length - 1 - left;
    var temporary = array[left];
    array[left] = array[right];
    array[right] = temporary;
  }
  return array;
}

const index = ({
  location,
  getLocationInfo,
  onFavoriteLocation,
  onUnFavoriteLocation,
  checkIncount,
  expiredArrivals,
  userRole,
  user_id
}) => {

  const router = useRouter();
  const { notify } = useNotify();
  const [reviews, setReviews] = useState([]);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const locationId = router.query.location;
      getLocationInfo({ id: locationId, expand: expand }, (_, err) => {
        if (err) {
          notify(
            "error",
            err?.response?.data?.message || "Something went wrong"
          );
        }
      });
    }
  }, [router.isReady, expand]);

  useEffect(() => {
    if (location.reviews) {
      const activeReviews = location.reviews.reduce(
        (acc, option, index) => {
          option.status === "active" ? acc.push(option) : ''
          return acc;
        },
        []
      );
      setReviews(temporarySwapHalf(activeReviews));
    }
  }, [location.reviews]);

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#000000",
      }}
    >
      <Content>
        <div
          className="container"
          style={{
            paddingTop: 100,
          }}
        >
          <LocationBanner
            location={location}
            onFavoriteLocation={onFavoriteLocation}
            onUnFavoriteLocation={onUnFavoriteLocation}
            userRole={userRole}
          />
          <Row justify={"center"} gutter={20}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16} style={{ marginTop: 30 }}>
              {location.isActive ? (
                <>
                  <Divider className="review-divider" style={{
                    color: "#fff",
                  }} orientation="left">Active Arrival</Divider>
                  <ArrivalBanner
                    location={location}
                    checkIncount={checkIncount}
                  />
                </>
              ) : (
                ""
              )}
              <PostForm
                location={location}
                getLocationInfo={getLocationInfo}
                expand={expand}
              />
              <div className="avatar-area green-color">
                <Divider className="review-divider" style={{
                  color: "#fff",
                }} orientation="left">Reviews</Divider>
                <div className="avatar-respond">
                  <div className="avatar-form">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <List
                          itemLayout="vertical"
                          size="large"
                          dataSource={reviews}
                          renderItem={(item, index) => (
                            <ReviewBox
                              key={index}
                              router={router}
                              review={item}
                              location={location}
                              user_id={user_id}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ marginTop: 30 }}>
              {expiredArrivals.arrivalData?.length > 0 ? (
                <>
                  <Divider className="review-divider" style={{
                    color: "#fff",
                  }} orientation="left">Expired Arrivals</Divider>
                  <ArrivalBannerExpired
                    location={location}
                    arrivals={expiredArrivals}
                    checkIncount={checkIncount}
                    expand={expand}
                    setExpand={setExpand}
                  />
                </>

              ) : (
                ""
              )}
            </Col>

            {/* <div className="col-xl-12 col-lg-12 col-md-12">

              <PostForm
                location={location}
                getLocationInfo={getLocationInfo}
                expand={expand}
              />
              {expiredArrivals.arrivalData?.length > 0 ? (
                <ArrivalBannerExpired
                  location={location}
                  arrivals={expiredArrivals}
                  checkIncount={checkIncount}
                  expand={expand}
                  setExpand={setExpand}
                />
              ) : (
                ""
              )}
              <div className="avatar-area green-color">
                <Divider className="review-divider" style={{
                  color: "#fff",
                }} orientation="left">Reviews</Divider>
                <div className="avatar-respond">
                  <div className="avatar-form">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <List
                          itemLayout="vertical"
                          size="large"
                          dataSource={reviews}
                          renderItem={(item, index) => (
                            <ReviewBox
                              key={index}
                              router={router}
                              review={item}
                              location={location}
                              user_id={user_id}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  location: state.location.location,
  checkIncount: state.location.checkIncount,
  expiredArrivals: state.location.expiredArrivals,
  userRole: state.user.role,
  user_id: state.user.user_id,
});

const mapDispatchToProp = (dispatch) => {
  return {
    getLocationInfo: (id, cb) => dispatch(getLocationById(id, cb)),
    onFavoriteLocation: (locationId, cb) => dispatch(favoriteLocation(locationId, cb)),
    onUnFavoriteLocation: (locationId, cb) => dispatch(unfavoriteLocation(locationId, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(index);