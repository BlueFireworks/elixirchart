'use strict';
(function() {
  
  module.export = angular.module('mainApp.controllers')

  .controller('scatterChartCtrl', scatterChartCtrl);
  
  function scatterChartCtrl($scope, chartDataService){
    var shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'];
    
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
      "key": "y1", "values": initValues()
    },
    {
      "key": "y2",  color: 'rgb(214, 39, 40)', "values": initValues()
    },
    ];

    
    chartDataService.loadParams();

    function initValues() {
      var arr = [];
      var len = $scope.data.length;
      for (var i = 0; i < len; i++) {
        arr.push({
          x: 0,
          y: 0,
          size: Math.random(),
          shape: shapes[i % 6]
        });
      }
      return arr;
    }

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
        type: 'scatterChart',
        height: 450,
        scatter: {
          onlyCircles: false
        },
        showDistX: true,
        showDistY: true,
        tooltipContent: function(key) {
          return '<h3>' + key + '</h3>';
        },
        transitionDuration: 350,
        xAxis: {
          axisLabel: 'X Axis',
          tickFormat: function(d){return d;}
        },
        yAxis: {
          axisLabel: 'Y Axis',
          tickFormat: function(d){return d;},
          axisLabelDistance: 30
        }
      }
    };
  }
})();
