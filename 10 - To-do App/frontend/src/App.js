import React, { Component } from 'react';
import axios from 'axios';
import ItemInput from './ItemInput';
import ItemList from './ItemList';

class App extends Component {

  constructor() {
    super();
    this.state = {
      list: [],
      category: [],
      value: '' //HOLDS VALUE OF SELECTED PULL-DOWN
    }
  }

  //RETRIEVE DATABASE
  componentDidMount() {

    //GET TODO TABLE
    axios.get('http://localhost:8080/')
      .then(response => {
        this.setState({
          list: response.data
        })
        console.log('Todo table retrieved')
      })
      .then(() => {

        //GET CATEGORY TABLE
        axios.get('http://localhost:8080/category')
          .then(response => {
            this.setState({
              category: response.data
            })
            console.log('Category table retrieved')
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        console.log(error);
      })
  }

  //ADD NEW ITEM TO LIST
  addItem = (todoItem, category) => {
    let newItem = {
      todoItem: todoItem,
      complete: false,
      category_id: category
    },
      listCopy = Array.from(this.state.list);

    //ADD TODO ITEM IF NOT EMPTY
    if (todoItem.split(' ').join('') !== '') {
      axios.post('http://localhost:8080/', newItem)
        .then(response => {
          listCopy.push(response.data);
          console.log('Add item sent to server')
          this.setState({
            list: listCopy
          })
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  //MATCH ITEM ID TO FLAG AS COMPLETE OR NOT
  itemComplete = (index) => {
    let listCopy = Array.from(this.state.list),
      findIndex = listCopy.findIndex(elem => elem.id === index);

    //UPDATE ITEM AS COMPLETE OR NOT
    !listCopy[findIndex].complete ?
      listCopy[findIndex].complete = true :
      listCopy[findIndex].complete = false

    let itemUpdate = {
      id: index,
      complete: listCopy[findIndex].complete
    }

    //UPDATE COMPLETENESS ON THE SERVER
    axios.put('http://localhost:8080/', itemUpdate)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      })

    this.setState({
      list: listCopy
    })
  }

  //CLEAR COMPLETED ITEMS
  clearComplete = () => {
    let listCopy = [];

    //COLLECT ITEMS THAT AREN'T COMPLETE
    this.state.list.map(obj => {
      if (!obj.complete) listCopy.push(obj)
    })

    //DELETE ITEMS FLAGGED AS COMPLETE
    axios.delete('http://localhost:8080/')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      })

    this.setState({
      list: listCopy
    })
  }

  //IDENTIFY SELECTOR CATEGORY
  filterList = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {

    //GENERATE ITEMS FOR PULL-DOWN MENU
    let categoryJSX = this.state.category.map((obj, index) => {
      return (
          <option value={obj.id} key={index}>
            {obj.category}
          </option>
      )
    })

    //FILTER TO-DO LIST BY CATEGORY
    let filterList = Array.from(this.state.list);
    if (this.state.value === '') { }
    else if (this.state.value === 'active')
      filterList = this.state.list.filter(obj => obj.complete === false)
    else if (this.state.value === 'complete')
      filterList = this.state.list.filter(obj => obj.complete === true)
    else { 
      filterList = this.state.list.filter(obj => Number(obj.category_id) === Number(this.state.value))
    }

    //TOGGLE STATE OF 'CLEAR COMPLETE' BUTTON BASED ON EXISTENCE OF COMPLETED ITEMS
    let isDisabled = false;
    if (this.state.list.filter(obj => obj.complete === true).length === 0)
      isDisabled = true;

    //COUNT ITEMS FLAGGED AS COMPLETE
    let completeCount = 0;
    this.state.list.reduce(function (acc, current) {
      if (current.complete) return completeCount++;
    }, 0)

    return (
      <div className="App">
        <div className="container">
          <h1 className="text-center">
            <strong>To-Do in Elegance</strong>
          </h1>
          <ItemInput
            addItem={this.addItem}
            category={this.state.category} />
          <ItemList
            list={filterList}
            itemComplete={this.itemComplete}
            category={this.state.category} />
          <select onChange={this.filterList}>
            <option value="">All (
            {this.state.list.length})
            </option>
            <option value="active">Active ({this.state.list.length - completeCount})</option>
            <option value="complete">Complete ({completeCount})
            </option>
            {categoryJSX}
          </select>
          <button
            disabled={isDisabled}
            className="pull-right btn btn-default box"
            onClick={this.clearComplete}>Clear Complete</button>
        </div>
      </div>
    )
  }
}

export default App;