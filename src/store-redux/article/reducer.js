// Начальное состояние
export const initialState = {
  data: {},
  comments: [],
  newCommentParent: null,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article/load-start":
      return { ...state, data: {}, comments: [], waiting: true };

    case "article/load-success":
      return {
        ...state,
        data: action.payload.data,
        comments: action.payload.comments,
        newCommentParent: action.payload.data._id,
        waiting: false,
      };

    case "article/load-error":
      return { ...state, data: {}, comments: [], waiting: false }; //@todo текст ошибки сохранять?

    case "article/new-comment-parent":
      return { ...state, newCommentParent: action.payload._id };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
