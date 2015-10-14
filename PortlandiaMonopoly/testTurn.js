$scope.turn = function (player, total) { //if total is not passed in, then the player hasn't rolled yet and we will roll here
    $scope.rollResult = {};
    //roll = $scope.roll();
    total = total || 0;
    if (total == 0) {
        $scope.rollResult = $scope.roll();
    }
    else {
        $scope.rollResult = { total: total, doubles: false };
    }
    $scope.move(player, $scope.rollResult.total);
    if ($scope.rollResult.doubles) {
        player.num_of_doubles++;
        if (player.num_of_doubles >= 3) {
            player.num_of_doubles = 0;
            $scope.gotoJail(player);
            $scope.show_end_turn_button = true;
            return;
        }
    } return;
}
$scope.playerOption(player); //give player option to buy deed landed on


$scope.endTurn = function () {
    // FOR TESTING
    // $scope.currentPlayer = $scope.player5;
    // GameFactory.playerStatsAlert($scope.currentPlayer);
    // $scope.isInMarket = $scope.currentPlayer.inMarket;
    $scope.rolled = false;
    $scope.submit = false;
    $scope.samePlayer = false;
    //reset
    if ($scope.currentPlayer.num_of_doubles > 0) {
        $scope.samePlayer = true;
    } else {
        index++;
        if (index === Data.players.length) {
            index = 0;
        }
        if (index === 0) {
            $scope.currentPlayer = $scope.player1;
        } else if (index === 1) {
            $scope.currentPlayer = $scope.player2;
        } else if (index === 2) {
            $scope.currentPlayer = $scope.player3;
        } else if (index === 3) {
            $scope.currentPlayer = $scope.player4;
        } else {
            $scope.currentPlayer = $scope.player5;
        }
    }
};// end endTurn()