/// <reference path="../lib/Classes.js" />
/// <reference path="../lib/Data.js" />

//debugger;
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
        for (var i = 0; i < Data.remainingGamePieces.length; i++) {
            if (Data.remainingGamePieces[i].id === piece.id) {
                Data.remainingGamePieces.splice(i, 1);
                break;
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
