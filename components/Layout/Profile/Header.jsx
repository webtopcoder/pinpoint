import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  MessageOutlined,
  UserDeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { getHeader, unfollow } from "@/redux/Profile/actions";
import { postFollower } from "@/redux/Profile/actions";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { apiBaseUrl } from "@/utils/baseUrl";
import { Avatar, Card, Space, Typography, Button, Row, Col } from "antd";
const { Meta } = Card;
const { Title } = Typography;

const Header = ({
  ongetHeader,
  headerInfo,
  onpostFollower,
  ondeleteFollower,
  user_id,
  userRole,
}) => {

  const avatarurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();
  const { notify } = useNotify();
  const [loading, setLoading] = useState(true);

  const view_user_id = router.query.profile;

  const own_page = user_id === view_user_id;

  const follow = () => {
    onpostFollower(view_user_id, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
      } else {
        notify(res.data.type, res.data.message);
        ongetHeader(view_user_id);
      }
    });
  };

  const unfollow = () => {
    ondeleteFollower(view_user_id, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
      } else {
        notify("success", "Unfollowed");
        ongetHeader(view_user_id);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    if (router.isReady) {
      const { profile } = router.query;
      ongetHeader(profile).then(() => {
        setLoading(false);
      });
    }
  }, [view_user_id]);

  return (
    <div className="container">
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        style={{
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Col
          className="gutter-row"
          span={12}
          xs={24}
          sm={4}
          md={12}
          lg={12}
          xl={12}
        >
          <Card
            style={{
              marginTop: 16,
              border: "0px",
            }}
            bodyStyle={{
              background: "#f8fbff",
            }}
            loading={loading}
          >
            <Meta
              avatar={
                headerInfo?.profile?.avatar ? (
                  <Avatar
                    size={120}
                    src={avatarurl + "/" + headerInfo?.profile?.avatar.filepath}
                  />
                ) : (
                  <Avatar size={120} icon={<UserOutlined />} />
                )
              }
              title={<Title level={3}>{headerInfo?.profile?.fullname}</Title>}
              description={
                <Space direction="vertical" size="middle">
                  <Title level={5}>@{headerInfo?.profile?.username}</Title>

                  {!own_page && (
                    <>
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{
                          display: "flex",
                        }}
                      >
                        <Button
                          style={{
                            width: 150,
                          }}
                          type="primary"
                          onClick={() =>
                            userRole && headerInfo?.profile?.is_follow
                              ? router.push(`/${userRole}/message?user=${view_user_id}`)
                              : notify("error", "Please send follow request firstly")
                          }
                          icon={<MessageOutlined />}
                          size="large"
                        >
                          Message
                        </Button>
                        <Button
                          style={{
                            width: 150,
                          }}
                          type="primary"
                          onClick={
                            headerInfo?.profile?.is_follow ? unfollow : follow
                          }
                          icon={
                            headerInfo?.profile?.is_follow ? (
                              <UserDeleteOutlined />
                            ) : (
                              <UserAddOutlined />
                            )
                          }
                          size="large"
                        >
                          {headerInfo?.profile?.is_follow
                            ? "Unfollow"
                            : "Follow"}
                        </Button>
                      </Space>
                    </>
                  )}
                </Space>
              }
            />
          </Card>
        </Col>
        <Col
          className="gutter-row header-card"
          span={12}
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{
            marginTop: 20,
          }}
        >
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            {headerInfo?.profile?.usertype == "partner" && (
              <>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{
                  paddingBottom: 4
                }}>
                  <Card
                    title="Rating"
                    bordered={false}
                    style={{
                      textAlign: "center",
                      background: "black",
                      color: "white",
                    }}
                    headStyle={{
                      color: "white",
                    }}
                    bodyStyle={{
                      fontSize: 40,
                      color: "white",
                    }}
                  >
                    {headerInfo && (
                      <b className="fn">{headerInfo?.profile?.rating === "NaN" ? 0 : headerInfo?.profile?.rating}</b>
                    )}
                  </Card>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Card
                    title="Locations"
                    bordered={false}
                    style={{
                      textAlign: "center",
                      background: "black",
                      color: "white",
                    }}
                    headStyle={{
                      color: "white",
                    }}
                    bodyStyle={{
                      fontSize: 40,
                    }}
                  >
                    {headerInfo && (
                      <b className="fn">{headerInfo?.profile?.location}</b>
                    )}
                  </Card>
                </Col>
              </>
            )}
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card
                title="Likes"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "black",
                  color: "white",
                }}
                headStyle={{
                  color: "white",
                }}
                bodyStyle={{
                  fontSize: 40,
                }}
              >
                {headerInfo && (
                  <b className="fn">{headerInfo?.profile?.favorites}</b>
                )}
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card
                title="Followers"
                bordered={false}
                style={{
                  textAlign: "center",
                  background: "black",
                  color: "white",
                }}
                headStyle={{
                  color: "white",
                }}
                bodyStyle={{
                  fontSize: 40,
                }}
              >
                {headerInfo && (
                  <b className="fn">{headerInfo?.profile?.followers}</b>
                )}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div >
  );
};

const mapStateToProps = ({ profile, user }) => {
  return {
    headerInfo: profile.headerInfo,
    user_id: user.user_id,
    userRole: user.role,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ongetHeader: (data) => dispatch(getHeader(data)),
  onpostFollower: (id, cb) => dispatch(postFollower(id, cb)),
  ondeleteFollower: (id, cb) => dispatch(unfollow(id, cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
