import { Button, Card, Typography, Image, Tag, Space, Descriptions } from "antd";
import { ArrowRightOutlined, RollbackOutlined, TagFilled } from '@ant-design/icons';
import React from "react";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import { formatDateEvent } from "@/utils/date";

const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

function MarkCardArea({
  item,
  router,
  handleDirections,
  loading,
}) {
  const faviconUrl = `${apiBaseUrl}`;
  return (
    <Card
      hoverable
      style={{
        width: 400,
      }}
      bodyStyle={{
        padding: '15px'
      }}
      cover={item?.images?.length > 0 ? <img style={{ height: 300 }} src={`${faviconUrl}/avatar/${item?.images[0]?.filepath}`} /> : ''}
      actions={[
        <Button type="primary" onClick={() => {
          router.push(`${baseUrl}/profile/${item?.event?.partner}/events/${item.event?._id}`)
        }} icon={<ArrowRightOutlined />} ghost>View Event</Button>,
        <Button type="primary" icon={<RollbackOutlined />} loading={loading}
          onClick={handleDirections} ghost>Get Direction</Button>,
      ]}
    >
      <Descriptions
        className="marker-description"
        title={<Title style={{
          marginBottom: 0,

        }} level={3}>Schedule Info</Title>}
        // title="Schedule Info"
        bordered
        layout="vertical"
        style={{
          textAlign: 'left'
        }}
      >
        <Descriptions.Item label={<Text type="success">Event</Text>} span={3}>{item?.title}</Descriptions.Item>
        <Descriptions.Item label={<Text type="success">Title</Text>} span={3}>{item?.event?.title}</Descriptions.Item>
        <Descriptions.Item label={<Text type="success">Date & Time</Text>} span={3}>{`${formatDateEvent(item?.startDate)} ~ ${formatDateEvent(item?.endDate)}`}</Descriptions.Item>
        <Descriptions.Item label={<Text type="success">Categories</Text>} span={3}>
          <Space size={[0, 'small']} wrap>
            {item?.categories
              ?.map((item) => <Tag icon={<TagFilled />} >{item.name}</Tag>)
            }
          </Space>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

export default MarkCardArea;