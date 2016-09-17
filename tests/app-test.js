describe("ngtest module testapp", function() {
	// load the module testapp
	var testapp;
	var $compile, $rootScope, element, form;
	beforeEach(angular.mock.module('testapp'));
	
	//it('should have a homeCtrl controller', function() {
	//	expect(testapp.homeCtrl).toBeDefined();
	//});
	
	//it('should have a registerCtrl controller', function() {
	//	expect(testapp.registerCtrl).toBeDefined();
	//});
	
	describe('Validating email', function() {
		
		beforeEach(inject(function(_$compile_, _$rootScope_){			
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			var htmlStr = angular.element('<form name="regForm"> '
				+ '<input name="email" type="text" ng-model="user.email" ng-pattern="/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/" required /> '
				+ '<input name="confirmEmail" type="text" ng-model="user.confirmEmail" my-confirmed="user.confirmEmail && user.email === user.confirmEmail" required /> '
				+ '</form>');
			$rootScope.user = {email: null, confirmEmail: null};
			element = $compile(htmlStr)($rootScope);
			$rootScope.$digest();
			form = $rootScope.regForm;			
		}));  
		
		it('should be VALID emails', function() {			
			// test cases - testing for success
			var validEmails = [
				'te@test.com', 'te@test.co.uk',
				't734ltylytkliytkryety9ef@jb-fe.com'
			];					
			for (var i in validEmails) {
				var input = element.find('input');
				//console.log(input[0]);
				form.email.$setViewValue(validEmails[i]);
				$rootScope.$digest();
				console.log(form.email.$valid, form.email.$viewValue, $rootScope.user);
				expect($rootScope.user.email).toEqual(validEmails[i]);
				expect(form.email.$valid).toBe(true);
			}			
		});
		
		it('should be INVALID emails', function() {
			// test cases - testing for failure
			var invalidEmails = [
				'te@testcom', 't@ test.co.uk',
				'ghgf@fe.com.co.','t@st@test.com',
				' '
			];			
			for (var i in invalidEmails) {
				form.email.$setViewValue(invalidEmails[i]);
				$rootScope.$digest();
				console.log('invalid', form.email.$error.pattern, form.email.$valid, form.email.$viewValue, $rootScope.user);
				expect($rootScope.user.email).toEqual(invalidEmails[i]);
				expect(form.email.$valid).toBeFalsy();
			}
		});

	});
	
	describe('Validating password', function() {
		  

	});
	
	describe('Validating ssn', function() {
		  

	});

});