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
	var highestRoller = [{playerName: "", roll: 0, tie: false}];
	var player = null 
	// assigns playerId to highestRoller player_id
	// returns true if there is a tie
	// $scope.rollForFirst = function(playerId){
	$scope.rollForFirst = function(playerId){
		$scope.show_roll_results = true;
		player = UtilitiesFactory.findById(GameFactory.players, playerId);
		require(['../lib/chance.js'], function(Chance){
			var chance = new Chance();
//		var numberRolled = DiceFactory.roll(); // use when ready
			var numberRolled = chance.integer({min:2, max:12}); // this works too
			if(numberRolled === highestRoller[0].roll){
				highestRoller[0].tie = true;
				highestRoller.push({playerName: player.name, roll: numberRolled, tie: true});
				return alert(player.name + ' tied with the highest roller at ' + numberRolled + '!');
			}
			if(numberRolled > highestRoller[0].roll){
				highestRoller = [];
				highestRoller.push({playerName: player.name, roll: numberRolled, tie: false});
				return alert(player.name + ' has the highest roll at ' + numberRolled + '!');
			// HIGH ROLLER
			// below are unused until I can get angular to display to html the results
			// of the first roll -- selectPlayers.html HIGH ROLLER snippet
				// $scope.highRollerName = highestRoller[0].playerName;
				// $scope.highRollerNum = highestRoller[0].roll;
			}else{
				return alert('Sorry, ' +  player.name + ', you didn\'t get the high roll.');
			}		
		});		
	};
	
/////////////////////////////////////////////////////////////////////
/////////////////// end highest roller controls /////////////////////
/////////////////////////////////////////////////////////////////////
	
		
});