describe("ngtest module testapp", function() {
	// load the module testapp	
	var $compile, $rootScope, element, form;
	beforeEach(angular.mock.module('testapp'));
	
	describe('Validate password', function() {
		beforeEach(inject(function(_$compile_, _$rootScope_){			
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			var html = angular.element('<form name="regForm"> '
				+ '<input name="password" type="password" ng-model="user.password" ng-minlength="8" ng-pattern="/^[a-zA-Z0-9]+$/" required /> '
				+ '<input name="confirmPassword" type="password" ng-model="user.confirmPassword" my-confirmed="user.confirmPassword && user.password === user.confirmPassword" required /> '
				+ '</form>');
			$rootScope.user = {password: null, confirmPassword: null};
			element = $compile(html)($rootScope);
			$rootScope.$digest();
			form = $rootScope.regForm;			
		}));  
		// test cases - testing for success
		var validPwds = [
			'testpass', '12345678',	't1e2s3t456', '11111111'
		];
		// test cases - testing for failure
		var invalidPwds = [
			'1234567', '1234567 ',
			'abc pwd123','1234@.pwd', ' '
		]; 
		
		it('should be VALID passwords', function() {								
			for (var i in validPwds) {
				form.password.$setViewValue(validPwds[i]);				
				expect($rootScope.user.password).toEqual(validPwds[i]);
				expect(form.password.$valid).toBe(true);
			}			
		});
		
		it('should be INVALID passwords', function() {								
			for (var i in validPwds) {
				form.password.$setViewValue(invalidPwds[i]);				
				expect($rootScope.user.password).toEqual(undefined);
				expect(form.password.$valid).toBe(false);
			}			
		});
		
		it('should match passwords', function(){			
			form.password.$setViewValue(validPwds[0]);
			form.confirmPassword.$setViewValue(validPwds[0]);
			expect(form.password.$valid).toBe(true);
			expect(form.confirmPassword.$valid).toBe(true);
						
			form.confirmPassword.$setViewValue(validPwds[1]);
			form.password.$setViewValue(validPwds[1]);
			expect(form.password.$valid).toBe(true);
			expect(form.confirmPassword.$valid).toBe(true);
		});
		
		it('should NOT match passwords', function(){			
			form.password.$setViewValue(validPwds[0]);
			form.confirmPassword.$setViewValue(validPwds[1]);
			expect(form.password.$valid).toBe(true);
			expect(form.confirmPassword.$valid).toBe(false);
						
			form.confirmPassword.$setViewValue(invalidPwds[0]);
			form.password.$setViewValue(validPwds[1]);
			expect(form.password.$valid).toBe(true);
			expect(form.confirmPassword.$valid).toBe(false);
			
			form.password.$setViewValue(invalidPwds[4]);
			form.confirmPassword.$setViewValue(invalidPwds[4]);
			expect(form.password.$valid).toBe(false);
			expect(form.confirmPassword.$valid).toBe(false);
			
			form.password.$setViewValue(invalidPwds[4]);
			form.confirmPassword.$setViewValue(validPwds[1]);
			expect(form.password.$valid).toBe(false);
			expect(form.confirmPassword.$valid).toBe(false);
		});

	});
});