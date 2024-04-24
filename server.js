const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
var router = require('./routes/index');

const authRoute = require('./routes/index');

// specify engine and view folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/api', authRoute);
app.use('/', router);
app.listen(port, function(){console.log(`Server is running on port ${port}`)});

module.exports = app;