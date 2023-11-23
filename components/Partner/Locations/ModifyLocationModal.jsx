import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import useNotify from "@/hooks/useNotify";
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
  Popconfirm,
  Checkbox
} from "antd";
import { apiBaseUrl } from "@/utils/baseUrl";
import useMedia from "@/hooks/useMedia";
import { locationService, categoryService } from "@/services/index";
import classnames from "classnames";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const avatarurl = `${apiBaseUrl}/avatar/`;
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

function ModifyModal({
  uploadProps,
  modalOpen,
  setModalOpen,
  locationInfo,
  user_id,
  uploadFile,
  userCategoryId,
  setLocations,
  additionLocatoins,
  initialize
}) {

  const [form] = Form.useForm();
  const { notify } = useNotify();
  const isWebDevice = useMedia('(min-width:700px)');
  const [subCategories, setsubCategories] = useState([]);
  const [checkNick, setCheckNick] = useState(locationInfo?.poll ? true : false);
  const onCheckboxChange = (e) => {
    setCheckNick(e.target.checked);
  };

  useEffect(() => {
    if (userCategoryId) {
      GetSubCategories();
    }
  }, [userCategoryId]);

  useEffect(() => {
    const initialValues = [...new Set(locationInfo?.poll?.options?.map(item => item.optionText))];
    form.setFieldsValue({ polls: initialValues });
  }, [modalOpen]);

  
  async function GetSubCategories() {
    const res = await categoryService.getSubcategory(userCategoryId)
    const subcategoryList = res?.subCategories.map((item) => ({
      label: item.name,
      value: item._id,
    }));
    await setsubCategories(subcategoryList);
  }

  // async function initialize(status) {
  //   await locationService.getLocations({ partner: user_id, isActive: status })
  //     .then(async (res) => {
  //       if (additionLocatoins.length > 0) {
  //         const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
  //         await setLocations(filteredData);
  //       }
  //       else
  //         await setLocations(res.results);
  //       console.log(res.results)

  //     })
  //     .catch((error) => {
  //       notify(
  //         "error",
  //         error?.response?.data?.message || "Something went wrong"
  //       );
  //       return;
  //     });
  // }

  async function delete_location(e, id) {
    e.preventDefault();
    await locationService.DeleteLocation(id)
      .then(async () => {
        setModalOpen(false);
        notify("success", "Location Deleted successfully");
        await initialize();
      })
      .catch((error) => {
        setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });

  };

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={modalOpen}
      width={700}
      closable={true}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={null}
    >
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
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

      </Row>
      <Divider style={{}} dashed></Divider>
      <Form
        {...formItemLayoutWithOutLabel}
        form={form}
        onFinish={async (values) => {
          const formData = new FormData();
          uploadFile?.length > 0 &&
            uploadFile.map((file) =>
              formData.append("images", file.originFileObj)
            );
          formData.append("title", values.title);
          formData.append("description", values.description);
          formData.append("subCategories", values.subCategories);
          if (checkNick & values?.PollQuestion || values?.polls) {
            formData.append("question", values?.PollQuestion);
            formData.append("options", values?.polls);
          }

          await locationService.UpdateLocationByID(locationInfo._id, formData)
            .then(async () => {
              notify("success", "Location Updated successfully");
              await initialize();
            })
            .catch((error) => {
              notify(
                "error",
                error?.response?.data?.message || "Something went wrong"
              );
              return;
            });
        }}
        layout="vertical"
        fields={[
          {
            name: ["title"],
            value: locationInfo.title,
          },
          {
            name: ["description"],
            value: locationInfo.description,
          },
          {
            name: ["subCategories"],
            value: locationInfo.subCategories?.map(
              (item) => item._id
            ),
          },
          {
            name: ["PollQuestion"],
            value: locationInfo?.poll?.question,

          },
        ]}
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
              tooltip="This is a required field"
              name="subCategories"
            >
              <Select
                mode="multiple"
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
            <Form.Item label="Location Description" name="description">
              <TextArea
                placeholder="Anything you want your customers to know"
                rows={4}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} >
            <Form.Item>
              <Checkbox checked={checkNick} onChange={onCheckboxChange}>
                You have any Poll for this location?
              </Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className={classnames({ 'd-none': !checkNick })}>
            <Form.Item
              label="Poll Question"
              name="PollQuestion"
            >
              <Input placeholder="Poll Question" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className={classnames({ 'd-none': !checkNick })}>
            <Form.List
              name="polls"
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      label={index === 0 ? 'Poll Options' : ''}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            whitespace: true,
                            message: "Please input poll's title or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="Poll Title"
                          style={{
                            width: '60%',
                          }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{
                        width: '60%',
                      }}
                      icon={<PlusOutlined />}
                    >
                      Add Poll
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name="images">
              <Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Upload
                    method="get"
                    listType="picture"
                    maxCount={1}
                    defaultFileList={
                      locationInfo.images.length > 0
                        ? [
                          {
                            uid: "0",
                            name: locationInfo.images[0]?.filepath,
                            status: "done",
                            url: avatarurl + locationInfo.images[0]?.filepath,
                            thumbUrl:
                              avatarurl + locationInfo.images[0]?.filepath,
                          },
                        ]
                        : ""
                    }
                    {...uploadProps}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{ marginRight: 10 }}
                    >
                      Change Location Image
                    </Button>
                  </Upload>
                </Col>
                <Col
                  xs={24} sm={24} md={16} lg={16} xl={16}
                  style={{
                    textAlign: isWebDevice ? "right" : 'center',
                    marginTop: isWebDevice ? 0 : 10
                  }}
                >
                  <Space>
                    <Popconfirm
                      title="Delete this Location"
                      description="Are you sure to delete?"
                      okText="Yes"
                      onConfirm={(e) => {
                        delete_location(e, locationInfo._id)
                      }}
                      cancelText="No"
                    >
                      <Button
                        hidden={locationInfo?.isActive || additionLocatoins.length > 0 ? true : false}
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
                    </Popconfirm>

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

const mapStateToProps = ({ user, profile }) => ({
  user_id: user.user_id,
  userCategoryId: profile?.userinfo?.category?._id,
});


export default connect(mapStateToProps)(ModifyModal);
