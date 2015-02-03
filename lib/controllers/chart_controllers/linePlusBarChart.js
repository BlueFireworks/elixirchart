'use strict';
(function(){

  var _ = require('lodash');

  module.export = angular.module('mainApp.controllers')

  .controller('linePlusBarChartCtrl', linePlusBarChartCtrl);

  function linePlusBarChartCtrl($scope, chartDataService) {

    $scope.showX = true;
    $scope.showY = true;
    $scope.showY2 = true;
    $scope.updateField = chartDataService.updateField;
    chartDataService.xField = 0;
    chartDataService.yField = 1;
    chartDataService.scope = $scope;
    chartDataService.update = update;
    
    $scope.chartData = [
    {"key": "y1", "bar": true,"values": chartDataService.initValues([null, null])},
    {"key": "y2", color: '#ff7f0e', "values": chartDataService.initValues([null, null])},
    ];
    

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
        type: 'linePlusBarChart',
        height: 450,
        margin : {
          top: 30,
          right: 75,
          bottom: 50,
          left: 75
        },
        x: function(d, i){return i;},
        y: function(d){return d[1];},
        transitionDuration: 250,
        xAxis: {
          axisLabel: 'X Axis',
          showMaxMin: false,
          tickFormat: function(d) {
            return d;
          },
          staggerLabels: true
        },
        y1Axis: {
          axisLabel: 'Y1 Axis',
          tickFormat: function(d){return d}
        },
        y2Axis: {
          axisLabel: 'Y2 Axis',
          tickFormat: function(d) { return d}
        }
      }
    };

  }
})();