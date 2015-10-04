var portlandiaMonopoly = angular.module('portlandiaMonopoly', ['ui.router']);

portlandiaMonopoly.config(function($stateProvider, $urlRouterProvider) {

	// $stateProvider.state('home', {
	// 	url: "",
	// 	templateUrl: "partials/home.html"
	// });

	$stateProvider.state('home', {
		url: "",
		views:{
			// 'header': {
			// 	templateUrl: "partials/header.html",
			// },
			'playerSelectionView': {
				templateUrl: "partials/selectPlayers.html",
				controller: "PlayerSelectCtrl",
			},
		}
	});
	$stateProvider.state('play',{
		url:"/play",
		views:{
			'turn':{
				templateUrl: "partials/playerTurn.html",
				controller: "PlayerSelectCtrl",
			}
		}
	})
});