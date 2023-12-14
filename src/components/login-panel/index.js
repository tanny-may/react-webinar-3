import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginPanel({ token, onLogout }) {
  const cn = bem("LoginPanel");
  return (
    <div className={cn()}>
      <p>User1</p>
      {token ? (
        <button onClick={onLogout}>Выход</button>
      ) : (
        <Link to="/login">
          <button>Вход</button>
        </Link>
      )}
    </div>
  );
}

export default LoginPanel;
