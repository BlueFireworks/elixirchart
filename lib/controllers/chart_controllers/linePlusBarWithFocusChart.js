'use strict';
(function(){

  var _ = require('lodash');

  module.export = angular.module('mainApp.controllers')

  .controller('linePlusBarWithFocusChartCtrl', linePlusBarWithFocusChartCtrl);

  function linePlusBarWithFocusChartCtrl($scope, chartDataService) {

    $scope.showX = true;
    $scope.showY = true;
    $scope.showY2 = true;
    $scope.updateField = chartDataService.updateField;
    $scope.toogleOptions = chartDataService.toogleOptions;
    chartDataService.xField = 0;
    chartDataService.yField = 1;
    chartDataService.scope = $scope;
    chartDataService.update = update;

    $scope.chartData = [
    {"key": "y1", "bar": true, "values": chartDataService.initValues([0, 0])  },
    {"key": "y2", "values": chartDataService.initValues([0, 0])},
    ].map(function(series) {
      series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
      return series;
    });

    
    chartDataService.loadParams();

    function update(data, index, field) {
      for(var i = 0; i < data.length; ++i) {
        if(field === 0){
          $scope.chartData[1].values[i][field] = data[i];
        }
        $scope.chartData[index].values[i][field] = data[i];
      }
    }
    $scope.options = {
      chart: {
        type: 'linePlusBarWithFocusChart',
        height: 500,
        margin: {
          top: 30,
          right: 75,
          bottom: 50,
          left: 75
        },
        bars: {
          forceY: [0]
        },
        bars2: {
          forceY: [0]
        },
        color: ['#2ca02c', 'darkred'],
        x: function(d,i) { return i },
        y: function(d) { return d[1] },
        xAxis: {
          axisLabel: 'X Axis',
          tickFormat: function(d) {
           return d;
         }
       },
       x2Axis: {
        tickFormat: function(d) {
          
          return d;
        },
        showMaxMin: false
      },
      y1Axis: {
        axisLabel: 'Y1 Axis',
        tickFormat: function(d){
          return d;
        }
      },
      y2Axis: {
        axisLabel: 'Y2 Axis',
        tickFormat: function(d) {
          return d;
        }
      },
      y3Axis: {
        tickFormat: function(d){
          return d;
        }
      },
      y4Axis: {
        tickFormat: function(d) {
          return d;
        }
      }
    }
  };

}
})();
