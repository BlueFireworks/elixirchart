'use strict';
(function(){

  module.export = angular.module('mainApp.controllers')

  .controller('cumulativeLineChartCtrl', cumulativeLineChartCtrl);
  
  function cumulativeLineChartCtrl($scope, chartDataService){

    $scope.showX = true;
    $scope.showY = true;
    $scope.showY2 = true;
    $scope.updateField = chartDataService.updateField;
    chartDataService.xField = 0;
    chartDataService.yField = 1;
    chartDataService.scope = $scope;
    chartDataService.update = update;
    
    $scope.chartData = [
    {
      "key": "y1",  color: '#2ca02c',
      "values": chartDataService.initValues([0, 0])
    },
    {
      "key": "y2",  color: '#ff7f0e',
      "values": chartDataService.initValues([0, 0])
    }
    ];

    
    chartDataService.loadParams();
    
    
    function update(data, index, field) {
      for(var i = 0; i < data.length; ++i) {
        if(field === 0){
          $scope.chartData[1].values[i][field] = data[i];
        }
        $scope.chartData[index].values[i][field] = data[i];
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
