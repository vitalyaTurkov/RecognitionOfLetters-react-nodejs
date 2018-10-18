const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: '*'}));

require('./routes')(app);

module.exports = app;
