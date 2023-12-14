import { useState } from "react";
import Input from "../input";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginCard({ onLogin, authError }) {
  const cn = bem("LoginCard");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={cn()}>
      <h1>Вход</h1>
      <label>Логин</label>
      <Input value={login} onChange={(value) => setLogin(value)} />
      <label>Пароль</label>
      <Input
        type={"password"}
        value={password}
        onChange={(value) => setPassword(value)}
      />
      {authError && <p>{authError}</p>}
      <button onClick={() => onLogin({ login, password })}>Войти</button>
    </div>
  );
}

export default LoginCard;
