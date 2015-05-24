/// <reference path="../_declare/require.d.ts" />
/// <reference path="../_declare/lodash.d.ts" />
/// <reference path="../_declare/jquery.d.ts" />
/// <reference path="../_declare/bluebird.d.ts" />
/// <amd-dependency path="lodash" />
/// <amd-dependency path="bluebird" />
import $ = require("jquery");
var _ = require('lodash');
var Promise = require('bluebird');
  
function DataService(endpoint){
    function firstLetterToLowerCase(name){
        return name[0].toLowerCase()+name.slice(1);
    }
    function parseXmlCustomers(data){
        return _.map($(data).find('Customer'), function (xmlCustomer){
            return _.reduce($(xmlCustomer).children(), function(memo, next){
                var n = $(next);
                memo[firstLetterToLowerCase(n.prop('tagName'))] = n.text();
                return memo;
            },{});
        });
    }

    this.getCustomers = function() : Promise<Array<Object>>{
        return Promise.resolve($.ajax({
            url:endpoint.getAllCustomers,
            dataType: "xml",
            })).then(function(data) {
                return parseXmlCustomers(data);
            });
        // in order to subscribe to failure, just add .catch(function ...) to the returned promise
    };
    this.saveCustomer = function (model) {
          return Promise.resolve($.ajax({
              url:endpoint.saveCustomer, 
              method:'POST', 
              data: model
            }));
        // in order to subscribe to failure, just add .catch(function ...) to the returned promise
    };
}
export = DataService;
