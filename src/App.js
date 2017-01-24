import React, { Component } from 'react';
import axios from 'axios';
import logo from './best-buy-logo.svg';
import './App.css';
import {Link} from 'react-router';

class App extends Component {

constructor () {
   super()
   this.state = {
     products: []

    //  name: "",
    //  image: "",
    //  price: "",
    //  model: "",
    //  description: ""
   }
 }

 componentDidMount () {
   axios.get("http://localhost:3030/products?$sort[price]=-1&$limit=20").then(response => this.setState({
     products: response.data.data



    //  name: response.data.data[0].name,
    //  image: response.data.data[0].image,
    //  price: response.data.data[0].price,
    //  description: response.data.data[0].description
   }))
 }

 searchProduct(){
   let productSearch = this.searchInput.value
   axios.get(`http://localhost:3030/products?name[$like]=${productSearch}`).then(response => this.setState({
     search: this.searchInput.value,
     products: response.data.data
   }))
 }

 delete(product){
    const newState = this.state.products;
    if (newState.indexOf(product) > -1) {
      newState.splice(newState.indexOf(product), 1);
      this.setState({products: newState})
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="itemImg" src={logo} className="App-logo" alt="logo" />
          <h2>Welcome To The Best Buy API</h2>
        </div>
        <div className="productSearch">
          <input className="searchProduct" type="text" placeholder="enter product name" ref={(input) => { this.searchInput = input }}/>
          <button onClick={this.searchProduct.bind(this)}>Search</button>
          <button>Add Product</button>
        </div>
        {this.state.products.map(product => {
          return (
          <div className="product-list">
            <ul>
              <li className="name">{product.name}</li>
              <li><img className="listImg" src={product.image}/></li>
              <li className="price">{product.price}</li>
              <li className="name">{product.model}</li>
              <li className="name">{product.id}</li>
              <li className="name">{product.description}</li>
            </ul>
            <button onClick={this.delete.bind(this, product)} className="delete">Delete</button>

          </div>
        )
      }
    )}
    <hr></hr>

    </div>

    );
  }
}

export default App;
