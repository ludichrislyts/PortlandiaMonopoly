var Player = (function () {
    function Player(id, name) {
        this.money = 1500;
        this.getOutFree = [];
        this.id = id;
        this.name = name;
    }
    return Player;
})();
var GamePeice = (function () {
    function GamePeice(id, pieceName) {
        this.taken = false;
        this.id = id;
        this.pieceName = pieceName;
    }
    return GamePeice;
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
//# sourceMappingURL=Classes.js.map