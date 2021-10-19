import { combineReducers } from "redux";
import CartDrawer from "./cartReducer";

export default combineReducers({
  cart: CartDrawer,
});
