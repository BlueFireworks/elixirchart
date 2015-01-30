'use strict';
(function(){

  module.export = angular.module('mainApp.controllers')

  .controller('cumulativeLineChartCtrl', cumulativeLineChartCtrl);
  
  function cumulativeLineChartCtrl($scope, chartDataService){

      $scope.selectX = true;
      $scope.selectY = true;
      $scope.updateX = chartDataService.updateX;
      $scope.updateY = chartDataService.updateY;
      chartDataService.xField = 0;
      chartDataService.yField = 1;
      chartDataService.scope = $scope;
      chartDataService.updateField = updateMethod;
      
      $scope.chartData = [{"bar": true, "key": "", 
        "values": chartDataService.initValues([null, null])}];
   
      function updateMethod(data, field) {
        for(var i = 0; i < data.length; ++i) {
          $scope.chartData[0].values[i][field] = data[i];
        }
      }

    
      $scope.options = {
        chart: {
            type: 'cumulativeLineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 65
            },
            x: function(d){ return d[0]; },
            y: function(d){ return d[1]; },
            average: function(d) { return d.mean/100; },
            useInteractiveGuideline: true,
            xAxis: {
                axisLabel: 'X Axis',
                showMaxMin: false
            },

            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: 20
            }
        }
    };
  }
})();
