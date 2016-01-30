///<reference path='../../_declare/external.d.ts'/>
///<reference path='../../_declare/lodash.d.ts'/>
///<reference path='../../_declare/knockout.d.ts'/>
/// <amd-dependency path="lodash" />
/// <amd-dependency path="jquery" />
/// <amd-dependency path="template!../templates/MainPage.html" />
/// <amd-dependency path="template!../templates/Customer.html" />
/// <amd-dependency path="json!data/endpoint.json" />

var endpoint = require("json!data/endpoint.json");
import _ = require("lodash");
import ko = require("knockout");
import {Ajax} from "Infrastructure"
import {MainViewModel as MVM} from "viewModel/MainViewModel"
import {DataService} from "model/DataService"
export class App{

    private _mainVm: MVM;
    constructor(){
        var ajax = new Ajax();
        var svc = new DataService(endpoint, ajax);
        this._mainVm = new MVM(svc);
    }
    init (node):void {
        ko.applyBindings(this._mainVm, node);
        this._mainVm.refreshCommand();
    }
}