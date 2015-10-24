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