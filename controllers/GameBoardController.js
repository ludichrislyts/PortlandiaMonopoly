portlandiaMonopoly.controller('GameBoardCtrl', function GameBoardCtrl($scope, $stateParams, GameFactory, DeedsFactory, UtilitiesFactory) {

// 	$scope.initialize = GameFactory.getRemainingPieces(GameFactory.gamePieces);
// 	$scope.remainingPieces = GameFactory.remainingGamePieces;
//
$(document).ready(function(){
	$( "#hide-option" ).tooltip({
		hide: {
			effect: "explode",
			delay: 250
		}
	});
});
