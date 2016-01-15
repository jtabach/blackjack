

var deck = [
	{value: 2, image: "cards/2_of_clubs.png"},
	{value: 2, image: "cards/2_of_diamonds.png"},
	{value: 2, image: "cards/2_of_hearts.png"},
	{value: 2, image: "cards/2_of_spades.png"},
	{value: 3, image: "cards/3_of_clubs.png"},
	{value: 3, image: "cards/3_of_diamonds.png"},
	{value: 3, image: "cards/3_of_hearts.png"},
	{value: 3, image: "cards/3_of_spades.png"},
	{value: 4, image: "cards/4_of_clubs.png"},
	{value: 4, image: "cards/4_of_diamonds.png"},
	{value: 4, image: "cards/4_of_hearts.png"},
	{value: 4, image: "cards/4_of_spades.png"},
	{value: 5, image: "cards/5_of_clubs.png"},
	{value: 5, image: "cards/5_of_diamonds.png"},
	{value: 5, image: "cards/5_of_hearts.png"},
	{value: 5, image: "cards/5_of_spades.png"},
	{value: 6, image: "cards/6_of_clubs.png"},
	{value: 6, image: "cards/6_of_diamonds.png"},
	{value: 6, image: "cards/6_of_hearts.png"},
	{value: 6, image: "cards/6_of_spades.png"},
	{value: 7, image: "cards/7_of_clubs.png"},
	{value: 7, image: "cards/7_of_diamonds.png"},
	{value: 7, image: "cards/7_of_hearts.png"},
	{value: 7, image: "cards/7_of_spades.png"},
	{value: 8, image: "cards/8_of_clubs.png"},
	{value: 8, image: "cards/8_of_diamonds.png"},
	{value: 8, image: "cards/8_of_hearts.png"},
	{value: 8, image: "cards/8_of_spades.png"},
	{value: 9, image: "cards/9_of_clubs.png"},
	{value: 9, image: "cards/9_of_diamonds.png"},
	{value: 9, image: "cards/9_of_hearts.png"},
	{value: 9, image: "cards/9_of_spades.png"},
	{value: 10, image: "cards/10_of_clubs.png"},
	{value: 10, image: "cards/10_of_diamonds.png"},
	{value: 10, image: "cards/10_of_hearts.png"},
	{value: 10, image: "cards/10_of_spades.png"},
	{value: 10, image: "cards/jack_of_clubs.png"},
	{value: 10, image: "cards/jack_of_diamonds.png"},
	{value: 10, image: "cards/jack_of_hearts.png"},
	{value: 10, image: "cards/jack_of_spades.png"},
	{value: 10, image: "cards/queen_of_clubs.png"},
	{value: 10, image: "cards/queen_of_diamonds.png"},
	{value: 10, image: "cards/queen_of_hearts.png"},
	{value: 10, image: "cards/queen_of_spades.png"},
	{value: 10, image: "cards/king_of_clubs.png"},
	{value: 10, image: "cards/king_of_diamonds.png"},
	{value: 10, image: "cards/king_of_hearts.png"},
	{value: 10, image: "cards/king_of_spades.png"},
	{value: 1, image: "cards/ace_of_clubs.png"},
	{value: 1, image: "cards/ace_of_diamonds.png"},
	{value: 1, image: "cards/ace_of_hearts.png"},
	{value: 1, image: "cards/ace_of_spades2.png"},
];

var userHand = [];
var dealerHand =[{value: 0, image: "cards/back.png"}];
var shuffled = [];
var playerTurn = true;

$(document).ready(init);

function init() {
	$('#deal').click(shuffleDeck);
	$('#hit').click(addCard);
}

function shuffleDeck() {
	// console.log('shuffle');
	shuffled = _.shuffle(deck);
	// console.log(shuffled);
	dealCards();
}

function dealCards() {
	$("#backCard").show();
	addCard();
	addCard();
	playerTurn = false;
	addCard();
	playerTurn = true;
}

function addCard() {
	var randIndex = _.random(0, shuffled.length);
	console.log(randIndex);
	var $newCard = $('<div>').addClass('card').css('background-image', "url(" + deck[randIndex].image + ")");
	if (playerTurn) {
		userHand.push(deck[randIndex]);
		$('#userHand').append($newCard);
	} else {
		dealerHand.push(deck[randIndex]);
		$('#dealerHand').append($newCard);
	}
	// console.log(randIndex);
	var discard = shuffled.splice(randIndex, 1);
	// console.log(discard);
	sumCards();
}

function sumCards() {
	var userSum = _.sumBy(userHand, function(o) {
		return o['value'];
	});
	var dealerSum = _.sumBy(dealerHand, function(o) {
		return o['value'];
	});
	// console.log(userSum);
	$("#userTotal").text(userSum);
	$("#dealerTotal").text(dealerSum);
	$('#hit').show();
}

























