import { GET_WAGER_HISTORY, WAGER } from '../constants/actionTypes';

const wagerReducer = (state = { wagerData: null, wagerHistory: [] }, action) => {
    switch (action.type) {
        case WAGER:
            return { ...state, wagerData: action?.data };

        case GET_WAGER_HISTORY:
            return { ...state, wagerHistory: action?.data };
        default:
            return state;
    }
}
export default wagerReducer;