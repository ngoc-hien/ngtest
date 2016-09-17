var compareTo =function() {
    return {		
        require: 'ngModel',
        scope: {
            myMatch: '='
        },
        link: function(scope, element, attrs, ctrl) { 
						var viewValue;
						function valMatch(value) {						
							var v = scope.myMatch;//scope.$parent.$eval(attrs.myMatch);
							viewValue = value;
							ctrl.$setValidity('matched', value && angular.equals(value, v));
							//console.log('valMatch value: ', value);
							return value;
						}
						
						ctrl.$parsers.push(valMatch);

						scope.$parent.$watch(attrs.myMatch, function(newValue, oldValue) { 													
							ctrl.$setValidity('matched', angular.equals(viewValue, newValue));
							//console.log('value in watch: ', oldValue, newValue, viewValue);							
						}, true);				
						
        }
    };
};

var validateLuhn = function(luhn) {
	if (!angular.isString(luhn)) return;
  var len = luhn.length,
    mul = 0,
    prodArr = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
    ],
    sum = 0;
  while (len--) {
    sum += prodArr[mul][parseInt(luhn.charAt(len), 10)];
    mul ^= 1;
  }
  return sum % 10 === 0 && sum > 0;
};

////////////////

angular.module('testapp', [
	'ngRoute',
]).
config(function config($routeProvider){
$routeProvider
  .when('/', {
  	templateUrl: 'views/home.html',
  	controller: 'homeCtrl',
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'registerCtrl',
  })
  .otherwise({
    redirectTo: '/'
  });
}).
controller('homeCtrl', function($log){ 
  $log.debug('Welcome to the testapp!');
}).
controller('registerCtrl', function($scope, $log){	
	$scope.validateLuhn = validateLuhn;		
	$scope.submit = function(user){			
		$log.debug('submit: user = ', user);		
	};
})
.directive('myMatch', compareTo)
.directive('myConfirmed', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      scope.$watch(attrs['myConfirmed'], function (exp) {        
        ctrl.$setValidity('confirmed', exp);
      });
    }
  };
  })
.directive('myLuhnChecked', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {			
				function luhnCheck(value) {					
					ctrl.$setValidity('luhnchecked', value.length < 10 || validateLuhn(value));					
                    return value;
				}
				ctrl.$parsers.push(luhnCheck);				
			
    }
  };
})
;

