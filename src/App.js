import React, { useEffect, useState } from "react";
import "./App.css";
import AppBarMUI from "./components/AppBarMUI";
import RecipeReviewCard from "./components/ItemCard";
import axios from "axios";
import { Grid } from "@mui/material";

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
      <Grid direction="rows" container spacing={0}>
      {item.map((card, index) => {
        return (
          <RecipeReviewCard 
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
      </Grid>
    </div>
  );
}

export default App;
