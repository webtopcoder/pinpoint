import React from "react";
import {
    Col,
    Row,
    Divider,
    Modal,
    Typography,
    Table,
    Tag,
    Button,
    Tabs
} from "antd";
import { formatDate } from "@/utils/date";
import baseUrl from "@/utils/baseUrl";

const { Title } = Typography;

function ListViewModal({
    open,
    setModalOpen,
    locations,
    alllocations
}) {

    const columns = [
        {
            title: "Partner Name",
            dataIndex: "partner",
            render(partner) {
                return <span>{partner?.username}</span>;
            },
        },
        {
            title: "Location Name",
            dataIndex: "title",
        },
        {
            title: "City",
            dataIndex: "mapLocation",
            render(mapLocation) {
                return <span>{mapLocation?.city ?? ""}</span>;
            },
        },
        {
            title: "State",
            dataIndex: "mapLocation",
            render(mapLocation) {
                return <span>{mapLocation?.state ?? ""}</span>;
            },
        },
        {
            title: "Sub Categories",
            dataIndex: "subCategories",
            render(subCategories) {
                return subCategories?.map((item) => (
                    <Tag color="success">{item?.name}</Tag>
                ));
            },
        },
        {
            title: "Rating",
            dataIndex: "rating",
            render(rating) {
                return <span>{rating.toFixed(1)}</span>;
            },
        },
        {
            title: "Sign Up Date",
            dataIndex: "createdAt",
            render(createdAt) {
                return <span>{formatDate(createdAt)}</span>;
            },
        },
        {
            title: "Actions",
            dataIndex: "_id",
            fixed: "right",
            render(_, record) {
                return (
                    <a
                        onClick={() =>
                            window.open(
                                baseUrl +
                                "/profile/" +
                                (record?.partner._id) +
                                "/locations/" +
                                record?._id,
                                "_blank"
                            )
                        }
                    >
                        <Button>
                            View Location
                        </Button>
                    </a>
                );
            },
        },
    ];

    const items = [
        {
            key: '1',
            label: `Filtered Locations`,
            children: <>
                <Table
                    dataSource={locations}
                    columns={columns}
                    pagination={false}
                    rowKey="_id"
                />
            </>,
        },
        {
            key: '2',
            label: `All`,
            children: <>
                <Table
                    dataSource={alllocations}
                    columns={columns}
                    pagination={false}
                    rowKey="_id"
                />
            </>,
        },
    ];
    return (
        <Modal
            className="dashboard-modal"
            centered
            open={open}
            width={1200}
            closable={false}
            onCancel={() => setModalOpen(false)}
            footer={null}
        >
            {/* <Row>
                <Col xs={0} sm={0} md={8} lg={0} xl={0}></Col>
                <Col
                    xs={20}
                    sm={20}
                    md={8}
                    lg={22}
                    xl={22}
                    style={{
                        margin: "auto",
                        textAlign: "center",
                    }}
                >
                    <Title
                        style={{
                            textAlign: "center",
                            fontWeight: 900,
                        }}
                        level={2}
                    >
                        Locations List
                    </Title>
                    <Divider style={{}} dashed></Divider>
                </Col>
                <Col
                    xs={4}
                    sm={4}
                    md={8}
                    lg={2}
                    xl={2}
                    style={{
                        textAlign: "right",
                    }}
                >
                </Col>
            </Row> */}
            <Row>
                <Col md={24} sm={24} xs={24}>
                    <Tabs
                        type="card"
                        items={items}
                    />

                </Col>
            </Row>
        </Modal>
    );
}

export default ListViewModal;
