portlandiaMonopoly.controller('GameBoardCtrl', function GameBoardCtrl($scope, $stateParams, GameFactory, DeedsFactory, UtilitiesFactory) {
	
	$scope.factory = GameFactory;
	
	$scope.deeds = DeedsFactory.deeds;
	$scope.players = GameFactory.players;
	$scope.pieces = GameFactory.gamePieces;
	
	$scope.playerPiece = GameFactory.players.playerPiece;
	$scope.remainingPieces = GameFactory.remainingGamePieces;
	// initial startGame value to be false. Toggled true in partial when user selects
	// to start game
	$scope.startGame = false;
	
	// changes the selected piece in the drop down to reflect already taken pieces
	$scope.update = function(){
		$scope.factory.playerPiece = GameFactory.remainingGamePieces[0];
	};
});