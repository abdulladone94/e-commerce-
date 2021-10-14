import React, { useEffect, useState } from "react";
import "./App.css";
import AppBarMUI from "./components/AppBarMUI";
// import ViewProducts from './components/ViewProducts';
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
      <div>
        {item.map((card) => {
          return (
            (<h1>{card.title}</h1>),
            (<p>{card.price}</p>),
            (<p>{card.category}</p>),
            (<p>{card.description}</p>)
          );
        })}
      </div>
    </div>
  );
}

export default App;
