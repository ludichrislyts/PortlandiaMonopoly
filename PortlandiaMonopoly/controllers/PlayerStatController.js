//controls the header with the player stats - playerStats.html
portlandiaMonopoly.controller('PlayerStatCtrl', function PlayerStatCtrl($scope, $stateParams) {
    $scope.players = Data.players;
    $(".zoom").toggleClass("wobble");
});
//# sourceMappingURL=PlayerStatController.js.map