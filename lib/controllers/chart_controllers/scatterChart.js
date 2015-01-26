'use strict';
(function() {
  
  module.export = angular.module('mainApp.controllers')

  .controller('scatterChartCtrl', scatterChartCtrl);
  
  function scatterChartCtrl($scope, chartDataService){
    var shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'];
    
    $scope.selectX = true;
    $scope.selectY = true;
    $scope.updateX = chartDataService.updateX;
    $scope.updateY = chartDataService.updateY;
    chartDataService.xField = 'x';
    chartDataService.yField = 'y';
    chartDataService.scope = $scope;
    chartDataService.updateField = updateMethod;
    
    $scope.chartData = [{"key": "", "values": chartDataService.initValues({
                        x: null, 
                        y: null, 
                        size: Math.random(), 
                        shapes: shapes[Math.random() % 6]}) 
                      }];

    function updateMethod(data, field) {
      for(var i = 0; i < data.length; ++i) {
        $scope.chartData[0].values[i][field] = data[i];
      }
    }
    $scope.options = {
        chart: {
            type: 'scatterChart',
            height: 450,
            color: d3.scale.category10().range(),
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
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                }
            },
            yAxis: {
                axisLabel: 'Y Axis',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: 30
            }
        }
    };
  }
})();
