//#region :(
declare var $scope: any;
declare var card_type: any;
declare var buyDeed: any;
//#endregion

class Player {
    public id: number
    public name: string
    public money: number = 1500
    public inMarket: boolean = false
    public freedomRolls = 0
    public position = 0
    public getOutFree = [] //TODO: Convert into number! All I care about is how many are left
    public houses = 0
    public num_of_doubles = 0
    public hotels = 0

    public piece: GamePiece

    constructor(id: number, name: string, piece: GamePiece) {
        this.id = id;
        this.name = name;
        this.piece = piece;
    }

    public Location = () => Data.deeds[this.position]
}

class GamePiece {
    //TODO: Rename [pieceName] to [Name]

    public id: number
    public pieceName: string
    public taken: boolean = false

    constructor(id: number, pieceName: string) {
        this.id = id;
        this.pieceName = pieceName;
    }
}

enum CardKind { Card };
class Card {
    //TODO: Make kind a CardKind
    public text: string
    public subtext: string
    //public kind: CardKind
    public kind: string
    public value: Array<number>

    constructor(text: string, subtext: string, kind: string, value: Array<number>) {
        this.text = text
        this.subtext = subtext
        this.kind = kind
        this.value = value
    }
}

enum DeedType { Train };
class Deed {
    //TODO: Make type a DeedType
    public name: string
    public price: number
    public mortgage_value: number
    public house_cost: number
    public rent: Array<number> //IF (rent = []) THEN rent = 4 times dice roll if one owned or 10 times if both are owned
    public group_id: number
    public owned: number = 0
    public monopoly: boolean = false
    public mortgaged: boolean = false
    public multiplier: number = 0
    public type: string

    constructor(name: string, price: number, mortgage_value: number, house_cost: number, rent: Array<number>, group_id: number, type: string) {
        this.name = name
        this.price = price
        this.mortgage_value = mortgage_value
        this.house_cost = house_cost
        this.rent = rent
        this.group_id = group_id
        this.type = type
    }
}

class GameFactory1 {
    public playerName: string
    public playerPiece: GamePiece

    public selectPiece = (piece) => {
        for (var i = 0; i < Data.remainingGamePieces.length; i++) {
            if (Data.remainingGamePieces[i].id === piece.id) {
                Data.remainingGamePieces.splice(i, 1);
                break;
            }
        }
    }

    public addPlayer = () => {
        Data.players.push(new Player(Data.players.length + 1, this.playerName, this.playerPiece));
        this.playerName = null;
        // take piece out of display array and toggle taken in piece object
        this.selectPiece(Data.players[Data.players.length - 1].piece);
        // return true to toggle play in html
        if (Data.players.length >= 5) return true;
    }

    public fixPlayerOrder = (id) => {
        for (var i = 0; i < id - 1; i++) {
            Data.players.push(Data.players.shift());
        }

        return Data.players;
    }

    public playerStatsAlert = (player) => {
        var name = player.name
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
            "getOutFreeCards: " + getOutFreeCards + "\n"
        );
    }
}
class Transactions {
    /**
    * this function checks if a player has enough money to buy a property
    * @param player player buying the property
    * @param deed property player wants to buy
    * @return true if player has enough money, false if not
    */
    public checkFunds = (player: Player, deed: Deed): boolean => {
        if (player.money < deed.price) {
            return false;
        } else { return true; }
    }
    /**
    * this function assigns a playerId to a deed and subtracts money from player
    * @param player player buying the property
    * @param deed property player wants to buy
    * @return true if transaction completed, false if not (player doesn't have enough money)
    */
    public buyProperty = (player: Player, deed: Deed): boolean => {
        // this should have been checked for already, just making sure
        if (player.money < deed.price) {
            alert("not enough money double check");
            return false;
        } else {
            player.money -= deed.price;
            deed.owned = player.id;
            return true;
        }
    }
    /**
    * determine what actions a player can take depending on position(deed)
    * @param player player involved in the transaction
    * @param deed the deed at the position the player landed on
    */
    public onLandOnDeed = (player: Player, deed: Deed) => {
        if (deed.group_id == 0) { // player is not able to buy this deed
            if (player.position == 0) { //Go
                player.money += 200;
                alert('You landed on Startup! Your investors gave you $200!');
            }
            //Community Chest
            else if ((player.position == 2) || (player.position == 17) || (player.position == 33)) {
                card_type = "community chest";
                $scope.community_chestCard = true;
                $scope.chanceCard = false;
                $scope.draw = true;
            }
            //Portland Art Tax
            else if (player.position == 4) {
                alert("Pay Portland Art Tax, Lose 200 Dollars");
                player.money -= 200;
            }
            //Chance
            else if (player.position == 7 || player.position == 22 || player.position == 36) {
                card_type = "chance";
                $scope.chanceCard = true;
                $scope.community_chestCard = false;
                $scope.draw = true;
            }
            else if (player.position == 10) {
                alert("You've decided to brave Saturday Market!\nMake sure to tip the buskers.");
                //Portland Saturday Market
            }
            else if (player.position == 20) { //Rose Garden
                alert("Take a walk up to Washington Park to visit\nPortland's Rose Test Garden!");
            }
            else if (player.position == 30) {
                alert("I guess you don't own enough tie-dye cargo shorts. Go to Saturday Market\n and don't come out until you get some!"); //Goto Jail
                player.position = 10;
                player.inMarket = true;
                player.num_of_doubles = 0;
                $(".player" + player.id).appendTo(".square" + player.position);
            }
            else if (player.position == 38) { //VooDoo Donuts
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
            //payPlayer(player, deed.owned, deed.);
        }
        else {
            alert('Nice work! You own this property!');
        }
    }
}