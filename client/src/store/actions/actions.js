import {CHANGE_WORD_ACTION} from './actionTypes'
import { sendImage, sendWord } from "../../service/api/api";

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

export const newWordAsync = (canvas, word) => {
    return dispatch => {
        sendWord(canvas, word)
            .then(res => dispatch(changeWord(res.data)))
    }
};

