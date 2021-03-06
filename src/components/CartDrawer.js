import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { setCartItems } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const allItems = useSelector((state) => state.cart.allItems);
  const setCartItemsRes = React.useCallback(
    (respone) => {
      dispatch(
        setCartItems(
          respone.data[0].products.map((cartItem) => {
            const result = allItems.find((item) => {
              return item.id === cartItem.productId;
            });
            return { ...cartItem, title: result?.title };
          })
        )
      );
    },
    [allItems, dispatch]
  );

  useEffect(
    () =>
      axios.get("https://fakestoreapi.com/carts/user/1").then((responsee) => {
        setCartItemsRes(responsee);

        console.log(responsee.data[0].products);
        console.log(allItems);
      }),
    [allItems, setCartItemsRes]
  );

  const handleDelete = () => {
    axios.delete("https://fakestoreapi.com/carts/1").then((res) => {
      console.log(res.data);
      axios.get("https://fakestoreapi.com/carts/user/2").then((respons) => {
        setCartItemsRes(respons);
      });
    });
  };

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {cartItems.map((item, index) => (
          <ListItem button key={index}>
            <ListItemText primary={item.title} />
            <ListItemText primary={item.quantity} />
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
