import config from '../../etc/config'
import axios from 'axios'
//Отправка кода картинки на сервер

export function sendImage(canvas) {
    let img = new Image();
    img.src = canvas.toDataURL('image/png');
    return axios.post(`${config.url}/image`, {image: img.src});
}

export function sendWord(canvas, word) {
    let img = new Image();
    img.src = canvas.toDataURL('image/png');
    return axios.post(`${config.url}/new-image`, {image: img.src, word});
}
