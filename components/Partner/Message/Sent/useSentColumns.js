import React, { useState } from "react";
import Image from "next/image";
import { Space, Tooltip, Button, Tag } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import { formatDate } from "@/utils/date";

const avatarurl = `${apiBaseUrl}/avatar/`;

function useSentColumns({ setOpen, onDeleteSent, getSent, setInitLoading, setSaveReply, ongetReply }) {
  const [record_detail, setSaveSentDetail] = useState();
  const { notify } = useNotify();

  const selectedSentinfo = (recordInfo) => {
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
    setSaveSentDetail(recordInfo);
    setOpen(true);
  };

  const deleteMail = (mailId) => {
    onDeleteSent(mailId, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
        return;
      }
      notify("success", res.message);
      getSent(
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
      title: "To",
      align: "center",
      width: "40%",
      sorter: true,
      render: (_, record) => (
        <div className="thread-sender">
          <div className="thread-avatar">
            <Image
              src={avatarurl + "/" + record?.to?.profile?.avatar?.filepath}
              alt="user"
              width={40}
              height={40}
            />
          </div>
          <div className="thread-from">
            <div className="from">
              <Tooltip title="View Profile" color={"blue"}>
                <a
                  onClick={() => router.push(`/profile/${record?.to?._id}/activity`)}
                >
                  @{record?.to?.username}
                  <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                </a>
              </Tooltip>
            </div>
            <span className="activity">
              last sent:{" "}
              {formatDate(record.updatedAt)}
            </span>
          </div>
        </div>
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
              <Button type="link" onClick={() => selectedSentinfo(record)}>
                {record.subject.length > 30
                  ? record.subject.substring(0, 30) + "..."
                  : record.subject}
              </Button>
              {record?.repliesCount !== 0 ? <Tag color="error">{record?.repliesCount} unread</Tag> : ''}
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
}

export default useSentColumns;
