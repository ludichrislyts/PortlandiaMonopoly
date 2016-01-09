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
    public pieceObject: GameObject // variable to hold the piect object (dog, hat, iron, etc.)

    constructor(id: number, name: string, piece: GamePiece, pieceObject: GameObject) {
        this.id = id;
        this.name = name;
        this.piece = piece;
        this.pieceObject = pieceObject;
    }

    public Location = () => Data.deeds[this.position]
}

class GamePiece {
    //TODO: Rename [pieceName] to [Name]

    public id: number
    public pieceName: string
    public rgb: string
    public rgbDark: string
    public pieceObject: GameObject
    public taken: boolean = false

    constructor(id: number, pieceName: string, rgb: string, rgbDark: string) {
        this.id = id;
        this.pieceName = pieceName;
        this.rgb = rgb;
        this.rgbDark = rgbDark;
    }
}
class GameObject {
    public boardId: string
    public name: string

    constructor(boardId: string, name: string) {
        this.boardId = boardId;
        this.name = name;
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

    /*
    TODO: Move Monopoly logic from deed_groups into here
    Public Count_Needed_For_Monopoly: number
    */

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
    public playerObject: GameObject

    public selectPiece = (piece) => {
        for (var i = 0; i < Data.remainingGamePieces.length; i++) {
            if (Data.remainingGamePieces[i].id === piece.id) {
                Data.remainingGamePieces.splice(i, 1);
                break;
            }
        }
    }
    public selectObject = (object: GameObject) => {
        for (var i = 0; i < Data.remainingObjects.length; i++) {
            if (Data.remainingObjects[i].name === object.name) {
                Data.remainingObjects.splice(i, 1);
                break;
            }
        }
    }

    public addPlayer = () => {
        Data.players.push(new Player(Data.players.length + 1, this.playerName, this.playerPiece, this.playerObject));
        this.playerName = null;
        // take piece out of display array and toggle taken in piece object
        this.selectPiece(Data.players[Data.players.length - 1].piece);
        this.selectObject(Data.players[Data.players.length - 1].pieceObject);
        // return true to toggle play in html
        if (Data.players.length >= 4) return true;
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
    * this function adds or subracts from player bank
    * @param player , the current player
    * @param amount , the amount to add or subtract(by adding a neg num)
    * @param posOrNeg , -1 if number should be subtracted, 1 if added.
    * @return , the new player total, in case we want it
    */
    public exchangeMoney = (player: Player, amount: number, posOrNeg: number) => {
        player.money += (amount * posOrNeg);
        return player.money;
    }
    /**
    * function to exchange money between players
    * @param player , the current player
    * @param amount , the amount of the transaction. The amount reflects the amount that
    *               should affect the current player.
    * @param playerId , the player affected. If 0, all players are affected
    */
    public payBetweenPlayers = (player: Player, amount: number, playerId: number) => {
        for (var i = 0; i < Data.players.length; i++) {
            // current player pays/get paid
            if (Data.players[i].id === player.id) {
                this.exchangeMoney(player, amount, 1);
            } else if (!playerId) { // pay/receive from all other players
                this.exchangeMoney(Data.players[i], amount, -1);
            } else { // only pay/receive from one player
                if (Data.players[i].id === playerId) {
                    this.exchangeMoney(Data.players[i], amount, -1);
                }
            }
        }
    }
    /**
    * this function checks if a player has enough money to buy a property
    * @param player player buying the property
    * @param amount player needs to spend
    * @return true if player has enough money, false if not
    */
    public checkFunds = (player: Player, amount: number): boolean => {
        if (player.money < amount) {
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
        if (!this.checkFunds(player, deed.price)) {
            alert("not enough money!!");
            return false;
        } else {
            this.exchangeMoney(player, deed.price, -1);
            deed.owned = player.id;
            return true;
        }
    }
    /**
   * function to increase the multiplier for rent based on monopoly status
   *   and development status
   * @param group , the group of deeds to alter
   */
    public increaseMultipliers = (group: Array<Deed>) => {
        for (var i = 0; i < group.length; i++) {
            group[i].multiplier++;
        }
    }
    /**
    * function to check for rail monopoly/partial monopoly
    * @param railDeed , deed to check against
    * @return , the new multiplier value
    */
    public increaseRailMultiplier = (railDeed: Deed) => {
        //if (railDeed != Data.deeds[5] && railDeed.owned === Data.deeds[5].owned) {
        //}


        //todo: clean ifs...see above code
        if (railDeed === Data.deeds[5]) { }//skip
        else {
            if (railDeed.owned === Data.deeds[5].owned) {
                railDeed.multiplier++;
                Data.deeds[5].multiplier++;
            }
        }
        if (railDeed === Data.deeds[15]) { }//skip
        else {
            if (railDeed.owned === Data.deeds[15].owned) {
                railDeed.multiplier++;
                Data.deeds[15].multiplier++;
            }
        }
        if (railDeed === Data.deeds[25]) { }//skip
        else {
            if (railDeed.owned === Data.deeds[25].owned) {
                railDeed.multiplier++;
                Data.deeds[25].multiplier++;
            }
        }
        if (railDeed === Data.deeds[35]) { }//skip
        else {
            if (railDeed.owned === Data.deeds[35].owned) {
                railDeed.multiplier++;
                Data.deeds[35].multiplier++;
            }
        }
    }
    public getShift = (player: Player, newPosition: number) => {
        var shift = 0;
        if (player.position < newPosition) {
            shift = newPosition - player.position;
            return shift;
        } else {
            shift = (newPosition - player.position) + 40;
        }        
    }
}