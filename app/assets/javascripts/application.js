// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .

$(document).ready(function() {
    var showQuizQuestion = function(quiz){
        if(!quiz.word) return false;
        var wordArr = quiz.word.split('');
        var levelValue = parseInt($('.game_level').val());
        var randIndexArr = [], answerStr = '', questionHTML = '';

        while(1){
            randIndexArr.push(Math.floor(Math.random()*wordArr.length));
            randIndexArr = randIndexArr.filter(function (value, index, self) {return self.indexOf(value) === index;});
            if(randIndexArr.length >= levelValue) break;
        }

        for(i = 0 ; i < randIndexArr.length ; i++){
            answerStr += wordArr[randIndexArr[i]];
            wordArr[randIndexArr[i]] = '';
        }


        for(i in wordArr) {
            if(!wordArr[i]){
                questionHTML += '<div class="each_option"><input type="text" autofocus="true"></div>';
            }
            else{
                questionHTML += '<div class="each_option"><div class="letter">'+wordArr[i]+'</div></div>';
            }
        }
        questionHTML += '<br><a class="btn btn-success go_btn">Go</a>';
        $('.quiz_container').html(questionHTML).data('quiz',quiz);
    };
    var quizDataArr = $('.quiz_class').data('quiz');
    if(quizDataArr){
        showQuizQuestion(quizDataArr.shift());
    }
}); // End of document.ready