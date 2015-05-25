/* global define, describe, it, before */
///<reference path="../assets/scripts/_declare/mocha.d.ts"/>
///<reference path="../assets/scripts/_declare/chai.d.ts"/>

'use strict';

function xmlToString(xmlData) {
  var xmlString;
  //IE
  if ('ActiveXObject' in window && window['ActiveXObject']) {
    xmlString = xmlData.xml;
  }
  // code for Mozilla, Firefox, Opera, etc.
  else {
    xmlString = (new XMLSerializer()).serializeToString(xmlData);
  }
  return xmlString;
}
define(['require', 'exports', 'chai', 'model/DataService', 'jquery'], function tests(require, exports, chai, DataService) {
  var expect = chai.expect;
  var $ = require('jquery');
  describe('DataService', function() {
    describe('getCustomers', function() {
      var service;
      before(function() {
        service = new DataService({
          getAllCustomers: 'tests/GetAllCustomers.xml'
        }, {
          send: $.ajax
        });
      });
      it('should return parsed as json', function(done) {
        service.getCustomers().then(function(data) {
          expect(data.length).to.equal(1);
          var customerJson = data[0];
          expect(customerJson).to.deep.equal({
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
      before(function() {
        service = new DataService({
          saveCustomer: 'tests/SaveCustomer.xml'
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
        expect(sent.length).to.equal(1);
        expect(xmlToString(sent[0].data)).to.equal(expectedData);
        done();
      });
    });
  });
});