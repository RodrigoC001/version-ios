import { combineReducers } from "redux";
import origins from "./origins";
import destinations from "./destinations";
import trips from "./trips";
import terms from "./terms";

export default combineReducers({
  origins,
  destinations,
  trips,
  terms
});