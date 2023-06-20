import { Drawer, Button, Space, Avatar, Segmented, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { apiBaseUrl } from "@/utils/baseUrl";
import useMedia from "@/hooks/useMedia";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function DirectionDrawer({
  open,
  onClose,
  loading,
  handleSeg
}) {

  const isWebDevice = useMedia('(min-width:700px)');
  const faviconUrl = `${apiBaseUrl}`;

  return (
    <Drawer
      mask={false}
      maskClosable={false}
      title="Instruction"
      placement={isWebDevice ? "right" : "bottom"}
      onClose={onClose}
      open={open}
      width={400}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      }
    >
      <Spin spinning={loading} indicator={antIcon}>
        <Segmented
          onChange={handleSeg}
          block="true"
          defaultValue="DRIVING"
          options={[
            {
              label: (
                <div
                  style={{
                    padding: 4,
                  }}
                >
                  <Avatar src={`${faviconUrl}/car.png`} />
                  <div>DRIVING</div>
                </div>
              ),
              value: 'DRIVING',
            },
            {
              label: (
                <div
                  style={{
                    padding: 4,
                  }}
                >
                  <Avatar src={`${faviconUrl}/bike.png`} />
                  <div>BICYCLING</div>
                </div>
              ),
              value: 'BICYCLING',
            },
            {
              label: (
                <div
                  style={{
                    padding: 4,
                  }}
                >
                  <Avatar src={`${faviconUrl}/walking.png`} />
                  <div>WALKING</div>
                </div>
              ),
              value: 'WALKING',
            },
            {
              label: (
                <div
                  style={{
                    padding: 4,
                  }}
                >
                  <Avatar src={`${faviconUrl}/bus.png`} />
                  <div>TRANSIT</div>
                </div>
              ),
              value: 'TRANSIT',
            },
          ]}
        />
        <div id="sidebar"></div>
      </Spin>
    </Drawer>
  );
}

export default DirectionDrawer;