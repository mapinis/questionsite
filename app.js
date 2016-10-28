var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var question = require('./question.js');
var rateLimit = require('express-rate-limit');


app.set('view engine', 'pug');
app.set('views', __dirname + "/views");

var limiter = new rateLimit({
    windowMs: 1000*60*6,
    max: 50,
    delayMs: 0
});

app.use(express.static(__dirname + '/views'));
app.use(require("morgan")("dev"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.status(200).render('index.pug', {questions: question.questions});
});

app.get('/create', function(req, res){
    res.status(200).render('create.pug');
});

app.post('/create', limiter, function(req, res){
    console.log(req.body.option);
    var newQuestion = new question.Question(req.body.questionName, req.body.option);
    console.log((new Date().getTime() / 1000) + " New Question created @ " + newQuestion.url)
    console.log("\t\tQuestion: " + newQuestion.question)
    console.log("\t\tOptions: " + newQuestion.options.map(function(option) {return option.name}))
    res.redirect(newQuestion.url);
    //Code for getting info, creating new question class instance, putting it in array of questions

});

app.get('/:questionURL', function(req, res){
    var found = false;
    for(currentQuestion of question.questions){
        if(req.url === currentQuestion.url){
            found = true;
            res.status(200).render('question.pug', {question: currentQuestion});
        }
    }
    if(found == false){
        res.status(404).redirect('/');
    }
    //Code for finding question in array, and going to question.pug with that question
    //Also, if there is /results, go to that question's results
    //If nothing is found, 404
}); 

app.post('/:questionURL', limiter, function(req, res){
    var found = false;
    for(currentQuestion of question.questions){
        if(req.url == currentQuestion.url){
            found = true;
            currentQuestion.options[parseInt(req.body.answer)].value++;
            res.status(308).redirect(currentQuestion.url + "/results"); //Should I use 308 here?
        }
    }
    if(found == false){
        res.status(404).redirect('/');
    }
    //if there is a post, find that question and then change question's option1 or option2 values, then redirect to that results page
    //if none is found, 404
});

app.get('/:questionURL/results', function(req, res){
    var found = false;
    for(currentQuestion of question.questions){
        if(req.url == (currentQuestion.url + "/results")){
            found = true;
            res.status(200).render("results.pug", {question: currentQuestion});
        }
    }
    if(found == false){
        res.status(404).redirect('/');
    }
});

console.log("Listening on http://localhost:8080");
app.listen(8080, '0.0.0.0');