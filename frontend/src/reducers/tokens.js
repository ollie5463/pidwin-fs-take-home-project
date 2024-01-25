import { SET_TOKENS } from '../constants/actionTypes';

const tokenReducer = (state = { tokens: null }, action) => {
    switch (action.type) {
        case SET_TOKENS:
            return { ...state, tokens: action?.tokens };
        default:
            return state;
    }
}
export default tokenReducer;