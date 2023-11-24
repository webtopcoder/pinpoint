import React from "react";
import { Tag, Popover } from "antd"
import { Row, Col } from "reactstrap";
import { apiBaseUrl } from "@/utils/baseUrl";
import { useRouter } from "next/router";

const avatarurl = `${apiBaseUrl}/avatar/`;

function PopInfoWindowBox({ id, name, username, avatar, role, type }) {

    const router = useRouter();
    return (
        <a onClick={(e) => {
            e.stopPropagation();
            router.push(`/profile/${id}`)
        }} className="text-reset">
            <div className="d-flex p-3">
                <img
                    src={avatarurl + avatar}
                    className="me-3 rounded-circle avatar-lg"
                    alt="user-pic"
                />
                <div className="flex-grow-1">
                    <Row className="align-items-center">
                        <Col>
                            <h6 className="m-0 text-white">{name} </h6>
                        </Col>
                    </Row>
                    <div className="font-size-12 text-muted">
                        <p className="mb-1 text-white">
                            @{username}
                        </p>
                        <p className="mb-0">
                            <Tag color="#55acee">
                                {role}
                            </Tag>
                        </p>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default PopInfoWindowBox;
