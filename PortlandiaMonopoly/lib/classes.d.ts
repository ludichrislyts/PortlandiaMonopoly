declare var $scope: any;
declare var card_type: any;
declare var buyDeed: any;
declare class Player {
    id: number;
    name: string;
    money: number;
    inMarket: boolean;
    freedomRolls: number;
    position: number;
    getOutFree: any[];
    houses: number;
    num_of_doubles: number;
    hotels: number;
    piece: GamePiece;
    pieceObject: GameObject;
    constructor(id: number, name: string, piece: GamePiece, pieceObject: GameObject);
    Location: () => Deed;
}
declare class GamePiece {
    id: number;
    pieceName: string;
    rgb: string;
    rgbDark: string;
    pieceObject: GameObject;
    taken: boolean;
    constructor(id: number, pieceName: string, rgb: string, rgbDark: string);
}
declare class GameObject {
    boardId: string;
    name: string;
    constructor(boardId: string, name: string);
}
declare enum CardKind {
    Card = 0,
}
declare class Card {
    text: string;
    subtext: string;
    kind: string;
    value: Array<number>;
    constructor(text: string, subtext: string, kind: string, value: Array<number>);
}
declare enum DeedType {
    Train = 0,
}
declare class Deed {
    name: string;
    price: number;
    mortgage_value: number;
    house_cost: number;
    rent: Array<number>;
    group_id: number;
    owned: number;
    monopoly: boolean;
    mortgaged: boolean;
    multiplier: number;
    type: string;
    constructor(name: string, price: number, mortgage_value: number, house_cost: number, rent: Array<number>, group_id: number, type: string);
}
declare class GameFactory1 {
    playerName: string;
    playerPiece: GamePiece;
    playerObject: GameObject;
    selectPiece: (piece: any) => void;
    selectObject: (object: GameObject) => void;
    addPlayer: () => boolean;
    fixPlayerOrder: (id: any) => Player[];
    playerStatsAlert: (player: any) => void;
}
declare class Transactions {
    /**
    * this function adds or subracts from player bank
    * @param player , the current player
    * @param amount , the amount to add or subtract(by adding a neg num)
    * @param posOrNeg , -1 if number should be subtracted, 1 if added.
    * @return , the new player total, in case we want it
    */
    exchangeMoney: (player: Player, amount: number, posOrNeg: number) => number;
    /**
    * function to exchange money between players
    * @param player , the current player
    * @param amount , the amount of the transaction. The amount reflects the amount that
    *               should affect the current player.
    * @param playerId , the player affected. If 0, all players are affected
    */
    payBetweenPlayers: (player: Player, amount: number, playerId: number) => void;
    /**
    * this function checks if a player has enough money to buy a property
    * @param player player buying the property
    * @param amount player needs to spend
    * @return true if player has enough money, false if not
    */
    checkFunds: (player: Player, amount: number) => boolean;
    /**
    * this function assigns a playerId to a deed and subtracts money from player
    * @param player player buying the property
    * @param deed property player wants to buy
    * @return true if transaction completed, false if not (player doesn't have enough money)
    */
    buyProperty: (player: Player, deed: Deed) => boolean;
    /**
   * function to increase the multiplier for rent based on monopoly status
   *   and development status
   * @param group , the group of deeds to alter
   */
    increaseMultipliers: (group: Deed[]) => void;
    /**
    * function to check for rail monopoly/partial monopoly
    * @param railDeed , deed to check against
    * @return , the new multiplier value
    */
    increaseRailMultiplier: (railDeed: Deed) => void;
    getShift: (player: Player, newPosition: number) => number;
}
