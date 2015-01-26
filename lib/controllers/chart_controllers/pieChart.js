(function() {
'use strict';

  module.export = angular.module('mainApp.controllers')
    .controller('pieChartCtrl', pieChartCtrl);
  
  function pieChartCtrl($scope, chartDataService){

    $scope.selectX = false;
    $scope.selectY = true;
    $scope.updateY = chartDataService.updateY;
    chartDataService.yField = 'y';
    chartDataService.scope = $scope;
    chartDataService.updateField = updateMethod;
    
    $scope.chartData = chartDataService.initValues({'key': 'pie', 'y': 1});
 
    function updateMethod(data, field) {
      for(var i = 0; i < data.length; ++i) {
        $scope.chartData[i]['y'] = data[i];
        $scope.chartData[i]['key'] = 'pie' + i;
      }
    }

    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,
            transitionDuration: 500,
            labelThreshold: 0.01,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };
  }

})();
