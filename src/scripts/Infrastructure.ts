/// <reference path="../../_declare/require.d.ts" />
/// <reference path="../../_declare/jquery.d.ts" />
/// <amd-dependency path="bluebird" />
/// <amd-dependency path="lodash" />

import Promise = require("bluebird");
import $ = require("jquery");

var _ = require("lodash");

export interface IAjax{
    send(settings:JQueryAjaxSettings):Promise<any>
}
export class Ajax implements IAjax{
        send(settings){
        return Promise.resolve($.ajax(settings));
    }
}

export module Xml{
    export function toString(xmlData) {
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

