function Question (question, optionArray) {
    this.question = question;
    function Option (optionName) {
        this.name = optionName;
        this.value = 0;
    }
    this.options = [];
    for (optionName in optionArray){
        options.push(new Option(optionName));
    }
    this.url = question.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '');
}

module.exports.question = Question;