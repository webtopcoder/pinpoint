import { useState, useEffect } from "react";
import { commentService } from "@/services/index";
import CustomComment from "./Comment"
import { List, Divider, Popover, Button } from 'antd';
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import CommentForm from "@/components/Common/CommentForm"
import classnames from "classnames";
import useNotify from "@/hooks/useNotify";

const Comments = ({ ownerId, currentUserId, type, id, setCommentCount, expandComments, setExpandComments, path, commentCount }) => {

  const [backendComments, setBackendcomments] = useState([]);
  const { notify } = useNotify();
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);
  const getReplies = (commentId) => {
    return backendComments.filter(backendComment => backendComment.parentId === commentId).sort((a, b) => new Date(a.creaedAt).getTime() - new Date(b.createdAt).getTime())
  }

  const addComment = (text, parentId = null, oriuserId = null) => {
    commentService.createComment({ body: text, parentId: parentId, type: type, typeId: id, path: path }, oriuserId).then((comment) => {
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
    }).catch((error) => {
      notify(
        "error",
        "Something went wrong"
      );
    });
  }, [])
  return (
    <>
      <Popover content={<CommentForm user_id={currentUserId} handleSubmit={(text) => addComment(text, null, ownerId)} />} placement="bottom" trigger="click">
        <li className="list-inline-item me-3">
          <i className="bx bxs-comment-dots me-1 text-danger fs-4 heart-comment" />
          <span className="fs-6 text-danger">{commentCount}</span>
        </li>
      </Popover>
      <div className="comments">
        <Divider style={{ margin: '4px 0' }} className={classnames({ 'd-none': commentCount === 0 })} orientation="left">
          <Button onClick={() => {
            setExpandComments(!expandComments);
          }} icon={expandComments ? <DownOutlined /> : <UpOutlined />} type="link">Comments ({commentCount})</Button>
        </Divider>
        <div className="comments-container" style={{
          display: backendComments.length > 0 && expandComments ? 'block' : 'none'
        }}>
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
    </>
  );
};

export default Comments;
