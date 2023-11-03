import useNotify from "@/hooks/useNotify";
import {
  DeleteFilled,
} from "@ant-design/icons";
import { Space } from "antd";
import React from "react";
import useMedia from "@/hooks/useMedia";
import classnames from "classnames";
import { formatDateNoti } from "@/utils/date";

const useInboxColumns = ({ onDeleteSentMail, getSent }) => {
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');

  const deleteMail = (mailId) => {
    onDeleteSentMail(mailId, (res, error) => {
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


  const Devicecolumns = [
    {
      title: "",
      align: "left",
      render: (_, record) => {
        const shortenText = (text, maxLength) => {
          return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
        };
        const truncatedUsername = (username) =>
          username?.length > 18 ? (isWebDevice ? username : `${username?.substring(0, 18)}...`) : username;
        const nameToShow = truncatedUsername(record?.to?.username)

        return (
          <>
            <div className={classnames('thread-info')}>
              <p>
                <i className="bx bx-user" style={{
                  fontSize: 20
                }}></i> &nbsp;  {nameToShow}
              </p>
            </div>
            <div className={classnames('thread-info')}>
              <p>
                <i className="bx bx-envelope" style={{
                  fontSize: 20
                }}></i> &nbsp;
                {shortenText(record.subject, 15)}
                {" - "}
                {shortenText(record.message, 25)}
              </p>
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
              <button
                type="button"
                className="btn btn-danger "
                style={{ fontSize: 'smaller' }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMail(record._id)
                }}
              >
                <i className="bx bx-trash-alt font-size-14 align-middle me-2"></i>{" "}
                Delete
              </button>
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
        const truncatedUsername = (username) =>
          username?.length > 12 ? (isWebDevice ? username : `${username?.substring(0, 12)}...`) : username;
        const nameToShow = truncatedUsername(record?.to?.username)

        return (
          <div className={classnames('thread-info')}>
            <p>
              {nameToShow}
            </p>
          </div>
        );
      },
      responsive: isWebDevice ? false : ["xs"],
    },
    {
      title: "Subject",
      align: "left",
      width: '45%',
      render: (_, record) => {
        const shortenText = (text, maxLength) => {
          return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
        };
        return (
          <div className={classnames('thread-info')}>
            <p>
              {shortenText(record.subject, 15)}
              {" - "}
              {shortenText(record.message, 25)}
            </p>
          </div>
        );
      },
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
    Devicecolumns
  };
};

export default useInboxColumns;
