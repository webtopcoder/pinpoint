import { useState, useEffect } from "react";
import { commentService } from "@/services/index";
import CustomComment from "./Comment"
import { List, Divider } from 'antd';
import CommentForm from "./CommentForm"

const Comments = ({ currentUserId, type, id, expand, setCommentCount, expandComments, setExpandComments }) => {
  const [backendComments, setBackendcomments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);
  const getReplies = (commentId) => {
    return backendComments.filter(backendComment => backendComment.parentId === commentId).sort((a, b) => new Date(a.creaedAt).getTime() - new Date(b.createdAt).getTime())
  }

  const addComment = (text, parentId) => {
    commentService.createComment({ body: text, parentId: parentId, type: type, typeId: id }).then((comment) => {
      setBackendcomments([comment, ...backendComments]);
      setCommentCount((commentCount) => commentCount + 1);
      setExpandComments(true);
      setActiveComment(null)
    })
  }

  const updateComment = (text, commentId) => {
    commentService.updateComment({ body: text, id: commentId }).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text }
        }
        return backendComment
      })

      setBackendcomments(updatedBackendComments);
      setActiveComment(null)
    })
  }

  const deleteComment = (commentId) => {
    commentService.deleteComment({ id: commentId }).then(() => {
      const updatedBakendComments = backendComments.filter((backendComment) => backendComment.id !== commentId)
      setBackendcomments(updatedBakendComments);
      setCommentCount((commentCount) => commentCount - 1);
    })
  }

  useEffect(() => {
    commentService.getComments(id).then((data) => {
      setBackendcomments(data);
    })
  }, [])
  return (

    <div className="comments">
      <CommentForm submitLabel="write" expand={expand} handleSubmit={addComment} />
      <div className="comments-container" style={{
        display: backendComments.length > 0 && expandComments ? 'block' : 'none'
      }}>
        <Divider orientation="left">Comments</Divider>
        <List
          dataSource={rootComments}
          itemLayout="horizontal"
          renderItem={(rootComment) => <CustomComment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={currentUserId}
            getReplies={getReplies}
            deleteComment={deleteComment}
            updateComment={updateComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment} />}
        />
      </div>
    </div>
  );
};

export default Comments;
