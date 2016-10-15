var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Question = require('question');

var questions = [];

app.set('view engine', 'pug');
app.set('views', __dirname + "/views");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.status(200).render('index.pug');
});

app.get('/create', function(req, res){
    res.status(200).render('create.pug');
});

app.post('/redirect', function(req, res){
    res.status(200).render('redirect.pug'); //Am I sure about 200?
    questions.push(new Question(req.body.questionName, [req.body.option1, req.body.option2]));
    //Code for getting info, creating new question class instance, putting it in array of questions

});

app.get('/redirect', function(req, res){
    res.status(400).redirect('/create');
});

app.get('*', function(req, res){
    res.status(404).redirect('/');
    //Code for finding question in array, and going to question.pug with that question
    //Also, if there is /results, go to that question's results
    //If nothing is found, 404
});

app.post('*', function(req, res){
    res.status(404).redirect('/');
    //if there is a post, find that question and then change question's option1 or option2 values, then redirect to that results page
    //if none is found, 404
});

app.listen(8080, '0.0.0.0');