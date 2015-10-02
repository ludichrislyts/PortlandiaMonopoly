portlandiaMonopoly.controller('GameBoardCtrl', function GameBoardCtrl($scope, $stateParams, GameFactory, DeedsFactory, UtilitiesFactory) {
	
	$scope.factory = GameFactory;
	
	$scope.deeds = DeedsFactory.deeds;
	$scope.players = GameFactory.players;
	$scope.pieces = GameFactory.gamePieces;
	
	// $scope.remainingPieces = GameFactory.getRemainingPieces(GameFactory.gamePieces);
	
	// console.log($scope.remainingPieces);

	
	// $scope.playerPiece = UtilitiesFactory.getPlayerPiece(GameFactory.players, $stateParams.pieceId);

});