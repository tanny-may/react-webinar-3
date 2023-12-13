import { memo, useCallback, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    category: state.catalog.params.category,
    categories: state.catalog.categories || [],
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // фильтрация
    onFilter: useCallback(
      (category) => store.actions.catalog.setParams({ category, page: 1 }),
      [store]
    ),
    // Сортировка
    onSort: useCallback(
      (sort) => store.actions.catalog.setParams({ sort }),
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query) => store.actions.catalog.setParams({ query, page: 1 }),
      [store]
    ),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    category: useMemo(() => {
      let categories = [{ value: "all", title: "Все", _id: 0 }];
      for (let item of select.categories) {
        if (!item.parent) {
          categories.push({
            value: item._id,
            title: item.title,
            _id: item._id,
            parent: item.parent,
          });
        }
      }

      for (let item of select.categories) {
        if (item.parent) {
          let parentIndex = categories.findIndex(
            (el) => el._id == item.parent._id
          );
          if (parentIndex === -1) continue;
          let parent = categories[parentIndex];
          if (parent.parent) continue;
          categories.splice(parentIndex + 1, 0, {
            value: item._id,
            title: "- " + item.title,
            _id: item._id,
            parent: item.parent,
          });
        }
      }

      for (let item of select.categories) {
        if (item.parent) {
          let parentIndex = categories.findIndex(
            (el) => el._id == item.parent._id
          );
          let parent = categories[parentIndex];

          if (!parent.parent) continue;
          parentIndex = categories.findIndex((el) => el._id == parent._id);
          categories.splice(parentIndex + 1, 0, {
            value: item._id,
            title: "- - " + item.title,
          });
        }
      }

      return categories;
    }, [select.categories]),
    sort: useMemo(
      () => [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.category}
        value={select.category}
        onChange={callbacks.onFilter}
      ></Select>
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={"Поиск"}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
