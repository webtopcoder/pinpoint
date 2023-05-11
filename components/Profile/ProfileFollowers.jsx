import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Input, Layout, Space, Tag } from "antd";
import {
  UserOutlined,
  MessageFilled,
  UserDeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  SyncOutlined
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getHeader, unFriend, acceptFollowerRequest } from "@/redux/Profile/actions";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import Link from "next/link";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";
import binavatar from "@/public/images/landing/avatar.png";

const { Search } = Input;
const { Content } = Layout;

const ProfileFollowers = ({
  user_id,
  onunFriend,
  ongetHeader,
  userRole,
  onacceptFollowerRequest
}) => {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();
  const { profile } = router.query;
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  async function ongetFollowers(profile, count, search) {
    let mounted;
    await profileService.getmyFollowers(profile, count, search)
      .then((res) => {
        if (res.success) {
          if (count === 1) {
            setInitLoading(false);
            setLoading(false);
            setData(res.data.results);
          }
          else {
            mounted || setInitLoading(false);
            setData((data) => [...data, ...res.data.results]);
            mounted || window.dispatchEvent(new Event("resize"));
            mounted = true;
          }

        } else notify("error", "Something went wrong");
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
      setInitLoading(true);
      ongetFollowers(profile, count, search);
    }
  }, [router.isReady, count]);

  const unfriend = (id) => {
    onunFriend(id, (_, error) => {
      setLoading(true);
      if (!error) {
        notify("success", "Unfriend successfully");
        ongetFollowers(profile, count, search);
        ongetHeader(profile);
      }
    });
  };

  const onLoadMore = () => {
    setCount(count + 1);
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>Load More</Button>
      </div>
    ) : null;

  const onSearch = (value) => {
    setInitLoading(true);
    setSearch(value);
    ongetFollowers(profile, count, value);
  };

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content
        style={{
          margin: "0px 16px",
        }}
      >
        <div className="blog-details-area">
          <div className="container">
            <br />
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-8 col-md-12"></div>
              <div className="follower-list col-xl-4 col-lg-4 col-md-12">
                <div className="widget-area">
                  <div className="widget widget_search">
                    <Search
                      placeholder="input search user name"
                      allowClear
                      enterButton="Search"
                      size="large"
                      onSearch={onSearch}
                    />
                  </div>
                </div>
              </div>
              <div className="follower-list col-xl-12 col-lg-12 col-md-12">
                <div className="main-follower-list">
                  <List
                    grid={isWebDevice ? false : {
                      column: 1,
                      xs: 1,
                      sm: 2,
                    }}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    loading={initLoading}
                    loadMore={loadMore}
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          item?.status !== "requesting" ? (<Button
                            onClick={() => router.push(`/profile/${item?.follower?._id}/activity`)}
                            type="primary"
                            icon={<UserOutlined />}
                            size={isWebDevice ? "default" : "small"}
                            key="button-view-profile"
                          >
                            {isWebDevice ? "View Profile" : "View"}
                          </Button>) : '',
                          userRole ? (
                            user_id !== profile ? (
                              ""
                            ) : item?.status !== "active" ? (
                              item?.status === "pending" ? (<Space direction="horizontal">
                                <Button
                                  onClick={() => {
                                    onacceptFollowerRequest(item?._id, "active", (_, error) => {
                                      setLoading(true);
                                      if (!error) {
                                        notify("success", "Accepted successfully");
                                        ongetFollowers(profile, count, search, (res, error) => {
                                          if (error) {
                                            notify("error", "Something went wrong");
                                          }
                                          setInitLoading(false);
                                          setLoading(false);
                                          setData(res.data.results);
                                        });
                                        ongetHeader(profile);
                                      }
                                    });
                                  }
                                  }
                                  type="primary"
                                  icon={<CheckOutlined />}
                                  size={isWebDevice ? "default" : "small"}
                                  key="button-message"
                                >
                                  Accept
                                </Button>
                                <Button
                                  onClick={() => {
                                    onacceptFollowerRequest(item?._id, "decline", (_, error) => {
                                      setLoading(true);
                                      if (!error) {
                                        notify("success", "Declined successfully");
                                        ongetFollowers(profile, count, search);
                                        ongetHeader(profile);
                                      }
                                    });
                                  }}
                                  style={
                                    user_id == profile
                                      ? {
                                        display: "block",
                                      }
                                      : {
                                        display: "none",
                                      }
                                  }
                                  danger
                                  type="primary"
                                  icon={<CloseOutlined />}
                                  size={isWebDevice ? "default" : "small"}
                                  key="button-unfriend"
                                >
                                  Decline
                                </Button>
                              </Space>)
                                :
                                (<Space direction="horizontal">
                                  <Tag icon={<SyncOutlined spin />} color="processing">
                                    pending
                                  </Tag>
                                </Space>)

                            ) : (
                              <Space direction="horizontal">
                                <Button
                                  onClick={() => router.push(`/${userRole}/message?user=${item?.follower?._id}`)}
                                  type="primary"
                                  icon={<MessageFilled />}
                                  size={isWebDevice ? "default" : "small"}
                                  key="button-message"
                                >
                                  Message
                                </Button>
                                <Button
                                  onClick={() => unfriend(item?.follower?._id)}
                                  style={
                                    user_id == profile
                                      ? {
                                        display: "block",
                                      }
                                      : {
                                        display: "none",
                                      }
                                  }
                                  danger
                                  type="primary"
                                  icon={<UserDeleteOutlined />}
                                  size={isWebDevice ? "default" : "small"}
                                  key="button-unfriend"
                                >
                                  {isWebDevice ? "UnFriend" : "Cancel"}
                                </Button>
                              </Space>
                            )
                          ) : (
                            <Space direction="horizontal">
                              <Button
                                onClick={() => router.push(`/${userRole}/message?user=${item?.follower?.id}`)}
                                type="primary"
                                icon={<MessageFilled />}
                                size={isWebDevice ? "default" : "small"}
                                key="button-message"
                              >
                                Accept
                              </Button>
                              <Button
                                onClick={() => unfriend(item?.follower?._id)}
                                style={
                                  user_id == profile
                                    ? {
                                      display: "block",
                                    }
                                    : {
                                      display: "none",
                                    }
                                }
                                danger
                                type="primary"
                                icon={<UserDeleteOutlined />}
                                size={isWebDevice ? "default" : "small"}
                                key="button-unfriend"
                              >
                                Decline
                              </Button>
                            </Space>
                          ),
                        ]}
                      >
                        <Skeleton avatar title={false} loading={loading} active>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                style={{
                                  width: 70,
                                  height: 70,
                                }}
                                src={
                                  item?.follower?.profile?.avatar?.filepath
                                    ? avatarurl +
                                    item?.follower?.profile?.avatar?.filepath
                                    : binavatar
                                }
                              />
                            }
                            title={
                              <Space size={0} direction={isWebDevice ? "vertical" : 'horizontal'}>
                                <Link href={"/profile/" + item?.follower?._id + "/activity"}>
                                  {item?.follower?.name}

                                </Link>
                                <p> @{item?.follower?.username}</p>
                              </Space>
                            }
                            description={new Date(
                              item.updatedAt
                            ).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              hour12: true,
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          />
                        </Skeleton>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div >
      </Content >
    </Layout >
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
    userRole: user.role,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onunFriend: (id, cb) => dispatch(unFriend(id, cb)),
  onacceptFollowerRequest: (id, type, cb) => dispatch(acceptFollowerRequest(id, type, cb)),
  ongetHeader: (id) => dispatch(getHeader(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileFollowers);
