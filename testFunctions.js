//made by Kenny



// portlandiaMonopoly.factory('TestFactory', function() {
//
// var factory = {};
//
//
//
//

//


//
// factory.mortgageDeed = function(deed, player) {
//   if (deed.mortgaged == true) {
//     return "Deed Already Mortgaged";
//   }
//   deed.mortgaged = true;
//   player.money += deed.mortgage_value;
//   return "Deed Mortgaged";
// }
//
// factory.unMortgageDeed = function(deed, player) {
//   if (deed.mortgaged == false) {
//     return "Deed is not mortgaged";
//   }
//   var mortgage_repayment_price = deed.mortgage_value * 1.1; //Unmortgaging deeds cost 10% more than the amount it was mortgaged for
//   if (enoughMoney(mortgage_repayment_price, player.money)) {
//     deed.mortgaged = false;
//     player.money -= mortgage_repayment_price;
//     return "Deed is unmortgaged";
//   }
//   else {
//     return "Not Enough Money";
//   }
// }
//
//
//
// return factory;
// });



//group_id:
//    0 = Deeds that don't have monopolies
//    1 = Dark Purple: deeds 1, 3
//    2 = Trains: deeds 5, 15, 25, 35
//    3 = Light Blue: deeds 6, 8, 9
//    4 = Purple: deeds 11, 13, 14
//    5 = Sports Teams: deeds 12, 28
//    6 = Orange: deeds 16, 18, 19
//    7 = Red: deeds 21, 23, 24
//    8 = Yellow: deeds 26, 27, 29
//    9 = Green: deeds 31, 32, 34
//    10 = Blue: deeds 37, 39


// //Baltic Avenue
// factory.deeds[3] = {name: "ALTSOURCE",
//                   price: 60,
//                   mortgage_value: 30,
//                   house_cost: 50,
//                   rent: [4, 20, 60, 180, 320, 450],
//                   group_id: 1,
//                   owned: 0,
//                   monopoly: false,
//                   multiplier: 0,
//                   type: "company"
//                 };
