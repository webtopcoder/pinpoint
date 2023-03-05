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
  Input,
  List
} from "antd";
import food from "@/public/images/landing/food.png";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import LocationCard from "../LocationCard";
import { getLocations } from "@/src/redux/Location/actions";
import useNotify from "@/hooks/useNotify";
import AddLocationModal from "../Locations/AddLocationModal";


const { TextArea } = Input;

const { Title, Paragraph } = Typography;

const { Content } = Layout;

const PartnerLocations = ({ locations, user_id, ongetLocations }) => {

  const [loading, setLoading] = useState(false);

  const [uploadFile, setUploadFile] = useState([]);

  const [addModalOpen, setAddModalOpen] = useState(false);

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

  useEffect(() => {
    ongetLocations({ partner: user_id }, (_, error) => {
      if (error) {
        notify(
          "error",
          error?.response?.data?.message ?? "Something went wrong"
        );
      }
    });
  }, []);

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content
        style={{
          margin: "60px 40px",
        }}
      >
        <div className="site-card-wrapper">
          <Content className="custom-subcontent">
            <Row gutter={16}>
              <Col
                className="gutter-row"
                span={6}
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
              <Col className="gutter-row" span={12}>
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
                span={6}
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
              justify="space-around"
            >
              <Col className="gutter-row" span={24}>
                <List
                  grid={{
                    column: 3,
                  }}
                  dataSource={locations}
                  renderItem={(item) => (
                    <List.Item>
                      <LocationCard location={item} showActions={true} />
                    </List.Item>
                  )}
                />
              </Col>

            </Row>
          </Content>
        </div>
      </Content>

      <AddLocationModal
        open={addModalOpen}
        setModalOpen={setAddModalOpen}
        uploadProps={uploadProps}
        uploadFile={uploadFile}
      />
    </Layout>
  );
};

const mapStateToProps = ({ user, location }) => {
  return {
    locations: location.userLocations,
    user_id: user.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetLocations: (data, cb) => dispatch(getLocations(data, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerLocations);
