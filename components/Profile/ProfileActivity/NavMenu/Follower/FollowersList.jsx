import React, { useState } from "react";
import { Avatar, Button, List, Skeleton, Popover, Space, Tag, Modal } from "antd";
import { Card, CardBody, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown, Spinner } from "reactstrap";
import { useRouter } from "next/router";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import Link from "next/link";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";
import binavatar from "@/public/images/landing/avatar.png";
import {
  UserOutlined,
  MessageFilled,
  UserDeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  SyncOutlined
} from "@ant-design/icons";
import classnames from "classnames";
import MessageForm from "../../WelcomeProfile/MessageForm";

const FollwersList = ({
  ongetFollowers,
  initLoading,
  data,
  getHeader,
  loading,
  setLoading,
  count,
  profile,
  setCount,
  search,
  userRole,
  user_id,
  loadStatus,
  LoadMoreRemain,
  total
}) => {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();

  async function unfriend(id) {
    await profileService.onunFriend(id)
      .then(() => {
        setLoading(true);
        notify("success", "Unfriend successfully");
        ongetFollowers(profile, count, search);
        getHeader(profile);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  async function AcceptFollowerRequest(id, type) {
    await profileService.acceptFollowerRequest(id, type)
      .then(() => {
        setLoading(true);
        notify("success", type === "active" ? "Accepted successfully" : 'Declined successfully');
        ongetFollowers(profile, count, search);
        getHeader(profile);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  const onLoadMore = () => {
    setCount(count + 1);
  };

  return (
    <>
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
                    onClick={() => router.push(`/profile/${item?.follower?._id}/activity`)}>
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
      <div className={classnames('text-center', { 'd-none': !initLoading })}>
        <Spinner type="grow" className="ms-2" color="primary" />
        <Spinner type="grow" className="ms-2" color="primary" />
        <Spinner type="grow" className="ms-2" color="primary" />
      </div>
      <div
        className={classnames('text-center', 'mt-4', { 'd-none': total < 10 || data?.length >= total })}
      >
        <Button type="link" onClick={onLoadMore}>
          View More
        </Button>
      </div>
    </>
  );
};

export default FollwersList;
