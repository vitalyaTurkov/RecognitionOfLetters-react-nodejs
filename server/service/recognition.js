const PNG = require('png-js');
const photos = require('./photos');

function findMax(arr) {
    let max = {
        count: -999999,
        word: ""
    };

    for(let i = 0; i < arr.length; i++) {
        if(arr[i].count > max.count) {
            max = arr[i];
        }
    }
    return max
}

//Сравнение двух файлов попиксельно
function recognition(file1, file2, callback) {
    let count = 0;

    PNG.decode(file1, function (pixelsResult) {
        PNG.decode(file2, function (pixelsFile2) {
           for(let i = 0; i < pixelsResult.length; i++) {
               if(pixelsResult[i] === pixelsFile2[i] && pixelsResult[i] === 0) {
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

    const promises = [];
    const results = [];
    for(let i = 0; i < photos.length; i++) {              //Сравниваем нарисованную картинку со всеми картинками
        promises[i] = new Promise((resolve => {
            recognition('img/result.png', photos[i].path, function (count) {
                results[i] = {
                    word: photos[i].word,
                    count
                };

                resolve();
            });
        }));
    }

    Promise.all(promises).then(() => lastCallback(findMax(results).word));

}

module.exports = getResultRecognition;

