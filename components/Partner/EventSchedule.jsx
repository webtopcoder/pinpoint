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
  Space,
  InputNumber,
  Divider,
  Avatar,
  Tag,
  Image,
  Descriptions,
  Radio
} from "antd";
import { SendOutlined, LoadingOutlined, SearchOutlined, EyeOutlined, SyncOutlined, TagFilled } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";
import { eventService } from "@/services/index";
import { apiBaseUrl } from "@/utils/baseUrl";
import Link from "next/link";
import { formatDateEvent } from "@/utils/date";

const { Title, Text } = Typography;
const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;
const avatarurl = `${apiBaseUrl}/avatar/`;

const EventSchedule = ({ user_id, additionLocatoins }) => {

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
  const [events, setEvents] = useState([]);
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

  // async function initialize() {
  //   await setLoading(true);
  //   console.log(filter)
  //   await eventService.getEventSchedule(filter)
  //     .then(async (res) => {
  //       setLoading(false);
  //       if (additionLocatoins.length > 0) {
  //         const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
  //         await setEvents(filteredData);
  //       }
  //       else
  //         await setEvents(res.results);
  //     })
  //     .catch(async (error) => {
  //       await setLoading(false);
  //       notify(
  //         "error",
  //         error?.response?.data?.message || "Something went wrong"
  //       );
  //       return;
  //     });
  // }

  async function onChangeRadio(e) {
    await setFilter({ ...filter, time: e.target.value });
  };

  async function onRequestAccess(id) {
    await setLoading(true);
    await eventService.RequestAccess(id)
      .then(async (res) => {
        await setLoading(false);
        const updatedEvents = events.map(event => {
          if (event?._id === id) {
            return {
              ...event,
              request: res.request
            };
          }
          return event;
        });

        await setEvents(updatedEvents);
        console.log(events)
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

  useEffect(async () => {
    await setLoading(true);
    await eventService.getEventSchedule(filter)
      .then(async (res) => {
        setLoading(false);
        if (additionLocatoins.length > 0) {
          const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
          await setEvents(filteredData);
        }
        else
          await setEvents(res.results);
      })
      .catch(async (error) => {
        await setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
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
                    dataSource={events}
                    renderItem={(item) => (
                      <List.Item>
                      </List.Item>
                    )}
                  /> */}

                  <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                      onChange: (page) => {
                        console.log(page);
                      },
                      pageSize: 10,
                    }}
                    dataSource={events}
                    renderItem={(item) => {
                      const isApproved = item.request.some(obj => obj.eventhost === user_id);
                      return (
                        <List.Item
                          key={item.title}
                          actions={[
                            <Button icon={<EyeOutlined />}>
                              <Link href={`/profile/${item?.eventhost?._id}/activity`}> View Profile</Link>
                            </Button>,


                            !isApproved ? <Button type="primary" onClick={() => onRequestAccess(item?._id)} icon={<SendOutlined />}>
                              Request Access
                            </Button> : <Tag icon={<SyncOutlined spin />} color="processing">Requested</Tag>,
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
                            description={<Descriptions size="small" labelStyle={{
                              color: "#dbdbdb"
                            }}
                              contentStyle={{
                                color: "#dbdbdb"
                              }}
                              bordered title="">
                              <Descriptions.Item label="Event Name" span={3}>{item?.title}</Descriptions.Item>
                              <Descriptions.Item label="Address" span={3}>{item?.centerAddress}</Descriptions.Item>
                              <Descriptions.Item label="Access" span={3}> {item?.categories
                                ?.map((item) => <Tag style={{
                                  color: "#dbdbdb"
                                }} icon={<TagFilled />} >{item.name}</Tag>)
                              }</Descriptions.Item>
                              <Descriptions.Item label="Date & Time" span={3}>{`${formatDateEvent(item?.startDate)} ~ ${formatDateEvent(item?.endDate)}`}</Descriptions.Item>
                            </Descriptions>}
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
    additionLocatoins: user.additionLocatoins,
  };
};

export default connect(mapStateToProps)(EventSchedule);
