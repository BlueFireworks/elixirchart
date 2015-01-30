'use strict';
(function(){

  var _ = require('lodash');

  module.export = angular.module('mainApp.controllers')

  .controller('multiBarChartCtrl', multiBarChartCtrl);

  function multiBarChartCtrl($scope, chartDataService) {

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
      "key": "y1",  
      "values": chartDataService.initValues({'x': null, 'y': null}) 
    },
    {
      "key": "y2",  color: 'rgb(214, 39, 40)',
      "values": chartDataService.initValues({'x': null, 'y': null}) 
    }
    ];

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
        type: 'multiBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 60,
          left: 45
        },
        clipEdge: true,
        staggerLabels: true,
        transitionDuration: 500,
        Ustacked: true,
        xAxis: {
          axisLabel: 'X Axis',
          showMaxMin: false,
          tickFormat: function(d){
            return d;
          }
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: 40,
          tickFormat: function(d){
            return d;
          }
        }
      }
    };
  }

})(); 