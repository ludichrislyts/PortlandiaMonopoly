/// <reference path="C:\Users\ludichrislyts\Desktop\Aaron\PortlandiaMonopoly\PortlandiaMonopoly\partials/playerTurn.html" />
/// <reference path="C:\Users\ludichrislyts\Desktop\Aaron\PortlandiaMonopoly\PortlandiaMonopoly\partials/playerTurn.html" />
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
    var community_chest_cards = Data.community_chest_data;
    var chanceCards = Data.chance_data;
    var deeds = Data.deeds;
    var transactions = new Transactions();
    var chance = new Chance();
    var index = 0;
    var card_type = null;
    var board = [];
    board.currentPos = 0;   
    //$("#background").toggleClass('background');// need a better background for this
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
    // silly logic to set player tab colors. mouseenter or keydown in each of the three partials triggers
    // $scope.setColors checks for existence of colorCount. If false, set colors and call setColorToTrue(),
    // which gives colorCount a value for next time. Hopefully then setColors() wont run every time the user breathes.
    var colorCount = [];
    $scope.setColors = function () {
        if (!colorCount.length) {
            setColors();
            setColorToTrue(colorCount);
        }
    }
    var setColorToTrue = function (arr) {
        arr.push(1);
    }
    var setColors = function () {
        if (player1) {
            $("#p" + player1.id).css("background-color", player1.piece.rgb);
            $("#p" + player1.id + " p.money").css("background-color", player1.piece.rgbDark);
        }
        if (player2) {
            $("#p" + player2.id).css("background-color", player2.piece.rgb);
            $("#p" + player2.id + " p.money").css("background-color", player2.piece.rgbDark);
        }
        if (player3) {
            $("#p" + player3.id).css("background-color", player3.piece.rgb);
            $("#p" + player3.id + " p.money").css("background-color", player3.piece.rgbDark);
        }
        if (player4) {
            $("#p" + player4.id).css("background-color", player4.piece.rgb);
            $("#p" + player4.id + " p.money").css("background-color", player4.piece.rgbDark);
        }
        $("#p" + $scope.currentPlayer.id).css("height", "12.5em");
    }
    var rotateNeg90 = function (pos) {
        $(".column-container").css("transform", "rotateX(40deg) rotate(-90deg)");
        $(".column-container").css("box-shadow", "-10px 10px 14px 8px rgba(0,0,0,0.7)");
        for (var i = 0; i < Data.players.length; i++) {
            $(".player" + Data.players[i].id).css({ "transform": "rotateZ(90deg)", "transition": "all 1s linear" });
        }
        pos.currentPos = 1;
    }
    var rotate180 = function (pos) {
        $(".column-container").css("transform", "rotateX(40deg) rotate(-180deg)");
        $(".column-container").css("box-shadow", "-10px -10px 14px 8px rgba(0,0,0,0.7)");
        for (var i = 0; i < Data.players.length; i++) {
            $(".player" + Data.players[i].id).css({ "transform": "rotateZ(180deg)", "transition": "all 1s linear" });
        }
        pos.currentPos = 2;
    }
    var rotateNeg270 = function (pos) {
        $(".column-container").css("transform", "rotateX(40deg) rotate(-270deg)");
        $(".column-container").css("box-shadow", "10px -10px 14px 8px rgba(0,0,0,0.7)");
        for (var i = 0; i < Data.players.length; i++) {
            $(".player" + Data.players[i].id).css({ "transform": "rotateZ(-90deg)", "transition": "all 1s linear" });
        }
        pos.currentPos = 3;
    }
    var rotateZero = function (pos) {
        $(".column-container").css("transform", "matrix3d(1,0,0,0,0,.766044,.642788,0,0,-.642788,.766044,0,0,0,0,1)");
        $(".column-container").css("box-shadow", "10px 10px 14px 8px rgba(0,0,0,0.7)");
        for (var i = 0; i < Data.players.length; i++) {
            $(".player" + Data.players[i].id).css({ "transform": "rotateZ(0deg)", "transition": "all 1s linear" });
        }
        pos.currentPos = 0;
    }
    var rotateToPlayer = function (pos, dif) {
        if (pos >= 0 && pos <= 10) {
            if (dif > 10 && pos < 2) {
                rotateNeg270(board);
                setTimeout(function () {
                    rotateZero(board);
                }, 1000);
            } else {
                rotateZero(board);
            }
        } else if (pos >= 10 && pos <= 20) {
            if (dif > 10 && pos < 12) {
                rotateZero(board);
                setTimeout(function () {
                    rotateNeg90(board);
                }, 1000);
            } else {
                rotateNeg90(board)
            }
        } else if (pos >= 20 && pos <= 30) {
            if (dif > 10 && pos < 22) {
                rotateNeg90(board);
                setTimeout(function () {
                    rotate180(board);
                }, 1000);
            } else {
                rotate180(board);
            }
        } else {
            if (dif > 10 && pos < 32) {
                rotate180(board);
                setTimeout(function () {
                    rotateNeg270(board);
                }, 1000);
            } else {
                rotateNeg270(board);
            }
        }
    }
    advanceView = function (pos) {
        if (pos.currentPos === 0) { // matrix3d(1, 0, .... IE, Chrome, Firefox board is at 0 deg rotation
            rotateNeg90(pos);
        } else if (pos.currentPos === 1) {
            rotate180(pos);
        } else if (pos.currentPos === 2) {
            rotateNeg270(pos);
        } else {
            rotateZero(pos);
        }
    }
    reverseView = function (pos) {
        if (pos.currentPos === 0) { // matrix3d(1, 0, .... IE, Chrome, Firefox board is at 0 deg rotation
            rotateNeg270(pos);
        } else if (pos.currentPos === 1) {
            rotateZero(pos);
        } else if (pos.currentPos === 2) {
            rotateNeg90(pos);
        } else {
            rotate180(pos);
        }
    }
    $scope.advanceView = function () {
        advanceView(board);
    }
    $scope.reverseView = function () {
        reverseView(board);
    }

    // SETUP TURN
    //$scope.isInMarket = Data.Factory_Games.inMarket($scope.currentPlayer);
    $scope.isInMarket = $scope.currentPlayer.inMarket;
    $scope.rolled = false;
    $scope.submit = false;
    $scope.drawAction = false;
    $scope.goCard = false;

    //****************ROLL FUNCTION****************//
    $scope.roll = function () {
        var chance = new Chance(); // loaded in index.html
        var die1 = chance.integer({ min: 1, max: 6 });
        var die2 = chance.integer({ min: 1, max: 6 });
        var total = die1 + die2;
        // FOR TESTING
        //total = 7;
        $scope.option_clicked = false; // variable to display 'move' button
        return { total: total, die1: die1, die2: die2, doubles: die1 === die2 };
    } //end roll()

    //****************MOVE FUNCTION****************//
    var move = function (player, total) {
        var rotateBoard = true;
        var oldSide = Math.floor(player.position / 10);
        player.position += total;
        var newSide = Math.floor(player.position / 10);
        var passedCorner = player.position % 10;// if only just to corner spot, don't rotate
        if (newSide <= oldSide || (newSide > oldSide && !passedCorner)) {
            rotateBoard = false;
        }
        if (player.position > 39) { //player passed or landed on go
            rotateBoard = true; //failsafe for landing or passing zero, since dividing by 10 strategy won't work
            player.position -= 40;
            $scope.message.text = "Your startup is doing great!";
            $scope.message.subText = "Your investors gave you $200!";
            $scope.message.originalAmount = player.money;
            $scope.message.change = 200;
            transactions.exchangeMoney(player, 200, 1);
            $scope.message.newTotal = player.money;
            $scope.showMessage = true;
            $(".messageDirective h5.moneyTotals").css("visibility", "visible");
            $("#change").css("color", "green");
        }
        $("." + player.pieceObject.boardId).appendTo(".square" + player.position);
        $("." + player.pieceObject.boardId).css("position", "absolute");
        $(".square" + player.position).css("outline-color", player.piece.rgb);
        $(".square" + player.position).toggleClass("showPosition");
        if (rotateBoard) {
            rotateToPlayer(player.position, total);
        } else {
            rotateBoard = true;
        }
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
                gotoJail(player);
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
    //consider making this a non-scoped function, scoped function would just be a shell
    //****************PLAYEROPTION FUNCTION****************//
    $scope.playerOption = function (player, roll) {
        move(player, roll.total);
        var deed = deeds[player.position];
        if (deed.group_id == 0) { // player is not able to buy this deed
            if (player.position == 0) { //Go
                $scope.message.text = "You managed to drop in the office";
                $scope.message.subText = "Your loyal employees love you so much they gave you $200!";
                transactions.exchangeMoney(player, 200, 1);
                $scope.showMessage = true;
                $scope.show_end_turn_button = true;
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
                $scope.message.originalAmount = player.money;
                transactions.exchangeMoney(player, deed.price, 1);
                $scope.message.newTotal = player.money;
                $scope.message.change = "-$" + deed.price;
                $("#change").css("color", "C20319");
                $(".messageDirective h5.moneyTotals").css("visibility", "visible");
                $scope.showMessage = true;
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
            }
            else if (player.position == 20) { //Rose Garden
                $scope.message.text = "Take a walk up to Washington Park.";
                $scope.message.subText = "Check out Portland's Rose Test Garden!";
                $scope.showMessage = true;
                $scope.show_end_turn_button = true;
            }
            else if (player.position == 30) {
                $scope.message.text = "Go to Saturday Market!";
                $scope.message.subText = "I guess you don't own enough tie-dye cargo shorts. Stay there until you get some.";
                $scope.showMessage = true;
                gotoJail(player, 1); // passing in 1 should preserve this message text vs the default go to jail message
                player.inMarket = true;
                player.num_of_doubles = 0;
                //$(".player" + player.id).appendTo(".square" + player.position);
                $scope.show_end_turn_button = true;
            }
            else if (player.position == 38) { //VooDoo Donuts
                $scope.message.text = "Pay for VooDoo Donuts";
                $scope.message.subText = "Lose 175 Dollars";
                $scope.message.originalAmount = player.money;
                transactions.exchangeMoney(player, deed.price, 1);
                $scope.message.newTotal = player.money;
                $scope.message.change = "-$" + deed.price;
                $("#change").css("color", "C20319");
                $(".messageDirective h5.moneyTotals").css("visibility", "visible");
                $scope.showMessage = true;
                $scope.show_end_turn_button = true;
            }
            else {
                alert("This should never print");
                $scope.show_end_turn_button = true;
            }
        }
            //deed is not owned, ask player to buy
        else if (deed.owned == 0) {
            var canBuy = transactions.checkFunds(player, deed.price);
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
            $scope.message.subText = "Your opponent has made a wise investment. Pay up!";
            $scope.showMessage = true;
            var rentToPay = 0;
            // checking for a utility payout
            if (deed.rent.length === 0) {
                if (deed.monopoly === true) {
                    $scope.message.subText += "<br/> You must pay player 10x your dice roll. Go Blazers!!";
                    rentToPay = roll.total * 10;
                }
                else {
                    $scope.message.subText += "<br/> You must pay player 4x your dice roll. Go Timbers!!";
                    rentToPay = roll.total * 4;
                }
            } else {
                rentToPay = deed.rent[deed.multiplier] * -1;
            }
            $scope.message.originalAmount = player.money;
            $scope.message.change = "-$" + deed.rent[deed.multiplier];
            transactions.payBetweenPlayers(player, rentToPay, deed.owned);
            $scope.message.newTotal = player.money;
            $scope.showMessage = true;
            $("#change").css("color", "C20319");
            $(".messageDirective h5.moneyTotals").css("visibility", "visible");
            $scope.show_end_turn_button = true;
        }
        else {
            $scope.message.text = "You own this property.";
            $scope.message.subText = "Nice Work!!";
            $scope.showMessage = true;
            $scope.show_end_turn_button = true;
        }
        //$scope.drawAction = false;
    } //end playerOption()
    $scope.getCard = function () {
        drawCard(card_type);
        $scope.showMessage = true;
    }

    //****************GETCARD FUNCTION****************//
    var drawCard = function (kind) {
        var card;
        //var card_number = 4;
        var card_number = chance.integer({ min: 0, max: 9 }); //comment out for test
        if (kind == "community chest") {
            card = community_chest_cards[card_number];
            $scope.cardToRead = card;
            actionCard($scope.currentPlayer, card);

            //$scope.show_end_turn_button = true;// might need to move this for the movement cards
            //return;
        }
        else if (kind == "chance") {
            card = chanceCards[card_number];
            $scope.cardToRead = card;
            actionCard($scope.currentPlayer, card);
            //$scope.show_end_turn_button = true;
            //return;
        }
        else {
            alert("This should not print");
        }
        //$scope.drawAction = false;
        $scope.read_contents = true;
        $scope.showMessage = true;
    } //end drawCard

    // action from community chest and chance cards function
    var actionCard = function (player, card) {
        if (card.text === "GET OUT OF PORTLAND SATURDAY MARKET, FREE") {
            player.getOutFree.push(card.group); // player might get more than 1
        } else if (card.kind === 'card') {
            // player must pay each player $, or player receives $ from other players
            $scope.message.originalAmount = player.money;
            transactions.payBetweenPlayers(player, card.value[0], 0);
            $scope.message.newTotal = player.money;
            if (card.value[0] < 0) {
                $("#change").css("color", "C20319");
                $scope.message.change = "-$" + (card.value[0] * -1);
            } else {
                $scope.message.change = "$" + card.value[0];
                $("#change").css("color", "green");
            }
            $(".messageDirective h5.moneyTotals").css("visibility", "visible");
            $scope.showMessage = true;
        } else if (card.kind === 'money') {
            // alert(player.inMarket + ", player gets paid in actionCard()");
            $scope.message.originalAmount = player.money;
            transactions.exchangeMoney(player, card.value[0], 1);
            $scope.message.newTotal = player.money;
            $scope.showMessage = true;
            if (card.value[0] < 0) {
                $("#change").css("color", "C20319");
                $scope.message.change = "-$" + (card.value[0] * -1);
            } else {
                $scope.message.change = "$" + card.value[0];
                $("#change").css("color", "green");
            }
            $(".messageDirective h5.moneyTotals").css("visibility", "visible");
        } else if (card.kind === 'assess') {
            // for testing
            player.houses = 0;
            player.hotels = 0;
            player.money -= ((player.houses * card.value[0]) + (player.hotels * card.value[1]));
        } else {// card.kind === 'go'
            // a variable with attribute .total must be passed to playerOption function to substitute for a roll
            if (card.value[0] < 0) {
                //$scope.message.text =
                $scope.playerOption(player, { total: card.value[0] }); // go back 3 spaces card
            } else {
                if (card.value[0] === 10) {// go to market
                    // amount to move is 10 - current position
                    gotoJail(player, true);
                    //alert(player.inMarket + ", FOR TEST player in Market in actionCard()");
                } else if (card.value[0] == 0) { // advance to go
                    move(player, 40 - player.position);
                } else {
                    $scope.goCard = true;
                    moveWithCard(player, card);
                    return;
                }
            }
        }
        $scope.showMessage = true;
        $scope.show_end_turn_button = true;
    };
    $scope.showNewPosition = function () {
        $(".square" + $scope.currentPlayer.position).toggleClass("showPosition");
    }
    var moveWithCard = function (player, card) { // random other places, might have multiple values
        var shift = []; // to continue player movement and play after drawing a card,

        for (var i = 0; i < card.value.length; i++) {
            if (player.position < card.value[i]) {
                shift.total = card.value[i] - player.position;
                break;
            } else if (player.position > card.value[i] && i === card.value.length - 1) {
                shift.total = (card.value[i] - player.position) + 40;
            }
        }
        $(".square" + $scope.currentPlayer.position).toggleClass("showPosition");
        $scope.playerOption(player, shift);
    }
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
            $scope.message.originalAmount = player.money;
            var purchaseComplete = transactions.buyProperty(player, deed);
            if (purchaseComplete) {
                $scope.message.text = "Congratulations! You now own " + deed.name;
                $scope.message.subText = "You spent $" + deed.price;

                $scope.message.change = "-$" + deed.price;
                $scope.message.newTotal = player.money;
                $("#change").css("color", "C20319");
                $(".messageDirective h5.moneyTotals").css("visibility", "visible");
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
                //account for rail spacing issue, need to target id and class separately
                $(".square" + player.position + " #bottom-middle-cost").css("background-color", player.piece.rgb);
                $(".square" + player.position + " .bottom-cost").css("background-color", player.piece.rgb);
            } else if ((player.position < 20) && (player.position > 10)) {
                $(".square" + player.position + " .left-cost").css("background-color", player.piece.rgb);
            } else if ((player.position < 30) && (player.position > 20)) {
                $(".square" + player.position + " .top-cost").css("background-color", player.piece.pieceName);
            } else if ((player.position < 40) && (player.position > 20)) {
                $(".square" + player.position + " .right-cost").css("background-color", player.piece.rgb);
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
                    transactions.increaseMultipliers(deed_group);
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
                    transactions.increaseMultipliers(deed_group);
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
                    transactions.increaseRailMultiplier(deeds[deed_number]);
                    return true;
                }
            }
        }
        return false; //there is no new monopoly
    } //end checkForMonopoly()

    //****************GOTOJAIL FUNCTION****************//
    var gotoJail = function (player, card) {
        var negShift = (transactions.getShift(player, 10) - 40);
        move(player, negShift);
        player.num_of_doubles = 0;
        player.inMarket = true;
        if ((card | 0) === 0) {
            $scope.message.text = "Go to Saturday Market!!!";
            $scope.message.subText = "Sorry, your luck just ran out. You're stuck perusing Portland's finest selection of tye-dye shirts.";
            $scope.showMessage = true;
            //alert('Sorry, ' + player.piece.pieceName + ', but your luck just ran out!\nThat was your third roll of doubles in a row! Now you\n must spend your time browsing junk at Saturday Market!');
        }
        //$(".player" + player.id).appendTo(".square" + player.position);
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
            //$scope.turn($scope.currentPlayer)
            // pay option, first case player doesn't have enough money,
            // provide option to mortgage/sell
        } else if ($scope.market_choice === "pay") {
            if (!transactions.checkFunds($scope.currentPlayer, 50)) {
                var performMortgageOption = function () { };// needs a function
                //player does have enough, pay the fine
            } else {
                // if player decides to pay first, subtract money and start their turn
                $scope.message.originalAmount = player.money;
                transactions.exchangeMoney($scope.currentPlayer, 50, -1);
                $scope.message.text = "You bought your way out of Saturday Market!";
                $scope.message.subText = "Hope you had a tasty Elephant Ear during your stay.";
                $scope.message.change = "-$" + 50;
                $scope.message.newTotal = player.money;
                $scope.showMessage = true;
                $(".messageDirective h5.moneyTotals").css("visibility", "visible");
                $("#change").css("color", "green");
                $scope.isInMarket = false;
                $scope.currentPlayer.inMarket = false;
                $scope.submit = false;
                $scope.samePlayer = false;
                $scope.rolled = false;
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
            } else {
                $scope.message.text = "You did not roll doubles!";
                $scope.message.subText = "Walk around Saturday Markey for another turn.";
                $scope.showMessage = true;
                //alert("You did not roll doubles! Walk around Saturday Market for another turn. Maybe you'll find that tie-dye nighty you've always wanted!");
                $scope.currentPlayer.freedomRolls++;
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
        $scope.message.originalAmount = "";
        $scope.message.change = "";
        $scope.message.newTotal = "";
        $(".messageDirective h5.moneyTotals").css("visibility", "hidden");
        $scope.drawAction = false;  // draw card and display result reset
        $scope.read_contents = false;
        $scope.goCard = false;
        //moving player to jail now, so player can hit end turn before getting sent

        if ($scope.currentPlayer.inMarket) {
            $("." + $scope.currentPlayer.pieceObject.boardId).appendTo(".square" + $scope.currentPlayer.position);
            $("." + $scope.currentPlayer.pieceObject.boardId).css("position", "absolute");
        } else {
            $(".square" + $scope.currentPlayer.position).toggleClass("showPosition");
        }
        var prevPlayer = $scope.currentPlayer;
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
        $("#p" + prevPlayer.id).css("height", "8.75em");
        $("#p" + $scope.currentPlayer.id).css("height", "12.5em");
        if (Math.floor(prevPlayer.position / 10) != Math.floor($scope.currentPlayer.position / 10 && (prevPlayer.position % 10 != 0))) {
            rotateToPlayer($scope.currentPlayer.position, 0);
        }
    };// end endTurn()
    String.prototype.noExponents = function () {
        var data = String(this).split(/[eE]/);
        if (data.length == 1) return data[0];

        var z = '', sign = this < 0 ? '-' : '',
        str = data[0].replace('.', ''),
        mag = Number(data[1]) + 1;

        if (mag < 0) {
            z = sign + '0.';
            while (mag++) z += '0';
            return z + str.replace(/^\-/, '');
        }
        mag -= str.length;
        while (mag--) z += '0';
        return str + z;
    }
});