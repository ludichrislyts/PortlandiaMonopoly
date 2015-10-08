var portlandiaMonopoly = angular.module('portlandiaMonopoly', ['ui.router']);

portlandiaMonopoly.config(function($stateProvider, $urlRouterProvider) {

	// $stateProvider.state('home', {
	// 	url: "",
	// 	templateUrl: "partials/home.html"
	// });

	$stateProvider.state('home', {
		url: "",
		views:{
			'test':{
				templateUrl: "testFunctions.html",
				// controller: "FunctionCtrl",
			},
			'playerActions': {
				templateUrl: "partials/selectPlayers.html",
				controller: "PlayerSelectCtrl",
			},
			'gameBoard':{
				templateUrl: "partials/gameboard.html",
				// templateUrl: "gameboardtest.html",
				controller: "GameBoardCtrl",
			},
		}
	});
	$stateProvider.state('play',{
		url:"/play",
		views:{
			'playerActions':{
				templateUrl: "partials/playerTurn.html",
				controller: "PlayerTurnCtrl",
			},
			'gameBoard':{
				templateUrl: "partials/gameboard.html",
				controller: "GameBoardCtrl",
			},
		}
	});
});
