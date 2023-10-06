import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

const url = "https://run.mocky.io/v3/84085b39-68d0-4365-b783-2d721a9583c6";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: [],
  amount: 0,
  total: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "GET_TOTALS" });
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
    dispatch({ type: "GET_TOTALS" });
  };

  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
    dispatch({ type: "GET_TOTALS" });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING", payload: true });
    const respons = await fetch(url);
    const data = await respons.json();
    dispatch({ type: "DISPLAY_DATA", payload: data });
    dispatch({ type: "LOADING", payload: false });
    dispatch({ type: "GET_TOTALS" });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
