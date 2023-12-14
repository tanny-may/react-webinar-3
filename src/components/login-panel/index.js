import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginPanel({ userInfo, onLogout }) {
  const cn = bem("LoginPanel");
  return (
    <div className={cn()}>
      {userInfo && (
        <Link to="/profile">
          <p className={cn("userName")}>{userInfo.profile.name}</p>
        </Link>
      )}
      {userInfo ? (
        <Link to="/">
          <button className={cn("button")} onClick={onLogout}>Выход</button>
        </Link>
      ) : (
        <Link to="/login">
          <button className={cn("button")}>Вход</button>
        </Link>
      )}
    </div>
  );
}

export default LoginPanel;
