import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class UserState extends StoreModule {
  initState() {
    return {
      token: localStorage.getItem("authToken"),
      errorMsg: null,
      userInfo: null,
    };
  }

  /**
   * Авторизация
   */
  async login({ login, password }) {
    this.setState({
      ...this.getState(),
      token: null,
      waiting: true,
    });
    const response = await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });
    const json = await response.json();
    if (response.status == 200) {
      this.setState(
        {
          ...this.getState(),
          token: json.result.token,
          userInfo: json.result.user,
          errorMsg: null,
          waiting: false,
        },
        "Пользватель авторизован"
      );
      localStorage.setItem("authToken", json.result.token);
      return;
    }
    this.setState({ ...this.getState(), errorMsg: json.error.message });
  }

  async logout() {
    await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": this.getState().token,
      },
    });
    this.setState(
      {
        ...this.getState(),
        userInfo: null,
        token: null,
        waiting: false,
      },
      "Пользватель разлогинился"
    );
    localStorage.removeItem("authToken");
  }

  async getCurrentUser() {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const response = await fetch("/api/v1/users/self", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    });
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        userInfo: json.result,
        waiting: false,
      },
      "Получили информацию о пользователе"
    );
  }
}

export default UserState;
