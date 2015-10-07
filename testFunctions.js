//made by Kenny

function roll() {
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


function buyDeed(deed, player) {
  if (deed.owned > 0) {
    return "Company Already Owned";
  }
  if (!enoughMoney(deed.price, player.money)) {
    return "Not Enough Money";
  }
  player.money -= deed.price;
  deed.owned = player.id;
  var new_monopoly = checkForMonopoly(player.position);
  var return_string= "Congratulations! You now own " + deed.name + ".";
  if (new_monopoly) {
    return_string += " You have a new Monopoly!";
  }
  return return_string;
}

function checkForMonopoly(deed_number) {
  var deed_groups = [[], [1, 3], [5, 15, 25, 35], [6, 8, 9], [11, 13, 14], [12, 28], [16, 18, 19],
                    [21, 23, 24], [26, 27, 29], [31, 32, 34], [37, 39]];

  var deed_group = deed_groups[factory.deeds[deed_number].group_id];
  if (deed_group.length == 2) {
    if ((factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[1]].owned)
        && (factory.deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
      if (factory.deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
        factory.deeds[deed_group[0]].monopoly = true;
        factory.deeds[deed_group[1]].monopoly = true;
        return true;
      }
    }
  }
  else if (deed_group.length == 3) {
    if ((factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[1]].owned)
        && (factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[2]].owned)
        && (factory.deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
      if (factory.deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
        factory.deeds[deed_group[0]].monopoly = true;
        factory.deeds[deed_group[1]].monopoly = true;
        factory.deeds[deed_group[2]].monopoly = true;
        return true;
      }
    }
  }
  else { //deed_group.length == 4
    if ((factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[1]].owned)
        && (factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[2]].owned)
        && (factory.deeds[deed_group[0]].owned == factory.deeds[deed_group[3]].owned)
        && (factory.deeds[deed_group[0]].owned > 0)) { //if true we have a monopoly
      if (factory.deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
        factory.deeds[deed_group[0]].monopoly = true;
        factory.deeds[deed_group[1]].monopoly = true;
        factory.deeds[deed_group[2]].monopoly = true;
        factory.deeds[deed_group[3]].monopoly = true;
        return true;
      }
    }
  }
  return false; //there is no new monopoly
}

function enoughMoney (price, player_money) {
    if (player_money >= price) {
      return true;
    }
    else {
      return false;
    }
}

function mortgageDeed(deed, player) {
  
}



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
