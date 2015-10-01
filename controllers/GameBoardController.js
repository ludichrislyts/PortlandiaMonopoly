portlandiaMonopoly.controller('GameBoardCtrl', function GameBoardCtrl($scope, $stateParams,GameFactory, DeedsFactory, UtilitiesFactory) {
	$scope.deeds = DeedsFactory.deeds;
	$scope.players = GameFactory.players;

});