import { CheckOutlined } from "@ant-design/icons";
import {
  Button,
  Space,
  Typography,
  Tooltip
} from "antd";
import React, { useEffect, useState } from "react";
import useMedia from "@/hooks/useMedia";

const { Text } = Typography;

const CheckInArrivalExpired = ({ arrvialID, text, notify }) => {
  const [like, setLike] = useState(text);
  const isWebDevice = useMedia('(min-width:700px)');
  useEffect(() => {
    setLike(text);
  }, [text]);
  return (
    <Tooltip placement="top" title="Check In">
      <li className="list-inline-item me-3 float-end">
        <i className="bx bx-check-square me-1 tcl-darkblue fs-4" />
        <span className="fs-6 tcl-darkblue">{like}</span>
      </li>
    </Tooltip>
  );
};

export default CheckInArrivalExpired;
