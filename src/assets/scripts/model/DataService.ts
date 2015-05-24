/// <reference path="../_declare/require.d.ts" />
/// <reference path="../_declare/lodash.d.ts" />
/// <amd-dependency path="lodash" />

import $ = require("jquery");
var _ = require('lodash');

function DataService(endpoint){
    function firstLetterToLowerCase(name){
        return name[0].toLowerCase()+name.slice(1);
    }

    this.getCustomers = function( callback){
        return $.ajax({
            url:endpoint.getAllCustomers,
            dataType: "xml",
            }).done(function (data, textStatus, jqXHR) {

            if (!callback){
                return;
            }
            var xmlData = $.parseXML(data);
            var retval = _.map($(data).find('Customer'), function (xmlCustomer){
                return _.reduce($(xmlCustomer).children(), function(memo, next){
                    var n = $(next);
                    memo[firstLetterToLowerCase(n.prop('tagName'))] = n.text();
                    return memo;
                },{});
            });
            callback(retval);
        });
        // in order to subscribe to failure, just add .fail(function ...) to the returned promise
    };
    this.saveCustomer = function (model, callback) {
          return $.ajax({
              url:endpoint.saveCustomer, 
              method:'POST', 
              data: model
            }).done(function (data, textStatus, jqXHR) {

            if (!callback){
                return;
            }

            callback(data);
        });
        // in order to subscribe to failure, just add .fail(function ...) to the returned promise
    };
}
export = DataService;
