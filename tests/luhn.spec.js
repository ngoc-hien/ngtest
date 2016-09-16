describe("ngtest module testapp", function() {
	// load the module testapp	
	var $compile, $rootScope, element, form;
	beforeEach(angular.mock.module('testapp'));
	
	describe('Luhn-check social security number', function() {
		beforeEach(inject(function(_$compile_, _$rootScope_){			
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			var html = angular.element('<form name="regForm"> '
				+ '<input name="ssn" type="text" ng-model="user.ssn" ng-pattern="/^[0-9]{10}$/" maxlength="10" my-luhn-checked required /> '
				+ '</form>');
			$rootScope.user = {ssn: null};
			element = $compile(html)($rootScope);
			$rootScope.$digest();
			form = $rootScope.regForm;			
		}));
		
		it('should be VALID social number', function(){
			var validSsns = ['8201213785', '8206267653', '1304100108'];
			for (var i in validSsns) {
				form.ssn.$setViewValue(validSsns[i]);				
				expect($rootScope.user.ssn).toEqual(validSsns[i]);
				expect(form.ssn.$valid).toBe(true);
			}
		});
		
		it('should be INVALID social number', function(){
			var invalidSsns = ['', '8201213789', '82012137851', '198201213785', 'yymmddxxxx'];
			var scopessn = [undefined, '8201213789', undefined, undefined, undefined];
			for (var i in invalidSsns) {
				form.ssn.$setViewValue(invalidSsns[i]);
				//console.log('invalid', $rootScope.user.ssn, form.ssn.$valid);
				expect($rootScope.user.ssn).toEqual(scopessn[i]);
				expect(form.ssn.$valid).toBe(false);
			}
		});
	});
});