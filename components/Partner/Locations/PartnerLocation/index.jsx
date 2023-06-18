import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Layout, List, Divider, Col } from "antd";
import useNotify from "@/hooks/useNotify";
import { useRouter } from "next/router";
import ArrivalBanner from "./ArrivalBanner";
import ReviewBox from "./ReviewBox";
import LocationBanner from "./LocationBanner";
import PostForm from "./PostForm";
import ArrivalBannerExpired from "./ArrivalBannerExpired";
import { locationService } from "@/services/index";

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
  userRole,
  user_id
}) => {

  const router = useRouter();
  const { notify } = useNotify();
  const [reviews, setReviews] = useState([]);
  const [expand, setExpand] = useState(false);
  const [location, setLocationInfo] = useState();

  async function initialize() {
    const locationId = router.query.location;
    locationService.getLocationInfo({ id: locationId, expand: expand })
      .then((res) => {
        console.log(res)
        setLocationInfo(res)
        if (res.location.reviews) {
          const activeReviews = res.location.reviews.reduce(
            (acc, option, index) => {
              option.status === "active" ? acc.push(option) : ''
              return acc;
            },
            []
          );
          setReviews(temporarySwapHalf(activeReviews));
        }
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
    if (router.isReady) {
      initialize();
    }
  }, [router.isReady, expand]);

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
            setLocationInfo={setLocationInfo}
            location={location}
            userRole={userRole}
          />
          <Row justify={"center"} gutter={20}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16} style={{ marginTop: 30 }}>
              {location?.location?.isActive ? (
                <>
                  <Divider className="review-divider" style={{
                    color: "#fff",
                  }} orientation="left">Active Arrival</Divider>
                  <ArrivalBanner location={location} />
                </>
              ) : (
                ""
              )}
              <PostForm
                location={location}
                initialize={initialize}
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
                              router={router}
                              review={item}
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
              {location?.expiredArrival?.arrivalData?.length > 0 ? (
                <>
                  <Divider className="review-divider" style={{
                    color: "#fff",
                  }} orientation="left">Previous Arrivals</Divider>
                  <ArrivalBannerExpired
                    location={location}
                    arrivals={location?.expiredArrival}
                    expand={expand}
                    setExpand={setExpand}
                  />
                </>

              ) : (
                ""
              )}
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  userRole: state.user.role,
  user_id: state.user.user_id,
});


export default connect(mapStateToProps)(index);