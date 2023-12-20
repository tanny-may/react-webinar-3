import { cn as bem } from "@bem-react/classname";
import Comment from "../comment";
import "./style.css";
import NewComment from "../new-comment";

function CommentZone({ articleId, comments, newCommentParent }) {
  const cn = bem("CommentZone");
  const commentItems = comments
    .filter((item) => item.parent._type === "article")
    .map((item) => (
      <Comment
        item={item}
        key={item._id}
        comments={comments.filter((item) => item.parent._type === "comment")}
        newCommentParent={newCommentParent}
      />
    ));

  return (
    <div className={cn()}>
      <h2 className={cn("header")}>Комментарии ({comments.length})</h2>
      <ul className={cn("list")}>{commentItems}</ul>
      {newCommentParent === articleId && <NewComment />}
    </div>
  );
}

export default CommentZone;
