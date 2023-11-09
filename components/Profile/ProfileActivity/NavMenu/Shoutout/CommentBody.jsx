import React, { useEffect, useState } from "react";
import Comments from "@/components/Layout/comments/CommentsAll";

const CommentBody = ({ item, likePost, user_id, path }) => {
    const [commentCount, setCommentCount] = useState(item?.comment ? item?.comment : 0);
    const [expandComments, setExpandComments] = useState(true);
    const [like, setLike] = useState(item?.like ? item?.like?.count : 0);
    return (
        <>
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
            <Comments currentUserId={user_id} path={path} commentCount={commentCount} ownerId={item?.from} setExpandComments={setExpandComments} expandComments={expandComments} setCommentCount={setCommentCount} type="shoutout" id={item?._id} />
        </>
    );
};

export default CommentBody;
