//#endregion
var Player = (function () {
    function Player(id, name, piece) {
        var _this = this;
        this.money = 1500;
        this.inMarket = false;
        this.freedomRolls = 0;
        this.position = 0;
        this.getOutFree = []; //TODO: Convert into number! All I care about is how many are left
        this.houses = 0;
        this.num_of_doubles = 0;
        this.hotels = 0;
        this.Location = function () { return Data.deeds[_this.position]; };
        this.id = id;
        this.name = name;
        this.piece = piece;
    }
    return Player;
})();
var GamePiece = (function () {
    function GamePiece(id, pieceName) {
        this.taken = false;
        this.id = id;
        this.pieceName = pieceName;
    }
    return GamePiece;
})();
var CardKind;
(function (CardKind) {
    CardKind[CardKind["Card"] = 0] = "Card";
})(CardKind || (CardKind = {}));
;
var Card = (function () {
    function Card(text, subtext, kind, value) {
        this.text = text;
        this.subtext = subtext;
        this.kind = kind;
        this.value = value;
    }
    return Card;
})();
var DeedType;
(function (DeedType) {
    DeedType[DeedType["Train"] = 0] = "Train";
})(DeedType || (DeedType = {}));
;
var Deed = (function () {
    function Deed(name, price, mortgage_value, house_cost, rent, group_id, type) {
        this.owned = 0;
        this.monopoly = false;
        this.mortgaged = false;
        this.multiplier = 0;
        this.name = name;
        this.price = price;
        this.mortgage_value = mortgage_value;
        this.house_cost = house_cost;
        this.rent = rent;
        this.group_id = group_id;
        this.type = type;
    }
    return Deed;
})();
var GameFactory1 = (function () {
    function GameFactory1() {
        var _this = this;
        this.selectPiece = function (piece) {
            for (var i = 0; i < Data.remainingGamePieces.length; i++) {
                if (Data.remainingGamePieces[i].id === piece.id) {
                    Data.remainingGamePieces.splice(i, 1);
                    break;
                }
            }
        };
        this.addPlayer = function () {
            Data.players.push(new Player(Data.players.length + 1, _this.playerName, _this.playerPiece));
            _this.playerName = null;
            // take piece out of display array and toggle taken in piece object
            _this.selectPiece(Data.players[Data.players.length - 1].piece);
            // return true to toggle play in html
            if (Data.players.length >= 5)
                return true;
        };
        this.fixPlayerOrder = function (id) {
            for (var i = 0; i < id - 1; i++) {
                Data.players.push(Data.players.shift());
            }
            return Data.players;
        };
        this.playerStatsAlert = function (player) {
            var name = player.name;
            var piece = player.piece.pieceName;
            var money = ("$" + player.money);
            var inMarket = player.inMarket;
            var freedomRolls = player.freedomRolls;
            var position = player.position;
            var getOutFreeCards = player.getOutFree.length;
            var houses = player.houses;
            var hotels = player.hotels;
            alert("Player name: " + name + "\n" +
                "Piece: " + piece + "\n" +
                "Money: " + money + "\n" +
                "inMarket: " + inMarket + "\n" +
                "freedomRolls:" + freedomRolls + "\n" +
                "position: " + position + "\n" +
                "getOutFreeCards: " + getOutFreeCards + "\n");
        };
    }
    return GameFactory1;
})();
var Transactions = (function () {
    function Transactions() {
        /**
        * this function checks if a player has enough money to buy a property
        * @param player player buying the property
        * @param deed property player wants to buy
        * @return true if player has enough money, false if not
        */
        this.checkFunds = function (player, deed) {
            if (player.money < deed.price) {
                return false;
            }
            else {
                return true;
            }
        };
        /**
        * this function assigns a playerId to a deed and subtracts money from player
        * @param player player buying the property
        * @param deed property player wants to buy
        * @return true if transaction completed, false if not (player doesn't have enough money)
        */
        this.buyProperty = function (player, deed) {
            // this should have been checked for already, just making sure
            if (player.money < deed.price) {
                alert("not enough money double check");
                return false;
            }
            else {
                player.money -= deed.price;
                deed.owned = player.id;
                return true;
            }
        };
        /**
        * determine what actions a player can take depending on position(deed)
        * @param player player involved in the transaction
        * @param deed the deed at the position the player landed on
        */
        this.onLandOnDeed = function (player, deed) {
            if (deed.group_id == 0) {
                if (player.position == 0) {
                    player.money += 200;
                    alert('You landed on Startup! Your investors gave you $200!');
                }
                else if ((player.position == 2) || (player.position == 17) || (player.position == 33)) {
                    card_type = "community chest";
                    $scope.community_chestCard = true;
                    $scope.chanceCard = false;
                    $scope.draw = true;
                }
                else if (player.position == 4) {
                    alert("Pay Portland Art Tax, Lose 200 Dollars");
                    player.money -= 200;
                }
                else if (player.position == 7 || player.position == 22 || player.position == 36) {
                    card_type = "chance";
                    $scope.chanceCard = true;
                    $scope.community_chestCard = false;
                    $scope.draw = true;
                }
                else if (player.position == 10) {
                    alert("You've decided to brave Saturday Market!\nMake sure to tip the buskers.");
                }
                else if (player.position == 20) {
                    alert("Take a walk up to Washington Park to visit\nPortland's Rose Test Garden!");
                }
                else if (player.position == 30) {
                    alert("I guess you don't own enough tie-dye cargo shorts. Go to Saturday Market\n and don't come out until you get some!"); //Goto Jail
                    player.position = 10;
                    player.inMarket = true;
                    player.num_of_doubles = 0;
                    $(".player" + player.id).appendTo(".square" + player.position);
                }
                else if (player.position == 38) {
                    alert("Pay for Voodoo Donuts, Lose 175 Dollars");
                    player.money -= 175;
                }
                else {
                    alert("This should never print");
                }
            }
            else if (deed.owned == 0) {
                // player option to buy or not to buy
                if (confirm("Do you want to buy " + deed.name + " for $" + deed.price + "?")) {
                    buyDeed(deed);
                }
                $scope.show_end_turn_button = true;
            }
            else if (deed.owned != player.id) {
            }
            else {
                alert('Nice work! You own this property!');
            }
        };
    }
    return Transactions;
})();
