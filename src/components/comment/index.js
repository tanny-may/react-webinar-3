import { cn as bem } from "@bem-react/classname";
import "./style.css";
import NewComment from "../new-comment";
import { useDispatch } from "react-redux";

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

function Comment({ item, comments, newCommentParent }) {
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
          <b>{item.author.profile.name}</b>
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
      {newCommentParent === item._id && (
        <NewComment parentType={"comment"} parentId={item._id} />
      )}
      {comments.length > 0 && (
        <ul>
          {comments
            .filter((comment) => comment.parent._id === item._id)
            .map((comment) => (
              <Comment
                key={comment._id}
                item={comment}
                comments={comments.filter(
                  (comment) => comment.parent._id !== item._id
                )}
                newCommentParent={newCommentParent}
              />
            ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;