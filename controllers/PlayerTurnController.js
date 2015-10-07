portlandiaMonopoly.controller('PlayerTurnCtrl', function PlayerTurnCtrl($scope, $stateParams, GameFactory, CommChanceFactory, UtilitiesFactory) {
	 // var actionCard = UtilitiesFactory.findById(CommChanceFactory, spaceId);
	 
	$scope.result = "roll";
	$scope.factory = GameFactory;
	$scope.player1 = GameFactory.players[0];
	// default to 'in market' for testing
	$scope.player1.inMarket = true;
	$scope.isInMarket = GameFactory.inMarket($scope.player1);
	console.log($scope.player1.name + " <= name, inMarket => " + $scope.player1.inMarket);
	GameFactory.playerStatsAlert($scope.player1);
	if($scope.player1.freedomRolls < 2){
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
	var freeCards = GameFactory.hasGetOut($scope.player1);
	if(freeCards.length > 0){
		$scope.has_card = true;
		$scope.getOutFreeCards = freeCards;
	}else{
		$scope.has_card = false;
	}
	$scope.marketAction = function(){
		GameFactory.playerStatsAlert($scope.player1);
		if($scope.market_choice === "card"){
			var index = $scope.getOutFreeCards.indexOf($scope.cardSelected);
			$scope.getOutFreeCards.splice(1, index);
			console.log("in card option of marketAction");
			$scope.isInMarket = false;
			GameFactory.playerStatsAlert($scope.player1);
			return;
		}else if($scope.market_choice === "pay"){
			if($scope.player1.money < 50){
				var performMortgageOption = function(){};// needs a function
			}else{
				console.log("in pay option of marketAction, money before adjust= " + $scope.player1.money);
				GameFactory.adjustMoney($scope.player1, -50);
				$scope.isInMarket = false;
				console.log("in pay option of marketAction, money after adjust= " + $scope.player1.money);
				$scope.player1.inMarket = false;
				GameFactory.playerStatsAlert($scope.player1);
				return;
			}
		}else if($scope.market_choice === "roll"){
			var marketRoll = $scope.roll();
			if(marketRoll.doubles){
				console.log("in roll option of marketAction");
				alert("You rolled doubles! You can leave Saturday Market!");
				$scope.rollAgain = false; // doubles are void when getting out of Market
				$scope.isInMarket = false;
				$scope.player1.inMarket = false;
				GameFactory.playerStatsAlert($scope.player1);
				return;
			}else{
				if($scope.player1.freedomRolls === 2){
					alert("You did not roll doubles! You must pay the $50 fine!");
					GameFactory.adjustMoney($scope.player1, -50);
					$scope.player1.freedomRolls = 0;
					$scope.isInMarket = false;
					$scope.player1.inMarket = false;
					GameFactory.playerStatsAlert($scope.player1);
					return;
				}else{
					alert("You did not roll doubles! Walk around Saturday Market for another turn. Maybe you'll find that tie-dye nighty you've always wanted!");
					$scope.player1.freedomRolls++;
					GameFactory.playerStatsAlert($scope.player1);
					return;
				}
			}// end else not doubles
		}// end roll choice	
	}// end market actions
	
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