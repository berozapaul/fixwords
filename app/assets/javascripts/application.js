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
    var answerStr, incompleteWord;
    var showQuizQuestion = function(quiz){
        if(!quiz.word) return false;
        var wordArr = quiz.word.split('');
        var levelValue = parseInt($('.game_level').val());
        var randIndexArr = [], questionHTML = '';

        while(1){
            randIndexArr.push(Math.floor(Math.random()*wordArr.length));
            randIndexArr = randIndexArr.filter(function (value, index, self) {return self.indexOf(value) === index;});
            randIndexArr.sort();
            if(randIndexArr.length >= levelValue) break;
        }

        answerStr = '';
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

    var showQuizResult = function(ansType){
        var resultHTML = ansType ? '<div class="correct_answer answer_wrapper"><h2>Correct!</h2>' : '<div class="wrong_answer answer_wrapper"><h2>Wrong!</h2>';
        resultHTML += '<a class="btn btn-default next_btn">OK. Next</a></div>';
        $('.quiz_container').html(resultHTML);
    };

    $('.quiz_container').on('click', '.go_btn', function(event) {
        var userAnswer = '', ansType, className;
        incompleteWord = false;
        $(this).parent().find('input').each(function(index, inputObj){
            if(!$(inputObj).val()) incompleteWord = true;
            userAnswer += $(inputObj).val();
        });

        if(userAnswer === answerStr){
            ansType = true; className = 'correct_answer';
        }else{
            ansType = false; className = 'wrong_answer animated shake';
        }

        $(this).addClass(className);
        setTimeout(function(){ showQuizResult(ansType)}, 1000);
    });

    $('.quiz_container').on('click', '.next_btn', function(event) {
        if(quizDataArr.length > 0){
            showQuizQuestion(quizDataArr.shift());
        }
        else{
            var awardHTML = '';
            awardHTML += '<div><button onclick="location.reload();"><span><i class="fa fa-chevron-left"></i> Reset </span></button></div>';
            awardHTML += '<div><button class="go_back"><span>Back <i class="fa fa-chevron-right"></i></span></button></div>';
            $('.quiz_container').html(awardHTML);
        }
    });
}); // End of document.ready