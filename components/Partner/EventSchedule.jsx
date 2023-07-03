import React, { useEffect, useState, useRef } from "react";
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
  Slider,
  Statistic,
  InputNumber,
  Divider,
  Avatar,
  Tag,
  Image,
  Descriptions,
  Radio,
  Badge
} from "antd";
import { SendOutlined, LoadingOutlined, SearchOutlined, EyeOutlined, SyncOutlined, TagFilled } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";
import { eventService } from "@/services/index";
import { apiBaseUrl } from "@/utils/baseUrl";
import Link from "next/link";
import { formatDateEvent, getDiffeForEventSchedule } from "@/utils/date";

const { Title, Text } = Typography;
const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;
const avatarurl = `${apiBaseUrl}/avatar/`;
const { Countdown } = Statistic;

const EventSchedule = ({ user_id, additionLocatoins, user_category }) => {

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "us" },
    fields: [
      "address_components",
      "adr_address",
      "formatted_address",
      "geometry",
      "name",
    ],
  };

  const isWebDevice = useMedia('(min-width:700px)');
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [filter, setFilter] = useState({
    time: '',
    position: {},
    range: 5,
    flag: true
  });

  const { notify } = useNotify();
  const formatter = (value) => `${value}mile`;

  const onChange = (newValue) => {
    setFilter({ ...filter, range: newValue });
  };

  async function initialize() {
    await setLoading(true);
    await eventService.getEventSchedule(filter)
      .then(async (res) => {
        setLoading(false);
        if (additionLocatoins.length > 0) {
          const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
          await setSchedules(filteredData);
        }
        else {
          const filteredArray = res.results.filter(obj =>
            obj.categories.some(category => category._id === user_category)
          );
          await setSchedules(filteredArray);
        }
      })
      .catch(async (error) => {
        await setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  async function onChangeRadio(e) {
    await setFilter({ ...filter, time: e.target.value });
  };

  async function onRequestAccess(id) {
    await setLoading(true);
    await eventService.RequestAccess(id)
      .then(async (res) => {
        await setLoading(false);
        const updatedEvents = schedules.map(item => {
          if (item?._id === id) {
            return {
              ...item,
              request: res.request
            };
          }
          return item;
        });

        await setSchedules(updatedEvents);
        notify(
          "success",
          "Requested Successfully"
        );
      })
      .catch(async (error) => {
        await setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  };

  async function onFilterByLocation() {
    await initialize();
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      setFilter({
        ...filter, position: {
          lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng(),
        }
      })
    });
  }, []);

  useEffect(() => {
    initialize();
  }, [filter]);

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
              <Row gutter={[16, 24]}>
                <Col
                  xs={0} sm={0} md={6} lg={6} xl={6}
                >
                </Col>
                <Col
                  xs={24} sm={24} md={12} lg={12} xl={12}
                  style={{
                    marginTop: 30,
                  }}
                >
                  <form className="search-form" action="javascript:void(0);">
                    <input
                      type="search"
                      className="search-field"
                      ref={inputRef}
                      placeholder="Enter Address or Share Location"
                    />
                    <button>
                      <i className="bx bx-current-location"></i>
                    </button>
                  </form>
                </Col>
                <Col
                  xs={0} sm={0} md={6} lg={6} xl={6}
                >
                </Col>
              </Row>
              <Row justify="center" align="middle" gutter={[16, 24]} style={{
                marginTop: 12
              }}>
                <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <h5 style={{
                    color: "white"
                  }}>Miles to Event</h5>
                  <Row>
                    <Col span={20}>
                      <Slider
                        tooltip={{
                          formatter,
                        }}
                        trackStyle={{
                          background: "#175594",
                        }}
                        handleStyle={{
                          background: "white",
                        }}
                        min={1}
                        max={50}
                        onChange={onChange}
                        value={typeof filter.range === "number" ? filter.range : 0}
                      />
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        min={1}
                        max={50}
                        style={{
                          width: 60,
                          margin: "0 16px",
                        }}
                        value={filter.range}
                        onChange={onChange}
                      />
                    </Col>
                  </Row>
                  <Divider>
                    <Button type="primary" onClick={onFilterByLocation} icon={<SearchOutlined />}>
                      Find Events
                    </Button></Divider>
                </Col>
                <Col
                  xs={0} sm={0} md={6} lg={6} xl={6}
                >
                </Col>
              </Row>
              <Row
                gutter={[8, 16]}
                style={{
                  marginTop: 30,
                }}
                xs={24} sm={24} md={12} lg={8} xl={6}
                justify="space-around"
                className="schedule-detail-content"
              >
                <Radio.Group onChange={onChangeRadio} buttonStyle="solid" defaultValue="all">
                  <Radio.Button value="all">All</Radio.Button>
                  <Radio.Button value="this">This Week</Radio.Button>
                  <Radio.Button value="next">Next Week</Radio.Button>
                  <Radio.Button value="future">Future Events</Radio.Button>
                </Radio.Group>

                <Col span={24}>
                  <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                      onChange: (page) => {
                        console.log(page);
                      },
                      pageSize: 10,
                    }}
                    dataSource={schedules}
                    renderItem={(item) => {
                      const isApproved = item.request.filter(obj => obj.id === user_id);
                      const isExpired = getDiffeForEventSchedule(item?.endDate) < 24 ? true : false;
                      const startEvent = getDiffeForEventSchedule(item?.startDate);
                      const endEvent = getDiffeForEventSchedule(item?.endDate);
                      const isActive = startEvent < 0 && endEvent > 0 ? "Active" : startEvent > 0 && endEvent > 0 ? "Inactive" : 'Expired'

                      return (
                        <List.Item
                          key={item.title}
                          actions={[
                            <Button icon={<EyeOutlined />}>
                              <Link href={`/profile/${item?.eventhost?._id}/activity`}> View Profile</Link>
                            </Button>,
                            !isApproved.length > 0 ? <Button hidden={isExpired ? true : false} type="primary" onClick={() => onRequestAccess(item?._id)} icon={<SendOutlined />}>
                              Request Access
                            </Button> :
                              <Tag color={isApproved[0]?.isActive === "pending" ?
                                "processing" : isApproved[0]?.isActive === "approve" ?
                                  "success" : "error"} >
                                {isApproved[0]?.isActive === "pending" ?
                                  "Pending" : isApproved[0]?.isActive === "approve" ?
                                    "Approved" : "Declined"}
                              </Tag>,
                            // </Button> : <Tag icon={<SyncOutlined spin />} color="processing">{isApproved[0]?.isActive}</Tag>,
                          ]}
                          extra={
                            <Image
                              width={200}
                              height={200}
                              src={avatarurl + item?.images[0]?.filepath}
                            />
                          }
                        >
                          <List.Item.Meta
                            avatar={<Avatar size={70} src={avatarurl + item?.eventhost?.profile?.avatar?.filepath} />}
                            title={
                              <Text style={{
                                color: 'white'
                              }}> {`${item?.eventhost?.businessname},    @${item?.eventhost?.username}`}</Text>
                            }
                            description={
                              <Badge.Ribbon color={isActive === "Active" ? "green" : isActive === "Inactive" ? "gold" : "red"} text={isActive}>
                                <Descriptions size="small" labelStyle={{
                                  color: "#dbdbdb"
                                }}
                                  contentStyle={{
                                    color: "#dbdbdb"
                                  }}
                                  bordered title="">
                                  <Descriptions.Item label="Type" span={3}><Tag color="#55acee">{item?.type}</Tag></Descriptions.Item>
                                  <Descriptions.Item label="Event Name" span={3}>{item?.title}</Descriptions.Item>
                                  <Descriptions.Item label="Address" span={3}>{item?.centerAddress?.address}</Descriptions.Item>
                                  <Descriptions.Item label="Access" span={3}> {item?.categories
                                    ?.map((item) => <Tag style={{
                                      color: "#dbdbdb"
                                    }} icon={<TagFilled />} >{item.name}</Tag>)
                                  }</Descriptions.Item>
                                  <Descriptions.Item label="Date & Time" span={3}>{`${formatDateEvent(item?.startDate)} ~ ${formatDateEvent(item?.endDate)}`}</Descriptions.Item>
                                  {isActive !== "Expired" ? <Descriptions.Item
                                    label={isActive === "Active" ? 'For End' : 'For Start'}
                                    span={3}
                                  >
                                    <Countdown valueStyle={{
                                      fontSize: 15,
                                      color: 'rgb(219, 219, 219)'
                                    }} value={isActive !== "Active" ? Date.now() + startEvent * 60 * 60 * 1000 : Date.now() + endEvent * 60 * 60 * 1000} format="D [days] H [hrs] m [mins] s[secs]" />
                                  </Descriptions.Item> : ''}
                                </Descriptions>
                              </Badge.Ribbon>}
                          />
                          {item.content}
                        </List.Item>
                      )
                    }}
                  />
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
    user_category: user.category,
    additionLocatoins: user.additionLocatoins,
  };
};

export default connect(mapStateToProps)(EventSchedule);
