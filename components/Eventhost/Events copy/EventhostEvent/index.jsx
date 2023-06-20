import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Layout, List, Divider, Col } from "antd";
import useNotify from "@/hooks/useNotify";
import { useRouter } from "next/router";
import ArrivalBanner from "./ArrivalBanner";
import ReviewBox from "./ReviewBox";
import EventBanner from "./EventBanner";
import PostForm from "./PostForm";
import ArrivalBannerExpired from "./ArrivalBannerExpired";
import { eventService } from "@/services/index";

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
  const [event, setEventInfo] = useState();

  async function initialize() {
    const eventId = router.query.event;
    eventService.getEventInfo({ id: eventId, expand: expand })
      .then((res) => {
        console.log(res)
        setEventInfo(res);
        if (res.event.reviews) {
          const activeReviews = res.event.reviews.reduce(
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
          <EventBanner
            setEventInfo={setEventInfo}
            event={event}
            userRole={userRole}
          />
          <Row justify={"center"} gutter={20}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16} style={{ marginTop: 30 }}>
              {event?.event?.isActive ? (
                <>
                  <Divider className="review-divider" style={{
                    color: "#fff",
                  }} orientation="left">Active Arrival</Divider>
                  <ArrivalBanner event={event} />
                </>
              ) : (
                ""
              )}
              <PostForm
                event={event}
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
              {event?.expiredArrival?.arrivalData?.length > 0 ? (
                <>
                  <Divider className="review-divider" style={{
                    color: "#fff",
                  }} orientation="left">Previous Arrivals</Divider>
                  <ArrivalBannerExpired
                    event={event}
                    arrivals={event?.expiredArrival}
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