portlandiaMonopoly.controller('PlayerTurnCtrl', function PlayerTurnCtrl($scope, $stateParams, GameFactory, CommChanceFactory, UtilitiesFactory) {
	 // var actionCard = UtilitiesFactory.findById(CommChanceFactory, spaceId);

	$scope.result = "roll";
	$scope.factory = GameFactory;
	$scope.player1 = GameFactory.players[0];
	$scope.player2 = GameFactory.players[1];
	$scope.player3 = GameFactory.players[2];
	$scope.player4 = GameFactory.players[3];
	$scope.player4 = GameFactory.players[4];
	
	var index = 0;
	// $scope.currentPlayer = $scope.player1; // uncomment this line for a real game
	// FOR TESTING GET OUT FREE CARDS!!
/////////////////////////////////////////////////////////////////////////
///////////// Player Select Controller, lines 89 + 96 must //////////////
/////////////////// also be uncommented /////////////////////////////////
/////////////////////////////////////////////////////////////////////////
	$scope.currentPlayer = $scope.player4;
	console.log($scope.currentPlayer.name + ", currentPlayer initial");
	
	// advance turn
	$scope.endTurn = function(){
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
	},
	
	
	// current player start
	// default to 'in market' for testing
	$scope.currentPlayer.inMarket = true;
	$scope.isInMarket = GameFactory.inMarket($scope.currentPlayer);
	console.log($scope.isInMarket + ", scope");
	
	GameFactory.playerStatsAlert($scope.currentPlayer);
	if($scope.currentPlayer.freedomRolls < 2){
		$scope.stay_in_market = true;
	}else{
		$scope.stay_in_market = false;
	}
	// returns true if doubles were rolled

	$scope.roll = function(){
		var resultArray = UtilitiesFactory.rollDice();
		var numResult = resultArray[0];
		var die1 = resultArray[1];
		var die2 = resultArray[2];
		var doubles = resultArray[3];
		if(doubles){
			$scope.result = "You rolled " + numResult + ' with doubles!';
			return true;
		}else{
			$scope.result = "You rolled " + numResult;
			return false;
		}
	}
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
		if($scope.choose_card === true){
			$scope.choose_card = false;
		}else { 
			$scope.choose_card = true;
		}
	},
	$scope.marketAction = function(){
		console.log($scope.currentPlayer);
		GameFactory.playerStatsAlert($scope.currentPlayer);
		if($scope.market_choice === "card"){
			$scope.choose_card = true;			
			var index = $scope.getOutFreeCards.indexOf($stateParams.cardChosen);
			$scope.getOutFreeCards.splice(1, index);
			console.log("in card option of marketAction");
			$scope.isInMarket = false;
			GameFactory.playerStatsAlert($scope.currentPlayer);
			return;
		}else if($scope.market_choice === "pay"){
			if($scope.currentPlayer.money < 50){
				var performMortgageOption = function(){};// needs a function
			}else{
				console.log("in pay option of marketAction, money before adjust= " + $scope.currentPlayer.money);
				GameFactory.adjustMoney($scope.currentPlayer, -50);
				$scope.isInMarket = false;
				console.log("in pay option of marketAction, money after adjust= " + $scope.currentPlayer.money);
				$scope.currentPlayer.inMarket = false;
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
				GameFactory.playerStatsAlert($scope.currentPlayer);
				return;
			}else{
				if($scope.currentPlayer.freedomRolls === 2){
					alert("You did not roll doubles! You must pay the $50 fine!");
					GameFactory.adjustMoney($scope.currentPlayer, -50);
					$scope.currentPlayer.freedomRolls = 0;
					$scope.isInMarket = false;
					$scope.currentPlayer.inMarket = false;
					GameFactory.playerStatsAlert($scope.currentPlayer);
					$scope.endTurn();
					return;
				}else{
					alert("You did not roll doubles! Walk around Saturday Market for another turn. Maybe you'll find that tie-dye nighty you've always wanted!");
					$scope.currentPlayer.freedomRolls++;
					GameFactory.playerStatsAlert($scope.currentPlayer);
					$scope.endTurn();
					return;
				}
			}// end else not doubles
		}// end roll choice	
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
