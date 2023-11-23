import { UploadOutlined, FormOutlined } from "@ant-design/icons";
import Image from "next/image";
import {
  Button,
  Typography,
  Form,
  Row,
  Col,
  Upload,
  Rate,
  Mentions,
  message
} from "antd";
import food from "@/public/images/landing/food.png";
import React, { useEffect, useState } from "react";
import useMedia from "@/hooks/useMedia";
import useNotify from "@/hooks/useNotify";
import { locationService } from "@/services/index";

const { Text } = Typography;

function PostForm({ location, init, user_id }) {
  const [rating, setRating] = useState(0);
  const [postForm] = Form.useForm();
  const isWebDevice = useMedia('(min-width:700px)');
  const [uploadFile, setUploadFile] = useState([]);
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

  return (
    <div className="avatar-form">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Form
            form={postForm}
            initialValues={
              {
                rating: 0
              }
            }
            onFinish={async (values) => {
              if (!user_id) {
                notify(
                  "error",
                  "Please login"
                );
                return;
              }
              const formData = new FormData();
              formData.append("rating", rating);
              formData.append("text", values.text);
              uploadFile.forEach((file) => {
                formData.append("images", file.originFileObj);
              });

              await locationService.PostReview(location?.location?._id, formData)
                .then(async () => {
                  postForm.resetFields();
                  setRating(0);
                  setUploadFile([]);
                  notify("success", "Review posted successfully");
                  await init();
                })
                .catch((error) => {
                  console.log(error);
                  return;
                });
            }}
            layout="vertical"
            autoComplete="off"
          >

            <Form.Item
              name="text"
              rules={[
                {
                  required: true,
                  message: "Please input Message!",
                },
                {
                  whitespace: true,
                  message: "Please input Message!",
                },
              ]}
            >
              <Mentions
                rows={7}
                style={{
                  width: "100%",
                }}
                placeholder="Just a quick description about your arrival today!"
              />
            </Form.Item>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Item name="images">
                  <Upload listType="picture" method="get" {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      style={{ marginRight: 10 }}
                    >
                      Photo
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={11} sm={11} md={11} lg={11} xl={11} offset={isWebDevice ? 0 : 1} >
                <Form.Item name="rating">
                  <Rate
                    allowHalf
                    tooltips={[
                      "terrible",
                      "bad",
                      "normal",
                      "good",
                      "wonderful",
                    ]}
                    onChange={setRating}
                    value={rating}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={7} lg={7} xl={7} offset={isWebDevice ? 0 : 11} >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-submit"
                  style={{
                    display: "initial",
                    float: "right",
                  }}
                  icon={<FormOutlined />}
                >
                  POST
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
