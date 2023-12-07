import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    totalCount: state.catalog.totalCount,
    currentPage: state.catalog.currentPage,
  }));

  useEffect(() => {
    store.actions.catalog.load(select.currentPage);
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    setCurrentPage: useCallback((pageNumber) =>
      store.actions.catalog.setCurrentPage(pageNumber)
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalCount={select.totalCount}
        currentPage={select.currentPage}
        onClick={callbacks.setCurrentPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
