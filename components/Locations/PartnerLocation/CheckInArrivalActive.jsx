import { CheckOutlined } from "@ant-design/icons";
import { Button, Space, Typography, Tooltip, Modal } from "antd";
import React, { useEffect, useState } from "react";
import useMedia from "@/hooks/useMedia";
import { locationService } from "@/services/index";

const { Text } = Typography;

const CheckInArrival = ({ arrvialID, text, notify, distance, setCheckIncounts }) => {
  const error = () => {
    Modal.error({
      title: "You can't check in this location.",
      content: 'Your current location is more than 0.25 miles away from the target.',
    });
  };

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
          type="primary"
          onClick={async () => {
            console.log(distance)
            distance > 0.25 ? error() :
              await locationService.CheckInArrival(arrvialID)
                .then(async (res) => {
                  if (res.type === "success")
                    await setCheckIncounts(text + 1);
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
          icon={<CheckOutlined />}
        >Check In</Button>
      </Tooltip>
      <Text>{like}</Text>
    </Space>
  );
};

export default CheckInArrival;