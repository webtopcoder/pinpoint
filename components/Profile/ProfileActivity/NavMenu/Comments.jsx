import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { Popover } from 'antd';

function Comments({ user_id, item }) {

    const [comment, setCommentCount] = useState(item?.comment ? item?.comment : 0);
    const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);
    const [backendComments, setBackendcomments] = useState([]);

    const addComment = (text, parentId = null, oriuserId = null) => {
        commentService.createComment({ body: text, parentId: parentId, type: type, typeId: id, path: path }, oriuserId).then((comment) => {
            setBackendcomments([comment, ...backendComments]);
            setCommentCount((commentCount) => commentCount + 1);
            setExpandComments(true);
            setActiveComment(null)
        })
    }
    return (
        <Popover content={<CommentForm handleSubmit={(text) => addComment(text, null, ownerId)} user_id={user_id} />} placement="bottom" trigger="click">
            <li className="list-inline-item me-3">
                <i className="bx bxs-comment-dots me-1 tcl-darkblue fs-4 heart-comment" />
                <span className="fs-6 tcl-darkblue">{comment}</span>
            </li>
        </Popover>
    )
}

export default Comments;
