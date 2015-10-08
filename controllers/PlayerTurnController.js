portlandiaMonopoly.controller('PlayerTurnCtrl', function PlayerTurnCtrl($scope, $stateParams, GameFactory, CommChanceFactory, UtilitiesFactory) {
	 // var actionCard = UtilitiesFactory.findById(CommChanceFactory, spaceId);

	$scope.result = "roll";
	$scope.rolled = false;
	$scope.factory = GameFactory;
	$scope.player1 = GameFactory.players[0];
	$scope.player2 = GameFactory.players[1];
	$scope.player3 = GameFactory.players[2];
	$scope.player4 = GameFactory.players[3];
	$scope.player5 = GameFactory.players[4];
	
	var index = 0;
	// uncomment this line for a real game
	$scope.currentPlayer = $scope.player1; 
	// SETUP TURN
	$scope.isInMarket = GameFactory.inMarket($scope.currentPlayer);
	console.log($scope.isInMarket + ", scope");
	$scope.rolled = false;
	$scope.submit = false;
	// FOR TESTING GET OUT FREE CARDS!!
/////////////////////////////////////////////////////////////////////////
///////////// Player Select Controller, lines 89 + 96 must //////////////
/////////////////// also be uncommented /////////////////////////////////
/////////////////////////////////////////////////////////////////////////
			// $scope.currentPlayer = $scope.player5;
			// console.log($scope.currentPlayer.name + ", currentPlayer initial");
/////////////////////////////////////////////////////////////////////////
////////////// FACTORY FUNCTIONS THAT DON'T USE $SCOPE //////////////////
////////////////////////// (I THINK) ////////////////////////////////////
	
	// adjust Player money
  // returns new amount
  var adjustMoney = function(currentPlayer, amount){
    currentPlayer.money += amount;
    return currentPlayer.money;
  };
  $scope.turn = function(player, total) {
    var roll ={};
    roll.total = total || 0;
    if (roll.total == 0) {
      roll = $scope.roll();
      document.write("roll.die1 = " + roll.die1 + "<br>roll.die2 = " + roll.die2 + "<br>roll.total = " + roll.total + "<br>roll.doubles = " + roll.doubles + "<br>");
    }
    else {
      document.write("roll.total =" + roll.total + "<br>");
    }
    $scope.move(player, roll.total);

  },
	
	  $scope.roll = function() {
    var chance = new Chance(); // loaded in index.html
    var die1 = chance.integer({min:1, max:6});
    var die2 = chance.integer({min:1, max:6});
    var total = die1 + die2;
    if (die1 === die2) {
      var doubles = true;
    }
    else {
      doubles = false;
    }
    return {total: total, die1: die1, die2: die2, doubles: doubles};
  };
	

	// advance turn
	$scope.endTurn = function(){
		// FOR TESTING
		// $scope.currentPlayer = $scope.player5;
		// GameFactory.playerStatsAlert($scope.currentPlayer);
		// $scope.isInMarket = $scope.currentPlayer.inMarket;
		$scope.rolled = false;
		$scope.submit = false;
		alert("in end turn function, " + $scope.rolled + ", <= rolled, " + $scope.isInMarket + ", isInMarket");
		//reset 
		// comment out above line and uncomment below for actual gameplay
		index++;
		if(index === GameFactory.players.length){
			index = 0;
		}
		if(index === 0){
			$scope.currentPlayer = $scope.player1;
		}else if(index === 1){
			$scope.currentPlayer = $scope.player2;
		}else if(index === 2){
			$scope.currentPlayer = $scope.player3;
		}else if(index ===3){
			$scope.currentPlayer = $scope.player4;
		}else{
			$scope.currentPlayer = $scope.player5;
		}
	 };// end end turn
	 
	// $scope.currentPlayer = $scope.player4;
	// $scope.currentPlayer = $scope.player5;
	// $scope.isInMarket = true;
	
	// current player start
	// default to 'in market' for testing
	
	GameFactory.playerStatsAlert($scope.currentPlayer);
	// check if player has already rolled twice to get out of market
	if($scope.currentPlayer.freedomRolls < 2){
		$scope.stay_in_market = true;
	}else{
		$scope.stay_in_market = false;
	};
	

	// to determine to show use card option
	var freeCards = GameFactory.hasGetOut($scope.currentPlayer);
	console.log(freeCards[0] + ", " + freeCards[1] + ", freeCards");
	if(freeCards.length > 0){
		$scope.has_card = true;
		$scope.getOutFreeCards = freeCards;
	}else{
		$scope.has_card = false;
	}
	$scope.showCards = function(){
		// if drop down is displayed, and another option is selected, hide it
		if($scope.market_choice === "card"){
			$scope.choose_card = true;
		}else{$scope.choose_card = false;}
	},
	
	$scope.marketAction = function(){
		console.log($scope.currentPlayer);
		GameFactory.playerStatsAlert($scope.currentPlayer);
		// if player chooses to use a get out free card
		if($scope.market_choice === "card"){
			$scope.choose_card = false;			
			var index = $scope.getOutFreeCards.indexOf($scope.cardSelected);
			$scope.currentPlayer.getOutFree.splice(index, 1);
			console.log(index + ", in card option of marketAction: " + $scope.cardSelected + ", card chosen");
			$scope.currentPlayer.inMarket = false;
			$scope.isInMarket = false;
			$scope.rolled = false;
			$scope.submit = false;
			GameFactory.playerStatsAlert($scope.currentPlayer);
			return;
			// pay option, first case player doesn't have enough money,
			// provide option to mortgage/sell 
		}else if($scope.market_choice === "pay"){
			if($scope.currentPlayer.money < 50){
				var performMortgageOption = function(){};// needs a function
			//player does have enough, pay the fine
			}else{ 
				// if player decides to pay first, subtract money and start their turn
			  adjustMoney($scope.currentPlayer, -50);
				$scope.isInMarket = false;
				$scope.currentPlayer.inMarket = false;
				$scope.submit = false;
				GameFactory.playerStatsAlert($scope.currentPlayer);
				return;
			}
		}else if($scope.market_choice === "roll"){
			var marketRoll = $scope.roll();
			if(marketRoll.doubles){
				console.log("in roll option of marketAction");
				alert("You rolled doubles! You can leave Saturday Market!");
				$scope.rollAgain = false; // doubles are void when getting out of Market
				$scope.isInMarket = false;
				$scope.currentPlayer.inMarket = false;
				$scope.rolled = true;
				turn($scope.currentPlayer, marketRoll.total);
				GameFactory.playerStatsAlert($scope.currentPlayer);
				return;
			}else{
				if($scope.currentPlayer.freedomRolls === 2){
					alert("You did not roll doubles! You must pay the $50 fine!");
					adjustMoney($scope.currentPlayer, -50);
					$scope.currentPlayer.freedomRolls = 0;
					$scope.isInMarket = false;
					$scope.currentPlayer.inMarket = false;
					//$scope.submit = false; // start turn instead
					turn($scope.currentPlayer, marketRoll.total);
					GameFactory.playerStatsAlert($scope.currentPlayer);
					// $scope.show_end_turn_button = true;
					// $scope.endTurn();
					return;
				}else{
					alert("You did not roll doubles! Walk around Saturday Market for another turn. Maybe you'll find that tie-dye nighty you've always wanted!");
					$scope.currentPlayer.freedomRolls++;
					GameFactory.playerStatsAlert($scope.currentPlayer);
					// $scope.isInMarket = true;
					$scope.show_end_turn_button = true;
					// $scope.endTurn();
					return;
				}
			}// end else not doubles
		}// end roll choice	
		$scope.market_choice = null;
	}// end market actions
	

	// $scope.roll = function(){
	// 	var resultArray = UtilitiesFactory.rollDice();
	// 	var numResult = resultArray[0];
	// 	var doubles = resultArray[1];
	// 	if(doubles){
	// 		$scope.result = "You rolled " + numResult + ' with doubles!';
	// 		return true;
	// 	}else{
	// 		$scope.result = "You rolled " + numResult;
	// 		return false;
	// 	}
	// }

// market rules:
/* ------if player is in market, they can...
* pay $50
* use card
* roll doubles
*		- if doubles are rolled in turns 1, 2, or 3, player gets out, but
*     doubles power up is voided
*		- if player decides to pay $50/use card BEFORE rolling, doubles power is in 				effect
		- if player does not pay, use card, or roll doubles by the third turn, player
		  must pay the $50, and whatever was the last roll is the current roll
*/
	// for testing in market functions:




});
