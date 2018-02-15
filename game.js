function getRandom(min, max){
	return Math.round(Math.random() * (max - min) + min)
}

document.querySelector(".video_position").src = "video/head.mp4";

document.querySelector(".video_position").setAttribute("loop", "yle");

document.querySelectorAll(".video_position_1")[0].setAttribute('muted','bihsla')
document.querySelectorAll(".video_position_1")[1].setAttribute('muted','')

var player_point = 0;
var cpu_point = 0;

var ball_1 = 0;
var ball_2 = 0;
var helper = 0;
var helper_2 = 0;

var ball_1_y = 1;
var ball_2_y = 1;

var ball_1_stop = 0;
var ball_2_stop = 0;

var gatanilis_raodenoba = 0;
var acilebulis_raodenoba = 0;

var x = 1;

var game = 0;
var timout1,timeout2;
function ball_1_move () {
	if (helper == 0) {
		ball_1 = ball_1 + ball_1_y
		$('.ball_1').css({"top": ball_1})
		if (ball_1 >= 150) { helper = 1;}
	}

  	if (helper == 1) {
  		ball_1 = ball_1 - ball_1_y
  		$('.ball_1').css({"top": ball_1})
  		if (ball_1 <= 0) { helper = 0;}
  	}

  	if (helper == 3) 
  	{

  	}	

	if(helper != 3)
	{
		timeout2=setTimeout(function() {
   		ball_1_move()
  		}, x)
	}  	
}

function ball_2_move () {
	if (helper_2 == 0) {
		ball_2 = ball_2 + ball_2_y;
		$('.ball_2').css({"left": ball_2})
		if (ball_2 >= 150) { helper_2 = 1;}
	}

  	if (helper_2 == 1) {
  		ball_2 = ball_2 - ball_2_y;
  		$('.ball_2').css({"left": ball_2})
  		if (ball_2 <= 0) { helper_2 = 0;}
  	}

  	if (helper_2 == 3) 
  	{

  	}	

	if(helper_2 != 3)
	{
		timeout1 = setTimeout(function() {
   		ball_2_move()
  		}, x)
	}  	
}

ball_1_move();

function gaiasneba () {
	if (ball_1_stop == 1) 
		{ 
			ball_2_stop = 1;
			helper_2 = 3;
			ball_1_move();
		}

	if (ball_1_stop == 0) 
		{	
			ball_1_stop = 1; 
			helper = 3;
			ball_2_move();
		}

	if (ball_1_stop == 1 && ball_2_stop == 1) {
		goal_or_notgoal();
		document.querySelector(".video_position").removeAttribute("loop", "loop");
		game = 1;
	}	
}

function goal_or_notgoal () {
	if (ball_1 >= 66 && ball_1 <= 83 && ball_2 >= 64 && ball_2 <= 81) 
	{
	
		gatanilis_raodenoba++;
		document.querySelector(".video_position").src = "video/win_1.mp4";
		video_end();
	}
	else
	{
	
		acilebulis_raodenoba++;
		document.querySelector(".video_position").src = "video/loss.mp4";
		video_end();
	}
}

function video_end (){
	var vid = document.querySelector('.video_position');
	vid.onended = function() {
		document.querySelector(".video_position").src = "video/head.mp4";
		reset();
	}
}

function ball_show () {
	for(var a = 1; a < 6; a++)
	{
		if (gatanilis_raodenoba == a) {$("#player_bal_"+a).css({"display": "block"})}
		if (acilebulis_raodenoba == a) {$("#cpu_bal_"+a).css({"display": "block"})}
	}

	if (gatanilis_raodenoba > acilebulis_raodenoba) 
	{
		if ((gatanilis_raodenoba - acilebulis_raodenoba) == 1) { ball_1_y = 2; ball_2_y = 2;}
		if ((gatanilis_raodenoba - acilebulis_raodenoba) == 2) { ball_1_y = 4; ball_2_y = 4;}
		if ((gatanilis_raodenoba - acilebulis_raodenoba) == 3) { ball_1_y = 6; ball_2_y = 6;}
		if ((gatanilis_raodenoba - acilebulis_raodenoba) == 4) { ball_1_y = 8; ball_2_y = 8;}
	}	
	if (gatanilis_raodenoba == acilebulis_raodenoba) { ball_1_y = 1; ball_2_y = 1;}


}

function ball_speed () {

}

function reset () {
	clearTimeout(timeout2)
	clearTimeout(timeout1)
	ball_1 = 0;
	ball_2 = 0;
	helper = 0;
	helper_2 = 0;

	ball_1_stop = 0;
	ball_2_stop = 0;

	ball_1_move();

	$('.ball_2').css({"left": ball_2})

	document.querySelector(".video_position").src = "video/head.mp4";

	game = 0;

	ball_show();
	if (acilebulis_raodenoba == 5 || gatanilis_raodenoba == 5) 
	{
		game_reset();
	}
}

function game_reset () {
	ball_1_y = 1; ball_2_y = 1;
	if (acilebulis_raodenoba == 5) { cpu_point++; }
	if (gatanilis_raodenoba == 5) { player_point++; }
	acilebulis_raodenoba = 0;
	gatanilis_raodenoba = 0;
	$('.player_bal').css({"display" : "none"})

	document.querySelector("#n_77").innerHTML = "Player " + player_point;
	document.querySelector('#n_87').innerHTML = "Cpu " + cpu_point;

	ball_1_move();
}

document.addEventListener('keypress', (event) => {
  const keyName = event.key;
  if (keyName == "d" ) {
  	if (game == 0) {
  		gaiasneba();
  	}
  }
}
);

