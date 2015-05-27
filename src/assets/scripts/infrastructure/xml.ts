/// <reference path="../_declare/require.d.ts" />
import _ = require("lodash");

function xmlToString(xmlData) {
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

export = {
  toString: xmlToString
};