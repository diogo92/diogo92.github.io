//Animate a winner line. The animation is a simple flash effect, the line number image disappears and reappears after a specified amount of time

//Time in seconds for the image flashing
var AnimationTimer = 0.25;

//Control animation timers
var DoLineAnimation = false;
var Animate1,Animate2,Animate3,Animate4,Animate5 = false;

//Animation functions
function LightLineWin(lineNo){
    if(lineNo == 0){
        if(!Animate1){
            Animate1 = true;
            game.time.events.add(Phaser.Timer.SECOND * AnimationTimer, LineNumberAnimationDisappear, this,LeftLine1,RightLine1,'line_1');
        }
    }
   if(lineNo == 1){
        if(!Animate2){
            Animate2 = true;
            game.time.events.add(Phaser.Timer.SECOND * AnimationTimer, LineNumberAnimationDisappear, this,LeftLine2,RightLine2,'line_2');
        }
    }
    if(lineNo == 2){
       if(!Animate3){
            Animate3 = true;
            game.time.events.add(Phaser.Timer.SECOND * AnimationTimer, LineNumberAnimationDisappear, this,LeftLine3,RightLine3,'line_3');
        }
    }
    if(lineNo == 3){
        if(!Animate4){
            Animate4 = true;
            game.time.events.add(Phaser.Timer.SECOND * AnimationTimer, LineNumberAnimationDisappear, this,LeftLine4,RightLine4,'line_4');
        }
    }
    if(lineNo == 4){
        if(!Animate5){
            Animate5 = true;
            game.time.events.add(Phaser.Timer.SECOND * AnimationTimer, LineNumberAnimationDisappear, this,LeftLine5,RightLine5,'line_5');
        }
    }
}

//Make the image disappear
function LineNumberAnimationDisappear(LeftLineNumber,RightLineNumber,OriginalTextureKey){
    LeftLineNumber.loadTexture("empty_square");
    RightLineNumber.loadTexture("empty_square");
    game.time.events.add(Phaser.Timer.SECOND * AnimationTimer, LineNumberAnimationAppear, this,LeftLineNumber,RightLineNumber,OriginalTextureKey);
}

//Make the image Reappear
function LineNumberAnimationAppear(LeftLineNumber,RightLineNumber,OriginalTextureKey){
    LeftLineNumber.loadTexture(OriginalTextureKey);
    RightLineNumber.loadTexture(OriginalTextureKey);
    game.time.events.add(Phaser.Timer.SECOND * AnimationTimer, SetBooleanValueFalse, this);
}

//Always state that we want the animation to stop at the end of each cycle. The update function is in charge of checking if another cycle will still start
function SetBooleanValueFalse(){
    Animate1 = false;
    Animate2 = false;
    Animate3 = false;
    Animate4 = false;
    Animate5 = false;
}