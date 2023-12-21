import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useSelector from "../../hooks/use-selector";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import articleActions from "../../store-redux/article/actions";
import { useState } from "react";

function NewComment({ parentType, parentId, articleId }) {
  const cn = bem("NewComment");
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const select = useSelector((state) => ({
    session: state.session.exists,
  }));

  if (!select.session) {
    if (parentType === "article") {
      return (
        <p className={cn("desription")}>
          <Link to="/login">Войдите</Link>, чтобы иметь возможность{" "}
          комментировать
        </p>
      );
    } else {
      return (
        <p className={cn("desription")}>
          <Link to="/login">Войдите</Link>, чтобы иметь возможность ответить.{" "}
          <Link to="">Отмена</Link>
        </p>
      );
    }
  }

  return (
    <div className={cn()}>
      <p className={cn("text")}>
        <b>Новый комментарий</b>
      </p>
      <input
        className={cn("textarea")}
        type="text"
        placeholder="Текст"
        onInput={(event) => setValue(event.target.value)}
        value={value}
      ></input>
      <div className={cn("twoButtons")}>
        <button
          className={cn("button")}
          onClick={() => {
            dispatch(
              articleActions.createComment(value, {
                _type: parentType,
                _id: parentId,
              })
            );
            setValue("");
          }}
        >
          Отправить
        </button>

        {parentType === 'comment' &&
        <button
          onClick={() =>
            dispatch({
              type: "article/new-comment-parent",
              payload: { _id: articleId },
            })
          }
          className={cn("button")}
        >
          Отмена
        </button>}
      </div>
    </div>
  );
}

export default NewComment;
