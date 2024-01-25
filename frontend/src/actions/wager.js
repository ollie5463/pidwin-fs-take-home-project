import { WAGER } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const placeWager = (formData) => async (dispatch) => {
  try {
    console.log("placing wager")
    const { data } = await api.wager(formData);
    dispatch({ type: WAGER, data });
    messages.success("Wager placed");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
