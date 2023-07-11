import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Upload,
  Col,
  Row,
  Divider,
  Button,
  Modal,
  Typography,
  Form,
  Input,
  Select,
  Space
} from "antd";
import food from "@/public/images/landing/food.png";
import { UploadOutlined } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";
import { locationService, categoryService } from "@/services/index";
import useMedia from "@/hooks/useMedia";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

function AddLocationModal({
  open,
  user_id,
  setModalOpen,
  uploadProps,
  uploadFile,
  setLocations,
  additionLocatoins,
  userCategoryId
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();
  const [subCategories, setsubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetSubCategories();
  }, []);

  async function GetSubCategories() {
    const res = await categoryService.getSubcategory(userCategoryId);
    const subcategoryList = res?.subCategories.map((item) => ({
      label: item.name,
      value: item._id,
    }));
    await setsubCategories(subcategoryList);
  }

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={open}
      width={700}
      closable={false}
      onCancel={() => setModalOpen(false)}
      footer={null}
    >
      <Row>
        <Col xs={0} sm={0} md={8} lg={0} xl={0}></Col>
        <Col
          xs={24}
          sm={24}
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
            Add Location
          </Title>
          <Paragraph>
            A Location is a specific location of a business. <br /> You may have
            multiple locations and this will act as their individual profile.
          </Paragraph>
        </Col>
        <Col
          xs={0}
          sm={0}
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
      <Form
        form={form}
        onFinish={async (values) => {
          setLoading(true);
          const formData = new FormData();
          uploadFile.map((file) =>
            formData.append("images", file.originFileObj)
          );
          formData.append("title", values.title);
          formData.append("description", values.description);
          formData.append("subCategories", values.subCategories);
          await locationService.AddLocation(formData)
            .then(async () => {
              await setLoading(false);
              notify("success", "Location added successfully");
              form.resetFields();

              await locationService.getLocations({ partner: user_id, isActive: null })
                .then(async (res) => {
                  if (additionLocatoins.length > 0) {
                    const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
                    await setLocations(filteredData);
                  }
                  else
                    await setLocations(res.results);
                })
                .catch((error) => {
                  notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                  );
                  return;
                });
            })
            .catch((error) => {
              setLoading(false);
              notify(
                "error",
                error?.response?.data?.message || "Something went wrong"
              );
              return;
            });
        }}
        layout="vertical"
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Location Name"
              rules={[
                {
                  required: true,
                  message: "Please Insert Location Name",
                },
              ]}
              required
              name="title"
            >
              <Input placeholder="This will be your individual locations name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Location Sub Category"
              rules={[
                {
                  required: true,
                  message: "Please Choose Subcategory",
                  type: "array",
                },
              ]}
              required
              initialvalue={[]}
              tooltip="This is a required field"
              name="subCategories"
            >
              <Select
                mode="multiple"
                showSearch={false}
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Select all that apply"
                options={subCategories}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please type the Location Description.",
                },
              ]}
              label="Location Description" name="description">
              <TextArea
                placeholder="Anything you want your customers to know"
                rows={4}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please Upload the Location Photo.",
                },
              ]}
              name="images">
              <Row>
                <Col span={8}>
                  <Upload method="get" listType="picture" {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      style={{ marginRight: 10 }}
                    >
                      Location Image
                    </Button>
                  </Upload>
                </Col>
                <Col span={8} offset={8}>
                  <Space style={{
                    float: "right",
                  }}>
                    <Button
                      type="primary"
                      danger
                      onClick={() => setModalOpen(false)}
                      className="btn-submit"
                    >
                      Cancel
                    </Button>
                    <Button
                      loading={loading}
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                      style={{
                        display: "initial",
                        float: "right",
                      }}
                    >
                      Add Location
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

export default AddLocationModal;
