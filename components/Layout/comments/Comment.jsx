import CommentForm from "./CommentForm"
import { useState, useEffect } from "react";
import { Comment, Icon } from '@ant-design/compatible';
import { Avatar, List, Space, Tooltip } from 'antd';
import { apiBaseUrl } from "@/utils/baseUrl";
import { getDiffToNow } from "@/utils/date";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { commentService } from "@/services/index";

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
  const router = useRouter();
  const [likes, setlikes] = useState(comment.like ? comment?.like?.count : 0);
  const [action, setaction] = useState('liked');
  const { notify } = useNotify();
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId.id && !timePassed;
  const canDelete = currentUserId === comment.userId.id && !timePassed;
  const createdAt = new Date(comment.createdAt).toDateString();
  const isReplying = activeComment && activeComment.type === "replying" && activeComment.id === comment.id;
  const isEditing = activeComment && activeComment.type === "editing" && activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id
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
        <span key="comment-basic-like">
          <Tooltip title="Like">
            <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={() => like(comment.id)}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
        </span>,
        canReply && <span key="comment-nested-reply-to" onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}>Reply to</span>,
        canEdit && <span key="comment-nested-reply-to" onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>Edit</span>,
        canDelete && <span key="comment-nested-reply-to" onClick={() => deleteComment(comment.id)}>Delete</span>]}
      author={<a onClick={() => router.push(`/profile/${comment?.userId?._id}/activity`)}> {comment?.userId?.businessname}</ a>}
      avatar={<Avatar src={avatarUrl +
        comment?.userId.profile?.avatar?.filepath
      } alt={comment?.userId?.username} />}
      content={< p > {comment?.body}</p >}
      datetime={
        <Tooltip title={createdAt}>
          <span>{getDiffToNow(comment.createdAt)} ago
          </span>
        </Tooltip>
      }
    >
      {isReplying && (
        <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)} />
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
