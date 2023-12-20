export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "article/load-start" });
      let articleData;
      try {
        const res = await services.api.request({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
        });
        articleData = res.data.result;
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "article/load-error" });
        return;
      }

      let comments = [];
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        comments = res.data.result.items.filter(
          (item) => item.isDeleted === false
        );
      } catch (e) {
        console.log(`Failed to load comments for article: ${id}`);
      }

      // Товар загружен успешно
      dispatch({
        type: "article/load-success",
        payload: { data: articleData, comments: comments },
      });
    };
  },
};
