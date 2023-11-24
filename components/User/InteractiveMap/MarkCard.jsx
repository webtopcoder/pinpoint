import { Button, Card, Typography, Image, Tag, Space } from "antd";
import { ArrowRightOutlined, RollbackOutlined, ClockCircleOutlined } from '@ant-design/icons';
import React from "react";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import { getDiffToNow } from "@/utils/date";
const { Meta } = Card;

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
        width: 300,
      }}
      actions={[
        <Space size="large">
          <Button size="middle" type="primary" onClick={() => {
            router.push(`${baseUrl}/profile/${item.partner?._id}/locations/${item._id}`)
          }} icon={<ArrowRightOutlined />} danger>View</Button>
          <Button type="primary" icon={<RollbackOutlined />} loading={loading}
            onClick={handleDirections} danger> Direction</Button>
        </Space>,
     
      ]}
    >
      <Meta
        style={{
          textAlign: 'left',
          marginBottom: 0
        }}
        avatar={<Image width={70} src={`${faviconUrl}/avatar/${item?.arrivalImages[0]?.filepath}`} />}
        title={<p className="fs-4 text-dark">{item?.title}</p>} description={
          <Space size="0" direction="vertical">
            <p className="text-dark font-size-16">{item?.description}</p>
            <p>{getDiffToNow(item?.departureAt)} ago</p>
          </Space>}
      />
    </Card>
  );
}

export default MarkCard;