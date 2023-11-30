import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function BasketItem({ item, onDeleteItem }) {
  const callbacks = {
    onDeleteItem: (e) => {
      e.stopPropagation();
      onDeleteItem(item);
    },
  };

  return (
    <div className="BasketItem">
      <div className="BasketItem-left">
        <div className="BasketItem-code">{item.code}</div>
        <div className="BasketItem-title">{item.title}</div>
      </div>

      <div className="BasketItem-right">
        <div className="BasketItem-price">{item.price + " ₽"}</div>
        <div className="BasketItem-count">{item.count + " шт"}</div>
        <div className="BasketItem-actions">
          <button onClick={callbacks.onDeleteItem}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDeleteItem: PropTypes.func,
};

BasketItem.defaultProps = {
  onDeleteItem: () => {},
};

export default BasketItem;
