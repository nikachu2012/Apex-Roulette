// version
var apex = {};
var change = {};
var weapon = {};


var option = {
    speed: 20,
    duration: 1,
}
$('div.roulette_1').roulette(option);

var option = {
    speed: 20,
    duration: 1,
}
$('div.roulette_2').roulette(option);


apex.pushRoulette = function(){
    $('div.roulette_1').roulette('start');
}

apex.pushSubRoulette = function(){
    $('div.roulette_1').roulette('start');
    $('div.roulette_2').roulette('start');
}