portlandiaMonopoly.controller('PlayerTurnCtrl', function PlayerTurnCtrl($scope, $stateParams, GameFactory, UtilitiesFactory) {
	
	$scope.factory = GameFactory;
	$scope.player = UtilitiesFactory.findById($stateParams.playerId);
	var chance = new Chance();// module loaded in index.html
	console.log(chance.integer());
	$stateParams.isInMarket = GameFactory.inMarket($scope.player);
});