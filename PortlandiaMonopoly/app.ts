declare var angular: any

var portlandiaMonopoly = angular.module('portlandiaMonopoly', ['ui.router']);

portlandiaMonopoly.config(function ($stateProvider, $urlRouterProvider) {
    // $stateProvider.state('home', {
    // 	url: "",
    // 	templateUrl: "partials/home.html"
    // });

    $stateProvider.state('home', {
        url: "",
        views: {
            'setup': {
                templateUrl: "partials/selectPlayers.html",
                controller: "PlayerSelectCtrl"
            }
        }
    });

    $stateProvider.state('click_to_start', {
        url: "/click",
        views: {
            'startButton': {
                template: '<div class="fade-screen"><a ui-sref="play" style="text-decoration:none; width: 100%; height:100%">Click to Start!</a></div>',
                controller: "PlayerTurnCtrl"
            },
        }
    });

    $stateProvider.state('play', {
        url: "/play",
        views: {
            'playerStats': {
                templateUrl: "partials/playerStats.html",
                controller: "PlayerTurnCtrl"
            },
            'gameBoard': {
                templateUrl: "partials/gameboard.html",
                controller: "PlayerTurnCtrl"
            },
            'playerActions': {
                templateUrl: "partials/playerTurn.html",
                controller: "PlayerTurnCtrl"
            }
        }
    });
});