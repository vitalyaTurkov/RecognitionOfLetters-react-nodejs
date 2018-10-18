import config from '../../etc/config'
import axios from 'axios'
//Отправка кода картинки на сервер

export default function sendImage(canvas) {

    let img = new Image();
    img.src = canvas.toDataURL('image/png');
    return axios.post(`${config.url}/image`, {image: img.src});
}
