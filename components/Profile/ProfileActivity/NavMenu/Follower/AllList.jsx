//optimized
import React from "react";
import { Tag, Divider } from "antd";
import { Row, Col } from "reactstrap";
import { useRouter } from "next/router";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";
import binavatar from "@/public/images/landing/avatar.png";
import classnames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "@/components/Common/Spinner";

const AllList = ({
  ongetAllMemebers,
  getHeader,
  data,
  profile,
  search,
  userRole,
  setCount,
  count,
  total
}) => {

  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();

  const onLoadMore = () => {
    setCount(count + 1);
  };

  const handleFollow = async (userId) => {
    try {
      if (!userRole) {
        notify("error", "Please login");
        return;
      }

      const res = await profileService.postFollower(userId);
      notify(res.data.type, res?.data?.message);
      await getHeader();
      await ongetAllMemebers(profile, count, search);
    } catch (error) {
      notify(
        "error",
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={onLoadMore}
        hasMore={data?.length < total}
        style={{ overflow: 'hidden' }} //To put endMessage and loader to the top.
        loader={<LoadingSpinner />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      >
        {data?.map((item, index) => (
          <Row className="py-2 border-bottom" key={item?._id}>
            <Col lg="6">
              <div className="d-flex">
                <div className="me-3">
                  <img
                    src={
                      item?.profile?.avatar?.filepath
                        ? avatarurl +
                        item?.profile?.avatar?.filepath
                        : binavatar
                    } alt=""
                    className="avatar-md rounded-circle img-thumbnail"
                  />
                </div>
                <div className="flex-grow-1 align-self-center">
                  <div className="text-muted">
                    <a className="mb-1 fs-6 fw-semibold"
                      onClick={() => router.push(`/profile/${item?._id}`)}>
                      {item?.name}{'   '}
                      <Tag color="error">{item?.role}</Tag>
                    </a>
                    <p className="mb-0">@{item?.username}</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="6" className="align-self-center">
              <div
                className={classnames('mt-lg-0', 'mt-4', { 'text-lg-end ': isWebDevice }, { 'text-lg-end ': !isWebDevice })}
              >
                <button
                  onClick={() => handleFollow(item?.id)}
                  type="button"
                  className="btn btn-danger font-size-12 me-1"
                >
                  <i className="bx bx-user-plus align-middle me-1"></i>{" "}Follow
                </button>
              </div>
            </Col>
          </Row>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default AllList;
