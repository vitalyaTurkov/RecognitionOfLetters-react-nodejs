import {CHANGE_WORD_ACTION} from './actionTypes'
import sendImage from "../../service/api/sendImage";

export const changeWord = (word) => {
    return {
        type: CHANGE_WORD_ACTION,
        payload: word
    }
};

export const changeWordAsync = (canvas) => {
    return dispatch => {
        sendImage(canvas)
            .then(res => dispatch(changeWord(res.data)))
    }
};
