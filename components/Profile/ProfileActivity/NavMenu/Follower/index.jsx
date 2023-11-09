import React, { useState, useEffect } from "react";
import {
    Space, Form, message, Button, Upload, Divider, Mentions, Radio
} from 'antd';
import {
    Card, CardBody, Row, Col, Nav,
    NavItem,
    NavLink, TabContent,
    TabPane, CardTitle, CardText
} from "reactstrap";
import { UploadOutlined, FormOutlined } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";
import { profileService } from "@/services/index";
import FollwersList from "./FollowersList";
import AllList from "./AllList";
import { useRouter } from "next/router";
import classnames from "classnames";

const index = ({ view_user_id, user_id, userRole, getHeader }) => {

    const { notify } = useNotify();
    const router = useRouter();
    const { profile } = router.query;
    const [activeTab, setactiveTab] = useState("1");
    const toggle = tab => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(1);
    const [memeberCount, setMemeberCount] = useState(1);
    const [FriendsTotal, setDataFriendsTotal] = useState();
    const [AllTotal, setDataAllTotal] = useState();
    const [search, setSearch] = useState("");
    const [searchType, setSearchType] = useState("friend");
    const [data, setData] = useState([]);
    const [members, setMembers] = useState([]);
    const [LoadMoreFollowerStatus, setLoadMoreFollower] = useState(false);
    const [LoadMoreAllStatus, setLoadMoreAll] = useState(false);
    const [LoadMoreFollowerRemain, setLoadMoreFollowerRemain] = useState();
    const [LoadMoreAllRemain, setLoadMoreAllRemain] = useState();

    async function ongetFollowers(profile, count, search) {
        let mounted;
        setInitLoading(true);
        await profileService.getmyFollowers(profile, count, search)
            .then((res) => {
                if (res.success) {
                    res?.data?.results?.length === 0 ? setLoadMoreFollower(true) : ''
                    if (count === 1) {
                        setInitLoading(false);
                        setLoading(false);
                        setData(res.data.results);
                        setLoadMoreFollowerRemain(res?.data?.totalResults - res?.data?.results?.length)
                    }
                    else {
                        mounted || setInitLoading(false);
                        setData((data) => [...data, ...res.data.results]);
                        mounted || window.dispatchEvent(new Event("resize"));
                        mounted = true;
                        setLoadMoreFollowerRemain(res?.data?.totalResults - data?.length)
                    }
                    setDataFriendsTotal(res?.data?.totalResults)
                } else notify("error", "Something went wrong");
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }

    async function ongetAllMemebers(user_id, page, search) {
        let mounted;
        setInitLoading(true);
        await profileService.getAllMemebers(user_id, page, search)
            .then(async (res) => {
                if (res.success) {
                    res?.data?.results?.length === 0 ? setLoadMoreAll(true) : ''
                    if (memeberCount === 1) {
                        setInitLoading(false);
                        setMembers(res?.data?.results);
                        setLoadMoreAllRemain(res?.data?.totalResults - res?.data?.results?.length)
                    }
                    else {
                        mounted || setInitLoading(false);
                        setMembers((data) => [...data, ...res.data.results]);
                        mounted || window.dispatchEvent(new Event("resize"));
                        mounted = true;
                        setLoadMoreAllRemain(res?.data?.totalResults - members?.length)
                    }
                    setDataAllTotal(res?.data?.totalResults)
                } else notify("error", "Something went wrong");
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });
    }

    useEffect(() => {
        if (router.isReady) {
            setInitLoading(true);
            ongetFollowers(profile, count, search);
        }
    }, [router.isReady, count, searchType, router.asPath]);

    useEffect(() => {
        if (router.isReady) {
            setInitLoading(true);
            ongetAllMemebers(profile, memeberCount, search);
        }
    }, [router.isReady, memeberCount, searchType]);

    const onSearch = (e, type) => {
        setInitLoading(true);
        setSearch(e.target.value);
        type === "friend" ?
            ongetFollowers(profile, count, e.target.value) :
            ongetAllMemebers(profile, memeberCount, e.target.value);

        setSearch('');
    };


    return (
        <Card className="px-1">
            <CardBody className='p-1'>
                <Row>
                    <Col xl={12}>
                        <Card >
                            <CardBody className='p-0'>
                                <Nav pills className="navtab-bg nav-justified">
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                active: activeTab === "1",
                                            })}
                                            onClick={() => {
                                                toggle("1");
                                            }}
                                        >
                                            All ({AllTotal})
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                active: activeTab === "2",
                                            })}
                                            onClick={() => {
                                                toggle("2");
                                            }}
                                        >
                                            Friends ({FriendsTotal})
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={activeTab} className="p-3 text-muted">
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col sm="12">
                                                <div className="container">
                                                    <div className="page-title-content">
                                                        <form className="mt-1">
                                                            <label>
                                                                <i className="bx bx-search"></i>
                                                            </label>
                                                            <input
                                                                name="search"
                                                                type="text"
                                                                value={search}
                                                                onInput={(e) => onSearch(e, 'all')}
                                                                className="input-search"
                                                                placeholder="Search a question..."
                                                            />
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="auth-space"></div>
                                                <AllList
                                                    ongetAllMemebers={ongetAllMemebers}
                                                    initLoading={initLoading}
                                                    data={members}
                                                    loading={loading}
                                                    setLoading={setLoading}
                                                    getHeader={getHeader}
                                                    count={memeberCount}
                                                    search={search}
                                                    total={AllTotal}
                                                    loadStatus={LoadMoreAllStatus}
                                                    setCount={setMemeberCount}
                                                    profile={profile}
                                                    userRole={userRole}
                                                    user_id={user_id}
                                                    LoadMoreRemain={LoadMoreAllRemain}
                                                />
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col sm="12">
                                                <div className="container">
                                                    <div className="page-title-content">
                                                        <form className="mt-1">
                                                            <label>
                                                                <i className="bx bx-search"></i>
                                                            </label>
                                                            <input
                                                                name="search"
                                                                type="text"
                                                                onInput={(e) => onSearch(e, 'friend')}
                                                                className="input-search"
                                                                placeholder="Search a question..."
                                                            />
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="auth-space"></div>
                                                <FollwersList
                                                    ongetFollowers={ongetFollowers}
                                                    initLoading={initLoading}
                                                    data={data}
                                                    total={FriendsTotal}
                                                    loading={loading}
                                                    setLoading={setLoading}
                                                    getHeader={getHeader}
                                                    count={count}
                                                    search={search}
                                                    setCount={setCount}
                                                    loadStatus={LoadMoreFollowerStatus}
                                                    profile={profile}
                                                    userRole={userRole}
                                                    user_id={user_id}
                                                    LoadMoreRemain={LoadMoreFollowerRemain}
                                                />
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </CardBody>
        </Card>
    );
};


export default index;
