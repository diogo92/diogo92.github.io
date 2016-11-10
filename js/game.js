var game = new Phaser.Game(462,105, Phaser.AUTO, 'phaser-game', { preload: preload, create: create, update: update });

var background,platforms,objects,plat1,plat2,plat3,plat4,plat5,plat6,plat7,plat8,water1,water2,water3,phone;
var Diogo = {
  sprite: undefined,
  direction: 'left',
  doNothing: true,
  overlapping: false
}

function preload() {
    game.world.setBounds(0,0,1155*1.5,231*1.5)
    game.load.image('background','assets/map.png');
    game.load.image('plat1', 'assets/plat1.png');
    game.load.image('plat2', 'assets/plat2.png');
    game.load.image('plat3', 'assets/plat3.png');
    game.load.image('plat4', 'assets/plat4.png');
    game.load.image('plat5', 'assets/plat5.png');
    game.load.image('plat6', 'assets/plat6.png');
    game.load.image('plat7', 'assets/plat7.png');
    game.load.image('plat8', 'assets/plat8.png');
    game.load.image('water', 'assets/water.png');
    game.load.image('phone', 'assets/phone.png');
    game.load.image('about', 'assets/about.png');
    game.load.image('skills', 'assets/skills.png');
    game.load.image('work', 'assets/work.png');
    game.load.spritesheet('diogo', 'assets/guy.png', 16, 24, 16);
    cursors = game.input.keyboard.createCursorKeys();

}

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    background = game.add.sprite(0,0,'background');
    background.scale.setTo(1.5,1.5);
    objects = game.add.group();
    objects.enableBody = true;
    platforms = game.add.group();
    platforms.enableBody = true;
    createPlatforms();

    Diogo.sprite = game.add.sprite(50, 50, 'diogo');
    Diogo.sprite.anchor.x=0.5;
    Diogo.sprite.anchor.y=0.5;
    Diogo.sprite.animations.add('walk');
    Diogo.sprite.scale.setTo(1.5,1.5);
    game.physics.arcade.enable(Diogo.sprite);
    Diogo.sprite.body.gravity.y = 700;
    Diogo.sprite.body.bounce.y = 0;
    Diogo.sprite.body.collideWorldBounds = true;
    //mario.sprite.body.acceleration.x = 120;

    Diogo.sprite.animations.add('left', [8,9,10,11], 10, true);
    Diogo.sprite.animations.add('wait', [0], 10, true);
    Diogo.sprite.animations.add('jump', [6], 10, true);
    
    Diogo.sprite.body.fixedRotation = true;
    //mario.sprite.body.onBeginContact.add(blockHit, this);
    
    game.camera.follow(Diogo.sprite);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    runButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    

}

function createPlatforms(){

    phone = objects.create(1085*1.5,128*1.5, 'phone');
    phone.body.immovable = true;
    phone.scale.setTo(0.3,0.3);

    about = objects.create(336*1.5,105*1.5, 'about');
    about.body.immovable = true;
    about.scale.setTo(1.5,1.5);

    skills = objects.create(756*1.5,147*1.5, 'skills');
    skills.body.immovable = true;
    skills.scale.setTo(1.5,1.5);

    work = objects.create(819*1.5,170*1.5, 'work');
    work.body.immovable = true;
    work.scale.setTo(1.5,1.5);

    plat1 = platforms.create(0,189*1.5, 'plat1');
    plat1.body.immovable = true;
    plat1.scale.setTo(1.5,1.5);
    
    plat2 = platforms.create(168*1.5,189*1.5, 'plat2');
    plat2.body.immovable = true;
    plat2.scale.setTo(1.5,1.5);

    plat3 = platforms.create(252*1.5,189*1.5, 'plat3');
    plat3.body.immovable = true;
    plat3.scale.setTo(1.5,1.5);

    plat4 = platforms.create(273*1.5,169*1.5, 'plat4');
    plat4.body.immovable = true;
    plat4.scale.setTo(1.5,1.5);
    
    plat5 = platforms.create(524*1.5,189*1.5, 'plat5');
    plat5.body.immovable = true;
    plat5.scale.setTo(1.5,1.5);

    plat6 = platforms.create(545*1.5,189*1.5, 'plat6');
    plat6.body.immovable = true;
    plat6.scale.setTo(1.5,1.5);

    plat7 = platforms.create(630*1.5,189*1.5, 'plat7');
    plat7.body.immovable = true;
    plat7.scale.setTo(1.5,1.5);

    plat8 = platforms.create(1030*1.5,189*1.5, 'plat8');
    plat8.body.immovable = true;
    plat8.scale.setTo(1.5,1.5);

    water1 = game.add.sprite(126*1.5,210*1.5, 'water');
    water1.scale.setTo(1.5,1.5);

    water2 = game.add.sprite(588*1.5,210*1.5, 'water');
    water2.scale.setTo(1.5,1.5);
    water3 = game.add.sprite(987*1.5,210*1.5, 'water');
    water3.scale.setTo(1.5,1.5);
}

