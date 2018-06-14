import React, { Component } from 'react';
import ItemCreate from './ItemCreate'

class ItemList extends Component {
  render() {

    //GENERATE TODOs LIST
    let itemsJSX = this.props.list.map((item, index) => {
      return <ItemCreate
        key={Date.now() * index}
        id={item.id}
        item={item.todoItem}
        complete={item.complete}
        category_id={item.category_id}
        category={this.props.category}
        itemComplete={this.props.itemComplete} />
    })

    return (
      <ul className="list-group">
        {itemsJSX}
      </ul>
    )
  }
}

export default ItemList;