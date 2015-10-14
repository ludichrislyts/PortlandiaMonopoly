/// <reference path="../lib/Classes.js" />
/// <reference path="../lib/Data.js" />


portlandiaMonopoly.factory('GameFactory', function GameFactory() {
    var factory = {};
    Data.players = [];

    Data.GamePieces.forEach(function (x) {
        Data.remainingGamePieces.push(x);
    });

    factory.addPlayer = function () {
        Data.players.push(new Player(Data.players.length + 1, factory.playerName, factory.playerPiece));
        factory.playerName = null;
        // take piece out of display array and toggle taken in piece object
        factory.selectPiece(Data.players[Data.players.length - 1].piece);
        // return true to toggle play in html
        if (Data.players.length >= 5) return true;
    },

    // when a player selects a piece, make other pieces unavailable
	factory.selectPiece = function (piece) {
	    // only go through remaining pieces
	    for (var i = 0; i < Data.remainingGamePieces.length; i++) {
	        if (Data.remainingGamePieces[i].id === piece.id) {
	            // make sure to match piece in original array to toggle taken
	            Data.remainingGamePieces.splice(i, 1);
	            for (var j = 0; j < Data.GamePieces.length; j++) {
	                if (Data.GamePieces[j] === piece) {
	                    Data.GamePieces[j].taken = true;
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
	        Data.players.push(Data.players.shift());
	    }
	    return Data.players;
	}

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
