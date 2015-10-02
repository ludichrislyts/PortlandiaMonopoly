// Creates ID function for use elsewhere
portlandiaMonopoly.factory('UtilitiesFactory', function() {
  return {
    findById: function(collection, id) {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].id == id) {
          return collection[i];
        }
      }
      return null;
    },
  
    getPlayerPiece: function(collection, id){
      for (var i = 0; i < collection.length; i++){
        if(collection[i].id == id){
          return collection[i];
        }
      }
      return null;
    },
    
    // getRemainingPieces: function(collection){
    //   var items = [];
    //   for( var i = 0; i < collection.length; i++){
    //     if(collection[i].taken == false){
    //       items.push(collection[i])
    //     }
    //   }return items;
    // }
  };
});
