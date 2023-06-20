import { CheckOutlined } from "@ant-design/icons";
import {
  Button,
  Space,
  Typography,
  Tooltip
} from "antd";
import React, { useEffect, useState } from "react";
import useMedia from "@/hooks/useMedia";
import { eventService, locationService } from "@/services/index";

const { Text } = Typography;

const CheckInArrivalExpired = ({ arrvialID, text, notify }) => {
  const [like, setLike] = useState(text);
  const isWebDevice = useMedia('(min-width:700px)');
  useEffect(() => {
    setLike(text);
  }, [text]);
  return (
    <Space style={{
      float: isWebDevice ? '' : 'right'
    }}>
      <Tooltip placement="top" title="Check In">
        <Button
          disabled={true}
          type="primary"
          onClick={async () => {
            await eventService.CheckInArrival(arrvialID)
              .then(async (res) => {
                if (res.type === "success")
                  await setCheckIncounts(checkIncounts + 1);
                notify(res.type, res.message);
              })
              .catch((error) => {
                notify(
                  "error",
                  error?.response?.data?.message || "Something went wrong"
                );
                return;
              });
          }}
          shape="circle"
          icon={<CheckOutlined />}
        />
      </Tooltip>
      <Text>{like}</Text>
    </Space>
  );
};

export default CheckInArrivalExpired;
