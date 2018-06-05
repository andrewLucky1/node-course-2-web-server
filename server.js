const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.port || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, resp, next) => {
    var now, log;
    now = new Date().toString();
    log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + `\n`, err => {
        if (err) console.log(`Unable to append to server.log`);
    })
    next();
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: `Main page`,
        mainContent: `Here goes some extremely content`
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        commonTopElement: 'Common top text goes here'
    });
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        mainContent: 'this is home page',
        commonTopElement: 'Common top text goes here'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port: ${ port }`);
});
