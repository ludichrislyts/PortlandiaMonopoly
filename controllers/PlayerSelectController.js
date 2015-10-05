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
	var numberRolled = 0;
	var firstInTieBreak = true; // for testing ties
	var numOfRollers = GameFactory.players.length;
	// assigns playerId to highestRoller player_id
	// returns true if there is a tie
	// $scope.rollForFirst = function(playerId){
	$scope.rollForFirst = function (playerId) {
		// logic to determine if its a tie break round
		if($scope.break_tie && firstInTieBreak){
			numberOfRolls = 0;
			numOfRollers = highestRoller.length;
			highestRoller = [{playerName: "", roll: 0, tie: false, id: 0}];
			firstInTieBreak = false;
		}
		numberOfRolls++;
		$scope.show_roll_results = true;
		player = UtilitiesFactory.findById(GameFactory.players, playerId);
		var chance = new Chance(); // module loaded in index.html
		numberRolled = chance.integer({min:2, max:12}); // this works too
		if (numberRolled === highestRoller[0].roll) {
			highestRoller[0].tie = true;
			highestRoller.push({ playerName: player.name, roll: numberRolled, tie: true, id: player.id });
			alert(player.name + ' tied with the highest roller at ' + numberRolled + '!');
			if (numberOfRolls < numOfRollers) { 
				console.log("rolls in tie, less than number of rollers. " + numberOfRolls + ", players:" + numOfRollers);
				return; 
			}
		}
		else if (numberRolled > highestRoller[0].roll) {
			highestRoller = [];
			highestRoller.push({ playerName: player.name, roll: numberRolled, tie: false, id: player.id });
			alert(player.name + ' has the highest roll at ' + numberRolled + '!');
			if (numberOfRolls < numOfRollers) { 
				console.log("rolls in high roll, less than number of rollers. " + numberOfRolls + ", players:" + numOfRollers);
				return; 
			}	
			// HIGH ROLLER
			// below are unused until I can get angular to display to html the results
			// of the first roll -- selectPlayers.html HIGH ROLLER snippet
			// $scope.highRollerName = highestRoller[0].playerName;
			// $scope.highRollerNum = highestRoller[0].roll;
		} else {
			alert('Sorry, ' + player.name + ', you didn\'t get the high roll.');
			console.log("rolls in low roll, default. " + numberOfRolls + ", players:" + numOfRollers);
		}
		if (highestRoller.length > 1 && (numberOfRolls === numOfRollers) && firstInTieBreak) {
			$scope.break_tie = true;
			firstInTieBreak = true;
			$scope.playersInTie = highestRoller;
			console.log("rolls first in tie, === " + numberOfRolls + ", players:" + numOfRollers);
		}else if(highestRoller.length > 1 && (numberOfRolls === numOfRollers) && !firstInTieBreak){// default first player if more than one time in tiebreaker
			alert ("Ok, enough. " + player.name + " will go first.");
			$scope.break_tie = false;
			$scope.startGameMessage = true;
			$scope.firstPlayer = player;
			$scope.playersInOrder = GameFactory.fixPlayerOrder(player.id);
			console.log("rolls not first in tie, === " + numberOfRolls + ", players:" + numOfRollers);
		}
		else if(numberOfRolls === numOfRollers){
			var playerToStart = UtilitiesFactory.findById(GameFactory.players,highestRoller[0].id);
			$scope.startGameMessage = true;
			$scope.firstPlayer = playerToStart;
			$scope.playersInOrder = GameFactory.fixPlayerOrder(playerToStart.id);
			console.log("HERE" + "end, === " + numberOfRolls + ", players:" + numOfRollers);
		}
		return;
	};
/////////////////////////////////////////////////////////////////////
/////////////////// end highest roller controls /////////////////////
/////////////////////////////////////////////////////////////////////
	
		
});