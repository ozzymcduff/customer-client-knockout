/* global define, describe, it, before */
'use strict';

function xmlToString(xmlData) {
  var xmlString;
  //IE
  if (window.ActiveXObject) {
    xmlString = xmlData.xml;
  }
  // code for Mozilla, Firefox, Opera, etc.
  else {
    xmlString = (new XMLSerializer()).serializeToString(xmlData);
  }
  return xmlString;
}
define(['require', 'exports', 'chai', 'model/DataService', 'jquery'], function tests(require, exports, chai, DataService) {
  chai.should();
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
          data.length.should.equal(1);
          var customerJson = data[0];
          customerJson.should.deep.equal({
            accountNumber: '0',
            addressCity: '',
            addressCountry: '',
            addressStreet: '',
            firstName: 'Oskar',
            gender: 'Male',
            lastName: 'Gewalli',
            pictureUri: ''
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
          addressCity: '',
          addressCountry: '',
          addressStreet: '',
          firstName: 'Oskar',
          gender: 'Male',
          lastName: 'Gewalli',
          pictureUri: ''
        });
        var expectedData = '<Customer><AccountNumber>0</AccountNumber><AddressCity i:nil="true"/><AddressCountry i:nil="true"/><AddressStreet i:nil="true"/><FirstName>Oskar</FirstName><Gender>Male</Gender><LastName>Gewalli</LastName><PictureUri i:nil="true"/></Customer>';
        sent.length.should.equal(1);
        xmlToString(sent[0].data).should.equal(expectedData);
        done();
      });
    });
  });
});