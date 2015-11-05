/// <reference path="../lib/Classes.js" />
/// <reference path="../lib/Data.js" />

portlandiaMonopoly.controller('PlayerTurnCtrl', function PlayerTurnCtrl($scope, $stateParams) {
    // toggles purchase/pass on property display, not really used now
    $scope.result = "roll";
    //var factory = Data.Factory_Games;
    var player1 = Data.players[0];
    var player2 = Data.players[1];
    var player3 = Data.players[2];
    var player4 = Data.players[3];
    var player5 = Data.players[4];
    var community_chest_cards = Data.community_chest_data;
    var chanceCards = Data.chance_data;
    var deeds = Data.deeds;
    var transactions = new Transactions();
    var chance = new Chance();
    var index = 0;

    var card_type = null;
    $scope.deeds = Data.deeds;
    // flag toggle to display game messages, resets to false in endTurn()
    $scope.buyChoice = false;

    $scope.askToBuy = false;
    $scope.showMessage = false;
    $scope.message = [];
    $scope.chanceCard = false;
    $scope.community_chestCard = false;
    $scope.cardToRead = null;
    $scope.players = Data.players;
    $scope.currentPlayer = player1;
    $scope.checkPlayer = function () {
        $scope.samePlayer = ($scope.currentPlayer.num_of_doubles > 0) ? true : false;
        $scope.isInMarket = $scope.currentPlayer.inMarket;
    }

    // SETUP TURN
    //$scope.isInMarket = Data.Factory_Games.inMarket($scope.currentPlayer);
    $scope.isInMarket = $scope.currentPlayer.inMarket;
    $scope.rolled = false;
    $scope.submit = false;
    $scope.drawAction = false;

    //****************ROLL FUNCTION****************//
    $scope.roll = function () {
        var chance = new Chance(); // loaded in index.html
        var die1 = chance.integer({ min: 1, max: 6 });
        var die2 = chance.integer({ min: 1, max: 6 });
        var total = die1 + die2;
        // FOR TESTING
        //total = 4;
        $scope.option_clicked = false; // variable to display 'move' button
        return { total: total, die1: die1, die2: die2, doubles: die1 === die2 };
    } //end roll()

    //****************MOVE FUNCTION****************//
    var move = function (player, total) {
        player.position += total;
        if (player.position > 39) { //player passed or landed on go
            player.position -= 40;
            if (player.position === 0) {
            }
            player.money += 200;
            alert("Congrats, " + player.piece.pieceName + ", your startup is paying off again. Collect $200!");
        }
        $(".player" + player.id).appendTo(".square" + player.position);
    } //end move()

    //********************** turn *******************************//
    // if total is passed in, that means the player rolled from jail and doubles are voided
    //if total is not passed in, then the player hasn't rolled yet and we will roll here
    $scope.turn = function (player, total) {
        $scope.rollResult = {};
        //roll = $scope.roll();
        total = total || 0;
        if (total == 0) {
            $scope.rollResult = $scope.roll();
        }
        else {
            $scope.rollResult = { total: total, doubles: false };
        }
        if ($scope.rollResult.doubles) {
            $scope.samePlayer = true;
            player.num_of_doubles++;
            if (player.num_of_doubles >= 3) {
                player.num_of_doubles = 0;
                $scope.samePlayer = false;
                $scope.gotoJail(player);
                $scope.show_end_turn_button = true;
                return;
            }
        }
        else {
            player.num_of_doubles = 0;
            $scope.samePlayer = false;
        }
        return;
    }
    $scope.choiceMade = function () {
        if ($scope.buyChoice === "true") {
            return true;
        } else { return false; }
    }
    //function to see if player wants to buy a property
    $scope.getPlayerChoice = function () {
        var playerWantsToBuy = $scope.choiceMade();
        if (playerWantsToBuy) {
            buyDeed($scope.currentPlayer, deeds[$scope.currentPlayer.position]);
        } else {
            $scope.message.text = "Ok, maybe next time.";
            $scope.message.subText = "But remember, you gotta spend money to make money!";
            $scope.showMessage = true;
        }
        $scope.show_end_turn_button = true;
    }

    //****************PLAYEROPTION FUNCTION****************//
    $scope.playerOption = function (player, roll) {
        move(player, roll.total);
        var deed = deeds[player.position];
        if (deed.group_id == 0) { // player is not able to buy this deed
            if (player.position == 0) { //Go
                $scope.message.text = "You landed on Startup!";
                $scope.message.subText = "Your investors gave you $200!";
                $scope.showMessage = true;
                player.money += 200;
                $scope.show_end_turn_button = true;
                //alert('You landed on Startup! Your investors gave you $200!');
            }
                //Community Chest
            else if ((player.position === 2) || (player.position === 17) || (player.position === 33)) {
                card_type = "community chest";
                $scope.community_chestCard = true;
                $scope.chanceCard = false;
                $scope.draw = true;
            }
                //Portland Art Tax
            else if (player.position === 4) {
                $scope.message.text = "Pay the Portland Art Tax";
                $scope.message.subText = "Spend $200 and help kids learn art";
                $scope.showMessage = true;
                //alert("Pay Portland Art Tax, Lose 200 Dollars");
                player.money -= 200;
                $scope.show_end_turn_button = true;
            }
                //Chance
            else if (player.position === 7 || player.position === 22 || player.position === 36) {
                card_type = "chance";
                $scope.chanceCard = true;
                $scope.community_chestCard = false;
                $scope.draw = true;
            }
            else if (player.position == 10) {
                $scope.message.text = "You've decided to brave Saturday Market!";
                $scope.message.subText = "Make sure to tip the buskers.";
                $scope.showMessage = true;
                $scope.show_end_turn_button = true;
                //alert("You've decided to brave Saturday Market!\nMake sure to tip the buskers.");
                //Portland Saturday Market
            }
            else if (player.position == 20) { //Rose Garden
                $scope.message.text = "Take a walk up to Washington Park.";
                $scope.message.subText = "Check out Portland's Rose Test Garden!";
                $scope.showMessage = true;
                $scope.show_end_turn_button = true;
                //alert("Take a walk up to Washington Park to visit\nPortland's Rose Test Garden!");
            }
            else if (player.position == 30) {
                $scope.message.text = "Go to Saturday Market!";
                $scope.message.subText = "I guess you don't own enough tie-dye cargo shorts. Stay there until you get some.";
                $scope.showMessage = true;
                //alert("I guess you don't own enough tie-dye cargo shorts. Go to Saturday Market\n and don't come out until you get some!"); //Goto Jail
                player.position = 10;
                player.inMarket = true;
                player.num_of_doubles = 0;
                $(".player" + player.id).appendTo(".square" + player.position);
                $scope.show_end_turn_button = true;
            }
            else if (player.position == 38) { //VooDoo Donuts
                $scope.message.text = "Pay for VooDoo Donuts";
                $scope.message.subText = "Lose 175 Dollars";
                $scope.showMessage = true;
                //alert("Pay for Voodoo Donuts, Lose 175 Dollars");
                player.money -= 175;
                $scope.show_end_turn_button = true;
            }
            else {
                alert("This should never print");
                $scope.show_end_turn_button = true;
            }
        }
            //deed is not owned, ask player to buy
        else if (deed.owned == 0) {
            var canBuy = transactions.checkFunds(player, deed);
            if (canBuy) {
                $scope.askToBuy = true;
                //getPlayerChoice();
                //$scope.show_end_turn_button = true;

                //var playerWantsToBuy = $scope.choiceMade();
                //if (playerWantsToBuy) {
                //    buyDeed(player, deed);
                //} else {
                //    $scope.message.text = "Ok, maybe next time.";
                //    $scope.message.subText = "But remember, you gotta spend money to make money!";
                //    $scope.showMessage = true;
                //}
            } else {
                $scope.message.text = "Sorry, you don't have enough money to buy this property.";
                $scope.message.subText = "Maybe your startup will make a ton of money soon.";
                $scope.showMessage = true;
                $scope.show_end_turn_button = true;
            }
            // player option to buy or not to buy
            // don't want to use alerts anymore
            //if (confirm("Do you want to buy " + deed.name + " for $" + deed.price + "?")) {
            //    buyDeed(deed);
            //}
            //$scope.show_end_turn_button = true;
        }
        else if (deed.owned != player.id) {
            $scope.message.text = "This property is owned!";
            $scope.message.subText = "Lucky for you, the bank is closed. You don't have to pay!";
            $scope.showMessage = true;
            $scope.show_end_turn_button = true;
            //payPlayer(player, deed.owned, deed.);
        }
        else {
            $scope.message.text = "You own this property.";
            $scope.message.subText = "Nice Work!!";
            $scope.showMessage = true;
            $scope.show_end_turn_button = true;
            //alert('Nice work! You own this property!');
        }
        //$scope.show_end_turn_button = true;
        $scope.drawAction = false;
    } //end playerOption()
    $scope.getCard = function () {
        drawCard(card_type);
    }

    //****************GETCARD FUNCTION****************//
    var drawCard = function (kind) {
        var card;
        //var card_number = 4;
        card_number = chance.integer({ min: 0, max: 16 }); //comment out for text
        if (kind == "community chest") {
            card = community_chest_cards[card_number];
            $scope.cardToRead = card;
            actionCard($scope.currentPlayer, card);
            $scope.show_end_turn_button = true;
            //return;
        }
        else if (kind == "chance") {
            card = chanceCards[card_number];
            $scope.cardToRead = card;
            actionCard($scope.currentPlayer, card);
            $scope.show_end_turn_button = true;
            //return;
        }
        else {
            alert("This should not print");
        }
    } //end drawCard

    // action from community chest and chance cards function
    var actionCard = function (player, card) {
        if (card.text === "GET OUT OF PORTLAND SATURDAY MARKET, FREE") {
            player.getOutFree.push(card.group); // player might get more than 1
        } else if (card.kind === 'card') {
            // player must pay each player $, or player receives $ from other players
            for (var i = 0; i < Data.players; i++) {
                if (player.id !== Data.players[i].id) {
                    Data.players[i].money += card.value[0];
                    player.money += card.value[0];
                }
            }
        } else if (card.kind === 'money') {
            // alert(player.inMarket + ", player gets paid in actionCard()");
            player.money += card.value[0];
        } else if (card.kind === 'assess') {
            // for testing
            player.houses = 0;
            player.hotels = 0;
            player.money -= ((player.houses * card.value[0]) + (player.hotels * card.value[1]));
        } else {// it's a move card
            // a variable with attribute .total must be passed to playerOption function to substitute for a roll
            if (card.value[0] < 0) {
                $scope.playerOption(player, { total: card.value[0] }); // go back 3 spaces card
            } else {
                if (card.value[0] === 10) {// go to market
                    // amount to move is 10 - current position
                    gotoJail(player, true);
                    //alert(player.inMarket + ", FOR TEST player in Market in actionCard()");
                } else if (card.value[0] == 0) { // advance to go
                    move(player, 40 - player.position);
                } else { // random other places, might have multiple values
                    var shift = []; // to continue player movement and play after drawing a card,

                    for (var i = 0; i < card.value.length; i++) {
                        if (player.position < card.value[i]) {
                            shift.total = card.value[i] - player.position;
                            break;
                        } else if (player.position > card.value[i] && i === card.value.length - 1) {
                            shift.total = (card.value[i] - player.position) + 40;
                        }
                    }
                    $scope.playerOption(player, shift);
                }
            }
        }
    };

    //****************BUYDEED FUNCTION****************//
    var buyDeed = function (player, deed) {
        // this condition should already have been met
        if (deed.owned > 0) {
            alert("Deed Already Owned");
            return;
        }
            // this condition should have also already been checked for
        else if (player.money < deed.price) {
            alert("Not Enough Money");
            return;
        } else {
            //player.money -= deed.price;
            deed.owned = player.id;
            var purchaseComplete = transactions.buyProperty(player, deed);
            if (purchaseComplete) {
                $scope.message.text = "Congratulations! You now own " + deed.name;
                $scope.message.subText = "You spent $" + deed.price;
                //$scope.showMessage = true;
                if (checkForMonopoly(deeds.indexOf(deed))) {
                    $scope.message.text += ". You have a Portlandia Monopoly!";
                    $scope.showMessage = true;
                } else { $scope.showMessage = true; }
            }
            //alert("Congratulations! You now own " + deed.name + ".\nYou spent $" + deed.price);
            //if (checkForMonopoly(deeds.indexOf(deed))) {
            //    alert("Congratulations! You now own " + deed.name + ".\nYou spent $" + deed.price + "\nYou have a new Monopoly!");
            //}

            if (player.position < 10) {
                $(".square" + player.position + " .bottom-cost").css("background-color", player.piece.pieceName);
            } else if ((player.position < 20) && (player.position > 10)) {
                $(".square" + player.position + " .left-cost").css("background-color", player.piece.pieceName);
            } else if ((player.position < 30) && (player.position > 20)) {
                $(".square" + player.position + " .top-cost").css("background-color", player.piece.pieceName);
            } else if ((player.position < 40) && (player.position > 20)) {
                $(".square" + player.position + " .right-cost").css("background-color", player.piece.pieceName);
            }
        }
    } //end buyDeed()

    //****************ENOUGHMONEY FUNCTION****************//
    /*
    $scope.enoughMoney = function (price, player_money) {
        if (player_money >= price) {
            return true;
        }
        else {
            return false;
        }
    }
    */

    //****************CHECKFORMONOPOLY FUNCTION****************//
    var checkForMonopoly = function (deed_number) {
        var deed_groups = [[], [1, 3], [5, 15, 25, 35], [6, 8, 9], [11, 13, 14], [12, 28], [16, 18, 19],
                           [21, 23, 24], [26, 27, 29], [31, 32, 34], [37, 39]];
        var deed_group = deed_groups[deeds[deed_number].group_id];

        if (deed_group.length == 2) {
            if (deeds[deed_group[0]].owned == deeds[deed_group[1]].owned && deeds[deed_group[0]].owned > 0) { //if true we have a monopoly
                if (deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
                    deeds[deed_group[0]].monopoly = true;
                    deeds[deed_group[1]].monopoly = true;
                    return true;
                }
            }
        }
        else if (deed_group.length == 3) {
            if (deeds[deed_group[0]].owned == deeds[deed_group[1]].owned
                && deeds[deed_group[0]].owned == deeds[deed_group[2]].owned
                && deeds[deed_group[0]].owned > 0) { //if true we have a monopoly
                if (deeds[deed_group[0]].monopoly == false) { //we found a new monopoly
                    deeds[deed_group[0]].monopoly = true;
                    deeds[deed_group[1]].monopoly = true;
                    deeds[deed_group[2]].monopoly = true;
                    return true;
                }
            }
        }
        else { //deed_group.length == 4
            if (deeds[deed_group[0]].owned == deeds[deed_group[1]].owned
                && deeds[deed_group[0]].owned == deeds[deed_group[2]].owned
                && deeds[deed_group[0]].owned == deeds[deed_group[3]].owned
                && deeds[deed_group[0]].owned > 0) { //if true we have a monopoly
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
    } //end checkForMonopoly()

    //****************GOTOJAIL FUNCTION****************//
    var gotoJail = function (player, card) {
        player.position = 10;
        player.num_of_doubles = 0;
        player.inMarket = true;
        if ((card | 0) === 0) {
            $scope.message.text = "Go to Saturday Market!!!";
            $scope.message.subText = "Sorry, your luck just ran out. You're stuck perusing Portland's finest selection of tye-dye shirts.";
            $scope.showMessage = true;
            //alert('Sorry, ' + player.piece.pieceName + ', but your luck just ran out!\nThat was your third roll of doubles in a row! Now you\n must spend your time browsing junk at Saturday Market!');
        }
        $(".player" + player.id).appendTo(".square" + player.position);
    } //end gotoJail()

    //****************MARKETACTION FUNCTION****************//
    // for player options when in jail (market)
    $scope.marketAction = function () {
        //var freeCards = Data.Factory_Games.hasGetOut($scope.currentPlayer);
        var freeCards = $scope.currentPlayer.getOutFree
        if (freeCards.length > 0) {
            $scope.has_card = true;
            $scope.getOutFreeCards = freeCards;
        } else {
            $scope.has_card = false;
        }

        Data.Factory_Games.playerStatsAlert($scope.currentPlayer);
        // if player chooses to use a get out free card
        if ($scope.market_choice === "card") {
            var index = $scope.getOutFreeCards.indexOf($scope.cardSelected);
            $scope.choose_card = false;
            $scope.currentPlayer.getOutFree.splice(index, 1);
            $scope.currentPlayer.inMarket = false;
            $scope.isInMarket = false;
            $scope.rolled = false;
            $scope.submit = false;
            $scope.samePlayer = false;
            Data.Factory_Games.playerStatsAlert($scope.currentPlayer);
            // pay option, first case player doesn't have enough money,
            // provide option to mortgage/sell
        } else if ($scope.market_choice === "pay") {
            if ($scope.currentPlayer.money < 50) {
                var performMortgageOption = function () { };// needs a function
                //player does have enough, pay the fine
            } else {
                // if player decides to pay first, subtract money and start their turn
                adjustMoney($scope.currentPlayer, -50);
                $scope.isInMarket = false;
                $scope.currentPlayer.inMarket = false;
                $scope.submit = false;
                $scope.samePlayer = false;
                Data.Factory_Games.playerStatsAlert($scope.currentPlayer);
            }
        } else if ($scope.market_choice === "roll") {
            var marketRoll = $scope.roll();
            if (marketRoll.doubles) {
                $scope.message.text = "You rolled doubles!";
                $scope.message.subText = "You can leave Saturday Market.";
                $scope.showMessage = true;
                //alert("You rolled doubles! You can leave Saturday Market!");
                $scope.rollAgain = false; // doubles are void when getting out of Market
                $scope.isInMarket = false;
                $scope.currentPlayer.inMarket = false;
                $scope.rolled = true;
                $scope.samePlayer = false;
                $scope.turn($scope.currentPlayer, marketRoll.total);
                Data.Factory_Games.playerStatsAlert($scope.currentPlayer);
            } else if ($scope.currentPlayer.freedomRolls === 2) {
                $scope.message.text = "You did not roll doubles!";
                $scope.message.subText = "You must pay the $50 fine.";
                $scope.showMessage = true;
                //alert("You did not roll doubles! You must pay the $50 fine!");
                adjustMoney($scope.currentPlayer, -50);
                $scope.currentPlayer.freedomRolls = 0;
                $scope.isInMarket = false;
                $scope.currentPlayer.inMarket = false;
                $scope.samePlayer = false;
                $scope.turn($scope.currentPlayer, marketRoll.total);
                Data.Factory_Games.playerStatsAlert($scope.currentPlayer);
            } else {
                $scope.message.text = "You did not roll doubles!";
                $scope.message.subText = "Walk around Saturday Markey for another turn.";
                $scope.showMessage = true;
                //alert("You did not roll doubles! Walk around Saturday Market for another turn. Maybe you'll find that tie-dye nighty you've always wanted!");
                $scope.currentPlayer.freedomRolls++;
                Data.Factory_Games.playerStatsAlert($scope.currentPlayer);
                $scope.samePlayer = false;
                $scope.show_end_turn_button = true;
            }// end else not doubles
        }// end roll choice
        //$scope.market_choice = null;
    } // end marketActions()

    //****************SHOWCARDS FUNCTION****************//
    // toggles the drop-down of available get out of market cards to use when in market
    $scope.showCards = function () {
        // if drop down is displayed, and another option is selected, hide it
        $scope.choose_card = $scope.market_choice === "card"
    } //end showCards()

    $scope.endTurn = function () {
        $scope.buyChoice = "";
        $scope.askToBuy = false;
        $scope.draw = false;
        $scope.rolled = false;      // resets roll button
        $scope.submit = false;      // resets show roll button display
        $scope.samePlayer = false;  // resets if same player (doubles related)
        $scope.option_clicked = false;
        $scope.showMessage = false;
        $scope.message.text = "";
        $scope.message.subText = "";
        $scope.drawAction = false;  // draw card and display result reset
        var prevPlayerId = $scope.currentPlayer.id;
        //reset
        if ($scope.currentPlayer.num_of_doubles === 0) {
            // do nothing, same player will roll
            index++;
            if (index === Data.players.length)
                index = 0;
            if (index === 0)
                $scope.currentPlayer = player1;
            else if (index === 1)
                $scope.currentPlayer = player2;
            else if (index === 2)
                $scope.currentPlayer = player3;
            else if (index === 3)
                $scope.currentPlayer = player4;
            else
                $scope.currentPlayer = player5;
        }
        $("#p" + prevPlayerId).css("margin-top", "0px");
        $("#p" + $scope.currentPlayer.id).css("margin-top", "5px");
    };// end endTurn()
});