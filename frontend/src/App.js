import React, { useState, useEffect } from "react";

import './App.css';

import Header from './components/header/header';
import NewProduct from './components/products/newProduct';
import ProductList from "./components/products/productList";

function App() {
  // TODO:
  // render the complete UI
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/products');

      const responseData = await response.json();

      setLoadedProducts(responseData.products);

      console.log(responseData);

      setIsLoading(false);

    };

    fetchProducts(); // call the above func
  }, []);

  // put the entered product
  const addProductHandler = async (productName, productPrice) => {
    try {
      // product object that will be sent to server
      const newProduct = {
        title: productName,
        price: +productPrice
      };

      let hasError = false;

      const response = await fetch('http://localhost:5000/product', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok){
        hasError = true;
      }

      const responseData = await response.json();

      if (hasError) {
        throw new Error(responseData.message);
      }

      setLoadedProducts(prevProducts => {
        return prevProducts.concat({
          ...newProduct,
          id: responseData.product.id
        });
      });
    } catch (err){
      alert(err.message || 'Oops! Looks like something went wrong!');
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <NewProduct onAddProduct={addProductHandler} />
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && <ProductList items={loadedProducts} />}
      </main>
    </React.Fragment>
  );

}

export default App;