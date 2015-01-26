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
              dispatch: {
                  stateChange: function(e){ console.log("stateChange"); },
                  changeState: function(e){ console.log("changeState"); },
                  tooltipShow: function(e){ console.log("tooltipShow"); },
                  tooltipHide: function(e){ console.log("tooltipHide"); }
              },
              xAxis: {
                  axisLabel: 'Time (ms)'
              },
              yAxis: {
                  axisLabel: 'Voltage (v)',
                  tickFormat: function(d){
                      return d3.format('.02f')(d);
                  },
                  axisLabelDistance: 30
              },
              callback: function(chart){
              }
          },
          title: {
              enable: true,
              text: 'Title for Line Chart'
          },
          subtitle: {
              enable: true,
              text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
              css: {
                  'text-align': 'center',
                  'margin': '10px 13px 0px 7px'
              }
          },
          caption: {
              enable: true,
              html: '',
              css: {
                  'text-align': 'justify',
                  'margin': '10px 13px 0px 7px'
              }
          }
      }; 
    }
})();
