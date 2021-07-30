class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    textMode(CENTER);
    text("RESULTS",width/2,20)
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
    if (allContestants !== undefined){
      //write code to add a note here
      fill("black");
      textSize(20);
      text("CONTESTANTS WHO ANSWERED CORRECTLY ARE IN GREEN",130,230);
    }

    //write code to highlight contest who answered correctly
    for (var plr in allContestants){
      var correctAns = "2";
      if (correctAns === allContestants[plr].answer){
        fill("green");
      }
      else{
        fill("red");
      }
    }
  }

}
