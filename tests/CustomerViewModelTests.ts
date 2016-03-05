/* global define, describe, it, beforeEach */
///<reference path="../_declare/jasmine.d.ts"/>
///<reference path="../app/viewModel/customerViewModel.ts"/>
'use strict';
describe('CustomerViewModel', function() {
    let json: any, cm: Demo.ViewModel.CustomerViewModel;
    beforeEach(function() {
        json = {
            firstName: '<first name not set>',
            lastName: '<last name not set>'
        };
        cm = new Demo.ViewModel.CustomerViewModel(json);
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
