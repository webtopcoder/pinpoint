import React, { useEffect, useState } from "react";

function LikePost({ likePost, user_id, item }) {
    const [like, setLike] = useState(item.like ? item?.like?.count : 0);
    return (
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
    )
}

export default LikePost;
