portlandiaMonopoly.controller('PlayerSelectCtrl', function PlayerSelectCtrl($scope, $stateParams, GameFactory, UtilitiesFactory) {
	
	$scope.factory = GameFactory;
	// $scope.deeds = DeedsFactory.deeds;
	
	// TESTING ONLY!! Comment out and un-comment next $scope.players line when game is live
	$scope.players = GameFactory.seedPlayerArray();
	// $scope.players = GameFactory.players;
	$scope.pieces = GameFactory.gamePieces;
	// initial startGame value to be false. Toggled true in partial when user selects
	// to start game
	$scope.startGame = false;	
/////////////////////////////////////////////////////////////////////
/////////////////// select player controls //////////////////////////
/////////////////////////////////////////////////////////////////////
	$scope.update = function(){
		$scope.remainingPieces = GameFactory.remainingGamePieces;
	// changes the selected piece in the drop down to show top available piese
		$scope.factory.playerPiece = GameFactory.remainingGamePieces[0];
	};
	$scope.remainingPieces = GameFactory.remainingGamePieces;
/////////////////////////////////////////////////////////////////////
/////////////////// end select player controls //////////////////////
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
/////////////////// highest roller controls /////////////////////////
/////////////////////////////////////////////////////////////////////
	var highestRoller = [{player: null, roll: 0, show: false}];
	var player = null 
	// assigns playerId to highestRoller player_id
	// returns true if highest, false if not
	$scope.rollForFirst = function(playerId){
		$scope.show_roll_results = true;
		player = UtilitiesFactory.findById(GameFactory.players, playerId);
		console.log("player: " + player);
		require(['../lib/chance.js'], function(Chance){
			var chance = new Chance();
//		var numberRolled = DiceFactory.roll(); // use when ready
			var numberRolled = chance.integer({min:2, max:12}); // this works too
			if(numberRolled > highestRoller[0].roll){
				highestRoller = [];
				highestRoller.push({player: player, roll: numberRolled, show: true})
				// console.log("highest = true, numberRolled: " + numberRolled +
				// 						", highestRoller[0].player.name: " + highestRoller[0].player.name +
				// 						", .roll: " + highestRoller[0].roll);
				$scope.highRollername = highestRoller[0].player.name;
				$scope.highRollerNum = highestRoller[0].roll;
				$scope.$apply(); // needed this line to update the view
				return true;
			}else {
				// console.log("highest = false, numberRolled: " + numberRolled +
				// 		", highestRoller.player.name: " + highestRoller[0].player.name +
				// 		", .roll: " + highestRoller[0].roll);
				return false}			
		});		
	}
/////////////////////////////////////////////////////////////////////
/////////////////// end highest roller controls /////////////////////
/////////////////////////////////////////////////////////////////////
		
});