/*
this directive just adds a dropdown list of the get out of market cards the player has when the player selects the 'use get out of market free' option from 'jail'
*/
portlandiaMonopoly.directive('showCards', function () {
    return {
        template: ('<div ng-show="choose_card"><form ng-model="cardSelected"><select name="cards" ng-model="cardSelected"><option ng-repeat="item in getOutFreeCards" ng-model="cardSelected" value="{{item}}">{{item}}</option></select></form></div>'),
    };
});
portlandiaMonopoly.directive('readCard', function () {
    return {
        template: ('<div><h3>{{cardToRead.text}}</h3><h4 style="color:#222">{{cardToRead.subtext}}</h4>')
    };
});

portlandiaMonopoly.directive('rollResults', function () {
    return {
        template: ('<div><h4>{{ currentPlayer.piece.pieceName }} {{ currentPlayer.pieceObject.name }}, you rolled {{ rollResult.die1 }} and {{ rollResult.die2 }}</h4><span ng-show="rollResult.doubles"><h4> with doubles!')
    };
})
portlandiaMonopoly.directive('actionMessage', function () {
    return {
        template: ('<div class="messageDirective"><h3>{{ message.text }}</h3><br />' +
                    '<h4>{{message.subText}}</h4></br>' +
                    '<h5 class="moneyTotals">Previous Funds: ${{ message.originalAmount }}</h5>' +
                    '<h5 class="moneyTotals" id="change">Change: {{ message.change }}</h5>' +
                    '<h5 class="moneyTotals">Current Funds: ${{ message.newTotal }}</h5>' +
                    '</div>')
    };
})