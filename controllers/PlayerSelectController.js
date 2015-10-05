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
	var highestRoller = [{playerName: "", roll: 0, tie: false, id: 0}];
	var player = null;
	var numberOfRolls = 0; 
	var numOfPlayers = GameFactory.players.length;
	var numberRolled = 2;
	var firstInTieBreak = true; // for testing ties
	// assigns playerId to highestRoller player_id
	// returns true if there is a tie
	// $scope.rollForFirst = function(playerId){
	$scope.rollForFirst = function (playerId) {
		// logic to determine if its a tie break round
		if($scope.break_tie && firstInTieBreak){
			numberOfRolls = 0;
			numOfPlayers = highestRoller.length;
			highestRoller = [{playerName: "", roll: 0, tie: false, id: 0}];
			firstInTieBreak = false;
		}
		numberOfRolls++;
		$scope.show_roll_results = true;
		player = UtilitiesFactory.findById(GameFactory.players, playerId);
		// require(['../lib/chance.js'], function(Chance){
		// var chance = new Chance();
		// var numberRolled = chance.integer({min:2, max:12}); // this works too
		if (numberRolled === highestRoller[0].roll) {
			highestRoller[0].tie = true;
			highestRoller.push({ playerName: player.name, roll: numberRolled, tie: true, id: player.id });
			alert(player.name + ' tied with the highest roller at ' + numberRolled + '!');
			if (numberOfRolls < numOfPlayers) { return; }
		}
		else if (numberRolled > highestRoller[0].roll) {
			highestRoller = [];
			highestRoller.push({ playerName: player.name, roll: numberRolled, tie: false, id: player.id });
			alert(player.name + ' has the highest roll at ' + numberRolled + '!');
			if (numberOfRolls < numOfPlayers) { return; }	
			// HIGH ROLLER
			// below are unused until I can get angular to display to html the results
			// of the first roll -- selectPlayers.html HIGH ROLLER snippet
			// $scope.highRollerName = highestRoller[0].playerName;
			// $scope.highRollerNum = highestRoller[0].roll;
		} else {
			alert('Sorry, ' + player.name + ', you didn\'t get the high roll.');
		}
		if (highestRoller.length > 1 && numberOfRolls == numOfPlayers && firstInTieBreak) {
			$scope.break_tie = true;
			firstInTieBreak = true;
			$scope.playersInTie = highestRoller;
		}else if(highestRoller.length > 1 && numberOfRolls == numOfPlayers && !firstInTieBreak){// default first player if more than one time in tiebreaker
			alert ("Ok, enough. " + player.name + " will go first.");
			return;
		}
		return;
	};
/////////////////////////////////////////////////////////////////////
/////////////////// end highest roller controls /////////////////////
/////////////////////////////////////////////////////////////////////
	
		
});