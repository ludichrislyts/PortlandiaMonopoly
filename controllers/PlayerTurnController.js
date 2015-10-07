portlandiaMonopoly.controller('PlayerTurnCtrl', function PlayerTurnCtrl($scope, $stateParams, GameFactory, CommChanceFactory, UtilitiesFactory) {
	 // var actionCard = UtilitiesFactory.findById(CommChanceFactory, spaceId);
	 
	$scope.result = "roll";
	$scope.factory = GameFactory;
	$scope.player1 = GameFactory.players[0];
	$scope.player1.inMarket = true;
	$scope.isInMarket = GameFactory.inMarket($scope.player1);
	console.log($scope.player1.name + " <= name, inMarket => " + $scope.player1.inMarket);
	if($scope.player1.freedomRolls < 2){
		$scope.stay_in_market = true;
	}else{
		$scope.stay_in_market = false;		
	}
	// returns true if doubles were rolled
	$scope.roll = function(){
		var resultArray = UtilitiesFactory.rollDice();
		var numResult = resultArray[0];
		var doubles = resultArray[1];
		if(doubles){
			$scope.result = "You rolled " + numResult + ' with doubles!';
			return true;
		}else{
			$scope.result = "You rolled " + numResult;
			return false;
		}
	}
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