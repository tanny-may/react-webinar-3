import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

export default function Controls({ basket, onSetBasketVisible }) {
  const totalPrice = Object.values(basket).reduce(
    (acc, el) => acc + el.price * el.count,
    0
  );
  const basketSize = Object.keys(basket).length;
  const basketEmpty = basketSize === 0;

  return (
    <div className="Controls">
      <div className="Controls-div">
        В корзине:{" "}
        <b>
          {basketEmpty
            ? "пусто"
            : `${basketSize}  ${plural(basketSize, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} `}
        </b>
        {basketEmpty ? "" : "/" + totalPrice + " ₽"}
      </div>
      <button onClick={() => onSetBasketVisible(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ),
  onSetBasketVisible: PropTypes.func,
};

Controls.defaultProps = {
  onSetBasketVisible: () => {},
};
