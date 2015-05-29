/* global define, describe, it, beforeEach */
///<reference path="../assets/scripts/_declare/jasmine.d.ts"/>
///<reference path="../assets/scripts/viewModel/CustomerViewModel.ts"/>

'use strict';
define(['require', 'exports', 'viewModel/CustomerViewModel'], function tests(require, exports, CustomerViewModel) {
  describe('CustomerViewModel', function() {
    var json, cm;
    beforeEach(function() {
      json = {
        firstName: '<first name not set>',
        lastName: '<last name not set>'
      };
      cm = new CustomerViewModel(json);
    });
    describe('firstName', function() {
      it('should return json firstname', function() {
        expect(cm.firstName).toEqual(json.firstName);
      });
      it('should update json firstname', function() {
        var newName = 'Allan';
        cm.firstName = newName;
        expect(json.firstName).toEqual(newName);
      });
    });
    describe('lastName', function() {
      it('should return json lastName', function() {
        expect(cm.lastName).toEqual(json.lastName);
      });
      it('should update json firstname', function() {
        var newName = 'Lindqvist';
        cm.lastName = newName;
        expect(json.lastName).toEqual(newName);
      });
    });
    describe('isDirty', function() {
      it('should not be dirty by default', function() {
        expect(cm.isDirty).toEqual(false);
      });
      it('should set isDirty after an update', function() {
        var newName = 'Lindqvist';
        cm.lastName = newName;
        expect(cm.isDirty).toEqual(true);
      });
    });
  });
});