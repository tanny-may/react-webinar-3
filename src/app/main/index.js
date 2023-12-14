import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import LoginPanel from "../../components/login-panel";
import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  const token = useSelector((state) => state.user.token);

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.user.getCurrentUser();
    },
    [],
    true
  );

  const callbacks = {
    onLogout: useCallback(() => store.actions.user.logout(), [store]),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginPanel token={token} onLogout={callbacks.onLogout}></LoginPanel>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
