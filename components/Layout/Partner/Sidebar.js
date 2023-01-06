import React, { useEffect, useState } from "react";
import {
    UserOutlined,
    MessageFilled,
    DashboardFilled,
    SettingFilled,
    ProfileFilled,
    ContactsFilled,
    EnvironmentFilled,
    UnorderedListOutlined
} from '@ant-design/icons';
import { Layout, Menu, Avatar } from 'antd';

const { Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Dashboard', '1', <DashboardFilled />),
    getItem('Followers', '2', <UnorderedListOutlined />),
    getItem('Messages', 'sub1', <MessageFilled />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Settings', 'sub2', <SettingFilled />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Parter Locations', '9', <EnvironmentFilled />),
    getItem('View Profile', '10', <ProfileFilled />),
    getItem('Contact Pinpoint', '11', <ContactsFilled />),
];

function LeftSidebar() {

    const [collapsed, setCollapsed] = useState(false);
  
    return (
        <>
            <Sider style={{
                background: '#2F2F2F'
            }} collapsible width={270} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="avatar-panel">

                    <div className="partner-avatar-center">
                        <div className="rightsidebar-avatar">
                            <Avatar style={{
                                border: '3px solid gray'
                            }} size={150} icon={<UserOutlined />} />

                        </div>
                    </div>

                </div>
                <div className="avatar-vst-profile">
                    Business Name
                </div>
                <div className="vst-edit-profile">
                    edit profile
                </div>
                <Menu style={{
                    background: '#2F2F2F',
                    fontSize: '15px'
                }} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
        </>
    );
};

export default LeftSidebar;
