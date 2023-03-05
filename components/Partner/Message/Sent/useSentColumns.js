import React, { useState } from "react";
import Image from "next/image";
import { Space, Tooltip } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";
import { formatDate } from "@/utils/date";

const avatarurl = `${apiBaseUrl}/avatar/`;

function useSentColumns({ setOpen, onDeleteSent, getSent }) {
  const [record_detail, setSaveSentDetail] = useState();
  const { notify } = useNotify();

  const selectedSentinfo = (recordInfo) => {
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
                  onClick={() =>
                    window.open(
                      baseUrl + "/profile/" + record?.to?._id + "/activity",
                      "_blank"
                    )
                  }
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
              <a onClick={() => selectedSentinfo(record)}>
                {record.subject.length > 30
                  ? record.subject.substring(0, 30) + "..."
                  : record.subject}
              </a>
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
