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
  Dropdown
} from "antd";
import food from "@/public/images/landing/food.png";
import { TagFilled, LoadingOutlined } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";
import { eventService } from "@/services/index";
import { formatDateEvent } from "@/utils/date";

const { Title } = Typography;
const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

const EventScheduleDetail = ({ user_id, additionLocatoins, id }) => {
  const isWebDevice = useMedia('(min-width:700px)');
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [schedule, setSchedule] = useState({});
  const { notify } = useNotify();

  const onChange = (key) => {
    console.log(key);
  };

  const actions = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const columns = [
    {
      title: 'Owner First Name',
      key: 'firstName',
      render: (_, record) => (
        <a>{record?.eventhost?.firstName}</a>
      ),
    },
    {
      title: 'Owner Last Name',
      key: 'lastName',
      render: (_, record) => (
        <a>{record?.eventhost?.lastName}</a>
      ),
    },
    {
      title: 'Business Name',
      key: 'businessName',
      render: (_, record) => (
        <a>{record?.eventhost?.businessname}</a>
      ),
    },
    {
      title: 'Category',
      key: 'category',
      render: (_, record) => (
        <Tag color="geekblue">
          {record?.eventhost?.category?.name}
        </Tag>
      ),
    },
    {
      title: 'Email',
      key: 'email',
      render: (_, record) => (
        <a>{record?.eventhost?.email}</a>
      )
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="primary">Approve</Button>
          <Button danger>Decline</Button>
          <Dropdown
            menu={{
              items: actions,
            }}
            placement="topRight"
          >
            <Button>Others</Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: '1',
      label: `Pending`,
      children: <Table columns={columns} dataSource={schedule?.request?.filter(obj => obj.isActive === "pending")} />,
    },
    {
      key: '2',
      label: `Approved`,
      children: <Table columns={columns} dataSource={schedule?.request?.filter(obj => obj.isActive === "approved")} />,
    },
    {
      key: '3',
      label: `Declined`,
      children: <Table columns={columns} dataSource={schedule?.request?.filter(obj => obj.isActive === "declined")} />,
    },
  ];

  async function initialize() {
    await eventService.getEventScheduleByID(id)
      .then(async (res) => {
        await setLoading(false);
        await setSchedule(res)
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
                    <Descriptions.Item label="Location" span={3}>{schedule?.centerAddress}</Descriptions.Item>
                    <Descriptions.Item label="Date & Time" span={3}>{`${formatDateEvent(schedule?.startDate)} ~ ${formatDateEvent(schedule?.endDate)}`}</Descriptions.Item>
                    <Descriptions.Item label="Categories" span={3}>2018-04-24 18:00:00</Descriptions.Item>
                    <Descriptions.Item label="Categories" span={3}> {schedule?.categories
                      ?.map((item) => <Tag style={{
                        color: "#dbdbdb"
                      }} icon={<TagFilled />} >{item.name}</Tag>)
                    }</Descriptions.Item>
                  </Descriptions>
                  <Divider style={{
                    borderBlockStart: '2px solid gray'
                  }} />
                  <Tabs
                    onChange={onChange}
                    type="card"
                    items={items}
                  />
                </Col>
              </Row>
              <Row
                gutter={8}
                style={{
                  marginTop: 30,
                }}
                xs={24} sm={24} md={12} lg={8} xl={6}
                justify="space-around"
              >
                <Col className="gutter-row" span={24}>
                  {/* <List
                    grid={{
                      gutter: 1,
                      xs: 1,
                      sm: 1,
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                    dataSource={schedule}
                    renderItem={(item) => (
                      <List.Item>
                      </List.Item>
                    )}
                  /> */}
                </Col>

              </Row>
            </Content>
          </div>
        </Spin>
      </Content>
    </Layout>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user_id: user.user_id,
    additionLocatoins: user.additionLocatoins,
  };
};

export default connect(mapStateToProps)(EventScheduleDetail);
