import React, { useState } from "react";
import Image from "next/image";
import { Space, Tooltip, Button, Tag } from "antd";
import { DeleteFilled, ReadOutlined } from "@ant-design/icons";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import { formatDate } from "@/utils/date";
import useMedia from "@/hooks/useMedia";

const avatarurl = `${apiBaseUrl}/avatar/`;

function useSentColumns({ setOpen, onDeleteSent, getSent, setInitLoading, setSaveReply, ongetReply }) {
  const [record_detail, setSaveSentDetail] = useState();
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');

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
      width: isWebDevice ? "40%" : '80%',
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
                  onClick={() => router.push(`/profile/${record?.to?._id}`)}
                >
                  @{isWebDevice ? record.to?.username : record.to?.username.length > 12 ? record?.to?.username?.substring(0, 12) + "..." : record.to?.username}

                  <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
                </a>
              </Tooltip>
            </div>
            <span style={{
              color: 'black',
              fontSize: 13
            }}>
              {isWebDevice ? record.to?.businessname : record.to?.businessname.length > 12 ? record?.to?.businessname?.substring(0, 12) + "..." : record.to?.businessname}
            </span>
            <span className="activity">
              last sent:{" "}
              {formatDate(record.updatedAt)}
            </span>
          </div>
        </div>
      ),
      responsive: isWebDevice ? false : ["xs"]
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
      responsive: isWebDevice ? false : ["sm"]

    },
    {
      title: "Actions",
      key: "action",
      align: "center",
      winth: isWebDevice ? '' : '10%',
      render: (_, record) => (
        <Space direction={isWebDevice ? 'horizontal' : 'vertical'} size="middle">
          {isWebDevice ? false :
            <a onClick={() => selectedSentinfo(record)} className="view-read"><ReadOutlined className="eye-style" />
            </a>
          }
          <Tooltip title="Are you sure?" color={"blue"}>
            <a onClick={() => deleteMail(record._id)} className="mail-delete">
              <DeleteFilled className="delete-style" />
            </a>
          </Tooltip>
        </Space>
      ),
      responsive: isWebDevice ? false : ["xs"]
    },
  ];

  return {
    columns,
    record_detail,
  };
}

export default useSentColumns;
