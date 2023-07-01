import React, { useEffect, useState } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import {
  Layout,
  Col,
  Row,
  Button,
  Typography,
  message,
  List,
  Spin,
  Descriptions,
  Badge,
  Tag,
  Divider,
  Tabs,
  Table,
  Space,
  Dropdown,
} from "antd";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { TagFilled, LoadingOutlined, PlusOutlined, DownloadOutlined, UploadOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";
import { eventService } from "@/services/index";
import AddAttendeeModal from "./AddAttendeeModal";
import UploadExcelModal from "./UploadExcelModal";
import { formatDateEvent, getDiffeForEventSchedule } from "@/utils/date";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import moment from 'moment';

const { Title, Text } = Typography;
const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

const index = ({ user_id, additionLocatoins, id }) => {
  const isWebDevice = useMedia('(min-width:700px)');
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [ExcelUploadOpen, setExcelUploadModalOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [schedule, setSchedule] = useState({});
  const { notify } = useNotify();

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const columns = [
    {
      title: 'Owner First Name',
      key: 'firstName',
      render: (_, record) => (
        <a>{record?.firstname}</a>
      ),
    },
    {
      title: 'Owner Last Name',
      key: 'lastName',
      render: (_, record) => (
        <a>{record?.lastname}</a>
      ),
    },
    {
      title: 'Email',
      key: 'email',
      render: (_, record) => (
        <a>{record?.email}</a>
      )
    },
    {
      title: 'Business Name',
      key: 'businessName',
      render: (_, record) => (
        <a>{record?.businessname}</a>
      ),
    },
    {
      title: 'Category',
      key: 'category',
      render: (_, record) => (
        <Tag color="geekblue">
          {record?.category}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        !record.id ? <Space>
          <Tag color="success">Added Manually</Tag>
        </Space> :
          <Space>
            <Button style={{
              display: record?.isActive === "decline" || record?.isActive === "pending" ? "block" : 'none'
            }} type="primary" onClick={async () => {
              setLoading(true);
              await eventService.markStatus(schedule?._id, { id: record?.id, isActive: 'approve' })
                .then(async (res) => {
                  const updatedSchedule = schedule.request.map(item => {
                    if (item?.id === record?.id) {
                      return {
                        ...item,
                        isActive: "approve"
                      };
                    }
                    return item;
                  });
                  await setSchedule({
                    ...schedule,
                    request: updatedSchedule
                  });
                  setLoading(false);
                  notify(
                    "success",
                    "Approved Successfully"
                  );
                })
                .catch((error) => {
                  setLoading(false);
                  notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                  );
                  return;
                });
            }}>Approve</Button>
            <Button style={{
              display: record?.isActive === "approve" || record?.isActive === "pending" ? "block" : 'none'
            }} type="primary" onClick={async () => {
              await eventService.markStatus(schedule?._id, { id: record?.id, isActive: 'decline' })
                .then(async (res) => {
                  const updatedSchedule = schedule.request.map(item => {
                    if (item?.id === record?.id) {
                      return {
                        ...item,
                        isActive: "decline"
                      };
                    }
                    return item;
                  });

                  await setSchedule({
                    ...schedule,
                    request: updatedSchedule
                  });

                  setLoading(false);
                  notify(
                    "success",
                    "Declined Successfully"
                  );
                })
                .catch((error) => {
                  setLoading(false);
                  notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                  );
                  return;
                });
            }} danger>Decline</Button>
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <a target="_blank" rel="noopener noreferrer" href={`${baseUrl}/profile/${record?.id}/activity`}>
                        View Profile
                      </a>
                    ),
                  },
                  {
                    key: '2',
                    label: (
                      <a target="_blank" rel="noopener noreferrer" href={`${baseUrl}/eventhost/message?user=${record?.id}`}>
                        Message
                      </a>
                    ),
                  },
                ]
              }}
              placement="topRight"
            >
              <Button>Others</Button>
            </Dropdown>
          </Space >
      ),
    },
  ];

  const items = [
    {
      key: '1',
      label: <Badge count={schedule?.request?.filter(obj => obj.isActive === "pending")?.length ?? 0} size="small" style={{
        backgroundColor: '#52c41a',
      }} offset={[5, 0]}>Pending</Badge>,
      children: <Table columns={columns} dataSource={schedule?.request?.filter(obj => obj.isActive === "pending")} />
    },
    {
      key: '2',
      label: <Badge count={schedule?.request?.filter(obj => obj.isActive === "approve")?.length ?? 0} size="small" style={{
        backgroundColor: '#52c41a',
      }} offset={[5, 0]}>Approved</Badge>,
      children:
        <Space direction="vertical" style={{
          width: '100%'
        }}>
          <Space style={{ float: 'right' }}>
            <Button icon={<PlusOutlined />} onClick={() => setAddModalOpen(true)} type="primary" shape="round" ghost>Add Attendee</Button>
            <Button icon={<UploadOutlined />} onClick={() => setExcelUploadModalOpen(true)} type="primary" shape="round" ghost>Import .xisx</Button>
            <Button icon={<DownloadOutlined />} onClick={(e) => exportToCSV(schedule?.request?.filter(obj => obj.isActive === "approve"), formatDateEvent(new Date()) + "Approved")} type="primary" shape="round" ghost>Export .xisx</Button>
          </Space>
          <Table columns={columns} dataSource={schedule?.request?.filter(obj => obj.isActive === "approve")} />
        </Space>
    },
    {
      key: '3',
      label: <Badge count={schedule?.request?.filter(obj => obj.isActive === "decline")?.length ?? 0} style={{
        backgroundColor: '#52c41a',
      }} size="small" offset={[5, 0]}>Declined</Badge>,
      children:
        <Space direction="vertical" style={{
          width: '100%'
        }}>
          <Space style={{ float: 'right' }}>
            <Button icon={<DownloadOutlined />} onClick={(e) => exportToCSV(schedule?.request?.filter(obj => obj.isActive === "decline"), formatDateEvent(new Date()) + "Approved")} type="primary" shape="round" ghost>Export .xisx</Button>
          </Space>
          <Table columns={columns} dataSource={schedule?.request?.filter(obj => obj.isActive === "decline")} />
        </Space>
    },
  ];

  async function initialize() {
    await eventService.getEventScheduleByID(id)
      .then(async (res) => {
        await setLoading(false);
        const isExpired = getDiffeForEventSchedule(res?.endDate) < 24 ? true : false;
        await setIsExpired(isExpired);
        await setSchedule(res);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content
        className="partner-layout"
      >
        <Spin
          indicator={antIcon}
          spinning={loading}
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div className="site-card-wrapper">
            <Content>
              <Row gutter={16}>
                <Col
                  className="gutter-row"
                  xs={24} sm={24} md={24} lg={24} xl={24}
                  style={{
                    marginTop: 30,
                  }}
                >
                  <Descriptions contentStyle={{
                    color: "#dbdbdb"
                  }} labelStyle={{
                    color: "#dbdbdb"
                  }}
                    size="small"
                    title={<Title style={{
                      color: 'white'
                    }}>{schedule?.title}</Title>} bordered>
                    <Descriptions.Item label="Event" span={3}>{schedule?.event?.title}</Descriptions.Item>
                    <Descriptions.Item label="Location" span={3}>{schedule?.centerAddress?.address}</Descriptions.Item>
                    <Descriptions.Item label="Date & Time" span={3}>{`${formatDateEvent(schedule?.startDate)} ~ ${formatDateEvent(schedule?.endDate)}`}</Descriptions.Item>
                    <Descriptions.Item label="Categories" span={3}> {schedule?.categories
                      ?.map((item) => <Tag style={{
                        color: "#dbdbdb"
                      }} icon={<TagFilled />} >{item.name}</Tag>)
                    }</Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                      <Text type={isExpired ? "danger" : "success"}>{isExpired ? "Expired" : "Active"}</Text>
                    </Descriptions.Item>
                  </Descriptions>
                  <Divider style={{
                    borderBlockStart: '2px solid gray'
                  }} />
                  <Tabs
                    style={{
                      borderRadius: '10px',
                      padding: "20px",
                      background: "white"
                    }}
                    type="card"
                    items={items}
                  />
                </Col>
              </Row>
            </Content>
          </div>
        </Spin>
      </Content>
      <AddAttendeeModal
        schedule={schedule}
        setSchedule={setSchedule}
        scheduleId={schedule?._id}
        open={addModalOpen}
        setModalOpen={setAddModalOpen}
        user_id={user_id}
      />
      <UploadExcelModal
        schedule={schedule}
        setSchedule={setSchedule}
        scheduleId={schedule?._id}
        open={ExcelUploadOpen}
        setModalOpen={setExcelUploadModalOpen}
      />
    </Layout>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
    additionLocatoins: user.additionLocatoins,
  };
};

export default connect(mapStateToProps)(index);
