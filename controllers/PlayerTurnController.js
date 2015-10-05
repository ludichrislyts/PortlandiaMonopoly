portlandiaMonopoly.controller('PlayerTurnCtrl', function PlayerTurnCtrl($scope, $stateParams, GameFactory, UtilitiesFactory) {
	
	$scope.factory = GameFactory;
	console.log($stateParams.playerId);
	$scope.player1 = GameFactory.players[0];
	console.log($scope.player1.name);
	var chance = new Chance();// module loaded in index.html
	var roll = (chance.integer({min:2, max:12}));
	$stateParams.isInMarket = GameFactory.inMarket($scope.player1);
});