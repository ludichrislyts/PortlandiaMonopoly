portlandiaMonopoly.directive('showCards', function(){
	return{
				template: ('<div ng-show="choose_card"><form ng-model="cardSelected"><select name="cards" ng-model="cardSelected"><option ng-repeat="item in getOutFreeCards" ng-model="cardSelected" value="{{item}}">{{item}}</option></select></form></div>'),
				
	};
})



