import { Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabPane, CardText, TabContent } from "reactstrap";
import React, { useState, useEffect } from "react";
import classnames from "classnames";
import PostForm from "./Activity/PostForm";
import FollowerMain from "./Follower";
import useNotify from "@/hooks/useNotify";
import { useRouter } from "next/router";
import Posts from "./Activity/Posts";
import Shoutouts from "./Shoutout/Main"
import { downloadFile } from "@/redux/Mail/actions";
import { profileService } from "@/services/index";

function index({ view_user_id, user_id, view_user_role, userRole, getHeader }) {
    const [customActiveTab, setcustomActiveTab] = useState("1");
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [LoadMoreAllStatus, setLoadMoreAll] = useState(false);
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);
    const [shoutoutdata, setShoutoutData] = useState([]);
    const [shoutoutTotal, setShoutoutTotal] = useState();
    const [activityTotal, setActivityTotal] = useState();
    const [shoutoutlist, setShoutList] = useState([]);
    const router = useRouter();

    const { notify } = useNotify();
    const toggleCustom = tab => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
        }
    };

    async function allActivities(id, count, search) {
        setInitLoading(true);
        await profileService.getActivity(id, count, search)
            .then((res) => {
                if (res.success) {
                    res?.posts?.length === 0 ? setLoadMoreAll(true) : ''
                    setInitLoading(false);
                    setLoading(false);
                    if (count !== 1) {
                        const newData = data.concat(res.posts);
                        setData(newData);
                        setList(newData);
                    }
                    else {
                        setData(res?.posts);
                        setList(res?.posts);
                    }
                    window.dispatchEvent(new Event("resize"));
                    setActivityTotal(res.activityTotal)
                } else notify("error", res.msg);
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }

    async function ShoutoutList(id, count, search) {
        setInitLoading(true);
        await profileService.getShoutout(id, count, search)
            .then((res) => {
                if (res) {
                    setInitLoading(false);
                    setLoading(false);
                    if (count !== 1) {
                        const newData = shoutoutdata.concat(res.results);
                        setShoutoutData(newData);
                        setShoutList(newData);
                    }
                    else {
                        setShoutoutData(res.results);
                        setShoutList(res.results);
                    }
                    window.dispatchEvent(new Event("resize"));
                    setShoutoutTotal(res?.totalResults)
                } else notify("error", res.msg);

            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }

    async function initFunc(profileId) {
        await profileService.updateProfileViewsCount(profileId);
        await allActivities(profileId, 1, "");
        await ShoutoutList(profileId, 1, "");
    }

    useEffect(() => {
        if (router.isReady) {
            initFunc(view_user_id);
        }
    }, [router.isReady, view_user_id]);

    useEffect(() => {
        setcustomActiveTab('1')
    }, [router.asPath]);

    return (
        <Row>
            <Col className="px-1" lg={12}>
                <Nav tabs className="nav-tabs-custom nav-justified">
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: customActiveTab === "1",
                            })}
                            onClick={() => {
                                toggleCustom("1");
                            }}
                        >
                            <span className="d-block fw-semibold">Activity</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: customActiveTab === "2",
                            })}
                            onClick={() => {
                                toggleCustom("2");
                            }}
                        >
                            <span className="d-block fw-semibold">Shoutout</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: customActiveTab === "3",
                            })}
                            onClick={() => {
                                toggleCustom("3");
                            }}
                        >
                            <span className="d-sm-block fw-semibold">Followers</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: customActiveTab === "4",
                            })}
                            onClick={() => {
                                toggleCustom("4");
                            }}
                        >
                            <span className="d-block d-sm-none">
                                <i className="far fa-envelope"></i>
                            </span>
                            <span className="d-sm-block fw-semibold">
                                {view_user_role === "partner" ? 'Locations' : 'Favorites'}
                            </span>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent
                    activeTab={customActiveTab}
                    className="p-3 text-muted"
                >
                    <TabPane tabId="1">
                        <Row>
                            <PostForm view_user_id={view_user_id} allActivities={allActivities} />
                        </Row>
                        <div className="auth-space"></div>
                        <Row>
                            <Posts
                                initLoading={initLoading}
                                loading={loading}
                                user_id={user_id}
                                list={list}
                                data={data}
                                setLoading={setLoading}
                                setList={setList}
                                allActivities={allActivities}
                                LoadMoreAllStatus={LoadMoreAllStatus}
                                activityTotal={activityTotal}
                            />
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Shoutouts
                                shoutoutTotal={shoutoutTotal}
                                initLoading={initLoading}
                                loading={loading}
                                user_id={user_id}
                                list={shoutoutlist}
                                data={shoutoutdata}
                                setLoading={setLoading}
                                setList={setShoutList}
                                ShoutoutList={ShoutoutList}
                                LoadMoreAllStatus={LoadMoreAllStatus}
                                view_user_id={view_user_id}
                            />
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <FollowerMain view_user_id={view_user_id} userRole={userRole} getHeader={getHeader} user_id={user_id} />
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>

                        </Row>
                    </TabPane>
                </TabContent>
            </Col>
        </Row >
    );
}

export default index;
