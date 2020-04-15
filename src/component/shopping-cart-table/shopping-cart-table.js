import React from 'react';
import { connect } from 'react-redux';

import { onDelete, onInc, onDec } from '../../actions';

import './shopping-cart-table.css';

const ShoppingCartTable = ({ items, total, onDelete, onInc, onDec }) => {

  const renderRow = (item, i) => {
    const { id, name, price, count } = item;
    return (
      <tr key={id}>
        <td>{i + 1}</td>
        <td>{name}</td>
        <td>{count}</td>
        <td>${price}</td>
        <td>
          <button 
          className="btn btn-outline-danger btn-sm float-right"
          onClick={() => onDelete(id)}>
            <i className="fa fa-trash-o" />
          </button>
          <button 
          className="btn btn-outline-success btn-sm float-right"
          onClick={() => onInc(id)}>
            <i className="fa fa-plus-circle" />
          </button>
          <button 
          className="btn btn-outline-warning btn-sm float-right"
          onClick={() => onDec(id)}>
            <i className="fa fa-minus-circle" />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>
          {items.map((item, i ) => renderRow(item, i))}
          
        </tbody>
      </table>

      <div className="total">
        Total: ${total}
      </div>
    </div>
  );
};

const mapStateToProps = ({shoppingCart: { cartItems, orderTotal }}) => {
  return {  
    items: cartItems,
    total: orderTotal
  };
};

const mapDispatchToProps = { 
  onDelete, 
  onInc, 
  onDec 
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);