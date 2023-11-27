import CommentForm from "@/components/Common/CommentForm"
import { useState, useEffect } from "react";
import { Comment, Icon } from '@ant-design/compatible';
import { Avatar, List, Space, Tooltip, Popover } from 'antd';
import { apiBaseUrl } from "@/utils/baseUrl";
import { getDiffToNow } from "@/utils/date";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { commentService } from "@/services/index";
import PopUserBox from "@/components/Common/PopUserBox";
import useMedia from "@/hooks/useMedia";

const CustomComment = (
  {
    comment,
    replies,
    currentUserId,
    deleteComment,
    updateComment,
    activeComment,
    setActiveComment,
    addComment,
    parentId = null,
    getReplies
  }) => {
  const fiveMinutes = 300000;

  const isWebDevice = useMedia('(min-width:700px)');
  const router = useRouter();
  const [likes, setlikes] = useState(comment.like ? comment?.like?.count : 0);
  const [action, setaction] = useState('liked');
  const { notify } = useNotify();
  const createdAt = new Date(comment.createdAt).toDateString();
  const isReplying = activeComment && activeComment.type === "replying" && activeComment.id === comment.id;
  const isEditing = activeComment && activeComment.type === "editing" && activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;
  const avatarUrl = `${apiBaseUrl}/avatar/`;

  async function like(id) {
    setaction('liked');
    await commentService.recommendComment(id)
      .then((res) => {
        if (res.liked) {
          setlikes((likes) => likes + 1);
        } else {
          setlikes((likes) => (likes ? likes - 1 : likes));
        }
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
    <Comment
      actions={[
        <ul className="list-inline mb-0">
          {/* <Tooltip title="Like">
            <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={() => like(comment.id)}
            />
          </Tooltip> */}
          <li className="list-inline-item me-3"
            onClick={() => like(comment.id)}
          >
            <i className="bx bxs-like me-1 text-danger fs-5 heart-comment" />
            <span className="font-size-12 text-danger">{likes}</span>
          </li>
          <Popover content={<CommentForm user_id={currentUserId} handleSubmit={(text) => addComment(text, replyId, comment.userId.id)} />} placement="bottom" trigger="click">
            <li className="list-inline-item me-3">
              <i className="bx bxs-comment-dots me-1 text-danger fs-5 heart-comment" />
              <span className="font-size-12 text-danger">Reply</span>
            </li>
          </Popover>
          {/* <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span> */}
        </ul>,
        // canReply && <span key="comment-nested-reply-to" onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}>Reply to</span>,
        // canEdit && <span key="comment-nested-reply-to" onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>Edit</span>,
        // canDelete && <span key="comment-nested-reply-to" onClick={() => deleteComment(comment.id)}>Delete</span>
      ]}
      author={
        <PopUserBox
          id={comment?.userId?._id}
          avatar={comment?.userId?.profile.avatar?.filepath}
          name={comment?.userId?.name}
          username={comment?.userId?.username}
          role={comment?.userId?.role}
        />
      }
      avatar={<Avatar src={avatarUrl +
        comment?.userId.profile?.avatar?.filepath
      } alt={comment?.userId?.username} />}
      content={<p className="text-muted font-size-14"> {comment?.body}</p>}
      datetime={
        <Tooltip title={createdAt}>
          <span>{getDiffToNow(comment.createdAt)} ago
          </span>
        </Tooltip>
      }
    >
      {isReplying && (
        <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId, comment.userId.id)} />
      )}
      {isEditing && (
        <CommentForm submitLabel="Update" initialText={comment.body} handleSubmit={(text) => updateComment(text, comment.id)} />
      )}
      {replies && replies.length > 0 && (
        <List
          dataSource={replies}
          itemLayout="horizontal"
          renderItem={(reply) => <CustomComment
            comment={reply}
            key={reply.id}
            replies={getReplies(reply.id)}
            getReplies={getReplies}
            currentUserId={currentUserId}
            addComment={addComment}
            updateComment={updateComment}
            deleteComment={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            parentId={reply.id} />}
        />
      )}
    </Comment >
  );
};

export default CustomComment;
