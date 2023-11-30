import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item({ item, onAddItem }) {
  const callbacks = {
    onAddItem: (e) => {
      e.stopPropagation();
      onAddItem(item);
    },
  };

  return (
    <div
      className={"Item" + (item.selected ? " Item_selected" : "")}
      onClick={callbacks.onClick}
    >
      <div className="Item-left">
        <div className="Item-code">{item.code}</div>
        <div className="Item-title">{item.title}</div>
      </div>

      <div className="Item-right">
        <div className="Item-price">{item.price + " ₽"}</div>
        <div className="Item-actions">
          <button onClick={callbacks.onAddItem }>Добавить</button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddItem: PropTypes.func,
};

Item.defaultProps = {
  onAddItem: () => {},
};

export default React.memo(Item);
