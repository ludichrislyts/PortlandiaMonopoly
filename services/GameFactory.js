portlandiaMonopoly.factory('GameFactory', function GameFactory(){
  var factory = {};
  // elements of the game
  factory.players = [];
  factory.properties = [];
  factory.actionCards = [];

  factory.addPlayer = function(){
    factory.players.push({ id: factory.players.length + 1,
                           name: factory.playerName,
                           money: 1500,
                           cardsOwned: []
                         });
     factory.playerName = null;
  };



})
