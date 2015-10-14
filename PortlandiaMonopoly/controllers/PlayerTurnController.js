/// <reference path="../Aaron/Classes.js" />
/// <reference path="../Aaron/Data.js" />

portlandiaMonopoly.controller('PlayerTurnCtrl', function PlayerTurnCtrl($scope, $stateParams, GameFactory) {
	// toggles purchase/pass on property display, not really used now
	$scope.result = "roll";
	var players = Data.players;
	//var factory = GameFactory;
	var player1 = Data.players[0];
	var player2 = Data.players[1];
	var player3 = Data.players[2];
	var player4 = Data.players[3];
	var player5 = Data.players[4];
	var community_chest_cards = Data.community_chest_data;
	var chanceCards = Data.chance_data;
	var deeds = Data.deeds;
	var chance = new Chance();
	var index = 0;
	var lastRoller;
	var lastLastRoller;
	var whoTurn = 0;

	var cardType = null;
	$scope.chanceCard = false;
	$scope.community_chanceCard = false;

	// uncomment this line for a real game
	$scope.currentPlayer = player1;

	$scope.samePlayer = $scope.currentPlayer.inMarket;

	// SETUP TURN
    //$scope.isInMarket = GameFactory.inMarket($scope.currentPlayer);
	$scope.isInMarket = $scope.currentPlayer.inMarket;
	$scope.rolled = false;
	$scope.submit = false;
	$scope.drawAction = false;

    //****************ROLL FUNCTION****************//
	$scope.roll = function () {
	    var chance = new Chance(); // loaded in index.html
	    var die1 = chance.integer({ min: 1, max: 6 });
	    var die2 = chance.integer({ min: 1, max: 6 });
	    var total = die1 + die2;
	    $scope.option_clicked = false; // variable to display 'move' button
	    return { total: total, die1: die1, die2: die2, doubles: die1 === die2 };
	} //end roll()


    //****************MOVE FUNCTION****************//
	$scope.move = function (player, total) {
	    player.position += total;
	    if (player.position > 39) { //player passed or landed on go
	        player.position -= 40;
	        player.money += 200;
	    }
	    $(".player" + player.id).appendTo(".square" + player.position);
	} //end move()

	$scope.ask_to_buy_deed = function (deed) {
	    if (confirm("Do you want to buy " + deed.name + "?")) {
	        $scope.buyDeed(deed);
	    }
	}


	// if total is passed in, that means the player rolled from jail and doubles are voided
    //if total is not passed in, then the player hasn't rolled yet and we will roll here
	$scope.turn = function (player, total) { 
		$scope.rollResult = {};
		//roll = $scope.roll();
		total = total || 0;
		if (total == 0) {
			$scope.rollResult = $scope.roll();
		}
		else {
			$scope.rollResult = { total: total, doubles: false };
		}
		if ($scope.rollResult.doubles) {
			$scope.samePlayer = true;
			player.num_of_doubles++;
			if (player.num_of_doubles >= 3) {
				player.num_of_doubles = 0;
				$scope.samePlayer = false;
				$scope.gotoJail(player);
				$scope.show_end_turn_button = true;
				return;
			}
		}
		else {
			player.num_of_doubles = 0;
		}
		return;
	};
	//****************PLAYEROPTION FUNCTION****************//

	$scope.playerOption = function (player, roll) {
		$scope.move(player, roll.total);
		var cardType;

		var deed = deeds[player.position];
		if (deed.group_id == 0) { // player is not able to buy this deed
			if (player.position == 0) { //Go

			}
			    //Community Chest
			else if ((player.position == 2) || (player.position == 17) || (player.position == 33)) { 
				cardType = "community chest";
				$scope.community_chestCard = true;
				$scope.draw = true;
				return;
			}
			    //Portland Art Tax
			else if (player.position == 4) { 
				alert("Pay Portland Art Tax, Lose 200 Dollars");
				player.money -= 200;
			}
			    //Chance
			else if ((player.position == 7) || (player.position == 22) ||
							(player.position == 36)) {
				cardType = "chance";
				$scope.chanceCard = true;
				$scope.draw = true;
				return;
			}
			else if (player.position == 10) {
				alert("You've decided to brave Saturday Market!");
				//Portland Saturday Market
			}
			else if (player.position == 20) { //Rose Garden
				alert("Take a walk up to Washington Park to visit\nPortland's Rose Test Garden!");
			}
			else if (player.position == 30) {
				alert("I guess you don't own enough tie-dye cargo shorts. Go to Saturday Market\n and don't come out until you get some!"); //Goto Jail
				player.position = 10;
				$(".player" + player.id).appendTo(".square" + player.position);
			}
			else if (player.position == 38) { //VooDoo Donuts
				alert("Pay for Voodoo Donuts, Lose 175 Dollars");
				player.money -= 175;
			}
			else {
				alert("This should never print");
			}
		}
		else if (deed.owned == 0) {
			// player option to buy or not to buy
			$scope.ask_to_buy_deed(deed);
			$scope.show_end_turn_button = true;
			return;
		}
		else if (deed.owned != player.id) {
			// player needs to pay another player rent
		}
		else {
			// player already owns this deed
			return;
		}
		$scope.show_end_turn_button = true;
		$scope.drawAction = false;
		return;
	} //end playerOption()
	$scope.getCard = function () {
		$scope.cardToRead = $scope.drawCard(cardType);
	};

    //****************DRAWCARD FUNCTION****************//
	$scope.drawCard = function (card_type) {
	    var card;
	    var card_number = chance.integer({ min: 0, max: 16 });
	    if (card_type == "community chest") {
	        card = community_chest_cards[card_number];
	        $scope.actionCard($scope.currentPlayer, card);
	        $scope.show_end_turn_button = true;
	        return card;
	    }
	    else if (card_type = "chance") {
	        card = chanceCards[card_number];
	        $scope.actionCard($scope.currentPlayer, card);
	        $scope.show_end_turn_button = true;
	        return card;
	    }
	    else {
	        alert("This should not print");
	    }
	} //end drawCard

    // action from community chest and chance cards function
	$scope.actionCard = function (player, card) {
	    if (card.kind === 'card') { // get outta jail card
	        if (card.value[0] = 0) {
	            player.getOutFree.push(card.group); // player might get more than 1
	        } else { // player must pay each player $, or player receives $ from other players
	            for (var i = 0; i < Data.players; i++) {
	                if (player.id === Data.players[i].id) {
	                    continue;
	                } else {
	                    Data.players[i].money += card.value[0];
	                    player.money += card.value[0];
	                }
	            }
	        }
	    } else if (card.kind === 'money') {
	        // alert(player.inMarket + ", player gets paid in actionCard()");
	        player.money += card.value[0];
	    } else if (card.kind === 'assess') {
	        player.money -= ((player.houses * card.value[0]) + (player.hotels * card.value[1]));
	    } else {// it's a move card
	        if (card.value < 0) {
	            player.position += -3; // go back 3 spaces card
	        } else {
	            if (card.value === 10) {// go to market
	                player.position = card.value;
	                player.inMarket = true;
	                alert(player.inMarket + ", player in Market in actionCard()");
	            } else if (card.value == 0) { // advance to go
	                player.position = 0;
	                player.money += 200;
	            } else { // random other places
	                if (player.position < card.value) {
	                    player.position = card.value;
	                } else {
	                    player.position = card.value;
	                    player.money += 200;
	                }
	            }
	        }
	    }
	};

	//****************BUYDEED FUNCTION****************//
	$scope.buyDeed = function (deed) {
		if (deed.owned > 0) {
			return "Deed Already Owned";
		}
		if (!$scope.enoughMoney(deed.price, $scope.currentPlayer.money)) {
			return "Not Enough Money";
		}
		$scope.currentPlayer.money -= deed.price;
		deed.owned = $scope.currentPlayer.id;
		var deed_number = deeds.indexOf(deed);
		var new_monopoly = $scope.checkForMonopoly(deed_number);
		alert("Congratulations! You now own " + deed.name + ".\nYou spent $" + deed.price);
		if (new_monopoly) {
			alert("Congratulations! You now own " + deed.name + ".\nYou spent $" + deed.price + "\nYou have a new Monopoly!");
		}
		if ($scope.currentPlayer.position < 10) {
			$(".square" + $scope.currentPlayer.position + " .bottom-cost").css("background-color", $scope.currentPlayer.piece.pieceName);
		} else if (($scope.currentPlayer.position < 20) && ($scope.currentPlayer.position > 10)) {
			$(".square" + $scope.currentPlayer.position + " .left-cost").css("background-color", $scope.currentPlayer.piece.pieceName);
		} else if (($scope.currentPlayer.position < 30) && ($scope.currentPlayer.position > 20)) {
			$(".square" + $scope.currentPlayer.position + " .top-cost").css("background-color", $scope.currentPlayer.piece.pieceName);
		} else if (($scope.currentPlayer.position < 40) && ($scope.currentPlayer.position > 20)) {
			$(".square" + $scope.currentPlayer.position + " .right-cost").css("background-color", $scope.currentPlayer.piece.pieceName);
		}
		return;
	}, //end buyDeed()

	//****************ENOUGHMONEY FUNCTION****************//
	$scope.enoughMoney = function (price, player_money) {
		if (player_money >= price) {
			return true;
		}
		else {
			return false;
		}
	} //end enoughMoney()


	//****************CHECKFORMONOPOLY FUNCTION****************//
	$scope.checkForMonopoly = function (deed_number) {
		var deed_groups = [[], [1, 3], [5, 15, 25, 35], [6, 8, 9], [11, 13, 14], [12, 28], [16, 18, 19],
						   [21, 23, 24], [26, 27, 29], [31, 32, 34], [37, 39]];
		var deed_group = deed_groups[deeds[deed_number].group_id];

		if (deed_group.length == 2) {
			if ((deeds[deed_group[0]].owned == deeds[deed_group[1]].owned)
					&& (deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
				if (deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
					deeds[deed_group[0]].monopoly = true;
					deeds[deed_group[1]].monopoly = true;
					return true;
				}
			}
		}
		else if (deed_group.length == 3) {
			if ((deeds[deed_group[0]].owned == deeds[deed_group[1]].owned)
					&& (deeds[deed_group[0]].owned == deeds[deed_group[2]].owned)
					&& (deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
				if (deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
					deeds[deed_group[0]].monopoly = true;
					deeds[deed_group[1]].monopoly = true;
					deeds[deed_group[2]].monopoly = true;
					return true;
				}
			}
		}
		else { //deed_group.length == 4
			if ((deeds[deed_group[0]].owned == deeds[deed_group[1]].owned)
					&& (deeds[deed_group[0]].owned == deeds[deed_group[2]].owned)
					&& (deeds[deed_group[0]].owned == deeds[deed_group[3]].owned)
					&& (deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
				if (deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
					deeds[deed_group[0]].monopoly = true;
					deeds[deed_group[1]].monopoly = true;
					deeds[deed_group[2]].monopoly = true;
					deeds[deed_group[3]].monopoly = true;
					return true;
				}
			}
		}
		return false; //there is no new monopoly
	} //end checkForMonopoly()


	//****************GOTOJAIL FUNCTION****************//
	$scope.gotoJail = function (player) {
		player.position = 10;
		player.num_of_doubles = 0;
		player.inMarket = true;
		$(".player" + player.id).appendTo(".square" + player.position);
	} //end gotoJail()

    //****************MARKETACTION FUNCTION****************//
    // for player options when in jail (market)
	$scope.marketAction = function () {
		var freeCards = GameFactory.hasGetOut($scope.currentPlayer);
		if (freeCards.length > 0) {
			$scope.has_card = true;
			$scope.getOutFreeCards = freeCards;
		} else {
			$scope.has_card = false;
		}
		GameFactory.playerStatsAlert($scope.currentPlayer);
		// if player chooses to use a get out free card
		if ($scope.market_choice === "card") {
			$scope.choose_card = false;
			var index = $scope.getOutFreeCards.indexOf($scope.cardSelected);
			$scope.currentPlayer.getOutFree.splice(index, 1);
			$scope.currentPlayer.inMarket = false;
			$scope.isInMarket = false;
			$scope.rolled = false;
			$scope.submit = false;
			$scope.samePlayer = false;
			GameFactory.playerStatsAlert($scope.currentPlayer);
			return;
			// pay option, first case player doesn't have enough money,
			// provide option to mortgage/sell
		} else if ($scope.market_choice === "pay") {
			if ($scope.currentPlayer.money < 50) {
				var performMortgageOption = function () { };// needs a function
				//player does have enough, pay the fine
			} else {
				// if player decides to pay first, subtract money and start their turn
				adjustMoney($scope.currentPlayer, -50);
				$scope.isInMarket = false;
				$scope.currentPlayer.inMarket = false;
				$scope.submit = false;
				$scope.samePlayer = false;
				GameFactory.playerStatsAlert($scope.currentPlayer);
				return;
			}
		} else if ($scope.market_choice === "roll") {
			var marketRoll = $scope.roll();
			if (marketRoll.doubles) {
				alert("You rolled doubles! You can leave Saturday Market!");
				$scope.rollAgain = false; // doubles are void when getting out of Market
				$scope.isInMarket = false;
				$scope.currentPlayer.inMarket = false;
				$scope.rolled = true;
				$scope.samePlayer = false;
				$scope.turn($scope.currentPlayer, marketRoll.total);
				GameFactory.playerStatsAlert($scope.currentPlayer);
				return;
			} else {
				if ($scope.currentPlayer.freedomRolls === 2) {
					alert("You did not roll doubles! You must pay the $50 fine!");
					adjustMoney($scope.currentPlayer, -50);
					$scope.currentPlayer.freedomRolls = 0;
					$scope.isInMarket = false;
					$scope.currentPlayer.inMarket = false;
					$scope.samePlayer = false;
					$scope.turn($scope.currentPlayer, marketRoll.total);
					GameFactory.playerStatsAlert($scope.currentPlayer);
					return;
				} else {
					alert("You did not roll doubles! Walk around Saturday Market for another turn. Maybe you'll find that tie-dye nighty you've always wanted!");
					$scope.currentPlayer.freedomRolls++;
					GameFactory.playerStatsAlert($scope.currentPlayer);
					$scope.samePlayer = false;
					$scope.show_end_turn_button = true;
					return;
				}
			}// end else not doubles
		}// end roll choice
		$scope.market_choice = null;
	} // end marketActions()

    //****************SHOWCARDS FUNCTION****************//
    // toggles the drop-down of available get out of market cards to use when in market
	$scope.showCards = function () {
	    // if drop down is displayed, and another option is selected, hide it
	    if ($scope.market_choice === "card") {
	        $scope.choose_card = true;
	    } else { $scope.choose_card = false; }
	} //end showCards()

	$scope.endTurn = function () {
	    $scope.draw = false;
	    $scope.rolled = false; // resets roll button
	    $scope.submit = false; // resets show roll button display
	    $scope.samePlayer = false; // resets if same player (doubles related)
	    $scope.option_clicked = false;
	    $scope.drawAction = false; // draw card and display result reset
	    //reset
	    if ($scope.currentPlayer.num_of_doubles > 0) {
	        // do nothing, same player will roll
	    } else {
	        index++;
	        if (index === Data.players.length) {
	            index = 0;
	        }
	        if (index === 0) {
	            $scope.currentPlayer = player1;
	        } else if (index === 1) {
	            $scope.currentPlayer = player2;
	        } else if (index === 2) {
	            $scope.currentPlayer = player3;
	        } else if (index === 3) {
	            $scope.currentPlayer = player4;
	        } else {
	            $scope.currentPlayer = player5;
	        }
	    }
	    for (var i = 0; i < players.length; i++) {
	        if (players[i].id == $scope.currentPlayer.id) {
	            $("#p" + $scope.currentPlayer.id).css("margin-top", "5px");
	        } else {
	            $("#p" + players[i].id).css("margin-top", "0px");
	        }
	    }
	};// end endTurn()
});
