// portlandiaMonopoly.controller('PlayerSelectCtrl', function PlayerSelectCtrl($scope, $stateParams, GameFactory, DiceFactory, UtilitiesFactory) {
	
// 	$scope.factory = GameFactory;
// 	$scope.player = UtilitiesFactory.findById($stateParams.playerId);
	
// 	$scope.highestRoller = [{player: null, roll: 0}];
// 		// assigns playerId to highestRoller player_id
// 		// returns true if cur player rolls highest, false if not
// 	$scope.rollForFirst = function(player){
// 		// var player = UtilitiesFactory.findById(playerId);
// 		require(['../lib/chance.js'], function(Chance){
// 			var chance = new Chance();
// //		var numberRolled = DiceFactory.roll(); // use when ready
// 			var numberRolled = chance.integer({min:2, max:12});
// 			console.log("numberRolled: " + numberRolled);
// 			if(numberRolled > $scope.highestRoller.roll){
// 				$scope.highestRoller.player_id = player.id;
// 				return true;
// 			}else {return false}			
// 		});		
// 	}
	
// 	// $stateParams
	
// 	$stateParams.isInMarket = GameFactory.inMarket($scope.player);
// });