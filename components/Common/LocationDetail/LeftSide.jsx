import React from 'react';
import { connect } from "react-redux";
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';
import { apiBaseUrl } from "@/utils/baseUrl";
import { formatDateNoti } from "@/utils/date";
import classnames from "classnames";
import { Rate, Button, Tag, Space } from "antd";
import { HeartFilled, HeartOutlined, TagFilled } from "@ant-design/icons";
import { locationService } from "@/services/index";
import useNotify from "@/hooks/useNotify";
import PostForm from "./PostForm";
import Reviews from "./Reviews";
import ArrivalBanner from "./ArrivalBanner";
import useMedia from "@/hooks/useMedia";

//import images
const avatarurl = `${apiBaseUrl}/avatar/`;

const LeftSide = ({ locationInfo, setLocationInfo, userRole, init, user_id, reviews }) => {

    let location = locationInfo?.location;
    const isWebDevice = useMedia('(min-width:700px)');
    const { notify } = useNotify();
    async function favoriteLocation(flag) {
        if (!userRole) {
            notify(
                "error",
                "Please login"
            );
            return;
        }
        await locationService.favoriteLocation(location?._id, flag)
            .then((res) => {
                console.log(res)
                setLocationInfo(prevState => ({
                    ...prevState,
                    isFavorite: flag ? true : false
                }));
                console.log(location)
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }

    return (
        <React.Fragment>
            <Col xl={8}>
                <Card>
                    <CardBody className="border-bottom">
                        <div className="d-flex">
                            <img src={avatarurl + location?.images[0]?.filepath} className='avatar-xlg object-fit-scale' alt="" height="50" />
                            <div className="flex-grow-1 ms-3">
                                <h5 className="fw-semibold">{location?.title}</h5>
                                <p className="fw-semibold">{location?.description}</p>
                                <div className="mb-2">
                                    <Space size={[0, 'small']} wrap>
                                        {location?.subCategories
                                            ?.map((item) => <Tag icon={<TagFilled />} color="green" >{item.name}</Tag>)
                                        }
                                    </Space>
                                </div>
                                <ul className="list-unstyled hstack gap-2 mb-2">
                                    <li>
                                        <i className="bx bx-time-five"></i> <span className="text-muted font-size-14">Created on <b>{formatDateNoti(location?.createdAt)}</b></span>
                                    </li>
                                    <li>
                                        <i className="bx bx-station"></i> <span className={classnames({ 'tcl-green': location?.isActive, 'tcl-red': !location?.isActive })}
                                        >{location?.isActive ? 'Active' : 'Inactive'}</span>
                                    </li>
                                </ul>
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item me-3">
                                        <Rate
                                            disabled
                                            allowHalf
                                            value={location?.rating}
                                        />
                                    </li>
                                    <li className="list-inline-item me-3" >
                                        <i className="bx bxs-heart me-1 text-danger fs-4 heart-comment" />
                                        <span className="fs-6 text-danger">{location?.favoriteUsers ? location?.favoriteUsers?.length : 0}</span>
                                    </li>
                                    <li className="list-inline-item me-3">
                                        <i className="bx bxs-comment-dots me-1 tcl-darkblue fs-4 heart-comment" />
                                        <span className="fs-6 tcl-darkblue">{location?.reviews ? location?.reviews?.length : 0}</span>
                                    </li>
                                    <li className="list-inline-item me-3">
                                        {userRole !== "partner" ?
                                            locationInfo?.isFavorite ? (
                                                <Button
                                                    type="primary"
                                                    icon={<HeartFilled />}
                                                    style={{
                                                        marginRight: "10px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => favoriteLocation(false)}
                                                >
                                                    {isWebDevice ? 'Remove from Favorites' : ''}
                                                </Button>
                                            ) : (
                                                <Button
                                                    icon={<HeartOutlined />}
                                                    style={{
                                                        marginRight: "10px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => favoriteLocation(true)}
                                                >
                                                    {isWebDevice ? 'Add to Favorites' : ''}
                                                </Button>
                                            ) : ''
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardBody>
                    <CardBody>
                        <Row className='py-4'>
                            <Col md="12">
                                {location?.isActive ? <ArrivalBanner location={locationInfo} user_id={user_id} /> : ""}
                            </Col>
                            <Col md="12">
                                <PostForm
                                    location={locationInfo}
                                    init={init}
                                    user_id={user_id}
                                />
                            </Col>
                        </Row>
                        {!reviews && <h5 className="fw-semibold m-3">Reviews</h5>}
                        <Reviews
                            reviews={reviews}
                            user_id={user_id}
                        />
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    userRole: state.user.role,
    user_id: state.user.user_id,
});


export default connect(mapStateToProps)(LeftSide);
