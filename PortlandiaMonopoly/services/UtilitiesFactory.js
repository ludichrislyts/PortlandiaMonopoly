// Creates ID function for use elsewhere
portlandiaMonopoly.factory('UtilitiesFactory', function () {
    return {
        findById: function (collection, id) {
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].id == id) {
                    return collection[i];
                }
            }
            return null;
        },

        // rolls dice, returns an array with the total and true if doubles, false if not
        rollDice: function () {
            var chance = new Chance(); // loaded in index.html
            var die1 = chance.integer({ min: 1, max: 6 });
            var die2 = chance.integer({ min: 1, max: 6 });
            var total = die1 + die2;

            return [total, die1 === die2];
            /*
            if (die1 === die2) {
                return [total, true]; // doubles
            } else {
                return [total, false];
            }
            */
        }
    }//end return
});
