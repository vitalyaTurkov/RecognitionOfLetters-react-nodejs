const fs = require('fs');
//Сохранение картинки в файл
//callback используется для того, чтобы совершить какие-либо действия сразу же после сохранения
function saveFileBase64(file, code, callback) {
    const base64code = code.substr(22, code.length); //Отрезаем символы, не относящиеся к кодировке base64
    const photos = require('../photos');
    if(file !== './img/result.png') {

        let newWord = {
            number: 0,
            word: file[6],
            path: './img/' + file[6] + '0' + '.png'
        };

        let word = file[6];
        for(let i = 0; i < photos.length; i++) {
            if(photos[i].word === word) {
                newWord = {
                    word: photos[i].word,
                    number: photos[i].number + 1,
                    path: `./img/${photos[i].word}${photos[i].number + 1}.png`
                }
            }
        }

        photos.push(newWord);

        fs.writeFileSync('./photos.json', JSON.stringify(photos));

        fs.writeFile(newWord.path, new Buffer(base64code, "base64"), function(err) {
            if(err) {
                console.log("fs.writeFile error");
                return;
            }
            callback();
        });
        return;
    }

    fs.writeFile(file, new Buffer(base64code, "base64"), function(err) {
        if(err) {
            console.log("fs.writeFile error");
        }
        callback();
    });
}

//Считывание картинки из файла
function readFile(file) {
    let data = "data:image/png;base64,";
    data += fs.readFileSync(file, "base64");
    return data;
}

module.exports.save = saveFileBase64;
module.exports.read = readFile;
