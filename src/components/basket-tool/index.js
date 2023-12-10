import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { Link } from "react-router-dom";

function BasketTool() {
  const cn = bem("BasketTool");
  const store = useStore();
  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  return (
    <div className={cn()}>
      <div>
        <Link className={cn("main")} to="/">
          Главная
        </Link>
      </div>

      <div className={cn("label")}>
        <span>В корзине:</span>
        <span className={cn("total")}>
          {select.amount
            ? `${select.amount} ${plural(select.amount, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${numberFormat(select.sum)} ₽`
            : `пусто`}
        </span>
        <button onClick={callbacks.openModalBasket}>Перейти</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
