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

const avatarurl = `${apiBaseUrl}/avatar/`;

function Reviews({ user_id, reviews }) {
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

    return (
        <Card>
            <CardBody className="px-1">
                <Spin spinning={false}>
                    <ul className="verti-timeline list-unstyled">
                        {reviews && reviews?.map((item, index) => (
                            <li className="event-list py-0" key={item?._id}>
                                <div className="event-timeline-dot">
                                    <i className="bx bx-right-arrow-circle font-size-18"></i>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-shrink-0 me-3">
                                        <img
                                            src={`${avatarurl}${item?.user?.profile?.avatar?.filepath}`}
                                            alt=""
                                            className={classnames('rounded-circle', { 'avatar-md': isWebDevice, 'avatar-xs': !isWebDevice })} />
                                    </div>
                                    <div className={classnames('flex-grow-1', { 'font-size-16': isWebDevice }, { 'font-size-14': !isWebDevice })}>
                                        <div>
                                            <PopUserBox
                                                id={item?.user?._id}
                                                avatar={item?.user?.profile?.avatar?.filepath}
                                                name={item?.user?.name}
                                                username={item?.user?.username}
                                                role={item?.user?.role}
                                            />
                                            <p className={classnames('mb-0', 'text-muted', { 'font-size-12': !isWebDevice })}><i className="bx bxs-time-five font-size-14"></i>{" "}{getDiffToNow(item?.createdAt)} ago</p>
                                            <div className="ql-snow">
                                                <div
                                                    className="ql-editor py-3 px-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item?.text?.match(pattern)
                                                            ? item?.text?.match(pattern).map((mention, key) => {
                                                                const updatedContent = item?.text?.replace(
                                                                    mention,
                                                                    `<a style="cursor:pointer" href="/profile/${item.text?.shoutlist[key]}/activity">${mention}</a>`
                                                                );
                                                                if ((item?.text.match(pattern)).length - 1 === key) {
                                                                    return updatedContent;
                                                                }
                                                            })
                                                            : item?.text,
                                                    }}
                                                />
                                            </div>
                                            <Antimage.PreviewGroup>
                                                {item?.images?.map((item, index) => (
                                                    item.status === "active" && item.mimetype === "image/jpeg" || item.mimetype === "image/png" || item.mimetype === "image/jpg" ?
                                                        <Antimage
                                                            key={index}
                                                            loader={myLoader}
                                                            width={"50%"}
                                                            src={avatarurl + item?.filepath}
                                                        />
                                                        : ''
                                                ))}
                                            </Antimage.PreviewGroup>
                                            <div className="desktop pt-1">
                                                <ul className="list-inline mb-0">
                                                    <CommentBodyPost item={item} path={router.asPath} user_id={user_id} />
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="py-3 mobile">
                                        <ul className="list-inline mb-0">
                                            <CommentBodyPost item={item?.post} path={router.asPath} user_id={user_id} />
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Spin>
            </CardBody>
        </Card>
    );
}

export default Reviews;
