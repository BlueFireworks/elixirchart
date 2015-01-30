'use strict';
(function(){

  var _ = require('lodash');

  module.export = angular.module('mainApp.controllers')
    .controller('lineChartCtrl', lineChartCtrl);
        
    function lineChartCtrl($scope, chartDataService) {
      
      $scope.selectX = true;
      $scope.selectY = true;
      $scope.updateX = chartDataService.updateX;
      $scope.updateY = chartDataService.updateY;
      chartDataService.xField = 'x';
      chartDataService.yField = 'y';
      chartDataService.scope = $scope;
      chartDataService.updateField = updateMethod;
      
      $scope.chartData = [{"key": "", 
        "values": chartDataService.initValues({'x': null, 'y': null}) }];
   
      function updateMethod(data, field) {
        for(var i = 0; i < data.length; ++i) {
          $scope.chartData[0].values[i][field] = data[i];
        }
      }

      $scope.options = {
          chart: {
              type: 'lineChart',
              height: 450,
              margin : {
                  top: 20,
                  right: 20,
                  bottom: 40,
                  left: 55
              },
              x: function(d){ return d.x; },
              y: function(d){ return d.y; },
              useInteractiveGuideline: true,
              xAxis: {
                  axisLabel: 'xAxis'
              },
              yAxis: {
                  axisLabel: 'yAxis'
              }
          },
          title: {
              enable: true,
              text: 'Title for Line Chart'
          },
          subtitle: {
              enable: true,
              text: 'Subtitle for simple line chart.',
              css: {
                  'text-align': 'center',
                  'margin': '10px 13px 0px 7px'
              }
          },
          caption: {
              enable: true,
              html: ''
          }
      }; 
    }
})();