import React from "react";
import { Button, Space, Drawer } from "antd";
import ToolBanner from "@/components/User/InteractiveMap/ToolBanner";

function FilterDrawer({
  open,
  setPosition,
  onClose,
  loading,
  getCurrentLocation,
  onChange,
  inputValue,
  onFinish
}) {

  return (
    <Drawer
      mask={false}
      maskClosable={false}
      title="Instruction"
      placement="left"
      onClose={onClose}
      open={open}
      width={500}
      zIndex="2"
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      }
    >
      <ToolBanner
        setPosition={setPosition}
        getCurrentLocation={getCurrentLocation}
        onChange={onChange}
        inputValue={inputValue}
        onFinish={onFinish}
        onClose={onClose}
      />
    </Drawer>
  );
}

export default FilterDrawer;