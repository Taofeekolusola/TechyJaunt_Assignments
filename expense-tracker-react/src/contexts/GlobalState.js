import React, { createContext, useReducer } from "react"
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  transactions: []
};

// Create context
export const GlobalContext = createContext(initialState);

// Reducer function
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  
  //Action creators
  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  }

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  }

  // const editTransaction = (id, transaction) => {
  //   dispatch({ type: 'EDIT_TRANSACTION', payload: { id, transaction } });
  // }

  return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            addTransaction,
            deleteTransaction,
            //editTransaction
        }}>
        {children}
      </GlobalContext.Provider>
    );
}