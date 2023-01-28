import food from "@/public/images/landing/food.png";
import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Modal,
  Row,
  Col,
  Typography,
  Input,
  Divider,
  Select,
  Upload,
  Button,
  Space,
} from "antd";
import Image from "next/image";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const subcategoryList = [];
for (let i = 10; i < 36; i++) {
  subcategoryList.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

function ModifyModal({
  open: modifyModalOpen,
  setModalOpen: setModifyModalOpen,
  uploadProps,
}) {
  const [form] = Form.useForm();
  return (
    <Modal
      className="dashboard-modal"
      centered
      open={modifyModalOpen}
      width={700}
      closable={false}
      onOk={() => setModifyModalOpen(false)}
      onCancel={() => setModifyModalOpen(false)}
      footer={null}
    >
      <Row>
        <Col xs={0} sm={0} md={8} lg={0} xl={0}></Col>
        <Col
          xs={20}
          sm={20}
          md={8}
          lg={22}
          xl={22}
          style={{
            margin: "auto",
            textAlign: "center",
          }}
        >
          <Title
            style={{
              textAlign: "center",
              fontWeight: 900,
            }}
            level={2}
          >
            Modify Location
          </Title>
          <Paragraph>
            A Location is a specific location of a business. <br /> You may have
            multiple locations and this will act as their individual profile.
          </Paragraph>
        </Col>
        <Col
          xs={4}
          sm={4}
          md={8}
          lg={2}
          xl={2}
          style={{
            textAlign: "right",
          }}
        >
          <Image src={food} alt="Snow" width={50} height={70} />
        </Col>
      </Row>
      <Divider style={{}} dashed></Divider>
      <Form form={form} layout="vertical">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Location Name" required name="requiredMarkValue">
              <Input placeholder="This will be your individual locations name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Partner Location"
              required
              tooltip="This is a required field"
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Select all that apply"
                options={subcategoryList}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Location Description">
              <TextArea
                placeholder="Anything you want your customers to know"
                rows={4}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name="fileupload">
              <Row>
                <Col span={8}>
                  <Upload listType="picture" {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      style={{ marginRight: 10 }}
                    >
                      Location Image
                    </Button>
                  </Upload>
                </Col>
                <Col
                  span={16}
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                      style={{
                        display: "initial",
                        float: "right",
                      }}
                      danger
                    >
                      Delete Location
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                      style={{
                        display: "initial",
                        float: "right",
                      }}
                    >
                      Save Changes
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ModifyModal;
