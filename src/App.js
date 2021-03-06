import React, { useEffect } from "react";
import "./App.css";
import AppBarMUI from "./components/AppBarMUI";
import ItemCard from "./components/ItemCard";
import axios from "axios";
import { Grid } from "@mui/material";
import { setAllItems } from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "./Footer";

function App() {
  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.cart.allItems);

  useEffect(
    () =>
      axios.get("https://fakestoreapi.com/products").then((response) => {
        dispatch(setAllItems(response.data));
      }),
    [dispatch]
  );

  return (
    <div className="App">
      <AppBarMUI />
      <Grid direction="rows" container spacing={2} margin="5px" padding="15px">
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
      <Footer />
    </div>
  );
}

export default App;
