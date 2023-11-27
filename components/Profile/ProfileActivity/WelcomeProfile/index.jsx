import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardTitle, CardBody } from "reactstrap"
import { useRouter } from "next/router";
import { Popover } from 'antd';
import MessageForm from "./MessageForm";
import useMedia from "@/hooks/useMedia";
import useNotify from "@/hooks/useNotify";
import { apiBaseUrl } from "@/utils/baseUrl";
import { profileService } from "@/services/index";

function index({
    userRole,
    headerInfo,
    own_page,
    getHeader,
}) {
    const avatarurl = `${apiBaseUrl}/avatar/`;
    const router = useRouter();
    const { notify } = useNotify();
    const view_user_id = router.query.profile;

    async function follow() {
        if (!userRole) {
            notify(
                "error",
                "Please login"
            );
            return;
        }
        await profileService.postFollower(view_user_id)
            .then(async (res) => {
                notify(res.data.type, res.data.message);
                await getHeader();
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }

    async function unfollow() {
        if (!userRole) {
            notify(
                "error",
                "Please login"
            );
            return;
        }
        await profileService.deleteFollower(view_user_id)
            .then(async (res) => {
                notify("success", "Unfollowed");
                await getHeader();
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });;
    }

    return (
        <React.Fragment>
            <Card className="overflow-hidden">
                <div className="bg-darkblue bg-soft">
                    <Row>
                        <Col xs="12">
                            <div className="text-white p-3">
                                <h5 className="text-white mb-4">Welcome Back !</h5>
                            </div>
                        </Col>
                    </Row>
                </div>
                <CardBody className="pt-0">
                    <Row>
                        <Col sm="12">
                            <div className="d-flex">
                                <div className="me-3 profile-user-wid">
                                    <img
                                        src={avatarurl + "/" + headerInfo?.profile?.avatar.filepath}
                                        alt=""
                                        className="avatar-xlg rounded-circle img-thumbnail"
                                    />
                                </div>
                                <div className="flex-grow-1 align-self-center">
                                    <div className="text-muted">
                                        <h5 className="mb-1"><b>{headerInfo?.profile?.fullname}</b></h5>
                                        <p className="mb-0">@{headerInfo?.profile?.username}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 float-end">
                                {!own_page ? (
                                    <div className="d-flex flex-wrap gap-2">
                                        <Popover content={<MessageForm username={headerInfo?.profile?.username} />} placement="bottom" trigger="click">
                                            <button
                                                style={{
                                                    fontSize: 13
                                                }}
                                                type="button"
                                                className="btn btn-danger"
                                            >
                                                <i className="bx bx-message-alt-dots font-size-16 align-middle me-2"></i>{" "}
                                                Message
                                            </button>
                                        </Popover>
                                        <button
                                            style={{
                                                fontSize: 13
                                            }}
                                            onClick={
                                                headerInfo?.profile?.is_follow ? unfollow : follow
                                            }
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            <i className="bx bx-user-plus font-size-16 align-middle me-2"></i>{" "}
                                            {headerInfo?.profile?.is_follow
                                                ? "Unfollow"
                                                : "Follow"}
                                        </button>
                                    </div>
                                ) :
                                    ""}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
                <CardBody className="border-top px-3">
                    <CardTitle className="mb-2 font-size-20 tcl-darkblue">About Me</CardTitle>
                    <p className="text-muted mb-0"
                        dangerouslySetInnerHTML={{ __html: headerInfo && headerInfo?.profile?.aboutme }}
                    />
                </CardBody>
                <CardBody className="border-top px-3">
                    <CardTitle className="mb-2 font-size-20 tcl-darkblue">Follow Me On</CardTitle>
                    <Row className="mt-3">
                        {headerInfo?.profile?.socials?.facebook &&
                            <Col className="col-2">
                                <div className="social-source text-center ">
                                    <div className="avatar-mxs mx-auto mb-3">
                                        <a href={`https://${headerInfo?.profile?.socials?.facebook}`} target="_blank">
                                            <span className="avatar-title rounded-circle bg-redLightColor font-size-20">
                                                <i className="bx bxl-facebook text-white"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        }
                        {headerInfo?.profile?.socials?.twitter &&
                            <Col className="col-2">
                                <div className="social-source text-center ">
                                    <div className="avatar-mxs mx-auto mb-3">
                                        <a href={`https://${headerInfo?.profile?.socials?.twitter}`} target="_blank">
                                            <span className="avatar-title rounded-circle bg-redLightColor font-size-20">
                                                <i className="bx bxl-twitter text-white"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        }
                        {headerInfo?.profile?.socials?.snapchat &&
                            <Col className="col-2">
                                <div className="social-source text-center ">
                                    <div className="avatar-mxs mx-auto mb-3">
                                        <a href={`https://${headerInfo?.profile?.socials?.snapchat}`} target="_blank">
                                            <span className="avatar-title rounded-circle bg-redLightColor font-size-20">
                                                <i className="bx bxl-snapchat text-white"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        }
                        {headerInfo?.profile?.socials?.instagram &&
                            <Col className="col-2">
                                <div className="social-source text-center ">
                                    <div className="avatar-mxs mx-auto mb-3">
                                        <a href={`https://${headerInfo?.profile?.socials?.instagram}`} target="_blank">
                                            <span className="avatar-title rounded-circle bg-redLightColor font-size-20">
                                                <i className="bx bxl-instagram-alt text-white"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        }
                        {headerInfo?.profile?.socials?.website !== "" &&
                            <Col className="col-2">
                                <div className="social-source text-center ">
                                    <div className="avatar-mxs mx-auto mb-3">
                                        <a href={`https://${headerInfo?.profile?.socials?.website}`} target="_blank">
                                            <span className="avatar-title rounded-circle bg-redLightColor font-size-20">
                                                <i className="bx bxl-internet-explorer text-white"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        }
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}

export default index;
