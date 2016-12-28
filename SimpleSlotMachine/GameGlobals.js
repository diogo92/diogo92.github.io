//Keep global variables here for cleaner main file. Game functions are also called here by the main file, as well as the create and preload functions. 

//Size of each reel
var numStops = 22;

var slots = ['boots_icon','climber_icon','helmet_icon','hook_icon','monster_icon','pickaxe_icon','tent_icon'];
var left_reel = [];
var mid_reel = [];
var right_reel = [];

//time the reels will be spinning;
var timers = [0,0,0];

//Check if all reels are spinning
var spinning = false;

//[reel]Spinning checks if the timer for a reel to stop spinning is not yet finished
//[reel]Stopping is used to stop the reels at a precise position, in order to be aligned
var leftSpinning,leftStopping = false;
var midSpinning,midStopping = false;
var rightSpinning,rightStopping = false;


//To set the stop/slot/icon that will stay in the top row of each reel 
var leftStop,midStop,rightStop;

//Line Number images
var LeftLine1, LeftLine2, LeftLine3, LeftLine4, LeftLine5, RightLine1, RightLine2, RightLine3, RightLine4, RightLine5;


//UI buttons and labels
var BetMoreLinesButton, BetLessLinesButton, DisplayCredits, DisplayBet, BuyCredits, SpinButton;

//Player logic
var currentBet,currentNumberOfCredits,currCredits,lineBet,currCreditsLabel,lineBetLabel;

//Which lines are winner lines
var LinesRewarded = [false,false,false,false,false];

//Check if everything is ready for a new spin
var isReadyForNew = true;

//Preload function
function PreloadSlotMachineGame(){
    //Machine static images
        game.load.image('MachineBackground', 'assets/back.png'); 
        game.load.image('toon_figure', 'assets/pers_static.png'); 
        game.load.image('slot_frame', 'assets/frame.png');
        //Slot icons 
        game.load.image('boots_icon', 'assets/Reel_icons/boots_icon.png');
        game.load.image('climber_icon', 'assets/Reel_icons/climber_icon.png');
        game.load.image('helmet_icon', 'assets/Reel_icons/helmet_icon.png');
        game.load.image('hook_icon', 'assets/Reel_icons/hook_icon.png');
        game.load.image('monster_icon', 'assets/Reel_icons/monster_icon.png');
        game.load.image('pickaxe_icon', 'assets/Reel_icons/pickaxe_icon.png');
        game.load.image('tent_icon', 'assets/Reel_icons/tent_icon.png');
        game.load.image('empty_square', 'assets/Numbers/empty.png'); //just a transparent texture, in order to do a simple flashing animation
        //Line Numbers
        game.load.image('line_1', 'assets/Numbers/1.png');
        game.load.image('line_2', 'assets/Numbers/2.png');
        game.load.image('line_3', 'assets/Numbers/3.png');
        game.load.image('line_4', 'assets/Numbers/4.png');
        game.load.image('line_5', 'assets/Numbers/5.png');
        //UI elements
        game.load.image('arrow_back', 'assets/UI/arrow_back.png');
        game.load.image('arrow_forward', 'assets/UI/arrow_forward.png');
        game.load.image('display_panel', 'assets/UI/btn_empty.png');
        game.load.image('buy_credit', 'assets/UI/buy_credit.png');
        game.load.image('start_spin', 'assets/UI/circle_btn.png');


}
//Create function
function CreateSlotMachineGame(gameVar,contextVar){
    //Spacebar input, to start a spin, used only for testing
   /* spaceKey = gameVar.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(contextVar.spin, contextVar);*/

    //Add layers to keep slots in the back
    contextVar.reels_layer = gameVar.add.group();
    contextVar.background_layer = gameVar.add.group();
    contextVar.background_image = contextVar.background_layer.create(0,0,'MachineBackground');
    contextVar.toon_figure=contextVar.background_layer.create(1050,460,'toon_figure');
    contextVar.toon_figure.anchor.setTo(0.5,0.5);
    contextVar.toon_figure.scale.setTo(0.75,0.75);
    //Line number icons
    LeftLine1 = gameVar.add.sprite(75,300,'line_1');
    LeftLine2 = gameVar.add.sprite(75,140,'line_2');
    LeftLine3 = gameVar.add.sprite(75,460,'line_3');
    LeftLine4 = gameVar.add.sprite(75,0,'line_4');
    LeftLine5 = gameVar.add.sprite(75,600,'line_5');
    RightLine1 = gameVar.add.sprite(1120,300,'line_1');
    RightLine2 = gameVar.add.sprite(1120,140,'line_2');
    RightLine3 = gameVar.add.sprite(1120,460,'line_3');
    RightLine4 = gameVar.add.sprite(1120,600,'line_4');
    RightLine5 = gameVar.add.sprite(1120,0,'line_5');
    //Slot frames
    var frames = [];
    for(var i = 0; i< 3; i++){
        frames[i] = contextVar.background_layer.create(305,(i * 160) + 80,'slot_frame');
    }
    for(var i = 0; i< 3; i++){
        frames[i] = contextVar.background_layer.create(560,(i * 160) + 80,'slot_frame');
    }
    for(var i = 0; i< 3; i++){
        frames[i] = contextVar.background_layer.create(815,(i * 160) + 80,'slot_frame');
    }

    //Create UI elements
    BetLessLinesButton = contextVar.background_layer.create(400,600,'arrow_back');
    BetMoreLinesButton = contextVar.background_layer.create(671,600,'arrow_forward');
    DisplayCredits = contextVar.background_layer.create(459,610,'display_panel');
    DisplayBet = contextVar.background_layer.create(459,684,'display_panel');
    BuyCredits = contextVar.background_layer.create(250,684,'buy_credit');
    BuyCredits.anchor.setTo(0.5,0.5);
    BuyCredits.scale.setTo(2,2);
    SpinButton = contextVar.background_layer.create(800,585,'start_spin');
    currentBet = 0;
    currentNumberOfCredits = 0;
    currCredits = "C: ";
    lineBet = "Line Bet: ";
    currCreditsLabel = game.add.text(470, 630, currCredits, { font: "30px Arial", fill: "#000000" }); 
    lineBetLabel = game.add.text(470, 704, lineBet, { font: "30px Arial", fill: "#000000" }); 

    //Add event listeners
    BetMoreLinesButton.inputEnabled = true;
    BetMoreLinesButton.events.onInputDown.add(IncreaseBet, contextVar);

    BetLessLinesButton.inputEnabled = true;
    BetLessLinesButton.events.onInputDown.add(DecreaseBet, contextVar);

    BuyCredits.inputEnabled = true;
    BuyCredits.events.onInputDown.add(AddCredit, contextVar);

    SpinButton.inputEnabled = true;
    SpinButton.events.onInputDown.add(SpinStartButton,contextVar);

}

