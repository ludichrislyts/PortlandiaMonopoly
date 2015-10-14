/// <reference path="../lib/Data.js" />


portlandiaMonopoly.factory('GameFactory', function GameFactory() {
    var factory = {};
    // elements of the game
    factory.players = [];

    /////////////////////////////////////////////////////////////////////////////
    //////////////////////// player/piece  selection ////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    // array to hold pieces in piece selection process
    factory.remainingGamePieces = [];
    Data.gamePeices.forEach(function (x) {
        factory.remainingGamePieces.push(x);
    });


    // returns true if enough players reached (5 player max), nothing if not
    factory.addPlayer = function () {
        factory.players.push({
            id: factory.players.length + 1,
            name: factory.playerName,
            piece: factory.playerPiece,
            money: 1500,
            inMarket: false,
            freedomRolls: 0,
            position: 0,
            getOutFree: [],
            houses: 0,
            num_of_doubles: 0,
            hotels: 0
        });
        factory.playerName = null;
        // get last player added
        var lastAdded = factory.players.length - 1;
        // take piece out of display array and toggle taken in piece object
        factory.selectPiece(factory.players[lastAdded].piece);
        // return true to toggle play in html
        if (factory.players.length >= 5) return true;
    },

    // when a player selects a piece, make other pieces unavailable
	factory.selectPiece = function (piece) {
	    // only go through remaining pieces
	    for (var i = 0; i < factory.remainingGamePieces.length; i++) {
	        if (factory.remainingGamePieces[i].id === piece.id) {
	            // make sure to match piece in original array to toggle taken
	            factory.remainingGamePieces.splice(i, 1);
	            for (var j = 0; j < Data.gamePeices.length; j++) {
	                if (Data.gamePeices[j] === piece) {
	                    Data.gamePeices[j].taken = true;
	                }
	            }
	        }
	    }
	},
    /////////////////////////////////////////////////////////////////////////////
    //////////////////// end player/piece  selection ////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    // Arranges gameflow array of players
    // basically, take winning roller id as 1st, next id as 2nd, etc
	factory.fixPlayerOrder = function (id) {
	    var arrayPos = id - 1;
	    for (var i = 0; i < arrayPos; i++) {
	        factory.players.push(factory.players.shift());
	    }
	    return factory.players;
	}
    //determine if a player is at the market or not
    factory.inMarket = function (player) {
        if (player.inMarket) { return true; }
        else { return false; }
    },
	factory.roll = function () {
	    require(['../lib/chance.js'], function (Chance) {
	        var chance = new Chance();
	        return chance;
	    });
	}


    //moves player and returns the new postiton
    // sends player to market if position = 30 (go to market)

    // check if player had a get out of market card
    // returns empty array if no card, getOutFree array if has card

    //TODO: Remove .hasGetOut
    factory.hasGetOut = function (player) {
        if (player.getOutFree.length === 0) {
            return [];
        } else {
            return player.getOutFree;
        }
    },

	factory.movePlayer = function (player) {
	    var position = player.position + 7; // replace 7 with diceroll function
	    if (position > 39) { // 40 == GO
	        player.money += 200; // passed go
	        var offset = position - 40;
	        player.position = offset;
	    } else if (position == 30) {//go to market square
	        player.position = 10;
	        player.inMarket = true;
	    }
	    return player.position;
	},



    // returns a deed if found at the position, null if no deeds found
    // if player position == go to market, set value
	factory.checkSpace = function (playerPosition) {
	    for (var i = 0; i < factory.deeds.length; i++) {
	        if (factory.deeds[i] === playerPosition && factory.deeds[i] != null) {
	            return factory.deeds[i];
	        } else if (playerPosition === 30) {

	        }
	    } return null;
	},

    /*
    // check if a property is owned
	factory.isOwned = function (deed) {
	    if (deed.owned === 0) {
	        return 0;
	    } else {
	        return deed.owned;
	    }
	},
    */

    /*
    // returns true if player has enough money to buy a deed,
    // false if not
	factory.canBuy = function (player, deed) {
	    if (player.money < deed.price) {
	        return false;
	    } else {
	        return true;
	    }
	};
    */

    /*
    factory.useLeaveMarketCard = function (player) {

    }
    */

    // action card - kind: card- get out of jail free
    //                            Pay or collect money from every player
    //                     money - collect or pay money
    //                     assess- pay money per upgrade on properties


    ///////////////////// MOVED TO PLAYER TURN CTRL ///////////////
    // adjust Player money
    // returns new amount
    // factory.adjustMoney = function(player, amount){
    //   player.money += amount;
    //   return player.money;
    // };
    ///////////////////////////////////////////////////////////////

    //FOR TESTING ONLY - just sends an alert to the screen with player stats
    factory.playerStatsAlert = function (player) {
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

    return factory;
});
