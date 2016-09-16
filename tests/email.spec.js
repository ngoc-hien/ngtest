describe("ngtest module testapp", function() {
	// load the module testapp	
	var $compile, $rootScope, element, form;
	beforeEach(angular.mock.module('testapp'));	
	
	describe('Validate email', function() {
		
		beforeEach(inject(function(_$compile_, _$rootScope_){			
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			var html = angular.element('<form name="regForm"> '
				+ '<input name="email" type="text" ng-model="user.email" ng-pattern="/^[^ @]+[@]{1}[^ @]+[.]{1}[^ @]{2,}[^.]$/" required /> '
				+ '<input name="confirmEmail" type="text" ng-model="user.confirmEmail" my-confirmed="user.confirmEmail && user.email === user.confirmEmail" required /> '
				+ '</form>');
			$rootScope.user = {email: null, confirmEmail: null};
			element = $compile(html)($rootScope);
			$rootScope.$digest();
			form = $rootScope.regForm;			
		}));  
		// test cases - testing for success
			var validEmails = [
				'test@test.com', 'test@test.co.uk',
				't734ltylytkliytkryety9ef@jb-fe.com'
			];
		// test cases - testing for failure
			var invalidEmails = [
				'test@testcom', 'test@ test.co.uk',
				'ghgf@fe.com.co.','t@est@test.com',
				' '
			];
		it('should be VALID emails', function() {								
			for (var i in validEmails) {
				form.email.$setViewValue(validEmails[i]);				
				//console.log(form.email.$valid, form.email.$viewValue, $rootScope.user);
				expect($rootScope.user.email).toEqual(validEmails[i]);
				expect(form.email.$valid).toBe(true);
			}			
		});
		
		it('should be INVALID emails', function() {						
			for (var i in invalidEmails) {
				form.email.$setViewValue(invalidEmails[i]);				
				//console.log('invalid', form.email.$error.pattern, form.email.$valid, form.email.$viewValue, $rootScope.user);
				expect($rootScope.user.email).toEqual(undefined);
				expect(form.email.$valid).toBe(false);
			}
		});
		
		it('should match emails', function(){			
			form.email.$setViewValue(validEmails[0]);
			form.confirmEmail.$setViewValue(validEmails[0]);
			expect(form.email.$valid).toBe(true);
			expect(form.confirmEmail.$valid).toBe(true);
						
			form.confirmEmail.$setViewValue(validEmails[1]);
			form.email.$setViewValue(validEmails[1]);
			expect(form.email.$valid).toBe(true);
			expect(form.confirmEmail.$valid).toBe(true);
		});
		
		it('should NOT match emails', function(){			
			form.email.$setViewValue(validEmails[0]);
			form.confirmEmail.$setViewValue(validEmails[1]);
			expect(form.email.$valid).toBe(true);
			expect(form.confirmEmail.$valid).toBe(false);
			expect($rootScope.user.confirmEmail).toEqual(validEmails[1]);
						
			form.confirmEmail.$setViewValue(invalidEmails[0]);
			form.email.$setViewValue(validEmails[1]);
			expect(form.email.$valid).toBe(true);
			expect(form.confirmEmail.$valid).toBe(false);
			expect($rootScope.user.confirmEmail).toEqual(invalidEmails[0]);
			
			form.email.$setViewValue(invalidEmails[4]);
			form.confirmEmail.$setViewValue(invalidEmails[4]);
			expect(form.email.$valid).toBe(false);
			expect(form.confirmEmail.$valid).toBe(false);
			expect($rootScope.user.confirmEmail).toEqual(invalidEmails[4]);
			
			form.email.$setViewValue(invalidEmails[4]);
			form.confirmEmail.$setViewValue(validEmails[1]);
			expect(form.email.$valid).toBe(false);
			expect(form.confirmEmail.$valid).toBe(false);
			expect($rootScope.user.confirmEmail).toEqual(validEmails[1]);
		});

	});
});