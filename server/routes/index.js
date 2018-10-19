const data = require('../service/data');
const recognition = require('../service/recognition');

function route(router) {
    router.get('/', (req, res) => {
        res.render('index', {title: 'hello'});
    });

    /*Сохранение картинки, пришедшей в запросе, в файл.
    *Затем считываются все картинки и сравниваются с отправленной в запросе.
    *В ответ отправляется картинка и буква с большим количеством совпавших пикселей
    * */
    router.post('/image', (req, res) => {
        data.save("./img/result.png", req.body.image, function () {
            recognition((result) => {
                res.end(result);
            });
        });
    });

    /*
    * Добавление нового изображения
    * */
    router.post('/new-image', (req, res) => {
        const path = `./img/${req.body.word}.png`;
        data.save(path, req.body.image, function () {
            recognition((result) => {
                res.end(result);
            });
        });
    });
}


module.exports = route;
