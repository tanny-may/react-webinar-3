import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LoginCard from "../../components/login-card";
import LocaleSelect from "../../containers/locale-select";
import { useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function Login() {
  const store = useStore();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const callbacks = {
    // Добавление в корзину
    onLogin: useCallback(
      (credentials) => store.actions.user.login(credentials),
      [store]
    ),
  };
  return (
    <PageLayout>
      <Head>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginCard onLogin={callbacks.onLogin} />
    </PageLayout>
  );
}

export default Login;
