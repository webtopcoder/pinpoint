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
            key: '0',
            title: "Partner Name",
            dataIndex: "partner",
            render(partner) {
                return <span>{partner?.username}</span>;
            },
        },
        {
            key: '1',
            title: "Location Name",
            dataIndex: "title",
        },
        {
            key: '2',
            title: "City",
            dataIndex: "mapLocation",
            render(mapLocation) {
                return <span>{mapLocation?.city ?? ""}</span>;
            },
        },
        {
            key: '3',
            title: "State",
            dataIndex: "mapLocation",
            render(mapLocation) {
                return <span>{mapLocation?.state ?? ""}</span>;
            },
        },
        {
            key: '4',
            title: "Sub Categories",
            dataIndex: "subCategories",
            render(subCategories) {
                return subCategories?.map((item) => (
                    <Tag color="success">{item?.name}</Tag>
                ));
            },
        },
        {
            key: '5',
            title: "Rating",
            dataIndex: "rating",
            render(rating) {
                return <span>{rating.toFixed(1)}</span>;
            },
        },
        {
            key: '6',
            title: "Sign Up Date",
            dataIndex: "createdAt",
            render(createdAt) {
                return <span>{formatDate(createdAt)}</span>;
            },
        },
        {
            key: '7',
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
            key: 1,
            label: `Filtered Locations`,
            children: <>
                <Table
                    dataSource={locations}
                    columns={columns}
                    pagination={false}
                    rowKey="id" />
            </>,
        },
        {
            key: 2,
            label: `All`,
            children: <>
                <Table
                    dataSource={alllocations}
                    columns={columns}
                    pagination={false}
                    rowKey="id" />
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
            <Row>
                <Col md={24} sm={24} xs={24}>
                    <Tabs
                        defaultActiveKey="1"
                        type="card"
                        items={items} />

                </Col>
            </Row>
        </Modal>
    );
}

export default ListViewModal;
