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
      let sourceCategories = [...select.categories];
      let categories = [{ value: "all", title: "Все" }];

      while (sourceCategories.length > 0) {
        let newSource = [];
        for (let item of sourceCategories) {
          if (!item.parent) {
            categories.push({
              value: item._id,
              title: item.title,
              level: 0,
            });
          } else {
            let parentIndex = categories.findIndex(
              (el) => el.value === item.parent._id
            );
            if (parentIndex === -1) {
              newSource.push(item);
              continue;
            }

            let parent = categories[parentIndex];
            categories.splice(parentIndex + 1, 0, {
              value: item._id,
              title: "- ".repeat(parent.level + 1) + item.title,
              level: parent.level + 1,
            });
          }
          sourceCategories = newSource;
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
