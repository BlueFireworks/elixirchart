'use strict';
(function() {

  module.export = angular.module('mainApp.controllers')
  .controller('lineWithFocusChartCtrl', lineWithFocusChartCtrl);
  
  function lineWithFocusChartCtrl($scope, chartDataService){
    
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
      "key": "y1", "values": chartDataService.initValues({'x': null, 'y': null}) 
    },
    {
      "key": "y2", color: '#ff7f0e', "values": chartDataService.initValues({'x': null, 'y': null})
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
        type: 'lineWithFocusChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 60,
          left: 40
        },
        transitionDuration: 500,
        xAxis: {
          axisLabel: 'X Axis',
          tickFormat: function(d){
            return d;
          }
        },
        x2Axis: {
          tickFormat: function(d){
            return d;
          }
        },
        yAxis: {
          axisLabel: 'Y Axis',
          tickFormat: function(d){
            return d;
          },
          rotateYLabel: false
        },
        y2Axis: {
          tickFormat: function(d){
            return d;
          }
        }

      }
    };
  }
})();

