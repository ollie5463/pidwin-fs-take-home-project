import { combineReducers } from "redux";
import login from "./login";
import wager from "./wager";
import tokens from "./tokens";

export default combineReducers({
    login,
    wager,
    tokens
});
