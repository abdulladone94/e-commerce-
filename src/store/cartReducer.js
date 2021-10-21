const initialState = { allItems: [], cartItems: [] };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_ITEMS":
      return {
        ...state,
        allItems: action.payload,
      };
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
