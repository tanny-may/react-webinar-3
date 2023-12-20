import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useSelector from "../../hooks/use-selector";
import { Link } from "react-router-dom";

function NewComment() {
  const cn = bem("NewComment");

  const select = useSelector((state) => ({
    session: state.session.exists,
  }));

  if (!select.session) {
    return (
      <p className={cn("desription")}>
        <Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать
      </p>
    );
  }

  return (
    <div className={cn()}>
      <p className={cn("text")}>
        <b>Новый комментарий</b>
      </p>
      <input className={cn("textarea")} type="text" placeholder="Текст"></input>
      <button className={cn("button")}>Отправить</button>
    </div>
  );
}

export default NewComment;
