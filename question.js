var questions = [];

function Question (question, optionArray) {
    this.question = question;
    function Option (optionName) {
        this.name = optionName;
        this.value = 0;
    }
    this.options = [];
    for (optionName of optionArray){
        this.options.push(new Option(optionName));
    }
    //UUID Generator Shamelessly Stolen from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    function generateUUID(template){
        var d = new Date().getTime();
        var uuid = template.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
    this.url = "/" + generateUUID("xxxx-xxx") + "-" + this.question.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '').toLowerCase().substring(0,5);
    var fail = false;
    do {
        for(question of questions){
            if(question.url == this.url){
                this.url += generateUUID("x");
                fail == true;
            }
        }
    } while(fail == true);
    questions.push(this);
    //var deleteTimeout = setTimeout(deleteQuestion(this), 10000);
}

function deleteQuestion(question) {
    questions.splice(question);
}


module.exports.questions = questions;
module.exports.Question = Question;