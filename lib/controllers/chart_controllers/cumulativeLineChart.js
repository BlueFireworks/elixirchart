'use strict';
(function(){

  module.export = angular.module('mainApp.controllers')

  .controller('cumulativeLineChartCtrl', cumulativeLineChartCtrl);
  
  function cumulativeLineChartCtrl($scope, chartDataService){

      $scope.showX = true;
      $scope.showY = true;
      $scope.updateField = chartDataService.updateField;
      chartDataService.xField = 0;
      chartDataService.yField = 1;
      chartDataService.scope = $scope;
      chartDataService.update = update;
      
      $scope.chartData = [{"bar": true, "key": "", 
        "values": chartDataService.initValues([null, null])}];
   
      function update(data, field) {
        for(var i = 0; i < data.length; ++i) {
        	console.log(111);
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
