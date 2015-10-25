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

    public playerStatsAlert =  (player)  => {
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