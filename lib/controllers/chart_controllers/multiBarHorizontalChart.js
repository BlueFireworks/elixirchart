'use strict';
(function(){

  module.export = angular.module('mainApp.controllers')

  .controller('multiBarHorizontalChartCtrl', multiBarHorizontalChartCtrl);
  
  function multiBarHorizontalChartCtrl($scope, chartDataService){
    
    $scope.showX = false;
    $scope.showY = true;
    $scope.showLabel = true;
    $scope.updateField = chartDataService.updateField;
    chartDataService.yField = 'value';
    chartDataService.labelField = 'label';
    chartDataService.scope = $scope;
    chartDataService.update = update;
    
    $scope.chartData = [{"key": "", "color": "#d62728",
      "values": chartDataService.initValues({'value': null, 'label': null}) }];
 
    function update(data, field) {
      for(var i = 0; i < data.length; ++i) {
        $scope.chartData[0].values[i][field] = data[i];
      }
    }

    $scope.options = {
        chart: {
            type: 'multiBarHorizontalChart',
            height: 450,
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showControls: true,
            showValues: true,
            transitionDuration: 500,
            xAxis: {
                showMaxMin: false
            },
            yAxis: {
                axisLabel: 'Values',
                tickFormat: function(d){
                    return d3.format(',.2f')(d);
                }
            }
        }
    };
  }
})();
