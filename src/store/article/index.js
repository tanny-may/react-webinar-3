import StoreModule from "../module";

class Article extends StoreModule {
  initState() {
    return {
      articleData: {},
    };
  }

  async load(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=title,description,edition, price,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    console.log("JSON", json);
    this.setState(
      {
        ...this.getState(),
        articleData: json.result,
      },
      "Загружен товар по id"
    );
  }
}

export default Article;
