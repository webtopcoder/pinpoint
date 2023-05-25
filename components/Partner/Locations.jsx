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
  Spin
} from "antd";
import food from "@/public/images/landing/food.png";
import { PlusCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import LocationCard from "../LocationCard";
import useNotify from "@/hooks/useNotify";
import AddLocationModal from "../Locations/AddLocationModal";
import useMedia from "@/hooks/useMedia";
import { locationService } from "@/services/index";

const { Title } = Typography;
const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

const PartnerLocations = ({ user_id, additionLocatoins }) => {
  const [uploadFile, setUploadFile] = useState([]);
  const isWebDevice = useMedia('(min-width:700px)');
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const { notify } = useNotify();

  const uploadProps = {
    name: "upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        const fileUploadInfo = info.fileList;
        setUploadFile(fileUploadInfo);
      }

      if (info.file.status == "removed") {
        if (info.fileList.length == 0) setUploadFile([]);
        else {
          const fileUploadInfo = info.fileList;
          setUploadFile(fileUploadInfo);
        }
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  async function initialize() {
    await locationService.getLocations({ partner: user_id, isActive: null })
      .then(async (res) => {
        setLoading(false);
        if (additionLocatoins.length > 0) {
          const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
          await setLocations(filteredData);
        }
        else
          await setLocations(res.results);
      })
      .catch((error) => {
        setLoading(false);
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
            <Content className="custom-subcontent">
              <Row gutter={16}>
                <Col
                  className="gutter-row"
                  xs={12} sm={12} md={8} lg={8} xl={6}
                  style={{
                    marginTop: 30,
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => setAddModalOpen(true)}
                    icon={<PlusCircleOutlined />}
                  >
                    Add Location
                  </Button>
                </Col>
                <Col className="gutter-row"
                  xs={0} sm={0} md={8} lg={8} xl={12}
                >
                  <Title
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Partner Locations
                  </Title>
                </Col>
                <Col
                  className="gutter-row"
                  span={isWebDevice ? 6 : 12}
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Image src={food} alt="Snow" width={50} height={70} />
                </Col>
              </Row>
              <Row
                gutter={16}
                style={{
                  marginTop: 30,
                }}
                xs={24} sm={24} md={8} lg={8} xl={6}
                justify="space-around"
              >
                <Col className="gutter-row" span={24}>
                  <List
                    grid={{
                      gutter: 10,
                      xs: 1,
                      sm: 1,
                      md: 1,
                      lg: 2,
                      xl: 3,
                      xxl: 3,
                    }}
                    dataSource={locations}
                    renderItem={(item) => (
                      <List.Item>
                        <LocationCard locations={locations} setLocations={setLocations} location={item} showActions={true} />
                      </List.Item>
                    )}
                  />
                </Col>

              </Row>
            </Content>
          </div>
        </Spin>
      </Content>
      <AddLocationModal
        open={addModalOpen}
        locations={locations}
        setLocations={setLocations}
        setModalOpen={setAddModalOpen}
        uploadProps={uploadProps}
        uploadFile={uploadFile}
        additionLocatoins={additionLocatoins}
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

export default connect(mapStateToProps, undefined)(PartnerLocations);
