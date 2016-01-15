

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
	{value: 11, image: "cards/ace_of_clubs.png"},
	{value: 11, image: "cards/ace_of_diamonds.png"},
	{value: 11, image: "cards/ace_of_hearts.png"},
	{value: 11, image: "cards/ace_of_spades.png"},
];

var timeoutComplete = true;
var totalBet = 0;
var totalChips = 1000;

var checks = {
	blackjack: function() {
		if (hand.user.sum === 21) {
			$('#winner').text('BLACK JACK!').show();
			disableButtons();
		}
	},
	bust: function(turn) {
		if (hand[turn].sum > 21) {
			var busted = checks.aces(turn);
			if (busted) {
				if (playerTurn === "user") {
					disableButtons();
					return dealerWins();
				} else {
					disableButtons();
					return playerWins();
				}
			}
		}
	},
	aces: function(turn) {
		var index = _.findIndex(hand[turn].cards, function(o) {
			return o["value"] === 11;
		});
		if (index === -1) {
			return true;
		} else {
			hand[turn].cards[index].value = 1;
			sumCards();
		}
		console.log(index);
	}
}

var hand = {
	user: {
		cards: [],
		sum: 0
	},
	dealer: {
		cards: [],
		sum: 0
	}
};

var shuffled = [];
var playerTurn = "user";

$(document).ready(init);

function init() {
	$('#deal').click(shuffleDeck);
	$('#hit').click(hit);
	$('#stay').click(stay);
	$('.chips').click(addBet);
	$('.clear').click(clearBet);
}

function shuffleDeck() {
	resetDeck();
	totalChips -= totalBet;
	adjustChips();
	clearBet();
	disableBetting();
	$('#deal').attr('disabled',true).addClass('disabled');
	$('#stay').attr('disabled',false).removeClass('disabled');
	$('#hit').attr('disabled',false).removeClass('disabled');
	// console.log('shuffle');
	shuffled = _.shuffle(deck);
	// console.log(shuffled);
	dealCards();
}

function dealCards() {
	$('#dealerHand').append($('<div>').addClass('card').css('background-image', "url('cards/back.png')"));
	hand.dealer.cards[0] = {value: 0, image: "cards/back.png"};
	playerTurn = "user";
	addCard(playerTurn); // user first card
	playerTurn = "dealer";
	addCard(playerTurn); // dealer second card, *first card is assigned as blank*
	playerTurn = "user";
	addCard(playerTurn); // user second card
	checks.blackjack();
	checks.bust(playerTurn);
}

// Created in order to invoke add card with a parameter
function hit() {
	addCard(playerTurn);
	checks.bust(playerTurn); 
}

function stay() {
	disableButtons();
	endTurn(playerTurn);
}

function endTurn(turn) {
	if (turn === "user") {
		playerTurn = "dealer";
		dealerGo();
	} else {
		compareHands();
	}
}

function addCard(turn) {
	var randIndex = randomCard();
	var $newCard = $('<div>').addClass('card').css('background-image', "url(" + shuffled[randIndex].image + ")");
	// setTimeout(function() {
		if (turn === "user") {
			$('#userHand').append($newCard); // FIXME: maybe can make one line
		} else {
			$('#dealerHand').append($newCard);
		}
		console.log(hand[turn].cards);
		hand[turn].cards.push(shuffled[randIndex]);
		var discard = shuffled.splice(randIndex, 1);
		sumCards();
	// },500);
}

function sumCards() {
	hand.user.sum = _.sumBy(hand.user.cards, function(o) {
		return o['value'];
	});
	hand.dealer.sum = _.sumBy(hand.dealer.cards, function(o) {
		return o['value'];
	});
	console.log(hand.user.sum);
	$("#userTotal").text(hand.user.sum);
	$("#dealerTotal").text(hand.dealer.sum);
	$('#hit').show();
}

function dealerGo() {
	var randIndex = randomCard();
	var $newCard = $('<div>').addClass('card').css('background-image', "url(" + shuffled[randIndex].image + ")");
	hand.dealer.cards[0] = shuffled[randIndex];
	$('#dealerHand').children().first().remove()
	$('#dealerHand').prepend($newCard);
	sumCards();
	dealerMove();
}

function dealerMove() {
	checks.bust(playerTurn);
	if (hand.dealer.sum > 21) {
		playerWins();
	} else if (hand.dealer.sum > 16) {
		return compareHands();
	} else {
		addCard(playerTurn);
		dealerMove();
	}
}

function compareHands() {
	if (hand.user.sum === hand.dealer.sum) {
		$('#winner').text("IT'S A PUSH").show();
	} else if (hand.user.sum > hand.dealer.sum) {
		return playerWins();
	} else {
		return dealerWins();
	}
	disableButtons();
}

function randomCard() {
	return _.random(0, (shuffled.length -1) );
}

function disableButtons() {
	$('#hit').attr('disabled',true).addClass('disabled');
	$('#stay').attr('disabled',true).addClass('disabled');
	$('#deal').attr('disabled',false).removeClass('disabled');
}

function resetDeck() {
	$('#userHand').empty();
	$('#dealerHand').empty();
	$('#winner').hide();
	playerTurn = "user"
	hand.dealer.sum = 0;
	hand.user.sum = 0;
	hand.user.cards = [];
	hand.dealer.cards = [];
}

function dealerWins() {
	$('#winner').text("DEALER WINS").show();
	totalBet = 0;
	adjustChips();
	enableBetting();
}

function playerWins() {
	totalChips += totalBet * 2;
	$('#winner').text("PLAYER WINS").show();
	totalBet = 0;
	adjustChips();
	enableBetting();
}

function addBet() {
	if (!$('.chips').hasClass('disabled')) {
		var bet = Number($(this).text());
		totalBet += bet;
		console.log(bet);
		$('#totalBet').val(totalBet);
	}
}

function adjustChips() {
	$('#totalChips').text(totalChips);
}

function clearBet() {
	$('#totalBet').val(0);
	totalBet = 0;
}

function disableBetting() {
	$('.chips').attr('disabled', true).addClass('disabled');
}

function enableBetting() {
	$('.chips').attr('disabled', false).removeClass('disabled');
}






