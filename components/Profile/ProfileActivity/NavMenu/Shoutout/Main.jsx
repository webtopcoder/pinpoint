import React, { useEffect, useState } from "react";
import { Image as Antimage, Spin, Divider } from "antd"
import { Card, CardBody, Button, Spinner } from "reactstrap";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";
import { apiBaseUrl } from "@/utils/baseUrl";
import { profileService } from "@/services/index";
import CommentBodyPost from "./CommentBody";
import PopUserBox from "@/components/Common/PopUserBox";
import { useRouter } from "next/router";
import { getDiffToNow } from "@/utils/date";
import classnames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";

const imgurl = `${apiBaseUrl}/avatar/`;
const avatarurl = `${apiBaseUrl}/avatar/`;
function Main({ loading, initLoading, user_id, list, data, LoadMoreAllStatus, setLoading, setList, ShoutoutList, ondownloadFile, shoutoutTotal }) {
    const pattern = /@\w+/g;
    const router = useRouter();
    const { notify } = useNotify();
    const isWebDevice = useMedia('(min-width:700px)');
    const [count, setCount] = useState(1);

    const myLoader = ({ src }) => {
        return src;
    };

    const onLoadMore = () => {
        setCount(count + 1);
    };

    const onMenuClick = (e) => {
        // ondownloadFile(e.key);
        window.open(attachurl + e.key, "_blank");
    };

    async function likePost(id, callback) {
        await profileService.recommendPost(id)
            .then((res) => {
                callback(res.liked);
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
        setLoading(true);
        if (router.isReady) {
            const { profile } = router.query;
            ShoutoutList(profile, count, "");
        }
    }, [count]);

    return (
        <Card>
            <CardBody className="px-1">
                <h4 className="card-title mb-4">Shoutout Feed</h4>
                <Spin spinning={loading}>
                    <InfiniteScroll
                        dataLength={data.length}
                        next={onLoadMore}
                        hasMore={data?.length < shoutoutTotal}
                        style={{ overflow: 'hidden' }} //To put endMessage and loader to the top.
                        loader={
                            <div className={classnames('text-center')}>
                                <Spinner type="grow" className="ms-2" color="primary" />
                                <Spinner type="grow" className="ms-2" color="primary" />
                                <Spinner type="grow" className="ms-2" color="primary" />
                            </div>
                        }
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    >
                        <ul className="verti-timeline list-unstyled">
                            {list && list?.map((item, index) => (
                                <li className="event-list" key={item?._id}>
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <img
                                                src={`${avatarurl}${item?.from.profile?.avatar?.filepath}`}
                                                alt=""
                                                className={classnames('rounded-circle', { 'avatar-md': isWebDevice, 'avatar-xs': !isWebDevice })} />
                                        </div>
                                        <div className={classnames('flex-grow-1', { 'font-size-16': isWebDevice }, { 'font-size-14': !isWebDevice })}>
                                            <div>
                                                <PopUserBox
                                                    id={item?.from?._id}
                                                    avatar={item?.from?.profile?.avatar?.filepath}
                                                    name={item?.from?.name}
                                                    username={item?.from?.username}
                                                    role={item?.from?.role}
                                                />
                                                {" "}Shouted out{" "}
                                                <PopUserBox
                                                    id={item?.to?._id}
                                                    avatar={item?.to?.profile?.avatar?.filepath}
                                                    name={item?.to?.name}
                                                    username={item?.to?.username}
                                                    role={item?.to?.role}
                                                />

                                                <p className={classnames('mb-0', 'text-muted', { 'font-size-12': !isWebDevice })}><i className="bx bxs-time-five font-size-14"></i>{" "}{getDiffToNow(item?.createdAt)} ago</p>
                                                <div className="ql-snow">
                                                    <div
                                                        className="ql-editor py-3 px-0"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item?.post?.content?.match(pattern)
                                                                ? item?.post?.content.match(pattern).map((mention, key) => {
                                                                    const updatedContent = item?.post?.content.replace(
                                                                        mention,
                                                                        `<a style="cursor:pointer" href="/profile/${item.post?.shoutlist[key]}/activity">${mention}</a>`
                                                                    );
                                                                    if ((item?.post?.content.match(pattern)).length - 1 === key) {
                                                                        return updatedContent;
                                                                    }
                                                                })
                                                                : item?.post?.content,
                                                        }}
                                                    />
                                                </div>
                                                <Antimage.PreviewGroup>
                                                    {item?.post?.images?.map((item, index) => (
                                                        item.status === "active" && item.mimetype === "image/jpeg" || item.mimetype === "image/png" || item.mimetype === "image/jpg" ?
                                                            <Antimage
                                                                key={index}
                                                                loader={myLoader}
                                                                width={"50%"}
                                                                src={imgurl + item?.filepath}
                                                            />
                                                            : ''
                                                    ))}
                                                </Antimage.PreviewGroup>
                                                <div className="desktop pt-1">
                                                    <ul className="list-inline mb-0">
                                                        <CommentBodyPost item={item?.post} path={router.asPath} likePost={likePost} user_id={user_id} />
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="py-3 mobile">
                                            <ul className="list-inline mb-0">
                                                <CommentBodyPost item={item?.post} path={router.asPath} likePost={likePost} user_id={user_id} />
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </InfiniteScroll>
                </Spin>
                {/* <div className={classnames('text-center', { 'd-none': !initLoading })}>
                    <Spinner type="grow" className="ms-2" color="primary" />
                    <Spinner type="grow" className="ms-2" color="primary" />
                    <Spinner type="grow" className="ms-2" color="primary" />
                </div>
                <div
                    className={classnames('text-center', 'mt-4', { 'd-none': shoutoutTotal < 10 || data?.length >= shoutoutTotal })}
                ><a className="btn btn-danger waves-effect waves-light btn-sm" onClick={onLoadMore}>View More <i className="bx bx-plus"></i></a></div> */}
            </CardBody>
        </Card>
    );
}

export default Main;
