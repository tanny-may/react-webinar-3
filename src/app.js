import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, basket } = store.getState();
  const [basketVisible, setBasketVisible] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),

    onAddItem: useCallback(
      (item) => {
        store.addItem(item);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls basket={basket} onSetBasketVisible={setBasketVisible} />
      <List list={list} onAddItem={callbacks.onAddItem} />
      {basketVisible && (
        <Basket
          basket={basket}
          onSetBasketVisible={setBasketVisible}
          onDeleteItem={callbacks.onDeleteItem}
        />
      )}
    </PageLayout>
  );
}

export default App;
