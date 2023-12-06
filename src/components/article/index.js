import "./style.css";
import BasketTool from "../basket-tool";
import Head from "../head";
import { cn as bem } from "@bem-react/classname";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Article() {
  const params = useParams();
  const articleId = params.id;
  const store = useStore();
  useEffect(() => {
    store.actions.article.load(articleId);
  }, [articleId]);

  const cn = bem("Article");
  let articleData = useSelector((state) => state.article.articleData);
  console.log(articleData);

  return (
    <div className={cn()}>
      <Head title={articleData.title} />
      <BasketTool />
      <div className={cn("descrition")}>
        <p className={cn("info")}>{articleData.description}</p>
        <p className={cn("info")}>
          Страна-производитель: <b>{articleData.category ? articleData.madeIn.title + " (" + articleData.madeIn.code + ")" : ""}</b>{" "}
        </p>
        <p className={cn("info")}>
          Категория:{" "}
          <b>{articleData.category ? articleData.category.title : ""}</b>
        </p>
        <p className={cn("info")}>
          Год выпуска: <b>{articleData.edition}</b>{" "}
        </p>
        <p className={cn("price")}>
          Цена: <b>{articleData.price} ₽</b>{" "}
        </p>
      </div>
      <button className={cn("button")}>Добавить</button>
    </div>
  );
}

export default Article;
