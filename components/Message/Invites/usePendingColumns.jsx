import useNotify from "@/hooks/useNotify";
import { SendOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip, Tag } from "antd";
import useMedia from "@/hooks/useMedia";
import { formatDateNoti } from "@/utils/date";
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
      title: "Email",
      align: "left",
      width: "20%",
      sorter: true,
      render: (_, record) => (
        <div className="thread-info">
              <p className="pending_email">
                {isWebDevice ? record.to_invite_email : record.to_invite_email.length > 20 ? record?.to_invite_email?.substring(0, 20) + "..." : record.to_invite_email}
              </p>
        </div>
      ),
      responsive: isWebDevice ? false : ["xs"]
    },
    {
      title: "Invite Message",
      align: "left",
      width: "40%",

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
      title: "Date",
      align: "left",
      render: (_, record) => (
        <div className="thread-info">
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
      align: "center",
      width: '20%',
      render: (_, record) => (
        <Space size={1}>
          {record.is_read ? (
            <Tag color="success">Accepted</Tag>
          ) : (
            <Button icon={isWebDevice ? <SendOutlined /> : ''}
              onClick={() => resendPending(record._id)} type="link">
              {isWebDevice ? "Resend" : ''}
            </Button>
          )}
          <Button
            icon={isWebDevice ? <DeleteOutlined /> : ''}
            onClick={() => deleteInvitation(record._id)}
            type="link"
            danger
          >
            {isWebDevice ? "Delete" : ''}
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
