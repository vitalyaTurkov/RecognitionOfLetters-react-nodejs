//Отправка кода картинки на сервер

export default function sendImage(canvas) {
    const promise = new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        let img = new Image();
        img.src = canvas.toDataURL('image/png');

        xhr.open("POST", 'http://localhost:3001/image', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({image: img.src}));

        xhr.onload = function() {
            try {
                let res = JSON.parse(this.responseText);
                
                resolve(res.word);
            } catch (e) {
                console.log("uncorrected data from server ", e);
            }
        };
    });

    return promise;
}