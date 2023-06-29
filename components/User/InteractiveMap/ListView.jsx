import { Col, Row, Modal, Table, Tag, Button, Tabs } from "antd";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/router";
import useMedia from "@/hooks/useMedia";

function ListViewModal({
    open,
    setModalOpen,
    locations,
    alllocations
}) {
    const router = useRouter();
    const isWebDevice = useMedia('(min-width:700px)');
    const columns = [
        {
            key: '0',
            width: '15%',
            title: "Partner Name",
            dataIndex: "partner",
            render(partner) {
                return <span>{partner?.username}</span>;
            },
            responsive: isWebDevice ? false : ["xs"]

        },
        {
            key: '1',
            width: '9%',
            title: "Location Name",
            dataIndex: "title",
            responsive: isWebDevice ? false : ["xs"]

        },
        {
            key: '2',
            title: "City",
            width: '7%',
            dataIndex: "mapLocation",
            render(mapLocation) {
                return <span>{mapLocation?.city ?? ""}</span>;
            },
            responsive: isWebDevice ? false : ["xs"]

        },
        {
            key: '3',
            title: "State",
            width: '7%',
            dataIndex: "mapLocation",
            render(mapLocation) {
                return <span>{mapLocation?.state ?? ""}</span>;
            },
            responsive: isWebDevice ? false : ["xs"]

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
            responsive: isWebDevice ? false : ["xs"]
        },
        {
            key: '5',
            width: '8%',
            title: "Rating",
            dataIndex: "rating",
            render(rating) {
                return <span>{rating?.toFixed(1)}</span>;
            },
            responsive: isWebDevice ? false : ["xs"]

        },
        {
            key: '6',
            title: "Sign Up Date",
            dataIndex: "createdAt",
            render(createdAt) {
                return <span>{formatDate(createdAt)}</span>;
            },
            responsive: isWebDevice ? false : ["xs"]

        },
        {
            key: '7',
            width: '8%',
            title: "Actions",
            dataIndex: "_id",
            fixed: "right",
            render(_, record) {
                return (
                    <a onClick={() => router.push(`/profile/${record?.partner?._id}/locations/${record?._id}`)}>
                        <Button>
                            View Location
                        </Button>
                    </a>
                );
            },
            responsive: isWebDevice ? false : ["xs"]

        },
    ];

    const items = [
        {
            key: 100,
            label: `Filtered Locations`,
            children: <>
                <Table
                    dataSource={locations}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                    scroll={{ x: 1100, y: 650 }}
                />

            </>,
        },
        {
            key: 101,
            label: `All`,
            children: <>
                <Table
                    dataSource={alllocations}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                    scroll={{ x: 1100, y: 650 }}
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
            closable={true}
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
