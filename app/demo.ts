/// <reference path='./infrastructure.ts'/>
/// <reference path='./viewModel/mainViewModel.ts' />
/// <reference path='./model/DataService.ts' />

///<reference path='../_declare/external.d.ts'/>
///<reference path='../_declare/lodash.d.ts'/>
///<reference path='../_declare/knockout.d.ts'/>

module Demo {
    var _ = require("lodash");
    var ko = require("knockout");
    var endpoint = require("json!data/endpoint.json");

    export class App{
        private _mainVm: Demo.ViewModel.MainViewModel;
        constructor(){
            var ajax = new Demo.Infrastructure.Ajax();
            var svc = new Demo.Model.DataService(endpoint, ajax);
            this._mainVm = new Demo.ViewModel.MainViewModel(svc);
        }
        init (node):void {
            ko.applyBindings(this._mainVm, node);
            this._mainVm.refreshCommand();
        }
    }
}