import { LikeOutlined } from "@ant-design/icons";
import {
  Button,
  Space,
  Typography,
  Tooltip
} from "antd";
import React, { useEffect, useState } from "react";
import useMedia from "@/hooks/useMedia";
import { locationService } from "@/services/index";

const { Text } = Typography;

const LikeArrvial = ({ arrvialID, text, user_id, notify }) => {
  const [like, setLike] = useState(text);
  const isWebDevice = useMedia('(min-width:700px)');
  useEffect(() => {
    setLike(text);
  }, [text]);
  return (
    <Space style={{
      float: isWebDevice ? '' : 'right'
    }}>
      <Tooltip placement="top" title="Like">
        <Button
          type="primary"
          onClick={async () => {
            if (!user_id) {
              notify(
                "error",
                "Please login"
              );
              return;
            }
            await locationService.likeArrival(arrvialID)
              .then(async (res) => {
                if (res.liked) {
                  setLike((like) => like + 1);
                } else {
                  setLike((like) => (like ? like - 1 : like));
                };
              })
              .catch((error) => {
                console.log(error);
                return;
              });
          }}
          shape="circle"
          icon={<LikeOutlined />}
        />
      </Tooltip>
      <Text>{like}</Text>
    </Space>
  );
};

export default LikeArrvial;
