import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import Nav from './Nav'

const Home = () => {
   const [productsBySell, setProductsBySell] = useState([]);
  // const [productsByArrival, setProductsByArrival] = useState([]);
  // const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then(() => {
      // if (data.error) {
      //   setError(data.error);
      // } else {
      //   setProductsBySell(data);
      // }
    });
  };

  // const loadProductsByArrival = () => {
  //   getProducts("createdAt").then(data => {
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       setProductsByArrival(data);
  //     }
  //   });
  // };

   useEffect(() => {
  //   loadProductsByArrival();
     loadProductsBySell();
   }, []);

  return (
    <div>
        <Nav />
        <h2 className="text-center">New Arrivals</h2>
      <div className="row">
        {/* {productsByArrival.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))} */}
      </div>

      <h2 className="text-center">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home