//Machine buttons logic
function IncreaseBet(){
        if(!spinning){
        currentBet++;
        if(currentBet > 5)
            currentBet = 5;
        lineBetLabel.text = "Line Bet: " + currentBet;
         DoLineAnimation = false;
    }
}

function DecreaseBet(){
    if(!spinning){
    currentBet--;
    if(currentBet < 1)
        currentBet = 1;
    lineBetLabel.text = "Line Bet: " + currentBet;
     DoLineAnimation = false;
    }
}

function AddCredit(){
    currentNumberOfCredits++;
    currCreditsLabel.text = "C: " + currentNumberOfCredits;
     DoLineAnimation = false;
}

function SpinStartButton(){
    if(currentNumberOfCredits >0 && currentBet > 0)
    this.spin();
}

function AddReward(lineNo){
    if(!LinesRewarded[lineNo]){
    LinesRewarded[lineNo] = true;
    var LineWinner = GetLine(lineNo+1);
    currentNumberOfCredits+=2*LineWinner[0];
    currCreditsLabel.text = "C: " + currentNumberOfCredits
    }
}

//Move the slots down to give a spinning effect. The slots are stored in an array. A slot moves until it hits the bottom of the reel, and then it goes from the end of the array to the start
function SpinReels(){
    if(leftSpinning){
        for(var i = 0;i<left_reel.length;i++){
            if(left_reel[i].position.y >= (-180 + ( (numStops - 1) * 160 + 100 ) + 160)){
                left_reel[i].position.y = left_reel[0].position.y - 160;
                left_reel.unshift(left_reel.pop());
            }
            left_reel[i].position.y += 10;
            if(leftStopping){
                if(leftStop.position.y == 240)
                    leftSpinning = false;
            }
            
        }
    }
    if(midSpinning){
        for(var i = 0;i<mid_reel.length;i++){
            if(mid_reel[i].position.y >= (-180 + ( (numStops - 1) * 160 + 100 ) + 160)){
                mid_reel[i].position.y = mid_reel[0].position.y - 160;
                mid_reel.unshift(mid_reel.pop());
            }
            mid_reel[i].position.y += 10;
            if(midStopping){
                if(midStop.position.y == 240)
                    midSpinning = false;
            }
        }
    }
    if(rightSpinning){
        for(var i = 0;i<right_reel.length;i++){
            if(right_reel[i].position.y >= (-180 + ( (numStops - 1) * 160 + 100 ) + 160)){
                right_reel[i].position.y = right_reel[0].position.y - 160;
                right_reel.unshift(right_reel.pop());
            }
            right_reel[i].position.y += 10;
            if(rightStopping){
                if(rightStop.position.y == 240)
                    rightSpinning = false;
            }
        }
    }
}