portlandiaMonopoly.controller('PlayerTurnCtrl', function PlayerTurnCtrl($scope, $stateParams, GameFactory, UtilitiesFactory) {
	$scope.result = "roll";
	$scope.factory = GameFactory;
	$scope.player1 = GameFactory.players[0];
	console.log($scope.player1.name);
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

	var inMarket = GameFactory.inMarket($scope.player1);
	$stateParams.isInMarket = inMarket;
	
	
	
	
});