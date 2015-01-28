(function(){  
"use strict";

  var _ = require('lodash');
  module.exports = angular.module('elixirchart')
                   .factory('chartDataService', chartDataService);
  
  function chartDataService() {
    
    var vm = this;
    vm.updateX = updateX;
    vm.updateY = updateY;
    vm.initValues = initValues;

    function updateX(dataX) {
      var getKey = _.property(dataX);
      var xseleted = _.map(vm.scope.data, getKey);
      vm.updateField(xseleted, vm.xField);
    }

    function updateY(dataY) {
      var getKey = _.property(dataY);
      var yseleted = _.map(vm.scope.data, getKey);
      if(!isNaN(yseleted[0])) {
        vm.updateField(yseleted, vm.yField);
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
