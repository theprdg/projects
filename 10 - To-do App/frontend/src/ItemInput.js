import React, { Component } from 'react';

class ItemInput extends Component {

  userInput = (event) => {
    event.preventDefault();
    let item = this.refs.itemInput.value,
      category = this.refs.category.value;
    this.props.addItem(item, category);
    this.refs.itemInput.value = ''; //CLEAR INPUT FIELD
    this.refs.category.value = '0'; //RETURN PULL-DOWN OPTION TO DEFAULT
  }

  render() {

    //GENERATE PULL-DOWN OPTIONS
    let categoryJSX = this.props.category.map((obj, index) => {
      return (
        <option
          value={obj.id}
          key={Date.now() * index}>
          {obj.category}
        </option>
      )
    })

    return (
      <form onSubmit={this.userInput} className="form-box">
        <div className="input-group">
          <select className="box" ref="category">
            <option value="0" selected disabled>
              &#x25BC; &nbsp; Category
            </option>
            {categoryJSX}
          </select>
          <input className="form-control box" placeholder="add item" ref="itemInput" />
          <span className="input-group-btn">
            <button className="btn box" type="submit">
              <strong>+</strong>
            </button>
          </span>
        </div>
      </form>
    )
  }
}

export default ItemInput;