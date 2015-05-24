///<reference path='_declare/external.d.ts'/>
///<reference path='_declare/lodash.d.ts'/>
///<reference path='_declare/knockout.d.ts'/>
///<reference path="model/DataService.ts"/>
///<reference path="viewModel/MainViewModel.ts"/>
///<reference path="infrastructure/ajax"/>

/// <amd-dependency path="template!../templates/MainPage.html" />
/// <amd-dependency path="template!../templates/Customer.html" />
/// <amd-dependency path="model/DataService" />
/// <amd-dependency path="viewModel/MainViewModel" />
/// <amd-dependency path="json!data/endpoint.json" />
/// <amd-dependency path="infrastructure/ajax" />
declare var require: (moduleId: string) => any;

import DataService = require("model/DataService");
import MainViewModel = require("viewModel/MainViewModel");
import ajax = require("infrastructure/ajax");
import _ = require("lodash");
import ko = require("knockout");
var endpoint = require("json!data/endpoint.json");
/**
 * YUIDoc_comment
 *
 * @class TestApp
 * @module namespace
 * @constructor
 **/
function MvvmDemo2App() {
    var svc = new DataService(endpoint, ajax);
    var mainVm = new MainViewModel(svc);
    /**
     * @overridden Base.createChildren
     */
    this.init = function(node):void {
        ko.applyBindings(mainVm, node);
        mainVm.refreshCommand();
    }

}

export = MvvmDemo2App;