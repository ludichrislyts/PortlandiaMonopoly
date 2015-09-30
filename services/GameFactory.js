portlandiaMonopoly.factory('GameFactory', function GameFactory(){
  var factory = {};
  // elements of the game
  factory.players = [];
  factory.properties = [];
  // contains 2 arrays -- chance and community chest
  //CHANCE CARDS = 0
  //COMMUNITY CHEST = 1
  factory.actionCards = [[chance_cards], [community_chest_cards]];

  factory.addPlayer = function(){
    factory.players.push({ id: factory.players.length + 1,
                           name: factory.playerName,
                           money: 1500,
                           cardsOwned: []
                         });
     factory.playerName = null;
  };

  factory.addChanceCard(){
    
  }



})
