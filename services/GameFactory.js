portlandiaMonopoly.factory('GameFactory', function GameFactory(){
  var factory = {};
  // elements of the game
  factory.players = [];
  factory.properties = [];
  // contains 2 arrays -- chance and community chest

  //CHANCE CARDS = 0
  //COMMUNITY CHEST = 1
  // ACTION CARD VALUES NEEDED:
        //  DESCRIPTION TEXT
        //  SUBDESCRIPTION TEXT
        //  ACTION-TYPE -- go, money, card
        //  ACTION VALUE -- FUNCTION -- $$ TO CHANGE OR SPACES TO MOVE -array- specific location
        // has one value, go back is negative, mult
        //  HOLD (TRUE OR FALSE)-- (GET OUT OF JAIL FREE = TRUE)
  factory.actionCards = [[chance_cards], [community_chest_cards]];
  // PROPERTY CARD VALUES NEEDED:
        //  NAME TEXT
        //  MONEY VALUE
        //  GROUP (TO DETERMINE IF PLAYER HAD A MONOPOLY)
  factory.propertyCards = [];

  factory.addPlayer = function(){
    factory.players.push({ id: factory.players.length + 1,
                           name: factory.playerName,
                           gamePiece: factory.gamePiece,
                           money: 1500,
                           inMarket: false,
                           freedomRolls: 0;
                          //  monopolies: [],// array of completed card group #s
                          //  propertyGroupsOwned:[], // array of card
                          //  propertyCardsOwned: [],
                           position: 0,
                           getOutFree = 0;
                           houses: 0,
                           hotels: 0
                         });
     factory.playerName = null;
  };
  // type = property or action (chance or community chest)
  factory.addPropCard = function(player, card){

  }

  factory.actionCard = function(player, card){
    if (card.kind === 'card'){ // get outta jail card
      if(card.value[0] = 0){
        player.getOutFree += 1; // player might get more than 1
      }else{ // player must pay each player $, or player receives $ from other players
        for(i = 0; i < factory.players; i++ ){
          if(player.id === factory.players[i].id){
            continue;
          }else{
            factory.players[i].money += card.value[0];
            player.money += card.value[0];
          }
        }
      }
    }else if(card.kind ==='money'){
      player.money =+ card.value[0];
    } else if(card.kind === 'assess'){
      player.money -= ((player.houses * card.value[0]) + (player.hotels * card.value[1]));
    }else{// it's a move card
    if(card.value < 0){
      player.position -= 3; // go back 3 spaces card
    }else{
      player.position = card.value;
    }
  }



  factory.addPropertyCard = function(player, card){
    if()
    player.money -+ card.price;

  }

})
