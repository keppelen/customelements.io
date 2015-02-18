'use strict';

describe('Directive: elements', function () {

  // load the directive's module
  beforeEach(module('customelementsioApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<elements></elements>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the elements directive');
  }));
});