function update() {
    var hitPlatform = game.physics.arcade.collide(Diogo.sprite, platforms);
    if(!game.physics.arcade.overlap(Diogo.sprite,objects)){
        Diogo.overlapping = false;
    }
    game.physics.arcade.overlap(Diogo.sprite, phone, ScrollToContacs, null, this);
    game.physics.arcade.overlap(Diogo.sprite, about, ScrollToAbout, null, this);
    game.physics.arcade.overlap(Diogo.sprite, skills, ScrollToTraits, null, this);
    game.physics.arcade.overlap(Diogo.sprite, work, ScrollToWork, null, this);
    Diogo.doNothing = true;
    if (cursors.left.isDown){
        //mario.sprite.body.acceleration.x = -120;
        if(Diogo.direction!='left'){
        Diogo.sprite.scale.x *= -1;
        Diogo.direction = 'left';
        }
        if(Diogo.sprite.body.velocity.x==0 ||
        (Diogo.sprite.animations.currentAnim.name!='left' && Diogo.sprite.body.onFloor())){
        Diogo.sprite.animations.play('left', 10, true);
        }

        Diogo.sprite.body.velocity.x -= 10;
        if(runButton.isDown){
        if(Diogo.sprite.body.velocity.x<-200){
            Diogo.sprite.body.velocity.x = -200;
        }
        }else{
        if(Diogo.sprite.body.velocity.x<-120){
            Diogo.sprite.body.velocity.x = -120;
        }
        }
        Diogo.doNothing = false;
    }else if (cursors.right.isDown){
        if(Diogo.direction!='right'){
        Diogo.sprite.scale.x *= -1;
        Diogo.direction = 'right';
        }
        if(Diogo.sprite.body.velocity.x==0 ||
        (Diogo.sprite.animations.currentAnim.name!='left' && Diogo.sprite.body.onFloor())){
        Diogo.sprite.animations.play('left', 10, true);
        }
        Diogo.sprite.body.velocity.x += 10;
        if(runButton.isDown){
        if(Diogo.sprite.body.velocity.x>200){
            Diogo.sprite.body.velocity.x = 200;
        }
        }else{
        if(Diogo.sprite.body.velocity.x>120){
            Diogo.sprite.body.velocity.x = 120;
        }
        }
        Diogo.doNothing = false;
    }
    if (cursors.up.isDown && ((Diogo.sprite.body.touching.down && hitPlatform)  || Diogo.sprite.body.onFloor())){
        Diogo.sprite.body.velocity.y = -400;
        Diogo.doNothing = false;
        
    }
    if(Diogo.doNothing){
        if(Diogo.sprite.body.velocity.x>10){
        //mario.sprite.body.acceleration.x = 10;
        Diogo.sprite.body.velocity.x -= 10;
        }else if(Diogo.sprite.body.velocity.x<-10){
        //mario.sprite.body.acceleration.x = -10;
        Diogo.sprite.body.velocity.x += 10;
        }else{
        //mario.sprite.body.acceleration.x = 0;
        Diogo.sprite.body.velocity.x = 0;
        }
        if(Diogo.sprite.body.onFloor()){
        Diogo.sprite.animations.play('wait', 20, true);
        }
    }
    game.world.wrap(Diogo.sprite,0,true,true,false);
}


function ScrollToContacs(){
    if(Diogo.overlapping)
    return;
    else{
        Diogo.overlapping = true;
        document.getElementById("contactsNAV").click();
    }
}

function ScrollToAbout(){
    if(Diogo.overlapping)
    return;
    else{
        Diogo.overlapping = true;
        document.getElementById("aboutNAV").click();
    }
}
function ScrollToTraits(){
    if(Diogo.overlapping)
    return;
    else{
        Diogo.overlapping = true;
        document.getElementById("traitsNAV").click();
    }
}
function ScrollToWork(){
    if(Diogo.overlapping)
    return;
    else{
        Diogo.overlapping = true;
        document.getElementById("portfolioNAV").click();
    }
}
        