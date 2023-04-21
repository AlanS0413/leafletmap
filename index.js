const express = require('express');
const bodyParser = require('body-parser');
const Database = require('./database.js');
const db = new Database('places.db');
db.initialize();
const router = express.Router();


const app = express();
app.use(express.urlencoded({extended: true}));


app.use((req, res, next) => {
    req.db = db;
    next();
});

app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(express.static('public'));
app.use(express.static('public/styles'));
app.use(bodyParser.json());

app.use('/', require('./routes/places'));
app.use('/', (req, res) => {
    res.render('places', {});
})

app.listen(8080, () => {
    console.log("Listening on port 8080");
})