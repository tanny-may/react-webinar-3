import React from "react";
import "./style.css";
import BasketItem from "../basket-item";

function Basket({ basket, onSetBasketVisible, onDeleteItem }) {
  const totalPrice = Object.values(basket).reduce(
    (acc, el) => acc + el.price * el.count,
    0
  );

  return (
    <div className="Basket-blackout">
      <div className="Basket">
        <div className="Basket-title">
          <h1>Корзина</h1>
          <button onClick={() => onSetBasketVisible(false)}>Закрыть</button>
        </div>

        <div className="Basket-list">
          {Object.values(basket).map((item) => (
            <BasketItem
              item={item}
              key={item.code}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </div>
        <div className="Basket-totalPrice">
          <b>
            Итого <span>{totalPrice}</span> ₽
          </b>
        </div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    })
  ),
  onDeleteItem: PropTypes.func,
  onSetBasketVisible: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onSetBasketVisible: () => {},
};

export default Basket;
