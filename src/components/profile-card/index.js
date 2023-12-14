import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ProfileCard({ userInfo }) {
  const cn = bem("ProfileCard");
  if (!userInfo) return <></>;

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <p>
        Имя &nbsp;
        <b>{userInfo.profile.name}</b>
      </p>
      <p>
        Телефон &nbsp;
        <b>{userInfo.profile.phone}</b>
      </p>
      <p>
        email &nbsp;
        <b>{userInfo.email}</b>
      </p>
    </div>
  );
}

export default ProfileCard;
