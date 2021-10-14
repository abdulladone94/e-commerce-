import React, { useEffect, useState } from "react";
import "./App.css";
import AppBarMUI from "./components/AppBarMUI";
import RecipeReviewCard from "./components/ItemCard";
import axios from "axios";

function App() {
  const [item, setItem] = useState([]);

  useEffect(
    () =>
      axios.get("https://fakestoreapi.com/products").then((response) => {
        setItem(response.data);
      }),
    []
  );

  return (
    <div className="App">
      <AppBarMUI />
      {item.map((card, index) => {
        return (
          <RecipeReviewCard className='cardPosition'
            key={index}
            id={index}
            title={card.title}
            price={card.price}
            image={card.image}
            category={card.category}
            description={card.description}
          />
        );
      })}
      <div>
        {item.map((card) => {
          return <h1>{card.title}</h1>;
        })}
      </div>
    </div>
  );
}

export default App;
