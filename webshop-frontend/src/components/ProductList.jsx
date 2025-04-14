import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category_id");

  useEffect(() => {
    let url = "http://localhost:8000/api/products";
    if (categoryId) {
      url += `?category_id=${categoryId}`;
    }

    axios.get(url)
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.error("Hiba a termékek lekérésekor:", err));
  }, [categoryId]);

  return (
    <div>
      <h2>Termékek</h2>
      {products.length === 0 ? (
        <p>Nincs termék ebben a kategóriában.</p>
      ) : (
        <div>
          {products.map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.price} Ft</p>
              <img src={product.image} alt={product.name} width="100" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
