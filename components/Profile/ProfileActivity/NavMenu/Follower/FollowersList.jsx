//optimized
import React from "react";
import { Popover, Space, Tag } from "antd";
import { Row, Col } from "reactstrap";
import { useRouter } from "next/router";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";
import binavatar from "@/public/images/landing/avatar.png";
import { SyncOutlined } from "@ant-design/icons";
import classnames from "classnames";
import MessageForm from "../../WelcomeProfile/MessageForm";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "@/components/Common/Spinner";

const FollwersList = ({
  ongetFollowers,
  data,
  getHeader,
  setLoading,
  count,
  profile,
  setCount,
  search,
  user_id,
  total
}) => {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();

  const unfriend = async (id) => {
    try {
      await profileService.onunFriend(id);
      setLoading(true);
      notify("success", "Unfriend successfully");
      ongetFollowers(profile, count, search);
      getHeader(profile);
    } catch (error) {
      notify("error", error?.response?.data?.message || "Something went wrong");
    }
  };


  const AcceptFollowerRequest = async (id, type) => {
    try {
      await profileService.acceptFollowerRequest(id, type);
      setLoading(true);
      const message =
        type === "active" ? "Accepted successfully" : "Declined successfully";
      notify("success", message);
      ongetFollowers(profile, count, search);
      getHeader(profile);
    } catch (error) {
      notify("error", error?.response?.data?.message || "Something went wrong");
    }
  };

  const onLoadMore = () => {
    setCount(count + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={onLoadMore}
        hasMore={data?.length < total}
        style={{ overflow: 'hidden' }} //To put endMessage and loader to the top.
        loader={<LoadingSpinner />}
      >
        {data?.map((item, index) => (
          <Row className="py-2 border-bottom" key={item?._id}>
            <Col lg="6">
              <div className="d-flex">
                <div className="me-3">
                  <img
                    src={
                      item?.follower?.profile?.avatar?.filepath
                        ? avatarurl +
                        item?.follower?.profile?.avatar?.filepath
                        : binavatar
                    } alt=""
                    className="avatar-md rounded-circle img-thumbnail"
                  />
                </div>
                <div className="flex-grow-1 align-self-center">
                  <div className="text-muted">
                    <a className="mb-1 fs-6 fw-semibold"
                      onClick={() => router.push(`/profile/${item?.follower?._id}`)}>
                      {item?.follower?.name}{'   '}
                      <Tag color="error">{item?.follower?.role}</Tag>
                    </a>
                    <p className="mb-0">@{item?.follower?.username}</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="6" className="align-self-center">
              <div
                className={classnames('mt-lg-0', 'mt-4', { 'text-lg-end ': isWebDevice }, { 'text-lg-left ': !isWebDevice })}
              >
                {user_id == profile && item?.status !== "active" ? (
                  item?.status === "pending" ? (<>
                    <button
                      onClick={() => AcceptFollowerRequest(item?._id, "active")}
                      type="button"
                      className="btn btn-danger font-size-12 me-1"
                    >
                      <i className="bx bx-check align-middle me-1"></i>{" "}Accept
                    </button>
                    <button
                      onClick={() => AcceptFollowerRequest(item?._id, "decline")}
                      type="button"
                      className="btn btn-danger font-size-12 me-1"
                    >
                      <i className="bx bx-x align-middle me-1"></i>{" "}Decline
                    </button>
                  </>
                  )
                    :
                    (<Space direction="horizontal">
                      <Tag icon={<SyncOutlined spin />} color="processing">
                        pending
                      </Tag>
                    </Space>)

                ) : (
                  <>
                    <Popover content={<MessageForm username={item?.follower?.username} />} placement="bottom" trigger="click">
                      <button
                        type="button"
                        className={classnames('btn', 'btn-danger', 'me-1', 'font-size-12', { 'd-none': user_id !== profile })}
                      >
                        <i className="bx bx-message-alt-dots align-middle me-1"></i>{" "}Message
                      </button>
                    </Popover>
                    <button
                      onClick={() => unfriend(item?.follower?._id)}
                      type="button"
                      className={classnames('btn', 'btn-danger', 'me-1', 'font-size-12', { 'd-none': user_id !== profile })}
                    >
                      <i className="bx bx-message-alt-dots align-middle me-1"></i>{" "}Unfriend
                    </button>
                  </>
                )
                }
                {item?.status === "requesting" || item?.status === "pending" ?
                  <button
                    onClick={() => router.push(`/profile/${item?.follower?._id}/activity`)}
                    type="button"
                    className="btn btn-danger font-size-12 me-1"
                  >
                    <i className="bx bx-user align-middle me-1"></i>{" "}View Profile
                  </button> : ''}
              </div>
            </Col>
          </Row>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default FollwersList;
