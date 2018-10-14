import {CHANGE_WORD_ACTION} from '../actions/actionTypes'

const initialState = {
    word: ''
};

export default function (state = initialState, action ) {
    switch (action.type) {
        case CHANGE_WORD_ACTION:
            return {
                ...state,
                word: action.payload
            };
        default:
            return state
    }
}