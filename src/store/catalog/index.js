import { codeGenerator } from "../../utils";
import StoreModule from "../module";
import { pageSize } from "../../const";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      totalCount: 0,
    };
  }

  async load(currentPage) {
    const skip = pageSize * (currentPage - 1);
    const response = await fetch(
      `/api/v1/articles?limit=${pageSize}&skip=${skip}&fields=items(_id, *),count`
    );
    const json = await response.json();
    console.log(json);
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalCount: json.result.count,
      },
      "Загружены товары из АПИ"
    );
  }

  setCurrentPage(number) {
    this.setState(
      {
        ...this.getState(),
        currentPage: number,
      },
      "Изменен номер текущей страницы"
    );
  }
}

export default Catalog;
