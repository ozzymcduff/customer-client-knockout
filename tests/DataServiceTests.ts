/* global define, describe, it, before */
///<reference path="../_declare/jasmine.d.ts"/>
///<reference path="../app/model/dataService.ts"/>
///<reference path="../app/infrastructure.ts"/>
'use strict';
describe('DataService', function() {
    describe('getCustomers', function() {
        var service;
        beforeEach(function() {
            service = new Demo.Model.DataService({
                getAllCustomers: '/scripts/tests/GetAllCustomers.xml'
            }, {
                    send: $.ajax
                });
        });
        it('should return parsed as json', function(done) {
            service.getCustomers().then(function(data) {
                expect(data.length).toEqual(1);
                var customerJson = data[0];
                expect(customerJson).toEqual({
                    accountNumber: '0',
                    addressCity: null,
                    addressCountry: null,
                    addressStreet: null,
                    firstName: 'Oskar',
                    gender: 'Male',
                    lastName: 'Gewalli',
                    pictureUri: null
                });
                done();
            });
        });
    });
    describe('saveCustomer', function() {
        var service;
        var sent = [];
        beforeEach(function() {
            service = new Demo.Model.DataService({
                saveCustomer: './SaveCustomer.xml'
            }, {
                    send: function(data) {
                        sent.push(data);
                        //return {};
                    }
                });
        });
        it('should send xml', function(done) {
            service.saveCustomer({
                accountNumber: '0',
                addressCity: null,
                addressCountry: null,
                addressStreet: null,
                firstName: 'Oskar',
                gender: 'Male',
                lastName: 'Gewalli',
                pictureUri: null
            });
            var expectedData = '<Customer><AccountNumber>0</AccountNumber><AddressCity i:nil="true"/><AddressCountry i:nil="true"/><AddressStreet i:nil="true"/><FirstName>Oskar</FirstName><Gender>Male</Gender><LastName>Gewalli</LastName><PictureUri i:nil="true"/></Customer>';
            expect(sent.length).toEqual(1);
            expect(Demo.Infrastructure.Xml.toString(sent[0].data)).toEqual(expectedData);
            done();
        });
    });
});

