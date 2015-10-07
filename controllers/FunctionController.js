portlandiaMonopoly.controller('FunctionCtrl', function FunctionCtrl($scope, $stateParams, GameFactory, UtilitiesFactory, DeedsFactory) {
  var deeds = DeedsFactory.deeds;
  $scope.position = 0;

  // $scope.getDeed = function(position){
  //   var deed1 = deeds[$scope.position];
  //   console.log(deed1);
  //   return deed1;
  // }

  $scope.roll = function() {
    var chance = new Chance(); // loaded in index.html
    var die1 = chance.integer({min:1, max:6});
    var die2 = chance.integer({min:1, max:6});
    var total = die1 + die2;
    if (die1 === die2) {
      var doubles = true;
    }
    else {
      doubles = false;
    }
    return {total: total, die1: die1, die2: die2, doubles: doubles};
  }

  $scope.buyDeed = function(deed, player) {
    if (deed.owned > 0) {
      return "Deed Already Owned";
    }
    if (!$scope.enoughMoney(deed.price, player.money)) {
      return "Not Enough Money";
    }
    player.money -= deed.price;
    deed.owned = player.id;
    var new_monopoly = $scope.checkForMonopoly(player.position);
    var return_string= "Congratulations! You now own " + deed.name + ".";
    // if (new_monopoly) {
    //   return_string += " You have a new Monopoly!";
    // }
    return return_string;
  }

  $scope.enoughMoney = function(price, player_money) {
      if (player_money >= price) {
        return true;
      }
      else {
        return false;
      }
  }

  $scope.checkForMonopoly = function(deed_number) {
    var deed_groups = [[], [1, 3], [5, 15, 25, 35], [6, 8, 9], [11, 13, 14], [12, 28], [16, 18, 19],
                      [21, 23, 24], [26, 27, 29], [31, 32, 34], [37, 39]];
    var deed_group = deed_groups[deeds[deed_number].group_id];

    // if (deed_group.length == 2) {
    //   if ((factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[1]].owned)
    //       && (factory.deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
    //     if (factory.deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
    //       factory.deeds[deed_group[0]].monopoly = true;
    //       factory.deeds[deed_group[1]].monopoly = true;
    //       return true;
    //     }
    //   }
    // }
    // else if (deed_group.length == 3) {
    //   if ((factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[1]].owned)
    //       && (factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[2]].owned)
    //       && (factory.deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
    //     if (factory.deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
    //       factory.deeds[deed_group[0]].monopoly = true;
    //       factory.deeds[deed_group[1]].monopoly = true;
    //       factory.deeds[deed_group[2]].monopoly = true;
    //       return true;
    //     }
    //   }
    // }
    // else { //deed_group.length == 4
    //   if ((factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[1]].owned)
    //       && (factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[2]].owned)
    //       && (factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[3]].owned)
    //       && (factory.deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
    //     if (factory.deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
    //       factory.deeds[deed_group[0]].monopoly = true;
    //       factory.deeds[deed_group[1]].monopoly = true;
    //       factory.deeds[deed_group[2]].monopoly = true;
    //       factory.deeds[deed_group[3]].monopoly = true;
    //       return true;
    //     }
    //   }
    // }
    return false; //there is no new monopoly
  }












  document.write("<u>roll()</u>:<br>");
  var roll = $scope.roll();
  document.write("roll.die1 = " + roll.die1 + "<br>roll.die2 = " + roll.die2 + "<br>roll.total = " + roll.total + "<br>roll.doubles = " + roll.doubles + "<br>");

  document.write("---------------------<br>");

  document.write("<u>buyDeed()</u>:<br>");

  var player = { id: 1,
                   name: "car",
                  //  piece: {pieceName: factory.gamePieces[i].pieceName,
                  //          id: i + 1,
                  //          taken: false},
                   money: 1500,
                   inMarket: false,
                   freedomRolls: 0,
                   position: 9,
                   getOutFree: [],
                   houses: 0,
                   hotels: 0
                };

  var buyDeedString = $scope.buyDeed(deeds[9], player);
  document.write("buyDeed string = " + buyDeedString + "<br>");
  document.write("player.money = " + player.money + "<br>");
  document.write("deeds[].owned = " + deeds[9].owned + "<br>")

  document.write("---------------------<br>");



});
