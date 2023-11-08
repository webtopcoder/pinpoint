import { Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabPane, CardText, TabContent } from "reactstrap";
import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Activity from "./Activity";
import useNotify from "@/hooks/useNotify";
import { useRouter } from "next/router";
import Posts from "./Posts";
import { downloadFile } from "@/redux/Mail/actions";
import { profileService } from "@/services/index";

function index({ view_user_id, user_id, view_user_role }) {
    const [customActiveTab, setcustomActiveTab] = useState("1");
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [activityInfo, setactivityInfo] = useState([]);
    const [LoadMoreAllStatus, setLoadMoreAll] = useState(false);
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);
    const router = useRouter();

    const { notify } = useNotify();
    const myLoader = ({ src }) => {
        return src;
    };

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
                    setactivityInfo(res);
                    if (count !== 1) {
                        const newData = data.concat(res.posts);
                        setData(newData);
                        setList(newData);
                    }
                    else {
                        setData(res.posts);
                        setList(res.posts);
                    }
                    window.dispatchEvent(new Event("resize"));
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
    }

    useEffect(() => {
        initFunc(view_user_id);
    }, [router.isReady, view_user_id]);

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
                            <span className="d-sm-block fw-semibold">Followers</span>
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
                            <Activity view_user_id={view_user_id} allActivities={allActivities} />
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
                            />
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <CardText className="mb-0">
                                    Food truck fixie locavore, accusamus mcsweeney&apos;s
                                    marfa nulla single-origin coffee squid. Exercitation
                                    +1 labore velit, blog sartorial PBR leggings next
                                    level wes anderson artisan four loko farm-to-table
                                    craft beer twee. Qui photo booth letterpress,
                                    commodo enim craft beer mlkshk aliquip jean shorts
                                    ullamco ad vinyl cillum PBR. Homo nostrud organic,
                                    assumenda labore aesthetic magna delectus mollit.
                                    Keytar helvetica VHS salvia yr, vero magna velit
                                    sapiente labore stumptown. Vegan fanny pack odio
                                    cillum wes anderson 8-bit.
                                </CardText>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <CardText className="mb-0">
                                    Etsy mixtape wayfarers, ethical wes anderson tofu
                                    before they sold out mcsweeney&apos;s organic lomo retro
                                    fanny pack lo-fi farm-to-table readymade. Messenger
                                    bag gentrify pitchfork tattooed craft beer, iphone
                                    skateboard locavore carles etsy salvia banksy hoodie
                                    helvetica. DIY synth PBR banksy irony. Leggings
                                    gentrify squid 8-bit cred pitchfork. Williamsburg
                                    banh mi whatever gluten-free, carles pitchfork
                                    biodiesel fixie etsy retro mlkshk vice blog.
                                    Scenester cred you probably haven&apos;t heard of them,
                                    vinyl craft beer blog stumptown. Pitchfork
                                    sustainable tofu synth chambray yr.
                                </CardText>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Col>
        </Row >
    );
}

export default index;
