import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Col, Card, CardTitle, CardBody, Button } from "reactstrap"
import { Avatar, Tooltip } from "antd";
import { profileService } from "@/services/index";
import useNotify from "@/hooks/useNotify";
import { apiBaseUrl } from "@/utils/baseUrl";

const avatarurl = `${apiBaseUrl}/avatar/`;

function index({
    user_id
}) {

    const { notify } = useNotify();
    const [data, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        profileService.getmyFollowers(user_id, {}, {})
            .then((res) => {
                if (res.success) {
                    setData(res.data.results?.filter(obj => obj.status === "active"));
                } else notify("error", "Something went wrong");
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }, []);

    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <Card className="overflow-hidden">
                        <div className="bg-darkblue bg-soft">
                            <Row>
                                <Col xs="6">
                                    <div className="text-white ptlrt-10">
                                        <h5 className="text-white">My followers</h5>
                                    </div>
                                </Col>
                                <Col xs="6">
                                    <div className="text-white ptlrt-10 text-end">
                                        <p className="text-white font-size-14"> {data?.length} memebers</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <CardBody>
                            <Avatar.Group
                                size="large"
                            >
                                {data?.map((item) =>
                                    <Tooltip title={item?.follower?.name} key={item?._id} placement="top">
                                        <a
                                            onClick={() => router.push(`/profile/${item?.follower?._id}`)}
                                        >
                                            <Avatar
                                                src={avatarurl + "/" + item?.follower?.profile?.avatar.filepath}
                                            >
                                            </Avatar>
                                        </a>
                                    </Tooltip>

                                )}
                            </Avatar.Group>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default index;
