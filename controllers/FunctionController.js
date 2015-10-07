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
    if (!factory.enoughMoney(deed.price, player.money)) {
      return "Not Enough Money";
    }
    player.money -= deed.price;
    deed.owned = player.id;
    var new_monopoly = factory.checkForMonopoly(player.position);
    var return_string= "Congratulations! You now own " + deed.name + ".";
    if (new_monopoly) {
      return_string += " You have a new Monopoly!";
    }
    return return_string;
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
                   position: 0,
                   getOutFree: [],
                   houses: 0,
                   hotels: 0
                };

  $scope.buyDeed(deeds[9], player);

  document.write("---------------------<br>");



});
