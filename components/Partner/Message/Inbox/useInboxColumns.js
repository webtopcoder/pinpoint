import useNotify from "@/hooks/useNotify";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import {
  DeleteFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Space, Tooltip, Tag, Button, Badge } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/router";

const avatarurl = `${apiBaseUrl}/avatar/`;

const useInboxColumns = ({ setOpen, user_id, setSaveReply, setInitLoading, onUpdateMail, onDeleteMail, getInbox, ongetIsReadEmails, ongetReply }) => {
  const [record_detail, setSaveInboxDetail] = useState();
  const { notify } = useNotify();
  const router = useRouter();

  const selectedInboxinfo = (recordInfo) => {
    ongetReply(recordInfo._id, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
        return;
      }
      else {
        setInitLoading(false)
        setSaveReply(res.results);
      }
    });
    markAsReadOrUnRead(recordInfo._id, true);
    setSaveInboxDetail(recordInfo);
    setOpen(true);
  };

  const markAsReadOrUnRead = (mailId, is_read) => {
    onUpdateMail(mailId, { is_read }, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
        return;
      }
      // notify("success", res.message);
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

  const columns = [
    {
      title: "From",
      align: "center",
      width: "40%",
      sorter: true,
      render: (_, record) => (
        <div className="thread-sender">
          <div className="thread-avatar">
            <Image
              src={avatarurl + "/" + (user_id === record?.from?._id ? record?.to?.profile?.avatar?.filepath : record?.from?.profile?.avatar?.filepath)}
              alt="user"
              className="avatar"
              width={45}
              height={45}
            />
          </div>
          <div className="thread-from">
            <div className="from">
              {record?.from?.role !== "admin" ? <Tooltip title="View Profile" color={"blue"}>
                <a
                  onClick={() =>
                    router.push(`/profile/${user_id === record?.from?._id ? record?.to?._id : record?.from?._id}/activity`)
                  }
                >
                  @{user_id === record?.from?._id ? record?.to?.username : record?.from?.username}
                  <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                </a>&nbsp;&nbsp;
              </Tooltip> : <span>Administrator</span>}
            </div>
            <span className="activity">
              Received:{" "}
              {formatDate(record.updatedAt)}
            </span>
          </div>
        </div >
      ),
    },
    {
      title: "Subject",
      dataIndex: "age",
      align: "center",
      render: (_, record) => (
        <div className="thread-info">
          <p>
            <Tooltip title="View Message" color={"blue"}>
              <Button type="link" onClick={() => selectedInboxinfo(record)}>
                {record.subject.length > 30
                  ? record.subject.substring(0, 30) + "..."
                  : record.subject}
              </Button>
              {!record.is_read ? <Tag color="error">New</Tag> : ''}
              {record?.repliesCount !== 0 ? <Tag color="error">{record?.repliesCount} replied</Tag> : ''}
            </Tooltip>
          </p>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {!record.is_read ? (
            <Tooltip title="Mark as Read" color={"blue"}>
              <a
                onClick={() => markAsReadOrUnRead(record._id, !record.is_read)}
                className="mark-read"
              >
                <EyeOutlined className="eye-style" />
              </a>
            </Tooltip>
          ) : (
            <Tooltip title="Mark as Read" color={"blue"}>
              <a
                onClick={() => markAsReadOrUnRead(record._id, !record.is_read)}
                className="mark-read"
              >
                <EyeInvisibleOutlined className="eye-style" />
              </a>
            </Tooltip>
          )}
          <Tooltip title="Are you sure?" color={"blue"}>
            <a onClick={() => deleteMail(record._id)} className="mail-delete">
              <DeleteFilled className="delete-style" />
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return {
    columns,
    record_detail,
  };
};

export default useInboxColumns;
