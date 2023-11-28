import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Space,
  Col,
  Row,
  Divider,
  Button,
  Modal,
  Typography,
  Form,
  Input,
  Select,
  Upload,
  message
} from "antd";
import food from "@/public/images/landing/food.png";
import useNotify from "@/hooks/useNotify";
import { categoryService, eventService } from "@/services/index";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { Title, Paragraph } = Typography;

function UploadExcelModal({
  open,
  setModalOpen,
  schedule,
  setSchedule,
  scheduleId
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();
  const [loading, setLoading] = useState(false);

  const props = {
    name: 'xisx',
    async onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        const image_data = new FormData();
        image_data.append("xisx", info.file.originFileObj);
        await eventService.uploadExcel(scheduleId, image_data).then((res) => {
          setSchedule(res);
        }).catch((error) => {
          error?.response?.data?.message || "Something went wrong"
        });
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={open}
      width={700}
      closable={false}
      onCancel={() => setModalOpen(false)}
      footer={null}>
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
          }}>
          <Title
            style={{
              textAlign: "center",
              fontWeight: 900,
            }}
            level={2}>
            Import XISX File
          </Title>
          {/* <Paragraph>
            A Event is a specific location of your business. You can edit the details of this event if it changes location or you can create another Event if you constantly change locations. Each Event will have it’s own profile and Reviews.
          </Paragraph> */}
        </Col>
        <Col
          xs={0}
          sm={0}
          md={8}
          lg={2}
          xl={2}
          style={{
            textAlign: "right",
          }} >
          <Image src={food} alt="Snow" width={50} height={70} />
        </Col>
      </Row>
      <Divider style={{}} dashed></Divider>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        {/* <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other
          banned files.
        </p> */}
      </Dragger>
    </Modal>
  );
}

export default UploadExcelModal;
