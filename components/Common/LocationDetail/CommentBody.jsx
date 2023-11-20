import React, { useEffect, useState } from "react";
import Comments from "@/components/Layout/comments/CommentsAll";
import { locationService, commentService } from "@/services/index";
import { Rate } from "antd";
const CommentBody = ({ item, user_id, path }) => {
  const [commentCount, setCommentCount] = useState(item?.comment ? item?.comment : 0);
  const [expandComments, setExpandComments] = useState(true);
  const [like, setLike] = useState(item?.like ? item?.like?.count : 0);

  return (
    <>
      {item?.rating !== 0 &&
        <li className="list-inline-item me-3" >
          <Rate disabled allowHalf key={item?.rating} defaultValue={item?.rating} />
        </li>}
      <li className="list-inline-item me-3"
        onClick={async () => {
          if (!user_id) {
            notify(
              "error",
              "Please login"
            );
            return;
          }
          await locationService.likeReview(item?._id)
            .then(async (res) => {
              if (res.liked) {
                setLike((like) => like + 1);
              } else {
                setLike((like) => (like ? like - 1 : like));
              };
            })
            .catch((error) => {
              console.log(error);
              return;
            });
        }}
      >
        <i className="bx bxs-heart me-1 text-danger fs-4 heart-comment" />
        <span className="fs-6 text-danger">{like}</span>
      </li>
      {item && <Comments currentUserId={user_id} path={path} commentCount={commentCount} ownerId={item?.user?._id} setExpandComments={setExpandComments} expandComments={expandComments} setCommentCount={setCommentCount} type="location" id={item?._id} />
      }
    </>
  );
};

export default CommentBody;
