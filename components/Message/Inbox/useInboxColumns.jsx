import useNotify from "@/hooks/useNotify";
import { apiBaseUrl } from "@/utils/baseUrl";
import {
  DeleteFilled,
  FolderFilled,
  FolderOpenFilled,
  EditOutlined
} from "@ant-design/icons";
import { Space, Tooltip, Tag, Button, Badge } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/router";
import useMedia from "@/hooks/useMedia";
import classnames from "classnames";
import { formatDateNoti } from "@/utils/date";

const avatarurl = `${apiBaseUrl}/avatar/`;

const useInboxColumns = ({ setOpen, user_id, setSaveReply, setInitLoading, onUpdateMail, onDeleteMail, getInbox, ongetIsReadEmails, ongetReply }) => {
  const [record_detail, setSaveInboxDetail] = useState();
  const { notify } = useNotify();
  const router = useRouter();
  const isWebDevice = useMedia('(min-width:700px)');

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
      title: "",
      align: "left",
      width: isWebDevice ? "20%" : '80%',
      sorter: true,
      render: (_, record) => (
        // <div className="thread-info">
        <div className={classnames('thread-info', { unread: !record?.is_read })}>
          {record?.from?.role !== "admin" ?
            <a
              onClick={() =>
                router.push(`/profile/${user_id === record?.from?._id ? record?.to?._id : record?.from?._id}/activity`)
              }
            >
              {user_id === record?.from?._id ?
                (record?.to?.username?.length > 12 ? isWebDevice ? record?.to?.username : record?.to?.username?.substring(0, 12) + "..." : record?.to?.name) :
                (record?.from?.username?.length > 12 ? isWebDevice ? record?.from?.username : record?.from?.username?.substring(0, 12) + "..." : record?.from?.name)}
              <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
            </a>
            : <span>Administrator</span>}
          {record?.reply ? `, me` : ''}
          {record?.repliesCount > 0 && ` (${record?.repliesCount})`}
        </div>
      ),
      responsive: isWebDevice ? false : ["xs"]
    },
    {
      title: "Subject",
      align: "left",
      width: '50%',
      render: (_, record) => (
        <div className={classnames('thread-info', { unread: !record?.is_read })}>
          <p>
            {record.subject.length > 15
              ? record.subject.substring(0, 15) + "..."
              : record.subject}
            {" - "}
            {record.message.length > 25
              ? record.message.substring(0, 25) + "..."
              : record.message}
          </p>
        </div>
      ),
      responsive: isWebDevice ? false : ["sm"]
    },
    {
      title: "Date",
      align: "left",
      render: (_, record) => (
        <div className={classnames('thread-info', { unread: !record?.is_read })}>
          <p>
            {formatDateNoti(record?.createdAt)}
          </p>
        </div>
      ),
      responsive: isWebDevice ? false : ["sm"]
    },
    {
      title: "Actions",
      key: "action",
      winth: isWebDevice ? '' : '10%',
      align: "right",
      render: (_, record) => (
        <Space direction={isWebDevice ? 'horizontal' : 'vertical'} size={isWebDevice ? 5 : "small"}>
          <a
            onClick={() => markAsReadOrUnRead(record._id, !record.is_read)}
          >

            <EditOutlined className="eye-style" />
          </a>

          <a
            onClick={(e) => {
              e.stopPropagation();
              markAsReadOrUnRead(record._id, !record.is_read)
            }}
          >
            {!record.is_read ? <FolderFilled className="eye-style" /> : <FolderOpenFilled className="eye-style" />}
          </a>
          <a onClick={(e) => {
            e.stopPropagation();
            deleteMail(record._id)
          }
          }>
            <DeleteFilled className="delete-style" />
          </a>
        </Space>
      ),
      fixed: "right",
      responsive: isWebDevice ? false : ["xs"]
    },
  ];
  return {
    columns,
    record_detail,
  };
};

export default useInboxColumns;
