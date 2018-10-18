import config from '../../etc/config'

//Отправка кода картинки на сервер

export default function sendImage(canvas) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        let img = new Image();
        img.src = canvas.toDataURL('image/png');

        xhr.open("POST", `${config.url}/image`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({image: img.src}));

        xhr.onload = function() {
            try {
                resolve(this.responseText);
            } catch (e) {
                console.log("uncorrected data from server ", e);
            }
        };
    });
}
