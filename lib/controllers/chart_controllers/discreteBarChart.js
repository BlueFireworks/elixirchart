'use strict';
(function() {

  module.export = angular.module('mainApp.controllers')
  .controller('discreteBarChartCtrl', discreteBarChartCtrl);

  function discreteBarChartCtrl($scope, chartDataService){
   
    $scope.showX = false;
    $scope.showY = true;
    $scope.showY2 = false;
    $scope.showLabel = true;
    $scope.updateField = chartDataService.updateField;
    $scope.toogleOptions = chartDataService.toogleOptions;
    chartDataService.scope = $scope;
    chartDataService.yField = 'value';
    chartDataService.labelField = 'label';
    chartDataService.update = update;
    
    $scope.chartData = [{"key": "y1", 
    "values": chartDataService.initValues({'value': 0, 'label': 0}) }];

    
    chartDataService.loadParams();
    
    function update(data, index, field) {
      for(var i = 0; i < data.length; ++i) {
        $scope.chartData[0].values[i][field] = data[i];
      }
    }

    $scope.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 60,
          left: 55
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){return d;},
        transitionDuration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: 30
        }
      }
    };
  }
})();
