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
  },

  $scope.buyDeed = function(deed, player) {
    if (deed.owned > 0) {
      return "Deed Already Owned";
    }
    if (!$scope.enoughMoney(deed.price, player.money)) {
      return "Not Enough Money";
    }
    player.money -= deed.price;
    deed.owned = player.id;
    var deed_number = deeds.indexOf(deed);
    var new_monopoly = $scope.checkForMonopoly(deed_number);
    var return_string= "Congratulations! You now own " + deed.name + ".";
    if (new_monopoly) {
      return_string += " You have a new Monopoly!";
    }
    return return_string;
  },

  $scope.enoughMoney = function(price, player_money) {
      if (player_money >= price) {
        return true;
      }
      else {
        return false;
      }
  },

  $scope.checkForMonopoly = function(deed_number) {
    var deed_groups = [[], [1, 3], [5, 15, 25, 35], [6, 8, 9], [11, 13, 14], [12, 28], [16, 18, 19],
                      [21, 23, 24], [26, 27, 29], [31, 32, 34], [37, 39]];
    var deed_group = deed_groups[deeds[deed_number].group_id];

    if (deed_group.length == 2) {
      if ((deeds[deed_group[0]].owned == deeds[deed_group[1]].owned)
          && (deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
        if (deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
          deeds[deed_group[0]].monopoly = true;
          deeds[deed_group[1]].monopoly = true;
          return true;
        }
      }
    }
    else if (deed_group.length == 3) {
      if ((deeds[deed_group[0]].owned == deeds[deed_group[1]].owned)
          && (deeds[deed_group[0]].owned == deeds[deed_group[2]].owned)
          && (deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
        if (deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
          deeds[deed_group[0]].monopoly = true;
          deeds[deed_group[1]].monopoly = true;
          deeds[deed_group[2]].monopoly = true;
          return true;
        }
      }
    }
    else { //deed_group.length == 4
      if ((deeds[deed_group[0]].owned == deeds[deed_group[1]].owned)
          && (deeds[deed_group[0]].owned == deeds[deed_group[2]].owned)
          && (deeds[deed_group[0]].owned == deeds[deed_group[3]].owned)
          && (deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
        if (deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
          deeds[deed_group[0]].monopoly = true;
          deeds[deed_group[1]].monopoly = true;
          deeds[deed_group[2]].monopoly = true;
          deeds[deed_group[3]].monopoly = true;
          return true;
        }
      }
    }
    return false; //there is no new monopoly
  };

  $scope.move = function(player, total) {
    player.position += total;
    // $(".player" + player.id).appendTo(".sqaure" + player.position);
  }

  $scope.turn = function(player, total) {
    roll ={};
    roll.total = total || 0;
    if (roll.total == 0) {
      roll = $scope.roll();
      document.write("roll.die1 = " + roll.die1 + "<br>roll.die2 = " + roll.die2 + "<br>roll.total = " + roll.total + "<br>roll.doubles = " + roll.doubles + "<br>");
    }
    else {
      document.write("roll.total =" + roll.total + "<br>");
    }
    $scope.move(player, roll.total);

  }


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

  document.write("<u>turn()</u>:<br>");
  var turn = $scope.turn(player, 10);



  // document.write("<u>roll()</u>:<br>");
  // var roll = $scope.roll();
  // document.write("roll.die1 = " + roll.die1 + "<br>roll.die2 = " + roll.die2 + "<br>roll.total = " + roll.total + "<br>roll.doubles = " + roll.doubles + "<br>");
  //
  // document.write("---------------------<br>");
  //
  // document.write("<u>buyDeed()</u>:<br>");


  // var buyDeedString = $scope.buyDeed(deeds[1], player);
  // document.write("buyDeed string = " + buyDeedString + "<br>");
  // document.write("player.money = " + player.money + "<br>");
  // document.write("deeds[1].owned = " + deeds[1].owned + "<br>");
  // document.write("deeds[1].monopoly = " + deeds[1].monopoly + "<br>");
  //
  // document.write("---------------------<br>");
  // document.write("<u>buyDeed()</u>:<br>");
  // var buyDeedString = $scope.buyDeed(deeds[3], player);
  // document.write("buyDeed string = " + buyDeedString + "<br>");
  // document.write("player.money = " + player.money + "<br>");
  // document.write("deeds[3].owned = " + deeds[3].owned + "<br>");
  // document.write("deeds[1].monopoly = " + deeds[1].monopoly + "<br>");
  // document.write("deeds[3].monopoly = " + deeds[3].monopoly + "<br>");
  // document.write("---------------------<br>");
  // document.write("<u>buyDeed()</u>:<br>");
  // var buyDeedString = $scope.buyDeed(deeds[9], player);
  // document.write("buyDeed string = " + buyDeedString + "<br>");
  // document.write("player.money = " + player.money + "<br>");
  // document.write("deeds[9].owned = " + deeds[9].owned + "<br>");
  // document.write("deeds[9].monopoly = " + deeds[9].monopoly + "<br>");
  // document.write("deeds[8].monopoly = " + deeds[8].monopoly + "<br>");
  // document.write("deeds[6].monopoly = " + deeds[6].monopoly + "<br>");
  // document.write("---------------------<br>");
  // document.write("<u>buyDeed()</u>:<br>");
  // var buyDeedString = $scope.buyDeed(deeds[8], player);
  // document.write("buyDeed string = " + buyDeedString + "<br>");
  // document.write("player.money = " + player.money + "<br>");
  // document.write("deeds[8].owned = " + deeds[8].owned + "<br>");
  // document.write("deeds[9].monopoly = " + deeds[9].monopoly + "<br>");
  // document.write("deeds[8].monopoly = " + deeds[8].monopoly + "<br>");
  // document.write("deeds[6].monopoly = " + deeds[6].monopoly + "<br>");
  // document.write("---------------------<br>");
  // document.write("<u>buyDeed()</u>:<br>");
  // var buyDeedString = $scope.buyDeed(deeds[6], player);
  // document.write("buyDeed string = " + buyDeedString + "<br>");
  // document.write("player.money = " + player.money + "<br>");
  // document.write("deeds[6].owned = " + deeds[6].owned + "<br>");
  // document.write("deeds[9].monopoly = " + deeds[9].monopoly + "<br>");
  // document.write("deeds[8].monopoly = " + deeds[8].monopoly + "<br>");
  // document.write("deeds[6].monopoly = " + deeds[6].monopoly + "<br>");
  //
  // document.write("---------------------<br>");
  // document.write("<u>buyDeed()</u>:<br>");
  // var buyDeedString = $scope.buyDeed(deeds[5], player);
  // document.write("buyDeed string = " + buyDeedString + "<br>");
  // document.write("player.money = " + player.money + "<br>");
  // document.write("deeds[5].owned = " + deeds[5].owned + "<br>");
  // document.write("deeds[5].monopoly = " + deeds[5].monopoly + "<br>");
  // document.write("deeds[15].monopoly = " + deeds[15].monopoly + "<br>");
  // document.write("deeds[25].monopoly = " + deeds[25].monopoly + "<br>");
  // document.write("deeds[35].monopoly = " + deeds[35].monopoly + "<br>");
  // document.write("---------------------<br>");
  // document.write("<u>buyDeed()</u>:<br>");
  // var buyDeedString = $scope.buyDeed(deeds[15], player);
  // document.write("buyDeed string = " + buyDeedString + "<br>");
  // document.write("player.money = " + player.money + "<br>");
  // document.write("deeds[15].owned = " + deeds[15].owned + "<br>");
  // document.write("deeds[5].monopoly = " + deeds[5].monopoly + "<br>");
  // document.write("deeds[15].monopoly = " + deeds[15].monopoly + "<br>");
  // document.write("deeds[25].monopoly = " + deeds[25].monopoly + "<br>");
  // document.write("deeds[35].monopoly = " + deeds[35].monopoly + "<br>");
  // document.write("---------------------<br>");
  // document.write("<u>buyDeed()</u>:<br>");
  // var buyDeedString = $scope.buyDeed(deeds[25], player);
  // document.write("buyDeed string = " + buyDeedString + "<br>");
  // document.write("player.money = " + player.money + "<br>");
  // document.write("deeds[25].owned = " + deeds[25].owned + "<br>");
  // document.write("deeds[5].monopoly = " + deeds[5].monopoly + "<br>");
  // document.write("deeds[15].monopoly = " + deeds[15].monopoly + "<br>");
  // document.write("deeds[25].monopoly = " + deeds[25].monopoly + "<br>");
  // document.write("deeds[35].monopoly = " + deeds[35].monopoly + "<br>");
  // document.write("---------------------<br>");
  // document.write("<u>buyDeed()</u>:<br>");
  // var buyDeedString = $scope.buyDeed(deeds[35], player);
  // document.write("buyDeed string = " + buyDeedString + "<br>");
  // document.write("player.money = " + player.money + "<br>");
  // document.write("deeds[35].owned = " + deeds[35].owned + "<br>");
  // document.write("deeds[5].monopoly = " + deeds[5].monopoly + "<br>");
  // document.write("deeds[15].monopoly = " + deeds[15].monopoly + "<br>");
  // document.write("deeds[25].monopoly = " + deeds[25].monopoly + "<br>");
  // document.write("deeds[35].monopoly = " + deeds[35].monopoly + "<br>");

});



//#ecfcf4 - hex color of board
