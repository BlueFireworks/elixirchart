'use strict';
(function() {

  module.export = angular.module('mainApp.controllers')
    .controller('lineWithFocusChartCtrl', lineWithFocusChartCtrl);
  
    function lineWithFocusChartCtrl($scope, chartDataService){
      
      $scope.selectX = true;
      $scope.selectY = true;
      $scope.updateX = chartDataService.updateX;
      $scope.updateY = chartDataService.updateY;
      chartDataService.xField = 'x';
      chartDataService.yField = 'y';
      chartDataService.scope = $scope;
      chartDataService.updateField = updateMethod;
      
      $scope.chartData = [{"key": "steam", 
        "values": chartDataService.initValues({'x': null, 'y': null}) }];
   
      function updateMethod(data, field) {
        for(var i = 0; i < data.length; ++i) {
          $scope.chartData[0].values[i][field] = data[i];
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

