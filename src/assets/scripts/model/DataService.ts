/// <reference path="../_declare/require.d.ts" />

import $ = require("jquery");

function DataService(endpoint){
    this.getCustomers = function( callback){
        return $.ajax({
            url:endpoint.getAllCustomers,
            
            }).done(function (data, textStatus, jqXHR) {

            if (!callback){
                return;
            }

            callback(data);
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
