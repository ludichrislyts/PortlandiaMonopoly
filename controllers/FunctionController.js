portlandiaMonopoly.controller('FunctionCtrl', function FunctionCtrl($scope, $stateParams, GameFactory, UtilitiesFactory, DeedsFactory) {
  var deeds = DeedsFactory.deeds;
  $scope.position = 0;

  // $scope.roll = function() {
  //   var chance = new Chance(); // loaded in index.html
  //   var die1 = chance.integer({min:1, max:6});
  //   var die2 = chance.integer({min:1, max:6});
  //   var total = die1 + die2;
  //   if (die1 === die2) {
  //     var doubles = true;
  //   }
  //   else {
  //     doubles = false;
  //   }
  //   return {total: total, die1: die1, die2: die2, doubles: doubles};
  // } //end roll()

  // $scope.buyDeed = function(deed, player) {
  //   if (deed.owned > 0) {
  //     return "Deed Already Owned";
  //   }
  //   if (!$scope.enoughMoney(deed.price, player.money)) {
  //     return "Not Enough Money";
  //   }
  //   player.money -= deed.price;
  //   deed.owned = player.id;
  //   var deed_number = deeds.indexOf(deed);
  //   var new_monopoly = $scope.checkForMonopoly(deed_number);
  //   var return_string= "Congratulations! You now own " + deed.name + ".";
  //   if (new_monopoly) {
  //     return_string += " You have a new Monopoly!";
  //   }
  //   return return_string;
  // } //end buyDeed()

  // $scope.enoughMoney = function(price, player_money) {
  //     if (player_money >= price) {
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  // } //end enoughMoney()

  // $scope.checkForMonopoly = function(deed_number) {
  //   var deed_groups = [[], [1, 3], [5, 15, 25, 35], [6, 8, 9], [11, 13, 14], [12, 28], [16, 18, 19],
  //                     [21, 23, 24], [26, 27, 29], [31, 32, 34], [37, 39]];
  //   var deed_group = deed_groups[deeds[deed_number].group_id];
  //
  //   if (deed_group.length == 2) {
  //     if ((deeds[deed_group[0]].owned == deeds[deed_group[1]].owned)
  //         && (deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
  //       if (deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
  //         deeds[deed_group[0]].monopoly = true;
  //         deeds[deed_group[1]].monopoly = true;
  //         return true;
  //       }
  //     }
  //   }
  //   else if (deed_group.length == 3) {
  //     if ((deeds[deed_group[0]].owned == deeds[deed_group[1]].owned)
  //         && (deeds[deed_group[0]].owned == deeds[deed_group[2]].owned)
  //         && (deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
  //       if (deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
  //         deeds[deed_group[0]].monopoly = true;
  //         deeds[deed_group[1]].monopoly = true;
  //         deeds[deed_group[2]].monopoly = true;
  //         return true;
  //       }
  //     }
  //   }
  //   else { //deed_group.length == 4
  //     if ((deeds[deed_group[0]].owned == deeds[deed_group[1]].owned)
  //         && (deeds[deed_group[0]].owned == deeds[deed_group[2]].owned)
  //         && (deeds[deed_group[0]].owned == deeds[deed_group[3]].owned)
  //         && (deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
  //       if (deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
  //         deeds[deed_group[0]].monopoly = true;
  //         deeds[deed_group[1]].monopoly = true;
  //         deeds[deed_group[2]].monopoly = true;
  //         deeds[deed_group[3]].monopoly = true;
  //         return true;
  //       }
  //     }
  //   }
  //   return false; //there is no new monopoly
  // } //end checkForMonopoly()

  // $scope.move = function(player, total) {
  //   player.position += total;
  //   if (player.position > 39) { //player passed or landed on go
  //     player.position -= 40;
  //     player.money += 200;
  //   }
  //   // $(".player" + player.id).appendTo(".square" + player.position);
  // } //end move()

//   $scope.turn = function(player, total) { //if total is not passed in, then the player hasn't rolled yet and we will roll here
//     var roll ={};
//     roll.total = total || 0;
//     if (roll.total == 0) {
//       roll = $scope.roll();
//     }
//     else {
//       $roll = {doubles: false};
//     }
//     if ((roll.doubles == true) && (player.num_of_doubles >= 3)) {
//       $scope.gotoJail(player);
//       return;
//     }
//     $scope.move(player, roll.total);
// roll.doubles = true;
//     while ((roll.doubles) && (player.num_of_doubles < 3)) {
//       player.num_of_doubles++;
//       roll = $scope.roll();
// roll.doubles = true;
//       if ((roll.doubles == true) && (player.num_of_doubles >= 3)) {
//         $scope.gotoJail(player);
//         return;
//       }
//       $scope.move(player, roll.total);
//     }
//     player.num_of_doubles = 0;
//   } //end turn()

  // $scope.gotoJail = function(player) {
  //   player.position = 10;
  //   player.num_of_doubles = 0;
  //   player.inMarket = true;
  // } //end gotoJail()











  var player = { id: 1,
                   name: "car",
                  //  piece: {pieceName: factory.gamePieces[i].pieceName,
                  //          id: i + 1,
                  //          taken: false},
                   money: 1500,
                   inMarket: false,
                   freedomRolls: 0,
                   position: 38,
                   getOutFree: [],
                   houses: 0,
                   num_of_doubles: 0,
                   hotels: 0
                };

  var turn = $scope.turn(player);




});



//#ecfcf4 - hex color of board
