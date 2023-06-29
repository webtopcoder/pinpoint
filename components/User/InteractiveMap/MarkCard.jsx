import { Button, Card, Typography, Image, Tag, Space } from "antd";
import { ArrowRightOutlined, RollbackOutlined, ClockCircleOutlined } from '@ant-design/icons';
import React from "react";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";

const { Meta } = Card;
const { Title, Paragraph } = Typography;

function MarkCard({
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
        width: 500,
      }}
      actions={[
        <Button type="primary" onClick={() => {
          router.push(`${baseUrl}/profile/${item.partner?._id}/locations/${item._id}`)
        }} icon={<ArrowRightOutlined />} ghost>View Location</Button>,
        <Button type="primary" icon={<RollbackOutlined />} loading={loading}
          onClick={handleDirections} ghost>Get Direction</Button>,
      ]}
    >
      <Meta
        style={{
          textAlign: 'left',
        }}
        avatar={<Image width={200} src={`${faviconUrl}/avatar/${item?.arrivalImages[0]?.filepath}`} />}
        title={<Title level={2}>{item?.title}</Title>} description={
          <Space direction="vertical">
            <Paragraph>{item?.description}</Paragraph>
            <Tag icon={<ClockCircleOutlined />} color="#55acee">
              {new Date(item?.departureAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                hour12: true,
                minute: "2-digit",
                second: "2-digit",
              })}
            </Tag>
          </Space>} />
    </Card>
  );
}

export default MarkCard;