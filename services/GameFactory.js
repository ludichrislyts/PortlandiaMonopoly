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
  //moves player and returns the new postiton
  // sends player to market if position = 30 (go to market)
  factory.movePlayer = function(player){
    var position = player.position + diceRoll();
    if (if position > 39){ // 40 == GO
      player.money += 200; // passed go
      var offset = position - 40;
      player.position = position;
    }else if(position == 30){//go to market square
      player.position = 10;
      player.inMarket = true;
    }
    return player.position;
  }



  // returns a deed if found at the position, null if no deeds found
  // if player position == go to market, set value
  factory.checkSpace = function(playerPosition){
    for(var i = 0; i < factory.deeds.length; i++){
      if(deeds[i] === playerPosition && deeds[i] != null){
        return deeds[i];
      }else if(playerPosition === 30){

      }
    }return null;
  }

  // check if a property is owned
  factory.isOwned = function(deed){
    if(deed.owned === 0){
      return 0;
    }else{
      return deed.owned;
    }
  }
  // returns true if player has enough money to buy a deed,
  // false if not
  factory.canBuy = function(player, deed){
    if (player.money < deed.price){
      return false;
    }else{
      return true;
    }
  }
  factory.actionCard = function(player, card){
    if (card.kind === 'card'){ // get outta jail card
      if(card.value[0] = 0){
        player.getOutFree += 1; // player might get more than 1
      }else{ // player must pay each player $, or player receives $ from other players
        for(var i = 0; i < factory.players; i++ ){
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

  // returns 0 if not owned, or player ID if owned


  // returns 0
  factory.addDeedCard = function(player, deed){
    if(deed.type === 'company'){
      if(this.owned(deed) === 0){//
        if
      }
    }
    player.money -+ card.price;

  }

})
