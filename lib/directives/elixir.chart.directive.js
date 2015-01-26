(function(){
  'use strict';
  module.export = angular.module('elixirchart')
                  .directive('elixirChart', elixirChartDirective);

  var elixirChartController = require('../controllers/elixir.chart.controller');

  function elixirChartDirective() {
    var directive = {
        require: '?ngModel',
        restrict: 'E',
        scope: {
          data: "=",
          params: "="
        },
        controller: elixirChartController,
        controllerAs: 'chart',
        template: '<div class="content" ng-view></div>'
    };
    return directive;
  }

})();
