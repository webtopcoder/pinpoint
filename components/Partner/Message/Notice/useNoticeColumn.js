import useNotify from "@/hooks/useNotify";
import { Button, Space, Tag, Tooltip } from "antd";
import { useState } from "react";
import { formatDate } from "@/utils/date";

function useNoticeColumns({ setOpen, onDeleteNotice, getNotice }) {
  const [record_detail, setSaveSelected] = useState();
  const { notify } = useNotify();

  const selectedSentinfo = (recordInfo) => {
    setSaveSelected(recordInfo);
    setOpen(true);
  };

  const deleteMail = (mailId) => {
    onDeleteNotice(mailId, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
        return;
      }
      notify("success", res.message);
      getNotice(
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
      title: "Subject",
      align: "center",
      width: "30%",
      sorter: true,
      render: (_, record) => (
        <div className="thread-sender">
          <div className="thread-from">
            <div className="from">
              <p className="pending_email">
                {record?.subject}
                <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
              </p>
            </div>
            <span className="activity">
              {formatDate(record.createdAt)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Notice Message",
      dataIndex: "age",
      align: "center",
      render: (_, record) => (
        <div className="thread-info">
          <p>
            <Tooltip title={record.message} color={"blue"}>
              <a onClick={() => selectedSentinfo(record)}>
                {record.message.length > 10000
                  ? record.message.substring(0, 30) + "..."
                  : record.message}
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
          {record.is_read && <Tag color="success">Accepted</Tag>}
          <Button onClick={() => deleteMail(record._id)} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return {
    columns,
    record_detail,
  };
}

export default useNoticeColumns;
