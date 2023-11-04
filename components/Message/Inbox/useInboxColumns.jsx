import useNotify from "@/hooks/useNotify";
import {
  DeleteFilled,
  FolderFilled,
  FolderOpenFilled,
  QuestionCircleOutlined
} from "@ant-design/icons";
import { Space, Tag, Popconfirm, Popover } from "antd";
import React from "react";
import useMedia from "@/hooks/useMedia";
import classnames from "classnames";
import { formatDateNoti } from "@/utils/date";
import { apiBaseUrl } from "@/utils/baseUrl";
import { Row, Col } from "reactstrap";
import { useRouter } from "next/router";

const avatarurl = `${apiBaseUrl}/avatar/`;

const useInboxColumns = ({ user_id, onDeleteMail, getInbox, ongetIsReadEmails, markAsReadOrStar }) => {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const router = useRouter();
  const deleteMail = (mailId) => {
    onDeleteMail(mailId, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
        return;
      }
      notify("success", res.message);
      ongetIsReadEmails();
      getInbox(
        {
          pagination: {
            current: 1,
            pageSize: 10,
          },
        },
        () => { }
      );
    });
  };

  const Devicecolumns = [
    {
      title: "",
      align: "left",
      render: (_, record) => {
        const isUnread = !record?.is_read;
        const isUserAdmin = record?.from?.role === "admin";
        const isCurrentUser = record?.from?._id === user_id;
        const shortenText = (text, maxLength) => {
          return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
        };
        const truncatedUsername = (username) =>
          username?.length > 18 ? (isWebDevice ? username : `${username?.substring(0, 18)}...`) : username;
        const nameToShow = isCurrentUser
          ? truncatedUsername(record?.to?.username)
          : truncatedUsername(record?.from?.username);
        const isUnreadReply = record?.replies?.some((item) => !item?.is_read && item?.to === user_id);
        const isMyReply = record?.replies?.reduce((latestReply, item) => {
          if (item?.to === user_id && item?.createdAt) {
            if (!latestReply || item.createdAt > latestReply.createdAt) {
              return item;
            }
          }
          return latestReply;
        }, null);
        const toggleStar = () => {
          markAsReadOrStar(record._id, 'is_star', !record.is_star);
        };

        return (
          <>
            <div className={classnames('thread-info', { unread: isUnread || isUnreadReply })}>
              {isUserAdmin ? (
                <span>Administrator</span>
              ) : (
                <p>
                  <i className="bx bx-user" style={{
                    fontSize: 20
                  }}
                  ></i> &nbsp;
                  {isCurrentUser && record?.reply && <>me, </>}
                  <Popover placement="bottom" trigger="click" content={
                    <a onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/profile/${record?.to?._id}/activity`)
                    }} className="text-reset notification-item">
                      <div className="d-flex">
                        <img
                          src={avatarurl + record?.to?.profile?.avatar?.filepath}
                          className="me-3 rounded-circle avatar-lg"
                          alt="user-pic"
                        />
                        <div className="flex-grow-1">
                          <Row className="align-items-center">
                            <Col>
                              <h6 className="m-0">{record?.to?.name} </h6>
                            </Col>
                            {/* <div className="col-auto">
                            <a onClick={MarkNotifications} className="small">
                              {" "}
                              Mark
                            </a>
                          </div> */}
                          </Row>
                          <div className="font-size-12 text-muted">
                            <p className="mb-1">
                              @{record?.to?.username}
                            </p>
                            <p className="mb-0">
                              <Tag color="#55acee">
                                {record?.to?.role}
                              </Tag>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  }>
                    <a className="hover-profile" onClick={(e) => {
                      e.stopPropagation();
                    }}>@{nameToShow}</a>
                  </Popover>
                  {!isCurrentUser && record?.reply ? ', me' : ''}
                  {record?.repliesCount > 0 && ` (${record?.repliesCount})`}
                </p>
              )}
            </div>

            <div className={classnames('thread-info', { unread: isUnread || isUnreadReply })}>
              {isMyReply ?
                <p>
                  <i className="bx bx-envelope" style={{
                    fontSize: 20
                  }}></i> &nbsp;
                  Re:&nbsp;&nbsp;
                  {shortenText(record.subject, 15)}
                  {" - "}
                  {shortenText(isMyReply.message, 25)}
                </p> :
                <p>
                  <i className="bx bx-envelope" style={{
                    fontSize: 20
                  }}></i> &nbsp;
                  {shortenText(record.subject, 15)}
                  {" - "}
                  {shortenText(record.message, 25)}
                </p>}
            </div>
            <div className={classnames('thread-info', { unread: !record?.is_read })}>
              <p>
                <i className="bx bx-time" style={{
                  fontSize: 20
                }}></i> &nbsp;
                {formatDateNoti(record?.createdAt)}
              </p>
            </div>
            <Space style={{ marginTop: 10 }} size={isWebDevice ? 5 : "small"}>
              {/* {record.is_star ? (
                <i
                  className="bx bxs-star"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar();
                  }}
                  style={{ fontSize: 20 }}
                ></i>
              ) : (
                <i
                  className="bx bx-star"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar();
                  }}
                  style={{ fontSize: 20 }}
                ></i>
              )} */}
              &nbsp;
              <button
                type="button"
                className="btn btn-primary "
                style={{ fontSize: 'smaller' }}
                onClick={(e) => {
                  e.stopPropagation();
                  markAsReadOrStar(record._id, 'is_read', !record.is_read)
                }}
              >
                {!record.is_read ? <i className="bx bxs-folder font-size-14 align-middle me-2"></i> : <i className="bx bxs-folder-open font-size-14 align-middle me-2"></i>}
                {!record.is_read ? "Read" : 'Unread'}
              </button>
              <Popconfirm
                title="Delete the mail"
                description="Are you sure to delete this mail?"
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: 'red',
                    }}
                  />
                }
                onConfirm={(e) => {
                  e.stopPropagation();
                  deleteMail(record._id)
                }}
                onCancel={(e) => {
                  e.stopPropagation();
                }}
              >
                <button
                  type="button"
                  className="btn btn-danger "
                  style={{ fontSize: 'smaller' }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <i className="bx bx-trash-alt font-size-14 align-middle me-2"></i>{" "}
                  Delete
                </button>
              </Popconfirm>
            </Space>
          </>
        );
      },
      responsive: isWebDevice ? false : ["xs"],
    },

  ];

  const columns = [
    {
      title: "",
      align: "left",
      width: isWebDevice ? "25%" : '80%',
      sorter: true,
      render: (_, record) => {
        const isUnread = !record?.is_read;
        const isUserAdmin = record?.from?.role === "admin";
        const isCurrentUser = record?.from?._id === user_id;

        const truncatedUsername = (username) => {
          return username?.length > 12 ? (isWebDevice ? username : `${username?.substring(0, 12)}...`) : username;
        };

        const nameToShow = isCurrentUser
          ? truncatedUsername(record?.to?.username)
          : truncatedUsername(record?.from?.username);

        const roleToShow = isCurrentUser
          ? truncatedUsername(record?.to?.role)
          : truncatedUsername(record?.from?.role);

        const fullnameToShow = isCurrentUser
          ? record?.to?.name
          : record?.from?.name;
        const avatarToShow = isCurrentUser
          ? record?.from?.profile?.avatar?.filepath
          : record?.to?.profile?.avatar?.filepath;

        const isUnreadReply = record?.replies?.some((item) => !item?.is_read && item?.to === user_id);
        const toggleStar = () => {
          markAsReadOrStar(record._id, 'is_star', !record.is_star);
        };

        return (
          <div className={classnames('thread-info', { unread: isUnread || isUnreadReply })}>
            {isUserAdmin ? (
              <span>Administrator</span>
            ) : (
              <p>
                {/* {record.is_star ? (
                  <i
                    className="bx bxs-star"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar();
                    }}
                    style={{ fontSize: 20 }}
                  ></i>
                ) : (
                  <i
                    className="bx bx-star"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar();
                    }}
                    style={{ fontSize: 20 }}
                  ></i>
                )} */}
                &nbsp;
                {isCurrentUser && record?.reply && <>me, </>}
                <Popover placement="bottom" content={
                  <a onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/profile/${isCurrentUser ? record?.to?._id : record?.from?._id}/activity`)
                  }} className="text-reset notification-item">
                    <div className="d-flex">
                      <img
                        src={avatarurl + avatarToShow}
                        className="me-3 rounded-circle avatar-lg"
                        alt="user-pic"
                      />
                      <div className="flex-grow-1">
                        <Row className="align-items-center">
                          <Col>
                            <h6 className="m-0">{fullnameToShow} </h6>
                          </Col>
                          {/* <div className="col-auto">
                            <a onClick={MarkNotifications} className="small">
                              {" "}
                              Mark
                            </a>
                          </div> */}
                        </Row>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">
                            @{nameToShow}
                          </p>
                          <p className="mb-0">
                            <Tag color="#55acee">
                              {roleToShow}
                            </Tag>
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                }>
                  <a className="hover-profile">@{nameToShow}</a>
                </Popover>
                {!isCurrentUser && record?.reply ? ', me' : ''}
                {record?.repliesCount > 0 && ` (${record?.repliesCount})`}
              </p>
            )}
          </div>
        );
      },
      responsive: isWebDevice ? false : ["xs"],
    }
    ,
    {
      title: "Subject",
      align: "left",
      width: '45%',
      render: (_, record) => {
        const isUnread = !record?.is_read;
        const isUnreadReply = record?.replies?.some((item) => !item?.is_read && item?.to === user_id);
        const isMyReply = record?.replies?.reduce((latestReply, item) => {
          if (item?.to === user_id && item?.createdAt) {
            if (!latestReply || item.createdAt > latestReply.createdAt) {
              return item;
            }
          }
          return latestReply;
        }, null);
        const shortenText = (text, maxLength) => {
          return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
        };

        return (
          <div className={classnames('thread-info', { unread: isUnread || isUnreadReply })}>
            {isMyReply ?
              <p>
                <Tag color="#55acee">
                  reply
                </Tag>
                &nbsp;&nbsp;
                {shortenText(record.subject, 15)}
                {" - "}
                {shortenText(isMyReply.message, 25)}
              </p> :
              <p>
                {shortenText(record.subject, 15)}
                {" - "}
                {shortenText(record.message, 25)}
              </p>}
          </div>
        );
      },
      responsive: isWebDevice ? false : ["sm"]
    },
    {
      title: "Date",
      align: "left",
      render: (_, record) => {
        const isUnread = !record?.is_read;
        const isUnreadReply = record?.replies?.some((item) => !item?.is_read && item?.to === user_id)
        return (
          <div className={classnames('thread-info', { unread: isUnread || isUnreadReply })}>
            <p>
              {formatDateNoti(record?.createdAt)}
            </p>
          </div>
        )
      },
      responsive: isWebDevice ? false : ["sm"]
    },
    {
      title: "Actions",
      key: "action",
      winth: isWebDevice ? '' : '10%',
      align: "right",
      render: (_, record) => {
        const isUnread = !record?.is_read;
        const isUnreadReply = record?.replies?.some((item) => !item?.is_read && item?.to === user_id);

        return (
          <Space direction={isWebDevice ? 'horizontal' : 'vertical'} size={isWebDevice ? 5 : "small"}>
            <a
              onClick={(e) => {
                e.stopPropagation();
                markAsReadOrStar(record._id, 'is_read', !record.is_read)
              }}
            >
              {isUnread || isUnreadReply ? <FolderFilled className="eye-style" /> : <FolderOpenFilled className="eye-style" />}
            </a>
            <Popconfirm
              title="Delete the mail"
              description="Are you sure to delete this mail?"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: 'red',
                  }}
                />
              }
              onConfirm={(e) => {
                e.stopPropagation();
                deleteMail(record._id)
              }}
              onCancel={(e) => {
                e.stopPropagation();
              }}
            >
              <a onClick={(e) => {
                e.stopPropagation();
              }}>
                <DeleteFilled className="delete-style" />
              </a>
            </Popconfirm>
          </Space>
        )
      },
      fixed: "right",
      responsive: isWebDevice ? false : ["xs"]
    },
  ];
  return {
    columns,
    Devicecolumns
  };
};

export default useInboxColumns;
