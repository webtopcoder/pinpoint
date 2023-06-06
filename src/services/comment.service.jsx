import api from "@/utils/callApi";

function CommentService() {


  function recommendComment(id) {
    return api(`comment/${id}/like`, "post");
  }

  function getComments(typeId) {
    return api(`comment/${typeId}`, "get");
  }

  function createComment(formData) {
    return api(`comment`, "post", formData);
  }

  function deleteComment(formData) {
    return api(`comment`, "delete", formData);
  }

  function updateComment(formData) {
    return api(`comment`, "patch", formData);
  }

  return {
    getComments,
    createComment,
    deleteComment,
    updateComment,
    recommendComment,
  };
}

export const commentService = CommentService();