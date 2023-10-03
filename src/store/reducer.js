const reducer = (state, action) => {
    switch (action.type) {
      case "CLEAR_CART":
        return { ...state, cart: [] };
      case "REMOVE":
        return {
          ...state,
          cart: state.cart.filter((x) => x.id !== action.payload),
        };
      case "TOGGLE_AMOUNT":
        let tempCartState = state.cart
          .map((x) => {
            if (x.id === action.payload.id) {
              switch (action.payload.type) {
                case "increase":
                  return { ...x, amount: x.amount + 1 };
                case "decrease":
                  return { ...x, amount: x.amount - 1 };
              }
            }
            return x;
          })
          .filter((item) => item.amount !== 0);
        return {
          ...state,
          cart: tempCartState,
        };
      case "LOADING":
        return {
          ...state,
          loading: action.payload,
        };
      case "DISPLAY_DATA":
        return {
          ...state,
          cart: action.payload,
        };
      case "GET_TOTALS":
        const { total, amount } = state.cart.reduce(
          (cartTotal, item) => {
            const { price, amount } = item;
            cartTotal.total += price * amount;
            cartTotal.amount += amount;
            return cartTotal;
          },
          {
            total: 0,
            amount: 0,
          }
        );
        return {
          ...state,
          total: parseFloat(total.toFixed(2)),
          amount: amount,
        };
    }
    return state;
  };
  
  export default reducer;
  