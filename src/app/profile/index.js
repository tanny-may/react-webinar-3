import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import ProfileCard from "../../components/profile-card";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import { useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import LoginPanel from "../../components/login-panel";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.user.getCurrentUser();
    },
    [],
    true
  );

  const select = useSelector((state) => ({
    userInfo: state.user.userInfo,
  }));

  useEffect(() => {
    if (!select.userInfo) {
      navigate("/login");
    }
  });

  const callbacks = {
    onLogout: useCallback(() => store.actions.user.logout(), [store]),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginPanel
        userInfo={select.userInfo}
        onLogout={callbacks.onLogout}
      ></LoginPanel>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard userInfo={select.userInfo} />
    </PageLayout>
  );
}

export default Profile;
