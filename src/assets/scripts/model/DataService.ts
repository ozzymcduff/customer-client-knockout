/// <reference path="../_declare/require.d.ts" />
/// <reference path="../_declare/lodash.d.ts" />
/// <reference path="../_declare/jquery.d.ts" />
/// <reference path="../_declare/bluebird.d.ts" />
/// <amd-dependency path="lodash" />
/// <amd-dependency path="bluebird" />
import $ = require("jquery");
var _ = require('lodash');
var Promise = require('bluebird');
  
function DataService(endpoint, ajax){
    function firstLetterToLowerCase(name){
        return name[0].toLowerCase()+name.slice(1);
    }
    function firstLetterToUpperCase(name){
        return name[0].toUpperCase()+name.slice(1);
    }
    function parseXmlCustomers(data){
        return _.map($(data).find('Customer'), function (xmlCustomer){
            return _.reduce($(xmlCustomer).children(), function(memo, next){
                var n = $(next);
                memo[firstLetterToLowerCase(n.prop('tagName'))] = n.attr('i:nil') === 'true'? null : n.text();
                return memo;
            },{});
        });
    }
    var doc = document.implementation.createDocument(null, null, null);
    function toXmlCustomer(data){
        var properties = Object.getOwnPropertyNames(data);
        return _.reduce(properties, function(memo,property){
            var propertyElement = doc.createElement(firstLetterToUpperCase(property));
            var value = data[property];
            if (value !== null){
                propertyElement.appendChild(doc.createTextNode(value));
            }else{
                propertyElement.setAttribute('i:nil','true');
            }
            memo.appendChild(propertyElement);
            return memo;
        },doc.createElement("Customer"));
    }

    this.getCustomers = function() : Promise<Array<Object>>{
        return Promise.resolve(ajax.send({
            url:endpoint.getAllCustomers,
            dataType: "xml",
            })).then(function(data) {
                return parseXmlCustomers(data);
            });
        // in order to subscribe to failure, just add .catch(function ...) to the returned promise
    };
    this.saveCustomer = function (model) {
        var serialized = toXmlCustomer(model);
        return Promise.resolve(ajax.send({
             dataType: "xml",
             url:endpoint.saveCustomer, 
             method:'POST', 
             data: serialized
        })).then(function(){
             return { data : serialized };
         });
        // in order to subscribe to failure, just add .catch(function ...) to the returned promise
    };
}
export = DataService;
