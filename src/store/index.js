import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import logger from "redux-logger";

export default function configurStores() {
  return createStore(rootReducer, applyMiddleware(logger));
}
