var game = new Phaser.Game(1280, 800); //y:3280


var spaceKey;
var mainState = {
    preload: function() { 
        PreloadSlotMachineGame();
    },

    create: function() {
        CreateSlotMachineGame(game,this);
    },

    update: function() {
        if(DoLineAnimation){
            for(var i = 0; i <5; i++){
                if(currentBet>i){
                    if(WonLine(i)){
                    AddReward(i);
                    LightLineWin(i);
                    }
             }
            }
        }
        if(!leftSpinning && !midSpinning && !rightSpinning){
            spinning = false;
        }
        if(!isReadyForNew && !spinning){
            console.log(Machine);
            SetLines();
            DoLineAnimation = true;
            isReadyForNew = true;
        }
        SpinReels();
    },
    
    //Destroy all slots inside an array (reel), and randomly generate each slot again
    generateReel: function(){
        if(left_reel.length > 0){
            for(var i = 0;i < numStops; i++){
                left_reel[i].destroy();
                mid_reel[i].destroy();
                right_reel[i].destroy();
            }
        }
        for(var i = 0;i<numStops;i++){
            var IconToAdd = slots[Math.floor(Math.random() * slots.length)];
            left_reel[i] = game.add.sprite(320,-180 + (i * 160 + 100),IconToAdd);
            left_reel[i].anchor.y=1;
            this.reels_layer.add(left_reel[i]);
        }

        for(var i = 0;i<numStops;i++){
           var IconToAdd = slots[Math.floor(Math.random() * slots.length)];
           mid_reel[i] = game.add.sprite(575,-180 + (i * 160 + 100),IconToAdd);
           mid_reel[i].anchor.y=1;
           this.reels_layer.add(mid_reel[i]);
        }

        for(var i = 0;i<numStops;i++){
            var IconToAdd = slots[Math.floor(Math.random() * slots.length)];
            right_reel[i] = game.add.sprite(830,-180 + (i * 160 + 100),IconToAdd);
            right_reel[i].anchor.y=1;
            this.reels_layer.add(right_reel[i]);
        }
    },

    getSlotValue: function(slot){
        if (slot == 'boots_icon'){
            return 1;
        }
        if (slot == 'climber_icon'){
            return 2;
        }
        if (slot == 'helmet_icon'){
            return 3;
        }
        if (slot == 'hook_icon'){
            return 4;
        }
        if (slot == 'monster_icon'){
            return 5;
        }
        if (slot == 'pickaxe_icon'){
            return 6;
        }
        if (slot == 'tent_icon'){
            return 7;
        }
    },
    //Set up a new spin, reseting all flags and randomly generating a timer for each reel to stop
    spin: function(){
        
        if(!spinning){
            if(currentNumberOfCredits >= currentBet){
            LinesRewarded = [false,false,false,false,false];
            currentNumberOfCredits -= currentBet;
            currCreditsLabel.text = "C: " + currentNumberOfCredits;
            DoLineAnimation = false;
            isReadyForNew = false;
            this.generateReel();
            spinning = true;
            leftSpinning = true;
            rightSpinning = true;
            midSpinning = true;
            leftStopping = false;
            midStopping = false;
            rightStopping = false;
            timers[0] = Math.floor(Math.random() * 5) + 3;
            timers[1] = Math.floor(Math.random() * 5) + 3;
            timers[2] = Math.floor(Math.random() * 5) + 3;
            game.time.events.add(Phaser.Timer.SECOND * timers[0], this.stopLeftReel, this);
            game.time.events.add(Phaser.Timer.SECOND * timers[1], this.stopMidReel, this);
            game.time.events.add(Phaser.Timer.SECOND * timers[2], this.stopRightReel, this);  
            }
            
        }
    },
    //Stop each individual reel, when the timer triggers the event
    stopLeftReel: function(){
        leftStopping = true;
        leftStop = left_reel[0];
        var MachineValues = [left_reel[0].key,left_reel[1].key,left_reel[2].key];
        SetMachineSlotValue(0,this.getSlotValue(MachineValues[0]));
        SetMachineSlotValue(3,this.getSlotValue(MachineValues[1]));
        SetMachineSlotValue(6,this.getSlotValue(MachineValues[2]));
    },
    
    stopMidReel: function(){
        midStopping = true;
        midStop = mid_reel[0];
        var MachineValues = [mid_reel[0].key,mid_reel[1].key,mid_reel[2].key];
        SetMachineSlotValue(1,this.getSlotValue(MachineValues[0]));
        SetMachineSlotValue(4,this.getSlotValue(MachineValues[1]));
        SetMachineSlotValue(7,this.getSlotValue(MachineValues[2]));
    },
    
    stopRightReel: function(){
        rightStopping = true;
        rightStop = right_reel[0];
        var MachineValues = [right_reel[0].key,right_reel[1].key,right_reel[2].key];
        SetMachineSlotValue(2,this.getSlotValue(MachineValues[0]));
        SetMachineSlotValue(5,this.getSlotValue(MachineValues[1]));
        SetMachineSlotValue(8,this.getSlotValue(MachineValues[2]));
    },
};


game.state.add('main', mainState); 
game.state.start('main');