portlandiaMonopoly.controller('PlayerSelectCtrl', function PlayerSelectCtrl($scope, $stateParams, GameFactory, UtilitiesFactory) {
	
	$scope.factory = GameFactory;
	
	// $scope.deeds = DeedsFactory.deeds;
	$scope.players = GameFactory.players;
	$scope.pieces = GameFactory.gamePieces;
	$scope.startGame = false;
	
	// TESTING ONLY //
	$scope.players = GameFactory.seedPlayerArray();
	// $scope.playerPiece = GameFactory.players.playerPiece;
	$scope.update = function(){
		$scope.remainingPieces = GameFactory.remainingGamePieces;
		$scope.factory.playerPiece = GameFactory.remainingGamePieces[0];
	};
	$scope.remainingPieces = GameFactory.remainingGamePieces;
	// initial startGame value to be false. Toggled true in partial when user selects
	// to start game
	
	// changes the selected piece in the drop down to reflect already taken pieces
});