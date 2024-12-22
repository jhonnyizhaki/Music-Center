import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ShopCart = ({params}) => {
  const [instruments, setInstruments] = useState([]);
  const {selectedCategory, setSelectedCategory} = params;
  const {  cartItems,addToCart} = useCart(); // שימוש בקונטקסט של העגלה

  const fetchInstruments = async () => {
    try {
      const url = selectedCategory
        ? `http://localhost:5000/instruments?category=${selectedCategory}`
        : "http://localhost:5000/instruments/shopcart";

      const { data } = await axios.get(url);
      setInstruments(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInstruments();
  }, [selectedCategory]);

  return (
    <div>
      <h1 className="title">Shop Cart</h1>
      
      <div className="cards-container">
        {cartItems.map((inst) => (
          <div key={inst._id} className="card">
            <img src={inst.imageUrl} alt={inst.name} />
            <h3>{inst.name}</h3>
            <p className="category">{inst.category}</p>
            <p className="price">₪{inst.price}</p>
            <button className="add-to-cart" onClick={() => addToCart(inst)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCart;
