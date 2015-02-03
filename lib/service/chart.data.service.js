(function(){  
"use strict";

  var _ = require('lodash');
  module.exports = angular.module('elixirchart')
                   .factory('chartDataService', chartDataService);
  
  function chartDataService($location) {
    
    var vm = this;
    vm.updateField = updateField;
    vm.initValues = initValues;
    vm.loadParams = loadParams;
    vm.toogleOptions = toogleOptions;
    vm.scope = null;

    function updateField(key, field) {
      var getKey = _.property(key);
      var seleted = _.map(vm.scope.data, getKey);
      
      if(field === 'x') {
        vm.update(seleted, 0, vm.xField);
        $location.search('x', key);
      }
      else if(field === 'y') {
        vm.update(seleted, 0, vm.yField);
        $location.search('y', key);
      }
      else if (field === 'y2') {
        vm.update(seleted, 1, vm.yField);
        $location.search('y2', key);
      } 
      else if (field === 'label') {
        vm.update(seleted, 0, vm.labelField);
        $location.search('label', key);
      }
    }

    function initValues(value) {
      var arr = [];
      var len = vm.scope.data.length;
      for (var i = 0; i < len; i++) {
        if(value.constructor == Array) {
          arr.push(value.slice());
        }
        else if(value.constructor == Object) {
          arr.push(_.clone(value));
        }
      }
      return arr;
    }

    function loadParams() {
      var urlObject = $location.search();
      if(urlObject.x) {
        updateField(urlObject.x, 'x');
        vm.scope.dataX = urlObject.x;
      }
      if(urlObject.y) {
        updateField(urlObject.y, 'y');
        vm.scope.dataY = urlObject.y;
      }
      if(urlObject.y2) {
        updateField(urlObject.y2, 'y2');
        vm.scope.dataY2 = urlObject.y2;
      }
      if(urlObject.label) {
        updateField(urlObject.label, 'label');
        vm.scope.label = urlObject.label;
      }
    }

    function toogleOptions() {
      console.log(111);
      vm.scope.showOptions = !vm.scope.showOptions;
    }

    return this;

  }

})();
