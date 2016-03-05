/// <reference path="../../_declare/require.d.ts" />
/// <reference path="../../_declare/lodash.d.ts" />
/// <reference path="../../_declare/jquery.d.ts" />
/// <reference path="../../_declare/bluebird.d.ts" />

/// <reference path="../infrastructure.ts" />

module Demo.Model {

    function firstLetterToLowerCase(name:string) {
        return name[0].toLowerCase() + name.slice(1);
    }
    function firstLetterToUpperCase(name: string) {
        return name[0].toUpperCase() + name.slice(1);
    }
    function parseXmlCustomers(data:any) {
        return _.map($(data).find('Customer'), (xmlCustomer: any) => {
            return _.reduce($(xmlCustomer).children(), (memo: any, next: any) => {
                let n = $(next);
                memo[firstLetterToLowerCase(n.prop('tagName'))] = n.attr('i:nil') === 'true' ? null : n.text();
                return memo;
            }, {});
        });
    }
    let doc = document.implementation.createDocument(null, null, null);
    function toXmlCustomer(data:any) {
        let properties = Object.getOwnPropertyNames(data);
        return _.reduce(properties, function(memo:any, property:string) {
            let propertyElement = doc.createElement(firstLetterToUpperCase(property));
            let value = data[property];
            if (value !== null) {
                propertyElement.appendChild(doc.createTextNode(value));
            } else {
                propertyElement.setAttribute('i:nil', 'true');
            }
            memo.appendChild(propertyElement);
            return memo;
        }, doc.createElement("Customer"));
    }

    export interface IDataService { 
        getCustomers(): Promise<Array<any>>;
        saveCustomer(model: any): Promise<any>;
    }

    export class DataService implements IDataService {
        private endpoint: any;
        private ajax: Infrastructure.IAjax;
        constructor(endpoint:any, ajax:Infrastructure.IAjax) {
            this.endpoint = endpoint;
            this.ajax = ajax;
        }
        getCustomers(): Promise<Array<any>> {
            return Promise.resolve(this.ajax.send({
                url: this.endpoint.getAllCustomers,
                dataType: "xml",
            })).then(parseXmlCustomers);
            // in order to subscribe to failure, just add .catch(function ...) to the returned promise
        };
        saveCustomer(model: any) {
            let serialized = Demo.Infrastructure.Xml.toString(toXmlCustomer(model));
            return Promise.resolve(this.ajax.send({
                dataType: "xml",
                url: this.endpoint.saveCustomer,
                method: 'POST',
                data: serialized
            })).then(function() {
                return { data: serialized };
            });
            // in order to subscribe to failure, just add .catch(function ...) to the returned promise
        };
    }

}