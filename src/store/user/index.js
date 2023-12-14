import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class UserState extends StoreModule {
  initState() {
    return { token: null };
  }

  /**
   * Авторизация
   */
  async login({ login, password }) {
    this.setState({
      token: null,
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const json = await response.json();
      this.setState(
        {
          token: json.result.token,
          waiting: false,
        },
        "Пользватель авторизован"
      );
    } catch (e) {
      this.setState({
        token: null,
        waiting: false,
      });
    }
  }

  async logout() {
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.getState().token,
        },
      });
      const json = await response.json();
      this.setState(
        {
          token: json.result.token,
          waiting: false,
        },
        "Пользватель разлогинился"
      );
    } catch (e) {}
  }
}

export default UserState;
