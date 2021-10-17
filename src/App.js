import React, { useEffect, useState } from "react";
import "./App.css";
import AppBarMUI from "./components/AppBarMUI";
import ItemCard from "./components/ItemCard";
import axios from "axios";
import { Grid } from "@mui/material";

function App() {
  const [allItems, setAllItems] = useState([]);

  useEffect(
    () =>
      axios.get("https://fakestoreapi.com/products").then((response) => {
        setAllItems(response.data);
      }),
    []
  );

  return (
    <div className="App">
      <AppBarMUI allItems={allItems} />
      <Grid direction="rows" container spacing={2} margin="5px" padding="5px">
        {allItems.map((card, index) => {
          return (
            <ItemCard
              key={index}
              id={index}
              title={card.title}
              price={card.price}
              image={card.image}
              category={card.category}
              description={card.description}
              productId={card.id}
            />
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
