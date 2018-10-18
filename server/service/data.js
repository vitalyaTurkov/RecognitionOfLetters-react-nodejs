const fs = require('fs');

//Сохранение картинки в файл
//callback используется для того, чтобы совершить какие-либо действия сразу же после сохранения
function saveFileBase64(code, callback) {
    const base64code = code.substr(22, code.length); //Отрезаем символы, не относящиеся к кодировке base64
    fs.writeFile("img/result.png", new Buffer(base64code, "base64"), function(err) {
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
