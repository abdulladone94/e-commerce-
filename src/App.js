import React, { useEffect } from "react";
import "./App.css";
import AppBarMUI from "./components/AppBarMUI";
import ItemCard from "./components/ItemCard";
import axios from "axios";
import { Grid } from "@mui/material";
import { setAllItems } from "./store/actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  // const simpleActionData = useSelector((state) => state.cart.result);
  const allItems = useSelector((state) => state.cart.allItems);

  // const [allItems, setAllItems] = useState([]);

  useEffect(
    () =>
      axios.get("https://fakestoreapi.com/products").then((response) => {
        dispatch(setAllItems(response.data));
      }),
    [dispatch]
  );

  return (
    <div className="App">
      {/* <button
        onClick={() => {
          dispatch(simpleAction());
        }}
      >
        Click
      </button>
      <h1>{simpleActionData}</h1> */}
      <AppBarMUI />
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
