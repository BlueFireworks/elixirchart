'use strict';
(function(){

  module.export = angular.module('mainApp.controllers')
    .controller('historicalBarChartCtrl', historicalBarChartCtrl)
  
    function historicalBarChartCtrl($scope, chartDataService){

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
              type: 'historicalBarChart',
              height: 450,
              margin : {
                  top: 20,
                  right: 20,
                  bottom: 60,
                  left: 50
              },
              x: function(d){return d[0];},
              y: function(d){return d[1];},
              showValues: true,
              valueFormat: function(d){
                  return d3.format(',.1f')(d);
              },
              transitionDuration: 500,
              xAxis: {
                  axisLabel: 'X Axis',
                  tickFormat: function(d) {
                      return d;
                  },
                  rotateLabels: 50,
                  showMaxMin: false
              },
              yAxis: {
                  axisLabel: 'Y Axis',
                  axisLabelDistance: 35,
                  tickFormat: function(d){
                      return d; 
                  }
              }
          }
      };
    }

})();
