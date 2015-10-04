portlandiaMonopoly.factory('GameFactory', function GameFactory(){
  var factory = {};
  // elements of the game
  factory.players = [];
  factory.gamePieces = [{pieceName:"blue", id: 1, taken: false},
                        {pieceName:"red", id: 2, taken: false},
                        {pieceName:"green", id: 3, taken: false},
                        {pieceName:"yellow", id: 4, taken: false},
                        {pieceName:"black", id: 5, taken: false}];
  
  factory.remainingGamePieces = [];
  for(var i = 0; i < factory.gamePieces.length; i ++){
    factory.remainingGamePieces.push(factory.gamePieces[i])
  }
  
  // returns true if enough players reached (5 player max), nothing if not
  factory.addPlayer = function(){
    factory.players.push({ id: factory.players.length + 1,
                           name: factory.playerName,
                           piece: factory.playerPiece,
                           money: 1500,
                           inMarket: false,
                           freedomRolls: 0,
                          //  monopolies: [],// array of completed card group #s
                          //  propertyGroupsOwned:[], // array of card
                          //  propertyCardsOwned: [],
                           position: 0,
                           getOutFree: [],
                           houses: 0,
                           hotels: 0
                         });
     factory.playerName =  null; 
     // get last player added
     var lastAdded = factory.players.length -1;  
     console.log(factory.players[lastAdded]);
     
     factory.selectPiece(factory.players[lastAdded].piece);
     // factory.getRemainingPieces(factory.gamePieces);
     // console.log(factory.gamePieces[factory.players[lastAdded].piece.id -1]);
     if(factory.players.length == 5){return true;}
  },
  
  // when a player selects a piece, make other pieces unavailable
  factory.selectPiece = function(piece){
    // console.log(piece);
    for(var i = 0; i < factory.gamePieces.length; i++){
      if(factory.gamePieces[i] === piece){
        factory.gamePieces[i].taken = true;
        factory.remainingGamePieces.splice(i, 1);
      }
    }
  },
  //moves player and returns the new postiton
  // sends player to market if position = 30 (go to market)
  factory.movePlayer = function(player){
    var position = player.position + 7; // replace 7 with diceroll function
    if (position > 39){ // 40 == GO
      player.money += 200; // passed go
      var offset = position - 40;
      player.position = offset;
    }else if(position == 30){//go to market square
      player.position = 10;
      player.inMarket = true;
    }
    return player.position;
  },



  // returns a deed if found at the position, null if no deeds found
  // if player position == go to market, set value
  factory.checkSpace = function(playerPosition){
    for(var i = 0; i < factory.deeds.length; i++){
      if(factory.deeds[i] === playerPosition && factory.deeds[i] != null){
        return factory.deeds[i];
      }else if(playerPosition === 30){

      }
    }return null;
  },

  // check if a property is owned
  factory.isOwned = function(deed){
    if(deed.owned === 0){
      return 0;
    }else{
      return deed.owned;
    }
  },
  // returns true if player has enough money to buy a deed,
  // false if not
  factory.canBuy = function(player, deed){
    if (player.money < deed.price){
      return false;
    }else{
      return true;
    }
  };
  // action card - kind: card- get out of jail free
  //                            Pay or collect money from every player
  //                     money - collect or pay money
  //                     assess- pay money per upgrade on properties
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
  };

  // returns 0 if not owned, or player ID if owned


  // returns 0
  factory.addDeedCard = function(player, deed){
    if(deed.type === 'company'){
      if(this.owned(deed) === 0){//
        if(true){
          return;
        }
        return;
      }
    }
    player.money -+ deed.price;

  };
  return factory;

});
