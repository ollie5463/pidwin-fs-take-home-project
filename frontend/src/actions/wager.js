import { WAGER, GET_WAGER_HISTORY, SET_TOKENS } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const placeWager = (formData) => async (dispatch) => {
  try {
    const { data } = await api.wager(formData);
    dispatch({ type: WAGER, data });
    dispatch({ type: SET_TOKENS, tokens: data.tokens});
    messages.success("Wager placed");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const getWagerHistory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getWagerHistory(formData);
    dispatch({ type: GET_WAGER_HISTORY, data });
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
