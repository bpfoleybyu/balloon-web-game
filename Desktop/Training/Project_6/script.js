/**
 * Generate functions
 * Build a number of balloons
 * question on the bottom, group of balloons moving upwards with 1 right answer, 3 wrong.
 */
var max = 11;
var ops = ["+","-","*","/"];
var userAnswer;
var correctAnswer;
var score = 0;
var incorrectAnswers;
var balloonArray;
var balloonDivArray;
var usedAnswers;

 function startGame(){
    $("#start").hide();
    userAnswer = null;
    correctAnswer = null;
    incorrectAnswers = null;
    setScore();
    buildQuestion();
    buildAnswers();
    startBalloons();
 }

 //just math for now
 function buildQuestion(){
    var gameQuestion = operationQ(randomOp);
    $("#question").html("<p>Question: "  + gameQuestion + "</p>");
    $("#question").show();
}

 function operationQ(op){
    var firstInt = getInt();
    var secondInt = getInt();
    switch(op){
        case "-": correctAnswer = firstInt - secondInt; return firstInt + " - " + secondInt;;
        case "*": correctAnswer = firstInt * secondInt; return firstInt + " * " + secondInt;;
        case "/": divisionQ(); //if div returns non-int, fallthrough to addition instead!
        default: correctAnswer = firstInt + secondInt; return firstInt + " + " + secondInt;
    }
 }
 
 function divisionQ(){
    if(Number.isInteger(firstInt/secondInt))
    {
        correctAnswer = firstInt/secondInt;
        return firstInt + " / " + secondInt;
    }
    break;
 }
 function buildAnswers(){
    incorrectAnswers = [correctAnswer - 2, correctAnswer-1, correctAnswer + 1, correctAnswer + 2];
 }
 function randomOp(){
    return ops[Math.floor(Math.random() * 4)];
 }
 function randomAns(){
     var answer = incorrectAnswers[Math.floor(Math.random() * 4)]
     if(usedAnswers == null || !usedAnswers.includes()){
         return answer;
     }
    return answer + 5;
 }
 function getInt(){
     return Math.floor(Math.random() * 11); // returns 0-10
 }
 function setScore(){
    $("#score").text("Score: " + score);
    $("#score").show();
 }
 function onLoadBody(){
    $("#question").hide();
    $("#score").hide();
 }
 function endGame(){
     setScore();
    $('.balloon-red').hide();
    $('.balloon-white').hide();
    $('.balloon-black').hide();
    $('.balloon-blue').hide();
     $("#start").text("Play Again");
     $("#start").show();
 }

 /**
  * Make five balloons show up. one right, 4 wrong
  * space evenly across playing board.
  */
 class Balloon{
     constructor(x, y, color, isCorrect)
     {
        this.x = x;
        this.y=y;
        this.color = color;
        this.isCorrect = isCorrect;
     }
 }

 function startBalloons(){
     var game = document.getElementById("running_game");
     var Balloon1 = new Balloon(20, 10, 'balloon-red', false);
     var Balloon2 = new Balloon(40, 10, 'balloon-black', false);
     var Balloon3 = new Balloon(60, 10, 'balloon-white', true);
     var Balloon4 = new Balloon(80, 10, 'balloon-blue', false);

     //create divs for each balloon. add onClick, color, positioning, and add to game.
     var b1, b2, b3, b4;
     balloonDivArray = [b1,b2,b3,b4];
     balloonArray = [Balloon1, Balloon2, Balloon3, Balloon4];

     for(var i = 0; i<4; i++){
        var balloonDiv = balloonDivArray[i];
        var balloonNumber = balloonArray[i];
        //set up the div
        balloonDiv = document.createElement("div");
        //was calling the last div everytime. this allows it to work dynamically (hopefully)
        //returns a function, that is links to correct variables.
        balloonDiv.onclick = (function(opt) {
            return function(){
                checkAnswer(opt);
            };
        })(balloonArray[i]);

        balloonDiv.style.left = balloonNumber.x+'%';
        balloonDiv.style.bottom = balloonNumber.y+'%';
        balloonDiv.className = balloonNumber.color;

        //put text in the div
        var text = document.createElement("p");
        text.className = 'answerText';
        if(balloonNumber.isCorrect){
            text.textContent = correctAnswer;
        }
        else{
            text.textContent = randomAns(); //might have duplicates
        }
        console.log(text);
        $(balloonDiv).append(text);
        //add the div to the game
        game.appendChild(balloonDiv);
     }
     function checkAnswer(balloon){
        if(balloon.isCorrect){
            $('.' + balloon.color).hide(); //hide now, remove in endgame
            score++;
            endGame();
        }
        else{
            score--;
            $('.' + balloon.color).hide(); //hide now, remove in endgame
        }
        setScore();
     }
     slideUpBalloons();
     //if nothing clicked, then disappear.
 }

 function slideUpBalloons(){
    $(".balloon-red").animate({top: '0px'}, 6000, "swing", function(){hideBalloon("balloon-red")}); //send to top, then hide?
    $(".balloon-black").animate({top: '0px'}, 5900, "swing", function(){hideBalloon("balloon-black")});
    $(".balloon-blue").animate({top: '0px'}, 6100, "swing", function(){hideBalloon("balloon-blue")});
    $(".balloon-white").animate({top: '0px'}, 6200, "swing", function(){
        hideBalloon("balloon-white")
        endGame();
    });
 }

 function hideBalloon(id){
    $("."+id).hide();
 }