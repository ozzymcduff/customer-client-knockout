/// <reference path="../_declare/require.d.ts" />
/// <reference path="../_declare/bluebird.d.ts" />
/// <reference path="../_declare/jquery.d.ts" />

module Demo.Infrastructure {
    var $ = require("jquery");
    var Promise = require("bluebird");

    export interface IAjax {
        send(settings: JQueryAjaxSettings): Promise<any>
    }
    export class Ajax implements IAjax {
        send(settings) {
            return Promise.resolve($.ajax(settings));
        }
    }

    export class Xml {
        static toString(xmlData) {
            if (_.isString(xmlData)) {
                return xmlData;
            }
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
    }
}