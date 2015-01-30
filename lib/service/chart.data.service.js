(function(){  
"use strict";

  var _ = require('lodash');
  module.exports = angular.module('elixirchart')
                   .factory('chartDataService', chartDataService);
  
  function chartDataService() {
    
    var vm = this;
    vm.updateField = updateField;
    vm.initValues = initValues;

    function updateField(key, field) {
      var getKey = _.property(key);
      var seleted = _.map(vm.scope.data, getKey);
      
      if(field === 'x') {
        vm.update(seleted, 0, vm.xField);
      }
      else if(field === 'y') {
        vm.update(seleted, 0, vm.yField);
      }
      else if (field === 'y2') {
        vm.update(seleted, 1, vm.yField);
      } 
      else if (field === 'label') {
        vm.update(seleted, 0, vm.labelField);
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
    return this;
  }

})();
