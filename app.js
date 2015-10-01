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
			'body': {
				templateUrl: "partials/testFactoryFunctions.html",
				controller: "GameBoardCtrl",
			},
		}
	});
});