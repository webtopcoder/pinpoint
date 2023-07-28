import { DownloadOutlined } from "@ant-design/icons";
import {
    Space,
    Button,
    List,
    Skeleton,
    Avatar,
    Image as Antimage,
    Dropdown
} from "antd";
import React, { useEffect, useState } from "react";
import useNotify from "@/hooks/useNotify";
import useMedia from "@/hooks/useMedia";
import { apiBaseUrl } from "@/utils/baseUrl";
import { profileService } from "@/services/index";
import CommentBodyPost from "@/components/Profile/ProfileActivity/CommentBody";
import CommentBodyReview from "@/components/Partner/Locations/PartnerLocation/CommentBody";
import { useRouter } from "next/router";

const imgurl = `${apiBaseUrl}/avatar/`;
const avatarurl = `${apiBaseUrl}/avatar/`;
function Posts({ loading, initLoading, user_id, list, data, setLoading, LoadMoreAllStatus, setList, allActivities, ondownloadFile }) {
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

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: "center",
                    marginTop: 12,
                    height: 32,
                    lineHeight: "32px",
                }}
            >
                <Button onClick={onLoadMore}>Load More</Button>
            </div>
        ) : null;

    const onMenuClick = (e) => {
        ondownloadFile(e.key);
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
        setList(
            data.concat(
                [...new Array(10)].map(() => ({
                    loading: true,
                    from: {},
                }))
            )
        );

        if (router.isReady) {
            const { profile } = router.query;
            allActivities(profile, count, "");
        }
    }, [count]);

    return (
        <div className="avatar-area green-color">
            <div className="avatar-respond">
                <div className="avatar-form">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <List
                                itemLayout="vertical"
                                size="large"
                                loading={initLoading}
                                loadMore={LoadMoreAllStatus ? null : loadMore}
                                dataSource={list}
                                renderItem={(item, index) => (
                                    <List.Item key={index}>
                                        <Skeleton
                                            avatar
                                            title={false}
                                            loading={item.loading}
                                            active
                                        >
                                            {item.type !== "follow" ? (
                                                <>
                                                    <List.Item.Meta
                                                        avatar={
                                                            <Avatar
                                                                src={
                                                                    avatarurl +
                                                                    item?.user?.avatar?.filepath
                                                                }
                                                                size={64}
                                                            />
                                                        }
                                                        title={
                                                            <>
                                                                <Space size={0} direction={isWebDevice ? "vertical" : 'horizontal'}>
                                                                    <a
                                                                        onClick={() => router.push(`/profile/${item?.user?._id}/activity`)}
                                                                        className="custom-userName">
                                                                        {item?.user?.businessname}
                                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                                                    </a>
                                                                    <span>
                                                                        @{item?.user?.username}
                                                                    </span>
                                                                </Space>
                                                                {item?.type === "post" ?
                                                                    <Space>
                                                                        Posted to
                                                                        <a onClick={() => router.push(`/profile/${item?.to?._id}/activity`)}>
                                                                            @{item?.to?.username}
                                                                        </a>
                                                                    </Space> :
                                                                    <Space>
                                                                        Reviewed
                                                                        <a onClick={() => router.push(`/profile/${item?.location?.partner_id}/activity`)}>
                                                                            @{item?.location?.partner}'s location
                                                                        </a>
                                                                    </Space>}
                                                            </>
                                                        }
                                                        description={new Date(
                                                            item?.createdAt
                                                        ).toLocaleDateString(undefined, {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                            hour: "numeric",
                                                            hour12: true,
                                                            minute: "2-digit",
                                                            second: "2-digit",
                                                        })}
                                                    />
                                                    <div className="custom-list-content">
                                                        <div className="ql-snow">
                                                            <div
                                                                className="ql-editor"
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
                                                    </div>
                                                    {item.image ? (
                                                        <div
                                                            className="custom-list-content"
                                                            style={{
                                                                marginTop: 10,
                                                            }}
                                                        >
                                                            <Antimage.PreviewGroup>
                                                                {item.image.map((item, index) => (
                                                                    item.status === "active" && item.mimetype === "image/jpeg" || item.mimetype === "image/png" || item.mimetype === "image/jpg" ?
                                                                        <Antimage
                                                                            key={index}
                                                                            loader={myLoader}
                                                                            width={"25%"}
                                                                            src={imgurl + item?.filepath}
                                                                        />
                                                                        : ''
                                                                ))}
                                                            </Antimage.PreviewGroup>
                                                            {item.image.filter((image) => image.mimetype === "application/pdf").length > 0 ?
                                                                <Dropdown.Button
                                                                    menu={{
                                                                        items: item.image?.map((item) => ({
                                                                            key: item.filepath,
                                                                            label: item.filepath,
                                                                        })),
                                                                        onClick: onMenuClick,
                                                                    }}
                                                                    icon={<DownloadOutlined />}
                                                                >
                                                                    PDF Files
                                                                </Dropdown.Button> : ""}
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {item?.type === "post" ?
                                                        <CommentBodyPost item={item} path={router.asPath} likePost={likePost} user_id={user_id} /> :
                                                        <CommentBodyReview item={item} path={router.asPath} user_id={user_id} />
                                                    }
                                                </>
                                            ) : (
                                                <>
                                                    <List.Item.Meta
                                                        avatar={
                                                            <Avatar
                                                                src={
                                                                    avatarurl +
                                                                    item?.follower?.avatar?.filepath
                                                                }
                                                                size={64}
                                                            />
                                                        }
                                                        title={
                                                            <>
                                                                <Space size={0} direction={isWebDevice ? "vertical" : 'horizontal'}>
                                                                    <a
                                                                        onClick={() => router.push(`/profile/${item?.follower?._id}/activity`)}
                                                                        className="custom-userName">
                                                                        {item?.follower?.businessname}
                                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                                                    </a>
                                                                    <span>
                                                                        @{item?.follower?.username}
                                                                    </span>
                                                                </Space>
                                                                <Space>
                                                                    Followed
                                                                    <a
                                                                        onClick={() => router.push(`/profile/${item?.following?._id}/activity`)}
                                                                    >
                                                                        @{item?.following?.username}
                                                                    </a>
                                                                </Space>
                                                            </>
                                                        }
                                                        description={
                                                            new Date(
                                                                item?.updatedAt
                                                            ).toLocaleDateString(undefined, {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                                hour: "numeric",
                                                                hour12: true,
                                                                minute: "2-digit",
                                                                second: "2-digit",
                                                            })
                                                        }
                                                    />
                                                    <div className="custom-list-content"></div>
                                                </>
                                            )}
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
