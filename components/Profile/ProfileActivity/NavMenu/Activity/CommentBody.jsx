import React, { useEffect, useState } from "react";
import Comments from "@/components/Layout/comments/CommentsAll";
import { Rate } from "antd";

const CommentBody = ({ item, likePost, user_id, path }) => {
    const [commentCount, setCommentCount] = useState(item.comment ? item?.comment : 0);
    const [expandComments, setExpandComments] = useState(true);
    const [like, setLike] = useState(item.like ? item?.like?.count : 0);

    return (
        <>
            {item?.rating && item?.rating !== 0 ?
                <li className="list-inline-item me-3" >
                    <Rate disabled allowHalf key={item?.rating} defaultValue={item?.rating} />
                </li> : ''}
            <li className="list-inline-item me-3"
                onClick={() => {
                    likePost(item?._id, (liked) => {
                        if (liked) {
                            setLike((like) => like + 1);
                        } else {
                            setLike((like) => (like ? like - 1 : like));
                        }
                    });
                }}
                id="dueDate">
                <i className="bx bxs-heart me-1 text-danger fs-4 heart-comment" />
                <span className="fs-6 text-danger">{like}</span>
            </li>
            <Comments currentUserId={user_id} path={path} commentCount={commentCount} ownerId={item.user._id} setExpandComments={setExpandComments} expandComments={expandComments} setCommentCount={setCommentCount} type="post" id={item._id} />
        </>
    );
};

export default CommentBody;
