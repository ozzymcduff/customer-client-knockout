/// <reference path="../_declare/require.d.ts" />
/// <reference path="../_declare/bluebird.d.ts" />
/// <reference path="../_declare/jquery.d.ts" />

module Demo.Infrastructure {

    export interface IAjax {
        send(settings: any): Promise<any>
    }
    export class Ajax implements IAjax {
        send(settings: any) {
            return Promise.cast($.ajax(settings));
        }
    }

    export class Xml {
        static toString(xmlData:any) {
            if (_.isString(xmlData)) {
                return xmlData;
            }
            var xmlString:string;
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