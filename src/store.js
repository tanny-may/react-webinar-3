import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление нового товара в корзину
   */
  addItem(item) {
    let state = {
      ...this.state,
    }
    if(state.basket[item.code]) {
      state.basket[item.code].count++;
    } else {
      state.basket[item.code] = {
        code: item.code,
        title: item.title,
        price: item.price,
        count: 1,
      };
    }
    this.setState(state);
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(item) {
    let state = {
      ...this.state,
    }
    delete state.basket[item.code];
    this.setState(state);
  };
}

export default Store;
