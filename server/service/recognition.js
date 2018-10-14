const PNG = require('png-js');
const data = require('./data');

//Сравнение двух файлов попиксельно
function recognition(file1, file2, callback) {
    let count = 0;

    PNG.decode(file1, function (pixelsResult) {
        PNG.decode(file2, function (pixelsTriangle) {
           for(let i = 0; i < pixelsResult.length; i++) {
               if(pixelsResult[i] === pixelsTriangle[i] && pixelsResult[i] === 0) {
                   count++;
               }
            }
            callback(count);
        });
    });
}

//Возвращение картинки, имеющей больше всего совпадений с исходной
//Сравниваем все картинки с исходной и находим максимальное число совпадений
function getResultRecognition(lastCallback) {
    let max = null;
    let file = 'img/T.png';
    let word = 'T';

    const promise = new Promise((resolve) => {
        recognition('img/result.png', 'img/T.png', function (count) { //Подсчет количества совпадений с буквой Т
            max = count;
            resolve(max);
        });
    });

    promise
        .then(max => {
            return new Promise(resolve => {
                recognition('img/result.png', 'img/Б.png', function (count) { //Подсчет количества совпадений с буквой Б
                    if (max < count) {
                        max = count;
                        file = 'img/Б.png';
                        word = 'Б';
                    }

                    resolve(max);
                });
            });

        })
        .then(max => {
            return new Promise(resolve => {
                recognition('img/result.png', 'img/K.png', function (count) { //Подсчет количества совпадений с буквой К
                    if (max < count) {
                        max = count;
                        file = 'img/K.png';
                        word = 'K';
                    }

                    resolve(max);
                });
            });
        })
        .then(max => {
            recognition('img/result.png', 'img/H.png', function (count) { //Подсчет количества совпадений с буквой Н
                if (max < count) {
                    file = 'img/H.png';
                    word = 'H';
                }

                lastCallback({
                    image : data.read(file),
                    word: word
                });
            });
        });
}

module.exports = getResultRecognition;

