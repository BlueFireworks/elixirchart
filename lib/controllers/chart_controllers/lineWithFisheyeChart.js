'use strict';
(function(){

  var _ = require('lodash');

  module.export = angular.module('mainApp.controllers')
  .controller('lineWithFisheyeChartCtrl', lineWithFisheyeChartCtrl);

  function lineWithFisheyeChartCtrl($scope, chartDataService) {

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
      "values": chartDataService.initValues({'x': null, 'y': null}) 
    },
    {
      "key": "y2",  color: '#ff7f0e',
      "values": chartDataService.initValues({'x': null, 'y': null}) 
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
        type: 'lineWithFisheyeChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 60,
          left: 50
        },
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          tickFormat: function(d){
            return d3.format(',.2f')(d);
          },
          axisLabelDistance: 35
        }
      }
    };
  }

})();

