(function() {
  'use strict';

  module.export = angular.module('mainApp.controllers')
  .controller('pieChartCtrl', pieChartCtrl);
  
  function pieChartCtrl($scope, chartDataService){

    $scope.showX = false;
    $scope.showY = true;
    $scope.showY2 = false;
    $scope.showLabel = true;
    $scope.updateField = chartDataService.updateField;
    $scope.toogleOptions = chartDataService.toogleOptions;
    chartDataService.labelField = 'key';
    chartDataService.yField = 'y';
    chartDataService.scope = $scope;
    chartDataService.update = update;
    
    $scope.chartData = chartDataService.initValues({'key': 'label', 'y': 1});
    
    chartDataService.loadParams();
    
    function update(data, index, field) {
      for(var i = 0; i < data.length; ++i) {
        $scope.chartData[i][field] = data[i];
      }
    }

    $scope.options = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        transitionDuration: 500,
        labelThreshold: 0.01,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    };
  }

})();
