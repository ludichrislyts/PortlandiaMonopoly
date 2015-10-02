portlandiaMonopoly.controller('GamePieceCtrl', function GamePieceCtrl($scope, $stateParams, GameFactory, DeedsFactory, UtilitiesFactory) {
	
	$scope.initialize = GameFactory.getRemainingPieces(GameFactory.gamePieces);
	$scope.remainingPieces = GameFactory.remainingGamePieces;
});