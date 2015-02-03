'use strict';
(function(){

  var _ = require('lodash');

  module.export = angular.module('mainApp.controllers')
  .controller('lineChartCtrl', lineChartCtrl);
  
  function lineChartCtrl($scope, $location, chartDataService) {
    
    $scope.showX = true;
    $scope.showY = true;
    $scope.showY2 = true;
    $scope.updateField = chartDataService.updateField;
    chartDataService.xField = 'x';
    chartDataService.yField = 'y';
    chartDataService.scope = $scope;
    chartDataService.update = update;

    $scope.chartData = [
    {
      "key": "y1",  color: '#2ca02c',
      "values": chartDataService.initValues({'x': 0, 'y': 0}) 
    },
    {
      "key": "y2",  color: '#ff7f0e',
      "values": chartDataService.initValues({'x': 0, 'y': 0}) 
    }
    ];

    chartDataService.loadParams();
    
    function update(data, index, field) {
      for(var i = 0; i < data.length; ++i) {
        if(field === 'x'){
          $scope.chartData[1].values[i][field] = data[i];
        }
        $scope.chartData[index].values[i][field] = data[i];
      }
    }

    $scope.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'xAxis'
        },
        yAxis: {
          axisLabel: 'yAxis'
        }
      }
    }; 
  }
})();
