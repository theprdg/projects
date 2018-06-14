import React, { Component } from 'react';

class ItemCreate extends Component {
  render() {

    //FILTER AND DISPLAY CATEGORY OF TODO ITEM BY CATEGORY_ID
    let category;
    this.props.category
      .filter(obj => {
        if (obj.id === Number(this.props.category_id)) {
          if (obj.id === 0) //DISPLAY BLANK IF UNCATEGORIZED 
            category = ''
          else
            category = obj.category
        }
      })

    return (
      <li className="list-group-item li-box">
        <input
          type="checkbox"
          value="on"
          onChange={() => this.props.itemComplete(this.props.id)}
          checked={this.props.complete} />
        <label
          className={this.props.complete === false ? "" : "done"}>
          {this.props.item}
        </label>
        <span className="category">
          :{category}
        </span>
      </li>
    )
  }
}

export default ItemCreate;