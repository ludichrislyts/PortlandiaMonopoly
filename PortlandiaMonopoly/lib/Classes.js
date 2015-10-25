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
//# sourceMappingURL=classes.js.map