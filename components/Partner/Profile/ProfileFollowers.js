import React, { useEffect, useState, useCallback } from "react";
import { Avatar, Button, List, Skeleton, Input, Mentions, Layout } from "antd";
import {
  UserOutlined,
  MessageFilled,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { getmyFollowers } from "@/redux/User/actions";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getFollowers } from "@/redux/Profile/actions";
import { unFriend } from "@/redux/Profile/actions";
import toast from "@/components/Toast";
import config from "@/utils/config";
import baseUrl from "@/utils/baseUrl";

const { Search } = Input;
const { Content } = Layout;

const ProfileFollowers = ({
  ongetmyFollowers,
  ongetFollowers,
  followersList,
  onunFriend,
}) => {
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const imgurl = `http://${config.server}:${config.port}/avatar/`;

  const dismiss = useCallback(() => {
    toast.dismiss();
  }, []);

  let user_id = "";
  if (typeof window !== "undefined") {
    user_id = sessionStorage.getItem("user_id");
  }
  const router = useRouter();

  const { profile } = router.query;

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const { profile } = router.query;
      ongetmyFollowers();
      ongetFollowers(profile, 1, search, (res) => {
        if (res.success) {
          setInitLoading(false);
          setData(res.followers);
          setList(res.followers);
        } else notify("error", res.msg);
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(10)].map(() => ({
          loading: true,
          follower: {},
        }))
      )
    );
    const { profile } = router.query;

    ongetFollowers(profile, count, search, (res) => {
      if (res.success) {
        const newData = data.concat(res.followers);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event("resize"));
      } else notify("error", res.msg);
    });
  }, [count]);

  const unfriend = (id) => {
    onunFriend(id, (res) => {
      notify("success", res.msg);
      setLoading(true);
      if (res.success) {
        const { profile } = router.query;
        ongetFollowers(profile, 1, search, (res) => {
          if (res.success) {
            setInitLoading(false);
            setData(res.followers);
            setList(res.followers);
          } else notify("error", res.msg);
        });
      } else notify("error", res.msg);
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
    const { profile } = router.query;

    ongetFollowers(profile, count, value, (res) => {
      if (res.success) {
        setInitLoading(false);
        setData(res.followers);
        setList(res.followers);
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
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={(item) => {
                      <List.Item
                        actions={[
                          <Button
                            onClick={() =>
                              window.open(
                                baseUrl +
                                  "/user/" +
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
                                  `/mail/inbox?email=@${item.follower.username}`,
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
                            onClick={() => unfriend(item._id)}
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
                        <Skeleton
                          avatar
                          title={false}
                          loading={item.loading}
                          active
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                style={{
                                  width: 70,
                                  height: 70,
                                }}
                                src={imgurl + item.follower.avatar}
                              />
                            }
                            title={
                              <a href="https://ant.design">
                                {item.follower.name}
                                <p> @{item.follower.username}</p>
                              </a>
                            }
                            description={new Date(
                              item.createdAt
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
                      </List.Item>;
                    }}
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
    myfollowerList: user.myFollowers.followers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ongetFollowers: (data, count, search, cb) =>
    dispatch(getFollowers(data, count, search, cb)),
  onunFriend: (id, cb) => dispatch(unFriend(id, cb)),
  ongetmyFollowers: () => dispatch(getmyFollowers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileFollowers);
