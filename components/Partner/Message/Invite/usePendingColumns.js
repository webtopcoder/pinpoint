import useNotify from "@/hooks/useNotify";
import { Button, Space, Tooltip, Tag } from "antd";
import useMedia from "@/hooks/useMedia";

function usePendingColumns({ onResendInvite, onDeleteMail, onGetPending }) {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const resendPending = (mailId) => {
    onResendInvite(mailId, (res, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong !"
        );
      } else {
        notify("success", "Invitation Sent");
      }
    });
  };

  const deleteInvitation = (mailId) => {
    onDeleteMail(mailId, (_, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong !"
        );
      } else {
        notify("success", "Deleted Invitation");
        onGetPending({
          pagination: {
            current: 1,
            pageSize: 10,
          },
        });
      }
    });
  };

  const columns = [
    {
      title: "To",
      align: "center",
      width: "30%",
      sorter: true,
      render: (_, record) => (
        <div className="thread-sender">
          <div className="thread-from">
            <div className="from">
              <p className="pending_email">
                {record.to_invite_email}
                <i className="fas fa-check youzify-account-verified youzify-small-verified-icon"></i>
              </p>
            </div>
            <span className="activity">
              {new Date(record.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                hour12: true,
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        </div>
      ),
      responsive: isWebDevice ? false : ["xs"]
    },
    {
      title: "Invite Message",
      dataIndex: "age",
      align: "center",
      render: (_, record) => (
        <div className="thread-info">
          <p>
            <Tooltip title={record.message} color={"blue"}>
              {record?.message?.length > 10000
                ? record.message.substring(0, 30) + "..."
                : record.message}
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
      render: (_, record) => (
        <Space size="middle">
          {record.is_read ? (
            <Tag color="success">Accepted</Tag>
          ) : (
            <Button onClick={() => resendPending(record._id)} type="primary">
              Resend
            </Button>
          )}
          <Button
            onClick={() => deleteInvitation(record._id)}
            type="primary"
            danger
          >
            Delete
          </Button>
        </Space>
      ),
      responsive: isWebDevice ? false : ["xs"]
    },
  ];

  return {
    columns,
  };
}

export default usePendingColumns;
