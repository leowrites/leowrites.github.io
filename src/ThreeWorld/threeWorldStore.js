// a slice is a collection of redux logic and actions for a single feature
import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./components/viewSlice";

// action is an object that has a type string, describes what happened in the form of domain/eventName
// we put more information in payload

// action creator returns an action object
// const increment = () => ({
//   type: "counter/increment",
//   payload: "Add counter by 1",
// });

// // reducer receives current state and an action, and updates the state (state, action) => newState
// // should only take state and action
// // does not modify state
// // cannot have async logic, or calculate random values
// // example

// const initialState = { value: 0 };
// function counterReducer(state = initialState, action) {
//   if (action.type === "counter/increment") {
//     return {
//       ...state,
//       value: state.value + 1,
//     };
//   }
//   // otherwise return state
//   return state;
// }
// // current redux state lives in the store
// // created by passing in a reducer

// const store = configureStore({ reducer: counterReducer });
// // we can get the state of the store by using store.getState()

// // the only way to update a state is to call dispatch and pass in an action object
// store.dispatch({ type: "counter/increment" });

// // call action creator to dispatch the action

// store.dispatch(increment());

// // selector extracts information from store state value
// const selectCounterValue = (state) => state.value;
// selectCounterValue(store.getState());

export default configureStore({
  reducer: {
    view: viewReducer,
  },
});

// for async functions, we need thunk
//gets dispatch and getstate as arguments
