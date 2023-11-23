//optimized
import React, { useEffect, useState } from "react";
import { Image as Antimage, Spin, Divider } from "antd";
import { Card, CardBody } from "reactstrap";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";
import { apiBaseUrl } from "@/utils/baseUrl";
import { profileService } from "@/services/index";
import CommentBodyPost from "./CommentBody";
import CommentBodyReview from "@/components/Common/LocationDetail/CommentBody";
import PopUserBox from "@/components/Common/PopUserBox";
import LoadingSpinner from "@/components/Common/Spinner";
import { useRouter } from "next/router";
import { getDiffToNow } from "@/utils/date";
import classnames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";

const imgurl = `${apiBaseUrl}/avatar/`;
const avatarurl = `${apiBaseUrl}/avatar/`;
function Posts({ loading, user_id, list, data, setLoading, setList, allActivities, activityTotal, ondownloadFile }) {
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

    useEffect(() => {
        setLoading(true);
        if (router.isReady) {
            allActivities(user_id, count, "");
        }
    }, [count]);

    const likePost = async (id, callback) => {
        try {
            const res = await profileService.recommendPost(id);
            callback(res.liked);
        } catch (error) {
            notify("error", error?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <Card>
            <CardBody className="px-1">
                <h4 className="card-title ms-2 mb-4">Activity Feed</h4>
                <Spin spinning={loading}>
                    <InfiniteScroll
                        dataLength={data.length}
                        next={onLoadMore}
                        hasMore={data?.length < activityTotal}
                        style={{ overflow: 'hidden' }} //To put endMessage and loader to the top.
                        loader={<LoadingSpinner />}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    >
                        <ul className="verti-timeline list-unstyled">
                            {list?.map((item, index) => (
                                <li className="event-list" key={item?._id}>
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <img
                                                src={`${avatarurl}${item?.type === "post" || item?.type === "review" ? item?.user?.avatar?.filepath : item?.follower?.avatar?.filepath}`}
                                                alt=""
                                                className={classnames('rounded-circle', { 'avatar-md': isWebDevice, 'avatar-xs': !isWebDevice })} />
                                        </div>
                                        <div className={classnames('flex-grow-1', { 'font-size-16': isWebDevice }, { 'font-size-14': !isWebDevice })}>
                                            <div>
                                                {item?.type === "follow" && <>
                                                    <PopUserBox
                                                        id={item?.follower?._id}
                                                        avatar={item?.follower?.avatar?.filepath}
                                                        name={item?.follower?.firstname + " " + item?.follower?.lastname}
                                                        username={item?.follower?.username}
                                                        role={item?.follower?.role}
                                                    />
                                                    {" "}followed{" "}
                                                    <PopUserBox
                                                        id={item?.following?._id}
                                                        avatar={item?.following?.avatar?.filepath}
                                                        name={item?.following?.firstname + " " + item?.following?.lastname}
                                                        username={item?.following?.username}
                                                        role={item?.following?.role}
                                                    />
                                                </>}
                                                {item?.type === "post" && <>
                                                    <PopUserBox
                                                        id={item?.user?._id}
                                                        avatar={item?.user?.avatar?.filepath}
                                                        name={item?.user?.firstname + " " + item?.user?.lastname}
                                                        username={item?.user?.username}
                                                        role={item?.user?.role}
                                                    />
                                                    {" "}posted to{" "}
                                                    <PopUserBox
                                                        id={item?.to?._id}
                                                        avatar={item?.to?.avatar?.filepath}
                                                        name={item?.to?.firstname + " " + item?.to?.lastname}
                                                        username={item?.to?.username}
                                                        role={item?.to?.role}
                                                    />
                                                </>}
                                                {item?.type === "review" && <>
                                                    <PopUserBox
                                                        id={item?.user?._id}
                                                        avatar={item?.user?.avatar?.filepath}
                                                        name={item?.user?.firstname + " " + item?.user?.lastname}
                                                        username={item?.user?.username}
                                                        role={item?.user?.role}
                                                    />
                                                    {" "}reviwed{" "}
                                                    <PopUserBox
                                                        id={item?.location?.partner_id}
                                                        avatar={item?.location?.partner_avatar?.filepath}
                                                        name={item?.location?.partner_firstname + " " + item?.location?.partner_lastname}
                                                        username={item?.location?.partner}
                                                        role="partner"
                                                    />
                                                    's location</>}
                                                <p className={classnames('mb-0', 'text-muted', { 'font-size-12': !isWebDevice })}><i className="bx bxs-time-five align-middle me-1 font-size-14"></i>{getDiffToNow(item?.createdAt)} ago</p>
                                                {item?.type === "post" || item?.type == "review" ?
                                                    // <p className="mt-2 text-muted font-size-14">{item.content}</p> 
                                                    <div className="ql-snow">
                                                        <div
                                                            className="py-2 px-0"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.content?.match(pattern) ? (item.content.match(pattern).map((mention, key) => {
                                                                    item.content = item.content.replace(mention, `<a style="cursor:pointer" href="/profile/${item.shortlist[key]}/activity">${mention}</a>`)
                                                                    if ((item.content.match(pattern)).length - 1 === key) {
                                                                        return item.content;
                                                                    }
                                                                }
                                                                )) : item.content
                                                            }}
                                                        />
                                                    </div>
                                                    : ''}
                                                {item?.type === "post" || item?.type == "review" ?
                                                    <Antimage.PreviewGroup>
                                                        {item?.image?.map((item, index) => (
                                                            item.status === "active" && item.mimetype === "image/jpeg" || item.mimetype === "image/png" || item.mimetype === "image/jpg" ?
                                                                <Antimage
                                                                    key={index}
                                                                    loader={myLoader}
                                                                    width={"50%"}
                                                                    src={imgurl + item?.filepath}
                                                                />
                                                                : ''
                                                        ))}
                                                    </Antimage.PreviewGroup> : ''}
                                                <div className="desktop pt-1">
                                                    <ul className="list-inline mb-0">
                                                        {item?.type === "post" ? <CommentBodyPost item={item} path={router.asPath} likePost={likePost} user_id={user_id} /> : ''}
                                                        {item?.type === "review" ? <CommentBodyReview item={item} path={router.asPath} likePost={likePost} user_id={user_id} /> : ''}
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="py-3 mobile">
                                            <ul className="list-inline mb-0">
                                                {item?.type === "post" ? <CommentBodyPost item={item} path={router.asPath} likePost={likePost} user_id={user_id} /> : ''}
                                                {item?.type === "review" ? <CommentBodyReview item={item} path={router.asPath} likePost={likePost} user_id={user_id} /> : ''}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </InfiniteScroll>
                </Spin>
            </CardBody>
        </Card >
    );
}

export default Posts;
