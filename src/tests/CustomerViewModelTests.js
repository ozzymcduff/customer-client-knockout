/* global describe, it, beforeEach */
'use strict';
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}
define(['require', 'exports', 'chai', 'viewModel/CustomerViewModel'], function tests(require, exports, chai, CustomerViewModel) {
  chai.should();
  describe('CustomerViewModel', function () {
    var json, cm;
    beforeEach(function () {
      json = {
        firstName: '<first name not set>',
        lastName: '<last name not set>'
      };
      cm = new CustomerViewModel(json);
    });
    describe('firstName', function () {
      it('should return json firstname', function () {
        cm.firstName.should.equal(json.firstName);
      });
      it('should update json firstname', function () {
        var newName = 'Allan';
        cm.firstName = newName;
        json.firstName.should.equal(newName);
      });
    });
    describe('lastName', function () {
      it('should return json lastName', function () {
        cm.lastName.should.equal(json.lastName);
      });
      it('should update json firstname', function () {
        var newName = 'Lindqvist';
        cm.lastName = newName;
        json.lastName.should.equal(newName);
      });
    });
    describe('isDirty', function () {
      it('should not be dirty by default', function () {
        cm.isDirty.should.equal(false);
      });
      it('should set isDirty after an update', function () {
        var newName = 'Lindqvist';
        cm.lastName = newName;
        cm.isDirty.should.equal(true);
      });
    });
  });
});