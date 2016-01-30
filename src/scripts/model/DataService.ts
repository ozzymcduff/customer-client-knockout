/// <reference path="../../../_declare/require.d.ts" />
/// <reference path="../../../_declare/lodash.d.ts" />
/// <reference path="../../../_declare/jquery.d.ts" />
/// <reference path="../../../_declare/bluebird.d.ts" />
/// <amd-dependency path="lodash" />
/// <amd-dependency path="bluebird" />
var $ = require("jquery");
var _ = require('lodash');
var Promise = require('bluebird');
import {Xml} from "Infrastructure"

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

export class DataService{
    private endpoint;
    private ajax;
    constructor(endpoint, ajax){
        this.endpoint = endpoint;
        this.ajax = ajax;
    }
    getCustomers():Promise<Array<any>>{
        return Promise.resolve(this.ajax.send({
            url:this.endpoint.getAllCustomers,
            dataType: "xml",
            })).then(function(data) {
                return parseXmlCustomers(data);
            });
        // in order to subscribe to failure, just add .catch(function ...) to the returned promise
    };
    saveCustomer (model: any) {
        var serialized = Xml.toString( toXmlCustomer(model));
        return Promise.resolve(this.ajax.send({
            dataType: "xml",
            url:this.endpoint.saveCustomer, 
            method:'POST', 
            data: serialized
        })).then(function(){
            return { data : serialized };
        });
        // in order to subscribe to failure, just add .catch(function ...) to the returned promise
    };
}

