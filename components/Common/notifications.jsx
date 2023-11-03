import React, { useState, useEffect } from "react";
import {
    Col, Row, Card, CardBody,
    PaginationItem,
    PaginationLink
} from "reactstrap";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { userService } from "@/services/index";
import { apiBaseUrl } from "@/utils/baseUrl";
import { formatDateNoti } from "@/utils/date";
import { map } from "lodash";

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);

const Notifications = () => {
    const avatarurl = `${apiBaseUrl}/avatar/`;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    async function handlePageClick(page) {
        await setPage(page);
    };

    async function notificationUpdateAll(flag) {
        await userService.notificationUpdateAll(flag)
            .then(async () => {
                initialize();
            })
            .catch((error) => {
                console.log(error);
                return;
            });
    };

    async function notificationUpdate(flag, id) {
        await userService.UpdatedNotifications(id, flag)
            .then((res) => {
                if (res.success) {
                    initialize();
                }
            })
            .catch((error) => {
                console.log(error);
                return;
            });
    };

    async function initialize() {
        setLoading(true);
        await userService.getNotifications({
            sort: "createdAt:desc",
            limit: 20,
            page: page,
            is_read: 'all'
        }).then(async (res) => {
            setTotalPage(res?.totalPages)
            setData(res?.results);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    };

    useEffect(async () => {
        initialize()
    }, [page]);

    return (
        <React.Fragment>
            <Col xl="12">
                <Card style={{
                    border: 'none',
                    margin: 10
                }}>
                    <CardBody>
                        <div className="p-3">
                            <Row className="align-items-center">
                                <div className="col-auto">
                                    <button
                                        onClick={() => notificationUpdateAll('mark')}
                                        type="button"
                                        className="btn btn-primary"
                                        style={{
                                            background: '#175594'
                                        }}
                                    >
                                        <i className="bx bx-list-check font-size-16 align-middle me-2"></i>{" "}
                                        Mark All Read
                                    </button>
                                </div>
                                <div className="col-auto">
                                    <button
                                        onClick={() => notificationUpdateAll('delete')}
                                        type="button"
                                        className="btn btn-danger "
                                    >
                                        <i className="bx bx-trash font-size-16 align-middle me-2"></i>{" "}
                                        Delete All
                                    </button>
                                </div>
                            </Row>
                        </div>
                        <Spin spinning={loading} indicator={antIcon}>
                            <ul className="list-group">
                                {data && data?.map((item, index) => (
                                    <li className="list-group-item border-1">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar-lg">
                                                    <span className="avatar-title rounded-circle bg-light">
                                                        {item?.actor ? <img src={avatarurl + item?.actor?.profile?.avatar?.filepath}
                                                            alt="" height="18" /> : <i className="bx bxs-user-circle d-xl-inline-block" style={{
                                                                fontSize: 70
                                                            }}></i>}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-14">{item?.actor?.businessname}</h5>
                                                <p className="text-muted">
                                                    {item?.description}
                                                </p>
                                                <div className="float-end">
                                                    <Row className="align-items-center">
                                                        <div className="col-auto">
                                                            <a className="small"
                                                                style={{
                                                                    pointerEvents: item?.is_read ? 'none' : '',
                                                                }}
                                                                role="button"
                                                                onClick={() => notificationUpdate('mark', item?._id)}>
                                                                {" "}
                                                                {item?.is_read ? "Marked Read" : 'Mark Read'}
                                                            </a>
                                                        </div>
                                                        <div className="col-auto">
                                                            <a
                                                                role="button"
                                                                onClick={() => notificationUpdate('delete', item?._id)}
                                                                className="small">
                                                                <a>Delete</a>
                                                            </a>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <p className="text-muted mb-0">
                                                    <i className="bx bx-calendar" />{" "}{formatDateNoti(item?.createdAt)} </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Spin>
                        <Row>
                            <Col lg="12">
                                <ul className="pagination pagination-rounded justify-content-center mt-2 mb-5">
                                    <PaginationItem disabled={page === 1}>
                                        <PaginationLink
                                            previous
                                            href="#"
                                            onClick={() => handlePageClick(page - 1)}
                                        />
                                    </PaginationItem>
                                    {map(Array(totalPage), (item, i) => (
                                        <PaginationItem active={i + 1 === page} key={i}>
                                            <PaginationLink
                                                onClick={() => handlePageClick(i + 1)}
                                                href="#"
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem disabled={page === totalPage}>
                                        <PaginationLink
                                            next
                                            href="#"
                                            onClick={() => handlePageClick(page + 1)}
                                        />
                                    </PaginationItem>
                                </ul>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default Notifications;
