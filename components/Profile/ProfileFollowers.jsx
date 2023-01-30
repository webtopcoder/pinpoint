import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Input, Layout } from "antd";
import {
  UserOutlined,
  MessageFilled,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getFollowers } from "@/redux/Profile/actions";
import { unFriend } from "@/redux/Profile/actions";
import config from "@/utils/config";
import baseUrl from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import Link from "next/link";

import binavatar from "@/public/images/landing/avatar.png";

const { Search } = Input;
const { Content } = Layout;

const ProfileFollowers = ({
  ongetFollowers,
  followersList,
  user_id,
  onunFriend,
}) => {
  const { notify } = useNotify();

  const avatarurl = `http://${config.server}:${config.port}/avatar/`;

  const router = useRouter();
  const { profile } = router.query;

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log({
      profile,
      user_id,
      followersList,
    });
  }, [followersList]);

  useEffect(() => {
    let mounted;

    if (router.isReady) {
      ongetFollowers(profile, count, search, (res) => {
        if (res.success) {
          mounted || setInitLoading(false);
          setData((data) => [...data, ...res.data.results]);
          mounted || window.dispatchEvent(new Event("resize"));
          mounted = true;
        } else notify("error", "Something went wrong");
      });
    }
  }, [router.isReady, count]);

  const unfriend = (id) => {
    onunFriend(id, (res) => {
      setLoading(true);
      if (res.success) {
        notify("success", "Unfriend successfully");
        ongetFollowers(profile, count, search, (res, error) => {
          if (error) {
            notify("error", "Something went wrong");
          }
          setInitLoading(false);
          setData(res.data.results);
        });
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
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const onSearch = (value) => {
    setSearch(value);

    ongetFollowers(profile, count, value, (res) => {
      if (res.success) {
        setInitLoading(false);
      } else notify("error", res.msg);
    });
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
          margin: "60px 16px",
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
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px 40px",
                    borderRadius: 10,
                  }}
                >
                  <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    loading={initLoading}
                    loadMore={loadMore}
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            onClick={() =>
                              window.open(
                                baseUrl +
                                  "/profile/" +
                                  item.follower._id +
                                  "/activity",
                                "_blank"
                              )
                            }
                            type="primary"
                            icon={<UserOutlined />}
                            size={"default"}
                            key="button-view-profile"
                          >
                            View Profile
                          </Button>,
                          <Button
                            onClick={() =>
                              window.open(
                                baseUrl +
                                  `/partner/message?username=@${item.follower.username}`,
                                "_blank"
                              )
                            }
                            type="primary"
                            icon={<MessageFilled />}
                            size={"default"}
                            key="button-message"
                          >
                            Message
                          </Button>,
                          <Button
                            onClick={() => unfriend(item.follower._id)}
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
                            size={"default"}
                            key="button-unfriend"
                          >
                            UnFriend
                          </Button>,
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
                              <Link
                                href={
                                  "/profile/" + item.follower._id + "/activity"
                                }
                              >
                                <>
                                  {item.follower.name}
                                  <p> @{item.follower.username}</p>
                                </>
                              </Link>
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
        </div>
      </Content>
    </Layout>
  );
};

const mapStateToProps = ({ profile, user }) => {
  return {
    followersList: profile.followersInfo,
    user_id: user.user_id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ongetFollowers: (data, count, search, cb) =>
    dispatch(getFollowers(data, count, search, cb)),
  onunFriend: (id, cb) => dispatch(unFriend(id, cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileFollowers);
