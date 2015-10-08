/* 
this directive just adds a dropdown list of the get out of market cards the player has when the player selects the 'use get out of market free' option from 'jail'
*/
portlandiaMonopoly.directive('showCards', function(){
	return{
				template: ('<div ng-show="choose_card"><form ng-model="cardSelected"><select name="cards" ng-model="cardSelected"><option ng-repeat="item in getOutFreeCards" ng-model="cardSelected" value="{{item}}">{{item}}</option></select></form></div>'),				
	};
})



