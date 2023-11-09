import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Space, Tag, Badge } from "antd";
import {
  UserOutlined,
  MessageFilled,
  UserDeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  SyncOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { Card, CardBody, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown, Spinner } from "reactstrap";
import { useRouter } from "next/router";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import Link from "next/link";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";
import binavatar from "@/public/images/landing/avatar.png";
import classnames from "classnames";

const AllList = ({
  ongetAllMemebers,
  getHeader,
  data,
  initLoading,
  loading,
  profile,
  search,
  userRole,
  setCount,
  count,
  loadStatus,
  LoadMoreRemain,
  total
}) => {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const avatarurl = `${apiBaseUrl}/avatar/`;
  const router = useRouter();

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

  return (
    <>
      {data?.map((item, index) => (
        <Row className="py-2" key={item?._id}>
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
                    onClick={() => router.push(`/profile/${item?._id}/activity`)}>
                    {item?.name}{'   '}
                    <Tag color="#108ee9">{item?.role}</Tag>
                  </a>
                  <p className="mb-0">@{item?.username}</p>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6" className="align-self-center">
            <div
              className={classnames('mt-lg-0', 'mt-4', { 'text-lg-end ': isWebDevice }, { 'text-lg-center ': !isWebDevice })}
            >
              <button
                onClick={async () => {
                  if (!userRole) {
                    notify(
                      "error",
                      "Please login"
                    );
                    return;
                  }
                  await profileService.postFollower(item?.id)
                    .then(async (res) => {
                      notify(res.data.type, res?.data?.message);
                      await getHeader();
                      await ongetAllMemebers(profile, count, search);
                    })
                    .catch((error) => {
                      notify(
                        "error",
                        error?.response?.data?.message || "Something went wrong"
                      );
                      return;
                    });
                }}
                type="button"
                className="btn btn-success font-size-12 me-1"
              >
                <i className="bx bx-user-plus align-middle me-1"></i>{" "}Follow
              </button>
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

export default AllList;
