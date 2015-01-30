'use strict';
(function() {
  
  angular.module('mainApp.controllers', []);

  var app = angular.module('elixirchart', ['mainApp.controllers',
    'ngRoute', 'json-tree', 'nvd3']);

  app.config(['$routeProvider', 'CHARTS', config]);
  app.run(initialize);
  var elixirchartController = require('./controllers/elixir.chart.controller');
  app.controller('mainCtrl', elixirchartController);

  elixirchartController.$inject = ['$scope', '$rootScope', '$location', 'dataService'];

  function config($routeProvider, CHARTS) {
    $routeProvider.when('/', {templateUrl: 'pages/home.html', controller: 'mainCtrl'});

    angular.forEach(CHARTS, function(value, key) {
      $routeProvider.when(value.path, 
        {templateUrl: 'pages/charts.html', controller: key + 'Ctrl'});
    });

    $routeProvider.otherwise({redirectTo: '/'});
  }

  function initialize($rootScope, $route, $location, CHARTS) {
    
    $rootScope.params = {
        route: $route,
        mode: 'basic', //basic, extended
        autorefresh: true,
        visible: true,
        disabled: false,
        charts: CHARTS
    };

    $rootScope.utils = {
      keys: function(obj){
        return Object.keys(obj);
      },
      selectChart: function(chart){
        $location.path(chart.path)
      }
    };

    /* global events for all nvd3 directives */
    $rootScope.events = {
      'jt.onFunctionChanged': function(e, $scope){
        $scope.api.refresh();
      }
    };

    /* subscribe on json-tree enevt */
    $rootScope.$on('onFunctionChanged', function(e){
      setTimeout(function(){
        $rootScope.$broadcast('jt.onFunctionChanged'); // broadcast event that will be caught by nvd3 directive
      }, 50)
    });
  }

require("./constants/chart.constants");
require("./directives/elixir.chart.directive");
require("./service/data.service");
require("./service/chart.data.service");
require("./controllers/chart_controllers/bulletChart");
require("./controllers/chart_controllers/cumulativeLineChart");
require("./controllers/chart_controllers/discreteBarChart");
require("./controllers/chart_controllers/donutChart");
require("./controllers/chart_controllers/historicalBarChart");
require("./controllers/chart_controllers/lineChart");
require("./controllers/chart_controllers/linePlusBarWithFocusChart");
require("./controllers/chart_controllers/lineWithFocusChart");
require("./controllers/chart_controllers/linePlusBarChart");
require("./controllers/chart_controllers/lineWithFocusChart");
require("./controllers/chart_controllers/multiBarChart");
require("./controllers/chart_controllers/multiBarHorizontalChart");
require("./controllers/chart_controllers/multiChart");
require("./controllers/chart_controllers/parallelCoordinates");
require("./controllers/chart_controllers/pieChart");
require("./controllers/chart_controllers/scatterChart");
require("./controllers/chart_controllers/scatterPlusLineChart");
require("./controllers/chart_controllers/sparklinePlus");
require("./controllers/chart_controllers/stackedAreaChart");
//require("./controllers/chart_controllers/lineWithFisheyeChart");
})();
