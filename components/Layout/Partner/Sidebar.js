import React, { useEffect, useState } from "react";
import {
    UserOutlined,
    MessageFilled,
    DashboardFilled,
    SettingFilled,
    ProfileFilled,
    ContactsFilled,
    EnvironmentFilled,
    UnorderedListOutlined,
    InfoCircleFilled,
    ExportOutlined
} from '@ant-design/icons';
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import { Layout, Menu, Avatar, Space, Badge, Drawer, List, Button } from 'antd';
import { logout } from '@/src/redux/User/actions';

const data = [
    '@codydixon5 posted a review to Example Food Truck #3',
    '@keendawg posted a photo on Example Food Truck #3',
    '@codydixon5 requested to follow you',
    '@codydixon5 started following Example Food Truck #2',
    '@codydixon5 liked a comment on Example Food Truck #2',
];

const count = 3;

const { Sider } = Layout;

const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}


function LeftSidebar({ onLogout }) {

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('left');

    const [token, setToken] = useState(null);

    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    const router = useRouter()
    const pathurl = router.pathname;

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onChange = (e) => {
        setPlacement(e.target.value);
    };

    const [current, setCurrent] = useState(pathurl);

    const onClick = (e) => {
        setCurrent(e.key);
        router.push(e.key);
    };

    const handleOriginPageRender = (page) => {
        router.push(page);
    }

    const user_id = '';
    const businessName = '';
    if (typeof window !== 'undefined') {
        user_id = sessionStorage.getItem('user_id')
        businessName = sessionStorage.getItem('username')
    }

    const items = [
        getItem('Dashboard', '/partner/dashboard', <DashboardFilled />),
        getItem('Messages', '/partner/message', <MessageFilled />),
        getItem('Followers', `/partner/${user_id}/followers`, <UnorderedListOutlined />),
        getItem('Settings', `/partner/settings`, <SettingFilled />),
        // getItem('Settings', 'sub2', <SettingFilled />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Parter Locations', '9', <EnvironmentFilled />),
        getItem('View Profile', '10', <ProfileFilled />),
        getItem('Contact Pinpoint', '11', <ContactsFilled />),
    ];
    useEffect(() => {
        if (router.pathname.indexOf('/partner/settings') > -1) {
            setCurrent(router.pathname)
        }
    }, [router.pathname])
    useEffect(() => {
        setToken(sessionStorage.getItem('token'));
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, []);

    const [collapsed, setCollapsed] = useState(false);
    const onLogoutHandler = () => {
        onLogout(res => {
            setToken(null);
            router.push('/home');
        })
    }

    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                    name: {},
                    picture: {},
                })),
            ),
        );
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                setData(newData);
                setList(newData);
                setLoading(false);
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;

    return (
        <>
            <Sider style={{
                background: '#2F2F2F'
            }} collapsible width={270} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                {!collapsed ? <>
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
                        {businessName}
                    </div>
                    <div className="vst-edit-profile" onClick={() => handleOriginPageRender(`/partner/${user_id}/edit`)}>
                        edit profile
                    </div>
                    <div className="vst-edit-profile">
                        <Space size='large' style={{
                            textAlign: 'center'
                        }}>
                            <Badge dot>
                                <Avatar shape="square" onClick={showDrawer} size="large" icon={<InfoCircleFilled style={{
                                    fontSize: 30
                                }} />} />
                            </Badge>
                            <Avatar shape="square" onClick={() => onLogoutHandler()} size="large" icon={<ExportOutlined style={{
                                fontSize: 30
                            }} />} />
                        </Space>
                    </div></> :
                    <div className="avatar-panel-collapse">
                        <div className="partner-avatar-center">
                            <div className="rightsidebar-avatar-collapse">
                                <Avatar style={{
                                    border: '3px solid gray'
                                }} size={50} icon={<UserOutlined />} />
                            </div>
                        </div>
                    </div>}
                <Menu
                    style={{
                        background: '#2F2F2F',
                        fontSize: '15px'
                    }}
                    selectedKeys={[current]}
                    theme="dark"
                    mode="inline"
                    items={items}
                    onClick={onClick}
                />
            </Sider>
            <Drawer
                title="Notifications"
                placement='left'
                closable={true}
                onClose={onClose}
                open={open}
                key={placement}
                bodyStyle={{
                    background: 'black'
                }}
                headerStyle={{
                    color: 'white',
                }}
            >
                <List
                    loadMore={loadMore}
                    loading={initLoading}
                    size="small"
                    dataSource={list}
                    renderItem={(item) => <List.Item style={{
                        color: 'white',
                        borderBlockEnd: '1px solid white'
                    }}>@codydixon5 posted a review to Example Food Truck #3</List.Item>}
                />
            </Drawer>
        </>
    );
};

const mapStateToProps = state => {
    return {
        ...state.Layout,
        token: state.user.token,
    };
};

const mapDispatchToProps = dispatch => ({
    onLogout: (cb) => dispatch(logout(cb))
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);

