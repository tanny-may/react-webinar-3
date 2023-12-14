import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LoginCard from "../../components/login-card";
import LocaleSelect from "../../containers/locale-select";
import { useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import LoginPanel from "../../components/login-panel";
import useTranslate from "../../hooks/use-translate";

function Login() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    token: state.user.token,
    authError: state.user.errorMsg,
  }));

  useEffect(() => {
    if (select.token) {
      navigate("/");
    }
  }, [select.token]);

  const callbacks = {
    // Добавление в корзину
    onLogin: useCallback(
      (credentials) => store.actions.user.login(credentials),
      [store]
    ),
  };
  const { t } = useTranslate();
  return (
    <PageLayout>
         <LoginPanel/>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginCard onLogin={callbacks.onLogin} authError={select.authError} />
    </PageLayout>
  );
}

export default Login;
