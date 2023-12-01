//optimized
import React from "react";
import { Button, Card, Image, Space } from "antd";
import { ArrowRightOutlined, RollbackOutlined } from '@ant-design/icons';
import { apiBaseUrl } from "@/utils/baseUrl";
import { getDiffToNow } from "@/utils/date";

const { Meta } = Card;
const faviconUrl = `${apiBaseUrl}`;

const MarkCard = ({ item, router, handleDirections, loading }) => {
  const formattedLocationName = item?.title?.replace(/\s+/g, '-');

  const handleCardClick = () => {
    router.push(`/profile/${item.partner?._id}/locations/${formattedLocationName}`);
  };

  return (
    <Card
      hoverable
      style={{ width: 300 }}
      actions={[
        <Space size="large" key="card-actions">
          <Button
            size="middle"
            type="primary"
            onClick={handleCardClick}
            icon={<ArrowRightOutlined />}
            danger
          >
            View
          </Button>
          <Button
            type="primary"
            icon={<RollbackOutlined />}
            loading={loading}
            onClick={handleDirections}
            danger
            key="direction-button"
          >
            Direction
          </Button>
        </Space>,
      ]}
    >
      <Meta
        style={{ textAlign: 'left' }}
        avatar={<Image width={70} src={`${faviconUrl}/avatar/${item?.arrivalImages[0]?.filepath}`} />}
        title={<p className="fs-4 text-dark">{item?.title}</p>}
        description={
          <Space size="small" direction="vertical">
            <p className="text-dark font-size-16">{item?.description}</p>
            <p>{getDiffToNow(item?.departureAt)} ago</p>
          </Space>
        }
      />
    </Card>
  );
};

export default MarkCard;
