import { useEffect, useState } from "react";
import useNotify from "@/hooks/useNotify";
import {
    Row,
    Col,
    Card,
    CardBody,
} from "reactstrap"
import {
    Button, Popconfirm, Space, Tag, Switch
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddUserModal from "./addModal";
import EditUserModal from "./editModal";
import { settingService, locationService } from "@/services/index";
import { map } from "lodash";

const index = () => {
    const { notify } = useNotify();
    const [showAddModal, setShowAddModal] = useState(false);
    const [additionalUsers, setadditionalUsers] = useState();
    const [locations, setLocations] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleAddCancel = () => setShowAddModal(false);
    const handleEditCancel = () => setShowEditModal(false);

    const handleOk = () => {
        setShowAddModal(false);
    };

    async function getSettingUsers() {
        const result = await settingService.GetSettingsValue();
        const filtered = result?.results?.find(
            (setting) => setting.key == "user:additionalUser"
        );
        await setLoading(false);
        if (filtered?.extra) {
            await setadditionalUsers(filtered.extra);
        }
        const res_locations = await locationService.getLocations({ partner: localStorage.getItem('user_id'), isActive: null });
        await setLocations(res_locations.results)
    }

    async function handleCheck(checked, id) {
        await settingService.updateAdditionalUser(id, { status: checked ? 'active' : 'inactive' });
        await getSettingUsers();
    };

    useEffect(() => {
        getSettingUsers();
    }, []);

    async function handleDelete(e, id) {
        e.preventDefault();
        await settingService.deleteAdditionUser(id);
        await getSettingUsers();
        notify("success", "Settings Changed.");
    };

    return (
        <>

            <Row className="mb-4">
                <Col lg={12}>
                    <div className="d-flex align-items-center">
                        <div className="ms-3 flex-grow-1 desktop">
                            <h5 className="mb-2 card-title">Additional Users</h5>
                        </div>
                        <div>
                            <a className="btn btn-primary bg-darkblue"
                                onClick={() => setShowAddModal(true)}
                            ><i className="bx bx-plus align-middle"></i> Add Assistant</a>
                        </div>
                    </div>
                </Col>
            </Row>
            {map(additionalUsers, (user, key) => {
                return <Card key={user?._id} className="bg-f8fbff">
                    <CardBody>
                        <Row>
                            <Col lg="5">
                                <div className="d-flex">
                                    <div className="flex-grow-1 align-self-center">
                                        <div className="text-muted">
                                            <p className="mb-1 font-size-16">{user?.email}{"  "}
                                                <Tag color="green" >{user.role}</Tag>
                                                <Tag color={user.status === "pending" ? "magenta" : (user.status === "active" ? 'green' : 'red')}>{user.status}</Tag>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="7" className="text-end">
                                <Space>
                                    {user.status !== "pending" ? <Switch checkedChildren="Active" onChange={(checked) => handleCheck(checked, user._id)} unCheckedChildren="Inactive" defaultChecked={user.status === "active" ? true : false} />
                                        : ""}
                                    <Button type="primary" onClick={async () => {
                                        await setUserInfo(user);
                                        await setShowEditModal(true);
                                    }} icon={<EditOutlined />}>Edit</Button>
                                    <Popconfirm
                                        title="Delete User?"
                                        description="Are you sure to delete this user?"
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={(e) => handleDelete(e, user._id)}
                                    >
                                        <Button
                                            type="primary"
                                            icon={<DeleteOutlined />}
                                            danger
                                        >
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                </Space>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            }
            )}
            <AddUserModal
                modal={showAddModal}
                onOk={handleOk}
                getSettingUsers={getSettingUsers}
                locations={locations}
                onCancel={handleAddCancel}
            />
            <EditUserModal
                modal={showEditModal}
                onOk={handleOk}
                userinfo={userInfo}
                getSettingUsers={getSettingUsers}
                locations={locations}
                onCancel={handleEditCancel}
            />
        </>
    );
};

export default index;
