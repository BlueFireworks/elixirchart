(function() {
'use strict';

  module.export = angular.module('mainApp.controllers')
    .controller('donutChartCtrl', donutChartCtrl);
  
  function donutChartCtrl($scope, chartDataService){

    $scope.selectX = true;
    $scope.selectY = true;
    $scope.updateY = chartDataService.updateY;
    $scope.updateX = chartDataService.updateX;
    chartDataService.yField = 'y';
    chartDataService.xField = 'key';
    chartDataService.scope = $scope;
    chartDataService.updateField = updateMethod;
    
    $scope.chartData = chartDataService.initValues({'key': 'pie', 'y': 1});
 
    function updateMethod(data, field) {
      for(var i = 0; i < data.length; ++i) {
        $scope.chartData[i][field] = data[i];
      }
    }

    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 450,
            donut: true,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,
            pie: {
                startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
            },
            transitionDuration: 500,
            legend: {
                margin: {
                    top: 5,
                    right: 140,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };
  }
})();

