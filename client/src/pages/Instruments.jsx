import React, { useState, useEffect } from "react";
import axios from "axios";
import SelectInstrumentsCategory from "../components/SelectInstrumentsCategory";
import { useCart } from "../context/CartContext";

const Instruments = ({params}) => {

const {selectedCategory, setSelectedCategory} = params;
  const [instruments, setInstruments] = useState([]);
  const [showInstruments, setShowInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // שימוש בקונטקסט של העגלה

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/instruments"); 
        setInstruments(response.data);
        setShowInstruments(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instruments:", error);
        setError("Error loading instruments");
        setLoading(false);
      }
    };

    fetchInstruments();
  }, []);

  useEffect(() => {
    if(selectedCategory === "all") 
      setShowInstruments([...instruments]);
    else
      setShowInstruments(instruments.filter((instrument) => instrument.category === selectedCategory));
  }, [selectedCategory]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="instrumentH1">
      <h1>Instruments</h1>
      <SelectInstrumentsCategory setSelectedCategory={setSelectedCategory} />
      <div className="cards-container">
        {showInstruments.map((instrument) => (
          <div key={instrument._id} className="card">
            <img src={instrument.imageUrl} alt={instrument.name} />
            <h3>{instrument.name}</h3>
            <p className="category">{instrument.category}</p>
            <p className="price">₪{instrument.price}</p>
            <button className="add-to-cart" onClick={() => addToCart(instrument)}>
              הוסף לעגלה
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instruments;
