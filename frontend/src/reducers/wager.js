import { WAGER } from '../constants/actionTypes';

const wagerReducer = (state = { wagerData: null }, action) => {
    switch (action.type) {
        case WAGER:
            return { ...state, wagerData: action?.data };

        default:
            return state;
    }
}
export default wagerReducer;