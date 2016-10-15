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
    this.url = ("/" + this.question.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '')).toLowerCase();
}

module.exports.Question = Question;