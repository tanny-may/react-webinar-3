import { cn as bem } from "@bem-react/classname";
import "./style.css";
import NewComment from "../new-comment";
import { useDispatch } from "react-redux";
import { article } from "../../store/exports";

const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

function Comment({
  item,
  comments,
  newCommentParent,
  articleId,
  currentUserID,
  level = 0,
}) {
  const cn = bem("Comment");
  const dispatch = useDispatch();

  let date = new Date(item.dateCreate).toLocaleDateString("ru-RU").split(".");
  let time = new Date(item.dateCreate).toLocaleTimeString("ru-RU");
  let formatDate = date[0] + " " + months[date[1] - 1] + " " + date[2];
  let formatTime = time.slice(0, -3);

  return (
    <li className={cn("item")}>
      <div className={cn("header")}>
        <p className={cn("user")}>
          <b
            style={{
              color: currentUserID === item.author._id ? "#666666" : "#000000",
            }}
          >
            {item.author.profile.name}
          </b>
        </p>
        <p className={cn("data")}>{formatDate + " в " + formatTime}</p>
      </div>
      <p className={cn("text")}>{item.text}</p>
      <button
        className={cn("button")}
        onClick={() =>
          dispatch({
            type: "article/new-comment-parent",
            payload: { _id: item._id },
          })
        }
      >
        Ответить
      </button>
      <ul style={{ padding: level < 3 ? "40" : "0" }}>
        {comments.length > 0 &&
          comments
            .filter((comment) => comment.parent._id === item._id)
            .map((comment) => (
              <Comment
                key={comment._id}
                item={comment}
                comments={comments.filter(
                  (comment) => comment.parent._id !== item._id
                )}
                newCommentParent={newCommentParent}
                articleId={articleId}
                level={level + 1}
                currentUserID={currentUserID}
              />
            ))}
        {newCommentParent === item._id && (
          <NewComment
            parentType={"comment"}
            parentId={item._id}
            articleId={articleId}
          />
        )}
      </ul>
    </li>
  );
}

export default Comment;
