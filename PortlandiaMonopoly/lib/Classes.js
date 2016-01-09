//#endregion
var Player = (function () {
    function Player(id, name, piece, pieceObject) {
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
        this.pieceObject = pieceObject;
    }
    return Player;
})();
var GamePiece = (function () {
    function GamePiece(id, pieceName, rgb, rgbDark) {
        this.taken = false;
        this.id = id;
        this.pieceName = pieceName;
        this.rgb = rgb;
        this.rgbDark = rgbDark;
    }
    return GamePiece;
})();
var GameObject = (function () {
    function GameObject(boardId, name) {
        this.boardId = boardId;
        this.name = name;
    }
    return GameObject;
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
    /*
    TODO: Move Monopoly logic from deed_groups into here
    Public Count_Needed_For_Monopoly: number
    */
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
        this.selectObject = function (object) {
            for (var i = 0; i < Data.remainingObjects.length; i++) {
                if (Data.remainingObjects[i].name === object.name) {
                    Data.remainingObjects.splice(i, 1);
                    break;
                }
            }
        };
        this.addPlayer = function () {
            Data.players.push(new Player(Data.players.length + 1, _this.playerName, _this.playerPiece, _this.playerObject));
            _this.playerName = null;
            // take piece out of display array and toggle taken in piece object
            _this.selectPiece(Data.players[Data.players.length - 1].piece);
            _this.selectObject(Data.players[Data.players.length - 1].pieceObject);
            // return true to toggle play in html
            if (Data.players.length >= 4)
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
        var _this = this;
        /**
        * this function adds or subracts from player bank
        * @param player , the current player
        * @param amount , the amount to add or subtract(by adding a neg num)
        * @param posOrNeg , -1 if number should be subtracted, 1 if added.
        * @return , the new player total, in case we want it
        */
        this.exchangeMoney = function (player, amount, posOrNeg) {
            player.money += (amount * posOrNeg);
            return player.money;
        };
        /**
        * function to exchange money between players
        * @param player , the current player
        * @param amount , the amount of the transaction. The amount reflects the amount that
        *               should affect the current player.
        * @param playerId , the player affected. If 0, all players are affected
        */
        this.payBetweenPlayers = function (player, amount, playerId) {
            for (var i = 0; i < Data.players.length; i++) {
                // current player pays/get paid
                if (Data.players[i].id === player.id) {
                    _this.exchangeMoney(player, amount, 1);
                }
                else if (!playerId) {
                    _this.exchangeMoney(Data.players[i], amount, -1);
                }
                else {
                    if (Data.players[i].id === playerId) {
                        _this.exchangeMoney(Data.players[i], amount, -1);
                    }
                }
            }
        };
        /**
        * this function checks if a player has enough money to buy a property
        * @param player player buying the property
        * @param amount player needs to spend
        * @return true if player has enough money, false if not
        */
        this.checkFunds = function (player, amount) {
            if (player.money < amount) {
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
            if (!_this.checkFunds(player, deed.price)) {
                alert("not enough money!!");
                return false;
            }
            else {
                _this.exchangeMoney(player, deed.price, -1);
                deed.owned = player.id;
                return true;
            }
        };
        /**
       * function to increase the multiplier for rent based on monopoly status
       *   and development status
       * @param group , the group of deeds to alter
       */
        this.increaseMultipliers = function (group) {
            for (var i = 0; i < group.length; i++) {
                group[i].multiplier++;
            }
        };
        /**
        * function to check for rail monopoly/partial monopoly
        * @param railDeed , deed to check against
        * @return , the new multiplier value
        */
        this.increaseRailMultiplier = function (railDeed) {
            //if (railDeed != Data.deeds[5] && railDeed.owned === Data.deeds[5].owned) {
            //}
            //todo: clean ifs...see above code
            if (railDeed === Data.deeds[5]) { } //skip
            else {
                if (railDeed.owned === Data.deeds[5].owned) {
                    railDeed.multiplier++;
                    Data.deeds[5].multiplier++;
                }
            }
            if (railDeed === Data.deeds[15]) { } //skip
            else {
                if (railDeed.owned === Data.deeds[15].owned) {
                    railDeed.multiplier++;
                    Data.deeds[15].multiplier++;
                }
            }
            if (railDeed === Data.deeds[25]) { } //skip
            else {
                if (railDeed.owned === Data.deeds[25].owned) {
                    railDeed.multiplier++;
                    Data.deeds[25].multiplier++;
                }
            }
            if (railDeed === Data.deeds[35]) { } //skip
            else {
                if (railDeed.owned === Data.deeds[35].owned) {
                    railDeed.multiplier++;
                    Data.deeds[35].multiplier++;
                }
            }
        };
        this.getShift = function (player, newPosition) {
            var shift = 0;
            if (player.position < newPosition) {
                shift = newPosition - player.position;
                return shift;
            }
            else {
                shift = (newPosition - player.position) + 40;
            }
        };
    }
    return Transactions;
})();
//# sourceMappingURL=classes.js.map