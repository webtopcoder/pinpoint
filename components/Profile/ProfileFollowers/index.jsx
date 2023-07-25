import React, { useEffect, useState } from "react";
import { Input, Layout, Space, Select } from "antd";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { profileService } from "@/services/index";
import FollwersList from "./FollowersList";
import AllList from "./AllList";

const { Search } = Input;
const { Content } = Layout;
const { Option } = Select;

const index = ({
  user_id,
  userRole,
  getHeader
}) => {
  const { notify } = useNotify();
  const router = useRouter();
  const { profile } = router.query;
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [memeberCount, setMemeberCount] = useState(1);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("friend");
  const [data, setData] = useState([]);
  const [members, setMembers] = useState([]);
  const [LoadMoreFollowerStatus, setLoadMoreFollower] = useState(false);
  const [LoadMoreAllStatus, setLoadMoreAll] = useState(false);
  const [LoadMoreFollowerRemain, setLoadMoreFollowerRemain] = useState();
  const [LoadMoreAllRemain, setLoadMoreAllRemain] = useState();

  async function ongetFollowers(profile, count, search) {
    let mounted;
    setInitLoading(true);
    await profileService.getmyFollowers(profile, count, search)
      .then((res) => {
        if (res.success) {
          res?.data?.results?.length === 0 ? setLoadMoreFollower(true) : ''
          if (count === 1) {
            setInitLoading(false);
            setLoading(false);
            setData(res.data.results);
            setLoadMoreFollowerRemain(res?.data?.totalResults - res?.data?.results?.length)
          }
          else {
            mounted || setInitLoading(false);
            setData((data) => [...data, ...res.data.results]);
            mounted || window.dispatchEvent(new Event("resize"));
            mounted = true;
            setLoadMoreFollowerRemain(res?.data?.totalResults - data?.length)
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

  async function ongetAllMemebers(user_id, page, search) {
    let mounted;
    setInitLoading(true);
    await profileService.getAllMemebers(user_id, page, search)
      .then(async (res) => {
        if (res.success) {
          res?.data?.results?.length === 0 ? setLoadMoreAll(true) : ''
          if (memeberCount === 1) {
            setInitLoading(false);
            setMembers(res?.data?.results);
            setLoadMoreAllRemain(res?.data?.totalResults - res?.data?.results?.length)
          }
          else {
            mounted || setInitLoading(false);
            setMembers((data) => [...data, ...res.data.results]);
            mounted || window.dispatchEvent(new Event("resize"));
            mounted = true;
            setLoadMoreAllRemain(res?.data?.totalResults - members?.length)
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
  }, [router.isReady, count, searchType]);

  useEffect(() => {
    if (router.isReady) {
      setInitLoading(true);
      ongetAllMemebers(profile, memeberCount, search);
    }
  }, [router.isReady, memeberCount, searchType]);

  const onSearch = (value) => {
    setInitLoading(true);
    setSearch(value);
    searchType === "friend" ?
      ongetFollowers(profile, count, value) :
      ongetAllMemebers(profile, memeberCount, value);
  };

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#000000",
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
              <div className="col-xl-7 col-lg-7 col-md-12">

              </div>
              <div className="follower-list col-xl-5 col-lg-5 col-md-12">
                <div className="widget-area">
                  <div className="widget widget_search">
                    <Space.Compact block size="large">
                      <Select defaultValue={searchType} onChange={(e) => {
                        setSearchType(e);
                      }}>
                        <Option value="friend">Friends</Option>
                        <Option value="all">All</Option>
                      </Select>
                      <Search
                        placeholder="input search user name"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                      />
                    </Space.Compact>
                  </div>
                </div>
              </div>
              <div className="follower-list col-xl-12 col-lg-12 col-md-12">
                <div className="main-follower-list">
                  {searchType === "friend" ?
                    <FollwersList
                      ongetFollowers={ongetFollowers}
                      initLoading={initLoading}
                      data={data}
                      loading={loading}
                      setLoading={setLoading}
                      getHeader={getHeader}
                      count={count}
                      search={search}
                      setCount={setCount}
                      loadStatus={LoadMoreFollowerStatus}
                      profile={profile}
                      userRole={userRole}
                      user_id={user_id}
                      LoadMoreRemain={LoadMoreFollowerRemain}
                    /> :
                    <AllList
                      ongetAllMemebers={ongetAllMemebers}
                      initLoading={initLoading}
                      data={members}
                      loading={loading}
                      setLoading={setLoading}
                      getHeader={getHeader}
                      count={memeberCount}
                      search={search}
                      loadStatus={LoadMoreAllStatus}
                      setCount={setMemeberCount}
                      profile={profile}
                      userRole={userRole}
                      user_id={user_id}
                      LoadMoreRemain={LoadMoreAllRemain}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div >
      </Content >
    </Layout >
  );
};

export default index;
