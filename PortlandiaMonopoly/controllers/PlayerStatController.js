//controls the header with the player stats - playerStats.html
portlandiaMonopoly.controller('PlayerStatCtrl', function PlayerStatCtrl($scope, $stateParams) {
    $scope.players = Data.players;
    $("#start-logo").bind(function () {
        $("#start-logo").on('hover', function () {
            $("#zoom").toggleClass("square38");
        });
    });
    if ($("#bird").css("width") === "10%") {
        $("#bird").toggleClass("zoom");
    }
});
//# sourceMappingURL=PlayerStatController.js.map