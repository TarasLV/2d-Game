var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var gameStarted = false;
var keys = [];
var friction = 0.8;
var gravity = 0.9;
var completed = false;
var door_image = new Image();
door_image.src = "images/door.png";
var player_image = new Image();
player_image.src = "images/man.png";
var player = {
    x: 5
    , y: canvas.height - 25
    , width: 40
    , height: 40
    , speed: 6
    , jumpStrength: 11
    , jumping: false
    , grounded: false
    , velX: 0
    , velY: 0
    , color: "blue"
    , draw: function () {
        var startX = 42;
        if (this.position == 'left') {
            startX = 0;
        }
        else if (this.position == 'right') {
            startX = 84;
        }
        ctx.drawImage(player_image, startX, 0, 40, 40, this.x, this.y, 40, 40)
    }
    , position: 'idle'
, }
var goal = {
    x: canvas.width - 60
    , y: 0
    , width: 37
    , height: 51
    , color: 'green'
    , draw: function () {
        ctx.drawImage(door_image, this.x, this.y, );
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
intro_screen();

function intro_screen() {
    ctx.font = "50px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("HTML5 Game", canvas.width / 2, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Press Enter to start the GAME", canvas.width / 2, canvas.height / 2 + 50);
};
var platform = [];
var platform_width = 120;
var platform_height = 10;
var grass = [];
var grass_width = 120;
var grass_height = 5;
platform.push({
    x: canvas.width - 200
    , y: canvas.height - 60
    , width: platform_width
    , height: platform_height
});
grass.push({
    x: canvas.width - 200
    , y: canvas.height - 65
    , width: grass_width
    , height: grass_height
});


platform.push({
    x: canvas.width - 350
    , y: canvas.height - 110
    , width: platform_width
    , height: platform_height
});
grass.push({
    x: canvas.width - 350
    , y: canvas.height - 115
    , width: grass_width
    , height: grass_height
});


platform.push({
    x: canvas.width - 450
    , y: canvas.height - 160
    , width: platform_width
    , height: platform_height
});
grass.push({
    x: canvas.width - 450
    , y: canvas.height - 165
    , width: grass_width
    , height: grass_height
});



platform.push({
    x: canvas.width - 550
    , y: canvas.height - 210
    , width: platform_width
    , height: platform_height
});
grass.push({
    x: canvas.width - 550
    , y: canvas.height - 215
    , width: grass_width
    , height: grass_height
});



platform.push({
    x: canvas.width - 580
    , y: canvas.height - 260
    , width: platform_width
    , height: platform_height
});
grass.push({
    x: canvas.width - 580
    , y: canvas.height - 265
    , width: grass_width
    , height: grass_height
});


platform.push({
    x: canvas.width - 390
    , y: canvas.height - 290
    , width: platform_width
    , height: platform_height
});
grass.push({
    x: canvas.width - 390
    , y: canvas.height - 295
    , width: grass_width
    , height: grass_height
});


platform.push({
    x: canvas.width - 250
    , y: canvas.height - 260
    , width: platform_width
    , height: platform_height
});
grass.push({
    x: canvas.width - 250
    , y: canvas.height - 265
    , width: grass_width
    , height: grass_height
});


platform.push({
    x: canvas.width - 140
    , y: canvas.height - 310
    , width: platform_width
    , height: platform_height
});
grass.push({
    x: canvas.width - 140
    , y: canvas.height - 315
    , width: grass_width
    , height: grass_height
});


platform.push({
    x: 0
    , y: canvas.height - 5
    , width: canvas.width
    , height: 10
});

//walls
platform.push({
    x: canvas.width
    , y: 0
    , width: 10
    , height: canvas.height
});
platform.push({
    x: -10
    , y: 0
    , width: 10
    , height: canvas.height
});
//roof
platform.push({
    x: 0
    , y: -10
    , width: canvas.width
    , height: 10
});
document.body.addEventListener('keydown', function (event) {
    if (event.keyCode == 13 && !gameStarted) {
        start_game();
    }
    if (event.keyCode == 13 && completed) {
        reset();
    }
    keys[event.keyCode] = true;
});
document.body.addEventListener('keyup', function (event) {
    keys[event.keyCode] = false;
});

function start_game() {
    gameStarted = true;
    clearCanvas();
    requestAnimationFrame(loop);
}

function complete() {
    clearCanvas();
    completed = true;
    ctx.font = "50px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Congrats, Level Completed!", canvas.width / 2, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Press Enter to Restart", canvas.width / 2, canvas.height / 2 + 50);
}

function reset() {
    player.x = 5;
    player.y = canvas.height - 25;
    player.grounded = true;
    player.velY = 0;
    player.velX = 0;
    completed = false;
    requestAnimationFrame(loop);
}

function loop() {
    clearCanvas();
    draw_gras();
    player.draw();
    goal.draw();
    draw_platform();
    player.position = 'idle';
    if (keys[65]) {
        if (player.velX > -player.speed) {
            player.position = 'left';
            player.velX--;
        }
    }
    if (keys[68]) {
        if (player.velX < player.speed) {
            player.position = 'right';
            player.velX++;
        }
    }
    if (keys[87] || keys[74]) {
        if (!player.jumping) {
            player.velY = -player.jumpStrength;
            player.jumping = true;
        }
    }
    player.x += player.velX;
    player.velX *= friction;
    player.y += player.velY;
    player.velY += gravity;
    player.grounded = false;
    //        if (player.y >= canvas.height - player.height) {
    //            player.y = canvas.height - player.height;
    //            player.jumping=false;
    //        }
    for (var i = 0; i < platform.length; i++) {
        var direction = collisionCheck(player, platform[i]);
        if (direction == "left" || direction == "right") {
            player.velX = 0;
        }
        else if (direction == "top") {
            player.velY *= -1;
        }
        else if (direction == "bottom") {
            player.jumping = false;
            player.grounded = true;
        }
    }
    if (player.grounded) {
        player.velY = 0;
    }
    if (collisionCheck(player, goal)) {
        complete();
    }
    if (!completed) {
        requestAnimationFrame(loop);
    }
}

function draw_platform() {
    ctx.fillStyle = "black";
    for (var i = 0; i < platform.length; i++) {
        ctx.fillRect(platform[i].x, platform[i].y, platform[i].width, platform[i].height);
    }
}

function draw_gras() {
    ctx.fillStyle = '#00e812';
    for (var i = 0; i < grass.length; i++) {
        ctx.fillRect(grass[i].x, grass[i].y, grass[i].width, grass[i].height);
    }
}

function collisionCheck(character, platform) {
    var vectorX = (character.x + (character.width / 2)) - (platform.x + (platform.width / 2));
    var vectorY = (character.y + (character.height / 2)) - (platform.y + (platform.height / 2));
    var halfWidths = (character.width / 2) + (platform.width / 2);
    var halfHeights = (character.height / 2) + (platform.height / 2);
    var collisionDirection = null;
    if (Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights) {
        var offsetX = halfWidths - Math.abs(vectorX);
        var offsetY = halfHeights - Math.abs(vectorY);
        if (offsetX < offsetY) {
            if (vectorX > 0) {
                collisionDirection = 'left';
                character.x += offsetX;
            }
            else {
                collisionDirection = 'right';
                character.x -= offsetX;
            }
        }
        else {
            if (vectorY > 0) {
                collisionDirection = 'top';
                character.y += offsetY;
            }
            else {
                collisionDirection = 'bottom';
                character.y -= offsetY;
            }
        }
    }
    return collisionDirection;
}