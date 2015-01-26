(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
  module.export = angular.module('elixirchart')
      .constant('CHARTS', {
      	lineChart: { path: '/lineChart', title: 'Line Chart'},
        cumulativeLineChart: { path: '/cumulativeLineChart', title: 'Cumulative Line Chart', plunker: 'http://plnkr.co/edit/iIxJT3?p=preview' },
        //stackedAreaChart: { path: '/stackedAreaChart', title: 'Stacked Area Chart', plunker: 'http://plnkr.co/edit/CIGW0o?p=preview' },
        //multiBarChart: { path: '/multiBarChart', title: 'MultiBar Chart', plunker: 'http://plnkr.co/edit/zGc5Wp?p=preview' },
        discreteBarChart: { path: '/discreteBarChart', title: 'DiscreteBar Chart', plunker: 'http://plnkr.co/edit/6t5bky?p=preview' },
        historicalBarChart: { path: '/historicalBarChart', title: 'HistoricalBar Chart', plunker: 'http://plnkr.co/edit/U1wWbe?p=preview' },
        multiBarHorizontalChart: { path: '/multiBarHorizontalChart', title: 'MultiBar Horizontal Chart', plunker: 'http://plnkr.co/edit/UZGxhp?p=preview' },
        pieChart: { path: '/pieChart', title: 'Pie Chart', plunker: 'http://plnkr.co/edit/vtKWU0?p=preview' },
        scatterChart: { path: '/scatterChart', title: 'Scatter Chart', plunker: 'http://plnkr.co/edit/6hjwSA?p=preview' },
        lineWithFocusChart: { path: '/lineWithFocusChart', title: 'Line with Focus Chart', plunker: 'http://plnkr.co/edit/sWONMb?p=preview' },
        //linePlusBarChart: { path: '/linePlusBarChart', title: 'Line + Bar Chart', plunker: 'http://plnkr.co/edit/UASCUL?p=preview' },
        scatterPlusLineChart: { path: '/scatterPlusLineChart', title: 'Scatter + Line Chart', plunker: 'http://plnkr.co/edit/2MjNgj?p=preview' },
        //linePlusBarWithFocusChart: { path: '/linePlusBarWithFocusChart', title: 'Line + Bar with Focus Chart', plunker: 'http://plnkr.co/edit/f0QET0?p=preview' },
        donutChart: { path: '/donutChart', title: 'Donut Chart', plunker: 'http://plnkr.co/edit/jOoJik?p=preview' },
        //bulletChart: { path: '/bulletChart', title: 'Bullet Chart', plunker: 'http://plnkr.co/edit/Mb1cWN?p=preview' },
        //sparklinePlus: { path: '/sparklinePlus', title: 'SparkLine Chart', plunker: 'http://plnkr.co/edit/9ARpl6?p=preview' },
        //parallelCoordinates: { path: '/parallelCoordinates', title: 'Parallel Coordinates', plunker: 'http://plnkr.co/edit/rCQhcL?p=preview' },
        //multiChart: { path: '/multiChart', title: 'Multi Chart', plunker: 'http://plnkr.co/edit/zsNxBJ?p=preview' },
        //lineWithFisheyeChart: { path: '/lineWithFisheyeChart', title: 'Line with Fisheye Chart', plunker: 'http://plnkr.co/edit/YFruJE?p=preview' }
      })



},{}],2:[function(require,module,exports){
'use strict';

module.export = angular.module('mainApp.controllers')
    .controller('bulletChartCtrl', function($scope){

        $scope.options = {
            chart: {
                type: 'bulletChart',
                transitionDuration: 500
            }
        };

        $scope.data = {
            "title": "Revenue",
            "subtitle": "US$, in thousands",
            "ranges": [150,225,300],
            "measures": [220],
            "markers": [250]
        }
    })

},{}],3:[function(require,module,exports){
'use strict';
(function(){

  module.export = angular.module('mainApp.controllers')

  .controller('cumulativeLineChartCtrl', cumulativeLineChartCtrl);
  
  function cumulativeLineChartCtrl($scope, chartDataService){

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
            type: 'cumulativeLineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 65
            },
            x: function(d){ return d[0]; },
            y: function(d){ return d[1]/100; },
            average: function(d) { return d.mean/100; },

            color: d3.scale.category10().range(),
            transitionDuration: 300,
            useInteractiveGuideline: true,
            clipVoronoi: false,

            xAxis: {
                axisLabel: 'X Axis',
                tickFormat: function(d) {
                    return d3.time.format('%m/%d/%y')(new Date(d))
                },
                showMaxMin: false,
                staggerLabels: true
            },

            yAxis: {
                axisLabel: 'Y Axis',
                tickFormat: function(d){
                    return d3.format(',.1%')(d);
                },
                axisLabelDistance: 20
            }
        }
    };
  }
})();

},{}],4:[function(require,module,exports){
'use strict';
(function() {

  module.export = angular.module('mainApp.controllers')
    .controller('discreteBarChartCtrl', discreteBarChartCtrl);

  function discreteBarChartCtrl($scope, chartDataService){
   
    $scope.selectX = false;
    $scope.selectY = true;
    $scope.updateY = chartDataService.updateY;
    chartDataService.yField = 'value';
    chartDataService.scope = $scope;
    chartDataService.updateField = updateMethod;
    
    $scope.chartData = [{"key": "", 
      "values": chartDataService.initValues({'value': null, 'label': null}) }];
 
    function updateMethod(data, field) {
      for(var i = 0; i < data.length; ++i) {
        $scope.chartData[0].values[i][field] = data[i];
        $scope.chartData[0].values[i]['label'] = i;
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
            valueFormat: function(d){
                return d3.format(',.4f')(d);
            },
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

},{}],5:[function(require,module,exports){
(function() {
'use strict';

  module.export = angular.module('mainApp.controllers')
    .controller('donutChartCtrl', donutChartCtrl);
  
  function donutChartCtrl($scope, chartDataService){

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
            height: 450,
            donut: true,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,

            pie: {
                startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
            },
            transitionDuration: 500,
            legend: {
                margin: {
                    top: 5,
                    right: 140,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };
  }
})();


},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"lodash":25}],8:[function(require,module,exports){
'use strict';

module.export = angular.module('mainApp.controllers')

    .controller('linePlusBarChartCtrl', function($scope){

        $scope.options = {
            chart: {
                type: 'linePlusBarChart',
                height: 450,
                margin : {
                    top: 30,
                    right: 75,
                    bottom: 50,
                    left: 75
                },
                x: function(d, i){return i;},
                y: function(d){return d[1];},
                color: d3.scale.category10().range(),
                transitionDuration: 250,
                xAxis: {
                    axisLabel: 'X Axis',
                    showMaxMin: false,
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d][0] || 0;
                        return dx ? d3.time.format('%x')(new Date(dx)) : '';
                    },
                    staggerLabels: true
                },
                y1Axis: {
                    axisLabel: 'Y1 Axis',
                    tickFormat: function(d){return d3.format(',f')(d)}
                },
                y2Axis: {
                    axisLabel: 'Y2 Axis',
                    tickFormat: function(d) { return '$' + d3.format(',.2f')(d);}
                }
            }
        };

        $scope.data = [
            {
                "key" : "Quantity" ,
                "bar": true,
                "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
            },
            {
                "key" : "Price" ,
                "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] , [ 1293771600000 , 322.56] , [ 1296450000000 , 339.32] , [ 1298869200000 , 353.21] , [ 1301544000000 , 348.5075] , [ 1304136000000 , 350.13] , [ 1306814400000 , 347.83] , [ 1309406400000 , 335.67] , [ 1312084800000 , 390.48] , [ 1314763200000 , 384.83] , [ 1317355200000 , 381.32] , [ 1320033600000 , 404.78] , [ 1322629200000 , 382.2] , [ 1325307600000 , 405.0] , [ 1327986000000 , 456.48] , [ 1330491600000 , 542.44] , [ 1333166400000 , 599.55] , [ 1335758400000 , 583.98] ]
            }
        ];
    })

},{}],9:[function(require,module,exports){
'use strict';

module.export = angular.module('mainApp.controllers')

    .controller('linePlusBarWithFocusChartCtrl', function($scope){
        $scope.options = {
            chart: {
                type: 'linePlusBarWithFocusChart',
                height: 500,
                margin: {
                    top: 30,
                    right: 75,
                    bottom: 50,
                    left: 75
                },
                bars: {
                    forceY: [0]
                },
                bars2: {
                    forceY: [0]
                },
                color: ['#2ca02c', 'darkred'],
                x: function(d,i) { return i },
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        if (dx > 0) {
                            return d3.time.format('%x')(new Date(dx))
                        }
                        return null;
                    }
                },
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        return d3.time.format('%b-%Y')(new Date(dx))
                    },
                    showMaxMin: false
                },
                y1Axis: {
                    axisLabel: 'Y1 Axis',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                y2Axis: {
                    axisLabel: 'Y2 Axis',
                    tickFormat: function(d) {
                        return '$' + d3.format(',.2f')(d)
                    }
                },
                y3Axis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                y4Axis: {
                    tickFormat: function(d) {
                        return '$' + d3.format(',.2f')(d)
                    }
                }
            }
        };

        $scope.data = [
            {
                "key" : "Quantity" ,
                "bar": true,
                "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
            },
            {
                "key" : "Price" ,
                "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] , [ 1293771600000 , 322.56] , [ 1296450000000 , 339.32] , [ 1298869200000 , 353.21] , [ 1301544000000 , 348.5075] , [ 1304136000000 , 350.13] , [ 1306814400000 , 347.83] , [ 1309406400000 , 335.67] , [ 1312084800000 , 390.48] , [ 1314763200000 , 384.83] , [ 1317355200000 , 381.32] , [ 1320033600000 , 404.78] , [ 1322629200000 , 382.2] , [ 1325307600000 , 405.0] , [ 1327986000000 , 456.48] , [ 1330491600000 , 542.44] , [ 1333166400000 , 599.55] , [ 1335758400000 , 583.98]]
            }
        ].map(function(series) {
                series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                return series;
            });
        console.log($scope.data);
    })

},{}],10:[function(require,module,exports){
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
                      return d3.format(',f')(d);
                  }
              },
              x2Axis: {
                  tickFormat: function(d){
                      return d3.format(',f')(d);
                  }
              },
              yAxis: {
                  axisLabel: 'Y Axis',
                  tickFormat: function(d){
                      return d3.format(',.2f')(d);
                  },
                  rotateYLabel: false
              },
              y2Axis: {
                  tickFormat: function(d){
                      return d3.format(',.2f')(d);
                  }
              }

          }
      };
    }
})();


},{}],11:[function(require,module,exports){
'use strict';

module.export = angular.module('mainApp.controllers')

    .controller('multiBarChartCtrl', function($scope){

        $scope.options = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 45
                },
                clipEdge: true,
                staggerLabels: true,
                transitionDuration: 500,
                stacked: true,
                xAxis: {
                    axisLabel: 'Time (ms)',
                    showMaxMin: false,
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 40,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };

        $scope.data = generateData();

        /* Random Data Generator (took from nvd3.org) */
        function generateData() {
            return stream_layers(3,50+Math.random()*50,.1).map(function(data, i) {
                return {
                    key: 'Stream' + i,
                    values: data
                };
            });
        }

        /* Inspired by Lee Byron's test data generator. */
        function stream_layers(n, m, o) {
            if (arguments.length < 3) o = 0;
            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                    var w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }
            return d3.range(n).map(function() {
                var a = [], i;
                for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                return a.map(stream_index);
            });
        }

        /* Another layer generator using gamma distributions. */
        function stream_waves(n, m) {
            return d3.range(n).map(function(i) {
                return d3.range(m).map(function(j) {
                    var x = 20 * j / m - i / 3;
                    return 2 * x * Math.exp(-.5 * x);
                }).map(stream_index);
            });
        }

        function stream_index(d, i) {
            return {x: i, y: Math.max(0, d)};
        }


    })

},{}],12:[function(require,module,exports){
'use strict';
(function(){

  module.export = angular.module('mainApp.controllers')

  .controller('multiBarHorizontalChartCtrl', multiBarHorizontalChartCtrl);
  
  function multiBarHorizontalChartCtrl($scope, chartDataService){
    
    $scope.selectX = false;
    $scope.selectY = true;
    $scope.updateY = chartDataService.updateY;
    chartDataService.yField = 'value';
    chartDataService.scope = $scope;
    chartDataService.updateField = updateMethod;
    
    $scope.chartData = [{"key": "", "color": "#d62728",
      "values": chartDataService.initValues({'value': null, 'label': null}) }];
 
    function updateMethod(data, field) {
      for(var i = 0; i < data.length; ++i) {
        $scope.chartData[0].values[i][field] = data[i];
        $scope.chartData[0].values[i]['label'] = i;
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

},{}],13:[function(require,module,exports){
'use strict';

/* Controllers */

module.export = angular.module('mainApp.controllers')

    .controller('multiChartCtrl', function($scope){
        $scope.options = {
            chart: {
                type: 'multiChart',
                height: 450,
                margin : {
                    top: 30,
                    right: 60,
                    bottom: 50,
                    left: 70
                },
                color: d3.scale.category10().range(),
                //useInteractiveGuideline: true,
                transitionDuration: 500,
                xAxis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis1: {
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                yAxis2: {
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };

        $scope.data = generateData();

        function generateData(){
            var testdata = stream_layers(7,10+Math.random()*100,.1).map(function(data, i) {
                return {
                    key: 'Stream' + i,
                    values: data.map(function(a){a.y = a.y * (i <= 1 ? -1 : 1); return a})
                };
            });

            testdata[0].type = "area"
            testdata[0].yAxis = 1
            testdata[1].type = "area"
            testdata[1].yAxis = 1
            testdata[2].type = "line"
            testdata[2].yAxis = 1
            testdata[3].type = "line"
            testdata[3].yAxis = 2
            testdata[4].type = "bar"
            testdata[4].yAxis = 2
            testdata[5].type = "bar"
            testdata[5].yAxis = 2
            testdata[6].type = "bar"
            testdata[6].yAxis = 2

            return testdata;
        }

        /* Inspired by Lee Byron's test data generator. */
        function stream_layers(n, m, o) {
            if (arguments.length < 3) o = 0;
            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                    var w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }
            return d3.range(n).map(function() {
                var a = [], i;
                for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                return a.map(stream_index);
            });
        }

        function stream_index(d, i) {
            return {x: i, y: Math.max(0, d)};
        }

    })

},{}],14:[function(require,module,exports){
'use strict';

module.export = angular.module('mainApp.controllers')

    .controller('parallelCoordinatesCtrl', function($scope){
        $scope.options = {
            chart: {
                type: 'parallelCoordinates',
                height: 450,
                margin: {
                    top: 30,
                    right: 40,
                    bottom: 50,
                    left: 0
                },
                dimensions: [
                    "economy (mpg)",
                    "cylinders",
                    "displacement (cc)",
                    "power (hp)",
                    "weight (lb)",
                    "0-60 mph (s)",
                    "year"
                ]
            }
        };

        $scope.data = data();

        function data() {
            return [
                {
                    "name": "AMC Ambassador Brougham",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "360",
                    "power (hp)": "175",
                    "weight (lb)": "3821",
                    "0-60 mph (s)": "11",
                    "year": "73"
                },
                {
                    "name": "AMC Ambassador DPL",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "390",
                    "power (hp)": "190",
                    "weight (lb)": "3850",
                    "0-60 mph (s)": "8.5",
                    "year": "70"
                },
                {
                    "name": "AMC Ambassador SST",
                    "economy (mpg)": "17",
                    "cylinders": "8",
                    "displacement (cc)": "304",
                    "power (hp)": "150",
                    "weight (lb)": "3672",
                    "0-60 mph (s)": "11.5",
                    "year": "72"
                },
                {
                    "name": "AMC Concord DL 6",
                    "economy (mpg)": "20.2",
                    "cylinders": "6",
                    "displacement (cc)": "232",
                    "power (hp)": "90",
                    "weight (lb)": "3265",
                    "0-60 mph (s)": "18.2",
                    "year": "79"
                },
                {
                    "name": "AMC Concord DL",
                    "economy (mpg)": "18.1",
                    "cylinders": "6",
                    "displacement (cc)": "258",
                    "power (hp)": "120",
                    "weight (lb)": "3410",
                    "0-60 mph (s)": "15.1",
                    "year": "78"
                },
                {
                    "name": "AMC Concord DL",
                    "economy (mpg)": "23",
                    "cylinders": "4",
                    "displacement (cc)": "151",
                    "power (hp)": "",
                    "weight (lb)": "3035",
                    "0-60 mph (s)": "20.5",
                    "year": "82"
                },
                {
                    "name": "AMC Concord",
                    "economy (mpg)": "19.4",
                    "cylinders": "6",
                    "displacement (cc)": "232",
                    "power (hp)": "90",
                    "weight (lb)": "3210",
                    "0-60 mph (s)": "17.2",
                    "year": "78"
                },
                {
                    "name": "AMC Concord",
                    "economy (mpg)": "24.3",
                    "cylinders": "4",
                    "displacement (cc)": "151",
                    "power (hp)": "90",
                    "weight (lb)": "3003",
                    "0-60 mph (s)": "20.1",
                    "year": "80"
                },
                {
                    "name": "AMC Gremlin",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "232",
                    "power (hp)": "100",
                    "weight (lb)": "2789",
                    "0-60 mph (s)": "15",
                    "year": "73"
                },
                {
                    "name": "AMC Gremlin",
                    "economy (mpg)": "19",
                    "cylinders": "6",
                    "displacement (cc)": "232",
                    "power (hp)": "100",
                    "weight (lb)": "2634",
                    "0-60 mph (s)": "13",
                    "year": "71"
                },
                {
                    "name": "AMC Gremlin",
                    "economy (mpg)": "20",
                    "cylinders": "6",
                    "displacement (cc)": "232",
                    "power (hp)": "100",
                    "weight (lb)": "2914",
                    "0-60 mph (s)": "16",
                    "year": "75"
                },
                {
                    "name": "AMC Gremlin",
                    "economy (mpg)": "21",
                    "cylinders": "6",
                    "displacement (cc)": "199",
                    "power (hp)": "90",
                    "weight (lb)": "2648",
                    "0-60 mph (s)": "15",
                    "year": "70"
                },
                {
                    "name": "AMC Hornet Sportabout (Wagon)",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "258",
                    "power (hp)": "110",
                    "weight (lb)": "2962",
                    "0-60 mph (s)": "13.5",
                    "year": "71"
                },
                {
                    "name": "AMC Hornet",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "199",
                    "power (hp)": "97",
                    "weight (lb)": "2774",
                    "0-60 mph (s)": "15.5",
                    "year": "70"
                },
                {
                    "name": "AMC Hornet",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "232",
                    "power (hp)": "100",
                    "weight (lb)": "2945",
                    "0-60 mph (s)": "16",
                    "year": "73"
                },
                {
                    "name": "AMC Hornet",
                    "economy (mpg)": "19",
                    "cylinders": "6",
                    "displacement (cc)": "232",
                    "power (hp)": "100",
                    "weight (lb)": "2901",
                    "0-60 mph (s)": "16",
                    "year": "74"
                },
                {
                    "name": "AMC Hornet",
                    "economy (mpg)": "22.5",
                    "cylinders": "6",
                    "displacement (cc)": "232",
                    "power (hp)": "90",
                    "weight (lb)": "3085",
                    "0-60 mph (s)": "17.6",
                    "year": "76"
                },
                {
                    "name": "AMC Matador (Wagon)",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "304",
                    "power (hp)": "150",
                    "weight (lb)": "4257",
                    "0-60 mph (s)": "15.5",
                    "year": "74"
                },
                {
                    "name": "AMC Matador (Wagon)",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "304",
                    "power (hp)": "150",
                    "weight (lb)": "3892",
                    "0-60 mph (s)": "12.5",
                    "year": "72"
                },
                {
                    "name": "AMC Matador",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "304",
                    "power (hp)": "150",
                    "weight (lb)": "3672",
                    "0-60 mph (s)": "11.5",
                    "year": "73"
                },
                {
                    "name": "AMC Matador",
                    "economy (mpg)": "15",
                    "cylinders": "6",
                    "displacement (cc)": "258",
                    "power (hp)": "110",
                    "weight (lb)": "3730",
                    "0-60 mph (s)": "19",
                    "year": "75"
                },
                {
                    "name": "AMC Matador",
                    "economy (mpg)": "15.5",
                    "cylinders": "8",
                    "displacement (cc)": "304",
                    "power (hp)": "120",
                    "weight (lb)": "3962",
                    "0-60 mph (s)": "13.9",
                    "year": "76"
                },
                {
                    "name": "AMC Matador",
                    "economy (mpg)": "16",
                    "cylinders": "6",
                    "displacement (cc)": "258",
                    "power (hp)": "110",
                    "weight (lb)": "3632",
                    "0-60 mph (s)": "18",
                    "year": "74"
                },
                {
                    "name": "AMC Matador",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "232",
                    "power (hp)": "100",
                    "weight (lb)": "3288",
                    "0-60 mph (s)": "15.5",
                    "year": "71"
                },
                {
                    "name": "AMC Pacer D/L",
                    "economy (mpg)": "17.5",
                    "cylinders": "6",
                    "displacement (cc)": "258",
                    "power (hp)": "95",
                    "weight (lb)": "3193",
                    "0-60 mph (s)": "17.8",
                    "year": "76"
                },
                {
                    "name": "AMC Pacer",
                    "economy (mpg)": "19",
                    "cylinders": "6",
                    "displacement (cc)": "232",
                    "power (hp)": "90",
                    "weight (lb)": "3211",
                    "0-60 mph (s)": "17",
                    "year": "75"
                },
                {
                    "name": "AMC Rebel SST (Wagon)",
                    "economy (mpg)": "",
                    "cylinders": "8",
                    "displacement (cc)": "360",
                    "power (hp)": "175",
                    "weight (lb)": "3850",
                    "0-60 mph (s)": "11",
                    "year": "70"
                },
                {
                    "name": "AMC Rebel SST",
                    "economy (mpg)": "16",
                    "cylinders": "8",
                    "displacement (cc)": "304",
                    "power (hp)": "150",
                    "weight (lb)": "3433",
                    "0-60 mph (s)": "12",
                    "year": "70"
                },
                {
                    "name": "AMC Spirit DL",
                    "economy (mpg)": "27.4",
                    "cylinders": "4",
                    "displacement (cc)": "121",
                    "power (hp)": "80",
                    "weight (lb)": "2670",
                    "0-60 mph (s)": "15",
                    "year": "79"
                },
                {
                    "name": "Audi 100 LS",
                    "economy (mpg)": "20",
                    "cylinders": "4",
                    "displacement (cc)": "114",
                    "power (hp)": "91",
                    "weight (lb)": "2582",
                    "0-60 mph (s)": "14",
                    "year": "73"
                },
                {
                    "name": "Audi 100 LS",
                    "economy (mpg)": "23",
                    "cylinders": "4",
                    "displacement (cc)": "115",
                    "power (hp)": "95",
                    "weight (lb)": "2694",
                    "0-60 mph (s)": "15",
                    "year": "75"
                },
                {
                    "name": "Audi 100 LS",
                    "economy (mpg)": "24",
                    "cylinders": "4",
                    "displacement (cc)": "107",
                    "power (hp)": "90",
                    "weight (lb)": "2430",
                    "0-60 mph (s)": "14.5",
                    "year": "70"
                },
                {
                    "name": "Audi 4000",
                    "economy (mpg)": "34.3",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "78",
                    "weight (lb)": "2188",
                    "0-60 mph (s)": "15.8",
                    "year": "80"
                },
                {
                    "name": "Audi 5000",
                    "economy (mpg)": "20.3",
                    "cylinders": "5",
                    "displacement (cc)": "131",
                    "power (hp)": "103",
                    "weight (lb)": "2830",
                    "0-60 mph (s)": "15.9",
                    "year": "78"
                },
                {
                    "name": "Audi 5000S (Diesel)",
                    "economy (mpg)": "36.4",
                    "cylinders": "5",
                    "displacement (cc)": "121",
                    "power (hp)": "67",
                    "weight (lb)": "2950",
                    "0-60 mph (s)": "19.9",
                    "year": "80"
                },
                {
                    "name": "Audi Fox",
                    "economy (mpg)": "29",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "83",
                    "weight (lb)": "2219",
                    "0-60 mph (s)": "16.5",
                    "year": "74"
                },
                {
                    "name": "BMW 2002",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "121",
                    "power (hp)": "113",
                    "weight (lb)": "2234",
                    "0-60 mph (s)": "12.5",
                    "year": "70"
                },
                {
                    "name": "BMW 320i",
                    "economy (mpg)": "21.5",
                    "cylinders": "4",
                    "displacement (cc)": "121",
                    "power (hp)": "110",
                    "weight (lb)": "2600",
                    "0-60 mph (s)": "12.8",
                    "year": "77"
                },
                {
                    "name": "Buick Century 350",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "175",
                    "weight (lb)": "4100",
                    "0-60 mph (s)": "13",
                    "year": "73"
                },
                {
                    "name": "Buick Century Limited",
                    "economy (mpg)": "25",
                    "cylinders": "6",
                    "displacement (cc)": "181",
                    "power (hp)": "110",
                    "weight (lb)": "2945",
                    "0-60 mph (s)": "16.4",
                    "year": "82"
                },
                {
                    "name": "Buick Century Luxus (Wagon)",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "150",
                    "weight (lb)": "4699",
                    "0-60 mph (s)": "14.5",
                    "year": "74"
                },
                {
                    "name": "Buick Century Special",
                    "economy (mpg)": "20.6",
                    "cylinders": "6",
                    "displacement (cc)": "231",
                    "power (hp)": "105",
                    "weight (lb)": "3380",
                    "0-60 mph (s)": "15.8",
                    "year": "78"
                },
                {
                    "name": "Buick Century",
                    "economy (mpg)": "17",
                    "cylinders": "6",
                    "displacement (cc)": "231",
                    "power (hp)": "110",
                    "weight (lb)": "3907",
                    "0-60 mph (s)": "21",
                    "year": "75"
                },
                {
                    "name": "Buick Century",
                    "economy (mpg)": "22.4",
                    "cylinders": "6",
                    "displacement (cc)": "231",
                    "power (hp)": "110",
                    "weight (lb)": "3415",
                    "0-60 mph (s)": "15.8",
                    "year": "81"
                },
                {
                    "name": "Buick Electra 225 Custom",
                    "economy (mpg)": "12",
                    "cylinders": "8",
                    "displacement (cc)": "455",
                    "power (hp)": "225",
                    "weight (lb)": "4951",
                    "0-60 mph (s)": "11",
                    "year": "73"
                },
                {
                    "name": "Buick Estate Wagon (Wagon)",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "455",
                    "power (hp)": "225",
                    "weight (lb)": "3086",
                    "0-60 mph (s)": "10",
                    "year": "70"
                },
                {
                    "name": "Buick Estate Wagon (Wagon)",
                    "economy (mpg)": "16.9",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "155",
                    "weight (lb)": "4360",
                    "0-60 mph (s)": "14.9",
                    "year": "79"
                },
                {
                    "name": "Buick Lesabre Custom",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "155",
                    "weight (lb)": "4502",
                    "0-60 mph (s)": "13.5",
                    "year": "72"
                },
                {
                    "name": "Buick Opel Isuzu Deluxe",
                    "economy (mpg)": "30",
                    "cylinders": "4",
                    "displacement (cc)": "111",
                    "power (hp)": "80",
                    "weight (lb)": "2155",
                    "0-60 mph (s)": "14.8",
                    "year": "77"
                },
                {
                    "name": "Buick Regal Sport Coupe (Turbo)",
                    "economy (mpg)": "17.7",
                    "cylinders": "6",
                    "displacement (cc)": "231",
                    "power (hp)": "165",
                    "weight (lb)": "3445",
                    "0-60 mph (s)": "13.4",
                    "year": "78"
                },
                {
                    "name": "Buick Skyhawk",
                    "economy (mpg)": "21",
                    "cylinders": "6",
                    "displacement (cc)": "231",
                    "power (hp)": "110",
                    "weight (lb)": "3039",
                    "0-60 mph (s)": "15",
                    "year": "75"
                },
                {
                    "name": "Buick Skylark 320",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "165",
                    "weight (lb)": "3693",
                    "0-60 mph (s)": "11.5",
                    "year": "70"
                },
                {
                    "name": "Buick Skylark Limited",
                    "economy (mpg)": "28.4",
                    "cylinders": "4",
                    "displacement (cc)": "151",
                    "power (hp)": "90",
                    "weight (lb)": "2670",
                    "0-60 mph (s)": "16",
                    "year": "79"
                },
                {
                    "name": "Buick Skylark",
                    "economy (mpg)": "20.5",
                    "cylinders": "6",
                    "displacement (cc)": "231",
                    "power (hp)": "105",
                    "weight (lb)": "3425",
                    "0-60 mph (s)": "16.9",
                    "year": "77"
                },
                {
                    "name": "Buick Skylark",
                    "economy (mpg)": "26.6",
                    "cylinders": "4",
                    "displacement (cc)": "151",
                    "power (hp)": "84",
                    "weight (lb)": "2635",
                    "0-60 mph (s)": "16.4",
                    "year": "81"
                },
                {
                    "name": "Cadillac Eldorado",
                    "economy (mpg)": "23",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "125",
                    "weight (lb)": "3900",
                    "0-60 mph (s)": "17.4",
                    "year": "79"
                },
                {
                    "name": "Cadillac Seville",
                    "economy (mpg)": "16.5",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "180",
                    "weight (lb)": "4380",
                    "0-60 mph (s)": "12.1",
                    "year": "76"
                },
                {
                    "name": "Chevroelt Chevelle Malibu",
                    "economy (mpg)": "16",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "105",
                    "weight (lb)": "3897",
                    "0-60 mph (s)": "18.5",
                    "year": "75"
                },
                {
                    "name": "Chevrolet Bel Air",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "145",
                    "weight (lb)": "4440",
                    "0-60 mph (s)": "14",
                    "year": "75"
                },
                {
                    "name": "Chevrolet Camaro",
                    "economy (mpg)": "27",
                    "cylinders": "4",
                    "displacement (cc)": "151",
                    "power (hp)": "90",
                    "weight (lb)": "2950",
                    "0-60 mph (s)": "17.3",
                    "year": "82"
                },
                {
                    "name": "Chevrolet Caprice Classic",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "150",
                    "weight (lb)": "4464",
                    "0-60 mph (s)": "12",
                    "year": "73"
                },
                {
                    "name": "Chevrolet Caprice Classic",
                    "economy (mpg)": "17",
                    "cylinders": "8",
                    "displacement (cc)": "305",
                    "power (hp)": "130",
                    "weight (lb)": "3840",
                    "0-60 mph (s)": "15.4",
                    "year": "79"
                },
                {
                    "name": "Chevrolet Caprice Classic",
                    "economy (mpg)": "17.5",
                    "cylinders": "8",
                    "displacement (cc)": "305",
                    "power (hp)": "145",
                    "weight (lb)": "3880",
                    "0-60 mph (s)": "12.5",
                    "year": "77"
                },
                {
                    "name": "Chevrolet Cavalier 2-Door",
                    "economy (mpg)": "34",
                    "cylinders": "4",
                    "displacement (cc)": "112",
                    "power (hp)": "88",
                    "weight (lb)": "2395",
                    "0-60 mph (s)": "18",
                    "year": "82"
                },
                {
                    "name": "Chevrolet Cavalier Wagon",
                    "economy (mpg)": "27",
                    "cylinders": "4",
                    "displacement (cc)": "112",
                    "power (hp)": "88",
                    "weight (lb)": "2640",
                    "0-60 mph (s)": "18.6",
                    "year": "82"
                },
                {
                    "name": "Chevrolet Cavalier",
                    "economy (mpg)": "28",
                    "cylinders": "4",
                    "displacement (cc)": "112",
                    "power (hp)": "88",
                    "weight (lb)": "2605",
                    "0-60 mph (s)": "19.6",
                    "year": "82"
                },
                {
                    "name": "Chevrolet Chevelle Concours (Wagon)",
                    "economy (mpg)": "",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "165",
                    "weight (lb)": "4142",
                    "0-60 mph (s)": "11.5",
                    "year": "70"
                },
                {
                    "name": "Chevrolet Chevelle Concours (Wagon)",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "307",
                    "power (hp)": "130",
                    "weight (lb)": "4098",
                    "0-60 mph (s)": "14",
                    "year": "72"
                },
                {
                    "name": "Chevrolet Chevelle Malibu Classic",
                    "economy (mpg)": "16",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "100",
                    "weight (lb)": "3781",
                    "0-60 mph (s)": "17",
                    "year": "74"
                },
                {
                    "name": "Chevrolet Chevelle Malibu Classic",
                    "economy (mpg)": "17.5",
                    "cylinders": "8",
                    "displacement (cc)": "305",
                    "power (hp)": "140",
                    "weight (lb)": "4215",
                    "0-60 mph (s)": "13",
                    "year": "76"
                },
                {
                    "name": "Chevrolet Chevelle Malibu",
                    "economy (mpg)": "17",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "100",
                    "weight (lb)": "3329",
                    "0-60 mph (s)": "15.5",
                    "year": "71"
                },
                {
                    "name": "Chevrolet Chevelle Malibu",
                    "economy (mpg)": "18",
                    "cylinders": "8",
                    "displacement (cc)": "307",
                    "power (hp)": "130",
                    "weight (lb)": "3504",
                    "0-60 mph (s)": "12",
                    "year": "70"
                },
                {
                    "name": "Chevrolet Chevette",
                    "economy (mpg)": "29",
                    "cylinders": "4",
                    "displacement (cc)": "85",
                    "power (hp)": "52",
                    "weight (lb)": "2035",
                    "0-60 mph (s)": "22.2",
                    "year": "76"
                },
                {
                    "name": "Chevrolet Chevette",
                    "economy (mpg)": "30",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "68",
                    "weight (lb)": "2155",
                    "0-60 mph (s)": "16.5",
                    "year": "78"
                },
                {
                    "name": "Chevrolet Chevette",
                    "economy (mpg)": "30.5",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "63",
                    "weight (lb)": "2051",
                    "0-60 mph (s)": "17",
                    "year": "77"
                },
                {
                    "name": "Chevrolet Chevette",
                    "economy (mpg)": "32.1",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "70",
                    "weight (lb)": "2120",
                    "0-60 mph (s)": "15.5",
                    "year": "80"
                },
                {
                    "name": "Chevrolet Citation",
                    "economy (mpg)": "23.5",
                    "cylinders": "6",
                    "displacement (cc)": "173",
                    "power (hp)": "110",
                    "weight (lb)": "2725",
                    "0-60 mph (s)": "12.6",
                    "year": "81"
                },
                {
                    "name": "Chevrolet Citation",
                    "economy (mpg)": "28",
                    "cylinders": "4",
                    "displacement (cc)": "151",
                    "power (hp)": "90",
                    "weight (lb)": "2678",
                    "0-60 mph (s)": "16.5",
                    "year": "80"
                },
                {
                    "name": "Chevrolet Citation",
                    "economy (mpg)": "28.8",
                    "cylinders": "6",
                    "displacement (cc)": "173",
                    "power (hp)": "115",
                    "weight (lb)": "2595",
                    "0-60 mph (s)": "11.3",
                    "year": "79"
                },
                {
                    "name": "Chevrolet Concours",
                    "economy (mpg)": "17.5",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "110",
                    "weight (lb)": "3520",
                    "0-60 mph (s)": "16.4",
                    "year": "77"
                },
                {
                    "name": "Chevrolet Impala",
                    "economy (mpg)": "11",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "150",
                    "weight (lb)": "4997",
                    "0-60 mph (s)": "14",
                    "year": "73"
                },
                {
                    "name": "Chevrolet Impala",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "165",
                    "weight (lb)": "4274",
                    "0-60 mph (s)": "12",
                    "year": "72"
                },
                {
                    "name": "Chevrolet Impala",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "165",
                    "weight (lb)": "4209",
                    "0-60 mph (s)": "12",
                    "year": "71"
                },
                {
                    "name": "Chevrolet Impala",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "454",
                    "power (hp)": "220",
                    "weight (lb)": "4354",
                    "0-60 mph (s)": "9",
                    "year": "70"
                },
                {
                    "name": "Chevrolet Malibu Classic (Wagon)",
                    "economy (mpg)": "19.2",
                    "cylinders": "8",
                    "displacement (cc)": "267",
                    "power (hp)": "125",
                    "weight (lb)": "3605",
                    "0-60 mph (s)": "15",
                    "year": "79"
                },
                {
                    "name": "Chevrolet Malibu",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "145",
                    "weight (lb)": "3988",
                    "0-60 mph (s)": "13",
                    "year": "73"
                },
                {
                    "name": "Chevrolet Malibu",
                    "economy (mpg)": "20.5",
                    "cylinders": "6",
                    "displacement (cc)": "200",
                    "power (hp)": "95",
                    "weight (lb)": "3155",
                    "0-60 mph (s)": "18.2",
                    "year": "78"
                },
                {
                    "name": "Chevrolet Monte Carlo Landau",
                    "economy (mpg)": "15.5",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "170",
                    "weight (lb)": "4165",
                    "0-60 mph (s)": "11.4",
                    "year": "77"
                },
                {
                    "name": "Chevrolet Monte Carlo Landau",
                    "economy (mpg)": "19.2",
                    "cylinders": "8",
                    "displacement (cc)": "305",
                    "power (hp)": "145",
                    "weight (lb)": "3425",
                    "0-60 mph (s)": "13.2",
                    "year": "78"
                },
                {
                    "name": "Chevrolet Monte Carlo S",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "145",
                    "weight (lb)": "4082",
                    "0-60 mph (s)": "13",
                    "year": "73"
                },
                {
                    "name": "Chevrolet Monte Carlo",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "150",
                    "weight (lb)": "3761",
                    "0-60 mph (s)": "9.5",
                    "year": "70"
                },
                {
                    "name": "Chevrolet Monza 2+2",
                    "economy (mpg)": "20",
                    "cylinders": "8",
                    "displacement (cc)": "262",
                    "power (hp)": "110",
                    "weight (lb)": "3221",
                    "0-60 mph (s)": "13.5",
                    "year": "75"
                },
                {
                    "name": "Chevrolet Nova Custom",
                    "economy (mpg)": "16",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "100",
                    "weight (lb)": "3278",
                    "0-60 mph (s)": "18",
                    "year": "73"
                },
                {
                    "name": "Chevrolet Nova",
                    "economy (mpg)": "15",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "100",
                    "weight (lb)": "3336",
                    "0-60 mph (s)": "17",
                    "year": "74"
                },
                {
                    "name": "Chevrolet Nova",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "105",
                    "weight (lb)": "3459",
                    "0-60 mph (s)": "16",
                    "year": "75"
                },
                {
                    "name": "Chevrolet Nova",
                    "economy (mpg)": "22",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "105",
                    "weight (lb)": "3353",
                    "0-60 mph (s)": "14.5",
                    "year": "76"
                },
                {
                    "name": "Chevrolet Vega (Wagon)",
                    "economy (mpg)": "22",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "72",
                    "weight (lb)": "2408",
                    "0-60 mph (s)": "19",
                    "year": "71"
                },
                {
                    "name": "Chevrolet Vega 2300",
                    "economy (mpg)": "28",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "90",
                    "weight (lb)": "2264",
                    "0-60 mph (s)": "15.5",
                    "year": "71"
                },
                {
                    "name": "Chevrolet Vega",
                    "economy (mpg)": "20",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "90",
                    "weight (lb)": "2408",
                    "0-60 mph (s)": "19.5",
                    "year": "72"
                },
                {
                    "name": "Chevrolet Vega",
                    "economy (mpg)": "21",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "72",
                    "weight (lb)": "2401",
                    "0-60 mph (s)": "19.5",
                    "year": "73"
                },
                {
                    "name": "Chevrolet Vega",
                    "economy (mpg)": "25",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "75",
                    "weight (lb)": "2542",
                    "0-60 mph (s)": "17",
                    "year": "74"
                },
                {
                    "name": "Chevrolet Woody",
                    "economy (mpg)": "24.5",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "60",
                    "weight (lb)": "2164",
                    "0-60 mph (s)": "22.1",
                    "year": "76"
                },
                {
                    "name": "Chevy C10",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "145",
                    "weight (lb)": "4055",
                    "0-60 mph (s)": "12",
                    "year": "76"
                },
                {
                    "name": "Chevy C20",
                    "economy (mpg)": "10",
                    "cylinders": "8",
                    "displacement (cc)": "307",
                    "power (hp)": "200",
                    "weight (lb)": "4376",
                    "0-60 mph (s)": "15",
                    "year": "70"
                },
                {
                    "name": "Chevy S-10",
                    "economy (mpg)": "31",
                    "cylinders": "4",
                    "displacement (cc)": "119",
                    "power (hp)": "82",
                    "weight (lb)": "2720",
                    "0-60 mph (s)": "19.4",
                    "year": "82"
                },
                {
                    "name": "Chrysler Cordoba",
                    "economy (mpg)": "15.5",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "190",
                    "weight (lb)": "4325",
                    "0-60 mph (s)": "12.2",
                    "year": "77"
                },
                {
                    "name": "Chrysler Lebaron Medallion",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "156",
                    "power (hp)": "92",
                    "weight (lb)": "2585",
                    "0-60 mph (s)": "14.5",
                    "year": "82"
                },
                {
                    "name": "Chrysler Lebaron Salon",
                    "economy (mpg)": "17.6",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "85",
                    "weight (lb)": "3465",
                    "0-60 mph (s)": "16.6",
                    "year": "81"
                },
                {
                    "name": "Chrysler Lebaron Town & Country (Wagon)",
                    "economy (mpg)": "18.5",
                    "cylinders": "8",
                    "displacement (cc)": "360",
                    "power (hp)": "150",
                    "weight (lb)": "3940",
                    "0-60 mph (s)": "13",
                    "year": "79"
                },
                {
                    "name": "Chrysler New Yorker Brougham",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "440",
                    "power (hp)": "215",
                    "weight (lb)": "4735",
                    "0-60 mph (s)": "11",
                    "year": "73"
                },
                {
                    "name": "Chrysler Newport Royal",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "190",
                    "weight (lb)": "4422",
                    "0-60 mph (s)": "12.5",
                    "year": "72"
                },
                {
                    "name": "Citroen DS-21 Pallas",
                    "economy (mpg)": "",
                    "cylinders": "4",
                    "displacement (cc)": "133",
                    "power (hp)": "115",
                    "weight (lb)": "3090",
                    "0-60 mph (s)": "17.5",
                    "year": "70"
                },
                {
                    "name": "Datsun 1200",
                    "economy (mpg)": "35",
                    "cylinders": "4",
                    "displacement (cc)": "72",
                    "power (hp)": "69",
                    "weight (lb)": "1613",
                    "0-60 mph (s)": "18",
                    "year": "71"
                },
                {
                    "name": "Datsun 200SX",
                    "economy (mpg)": "23.9",
                    "cylinders": "4",
                    "displacement (cc)": "119",
                    "power (hp)": "97",
                    "weight (lb)": "2405",
                    "0-60 mph (s)": "14.9",
                    "year": "78"
                },
                {
                    "name": "Datsun 200SX",
                    "economy (mpg)": "32.9",
                    "cylinders": "4",
                    "displacement (cc)": "119",
                    "power (hp)": "100",
                    "weight (lb)": "2615",
                    "0-60 mph (s)": "14.8",
                    "year": "81"
                },
                {
                    "name": "Datsun 210",
                    "economy (mpg)": "31.8",
                    "cylinders": "4",
                    "displacement (cc)": "85",
                    "power (hp)": "65",
                    "weight (lb)": "2020",
                    "0-60 mph (s)": "19.2",
                    "year": "79"
                },
                {
                    "name": "Datsun 210",
                    "economy (mpg)": "37",
                    "cylinders": "4",
                    "displacement (cc)": "85",
                    "power (hp)": "65",
                    "weight (lb)": "1975",
                    "0-60 mph (s)": "19.4",
                    "year": "81"
                },
                {
                    "name": "Datsun 210",
                    "economy (mpg)": "40.8",
                    "cylinders": "4",
                    "displacement (cc)": "85",
                    "power (hp)": "65",
                    "weight (lb)": "2110",
                    "0-60 mph (s)": "19.2",
                    "year": "80"
                },
                {
                    "name": "Datsun 280ZX",
                    "economy (mpg)": "32.7",
                    "cylinders": "6",
                    "displacement (cc)": "168",
                    "power (hp)": "132",
                    "weight (lb)": "2910",
                    "0-60 mph (s)": "11.4",
                    "year": "80"
                },
                {
                    "name": "Datsun 310 GX",
                    "economy (mpg)": "38",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "67",
                    "weight (lb)": "1995",
                    "0-60 mph (s)": "16.2",
                    "year": "82"
                },
                {
                    "name": "Datsun 310",
                    "economy (mpg)": "37.2",
                    "cylinders": "4",
                    "displacement (cc)": "86",
                    "power (hp)": "65",
                    "weight (lb)": "2019",
                    "0-60 mph (s)": "16.4",
                    "year": "80"
                },
                {
                    "name": "Datsun 510 (Wagon)",
                    "economy (mpg)": "28",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "92",
                    "weight (lb)": "2288",
                    "0-60 mph (s)": "17",
                    "year": "72"
                },
                {
                    "name": "Datsun 510 Hatchback",
                    "economy (mpg)": "37",
                    "cylinders": "4",
                    "displacement (cc)": "119",
                    "power (hp)": "92",
                    "weight (lb)": "2434",
                    "0-60 mph (s)": "15",
                    "year": "80"
                },
                {
                    "name": "Datsun 510",
                    "economy (mpg)": "27.2",
                    "cylinders": "4",
                    "displacement (cc)": "119",
                    "power (hp)": "97",
                    "weight (lb)": "2300",
                    "0-60 mph (s)": "14.7",
                    "year": "78"
                },
                {
                    "name": "Datsun 610",
                    "economy (mpg)": "22",
                    "cylinders": "4",
                    "displacement (cc)": "108",
                    "power (hp)": "94",
                    "weight (lb)": "2379",
                    "0-60 mph (s)": "16.5",
                    "year": "73"
                },
                {
                    "name": "Datsun 710",
                    "economy (mpg)": "24",
                    "cylinders": "4",
                    "displacement (cc)": "119",
                    "power (hp)": "97",
                    "weight (lb)": "2545",
                    "0-60 mph (s)": "17",
                    "year": "75"
                },
                {
                    "name": "Datsun 710",
                    "economy (mpg)": "32",
                    "cylinders": "4",
                    "displacement (cc)": "83",
                    "power (hp)": "61",
                    "weight (lb)": "2003",
                    "0-60 mph (s)": "19",
                    "year": "74"
                },
                {
                    "name": "Datsun 810 Maxima",
                    "economy (mpg)": "24.2",
                    "cylinders": "6",
                    "displacement (cc)": "146",
                    "power (hp)": "120",
                    "weight (lb)": "2930",
                    "0-60 mph (s)": "13.8",
                    "year": "81"
                },
                {
                    "name": "Datsun 810",
                    "economy (mpg)": "22",
                    "cylinders": "6",
                    "displacement (cc)": "146",
                    "power (hp)": "97",
                    "weight (lb)": "2815",
                    "0-60 mph (s)": "14.5",
                    "year": "77"
                },
                {
                    "name": "Datsun B-210",
                    "economy (mpg)": "32",
                    "cylinders": "4",
                    "displacement (cc)": "85",
                    "power (hp)": "70",
                    "weight (lb)": "1990",
                    "0-60 mph (s)": "17",
                    "year": "76"
                },
                {
                    "name": "Datsun B210 GX",
                    "economy (mpg)": "39.4",
                    "cylinders": "4",
                    "displacement (cc)": "85",
                    "power (hp)": "70",
                    "weight (lb)": "2070",
                    "0-60 mph (s)": "18.6",
                    "year": "78"
                },
                {
                    "name": "Datsun B210",
                    "economy (mpg)": "31",
                    "cylinders": "4",
                    "displacement (cc)": "79",
                    "power (hp)": "67",
                    "weight (lb)": "1950",
                    "0-60 mph (s)": "19",
                    "year": "74"
                },
                {
                    "name": "Datsun F-10 Hatchback",
                    "economy (mpg)": "33.5",
                    "cylinders": "4",
                    "displacement (cc)": "85",
                    "power (hp)": "70",
                    "weight (lb)": "1945",
                    "0-60 mph (s)": "16.8",
                    "year": "77"
                },
                {
                    "name": "Datsun PL510",
                    "economy (mpg)": "27",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "88",
                    "weight (lb)": "2130",
                    "0-60 mph (s)": "14.5",
                    "year": "70"
                },
                {
                    "name": "Datsun PL510",
                    "economy (mpg)": "27",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "88",
                    "weight (lb)": "2130",
                    "0-60 mph (s)": "14.5",
                    "year": "71"
                },
                {
                    "name": "Dodge Aries SE",
                    "economy (mpg)": "29",
                    "cylinders": "4",
                    "displacement (cc)": "135",
                    "power (hp)": "84",
                    "weight (lb)": "2525",
                    "0-60 mph (s)": "16",
                    "year": "82"
                },
                {
                    "name": "Dodge Aries Wagon (Wagon)",
                    "economy (mpg)": "25.8",
                    "cylinders": "4",
                    "displacement (cc)": "156",
                    "power (hp)": "92",
                    "weight (lb)": "2620",
                    "0-60 mph (s)": "14.4",
                    "year": "81"
                },
                {
                    "name": "Dodge Aspen 6",
                    "economy (mpg)": "20.6",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "110",
                    "weight (lb)": "3360",
                    "0-60 mph (s)": "16.6",
                    "year": "79"
                },
                {
                    "name": "Dodge Aspen SE",
                    "economy (mpg)": "20",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "100",
                    "weight (lb)": "3651",
                    "0-60 mph (s)": "17.7",
                    "year": "76"
                },
                {
                    "name": "Dodge Aspen",
                    "economy (mpg)": "18.6",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "110",
                    "weight (lb)": "3620",
                    "0-60 mph (s)": "18.7",
                    "year": "78"
                },
                {
                    "name": "Dodge Aspen",
                    "economy (mpg)": "19.1",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "90",
                    "weight (lb)": "3381",
                    "0-60 mph (s)": "18.7",
                    "year": "80"
                },
                {
                    "name": "Dodge Challenger SE",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "383",
                    "power (hp)": "170",
                    "weight (lb)": "3563",
                    "0-60 mph (s)": "10",
                    "year": "70"
                },
                {
                    "name": "Dodge Charger 2.2",
                    "economy (mpg)": "36",
                    "cylinders": "4",
                    "displacement (cc)": "135",
                    "power (hp)": "84",
                    "weight (lb)": "2370",
                    "0-60 mph (s)": "13",
                    "year": "82"
                },
                {
                    "name": "Dodge Colt (Wagon)",
                    "economy (mpg)": "28",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "80",
                    "weight (lb)": "2164",
                    "0-60 mph (s)": "15",
                    "year": "72"
                },
                {
                    "name": "Dodge Colt Hardtop",
                    "economy (mpg)": "25",
                    "cylinders": "4",
                    "displacement (cc)": "97.5",
                    "power (hp)": "80",
                    "weight (lb)": "2126",
                    "0-60 mph (s)": "17",
                    "year": "72"
                },
                {
                    "name": "Dodge Colt Hatchback Custom",
                    "economy (mpg)": "35.7",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "80",
                    "weight (lb)": "1915",
                    "0-60 mph (s)": "14.4",
                    "year": "79"
                },
                {
                    "name": "Dodge Colt M/M",
                    "economy (mpg)": "33.5",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "83",
                    "weight (lb)": "2075",
                    "0-60 mph (s)": "15.9",
                    "year": "77"
                },
                {
                    "name": "Dodge Colt",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "79",
                    "weight (lb)": "2255",
                    "0-60 mph (s)": "17.7",
                    "year": "76"
                },
                {
                    "name": "Dodge Colt",
                    "economy (mpg)": "27.9",
                    "cylinders": "4",
                    "displacement (cc)": "156",
                    "power (hp)": "105",
                    "weight (lb)": "2800",
                    "0-60 mph (s)": "14.4",
                    "year": "80"
                },
                {
                    "name": "Dodge Colt",
                    "economy (mpg)": "28",
                    "cylinders": "4",
                    "displacement (cc)": "90",
                    "power (hp)": "75",
                    "weight (lb)": "2125",
                    "0-60 mph (s)": "14.5",
                    "year": "74"
                },
                {
                    "name": "Dodge Coronet Brougham",
                    "economy (mpg)": "16",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "4190",
                    "0-60 mph (s)": "13",
                    "year": "76"
                },
                {
                    "name": "Dodge Coronet Custom (Wagon)",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "4457",
                    "0-60 mph (s)": "13.5",
                    "year": "74"
                },
                {
                    "name": "Dodge Coronet Custom",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "3777",
                    "0-60 mph (s)": "12.5",
                    "year": "73"
                },
                {
                    "name": "Dodge D100",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "3755",
                    "0-60 mph (s)": "14",
                    "year": "76"
                },
                {
                    "name": "Dodge D200",
                    "economy (mpg)": "11",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "210",
                    "weight (lb)": "4382",
                    "0-60 mph (s)": "13.5",
                    "year": "70"
                },
                {
                    "name": "Dodge Dart Custom",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "3399",
                    "0-60 mph (s)": "11",
                    "year": "73"
                },
                {
                    "name": "Dodge Diplomat",
                    "economy (mpg)": "19.4",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "140",
                    "weight (lb)": "3735",
                    "0-60 mph (s)": "13.2",
                    "year": "78"
                },
                {
                    "name": "Dodge Magnum XE",
                    "economy (mpg)": "17.5",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "140",
                    "weight (lb)": "4080",
                    "0-60 mph (s)": "13.7",
                    "year": "78"
                },
                {
                    "name": "Dodge Monaco (Wagon)",
                    "economy (mpg)": "12",
                    "cylinders": "8",
                    "displacement (cc)": "383",
                    "power (hp)": "180",
                    "weight (lb)": "4955",
                    "0-60 mph (s)": "11.5",
                    "year": "71"
                },
                {
                    "name": "Dodge Monaco Brougham",
                    "economy (mpg)": "15.5",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "145",
                    "weight (lb)": "4140",
                    "0-60 mph (s)": "13.7",
                    "year": "77"
                },
                {
                    "name": "Dodge Omni",
                    "economy (mpg)": "30.9",
                    "cylinders": "4",
                    "displacement (cc)": "105",
                    "power (hp)": "75",
                    "weight (lb)": "2230",
                    "0-60 mph (s)": "14.5",
                    "year": "78"
                },
                {
                    "name": "Dodge Rampage",
                    "economy (mpg)": "32",
                    "cylinders": "4",
                    "displacement (cc)": "135",
                    "power (hp)": "84",
                    "weight (lb)": "2295",
                    "0-60 mph (s)": "11.6",
                    "year": "82"
                },
                {
                    "name": "Dodge St. Regis",
                    "economy (mpg)": "18.2",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "135",
                    "weight (lb)": "3830",
                    "0-60 mph (s)": "15.2",
                    "year": "79"
                },
                {
                    "name": "Fiat 124 Sport Coupe",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "90",
                    "weight (lb)": "2265",
                    "0-60 mph (s)": "15.5",
                    "year": "73"
                },
                {
                    "name": "Fiat 124 TC",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "116",
                    "power (hp)": "75",
                    "weight (lb)": "2246",
                    "0-60 mph (s)": "14",
                    "year": "74"
                },
                {
                    "name": "Fiat 124B",
                    "economy (mpg)": "30",
                    "cylinders": "4",
                    "displacement (cc)": "88",
                    "power (hp)": "76",
                    "weight (lb)": "2065",
                    "0-60 mph (s)": "14.5",
                    "year": "71"
                },
                {
                    "name": "Fiat 128",
                    "economy (mpg)": "24",
                    "cylinders": "4",
                    "displacement (cc)": "90",
                    "power (hp)": "75",
                    "weight (lb)": "2108",
                    "0-60 mph (s)": "15.5",
                    "year": "74"
                },
                {
                    "name": "Fiat 128",
                    "economy (mpg)": "29",
                    "cylinders": "4",
                    "displacement (cc)": "68",
                    "power (hp)": "49",
                    "weight (lb)": "1867",
                    "0-60 mph (s)": "19.5",
                    "year": "73"
                },
                {
                    "name": "Fiat 131",
                    "economy (mpg)": "28",
                    "cylinders": "4",
                    "displacement (cc)": "107",
                    "power (hp)": "86",
                    "weight (lb)": "2464",
                    "0-60 mph (s)": "15.5",
                    "year": "76"
                },
                {
                    "name": "Fiat Strada Custom",
                    "economy (mpg)": "37.3",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "69",
                    "weight (lb)": "2130",
                    "0-60 mph (s)": "14.7",
                    "year": "79"
                },
                {
                    "name": "Fiat X1.9",
                    "economy (mpg)": "31",
                    "cylinders": "4",
                    "displacement (cc)": "79",
                    "power (hp)": "67",
                    "weight (lb)": "2000",
                    "0-60 mph (s)": "16",
                    "year": "74"
                },
                {
                    "name": "Ford Capri II",
                    "economy (mpg)": "25",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "92",
                    "weight (lb)": "2572",
                    "0-60 mph (s)": "14.9",
                    "year": "76"
                },
                {
                    "name": "Ford Country Squire (Wagon)",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "170",
                    "weight (lb)": "4746",
                    "0-60 mph (s)": "12",
                    "year": "71"
                },
                {
                    "name": "Ford Country Squire (Wagon)",
                    "economy (mpg)": "15.5",
                    "cylinders": "8",
                    "displacement (cc)": "351",
                    "power (hp)": "142",
                    "weight (lb)": "4054",
                    "0-60 mph (s)": "14.3",
                    "year": "79"
                },
                {
                    "name": "Ford Country",
                    "economy (mpg)": "12",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "167",
                    "weight (lb)": "4906",
                    "0-60 mph (s)": "12.5",
                    "year": "73"
                },
                {
                    "name": "Ford Escort 2H",
                    "economy (mpg)": "29.9",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "65",
                    "weight (lb)": "2380",
                    "0-60 mph (s)": "20.7",
                    "year": "81"
                },
                {
                    "name": "Ford Escort 4W",
                    "economy (mpg)": "34.4",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "65",
                    "weight (lb)": "2045",
                    "0-60 mph (s)": "16.2",
                    "year": "81"
                },
                {
                    "name": "Ford F108",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "130",
                    "weight (lb)": "3870",
                    "0-60 mph (s)": "15",
                    "year": "76"
                },
                {
                    "name": "Ford F250",
                    "economy (mpg)": "10",
                    "cylinders": "8",
                    "displacement (cc)": "360",
                    "power (hp)": "215",
                    "weight (lb)": "4615",
                    "0-60 mph (s)": "14",
                    "year": "70"
                },
                {
                    "name": "Ford Fairmont (Auto)",
                    "economy (mpg)": "20.2",
                    "cylinders": "6",
                    "displacement (cc)": "200",
                    "power (hp)": "85",
                    "weight (lb)": "2965",
                    "0-60 mph (s)": "15.8",
                    "year": "78"
                },
                {
                    "name": "Ford Fairmont (Man)",
                    "economy (mpg)": "25.1",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "88",
                    "weight (lb)": "2720",
                    "0-60 mph (s)": "15.4",
                    "year": "78"
                },
                {
                    "name": "Ford Fairmont 4",
                    "economy (mpg)": "22.3",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "88",
                    "weight (lb)": "2890",
                    "0-60 mph (s)": "17.3",
                    "year": "79"
                },
                {
                    "name": "Ford Fairmont Futura",
                    "economy (mpg)": "24",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "92",
                    "weight (lb)": "2865",
                    "0-60 mph (s)": "16.4",
                    "year": "82"
                },
                {
                    "name": "Ford Fairmont",
                    "economy (mpg)": "26.4",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "88",
                    "weight (lb)": "2870",
                    "0-60 mph (s)": "18.1",
                    "year": "80"
                },
                {
                    "name": "Ford Fiesta",
                    "economy (mpg)": "36.1",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "66",
                    "weight (lb)": "1800",
                    "0-60 mph (s)": "14.4",
                    "year": "78"
                },
                {
                    "name": "Ford Futura",
                    "economy (mpg)": "18.1",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "139",
                    "weight (lb)": "3205",
                    "0-60 mph (s)": "11.2",
                    "year": "78"
                },
                {
                    "name": "Ford Galaxie 500",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "351",
                    "power (hp)": "153",
                    "weight (lb)": "4129",
                    "0-60 mph (s)": "13",
                    "year": "72"
                },
                {
                    "name": "Ford Galaxie 500",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "351",
                    "power (hp)": "153",
                    "weight (lb)": "4154",
                    "0-60 mph (s)": "13.5",
                    "year": "71"
                },
                {
                    "name": "Ford Galaxie 500",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "429",
                    "power (hp)": "198",
                    "weight (lb)": "4341",
                    "0-60 mph (s)": "10",
                    "year": "70"
                },
                {
                    "name": "Ford Gran Torino (Wagon)",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "140",
                    "weight (lb)": "4294",
                    "0-60 mph (s)": "16",
                    "year": "72"
                },
                {
                    "name": "Ford Gran Torino (Wagon)",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "140",
                    "weight (lb)": "4638",
                    "0-60 mph (s)": "16",
                    "year": "74"
                },
                {
                    "name": "Ford Gran Torino",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "137",
                    "weight (lb)": "4042",
                    "0-60 mph (s)": "14.5",
                    "year": "73"
                },
                {
                    "name": "Ford Gran Torino",
                    "economy (mpg)": "14.5",
                    "cylinders": "8",
                    "displacement (cc)": "351",
                    "power (hp)": "152",
                    "weight (lb)": "4215",
                    "0-60 mph (s)": "12.8",
                    "year": "76"
                },
                {
                    "name": "Ford Gran Torino",
                    "economy (mpg)": "16",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "140",
                    "weight (lb)": "4141",
                    "0-60 mph (s)": "14",
                    "year": "74"
                },
                {
                    "name": "Ford Granada Ghia",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "78",
                    "weight (lb)": "3574",
                    "0-60 mph (s)": "21",
                    "year": "76"
                },
                {
                    "name": "Ford Granada GL",
                    "economy (mpg)": "20.2",
                    "cylinders": "6",
                    "displacement (cc)": "200",
                    "power (hp)": "88",
                    "weight (lb)": "3060",
                    "0-60 mph (s)": "17.1",
                    "year": "81"
                },
                {
                    "name": "Ford Granada L",
                    "economy (mpg)": "22",
                    "cylinders": "6",
                    "displacement (cc)": "232",
                    "power (hp)": "112",
                    "weight (lb)": "2835",
                    "0-60 mph (s)": "14.7",
                    "year": "82"
                },
                {
                    "name": "Ford Granada",
                    "economy (mpg)": "18.5",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "98",
                    "weight (lb)": "3525",
                    "0-60 mph (s)": "19",
                    "year": "77"
                },
                {
                    "name": "Ford LTD Landau",
                    "economy (mpg)": "17.6",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "129",
                    "weight (lb)": "3725",
                    "0-60 mph (s)": "13.4",
                    "year": "79"
                },
                {
                    "name": "Ford LTD",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "351",
                    "power (hp)": "158",
                    "weight (lb)": "4363",
                    "0-60 mph (s)": "13",
                    "year": "73"
                },
                {
                    "name": "Ford LTD",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "351",
                    "power (hp)": "148",
                    "weight (lb)": "4657",
                    "0-60 mph (s)": "13.5",
                    "year": "75"
                },
                {
                    "name": "Ford Maverick",
                    "economy (mpg)": "15",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "72",
                    "weight (lb)": "3158",
                    "0-60 mph (s)": "19.5",
                    "year": "75"
                },
                {
                    "name": "Ford Maverick",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "88",
                    "weight (lb)": "3021",
                    "0-60 mph (s)": "16.5",
                    "year": "73"
                },
                {
                    "name": "Ford Maverick",
                    "economy (mpg)": "21",
                    "cylinders": "6",
                    "displacement (cc)": "200",
                    "power (hp)": "",
                    "weight (lb)": "2875",
                    "0-60 mph (s)": "17",
                    "year": "74"
                },
                {
                    "name": "Ford Maverick",
                    "economy (mpg)": "21",
                    "cylinders": "6",
                    "displacement (cc)": "200",
                    "power (hp)": "85",
                    "weight (lb)": "2587",
                    "0-60 mph (s)": "16",
                    "year": "70"
                },
                {
                    "name": "Ford Maverick",
                    "economy (mpg)": "24",
                    "cylinders": "6",
                    "displacement (cc)": "200",
                    "power (hp)": "81",
                    "weight (lb)": "3012",
                    "0-60 mph (s)": "17.6",
                    "year": "76"
                },
                {
                    "name": "Ford Mustang Boss 302",
                    "economy (mpg)": "",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "140",
                    "weight (lb)": "3353",
                    "0-60 mph (s)": "8",
                    "year": "70"
                },
                {
                    "name": "Ford Mustang Cobra",
                    "economy (mpg)": "23.6",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "",
                    "weight (lb)": "2905",
                    "0-60 mph (s)": "14.3",
                    "year": "80"
                },
                {
                    "name": "Ford Mustang GL",
                    "economy (mpg)": "27",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "86",
                    "weight (lb)": "2790",
                    "0-60 mph (s)": "15.6",
                    "year": "82"
                },
                {
                    "name": "Ford Mustang II 2+2",
                    "economy (mpg)": "25.5",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "89",
                    "weight (lb)": "2755",
                    "0-60 mph (s)": "15.8",
                    "year": "77"
                },
                {
                    "name": "Ford Mustang II",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "129",
                    "weight (lb)": "3169",
                    "0-60 mph (s)": "12",
                    "year": "75"
                },
                {
                    "name": "Ford Mustang",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "88",
                    "weight (lb)": "3139",
                    "0-60 mph (s)": "14.5",
                    "year": "71"
                },
                {
                    "name": "Ford Pinto (Wagon)",
                    "economy (mpg)": "22",
                    "cylinders": "4",
                    "displacement (cc)": "122",
                    "power (hp)": "86",
                    "weight (lb)": "2395",
                    "0-60 mph (s)": "16",
                    "year": "72"
                },
                {
                    "name": "Ford Pinto Runabout",
                    "economy (mpg)": "21",
                    "cylinders": "4",
                    "displacement (cc)": "122",
                    "power (hp)": "86",
                    "weight (lb)": "2226",
                    "0-60 mph (s)": "16.5",
                    "year": "72"
                },
                {
                    "name": "Ford Pinto",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "171",
                    "power (hp)": "97",
                    "weight (lb)": "2984",
                    "0-60 mph (s)": "14.5",
                    "year": "75"
                },
                {
                    "name": "Ford Pinto",
                    "economy (mpg)": "19",
                    "cylinders": "4",
                    "displacement (cc)": "122",
                    "power (hp)": "85",
                    "weight (lb)": "2310",
                    "0-60 mph (s)": "18.5",
                    "year": "73"
                },
                {
                    "name": "Ford Pinto",
                    "economy (mpg)": "23",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "83",
                    "weight (lb)": "2639",
                    "0-60 mph (s)": "17",
                    "year": "75"
                },
                {
                    "name": "Ford Pinto",
                    "economy (mpg)": "25",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "",
                    "weight (lb)": "2046",
                    "0-60 mph (s)": "19",
                    "year": "71"
                },
                {
                    "name": "Ford Pinto",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "122",
                    "power (hp)": "80",
                    "weight (lb)": "2451",
                    "0-60 mph (s)": "16.5",
                    "year": "74"
                },
                {
                    "name": "Ford Pinto",
                    "economy (mpg)": "26.5",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "72",
                    "weight (lb)": "2565",
                    "0-60 mph (s)": "13.6",
                    "year": "76"
                },
                {
                    "name": "Ford Ranger",
                    "economy (mpg)": "28",
                    "cylinders": "4",
                    "displacement (cc)": "120",
                    "power (hp)": "79",
                    "weight (lb)": "2625",
                    "0-60 mph (s)": "18.6",
                    "year": "82"
                },
                {
                    "name": "Ford Thunderbird",
                    "economy (mpg)": "16",
                    "cylinders": "8",
                    "displacement (cc)": "351",
                    "power (hp)": "149",
                    "weight (lb)": "4335",
                    "0-60 mph (s)": "14.5",
                    "year": "77"
                },
                {
                    "name": "Ford Torino (Wagon)",
                    "economy (mpg)": "",
                    "cylinders": "8",
                    "displacement (cc)": "351",
                    "power (hp)": "153",
                    "weight (lb)": "4034",
                    "0-60 mph (s)": "11",
                    "year": "70"
                },
                {
                    "name": "Ford Torino 500",
                    "economy (mpg)": "19",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "88",
                    "weight (lb)": "3302",
                    "0-60 mph (s)": "15.5",
                    "year": "71"
                },
                {
                    "name": "Ford Torino",
                    "economy (mpg)": "17",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "140",
                    "weight (lb)": "3449",
                    "0-60 mph (s)": "10.5",
                    "year": "70"
                },
                {
                    "name": "Hi 1200D",
                    "economy (mpg)": "9",
                    "cylinders": "8",
                    "displacement (cc)": "304",
                    "power (hp)": "193",
                    "weight (lb)": "4732",
                    "0-60 mph (s)": "18.5",
                    "year": "70"
                },
                {
                    "name": "Honda Accord CVCC",
                    "economy (mpg)": "31.5",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "68",
                    "weight (lb)": "2045",
                    "0-60 mph (s)": "18.5",
                    "year": "77"
                },
                {
                    "name": "Honda Accord LX",
                    "economy (mpg)": "29.5",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "68",
                    "weight (lb)": "2135",
                    "0-60 mph (s)": "16.6",
                    "year": "78"
                },
                {
                    "name": "Honda Accord",
                    "economy (mpg)": "32.4",
                    "cylinders": "4",
                    "displacement (cc)": "107",
                    "power (hp)": "72",
                    "weight (lb)": "2290",
                    "0-60 mph (s)": "17",
                    "year": "80"
                },
                {
                    "name": "Honda Accord",
                    "economy (mpg)": "36",
                    "cylinders": "4",
                    "displacement (cc)": "107",
                    "power (hp)": "75",
                    "weight (lb)": "2205",
                    "0-60 mph (s)": "14.5",
                    "year": "82"
                },
                {
                    "name": "Honda Civic (Auto)",
                    "economy (mpg)": "32",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "67",
                    "weight (lb)": "1965",
                    "0-60 mph (s)": "15.7",
                    "year": "82"
                },
                {
                    "name": "Honda Civic 1300",
                    "economy (mpg)": "35.1",
                    "cylinders": "4",
                    "displacement (cc)": "81",
                    "power (hp)": "60",
                    "weight (lb)": "1760",
                    "0-60 mph (s)": "16.1",
                    "year": "81"
                },
                {
                    "name": "Honda Civic 1500 GL",
                    "economy (mpg)": "44.6",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "67",
                    "weight (lb)": "1850",
                    "0-60 mph (s)": "13.8",
                    "year": "80"
                },
                {
                    "name": "Honda Civic CVCC",
                    "economy (mpg)": "33",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "53",
                    "weight (lb)": "1795",
                    "0-60 mph (s)": "17.5",
                    "year": "75"
                },
                {
                    "name": "Honda Civic CVCC",
                    "economy (mpg)": "36.1",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "60",
                    "weight (lb)": "1800",
                    "0-60 mph (s)": "16.4",
                    "year": "78"
                },
                {
                    "name": "Honda Civic",
                    "economy (mpg)": "24",
                    "cylinders": "4",
                    "displacement (cc)": "120",
                    "power (hp)": "97",
                    "weight (lb)": "2489",
                    "0-60 mph (s)": "15",
                    "year": "74"
                },
                {
                    "name": "Honda Civic",
                    "economy (mpg)": "33",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "53",
                    "weight (lb)": "1795",
                    "0-60 mph (s)": "17.4",
                    "year": "76"
                },
                {
                    "name": "Honda Civic",
                    "economy (mpg)": "38",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "67",
                    "weight (lb)": "1965",
                    "0-60 mph (s)": "15",
                    "year": "82"
                },
                {
                    "name": "Honda Prelude",
                    "economy (mpg)": "33.7",
                    "cylinders": "4",
                    "displacement (cc)": "107",
                    "power (hp)": "75",
                    "weight (lb)": "2210",
                    "0-60 mph (s)": "14.4",
                    "year": "81"
                },
                {
                    "name": "Maxda GLC Deluxe",
                    "economy (mpg)": "34.1",
                    "cylinders": "4",
                    "displacement (cc)": "86",
                    "power (hp)": "65",
                    "weight (lb)": "1975",
                    "0-60 mph (s)": "15.2",
                    "year": "79"
                },
                {
                    "name": "Maxda RX-3",
                    "economy (mpg)": "18",
                    "cylinders": "3",
                    "displacement (cc)": "70",
                    "power (hp)": "90",
                    "weight (lb)": "2124",
                    "0-60 mph (s)": "13.5",
                    "year": "73"
                },
                {
                    "name": "Mazda 626",
                    "economy (mpg)": "31.3",
                    "cylinders": "4",
                    "displacement (cc)": "120",
                    "power (hp)": "75",
                    "weight (lb)": "2542",
                    "0-60 mph (s)": "17.5",
                    "year": "80"
                },
                {
                    "name": "Mazda 626",
                    "economy (mpg)": "31.6",
                    "cylinders": "4",
                    "displacement (cc)": "120",
                    "power (hp)": "74",
                    "weight (lb)": "2635",
                    "0-60 mph (s)": "18.3",
                    "year": "81"
                },
                {
                    "name": "Mazda GLC 4",
                    "economy (mpg)": "34.1",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "68",
                    "weight (lb)": "1985",
                    "0-60 mph (s)": "16",
                    "year": "81"
                },
                {
                    "name": "Mazda GLC Custom L",
                    "economy (mpg)": "37",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "68",
                    "weight (lb)": "2025",
                    "0-60 mph (s)": "18.2",
                    "year": "82"
                },
                {
                    "name": "Mazda GLC Custom",
                    "economy (mpg)": "31",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "68",
                    "weight (lb)": "1970",
                    "0-60 mph (s)": "17.6",
                    "year": "82"
                },
                {
                    "name": "Mazda GLC Deluxe",
                    "economy (mpg)": "32.8",
                    "cylinders": "4",
                    "displacement (cc)": "78",
                    "power (hp)": "52",
                    "weight (lb)": "1985",
                    "0-60 mph (s)": "19.4",
                    "year": "78"
                },
                {
                    "name": "Mazda GLC",
                    "economy (mpg)": "46.6",
                    "cylinders": "4",
                    "displacement (cc)": "86",
                    "power (hp)": "65",
                    "weight (lb)": "2110",
                    "0-60 mph (s)": "17.9",
                    "year": "80"
                },
                {
                    "name": "Mazda RX-2 Coupe",
                    "economy (mpg)": "19",
                    "cylinders": "3",
                    "displacement (cc)": "70",
                    "power (hp)": "97",
                    "weight (lb)": "2330",
                    "0-60 mph (s)": "13.5",
                    "year": "72"
                },
                {
                    "name": "Mazda RX-4",
                    "economy (mpg)": "21.5",
                    "cylinders": "3",
                    "displacement (cc)": "80",
                    "power (hp)": "110",
                    "weight (lb)": "2720",
                    "0-60 mph (s)": "13.5",
                    "year": "77"
                },
                {
                    "name": "Mazda RX-7 Gs",
                    "economy (mpg)": "23.7",
                    "cylinders": "3",
                    "displacement (cc)": "70",
                    "power (hp)": "100",
                    "weight (lb)": "2420",
                    "0-60 mph (s)": "12.5",
                    "year": "80"
                },
                {
                    "name": "Mercedes-Benz 240D",
                    "economy (mpg)": "30",
                    "cylinders": "4",
                    "displacement (cc)": "146",
                    "power (hp)": "67",
                    "weight (lb)": "3250",
                    "0-60 mph (s)": "21.8",
                    "year": "80"
                },
                {
                    "name": "Mercedes-Benz 280S",
                    "economy (mpg)": "16.5",
                    "cylinders": "6",
                    "displacement (cc)": "168",
                    "power (hp)": "120",
                    "weight (lb)": "3820",
                    "0-60 mph (s)": "16.7",
                    "year": "76"
                },
                {
                    "name": "Mercedes-Benz 300D",
                    "economy (mpg)": "25.4",
                    "cylinders": "5",
                    "displacement (cc)": "183",
                    "power (hp)": "77",
                    "weight (lb)": "3530",
                    "0-60 mph (s)": "20.1",
                    "year": "79"
                },
                {
                    "name": "Mercury Capri 2000",
                    "economy (mpg)": "23",
                    "cylinders": "4",
                    "displacement (cc)": "122",
                    "power (hp)": "86",
                    "weight (lb)": "2220",
                    "0-60 mph (s)": "14",
                    "year": "71"
                },
                {
                    "name": "Mercury Capri V6",
                    "economy (mpg)": "21",
                    "cylinders": "6",
                    "displacement (cc)": "155",
                    "power (hp)": "107",
                    "weight (lb)": "2472",
                    "0-60 mph (s)": "14",
                    "year": "73"
                },
                {
                    "name": "Mercury Cougar Brougham",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "130",
                    "weight (lb)": "4295",
                    "0-60 mph (s)": "14.9",
                    "year": "77"
                },
                {
                    "name": "Mercury Grand Marquis",
                    "economy (mpg)": "16.5",
                    "cylinders": "8",
                    "displacement (cc)": "351",
                    "power (hp)": "138",
                    "weight (lb)": "3955",
                    "0-60 mph (s)": "13.2",
                    "year": "79"
                },
                {
                    "name": "Mercury Lynx L",
                    "economy (mpg)": "36",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "70",
                    "weight (lb)": "2125",
                    "0-60 mph (s)": "17.3",
                    "year": "82"
                },
                {
                    "name": "Mercury Marquis Brougham",
                    "economy (mpg)": "12",
                    "cylinders": "8",
                    "displacement (cc)": "429",
                    "power (hp)": "198",
                    "weight (lb)": "4952",
                    "0-60 mph (s)": "11.5",
                    "year": "73"
                },
                {
                    "name": "Mercury Marquis",
                    "economy (mpg)": "11",
                    "cylinders": "8",
                    "displacement (cc)": "429",
                    "power (hp)": "208",
                    "weight (lb)": "4633",
                    "0-60 mph (s)": "11",
                    "year": "72"
                },
                {
                    "name": "Mercury Monarch Ghia",
                    "economy (mpg)": "20.2",
                    "cylinders": "8",
                    "displacement (cc)": "302",
                    "power (hp)": "139",
                    "weight (lb)": "3570",
                    "0-60 mph (s)": "12.8",
                    "year": "78"
                },
                {
                    "name": "Mercury Monarch",
                    "economy (mpg)": "15",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "72",
                    "weight (lb)": "3432",
                    "0-60 mph (s)": "21",
                    "year": "75"
                },
                {
                    "name": "Mercury Zephyr 6",
                    "economy (mpg)": "19.8",
                    "cylinders": "6",
                    "displacement (cc)": "200",
                    "power (hp)": "85",
                    "weight (lb)": "2990",
                    "0-60 mph (s)": "18.2",
                    "year": "79"
                },
                {
                    "name": "Mercury Zephyr",
                    "economy (mpg)": "20.8",
                    "cylinders": "6",
                    "displacement (cc)": "200",
                    "power (hp)": "85",
                    "weight (lb)": "3070",
                    "0-60 mph (s)": "16.7",
                    "year": "78"
                },
                {
                    "name": "Nissan Stanza XE",
                    "economy (mpg)": "36",
                    "cylinders": "4",
                    "displacement (cc)": "120",
                    "power (hp)": "88",
                    "weight (lb)": "2160",
                    "0-60 mph (s)": "14.5",
                    "year": "82"
                },
                {
                    "name": "Oldsmobile Cutlass Ciera (Diesel)",
                    "economy (mpg)": "38",
                    "cylinders": "6",
                    "displacement (cc)": "262",
                    "power (hp)": "85",
                    "weight (lb)": "3015",
                    "0-60 mph (s)": "17",
                    "year": "82"
                },
                {
                    "name": "Oldsmobile Cutlass LS",
                    "economy (mpg)": "26.6",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "105",
                    "weight (lb)": "3725",
                    "0-60 mph (s)": "19",
                    "year": "81"
                },
                {
                    "name": "Oldsmobile Cutlass Salon Brougham",
                    "economy (mpg)": "19.9",
                    "cylinders": "8",
                    "displacement (cc)": "260",
                    "power (hp)": "110",
                    "weight (lb)": "3365",
                    "0-60 mph (s)": "15.5",
                    "year": "78"
                },
                {
                    "name": "Oldsmobile Cutlass Salon Brougham",
                    "economy (mpg)": "23.9",
                    "cylinders": "8",
                    "displacement (cc)": "260",
                    "power (hp)": "90",
                    "weight (lb)": "3420",
                    "0-60 mph (s)": "22.2",
                    "year": "79"
                },
                {
                    "name": "Oldsmobile Cutlass Supreme",
                    "economy (mpg)": "17",
                    "cylinders": "8",
                    "displacement (cc)": "260",
                    "power (hp)": "110",
                    "weight (lb)": "4060",
                    "0-60 mph (s)": "19",
                    "year": "77"
                },
                {
                    "name": "Oldsmobile Delta 88 Royale",
                    "economy (mpg)": "12",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "160",
                    "weight (lb)": "4456",
                    "0-60 mph (s)": "13.5",
                    "year": "72"
                },
                {
                    "name": "Oldsmobile Omega Brougham",
                    "economy (mpg)": "26.8",
                    "cylinders": "6",
                    "displacement (cc)": "173",
                    "power (hp)": "115",
                    "weight (lb)": "2700",
                    "0-60 mph (s)": "12.9",
                    "year": "79"
                },
                {
                    "name": "Oldsmobile Omega",
                    "economy (mpg)": "11",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "180",
                    "weight (lb)": "3664",
                    "0-60 mph (s)": "11",
                    "year": "73"
                },
                {
                    "name": "Oldsmobile Starfire SX",
                    "economy (mpg)": "23.8",
                    "cylinders": "4",
                    "displacement (cc)": "151",
                    "power (hp)": "85",
                    "weight (lb)": "2855",
                    "0-60 mph (s)": "17.6",
                    "year": "78"
                },
                {
                    "name": "Oldsmobile Vista Cruiser",
                    "economy (mpg)": "12",
                    "cylinders": "8",
                    "displacement (cc)": "350",
                    "power (hp)": "180",
                    "weight (lb)": "4499",
                    "0-60 mph (s)": "12.5",
                    "year": "73"
                },
                {
                    "name": "Opel 1900",
                    "economy (mpg)": "25",
                    "cylinders": "4",
                    "displacement (cc)": "116",
                    "power (hp)": "81",
                    "weight (lb)": "2220",
                    "0-60 mph (s)": "16.9",
                    "year": "76"
                },
                {
                    "name": "Opel 1900",
                    "economy (mpg)": "28",
                    "cylinders": "4",
                    "displacement (cc)": "116",
                    "power (hp)": "90",
                    "weight (lb)": "2123",
                    "0-60 mph (s)": "14",
                    "year": "71"
                },
                {
                    "name": "Opel Manta",
                    "economy (mpg)": "24",
                    "cylinders": "4",
                    "displacement (cc)": "116",
                    "power (hp)": "75",
                    "weight (lb)": "2158",
                    "0-60 mph (s)": "15.5",
                    "year": "73"
                },
                {
                    "name": "Opel Manta",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "78",
                    "weight (lb)": "2300",
                    "0-60 mph (s)": "14.5",
                    "year": "74"
                },
                {
                    "name": "Peugeot 304",
                    "economy (mpg)": "30",
                    "cylinders": "4",
                    "displacement (cc)": "79",
                    "power (hp)": "70",
                    "weight (lb)": "2074",
                    "0-60 mph (s)": "19.5",
                    "year": "71"
                },
                {
                    "name": "Peugeot 504 (Wagon)",
                    "economy (mpg)": "21",
                    "cylinders": "4",
                    "displacement (cc)": "120",
                    "power (hp)": "87",
                    "weight (lb)": "2979",
                    "0-60 mph (s)": "19.5",
                    "year": "72"
                },
                {
                    "name": "Peugeot 504",
                    "economy (mpg)": "19",
                    "cylinders": "4",
                    "displacement (cc)": "120",
                    "power (hp)": "88",
                    "weight (lb)": "3270",
                    "0-60 mph (s)": "21.9",
                    "year": "76"
                },
                {
                    "name": "Peugeot 504",
                    "economy (mpg)": "23",
                    "cylinders": "4",
                    "displacement (cc)": "120",
                    "power (hp)": "88",
                    "weight (lb)": "2957",
                    "0-60 mph (s)": "17",
                    "year": "75"
                },
                {
                    "name": "Peugeot 504",
                    "economy (mpg)": "25",
                    "cylinders": "4",
                    "displacement (cc)": "110",
                    "power (hp)": "87",
                    "weight (lb)": "2672",
                    "0-60 mph (s)": "17.5",
                    "year": "70"
                },
                {
                    "name": "Peugeot 504",
                    "economy (mpg)": "27.2",
                    "cylinders": "4",
                    "displacement (cc)": "141",
                    "power (hp)": "71",
                    "weight (lb)": "3190",
                    "0-60 mph (s)": "24.8",
                    "year": "79"
                },
                {
                    "name": "Peugeot 505S Turbo Diesel",
                    "economy (mpg)": "28.1",
                    "cylinders": "4",
                    "displacement (cc)": "141",
                    "power (hp)": "80",
                    "weight (lb)": "3230",
                    "0-60 mph (s)": "20.4",
                    "year": "81"
                },
                {
                    "name": "Peugeot 604SL",
                    "economy (mpg)": "16.2",
                    "cylinders": "6",
                    "displacement (cc)": "163",
                    "power (hp)": "133",
                    "weight (lb)": "3410",
                    "0-60 mph (s)": "15.8",
                    "year": "78"
                },
                {
                    "name": "Plymouth Arrow GS",
                    "economy (mpg)": "25.5",
                    "cylinders": "4",
                    "displacement (cc)": "122",
                    "power (hp)": "96",
                    "weight (lb)": "2300",
                    "0-60 mph (s)": "15.5",
                    "year": "77"
                },
                {
                    "name": "Plymouth Barracuda 340",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "340",
                    "power (hp)": "160",
                    "weight (lb)": "3609",
                    "0-60 mph (s)": "8",
                    "year": "70"
                },
                {
                    "name": "Plymouth Champ",
                    "economy (mpg)": "39",
                    "cylinders": "4",
                    "displacement (cc)": "86",
                    "power (hp)": "64",
                    "weight (lb)": "1875",
                    "0-60 mph (s)": "16.4",
                    "year": "81"
                },
                {
                    "name": "Plymouth Cricket",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "91",
                    "power (hp)": "70",
                    "weight (lb)": "1955",
                    "0-60 mph (s)": "20.5",
                    "year": "71"
                },
                {
                    "name": "Plymouth Custom Suburb",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "360",
                    "power (hp)": "170",
                    "weight (lb)": "4654",
                    "0-60 mph (s)": "13",
                    "year": "73"
                },
                {
                    "name": "Plymouth Duster",
                    "economy (mpg)": "20",
                    "cylinders": "6",
                    "displacement (cc)": "198",
                    "power (hp)": "95",
                    "weight (lb)": "3102",
                    "0-60 mph (s)": "16.5",
                    "year": "74"
                },
                {
                    "name": "Plymouth Duster",
                    "economy (mpg)": "22",
                    "cylinders": "6",
                    "displacement (cc)": "198",
                    "power (hp)": "95",
                    "weight (lb)": "2833",
                    "0-60 mph (s)": "15.5",
                    "year": "70"
                },
                {
                    "name": "Plymouth Duster",
                    "economy (mpg)": "23",
                    "cylinders": "6",
                    "displacement (cc)": "198",
                    "power (hp)": "95",
                    "weight (lb)": "2904",
                    "0-60 mph (s)": "16",
                    "year": "73"
                },
                {
                    "name": "Plymouth Fury Gran Sedan",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "4237",
                    "0-60 mph (s)": "14.5",
                    "year": "73"
                },
                {
                    "name": "Plymouth Fury III",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "4096",
                    "0-60 mph (s)": "13",
                    "year": "71"
                },
                {
                    "name": "Plymouth Fury III",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "440",
                    "power (hp)": "215",
                    "weight (lb)": "4312",
                    "0-60 mph (s)": "8.5",
                    "year": "70"
                },
                {
                    "name": "Plymouth Fury III",
                    "economy (mpg)": "15",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "4135",
                    "0-60 mph (s)": "13.5",
                    "year": "72"
                },
                {
                    "name": "Plymouth Fury",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "95",
                    "weight (lb)": "3785",
                    "0-60 mph (s)": "19",
                    "year": "75"
                },
                {
                    "name": "Plymouth Grand Fury",
                    "economy (mpg)": "16",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "4498",
                    "0-60 mph (s)": "14.5",
                    "year": "75"
                },
                {
                    "name": "Plymouth Horizon 4",
                    "economy (mpg)": "34.7",
                    "cylinders": "4",
                    "displacement (cc)": "105",
                    "power (hp)": "63",
                    "weight (lb)": "2215",
                    "0-60 mph (s)": "14.9",
                    "year": "81"
                },
                {
                    "name": "Plymouth Horizon Miser",
                    "economy (mpg)": "38",
                    "cylinders": "4",
                    "displacement (cc)": "105",
                    "power (hp)": "63",
                    "weight (lb)": "2125",
                    "0-60 mph (s)": "14.7",
                    "year": "82"
                },
                {
                    "name": "Plymouth Horizon TC3",
                    "economy (mpg)": "34.5",
                    "cylinders": "4",
                    "displacement (cc)": "105",
                    "power (hp)": "70",
                    "weight (lb)": "2150",
                    "0-60 mph (s)": "14.9",
                    "year": "79"
                },
                {
                    "name": "Plymouth Horizon",
                    "economy (mpg)": "34.2",
                    "cylinders": "4",
                    "displacement (cc)": "105",
                    "power (hp)": "70",
                    "weight (lb)": "2200",
                    "0-60 mph (s)": "13.2",
                    "year": "79"
                },
                {
                    "name": "Plymouth Reliant",
                    "economy (mpg)": "27.2",
                    "cylinders": "4",
                    "displacement (cc)": "135",
                    "power (hp)": "84",
                    "weight (lb)": "2490",
                    "0-60 mph (s)": "15.7",
                    "year": "81"
                },
                {
                    "name": "Plymouth Reliant",
                    "economy (mpg)": "30",
                    "cylinders": "4",
                    "displacement (cc)": "135",
                    "power (hp)": "84",
                    "weight (lb)": "2385",
                    "0-60 mph (s)": "12.9",
                    "year": "81"
                },
                {
                    "name": "Plymouth Sapporo",
                    "economy (mpg)": "23.2",
                    "cylinders": "4",
                    "displacement (cc)": "156",
                    "power (hp)": "105",
                    "weight (lb)": "2745",
                    "0-60 mph (s)": "16.7",
                    "year": "78"
                },
                {
                    "name": "Plymouth Satellite (Wagon)",
                    "economy (mpg)": "",
                    "cylinders": "8",
                    "displacement (cc)": "383",
                    "power (hp)": "175",
                    "weight (lb)": "4166",
                    "0-60 mph (s)": "10.5",
                    "year": "70"
                },
                {
                    "name": "Plymouth Satellite Custom (Wagon)",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "4077",
                    "0-60 mph (s)": "14",
                    "year": "72"
                },
                {
                    "name": "Plymouth Satellite Custom",
                    "economy (mpg)": "16",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "105",
                    "weight (lb)": "3439",
                    "0-60 mph (s)": "15.5",
                    "year": "71"
                },
                {
                    "name": "Plymouth Satellite Sebring",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "105",
                    "weight (lb)": "3613",
                    "0-60 mph (s)": "16.5",
                    "year": "74"
                },
                {
                    "name": "Plymouth Satellite",
                    "economy (mpg)": "18",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "3436",
                    "0-60 mph (s)": "11",
                    "year": "70"
                },
                {
                    "name": "Plymouth Valiant Custom",
                    "economy (mpg)": "19",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "95",
                    "weight (lb)": "3264",
                    "0-60 mph (s)": "16",
                    "year": "75"
                },
                {
                    "name": "Plymouth Valiant",
                    "economy (mpg)": "18",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "105",
                    "weight (lb)": "3121",
                    "0-60 mph (s)": "16.5",
                    "year": "73"
                },
                {
                    "name": "Plymouth Valiant",
                    "economy (mpg)": "22",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "100",
                    "weight (lb)": "3233",
                    "0-60 mph (s)": "15.4",
                    "year": "76"
                },
                {
                    "name": "Plymouth Volare Custom",
                    "economy (mpg)": "19",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "100",
                    "weight (lb)": "3630",
                    "0-60 mph (s)": "17.7",
                    "year": "77"
                },
                {
                    "name": "Plymouth Volare Premier V8",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "318",
                    "power (hp)": "150",
                    "weight (lb)": "3940",
                    "0-60 mph (s)": "13.2",
                    "year": "76"
                },
                {
                    "name": "Plymouth Volare",
                    "economy (mpg)": "20.5",
                    "cylinders": "6",
                    "displacement (cc)": "225",
                    "power (hp)": "100",
                    "weight (lb)": "3430",
                    "0-60 mph (s)": "17.2",
                    "year": "78"
                },
                {
                    "name": "Pontiac Astro",
                    "economy (mpg)": "23",
                    "cylinders": "4",
                    "displacement (cc)": "140",
                    "power (hp)": "78",
                    "weight (lb)": "2592",
                    "0-60 mph (s)": "18.5",
                    "year": "75"
                },
                {
                    "name": "Pontiac Catalina Brougham",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "175",
                    "weight (lb)": "4464",
                    "0-60 mph (s)": "11.5",
                    "year": "71"
                },
                {
                    "name": "Pontiac Catalina",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "175",
                    "weight (lb)": "4385",
                    "0-60 mph (s)": "12",
                    "year": "72"
                },
                {
                    "name": "Pontiac Catalina",
                    "economy (mpg)": "14",
                    "cylinders": "8",
                    "displacement (cc)": "455",
                    "power (hp)": "225",
                    "weight (lb)": "4425",
                    "0-60 mph (s)": "10",
                    "year": "70"
                },
                {
                    "name": "Pontiac Catalina",
                    "economy (mpg)": "16",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "170",
                    "weight (lb)": "4668",
                    "0-60 mph (s)": "11.5",
                    "year": "75"
                },
                {
                    "name": "Pontiac Firebird",
                    "economy (mpg)": "19",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "100",
                    "weight (lb)": "3282",
                    "0-60 mph (s)": "15",
                    "year": "71"
                },
                {
                    "name": "Pontiac Grand Prix Lj",
                    "economy (mpg)": "16",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "180",
                    "weight (lb)": "4220",
                    "0-60 mph (s)": "11.1",
                    "year": "77"
                },
                {
                    "name": "Pontiac Grand Prix",
                    "economy (mpg)": "16",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "230",
                    "weight (lb)": "4278",
                    "0-60 mph (s)": "9.5",
                    "year": "73"
                },
                {
                    "name": "Pontiac J2000 Se Hatchback",
                    "economy (mpg)": "31",
                    "cylinders": "4",
                    "displacement (cc)": "112",
                    "power (hp)": "85",
                    "weight (lb)": "2575",
                    "0-60 mph (s)": "16.2",
                    "year": "82"
                },
                {
                    "name": "Pontiac Lemans V6",
                    "economy (mpg)": "21.5",
                    "cylinders": "6",
                    "displacement (cc)": "231",
                    "power (hp)": "115",
                    "weight (lb)": "3245",
                    "0-60 mph (s)": "15.4",
                    "year": "79"
                },
                {
                    "name": "Pontiac Phoenix LJ",
                    "economy (mpg)": "19.2",
                    "cylinders": "6",
                    "displacement (cc)": "231",
                    "power (hp)": "105",
                    "weight (lb)": "3535",
                    "0-60 mph (s)": "19.2",
                    "year": "78"
                },
                {
                    "name": "Pontiac Phoenix",
                    "economy (mpg)": "27",
                    "cylinders": "4",
                    "displacement (cc)": "151",
                    "power (hp)": "90",
                    "weight (lb)": "2735",
                    "0-60 mph (s)": "18",
                    "year": "82"
                },
                {
                    "name": "Pontiac Phoenix",
                    "economy (mpg)": "33.5",
                    "cylinders": "4",
                    "displacement (cc)": "151",
                    "power (hp)": "90",
                    "weight (lb)": "2556",
                    "0-60 mph (s)": "13.2",
                    "year": "79"
                },
                {
                    "name": "Pontiac Safari (Wagon)",
                    "economy (mpg)": "13",
                    "cylinders": "8",
                    "displacement (cc)": "400",
                    "power (hp)": "175",
                    "weight (lb)": "5140",
                    "0-60 mph (s)": "12",
                    "year": "71"
                },
                {
                    "name": "Pontiac Sunbird Coupe",
                    "economy (mpg)": "24.5",
                    "cylinders": "4",
                    "displacement (cc)": "151",
                    "power (hp)": "88",
                    "weight (lb)": "2740",
                    "0-60 mph (s)": "16",
                    "year": "77"
                },
                {
                    "name": "Pontiac Ventura Sj",
                    "economy (mpg)": "18.5",
                    "cylinders": "6",
                    "displacement (cc)": "250",
                    "power (hp)": "110",
                    "weight (lb)": "3645",
                    "0-60 mph (s)": "16.2",
                    "year": "76"
                },
                {
                    "name": "Renault 12 (Wagon)",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "96",
                    "power (hp)": "69",
                    "weight (lb)": "2189",
                    "0-60 mph (s)": "18",
                    "year": "72"
                },
                {
                    "name": "Renault 12TL",
                    "economy (mpg)": "27",
                    "cylinders": "4",
                    "displacement (cc)": "101",
                    "power (hp)": "83",
                    "weight (lb)": "2202",
                    "0-60 mph (s)": "15.3",
                    "year": "76"
                },
                {
                    "name": "Renault 18I",
                    "economy (mpg)": "34.5",
                    "cylinders": "4",
                    "displacement (cc)": "100",
                    "power (hp)": "",
                    "weight (lb)": "2320",
                    "0-60 mph (s)": "15.8",
                    "year": "81"
                },
                {
                    "name": "Renault 5 Gtl",
                    "economy (mpg)": "36",
                    "cylinders": "4",
                    "displacement (cc)": "79",
                    "power (hp)": "58",
                    "weight (lb)": "1825",
                    "0-60 mph (s)": "18.6",
                    "year": "77"
                },
                {
                    "name": "Renault Lecar Deluxe",
                    "economy (mpg)": "40.9",
                    "cylinders": "4",
                    "displacement (cc)": "85",
                    "power (hp)": "",
                    "weight (lb)": "1835",
                    "0-60 mph (s)": "17.3",
                    "year": "80"
                },
                {
                    "name": "Saab 900S",
                    "economy (mpg)": "",
                    "cylinders": "4",
                    "displacement (cc)": "121",
                    "power (hp)": "110",
                    "weight (lb)": "2800",
                    "0-60 mph (s)": "15.4",
                    "year": "81"
                },
                {
                    "name": "Saab 99E",
                    "economy (mpg)": "25",
                    "cylinders": "4",
                    "displacement (cc)": "104",
                    "power (hp)": "95",
                    "weight (lb)": "2375",
                    "0-60 mph (s)": "17.5",
                    "year": "70"
                },
                {
                    "name": "Saab 99GLE",
                    "economy (mpg)": "21.6",
                    "cylinders": "4",
                    "displacement (cc)": "121",
                    "power (hp)": "115",
                    "weight (lb)": "2795",
                    "0-60 mph (s)": "15.7",
                    "year": "78"
                },
                {
                    "name": "Saab 99LE",
                    "economy (mpg)": "24",
                    "cylinders": "4",
                    "displacement (cc)": "121",
                    "power (hp)": "110",
                    "weight (lb)": "2660",
                    "0-60 mph (s)": "14",
                    "year": "73"
                },
                {
                    "name": "Saab 99LE",
                    "economy (mpg)": "25",
                    "cylinders": "4",
                    "displacement (cc)": "121",
                    "power (hp)": "115",
                    "weight (lb)": "2671",
                    "0-60 mph (s)": "13.5",
                    "year": "75"
                },
                {
                    "name": "Subaru DL",
                    "economy (mpg)": "30",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "67",
                    "weight (lb)": "1985",
                    "0-60 mph (s)": "16.4",
                    "year": "77"
                },
                {
                    "name": "Subaru DL",
                    "economy (mpg)": "33.8",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "67",
                    "weight (lb)": "2145",
                    "0-60 mph (s)": "18",
                    "year": "80"
                },
                {
                    "name": "Subaru",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "108",
                    "power (hp)": "93",
                    "weight (lb)": "2391",
                    "0-60 mph (s)": "15.5",
                    "year": "74"
                },
                {
                    "name": "Subaru",
                    "economy (mpg)": "32.3",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "67",
                    "weight (lb)": "2065",
                    "0-60 mph (s)": "17.8",
                    "year": "81"
                },
                {
                    "name": "Toyota Carina",
                    "economy (mpg)": "20",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "88",
                    "weight (lb)": "2279",
                    "0-60 mph (s)": "19",
                    "year": "73"
                },
                {
                    "name": "Toyota Celica GT Liftback",
                    "economy (mpg)": "21.1",
                    "cylinders": "4",
                    "displacement (cc)": "134",
                    "power (hp)": "95",
                    "weight (lb)": "2515",
                    "0-60 mph (s)": "14.8",
                    "year": "78"
                },
                {
                    "name": "Toyota Celica GT",
                    "economy (mpg)": "32",
                    "cylinders": "4",
                    "displacement (cc)": "144",
                    "power (hp)": "96",
                    "weight (lb)": "2665",
                    "0-60 mph (s)": "13.9",
                    "year": "82"
                },
                {
                    "name": "Toyota Corolla 1200",
                    "economy (mpg)": "31",
                    "cylinders": "4",
                    "displacement (cc)": "71",
                    "power (hp)": "65",
                    "weight (lb)": "1773",
                    "0-60 mph (s)": "19",
                    "year": "71"
                },
                {
                    "name": "Toyota Corolla 1200",
                    "economy (mpg)": "32",
                    "cylinders": "4",
                    "displacement (cc)": "71",
                    "power (hp)": "65",
                    "weight (lb)": "1836",
                    "0-60 mph (s)": "21",
                    "year": "74"
                },
                {
                    "name": "Toyota Corolla 1600 (Wagon)",
                    "economy (mpg)": "27",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "88",
                    "weight (lb)": "2100",
                    "0-60 mph (s)": "16.5",
                    "year": "72"
                },
                {
                    "name": "Toyota Corolla Liftback",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "75",
                    "weight (lb)": "2265",
                    "0-60 mph (s)": "18.2",
                    "year": "77"
                },
                {
                    "name": "Toyota Corolla Tercel",
                    "economy (mpg)": "38.1",
                    "cylinders": "4",
                    "displacement (cc)": "89",
                    "power (hp)": "60",
                    "weight (lb)": "1968",
                    "0-60 mph (s)": "18.8",
                    "year": "80"
                },
                {
                    "name": "Toyota Corolla",
                    "economy (mpg)": "28",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "75",
                    "weight (lb)": "2155",
                    "0-60 mph (s)": "16.4",
                    "year": "76"
                },
                {
                    "name": "Toyota Corolla",
                    "economy (mpg)": "29",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "75",
                    "weight (lb)": "2171",
                    "0-60 mph (s)": "16",
                    "year": "75"
                },
                {
                    "name": "Toyota Corolla",
                    "economy (mpg)": "32.2",
                    "cylinders": "4",
                    "displacement (cc)": "108",
                    "power (hp)": "75",
                    "weight (lb)": "2265",
                    "0-60 mph (s)": "15.2",
                    "year": "80"
                },
                {
                    "name": "Toyota Corolla",
                    "economy (mpg)": "32.4",
                    "cylinders": "4",
                    "displacement (cc)": "108",
                    "power (hp)": "75",
                    "weight (lb)": "2350",
                    "0-60 mph (s)": "16.8",
                    "year": "81"
                },
                {
                    "name": "Toyota Corolla",
                    "economy (mpg)": "34",
                    "cylinders": "4",
                    "displacement (cc)": "108",
                    "power (hp)": "70",
                    "weight (lb)": "2245",
                    "0-60 mph (s)": "16.9",
                    "year": "82"
                },
                {
                    "name": "Toyota Corona Hardtop",
                    "economy (mpg)": "24",
                    "cylinders": "4",
                    "displacement (cc)": "113",
                    "power (hp)": "95",
                    "weight (lb)": "2278",
                    "0-60 mph (s)": "15.5",
                    "year": "72"
                },
                {
                    "name": "Toyota Corona Liftback",
                    "economy (mpg)": "29.8",
                    "cylinders": "4",
                    "displacement (cc)": "134",
                    "power (hp)": "90",
                    "weight (lb)": "2711",
                    "0-60 mph (s)": "15.5",
                    "year": "80"
                },
                {
                    "name": "Toyota Corona Mark II",
                    "economy (mpg)": "24",
                    "cylinders": "4",
                    "displacement (cc)": "113",
                    "power (hp)": "95",
                    "weight (lb)": "2372",
                    "0-60 mph (s)": "15",
                    "year": "70"
                },
                {
                    "name": "Toyota Corona",
                    "economy (mpg)": "24",
                    "cylinders": "4",
                    "displacement (cc)": "134",
                    "power (hp)": "96",
                    "weight (lb)": "2702",
                    "0-60 mph (s)": "13.5",
                    "year": "75"
                },
                {
                    "name": "Toyota Corona",
                    "economy (mpg)": "25",
                    "cylinders": "4",
                    "displacement (cc)": "113",
                    "power (hp)": "95",
                    "weight (lb)": "2228",
                    "0-60 mph (s)": "14",
                    "year": "71"
                },
                {
                    "name": "Toyota Corona",
                    "economy (mpg)": "27.5",
                    "cylinders": "4",
                    "displacement (cc)": "134",
                    "power (hp)": "95",
                    "weight (lb)": "2560",
                    "0-60 mph (s)": "14.2",
                    "year": "78"
                },
                {
                    "name": "Toyota Corona",
                    "economy (mpg)": "31",
                    "cylinders": "4",
                    "displacement (cc)": "76",
                    "power (hp)": "52",
                    "weight (lb)": "1649",
                    "0-60 mph (s)": "16.5",
                    "year": "74"
                },
                {
                    "name": "Toyota Cressida",
                    "economy (mpg)": "25.4",
                    "cylinders": "6",
                    "displacement (cc)": "168",
                    "power (hp)": "116",
                    "weight (lb)": "2900",
                    "0-60 mph (s)": "12.6",
                    "year": "81"
                },
                {
                    "name": "Toyota Mark II",
                    "economy (mpg)": "19",
                    "cylinders": "6",
                    "displacement (cc)": "156",
                    "power (hp)": "108",
                    "weight (lb)": "2930",
                    "0-60 mph (s)": "15.5",
                    "year": "76"
                },
                {
                    "name": "Toyota Mark II",
                    "economy (mpg)": "20",
                    "cylinders": "6",
                    "displacement (cc)": "156",
                    "power (hp)": "122",
                    "weight (lb)": "2807",
                    "0-60 mph (s)": "13.5",
                    "year": "73"
                },
                {
                    "name": "Toyota Starlet",
                    "economy (mpg)": "39.1",
                    "cylinders": "4",
                    "displacement (cc)": "79",
                    "power (hp)": "58",
                    "weight (lb)": "1755",
                    "0-60 mph (s)": "16.9",
                    "year": "81"
                },
                {
                    "name": "Toyota Tercel",
                    "economy (mpg)": "37.7",
                    "cylinders": "4",
                    "displacement (cc)": "89",
                    "power (hp)": "62",
                    "weight (lb)": "2050",
                    "0-60 mph (s)": "17.3",
                    "year": "81"
                },
                {
                    "name": "Toyouta Corona Mark II (Wagon)",
                    "economy (mpg)": "23",
                    "cylinders": "4",
                    "displacement (cc)": "120",
                    "power (hp)": "97",
                    "weight (lb)": "2506",
                    "0-60 mph (s)": "14.5",
                    "year": "72"
                },
                {
                    "name": "Triumph TR7 Coupe",
                    "economy (mpg)": "35",
                    "cylinders": "4",
                    "displacement (cc)": "122",
                    "power (hp)": "88",
                    "weight (lb)": "2500",
                    "0-60 mph (s)": "15.1",
                    "year": "80"
                },
                {
                    "name": "Vokswagen Rabbit",
                    "economy (mpg)": "29.8",
                    "cylinders": "4",
                    "displacement (cc)": "89",
                    "power (hp)": "62",
                    "weight (lb)": "1845",
                    "0-60 mph (s)": "15.3",
                    "year": "80"
                },
                {
                    "name": "Volkswagen 1131 Deluxe Sedan",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "46",
                    "weight (lb)": "1835",
                    "0-60 mph (s)": "20.5",
                    "year": "70"
                },
                {
                    "name": "Volkswagen 411 (Wagon)",
                    "economy (mpg)": "22",
                    "cylinders": "4",
                    "displacement (cc)": "121",
                    "power (hp)": "76",
                    "weight (lb)": "2511",
                    "0-60 mph (s)": "18",
                    "year": "72"
                },
                {
                    "name": "Volkswagen Dasher (Diesel)",
                    "economy (mpg)": "43.4",
                    "cylinders": "4",
                    "displacement (cc)": "90",
                    "power (hp)": "48",
                    "weight (lb)": "2335",
                    "0-60 mph (s)": "23.7",
                    "year": "80"
                },
                {
                    "name": "Volkswagen Dasher",
                    "economy (mpg)": "25",
                    "cylinders": "4",
                    "displacement (cc)": "90",
                    "power (hp)": "71",
                    "weight (lb)": "2223",
                    "0-60 mph (s)": "16.5",
                    "year": "75"
                },
                {
                    "name": "Volkswagen Dasher",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "79",
                    "power (hp)": "67",
                    "weight (lb)": "1963",
                    "0-60 mph (s)": "15.5",
                    "year": "74"
                },
                {
                    "name": "Volkswagen Dasher",
                    "economy (mpg)": "30.5",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "78",
                    "weight (lb)": "2190",
                    "0-60 mph (s)": "14.1",
                    "year": "77"
                },
                {
                    "name": "Volkswagen Jetta",
                    "economy (mpg)": "33",
                    "cylinders": "4",
                    "displacement (cc)": "105",
                    "power (hp)": "74",
                    "weight (lb)": "2190",
                    "0-60 mph (s)": "14.2",
                    "year": "81"
                },
                {
                    "name": "Volkswagen Model 111",
                    "economy (mpg)": "27",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "60",
                    "weight (lb)": "1834",
                    "0-60 mph (s)": "19",
                    "year": "71"
                },
                {
                    "name": "Volkswagen Pickup",
                    "economy (mpg)": "44",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "52",
                    "weight (lb)": "2130",
                    "0-60 mph (s)": "24.6",
                    "year": "82"
                },
                {
                    "name": "Volkswagen Rabbit C (Diesel)",
                    "economy (mpg)": "44.3",
                    "cylinders": "4",
                    "displacement (cc)": "90",
                    "power (hp)": "48",
                    "weight (lb)": "2085",
                    "0-60 mph (s)": "21.7",
                    "year": "80"
                },
                {
                    "name": "Volkswagen Rabbit Custom Diesel",
                    "economy (mpg)": "43.1",
                    "cylinders": "4",
                    "displacement (cc)": "90",
                    "power (hp)": "48",
                    "weight (lb)": "1985",
                    "0-60 mph (s)": "21.5",
                    "year": "78"
                },
                {
                    "name": "Volkswagen Rabbit Custom",
                    "economy (mpg)": "29",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "78",
                    "weight (lb)": "1940",
                    "0-60 mph (s)": "14.5",
                    "year": "77"
                },
                {
                    "name": "Volkswagen Rabbit Custom",
                    "economy (mpg)": "31.9",
                    "cylinders": "4",
                    "displacement (cc)": "89",
                    "power (hp)": "71",
                    "weight (lb)": "1925",
                    "0-60 mph (s)": "14",
                    "year": "79"
                },
                {
                    "name": "Volkswagen Rabbit L",
                    "economy (mpg)": "36",
                    "cylinders": "4",
                    "displacement (cc)": "105",
                    "power (hp)": "74",
                    "weight (lb)": "1980",
                    "0-60 mph (s)": "15.3",
                    "year": "82"
                },
                {
                    "name": "Volkswagen Rabbit",
                    "economy (mpg)": "29",
                    "cylinders": "4",
                    "displacement (cc)": "90",
                    "power (hp)": "70",
                    "weight (lb)": "1937",
                    "0-60 mph (s)": "14",
                    "year": "75"
                },
                {
                    "name": "Volkswagen Rabbit",
                    "economy (mpg)": "29",
                    "cylinders": "4",
                    "displacement (cc)": "90",
                    "power (hp)": "70",
                    "weight (lb)": "1937",
                    "0-60 mph (s)": "14.2",
                    "year": "76"
                },
                {
                    "name": "Volkswagen Rabbit",
                    "economy (mpg)": "29.5",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "71",
                    "weight (lb)": "1825",
                    "0-60 mph (s)": "12.2",
                    "year": "76"
                },
                {
                    "name": "Volkswagen Rabbit",
                    "economy (mpg)": "41.5",
                    "cylinders": "4",
                    "displacement (cc)": "98",
                    "power (hp)": "76",
                    "weight (lb)": "2144",
                    "0-60 mph (s)": "14.7",
                    "year": "80"
                },
                {
                    "name": "Volkswagen Scirocco",
                    "economy (mpg)": "31.5",
                    "cylinders": "4",
                    "displacement (cc)": "89",
                    "power (hp)": "71",
                    "weight (lb)": "1990",
                    "0-60 mph (s)": "14.9",
                    "year": "78"
                },
                {
                    "name": "Volkswagen Super Beetle 117",
                    "economy (mpg)": "",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "48",
                    "weight (lb)": "1978",
                    "0-60 mph (s)": "20",
                    "year": "71"
                },
                {
                    "name": "Volkswagen Super Beetle",
                    "economy (mpg)": "26",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "46",
                    "weight (lb)": "1950",
                    "0-60 mph (s)": "21",
                    "year": "73"
                },
                {
                    "name": "Volkswagen Type 3",
                    "economy (mpg)": "23",
                    "cylinders": "4",
                    "displacement (cc)": "97",
                    "power (hp)": "54",
                    "weight (lb)": "2254",
                    "0-60 mph (s)": "23.5",
                    "year": "72"
                },
                {
                    "name": "Volvo 144EA",
                    "economy (mpg)": "19",
                    "cylinders": "4",
                    "displacement (cc)": "121",
                    "power (hp)": "112",
                    "weight (lb)": "2868",
                    "0-60 mph (s)": "15.5",
                    "year": "73"
                },
                {
                    "name": "Volvo 145E (Wagon)",
                    "economy (mpg)": "18",
                    "cylinders": "4",
                    "displacement (cc)": "121",
                    "power (hp)": "112",
                    "weight (lb)": "2933",
                    "0-60 mph (s)": "14.5",
                    "year": "72"
                },
                {
                    "name": "Volvo 244DL",
                    "economy (mpg)": "22",
                    "cylinders": "4",
                    "displacement (cc)": "121",
                    "power (hp)": "98",
                    "weight (lb)": "2945",
                    "0-60 mph (s)": "14.5",
                    "year": "75"
                },
                {
                    "name": "Volvo 245",
                    "economy (mpg)": "20",
                    "cylinders": "4",
                    "displacement (cc)": "130",
                    "power (hp)": "102",
                    "weight (lb)": "3150",
                    "0-60 mph (s)": "15.7",
                    "year": "76"
                },
                {
                    "name": "Volvo 264GL",
                    "economy (mpg)": "17",
                    "cylinders": "6",
                    "displacement (cc)": "163",
                    "power (hp)": "125",
                    "weight (lb)": "3140",
                    "0-60 mph (s)": "13.6",
                    "year": "78"
                },
                {
                    "name": "Volvo Diesel",
                    "economy (mpg)": "30.7",
                    "cylinders": "6",
                    "displacement (cc)": "145",
                    "power (hp)": "76",
                    "weight (lb)": "3160",
                    "0-60 mph (s)": "19.6",
                    "year": "81"
                }
            ]
        }
    })


                

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
'use strict';
(function() {
  
  module.export = angular.module('mainApp.controllers')

  .controller('scatterChartCtrl', scatterChartCtrl);
  
  function scatterChartCtrl($scope, chartDataService){
    var shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'];
    
    $scope.selectX = true;
    $scope.selectY = true;
    $scope.updateX = chartDataService.updateX;
    $scope.updateY = chartDataService.updateY;
    chartDataService.xField = 'x';
    chartDataService.yField = 'y';
    chartDataService.scope = $scope;
    chartDataService.updateField = updateMethod;
    
    $scope.chartData = [{"key": "", "values": chartDataService.initValues({
                        x: null, 
                        y: null, 
                        size: Math.random(), 
                        shapes: shapes[Math.random() % 6]}) 
                      }];

    function updateMethod(data, field) {
      for(var i = 0; i < data.length; ++i) {
        $scope.chartData[0].values[i][field] = data[i];
      }
    }
    $scope.options = {
        chart: {
            type: 'scatterChart',
            height: 450,
            color: d3.scale.category10().range(),
            scatter: {
                onlyCircles: false
            },
            showDistX: true,
            showDistY: true,
            tooltipContent: function(key) {
                return '<h3>' + key + '</h3>';
            },
            transitionDuration: 350,
            xAxis: {
                axisLabel: 'X Axis',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                }
            },
            yAxis: {
                axisLabel: 'Y Axis',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: 30
            }
        }
    };
  }
})();

},{}],17:[function(require,module,exports){
'use strict';

module.export = angular.module('mainApp.controllers')

    .controller('scatterPlusLineChartCtrl', function($scope){

        $scope.options = {
            chart: {
                type: 'scatterPlusLineChart',
                height: 450,
                color: d3.scale.category10().range(),
                scatter: {
                    onlyCircles: false
                },
                showDistX: true,
                showDistY: true,
                tooltipContent: function(key) {
                    return '<h3>' + key + '</h3>';
                },
                transitionDuration: 350,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: 30
                }
            }
        };

        $scope.data = generateData(4,40);

        /* Random Data Generator (took from nvd3.org) */
        function generateData(groups, points) { //# groups,# points per group
            var data = [],
                shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
                random = d3.random.normal();

            for (var i = 0; i < groups; i++) {
                data.push({
                    key: 'Group ' + i,
                    values: [],
                    slope: Math.random() - .01,
                    intercept: Math.random() - .5
                });

                for (var j = 0; j < points; j++) {
                    data[i].values.push({
                        x: random(),
                        y: random(),
                        size: Math.random(),
                        shape: shapes[j % 6]
                    });
                }
            }
            return data;
        }
    })

},{}],18:[function(require,module,exports){
'use strict';

module.export = angular.module('mainApp.controllers')

    .controller('sparklinePlusCtrl', function($scope){

        $scope.options = {
            chart: {
                type: 'sparklinePlus',
                height: 450,
                x: function(d, i){return i;},
                xTickFormat: function(d) {
                    return d3.time.format('%x')(new Date($scope.data[d].x))
                },
                transitionDuration: 250
            }
        };

        //$scope.data = sine();
        $scope.data = volatileChart(130.0, 0.02);
        //$scope.data = volatileChart(25.0, 0.09,30);

        /* Random Data Generator (took from nvd3.org) */
        function sine() {
            var sin = [];
            var now =+new Date();

            for (var i = 0; i < 100; i++) {
                sin.push({x: now + i * 1000 * 60 * 60 * 24, y: Math.sin(i/10)});
            }

            return sin;
        }

        function volatileChart(startPrice, volatility, numPoints) {
            var rval =  [];
            var now =+new Date();
            numPoints = numPoints || 100;
            for(var i = 1; i < numPoints; i++) {

                rval.push({x: now + i * 1000 * 60 * 60 * 24, y: startPrice});
                var rnd = Math.random();
                var changePct = 2 * volatility * rnd;
                if ( changePct > volatility) {
                    changePct -= (2*volatility);
                }
                startPrice = startPrice + startPrice * changePct;
            }
            return rval;
        }
    })

},{}],19:[function(require,module,exports){
'use strict';

module.export = angular.module('mainApp.controllers')

    .controller('stackedAreaChartCtrl', function($scope){

        $scope.options = {
            chart: {
                type: 'stackedAreaChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 40
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                useVoronoi: false,
                clipEdge: true,
                transitionDuration: 500,
                useInteractiveGuideline: true,
                xAxis: {
                    showMaxMin: false,
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }
            }
        };

        $scope.data = [
            {
                "key" : "North America" ,
                "values" : [ [ 1025409600000 , 23.041422681023] , [ 1028088000000 , 19.854291255832] , [ 1030766400000 , 21.02286281168] , [ 1033358400000 , 22.093608385173] , [ 1036040400000 , 25.108079299458] , [ 1038632400000 , 26.982389242348] , [ 1041310800000 , 19.828984957662] , [ 1043989200000 , 19.914055036294] , [ 1046408400000 , 19.436150539916] , [ 1049086800000 , 21.558650338602] , [ 1051675200000 , 24.395594061773] , [ 1054353600000 , 24.747089309384] , [ 1056945600000 , 23.491755498807] , [ 1059624000000 , 23.376634878164] , [ 1062302400000 , 24.581223154533] , [ 1064894400000 , 24.922476843538] , [ 1067576400000 , 27.357712939042] , [ 1070168400000 , 26.503020572593] , [ 1072846800000 , 26.658901244878] , [ 1075525200000 , 27.065704156445] , [ 1078030800000 , 28.735320452588] , [ 1080709200000 , 31.572277846319] , [ 1083297600000 , 30.932161503638] , [ 1085976000000 , 31.627029785554] , [ 1088568000000 , 28.728743674232] , [ 1091246400000 , 26.858365172675] , [ 1093924800000 , 27.279922830032] , [ 1096516800000 , 34.408301211324] , [ 1099195200000 , 34.794362930439] , [ 1101790800000 , 35.609978198951] , [ 1104469200000 , 33.574394968037] , [ 1107147600000 , 31.979405070598] , [ 1109566800000 , 31.19009040297] , [ 1112245200000 , 31.083933968994] , [ 1114833600000 , 29.668971113185] , [ 1117512000000 , 31.490638014379] , [ 1120104000000 , 31.818617451128] , [ 1122782400000 , 32.960314008183] , [ 1125460800000 , 31.313383196209] , [ 1128052800000 , 33.125486081852] , [ 1130734800000 , 32.791805509149] , [ 1133326800000 , 33.506038030366] , [ 1136005200000 , 26.96501697216] , [ 1138683600000 , 27.38478809681] , [ 1141102800000 , 27.371377218209] , [ 1143781200000 , 26.309915460827] , [ 1146369600000 , 26.425199957518] , [ 1149048000000 , 26.823411519396] , [ 1151640000000 , 23.850443591587] , [ 1154318400000 , 23.158355444054] , [ 1156996800000 , 22.998689393695] , [ 1159588800000 , 27.9771285113] , [ 1162270800000 , 29.073672469719] , [ 1164862800000 , 28.587640408904] , [ 1167541200000 , 22.788453687637] , [ 1170219600000 , 22.429199073597] , [ 1172638800000 , 22.324103271052] , [ 1175313600000 , 17.558388444187] , [ 1177905600000 , 16.769518096208] , [ 1180584000000 , 16.214738201301] , [ 1183176000000 , 18.729632971229] , [ 1185854400000 , 18.814523318847] , [ 1188532800000 , 19.789986451358] , [ 1191124800000 , 17.070049054933] , [ 1193803200000 , 16.121349575716] , [ 1196398800000 , 15.141659430091] , [ 1199077200000 , 17.175388025297] , [ 1201755600000 , 17.286592443522] , [ 1204261200000 , 16.323141626568] , [ 1206936000000 , 19.231263773952] , [ 1209528000000 , 18.446256391095] , [ 1212206400000 , 17.822632399764] , [ 1214798400000 , 15.53936647598] , [ 1217476800000 , 15.255131790217] , [ 1220155200000 , 15.660963922592] , [ 1222747200000 , 13.254482273698] , [ 1225425600000 , 11.920796202299] , [ 1228021200000 , 12.122809090924] , [ 1230699600000 , 15.691026271393] , [ 1233378000000 , 14.720881635107] , [ 1235797200000 , 15.387939360044] , [ 1238472000000 , 13.765436672228] , [ 1241064000000 , 14.631445864799] , [ 1243742400000 , 14.292446536221] , [ 1246334400000 , 16.170071367017] , [ 1249012800000 , 15.948135554337] , [ 1251691200000 , 16.612872685134] , [ 1254283200000 , 18.778338719091] , [ 1256961600000 , 16.756026065421] , [ 1259557200000 , 19.385804443146] , [ 1262235600000 , 22.950590240168] , [ 1264914000000 , 23.61159018141] , [ 1267333200000 , 25.708586989581] , [ 1270008000000 , 26.883915999885] , [ 1272600000000 , 25.893486687065] , [ 1275278400000 , 24.678914263176] , [ 1277870400000 , 25.937275793024] , [ 1280548800000 , 29.461381693838] , [ 1283227200000 , 27.357322961861] , [ 1285819200000 , 29.057235285673] , [ 1288497600000 , 28.549434189386] , [ 1291093200000 , 28.506352379724] , [ 1293771600000 , 29.449241421598] , [ 1296450000000 , 25.796838168807] , [ 1298869200000 , 28.740145449188] , [ 1301544000000 , 22.091744141872] , [ 1304136000000 , 25.07966254541] , [ 1306814400000 , 23.674906973064] , [ 1309406400000 , 23.418002742929] , [ 1312084800000 , 23.24364413887] , [ 1314763200000 , 31.591854066817] , [ 1317355200000 , 31.497112374114] , [ 1320033600000 , 26.67238082043] , [ 1322629200000 , 27.297080015495] , [ 1325307600000 , 20.174315530051] , [ 1327986000000 , 19.631084213898] , [ 1330491600000 , 20.366462219461] , [ 1333166400000 , 19.284784434185] , [ 1335758400000 , 19.157810257624]]
            },

            {
                "key" : "Africa" ,
                "values" : [ [ 1025409600000 , 7.9356392949025] , [ 1028088000000 , 7.4514668527298] , [ 1030766400000 , 7.9085410566608] , [ 1033358400000 , 5.8996782364764] , [ 1036040400000 , 6.0591869346923] , [ 1038632400000 , 5.9667815800451] , [ 1041310800000 , 8.65528925664] , [ 1043989200000 , 8.7690763386254] , [ 1046408400000 , 8.6386160387453] , [ 1049086800000 , 5.9895557449743] , [ 1051675200000 , 6.3840324338159] , [ 1054353600000 , 6.5196511461441] , [ 1056945600000 , 7.0738618553114] , [ 1059624000000 , 6.5745957367133] , [ 1062302400000 , 6.4658359184444] , [ 1064894400000 , 2.7622758754954] , [ 1067576400000 , 2.9794782986241] , [ 1070168400000 , 2.8735432712019] , [ 1072846800000 , 1.6344817513645] , [ 1075525200000 , 1.5869248754883] , [ 1078030800000 , 1.7172279157246] , [ 1080709200000 , 1.9649927409867] , [ 1083297600000 , 2.0261695079196] , [ 1085976000000 , 2.0541261923929] , [ 1088568000000 , 3.9466318927569] , [ 1091246400000 , 3.7826770946089] , [ 1093924800000 , 3.9543021004028] , [ 1096516800000 , 3.8309891064711] , [ 1099195200000 , 3.6340958946166] , [ 1101790800000 , 3.5289755762525] , [ 1104469200000 , 5.702378559857] , [ 1107147600000 , 5.6539569019223] , [ 1109566800000 , 5.5449506370392] , [ 1112245200000 , 4.7579993280677] , [ 1114833600000 , 4.4816139372906] , [ 1117512000000 , 4.5965558568606] , [ 1120104000000 , 4.3747066116976] , [ 1122782400000 , 4.4588822917087] , [ 1125460800000 , 4.4460351848286] , [ 1128052800000 , 3.7989113035136] , [ 1130734800000 , 3.7743883140088] , [ 1133326800000 , 3.7727852823828] , [ 1136005200000 , 7.2968111448895] , [ 1138683600000 , 7.2800122043237] , [ 1141102800000 , 7.1187787503354] , [ 1143781200000 , 8.351887016482] , [ 1146369600000 , 8.4156698763993] , [ 1149048000000 , 8.1673298604231] , [ 1151640000000 , 5.5132447126042] , [ 1154318400000 , 6.1152537710599] , [ 1156996800000 , 6.076765091942] , [ 1159588800000 , 4.6304473798646] , [ 1162270800000 , 4.6301068469402] , [ 1164862800000 , 4.3466656309389] , [ 1167541200000 , 6.830104897003] , [ 1170219600000 , 7.241633040029] , [ 1172638800000 , 7.1432372054153] , [ 1175313600000 , 10.608942063374] , [ 1177905600000 , 10.914964549494] , [ 1180584000000 , 10.933223880565] , [ 1183176000000 , 8.3457524851265] , [ 1185854400000 , 8.1078413081882] , [ 1188532800000 , 8.2697185922474] , [ 1191124800000 , 8.4742436475968] , [ 1193803200000 , 8.4994601179319] , [ 1196398800000 , 8.7387319683243] , [ 1199077200000 , 6.8829183612895] , [ 1201755600000 , 6.984133637885] , [ 1204261200000 , 7.0860136043287] , [ 1206936000000 , 4.3961787956053] , [ 1209528000000 , 3.8699674365231] , [ 1212206400000 , 3.6928925238305] , [ 1214798400000 , 6.7571718894253] , [ 1217476800000 , 6.4367313362344] , [ 1220155200000 , 6.4048441521454] , [ 1222747200000 , 5.4643833239669] , [ 1225425600000 , 5.3150786833374] , [ 1228021200000 , 5.3011272612576] , [ 1230699600000 , 4.1203601430809] , [ 1233378000000 , 4.0881783200525] , [ 1235797200000 , 4.1928665957189] , [ 1238472000000 , 7.0249415663205] , [ 1241064000000 , 7.006530880769] , [ 1243742400000 , 6.994835633224] , [ 1246334400000 , 6.1220222336254] , [ 1249012800000 , 6.1177436137653] , [ 1251691200000 , 6.1413396231981] , [ 1254283200000 , 4.8046006145874] , [ 1256961600000 , 4.6647600660544] , [ 1259557200000 , 4.544865006255] , [ 1262235600000 , 6.0488249316539] , [ 1264914000000 , 6.3188669540206] , [ 1267333200000 , 6.5873958262306] , [ 1270008000000 , 6.2281189839578] , [ 1272600000000 , 5.8948915746059] , [ 1275278400000 , 5.5967320482214] , [ 1277870400000 , 0.99784432084837] , [ 1280548800000 , 1.0950794175359] , [ 1283227200000 , 0.94479734407491] , [ 1285819200000 , 1.222093988688] , [ 1288497600000 , 1.335093106856] , [ 1291093200000 , 1.3302565104985] , [ 1293771600000 , 1.340824670897] , [ 1296450000000 , 0] , [ 1298869200000 , 0] , [ 1301544000000 , 0] , [ 1304136000000 , 0] , [ 1306814400000 , 0] , [ 1309406400000 , 0] , [ 1312084800000 , 0] , [ 1314763200000 , 0] , [ 1317355200000 , 4.4583692315] , [ 1320033600000 , 3.6493043348059] , [ 1322629200000 , 3.8610064091761] , [ 1325307600000 , 5.5144800685202] , [ 1327986000000 , 5.1750695220791] , [ 1330491600000 , 5.6710066952691] , [ 1333166400000 , 5.5611890039181] , [ 1335758400000 , 5.5979368839939]]
            },

            {
                "key" : "South America" ,
                "values" : [ [ 1025409600000 , 7.9149900245423] , [ 1028088000000 , 7.0899888751059] , [ 1030766400000 , 7.5996132380614] , [ 1033358400000 , 8.2741174301034] , [ 1036040400000 , 9.3564460833513] , [ 1038632400000 , 9.7066786059904] , [ 1041310800000 , 10.213363052343] , [ 1043989200000 , 10.285809585273] , [ 1046408400000 , 10.222053149228] , [ 1049086800000 , 8.6188592137975] , [ 1051675200000 , 9.3335447543566] , [ 1054353600000 , 8.9312402186628] , [ 1056945600000 , 8.1895089343658] , [ 1059624000000 , 8.260622135079] , [ 1062302400000 , 7.7700786851364] , [ 1064894400000 , 7.9907428771318] , [ 1067576400000 , 8.7769091865606] , [ 1070168400000 , 8.4855077060661] , [ 1072846800000 , 9.6277203033655] , [ 1075525200000 , 9.9685913452624] , [ 1078030800000 , 10.615085181759] , [ 1080709200000 , 9.2902488079646] , [ 1083297600000 , 8.8610439830061] , [ 1085976000000 , 9.1075344931229] , [ 1088568000000 , 9.9156737639203] , [ 1091246400000 , 9.7826003238782] , [ 1093924800000 , 10.55403610555] , [ 1096516800000 , 10.926900264097] , [ 1099195200000 , 10.903144818736] , [ 1101790800000 , 10.862890389067] , [ 1104469200000 , 10.64604998964] , [ 1107147600000 , 10.042790814087] , [ 1109566800000 , 9.7173391591038] , [ 1112245200000 , 9.6122415755443] , [ 1114833600000 , 9.4337921146562] , [ 1117512000000 , 9.814827171183] , [ 1120104000000 , 12.059260396788] , [ 1122782400000 , 12.139649903873] , [ 1125460800000 , 12.281290663822] , [ 1128052800000 , 8.8037085409056] , [ 1130734800000 , 8.6300618239176] , [ 1133326800000 , 9.1225708491432] , [ 1136005200000 , 12.988124170836] , [ 1138683600000 , 13.356778764353] , [ 1141102800000 , 13.611196863271] , [ 1143781200000 , 6.8959030061189] , [ 1146369600000 , 6.9939633271353] , [ 1149048000000 , 6.7241510257676] , [ 1151640000000 , 5.5611293669517] , [ 1154318400000 , 5.6086488714041] , [ 1156996800000 , 5.4962849907033] , [ 1159588800000 , 6.9193153169278] , [ 1162270800000 , 7.0016334389778] , [ 1164862800000 , 6.7865422443273] , [ 1167541200000 , 9.0006454225383] , [ 1170219600000 , 9.2233916171431] , [ 1172638800000 , 8.8929316009479] , [ 1175313600000 , 10.345937520404] , [ 1177905600000 , 10.075914677026] , [ 1180584000000 , 10.089006188111] , [ 1183176000000 , 10.598330295008] , [ 1185854400000 , 9.9689546533009] , [ 1188532800000 , 9.7740580198146] , [ 1191124800000 , 10.558483060626] , [ 1193803200000 , 9.9314651823603] , [ 1196398800000 , 9.3997715873769] , [ 1199077200000 , 8.4086493387262] , [ 1201755600000 , 8.9698309085926] , [ 1204261200000 , 8.2778357995396] , [ 1206936000000 , 8.8585045600123] , [ 1209528000000 , 8.7013756413322] , [ 1212206400000 , 7.7933605469443] , [ 1214798400000 , 7.0236183483064] , [ 1217476800000 , 6.9873088186829] , [ 1220155200000 , 6.8031713070097] , [ 1222747200000 , 6.6869531315723] , [ 1225425600000 , 6.138256993963] , [ 1228021200000 , 5.6434994016354] , [ 1230699600000 , 5.495220262512] , [ 1233378000000 , 4.6885326869846] , [ 1235797200000 , 4.4524349883438] , [ 1238472000000 , 5.6766520778185] , [ 1241064000000 , 5.7675774480752] , [ 1243742400000 , 5.7882863168337] , [ 1246334400000 , 7.2666010034924] , [ 1249012800000 , 7.5191821322261] , [ 1251691200000 , 7.849651451445] , [ 1254283200000 , 10.383992037985] , [ 1256961600000 , 9.0653691861818] , [ 1259557200000 , 9.6705248324159] , [ 1262235600000 , 10.856380561349] , [ 1264914000000 , 11.27452370892] , [ 1267333200000 , 11.754156529088] , [ 1270008000000 , 8.2870811422455] , [ 1272600000000 , 8.0210264360699] , [ 1275278400000 , 7.5375074474865] , [ 1277870400000 , 8.3419527338039] , [ 1280548800000 , 9.4197471818443] , [ 1283227200000 , 8.7321733185797] , [ 1285819200000 , 9.6627062648126] , [ 1288497600000 , 10.187962234548] , [ 1291093200000 , 9.8144201733476] , [ 1293771600000 , 10.275723361712] , [ 1296450000000 , 16.796066079353] , [ 1298869200000 , 17.543254984075] , [ 1301544000000 , 16.673660675083] , [ 1304136000000 , 17.963944353609] , [ 1306814400000 , 16.63774086721] , [ 1309406400000 , 15.84857094609] , [ 1312084800000 , 14.767303362181] , [ 1314763200000 , 24.778452182433] , [ 1317355200000 , 18.370353229999] , [ 1320033600000 , 15.253137429099] , [ 1322629200000 , 14.989600840649] , [ 1325307600000 , 16.052539160125] , [ 1327986000000 , 16.424390322793] , [ 1330491600000 , 17.884020741104] , [ 1333166400000 , 18.372698836036] , [ 1335758400000 , 18.315881576096]]
            },

            {
                "key" : "Asia" ,
                "values" : [ [ 1025409600000 , 13.153938631352] , [ 1028088000000 , 12.456410521864] , [ 1030766400000 , 12.537048663919] , [ 1033358400000 , 13.947386398309] , [ 1036040400000 , 14.421680682568] , [ 1038632400000 , 14.143238262286] , [ 1041310800000 , 12.229635347478] , [ 1043989200000 , 12.508479916948] , [ 1046408400000 , 12.155368409526] , [ 1049086800000 , 13.335455563994] , [ 1051675200000 , 12.888210138167] , [ 1054353600000 , 12.842092790511] , [ 1056945600000 , 12.513816474199] , [ 1059624000000 , 12.21453674494] , [ 1062302400000 , 11.750848343935] , [ 1064894400000 , 10.526579636787] , [ 1067576400000 , 10.873596086087] , [ 1070168400000 , 11.019967131519] , [ 1072846800000 , 11.235789380602] , [ 1075525200000 , 11.859910850657] , [ 1078030800000 , 12.531031616536] , [ 1080709200000 , 11.360451067019] , [ 1083297600000 , 11.456244780202] , [ 1085976000000 , 11.436991407309] , [ 1088568000000 , 11.638595744327] , [ 1091246400000 , 11.190418301469] , [ 1093924800000 , 11.835608007589] , [ 1096516800000 , 11.540980244475] , [ 1099195200000 , 10.958762325687] , [ 1101790800000 , 10.885791159509] , [ 1104469200000 , 13.605810720109] , [ 1107147600000 , 13.128978067437] , [ 1109566800000 , 13.119012086882] , [ 1112245200000 , 13.003706129783] , [ 1114833600000 , 13.326996807689] , [ 1117512000000 , 13.547947991743] , [ 1120104000000 , 12.807959646616] , [ 1122782400000 , 12.931763821068] , [ 1125460800000 , 12.795359993008] , [ 1128052800000 , 9.6998935538319] , [ 1130734800000 , 9.3473740089131] , [ 1133326800000 , 9.36902067716] , [ 1136005200000 , 14.258619539875] , [ 1138683600000 , 14.21241095603] , [ 1141102800000 , 13.973193618249] , [ 1143781200000 , 15.218233920664] , [ 1146369600000 , 14.382109727451] , [ 1149048000000 , 13.894310878491] , [ 1151640000000 , 15.593086090031] , [ 1154318400000 , 16.244839695189] , [ 1156996800000 , 16.017088850647] , [ 1159588800000 , 14.183951830057] , [ 1162270800000 , 14.148523245696] , [ 1164862800000 , 13.424326059971] , [ 1167541200000 , 12.974450435754] , [ 1170219600000 , 13.232470418021] , [ 1172638800000 , 13.318762655574] , [ 1175313600000 , 15.961407746104] , [ 1177905600000 , 16.287714639805] , [ 1180584000000 , 16.24659058389] , [ 1183176000000 , 17.564505594808] , [ 1185854400000 , 17.872725373164] , [ 1188532800000 , 18.018998508756] , [ 1191124800000 , 15.584518016602] , [ 1193803200000 , 15.480850647182] , [ 1196398800000 , 15.699120036985] , [ 1199077200000 , 19.184281817226] , [ 1201755600000 , 19.691226605205] , [ 1204261200000 , 18.982314051293] , [ 1206936000000 , 18.707820309008] , [ 1209528000000 , 17.459630929759] , [ 1212206400000 , 16.500616076782] , [ 1214798400000 , 18.086324003978] , [ 1217476800000 , 18.929464156259] , [ 1220155200000 , 18.233728682084] , [ 1222747200000 , 16.315776297325] , [ 1225425600000 , 14.632892190251] , [ 1228021200000 , 14.667835024479] , [ 1230699600000 , 13.946993947309] , [ 1233378000000 , 14.394304684398] , [ 1235797200000 , 13.724462792967] , [ 1238472000000 , 10.930879035807] , [ 1241064000000 , 9.8339915513708] , [ 1243742400000 , 10.053858541872] , [ 1246334400000 , 11.786998438286] , [ 1249012800000 , 11.780994901769] , [ 1251691200000 , 11.305889670277] , [ 1254283200000 , 10.918452290083] , [ 1256961600000 , 9.6811395055706] , [ 1259557200000 , 10.971529744038] , [ 1262235600000 , 13.330210480209] , [ 1264914000000 , 14.592637568961] , [ 1267333200000 , 14.605329141157] , [ 1270008000000 , 13.936853794037] , [ 1272600000000 , 12.189480759072] , [ 1275278400000 , 11.676151385046] , [ 1277870400000 , 13.058852800018] , [ 1280548800000 , 13.62891543203] , [ 1283227200000 , 13.811107569918] , [ 1285819200000 , 13.786494560786] , [ 1288497600000 , 14.045162857531] , [ 1291093200000 , 13.697412447286] , [ 1293771600000 , 13.677681376221] , [ 1296450000000 , 19.96151186453] , [ 1298869200000 , 21.049198298156] , [ 1301544000000 , 22.687631094009] , [ 1304136000000 , 25.469010617433] , [ 1306814400000 , 24.88379943712] , [ 1309406400000 , 24.203843814249] , [ 1312084800000 , 22.138760964036] , [ 1314763200000 , 16.034636966228] , [ 1317355200000 , 15.394958944555] , [ 1320033600000 , 12.62564246197] , [ 1322629200000 , 12.973735699739] , [ 1325307600000 , 15.78601833615] , [ 1327986000000 , 15.227368020134] , [ 1330491600000 , 15.899752650733] , [ 1333166400000 , 15.661317319168] , [ 1335758400000 , 15.359891177281]]
            } ,

            {
                "key" : "Europe" ,
                "values" : [ [ 1025409600000 , 9.3433263069351] , [ 1028088000000 , 8.4583069475546] , [ 1030766400000 , 8.0342398154196] , [ 1033358400000 , 8.1538966876572] , [ 1036040400000 , 10.743604786849] , [ 1038632400000 , 12.349366155851] , [ 1041310800000 , 10.742682503899] , [ 1043989200000 , 11.360983869935] , [ 1046408400000 , 11.441336039535] , [ 1049086800000 , 10.897508791837] , [ 1051675200000 , 11.469101547709] , [ 1054353600000 , 12.086311476742] , [ 1056945600000 , 8.0697180773504] , [ 1059624000000 , 8.2004392233445] , [ 1062302400000 , 8.4566434900643] , [ 1064894400000 , 7.9565760979059] , [ 1067576400000 , 9.3764619255827] , [ 1070168400000 , 9.0747664160538] , [ 1072846800000 , 10.508939004673] , [ 1075525200000 , 10.69936754483] , [ 1078030800000 , 10.681562399145] , [ 1080709200000 , 13.184786109406] , [ 1083297600000 , 12.668213052351] , [ 1085976000000 , 13.430509403986] , [ 1088568000000 , 12.393086349213] , [ 1091246400000 , 11.942374044842] , [ 1093924800000 , 12.062227685742] , [ 1096516800000 , 11.969974363623] , [ 1099195200000 , 12.14374574055] , [ 1101790800000 , 12.69422821995] , [ 1104469200000 , 9.1235211044692] , [ 1107147600000 , 8.758211757584] , [ 1109566800000 , 8.8072309258443] , [ 1112245200000 , 11.687595946835] , [ 1114833600000 , 11.079723082664] , [ 1117512000000 , 12.049712896076] , [ 1120104000000 , 10.725319428684] , [ 1122782400000 , 10.844849996286] , [ 1125460800000 , 10.833535488461] , [ 1128052800000 , 17.180932407865] , [ 1130734800000 , 15.894764896516] , [ 1133326800000 , 16.412751299498] , [ 1136005200000 , 12.573569093402] , [ 1138683600000 , 13.242301508051] , [ 1141102800000 , 12.863536342041] , [ 1143781200000 , 21.034044171629] , [ 1146369600000 , 21.419084618802] , [ 1149048000000 , 21.142678863692] , [ 1151640000000 , 26.56848967753] , [ 1154318400000 , 24.839144939906] , [ 1156996800000 , 25.456187462166] , [ 1159588800000 , 26.350164502825] , [ 1162270800000 , 26.478333205189] , [ 1164862800000 , 26.425979547846] , [ 1167541200000 , 28.191461582256] , [ 1170219600000 , 28.930307448808] , [ 1172638800000 , 29.521413891117] , [ 1175313600000 , 28.188285966466] , [ 1177905600000 , 27.704619625831] , [ 1180584000000 , 27.49086242483] , [ 1183176000000 , 28.770679721286] , [ 1185854400000 , 29.06048067145] , [ 1188532800000 , 28.240998844973] , [ 1191124800000 , 33.004893194128] , [ 1193803200000 , 34.075180359928] , [ 1196398800000 , 32.548560664834] , [ 1199077200000 , 30.629727432729] , [ 1201755600000 , 28.642858788159] , [ 1204261200000 , 27.973575227843] , [ 1206936000000 , 27.393351882726] , [ 1209528000000 , 28.476095288522] , [ 1212206400000 , 29.29667866426] , [ 1214798400000 , 29.222333802896] , [ 1217476800000 , 28.092966093842] , [ 1220155200000 , 28.107159262922] , [ 1222747200000 , 25.482974832099] , [ 1225425600000 , 21.208115993834] , [ 1228021200000 , 20.295043095268] , [ 1230699600000 , 15.925754618402] , [ 1233378000000 , 17.162864628346] , [ 1235797200000 , 17.084345773174] , [ 1238472000000 , 22.24600710228] , [ 1241064000000 , 24.530543998508] , [ 1243742400000 , 25.084184918241] , [ 1246334400000 , 16.606166527359] , [ 1249012800000 , 17.239620011628] , [ 1251691200000 , 17.336739127379] , [ 1254283200000 , 25.478492475754] , [ 1256961600000 , 23.017152085244] , [ 1259557200000 , 25.617745423684] , [ 1262235600000 , 24.061133998641] , [ 1264914000000 , 23.223933318646] , [ 1267333200000 , 24.425887263936] , [ 1270008000000 , 35.501471156693] , [ 1272600000000 , 33.775013878675] , [ 1275278400000 , 30.417993630285] , [ 1277870400000 , 30.023598978467] , [ 1280548800000 , 33.327519522436] , [ 1283227200000 , 31.963388450372] , [ 1285819200000 , 30.49896723209] , [ 1288497600000 , 32.403696817913] , [ 1291093200000 , 31.47736071922] , [ 1293771600000 , 31.53259666241] , [ 1296450000000 , 41.760282761548] , [ 1298869200000 , 45.605771243237] , [ 1301544000000 , 39.986557966215] , [ 1304136000000 , 43.84633051005] , [ 1306814400000 , 39.857316881858] , [ 1309406400000 , 37.675127768207] , [ 1312084800000 , 35.775077970313] , [ 1314763200000 , 48.631009702578] , [ 1317355200000 , 42.830831754505] , [ 1320033600000 , 35.611502589362] , [ 1322629200000 , 35.320136981738] , [ 1325307600000 , 31.564136901516] , [ 1327986000000 , 32.074407502433] , [ 1330491600000 , 35.053013769977] , [ 1333166400000 , 33.873085184128] , [ 1335758400000 , 32.321039427046]]
            } ,

            {
                "key" : "Australia" ,
                "values" : [ [ 1025409600000 , 5.1162447683392] , [ 1028088000000 , 4.2022848306513] , [ 1030766400000 , 4.3543715758736] , [ 1033358400000 , 5.4641223667245] , [ 1036040400000 , 6.0041275884577] , [ 1038632400000 , 6.6050520064486] , [ 1041310800000 , 5.0154059912793] , [ 1043989200000 , 5.1835708554647] , [ 1046408400000 , 5.1142682006164] , [ 1049086800000 , 5.0271381717695] , [ 1051675200000 , 5.3437782653456] , [ 1054353600000 , 5.2105844515767] , [ 1056945600000 , 6.552565997799] , [ 1059624000000 , 6.9873363581831] , [ 1062302400000 , 7.010986789097] , [ 1064894400000 , 4.4254242025515] , [ 1067576400000 , 4.9613848042174] , [ 1070168400000 , 4.8854920484764] , [ 1072846800000 , 4.0441111794228] , [ 1075525200000 , 4.0219596813179] , [ 1078030800000 , 4.3065749225355] , [ 1080709200000 , 3.9148434915404] , [ 1083297600000 , 3.8659430654512] , [ 1085976000000 , 3.9572824600686] , [ 1088568000000 , 4.7372190641522] , [ 1091246400000 , 4.6871476374455] , [ 1093924800000 , 5.0398702564196] , [ 1096516800000 , 5.5221787544964] , [ 1099195200000 , 5.424646299798] , [ 1101790800000 , 5.9240223067349] , [ 1104469200000 , 5.9936860983601] , [ 1107147600000 , 5.8499523215019] , [ 1109566800000 , 6.4149040329325] , [ 1112245200000 , 6.4547895561969] , [ 1114833600000 , 5.9385382611161] , [ 1117512000000 , 6.0486751030592] , [ 1120104000000 , 5.23108613838] , [ 1122782400000 , 5.5857797121029] , [ 1125460800000 , 5.3454665096987] , [ 1128052800000 , 5.0439154120119] , [ 1130734800000 , 5.054634702913] , [ 1133326800000 , 5.3819451380848] , [ 1136005200000 , 5.2638869269803] , [ 1138683600000 , 5.5806167415681] , [ 1141102800000 , 5.4539047069985] , [ 1143781200000 , 7.6728842432362] , [ 1146369600000 , 7.719946716654] , [ 1149048000000 , 8.0144619912942] , [ 1151640000000 , 7.942223133434] , [ 1154318400000 , 8.3998279827444] , [ 1156996800000 , 8.532324572605] , [ 1159588800000 , 4.7324285199763] , [ 1162270800000 , 4.7402397487697] , [ 1164862800000 , 4.9042069355168] , [ 1167541200000 , 5.9583963430882] , [ 1170219600000 , 6.3693899239171] , [ 1172638800000 , 6.261153903813] , [ 1175313600000 , 5.3443942184584] , [ 1177905600000 , 5.4932111235361] , [ 1180584000000 , 5.5747393101109] , [ 1183176000000 , 5.3833633060013] , [ 1185854400000 , 5.5125898831832] , [ 1188532800000 , 5.8116112661327] , [ 1191124800000 , 4.3962296939996] , [ 1193803200000 , 4.6967663605521] , [ 1196398800000 , 4.7963004350914] , [ 1199077200000 , 4.1817985183351] , [ 1201755600000 , 4.3797643870182] , [ 1204261200000 , 4.6966642197965] , [ 1206936000000 , 4.3609995132565] , [ 1209528000000 , 4.4736290996496] , [ 1212206400000 , 4.3749762738128] , [ 1214798400000 , 3.3274661194507] , [ 1217476800000 , 3.0316184691337] , [ 1220155200000 , 2.5718140204728] , [ 1222747200000 , 2.7034994044603] , [ 1225425600000 , 2.2033786591364] , [ 1228021200000 , 1.9850621240805] , [ 1230699600000 , 0] , [ 1233378000000 , 0] , [ 1235797200000 , 0] , [ 1238472000000 , 0] , [ 1241064000000 , 0] , [ 1243742400000 , 0] , [ 1246334400000 , 0] , [ 1249012800000 , 0] , [ 1251691200000 , 0] , [ 1254283200000 , 0.44495950017788] , [ 1256961600000 , 0.33945469262483] , [ 1259557200000 , 0.38348269455195] , [ 1262235600000 , 0] , [ 1264914000000 , 0] , [ 1267333200000 , 0] , [ 1270008000000 , 0] , [ 1272600000000 , 0] , [ 1275278400000 , 0] , [ 1277870400000 , 0] , [ 1280548800000 , 0] , [ 1283227200000 , 0] , [ 1285819200000 , 0] , [ 1288497600000 , 0] , [ 1291093200000 , 0] , [ 1293771600000 , 0] , [ 1296450000000 , 0.52216435716176] , [ 1298869200000 , 0.59275786698454] , [ 1301544000000 , 0] , [ 1304136000000 , 0] , [ 1306814400000 , 0] , [ 1309406400000 , 0] , [ 1312084800000 , 0] , [ 1314763200000 , 0] , [ 1317355200000 , 0] , [ 1320033600000 , 0] , [ 1322629200000 , 0] , [ 1325307600000 , 0] , [ 1327986000000 , 0] , [ 1330491600000 , 0] , [ 1333166400000 , 0] , [ 1335758400000 , 0]]
            } ,

            {
                "key" : "Antarctica" ,
                "values" : [ [ 1025409600000 , 1.3503144674343] , [ 1028088000000 , 1.2232741112434] , [ 1030766400000 , 1.3930470790784] , [ 1033358400000 , 1.2631275030593] , [ 1036040400000 , 1.5842699103708] , [ 1038632400000 , 1.9546996043116] , [ 1041310800000 , 0.8504048300986] , [ 1043989200000 , 0.85340686311353] , [ 1046408400000 , 0.843061357391] , [ 1049086800000 , 2.119846992476] , [ 1051675200000 , 2.5285382124858] , [ 1054353600000 , 2.5056570712835] , [ 1056945600000 , 2.5212789901005] , [ 1059624000000 , 2.6192011642534] , [ 1062302400000 , 2.5382187823805] , [ 1064894400000 , 2.3393223047168] , [ 1067576400000 , 2.491219888698] , [ 1070168400000 , 2.497555874906] , [ 1072846800000 , 1.734018115546] , [ 1075525200000 , 1.9307268299646] , [ 1078030800000 , 2.2261679836799] , [ 1080709200000 , 1.7608893704206] , [ 1083297600000 , 1.6242690616808] , [ 1085976000000 , 1.7161663801295] , [ 1088568000000 , 1.7183554537038] , [ 1091246400000 , 1.7179780759145] , [ 1093924800000 , 1.7314274801784] , [ 1096516800000 , 1.2596883356752] , [ 1099195200000 , 1.381177053009] , [ 1101790800000 , 1.4408819615814] , [ 1104469200000 , 3.4743581836444] , [ 1107147600000 , 3.3603749903192] , [ 1109566800000 , 3.5350883257893] , [ 1112245200000 , 3.0949644237828] , [ 1114833600000 , 3.0796455899995] , [ 1117512000000 , 3.3441247640644] , [ 1120104000000 , 4.0947643978168] , [ 1122782400000 , 4.4072631274052] , [ 1125460800000 , 4.4870979780825] , [ 1128052800000 , 4.8404549457934] , [ 1130734800000 , 4.8293016233697] , [ 1133326800000 , 5.2238093263952] , [ 1136005200000 , 3.382306337815] , [ 1138683600000 , 3.7056975170243] , [ 1141102800000 , 3.7561118692318] , [ 1143781200000 , 2.861913700854] , [ 1146369600000 , 2.9933744103381] , [ 1149048000000 , 2.7127537218463] , [ 1151640000000 , 3.1195497076283] , [ 1154318400000 , 3.4066964004508] , [ 1156996800000 , 3.3754571113569] , [ 1159588800000 , 2.2965579982924] , [ 1162270800000 , 2.4486818633018] , [ 1164862800000 , 2.4002308848517] , [ 1167541200000 , 1.9649579750349] , [ 1170219600000 , 1.9385263638056] , [ 1172638800000 , 1.9128975336387] , [ 1175313600000 , 2.3412869836298] , [ 1177905600000 , 2.4337870351445] , [ 1180584000000 , 2.62179703171] , [ 1183176000000 , 3.2642864957929] , [ 1185854400000 , 3.3200396223709] , [ 1188532800000 , 3.3934212707572] , [ 1191124800000 , 4.2822327088179] , [ 1193803200000 , 4.1474964228541] , [ 1196398800000 , 4.1477082879801] , [ 1199077200000 , 5.2947122916128] , [ 1201755600000 , 5.2919843508028] , [ 1204261200000 , 5.198978305031] , [ 1206936000000 , 3.5603057673513] , [ 1209528000000 , 3.3009087690692] , [ 1212206400000 , 3.1784852603792] , [ 1214798400000 , 4.5889503538868] , [ 1217476800000 , 4.401779617494] , [ 1220155200000 , 4.2208301828278] , [ 1222747200000 , 3.89396671475] , [ 1225425600000 , 3.0423832241354] , [ 1228021200000 , 3.135520611578] , [ 1230699600000 , 1.9631418164089] , [ 1233378000000 , 1.8963543874958] , [ 1235797200000 , 1.8266636017025] , [ 1238472000000 , 0.93136635895188] , [ 1241064000000 , 0.92737801918888] , [ 1243742400000 , 0.97591889805002] , [ 1246334400000 , 2.6841193805515] , [ 1249012800000 , 2.5664341140531] , [ 1251691200000 , 2.3887523699873] , [ 1254283200000 , 1.1737801663681] , [ 1256961600000 , 1.0953582317281] , [ 1259557200000 , 1.2495674976653] , [ 1262235600000 , 0.36607452464754] , [ 1264914000000 , 0.3548719047291] , [ 1267333200000 , 0.36769242398939] , [ 1270008000000 , 0] , [ 1272600000000 , 0] , [ 1275278400000 , 0] , [ 1277870400000 , 0] , [ 1280548800000 , 0] , [ 1283227200000 , 0] , [ 1285819200000 , 0.85450741275337] , [ 1288497600000 , 0.91360317921637] , [ 1291093200000 , 0.89647678692269] , [ 1293771600000 , 0.87800687192639] , [ 1296450000000 , 0] , [ 1298869200000 , 0] , [ 1301544000000 , 0.43668720882994] , [ 1304136000000 , 0.4756523602692] , [ 1306814400000 , 0.46947368328469] , [ 1309406400000 , 0.45138896152316] , [ 1312084800000 , 0.43828726648117] , [ 1314763200000 , 2.0820861395316] , [ 1317355200000 , 0.9364411075395] , [ 1320033600000 , 0.60583907839773] , [ 1322629200000 , 0.61096950747437] , [ 1325307600000 , 0] , [ 1327986000000 , 0] , [ 1330491600000 , 0] , [ 1333166400000 , 0] , [ 1335758400000 , 0]]
            }

        ]
    })

},{}],20:[function(require,module,exports){
(function(){
  
  module.exports = elixirChartController;

  function elixirChartController(scope, rootscope, location, 
      dataService) {

    var vm = this;
    vm.config = config;
    vm.getData = getData;
  	scope.isActive = isActive;
  	
  	vm.config();

  	function config() {
  	  scope.params.charts = rootscope.params.charts;
  	  scope.params.route = rootscope.params.route;
  	  scope.utils = rootscope.utils;
  	  vm.getData(scope.data);
  	}

  	function getData(item) {
      if(!item){
        console.error('You have to pass a path to your json file or API or json object!');
      }
      else if(item.constructor == String) {
        // it is a file or API
        dataService.getData(item).then(function(response){
          scope.data = response.data;
          scope.keys = Object.keys(scope.data[0]);
        });
      }
      else {
        scope.data = item;
        scope.keys = Object.keys(scope.data[0]);
      }
  	}

    function isActive(viewLocation) {
      if (viewLocation === '/liveedit') {
        return (($location.path() !== '/quickstart') && ($location.path() !== '/') 
          && ($location.path() !== '/feedback'));
      }
      else {
        return viewLocation === $location.path();
      }
    }

  }
})();


},{}],21:[function(require,module,exports){
(function(){
  'use strict';
  module.export = angular.module('elixirchart')
                  .directive('elixirChart', elixirChartDirective);

  var elixirChartController = require('../controllers/elixir.chart.controller');

  function elixirChartDirective() {
    var directive = {
        require: '?ngModel',
        restrict: 'E',
        scope: {
          data: "=",
          params: "="
        },
        controller: elixirChartController,
        controllerAs: 'chart',
        template: '<div class="content" ng-view></div>'
    };
    return directive;
  }

})();

},{"../controllers/elixir.chart.controller":20}],22:[function(require,module,exports){
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
})();

},{"./constants/chart.constants":1,"./controllers/chart_controllers/bulletChart":2,"./controllers/chart_controllers/cumulativeLineChart":3,"./controllers/chart_controllers/discreteBarChart":4,"./controllers/chart_controllers/donutChart":5,"./controllers/chart_controllers/historicalBarChart":6,"./controllers/chart_controllers/lineChart":7,"./controllers/chart_controllers/linePlusBarChart":8,"./controllers/chart_controllers/linePlusBarWithFocusChart":9,"./controllers/chart_controllers/lineWithFocusChart":10,"./controllers/chart_controllers/multiBarChart":11,"./controllers/chart_controllers/multiBarHorizontalChart":12,"./controllers/chart_controllers/multiChart":13,"./controllers/chart_controllers/parallelCoordinates":14,"./controllers/chart_controllers/pieChart":15,"./controllers/chart_controllers/scatterChart":16,"./controllers/chart_controllers/scatterPlusLineChart":17,"./controllers/chart_controllers/sparklinePlus":18,"./controllers/chart_controllers/stackedAreaChart":19,"./controllers/elixir.chart.controller":20,"./directives/elixir.chart.directive":21,"./service/chart.data.service":23,"./service/data.service":24}],23:[function(require,module,exports){
(function(){  
"use strict";

  var _ = require('lodash');
  module.exports = angular.module('elixirchart')
                   .factory('chartDataService', chartDataService);
  
  function chartDataService() {
    
    var vm = this;
    vm.updateX = updateX;
    vm.updateY = updateY;
    vm.initValues = initValues;

    function updateX(dataX) {
      var getKey = _.property(dataX);
      var xseleted = _.map(vm.scope.data, getKey);
      vm.updateField(xseleted, vm.xField);
    }

    function updateY(dataY) {
      var getKey = _.property(dataY);
      var yseleted = _.map(vm.scope.data, getKey);
      vm.updateField(yseleted, vm.yField);
    }

    function initValues(value) {
      var arr = [];
      var len = vm.scope.data.length;
      for (var i = 0; i < len; i++) {
        if(value.constructor == Array) {
          arr.push(value.slice());
        }
        else if(value.constructor == Object) {
          arr.push(_.clone(value));
        }
      }
      return arr;
    }
    return this;
  }

})();

},{"lodash":25}],24:[function(require,module,exports){
(function(){  
"use strict";

  module.exports = angular.module('elixirchart')
                   .factory('dataService', dataService);

  dataService.$inject = ['$http'];

  function dataService($http) {

    this.getData = getData;
    function getData(path) {
        return $http.get(path);
    }
    return this;
  }

})();

},{}],25:[function(require,module,exports){
(function (global){
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modern -o ./dist/lodash.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** Used to pool arrays and objects used internally */
  var arrayPool = [],
      objectPool = [];

  /** Used to generate unique IDs */
  var idCounter = 0;

  /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
  var keyPrefix = +new Date + '';

  /** Used as the size when optimizations are enabled for large arrays */
  var largeArraySize = 75;

  /** Used as the max size of the `arrayPool` and `objectPool` */
  var maxPoolSize = 40;

  /** Used to detect and test whitespace */
  var whitespace = (
    // whitespace
    ' \t\x0B\f\xA0\ufeff' +

    // line terminators
    '\n\r\u2028\u2029' +

    // unicode category "Zs" space separators
    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
  );

  /** Used to match empty string literals in compiled template source */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /**
   * Used to match ES6 template delimiters
   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match regexp flags from their coerced string values */
  var reFlags = /\w*$/;

  /** Used to detected named functions */
  var reFuncName = /^\s*function[ \n\r\t]+\w/;

  /** Used to match "interpolate" template delimiters */
  var reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match leading whitespace and zeros to be removed */
  var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');

  /** Used to ensure capturing order of template delimiters */
  var reNoMatch = /($^)/;

  /** Used to detect functions containing a `this` reference */
  var reThis = /\bthis\b/;

  /** Used to match unescaped characters in compiled string literals */
  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

  /** Used to assign default `context` object properties */
  var contextProps = [
    'Array', 'Boolean', 'Date', 'Function', 'Math', 'Number', 'Object',
    'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',
    'parseInt', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify */
  var templateCounter = 0;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
      arrayClass = '[object Array]',
      boolClass = '[object Boolean]',
      dateClass = '[object Date]',
      funcClass = '[object Function]',
      numberClass = '[object Number]',
      objectClass = '[object Object]',
      regexpClass = '[object RegExp]',
      stringClass = '[object String]';

  /** Used to identify object classifications that `_.clone` supports */
  var cloneableClasses = {};
  cloneableClasses[funcClass] = false;
  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
  cloneableClasses[boolClass] = cloneableClasses[dateClass] =
  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

  /** Used as an internal `_.debounce` options object */
  var debounceOptions = {
    'leading': false,
    'maxWait': 0,
    'trailing': false
  };

  /** Used as the property descriptor for `__bindData__` */
  var descriptor = {
    'configurable': false,
    'enumerable': false,
    'value': null,
    'writable': false
  };

  /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  /** Used to escape characters for inclusion in compiled string literals */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\t': 't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Used as a reference to the global object */
  var root = (objectTypes[typeof window] && window) || this;

  /** Detect free variable `exports` */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module` */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports` */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `_.indexOf` without support for binary searches
   * or `fromIndex` constraints.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the matched value or `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    var index = (fromIndex || 0) - 1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * An implementation of `_.contains` for cache objects that mimics the return
   * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
   *
   * @private
   * @param {Object} cache The cache object to inspect.
   * @param {*} value The value to search for.
   * @returns {number} Returns `0` if `value` is found, else `-1`.
   */
  function cacheIndexOf(cache, value) {
    var type = typeof value;
    cache = cache.cache;

    if (type == 'boolean' || value == null) {
      return cache[value] ? 0 : -1;
    }
    if (type != 'number' && type != 'string') {
      type = 'object';
    }
    var key = type == 'number' ? value : keyPrefix + value;
    cache = (cache = cache[type]) && cache[key];

    return type == 'object'
      ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)
      : (cache ? 0 : -1);
  }

  /**
   * Adds a given value to the corresponding cache object.
   *
   * @private
   * @param {*} value The value to add to the cache.
   */
  function cachePush(value) {
    var cache = this.cache,
        type = typeof value;

    if (type == 'boolean' || value == null) {
      cache[value] = true;
    } else {
      if (type != 'number' && type != 'string') {
        type = 'object';
      }
      var key = type == 'number' ? value : keyPrefix + value,
          typeCache = cache[type] || (cache[type] = {});

      if (type == 'object') {
        (typeCache[key] || (typeCache[key] = [])).push(value);
      } else {
        typeCache[key] = true;
      }
    }
  }

  /**
   * Used by `_.max` and `_.min` as the default callback when a given
   * collection is a string value.
   *
   * @private
   * @param {string} value The character to inspect.
   * @returns {number} Returns the code unit of given character.
   */
  function charAtCallback(value) {
    return value.charCodeAt(0);
  }

  /**
   * Used by `sortBy` to compare transformed `collection` elements, stable sorting
   * them in ascending order.
   *
   * @private
   * @param {Object} a The object to compare to `b`.
   * @param {Object} b The object to compare to `a`.
   * @returns {number} Returns the sort order indicator of `1` or `-1`.
   */
  function compareAscending(a, b) {
    var ac = a.criteria,
        bc = b.criteria,
        index = -1,
        length = ac.length;

    while (++index < length) {
      var value = ac[index],
          other = bc[index];

      if (value !== other) {
        if (value > other || typeof value == 'undefined') {
          return 1;
        }
        if (value < other || typeof other == 'undefined') {
          return -1;
        }
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to return the same value for
    // `a` and `b`. See https://github.com/jashkenas/underscore/pull/1247
    //
    // This also ensures a stable sort in V8 and other engines.
    // See http://code.google.com/p/v8/issues/detail?id=90
    return a.index - b.index;
  }

  /**
   * Creates a cache object to optimize linear searches of large arrays.
   *
   * @private
   * @param {Array} [array=[]] The array to search.
   * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
   */
  function createCache(array) {
    var index = -1,
        length = array.length,
        first = array[0],
        mid = array[(length / 2) | 0],
        last = array[length - 1];

    if (first && typeof first == 'object' &&
        mid && typeof mid == 'object' && last && typeof last == 'object') {
      return false;
    }
    var cache = getObject();
    cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;

    var result = getObject();
    result.array = array;
    result.cache = cache;
    result.push = cachePush;

    while (++index < length) {
      result.push(array[index]);
    }
    return result;
  }

  /**
   * Used by `template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {string} match The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(match) {
    return '\\' + stringEscapes[match];
  }

  /**
   * Gets an array from the array pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Array} The array from the pool.
   */
  function getArray() {
    return arrayPool.pop() || [];
  }

  /**
   * Gets an object from the object pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Object} The object from the pool.
   */
  function getObject() {
    return objectPool.pop() || {
      'array': null,
      'cache': null,
      'criteria': null,
      'false': false,
      'index': 0,
      'null': false,
      'number': null,
      'object': null,
      'push': null,
      'string': null,
      'true': false,
      'undefined': false,
      'value': null
    };
  }

  /**
   * Releases the given array back to the array pool.
   *
   * @private
   * @param {Array} [array] The array to release.
   */
  function releaseArray(array) {
    array.length = 0;
    if (arrayPool.length < maxPoolSize) {
      arrayPool.push(array);
    }
  }

  /**
   * Releases the given object back to the object pool.
   *
   * @private
   * @param {Object} [object] The object to release.
   */
  function releaseObject(object) {
    var cache = object.cache;
    if (cache) {
      releaseObject(cache);
    }
    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
    if (objectPool.length < maxPoolSize) {
      objectPool.push(object);
    }
  }

  /**
   * Slices the `collection` from the `start` index up to, but not including,
   * the `end` index.
   *
   * Note: This function is used instead of `Array#slice` to support node lists
   * in IE < 9 and to ensure dense arrays are returned.
   *
   * @private
   * @param {Array|Object|string} collection The collection to slice.
   * @param {number} start The start index.
   * @param {number} end The end index.
   * @returns {Array} Returns the new array.
   */
  function slice(array, start, end) {
    start || (start = 0);
    if (typeof end == 'undefined') {
      end = array ? array.length : 0;
    }
    var index = -1,
        length = end - start || 0,
        result = Array(length < 0 ? 0 : length);

    while (++index < length) {
      result[index] = array[start + index];
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new `lodash` function using the given context object.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns the `lodash` function.
   */
  function runInContext(context) {
    // Avoid issues with some ES3 environments that attempt to use values, named
    // after built-in constructors like `Object`, for the creation of literals.
    // ES5 clears this up by stating that literals must use built-in constructors.
    // See http://es5.github.io/#x11.1.5.
    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

    /** Native constructor references */
    var Array = context.Array,
        Boolean = context.Boolean,
        Date = context.Date,
        Function = context.Function,
        Math = context.Math,
        Number = context.Number,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /**
     * Used for `Array` method references.
     *
     * Normally `Array.prototype` would suffice, however, using an array literal
     * avoids issues in Narwhal.
     */
    var arrayRef = [];

    /** Used for native method references */
    var objectProto = Object.prototype;

    /** Used to restore the original `_` reference in `noConflict` */
    var oldDash = context._;

    /** Used to resolve the internal [[Class]] of values */
    var toString = objectProto.toString;

    /** Used to detect if a method is native */
    var reNative = RegExp('^' +
      String(toString)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/toString| for [^\]]+/g, '.*?') + '$'
    );

    /** Native method shortcuts */
    var ceil = Math.ceil,
        clearTimeout = context.clearTimeout,
        floor = Math.floor,
        fnToString = Function.prototype.toString,
        getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
        hasOwnProperty = objectProto.hasOwnProperty,
        push = arrayRef.push,
        setTimeout = context.setTimeout,
        splice = arrayRef.splice,
        unshift = arrayRef.unshift;

    /** Used to set meta data on functions */
    var defineProperty = (function() {
      // IE 8 only accepts DOM elements
      try {
        var o = {},
            func = isNative(func = Object.defineProperty) && func,
            result = func(o, o, o) && func;
      } catch(e) { }
      return result;
    }());

    /* Native method shortcuts for methods with the same name as other `lodash` methods */
    var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
        nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
        nativeIsFinite = context.isFinite,
        nativeIsNaN = context.isNaN,
        nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random;

    /** Used to lookup a built-in constructor by [[Class]] */
    var ctorByClass = {};
    ctorByClass[arrayClass] = Array;
    ctorByClass[boolClass] = Boolean;
    ctorByClass[dateClass] = Date;
    ctorByClass[funcClass] = Function;
    ctorByClass[objectClass] = Object;
    ctorByClass[numberClass] = Number;
    ctorByClass[regexpClass] = RegExp;
    ctorByClass[stringClass] = String;

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps the given value to enable intuitive
     * method chaining.
     *
     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
     * and `unshift`
     *
     * Chaining is supported in custom builds as long as the `value` method is
     * implicitly or explicitly included in the build.
     *
     * The chainable wrapper functions are:
     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
     * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
     * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
     * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
     * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
     * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
     * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
     * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
     * and `zip`
     *
     * The non-chainable wrapper functions are:
     * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
     * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
     * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
     * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
     * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
     * `template`, `unescape`, `uniqueId`, and `value`
     *
     * The wrapper functions `first` and `last` return wrapped values when `n` is
     * provided, otherwise they return unwrapped values.
     *
     * Explicit chaining can be enabled by using the `_.chain` method.
     *
     * @name _
     * @constructor
     * @category Chaining
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns a `lodash` instance.
     * @example
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(function(sum, num) {
     *   return sum + num;
     * });
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(function(num) {
     *   return num * num;
     * });
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor
      return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__'))
       ? value
       : new lodashWrapper(value);
    }

    /**
     * A fast path for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap in a `lodash` instance.
     * @param {boolean} chainAll A flag to enable chaining for all methods
     * @returns {Object} Returns a `lodash` instance.
     */
    function lodashWrapper(value, chainAll) {
      this.__chain__ = !!chainAll;
      this.__wrapped__ = value;
    }
    // ensure `new lodashWrapper` is an instance of `lodash`
    lodashWrapper.prototype = lodash.prototype;

    /**
     * An object used to flag environments features.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    var support = lodash.support = {};

    /**
     * Detect if functions can be decompiled by `Function#toString`
     * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);

    /**
     * Detect if `Function#name` is supported (all but IE).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcNames = typeof Function.name == 'string';

    /**
     * By default, the template delimiters used by Lo-Dash are similar to those in
     * embedded Ruby (ERB). Change the following template settings to use alternative
     * delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'escape': /<%-([\s\S]+?)%>/g,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'evaluate': /<%([\s\S]+?)%>/g,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */
        '_': lodash
      }
    };

    /*--------------------------------------------------------------------------*/

    /**
     * The base implementation of `_.bind` that creates the bound function and
     * sets its meta data.
     *
     * @private
     * @param {Array} bindData The bind data array.
     * @returns {Function} Returns the new bound function.
     */
    function baseBind(bindData) {
      var func = bindData[0],
          partialArgs = bindData[2],
          thisArg = bindData[4];

      function bound() {
        // `Function#bind` spec
        // http://es5.github.io/#x15.3.4.5
        if (partialArgs) {
          // avoid `arguments` object deoptimizations by using `slice` instead
          // of `Array.prototype.slice.call` and not assigning `arguments` to a
          // variable as a ternary expression
          var args = slice(partialArgs);
          push.apply(args, arguments);
        }
        // mimic the constructor's `return` behavior
        // http://es5.github.io/#x13.2.2
        if (this instanceof bound) {
          // ensure `new bound` is an instance of `func`
          var thisBinding = baseCreate(func.prototype),
              result = func.apply(thisBinding, args || arguments);
          return isObject(result) ? result : thisBinding;
        }
        return func.apply(thisArg, args || arguments);
      }
      setBindData(bound, bindData);
      return bound;
    }

    /**
     * The base implementation of `_.clone` without argument juggling or support
     * for `thisArg` binding.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep=false] Specify a deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates clones with source counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, isDeep, callback, stackA, stackB) {
      if (callback) {
        var result = callback(value);
        if (typeof result != 'undefined') {
          return result;
        }
      }
      // inspect [[Class]]
      var isObj = isObject(value);
      if (isObj) {
        var className = toString.call(value);
        if (!cloneableClasses[className]) {
          return value;
        }
        var ctor = ctorByClass[className];
        switch (className) {
          case boolClass:
          case dateClass:
            return new ctor(+value);

          case numberClass:
          case stringClass:
            return new ctor(value);

          case regexpClass:
            result = ctor(value.source, reFlags.exec(value));
            result.lastIndex = value.lastIndex;
            return result;
        }
      } else {
        return value;
      }
      var isArr = isArray(value);
      if (isDeep) {
        // check for circular references and return corresponding clone
        var initedStack = !stackA;
        stackA || (stackA = getArray());
        stackB || (stackB = getArray());

        var length = stackA.length;
        while (length--) {
          if (stackA[length] == value) {
            return stackB[length];
          }
        }
        result = isArr ? ctor(value.length) : {};
      }
      else {
        result = isArr ? slice(value) : assign({}, value);
      }
      // add array properties assigned by `RegExp#exec`
      if (isArr) {
        if (hasOwnProperty.call(value, 'index')) {
          result.index = value.index;
        }
        if (hasOwnProperty.call(value, 'input')) {
          result.input = value.input;
        }
      }
      // exit for shallow clone
      if (!isDeep) {
        return result;
      }
      // add the source value to the stack of traversed objects
      // and associate it with its clone
      stackA.push(value);
      stackB.push(result);

      // recursively populate clone (susceptible to call stack limits)
      (isArr ? forEach : forOwn)(value, function(objValue, key) {
        result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);
      });

      if (initedStack) {
        releaseArray(stackA);
        releaseArray(stackB);
      }
      return result;
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    function baseCreate(prototype, properties) {
      return isObject(prototype) ? nativeCreate(prototype) : {};
    }
    // fallback for browsers without `Object.create`
    if (!nativeCreate) {
      baseCreate = (function() {
        function Object() {}
        return function(prototype) {
          if (isObject(prototype)) {
            Object.prototype = prototype;
            var result = new Object;
            Object.prototype = null;
          }
          return result || context.Object();
        };
      }());
    }

    /**
     * The base implementation of `_.createCallback` without support for creating
     * "_.pluck" or "_.where" style callbacks.
     *
     * @private
     * @param {*} [func=identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of the created callback.
     * @param {number} [argCount] The number of arguments the callback accepts.
     * @returns {Function} Returns a callback function.
     */
    function baseCreateCallback(func, thisArg, argCount) {
      if (typeof func != 'function') {
        return identity;
      }
      // exit early for no `thisArg` or already bound by `Function#bind`
      if (typeof thisArg == 'undefined' || !('prototype' in func)) {
        return func;
      }
      var bindData = func.__bindData__;
      if (typeof bindData == 'undefined') {
        if (support.funcNames) {
          bindData = !func.name;
        }
        bindData = bindData || !support.funcDecomp;
        if (!bindData) {
          var source = fnToString.call(func);
          if (!support.funcNames) {
            bindData = !reFuncName.test(source);
          }
          if (!bindData) {
            // checks if `func` references the `this` keyword and stores the result
            bindData = reThis.test(source);
            setBindData(func, bindData);
          }
        }
      }
      // exit early if there are no `this` references or `func` is bound
      if (bindData === false || (bindData !== true && bindData[1] & 1)) {
        return func;
      }
      switch (argCount) {
        case 1: return function(value) {
          return func.call(thisArg, value);
        };
        case 2: return function(a, b) {
          return func.call(thisArg, a, b);
        };
        case 3: return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };
      }
      return bind(func, thisArg);
    }

    /**
     * The base implementation of `createWrapper` that creates the wrapper and
     * sets its meta data.
     *
     * @private
     * @param {Array} bindData The bind data array.
     * @returns {Function} Returns the new function.
     */
    function baseCreateWrapper(bindData) {
      var func = bindData[0],
          bitmask = bindData[1],
          partialArgs = bindData[2],
          partialRightArgs = bindData[3],
          thisArg = bindData[4],
          arity = bindData[5];

      var isBind = bitmask & 1,
          isBindKey = bitmask & 2,
          isCurry = bitmask & 4,
          isCurryBound = bitmask & 8,
          key = func;

      function bound() {
        var thisBinding = isBind ? thisArg : this;
        if (partialArgs) {
          var args = slice(partialArgs);
          push.apply(args, arguments);
        }
        if (partialRightArgs || isCurry) {
          args || (args = slice(arguments));
          if (partialRightArgs) {
            push.apply(args, partialRightArgs);
          }
          if (isCurry && args.length < arity) {
            bitmask |= 16 & ~32;
            return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
          }
        }
        args || (args = arguments);
        if (isBindKey) {
          func = thisBinding[key];
        }
        if (this instanceof bound) {
          thisBinding = baseCreate(func.prototype);
          var result = func.apply(thisBinding, args);
          return isObject(result) ? result : thisBinding;
        }
        return func.apply(thisBinding, args);
      }
      setBindData(bound, bindData);
      return bound;
    }

    /**
     * The base implementation of `_.difference` that accepts a single array
     * of values to exclude.
     *
     * @private
     * @param {Array} array The array to process.
     * @param {Array} [values] The array of values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     */
    function baseDifference(array, values) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          isLarge = length >= largeArraySize && indexOf === baseIndexOf,
          result = [];

      if (isLarge) {
        var cache = createCache(values);
        if (cache) {
          indexOf = cacheIndexOf;
          values = cache;
        } else {
          isLarge = false;
        }
      }
      while (++index < length) {
        var value = array[index];
        if (indexOf(values, value) < 0) {
          result.push(value);
        }
      }
      if (isLarge) {
        releaseObject(values);
      }
      return result;
    }

    /**
     * The base implementation of `_.flatten` without support for callback
     * shorthands or `thisArg` binding.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
     * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
     * @param {number} [fromIndex=0] The index to start from.
     * @returns {Array} Returns a new flattened array.
     */
    function baseFlatten(array, isShallow, isStrict, fromIndex) {
      var index = (fromIndex || 0) - 1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];

        if (value && typeof value == 'object' && typeof value.length == 'number'
            && (isArray(value) || isArguments(value))) {
          // recursively flatten arrays (susceptible to call stack limits)
          if (!isShallow) {
            value = baseFlatten(value, isShallow, isStrict);
          }
          var valIndex = -1,
              valLength = value.length,
              resIndex = result.length;

          result.length += valLength;
          while (++valIndex < valLength) {
            result[resIndex++] = value[valIndex];
          }
        } else if (!isStrict) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.isEqual`, without support for `thisArg` binding,
     * that allows partial "_.where" style comparisons.
     *
     * @private
     * @param {*} a The value to compare.
     * @param {*} b The other value to compare.
     * @param {Function} [callback] The function to customize comparing values.
     * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
     * @param {Array} [stackA=[]] Tracks traversed `a` objects.
     * @param {Array} [stackB=[]] Tracks traversed `b` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
      // used to indicate that when comparing objects, `a` has at least the properties of `b`
      if (callback) {
        var result = callback(a, b);
        if (typeof result != 'undefined') {
          return !!result;
        }
      }
      // exit early for identical values
      if (a === b) {
        // treat `+0` vs. `-0` as not equal
        return a !== 0 || (1 / a == 1 / b);
      }
      var type = typeof a,
          otherType = typeof b;

      // exit early for unlike primitive values
      if (a === a &&
          !(a && objectTypes[type]) &&
          !(b && objectTypes[otherType])) {
        return false;
      }
      // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
      // http://es5.github.io/#x15.3.4.4
      if (a == null || b == null) {
        return a === b;
      }
      // compare [[Class]] names
      var className = toString.call(a),
          otherClass = toString.call(b);

      if (className == argsClass) {
        className = objectClass;
      }
      if (otherClass == argsClass) {
        otherClass = objectClass;
      }
      if (className != otherClass) {
        return false;
      }
      switch (className) {
        case boolClass:
        case dateClass:
          // coerce dates and booleans to numbers, dates to milliseconds and booleans
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
          return +a == +b;

        case numberClass:
          // treat `NaN` vs. `NaN` as equal
          return (a != +a)
            ? b != +b
            // but treat `+0` vs. `-0` as not equal
            : (a == 0 ? (1 / a == 1 / b) : a == +b);

        case regexpClass:
        case stringClass:
          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
          // treat string primitives and their corresponding object instances as equal
          return a == String(b);
      }
      var isArr = className == arrayClass;
      if (!isArr) {
        // unwrap any `lodash` wrapped values
        var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
            bWrapped = hasOwnProperty.call(b, '__wrapped__');

        if (aWrapped || bWrapped) {
          return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
        }
        // exit for functions and DOM nodes
        if (className != objectClass) {
          return false;
        }
        // in older versions of Opera, `arguments` objects have `Array` constructors
        var ctorA = a.constructor,
            ctorB = b.constructor;

        // non `Object` object instances with different constructors are not equal
        if (ctorA != ctorB &&
              !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
              ('constructor' in a && 'constructor' in b)
            ) {
          return false;
        }
      }
      // assume cyclic structures are equal
      // the algorithm for detecting cyclic structures is adapted from ES 5.1
      // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
      var initedStack = !stackA;
      stackA || (stackA = getArray());
      stackB || (stackB = getArray());

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == a) {
          return stackB[length] == b;
        }
      }
      var size = 0;
      result = true;

      // add `a` and `b` to the stack of traversed objects
      stackA.push(a);
      stackB.push(b);

      // recursively compare objects and arrays (susceptible to call stack limits)
      if (isArr) {
        // compare lengths to determine if a deep comparison is necessary
        length = a.length;
        size = b.length;
        result = size == length;

        if (result || isWhere) {
          // deep compare the contents, ignoring non-numeric properties
          while (size--) {
            var index = length,
                value = b[size];

            if (isWhere) {
              while (index--) {
                if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
                  break;
                }
              }
            } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
              break;
            }
          }
        }
      }
      else {
        // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
        // which, in this case, is more costly
        forIn(b, function(value, key, b) {
          if (hasOwnProperty.call(b, key)) {
            // count the number of properties.
            size++;
            // deep compare each property value.
            return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
          }
        });

        if (result && !isWhere) {
          // ensure both objects have the same number of properties
          forIn(a, function(value, key, a) {
            if (hasOwnProperty.call(a, key)) {
              // `size` will be `-1` if `a` has more properties than `b`
              return (result = --size > -1);
            }
          });
        }
      }
      stackA.pop();
      stackB.pop();

      if (initedStack) {
        releaseArray(stackA);
        releaseArray(stackB);
      }
      return result;
    }

    /**
     * The base implementation of `_.merge` without argument juggling or support
     * for `thisArg` binding.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [callback] The function to customize merging properties.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     */
    function baseMerge(object, source, callback, stackA, stackB) {
      (isArray(source) ? forEach : forOwn)(source, function(source, key) {
        var found,
            isArr,
            result = source,
            value = object[key];

        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
          // avoid merging previously merged cyclic sources
          var stackLength = stackA.length;
          while (stackLength--) {
            if ((found = stackA[stackLength] == source)) {
              value = stackB[stackLength];
              break;
            }
          }
          if (!found) {
            var isShallow;
            if (callback) {
              result = callback(value, source);
              if ((isShallow = typeof result != 'undefined')) {
                value = result;
              }
            }
            if (!isShallow) {
              value = isArr
                ? (isArray(value) ? value : [])
                : (isPlainObject(value) ? value : {});
            }
            // add `source` and associated `value` to the stack of traversed objects
            stackA.push(source);
            stackB.push(value);

            // recursively merge objects and arrays (susceptible to call stack limits)
            if (!isShallow) {
              baseMerge(value, source, callback, stackA, stackB);
            }
          }
        }
        else {
          if (callback) {
            result = callback(value, source);
            if (typeof result == 'undefined') {
              result = source;
            }
          }
          if (typeof result != 'undefined') {
            value = result;
          }
        }
        object[key] = value;
      });
    }

    /**
     * The base implementation of `_.random` without argument juggling or support
     * for returning floating-point numbers.
     *
     * @private
     * @param {number} min The minimum possible value.
     * @param {number} max The maximum possible value.
     * @returns {number} Returns a random number.
     */
    function baseRandom(min, max) {
      return min + floor(nativeRandom() * (max - min + 1));
    }

    /**
     * The base implementation of `_.uniq` without support for callback shorthands
     * or `thisArg` binding.
     *
     * @private
     * @param {Array} array The array to process.
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
     * @param {Function} [callback] The function called per iteration.
     * @returns {Array} Returns a duplicate-value-free array.
     */
    function baseUniq(array, isSorted, callback) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          result = [];

      var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
          seen = (callback || isLarge) ? getArray() : result;

      if (isLarge) {
        var cache = createCache(seen);
        indexOf = cacheIndexOf;
        seen = cache;
      }
      while (++index < length) {
        var value = array[index],
            computed = callback ? callback(value, index, array) : value;

        if (isSorted
              ? !index || seen[seen.length - 1] !== computed
              : indexOf(seen, computed) < 0
            ) {
          if (callback || isLarge) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      if (isLarge) {
        releaseArray(seen.array);
        releaseObject(seen);
      } else if (callback) {
        releaseArray(seen);
      }
      return result;
    }

    /**
     * Creates a function that aggregates a collection, creating an object composed
     * of keys generated from the results of running each element of the collection
     * through a callback. The given `setter` function sets the keys and values
     * of the composed object.
     *
     * @private
     * @param {Function} setter The setter function.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter) {
      return function(collection, callback, thisArg) {
        var result = {};
        callback = lodash.createCallback(callback, thisArg, 3);

        var index = -1,
            length = collection ? collection.length : 0;

        if (typeof length == 'number') {
          while (++index < length) {
            var value = collection[index];
            setter(result, value, callback(value, index, collection), collection);
          }
        } else {
          forOwn(collection, function(value, key, collection) {
            setter(result, value, callback(value, key, collection), collection);
          });
        }
        return result;
      };
    }

    /**
     * Creates a function that, when called, either curries or invokes `func`
     * with an optional `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of method flags to compose.
     *  The bitmask may be composed of the following flags:
     *  1 - `_.bind`
     *  2 - `_.bindKey`
     *  4 - `_.curry`
     *  8 - `_.curry` (bound)
     *  16 - `_.partial`
     *  32 - `_.partialRight`
     * @param {Array} [partialArgs] An array of arguments to prepend to those
     *  provided to the new function.
     * @param {Array} [partialRightArgs] An array of arguments to append to those
     *  provided to the new function.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new function.
     */
    function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
      var isBind = bitmask & 1,
          isBindKey = bitmask & 2,
          isCurry = bitmask & 4,
          isCurryBound = bitmask & 8,
          isPartial = bitmask & 16,
          isPartialRight = bitmask & 32;

      if (!isBindKey && !isFunction(func)) {
        throw new TypeError;
      }
      if (isPartial && !partialArgs.length) {
        bitmask &= ~16;
        isPartial = partialArgs = false;
      }
      if (isPartialRight && !partialRightArgs.length) {
        bitmask &= ~32;
        isPartialRight = partialRightArgs = false;
      }
      var bindData = func && func.__bindData__;
      if (bindData && bindData !== true) {
        // clone `bindData`
        bindData = slice(bindData);
        if (bindData[2]) {
          bindData[2] = slice(bindData[2]);
        }
        if (bindData[3]) {
          bindData[3] = slice(bindData[3]);
        }
        // set `thisBinding` is not previously bound
        if (isBind && !(bindData[1] & 1)) {
          bindData[4] = thisArg;
        }
        // set if previously bound but not currently (subsequent curried functions)
        if (!isBind && bindData[1] & 1) {
          bitmask |= 8;
        }
        // set curried arity if not yet set
        if (isCurry && !(bindData[1] & 4)) {
          bindData[5] = arity;
        }
        // append partial left arguments
        if (isPartial) {
          push.apply(bindData[2] || (bindData[2] = []), partialArgs);
        }
        // append partial right arguments
        if (isPartialRight) {
          unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
        }
        // merge flags
        bindData[1] |= bitmask;
        return createWrapper.apply(null, bindData);
      }
      // fast path for `_.bind`
      var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
      return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
    }

    /**
     * Used by `escape` to convert characters to HTML entities.
     *
     * @private
     * @param {string} match The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeHtmlChar(match) {
      return htmlEscapes[match];
    }

    /**
     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
     * customized, this method returns the custom method, otherwise it returns
     * the `baseIndexOf` function.
     *
     * @private
     * @returns {Function} Returns the "indexOf" function.
     */
    function getIndexOf() {
      var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
      return result;
    }

    /**
     * Checks if `value` is a native function.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
     */
    function isNative(value) {
      return typeof value == 'function' && reNative.test(value);
    }

    /**
     * Sets `this` binding data on a given function.
     *
     * @private
     * @param {Function} func The function to set data on.
     * @param {Array} value The data array to set.
     */
    var setBindData = !defineProperty ? noop : function(func, value) {
      descriptor.value = value;
      defineProperty(func, '__bindData__', descriptor);
    };

    /**
     * A fallback implementation of `isPlainObject` which checks if a given value
     * is an object created by the `Object` constructor, assuming objects created
     * by the `Object` constructor have no inherited enumerable properties and that
     * there are no `Object.prototype` extensions.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     */
    function shimIsPlainObject(value) {
      var ctor,
          result;

      // avoid non Object objects, `arguments` objects, and DOM elements
      if (!(value && toString.call(value) == objectClass) ||
          (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) {
        return false;
      }
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      forIn(value, function(value, key) {
        result = key;
      });
      return typeof result == 'undefined' || hasOwnProperty.call(value, result);
    }

    /**
     * Used by `unescape` to convert HTML entities to characters.
     *
     * @private
     * @param {string} match The matched character to unescape.
     * @returns {string} Returns the unescaped character.
     */
    function unescapeHtmlChar(match) {
      return htmlUnescapes[match];
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Checks if `value` is an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
     * @example
     *
     * (function() { return _.isArguments(arguments); })(1, 2, 3);
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == argsClass || false;
    }

    /**
     * Checks if `value` is an array.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
     * @example
     *
     * (function() { return _.isArray(arguments); })();
     * // => false
     *
     * _.isArray([1, 2, 3]);
     * // => true
     */
    var isArray = nativeIsArray || function(value) {
      return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == arrayClass || false;
    };

    /**
     * A fallback implementation of `Object.keys` which produces an array of the
     * given object's own enumerable property names.
     *
     * @private
     * @type Function
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names.
     */
    var shimKeys = function(object) {
      var index, iterable = object, result = [];
      if (!iterable) return result;
      if (!(objectTypes[typeof object])) return result;
        for (index in iterable) {
          if (hasOwnProperty.call(iterable, index)) {
            result.push(index);
          }
        }
      return result
    };

    /**
     * Creates an array composed of the own enumerable property names of an object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names.
     * @example
     *
     * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
     * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
     */
    var keys = !nativeKeys ? shimKeys : function(object) {
      if (!isObject(object)) {
        return [];
      }
      return nativeKeys(object);
    };

    /**
     * Used to convert characters to HTML entities:
     *
     * Though the `>` character is escaped for symmetry, characters like `>` and `/`
     * don't require escaping in HTML and have no special meaning unless they're part
     * of a tag or an unquoted attribute value.
     * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
     */
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    /** Used to convert HTML entities to characters */
    var htmlUnescapes = invert(htmlEscapes);

    /** Used to match HTML entities and HTML characters */
    var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),
        reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

    /*--------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object. Subsequent sources will overwrite property assignments of previous
     * sources. If a callback is provided it will be executed to produce the
     * assigned values. The callback is bound to `thisArg` and invoked with two
     * arguments; (objectValue, sourceValue).
     *
     * @static
     * @memberOf _
     * @type Function
     * @alias extend
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param {Function} [callback] The function to customize assigning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
     * // => { 'name': 'fred', 'employer': 'slate' }
     *
     * var defaults = _.partialRight(_.assign, function(a, b) {
     *   return typeof a == 'undefined' ? b : a;
     * });
     *
     * var object = { 'name': 'barney' };
     * defaults(object, { 'name': 'fred', 'employer': 'slate' });
     * // => { 'name': 'barney', 'employer': 'slate' }
     */
    var assign = function(object, source, guard) {
      var index, iterable = object, result = iterable;
      if (!iterable) return result;
      var args = arguments,
          argsIndex = 0,
          argsLength = typeof guard == 'number' ? 2 : args.length;
      if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {
        var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
      } else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {
        callback = args[--argsLength];
      }
      while (++argsIndex < argsLength) {
        iterable = args[argsIndex];
        if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
        }
        }
      }
      return result
    };

    /**
     * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
     * be cloned, otherwise they will be assigned by reference. If a callback
     * is provided it will be executed to produce the cloned values. If the
     * callback returns `undefined` cloning will be handled by the method instead.
     * The callback is bound to `thisArg` and invoked with one argument; (value).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep=false] Specify a deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * var shallow = _.clone(characters);
     * shallow[0] === characters[0];
     * // => true
     *
     * var deep = _.clone(characters, true);
     * deep[0] === characters[0];
     * // => false
     *
     * _.mixin({
     *   'clone': _.partialRight(_.clone, function(value) {
     *     return _.isElement(value) ? value.cloneNode(false) : undefined;
     *   })
     * });
     *
     * var clone = _.clone(document.body);
     * clone.childNodes.length;
     * // => 0
     */
    function clone(value, isDeep, callback, thisArg) {
      // allows working with "Collections" methods without using their `index`
      // and `collection` arguments for `isDeep` and `callback`
      if (typeof isDeep != 'boolean' && isDeep != null) {
        thisArg = callback;
        callback = isDeep;
        isDeep = false;
      }
      return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
    }

    /**
     * Creates a deep clone of `value`. If a callback is provided it will be
     * executed to produce the cloned values. If the callback returns `undefined`
     * cloning will be handled by the method instead. The callback is bound to
     * `thisArg` and invoked with one argument; (value).
     *
     * Note: This method is loosely based on the structured clone algorithm. Functions
     * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
     * objects created by constructors other than `Object` are cloned to plain `Object` objects.
     * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * var deep = _.cloneDeep(characters);
     * deep[0] === characters[0];
     * // => false
     *
     * var view = {
     *   'label': 'docs',
     *   'node': element
     * };
     *
     * var clone = _.cloneDeep(view, function(value) {
     *   return _.isElement(value) ? value.cloneNode(true) : undefined;
     * });
     *
     * clone.node == view.node;
     * // => false
     */
    function cloneDeep(value, callback, thisArg) {
      return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
    }

    /**
     * Creates an object that inherits from the given `prototype` object. If a
     * `properties` object is provided its own enumerable properties are assigned
     * to the created object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties ? assign(result, properties) : result;
    }

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object for all destination properties that resolve to `undefined`. Once a
     * property is set, additional defaults of the same property will be ignored.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param- {Object} [guard] Allows working with `_.reduce` without using its
     *  `key` and `object` arguments as sources.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * var object = { 'name': 'barney' };
     * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
     * // => { 'name': 'barney', 'employer': 'slate' }
     */
    var defaults = function(object, source, guard) {
      var index, iterable = object, result = iterable;
      if (!iterable) return result;
      var args = arguments,
          argsIndex = 0,
          argsLength = typeof guard == 'number' ? 2 : args.length;
      while (++argsIndex < argsLength) {
        iterable = args[argsIndex];
        if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (typeof result[index] == 'undefined') result[index] = iterable[index];
        }
        }
      }
      return result
    };

    /**
     * This method is like `_.findIndex` except that it returns the key of the
     * first element that passes the callback check, instead of the element itself.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [callback=identity] The function called per
     *  iteration. If a property name or object is provided it will be used to
     *  create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
     * @example
     *
     * var characters = {
     *   'barney': {  'age': 36, 'blocked': false },
     *   'fred': {    'age': 40, 'blocked': true },
     *   'pebbles': { 'age': 1,  'blocked': false }
     * };
     *
     * _.findKey(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => 'barney' (property order is not guaranteed across environments)
     *
     * // using "_.where" callback shorthand
     * _.findKey(characters, { 'age': 1 });
     * // => 'pebbles'
     *
     * // using "_.pluck" callback shorthand
     * _.findKey(characters, 'blocked');
     * // => 'fred'
     */
    function findKey(object, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forOwn(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result = key;
          return false;
        }
      });
      return result;
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [callback=identity] The function called per
     *  iteration. If a property name or object is provided it will be used to
     *  create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
     * @example
     *
     * var characters = {
     *   'barney': {  'age': 36, 'blocked': true },
     *   'fred': {    'age': 40, 'blocked': false },
     *   'pebbles': { 'age': 1,  'blocked': true }
     * };
     *
     * _.findLastKey(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => returns `pebbles`, assuming `_.findKey` returns `barney`
     *
     * // using "_.where" callback shorthand
     * _.findLastKey(characters, { 'age': 40 });
     * // => 'fred'
     *
     * // using "_.pluck" callback shorthand
     * _.findLastKey(characters, 'blocked');
     * // => 'pebbles'
     */
    function findLastKey(object, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forOwnRight(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result = key;
          return false;
        }
      });
      return result;
    }

    /**
     * Iterates over own and inherited enumerable properties of an object,
     * executing the callback for each property. The callback is bound to `thisArg`
     * and invoked with three arguments; (value, key, object). Callbacks may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * Shape.prototype.move = function(x, y) {
     *   this.x += x;
     *   this.y += y;
     * };
     *
     * _.forIn(new Shape, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
     */
    var forIn = function(collection, callback, thisArg) {
      var index, iterable = collection, result = iterable;
      if (!iterable) return result;
      if (!objectTypes[typeof iterable]) return result;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        for (index in iterable) {
          if (callback(iterable[index], index, collection) === false) return result;
        }
      return result
    };

    /**
     * This method is like `_.forIn` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * Shape.prototype.move = function(x, y) {
     *   this.x += x;
     *   this.y += y;
     * };
     *
     * _.forInRight(new Shape, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'move', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'move'
     */
    function forInRight(object, callback, thisArg) {
      var pairs = [];

      forIn(object, function(value, key) {
        pairs.push(key, value);
      });

      var length = pairs.length;
      callback = baseCreateCallback(callback, thisArg, 3);
      while (length--) {
        if (callback(pairs[length--], pairs[length], object) === false) {
          break;
        }
      }
      return object;
    }

    /**
     * Iterates over own enumerable properties of an object, executing the callback
     * for each property. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, key, object). Callbacks may exit iteration early by
     * explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
     *   console.log(key);
     * });
     * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
     */
    var forOwn = function(collection, callback, thisArg) {
      var index, iterable = collection, result = iterable;
      if (!iterable) return result;
      if (!objectTypes[typeof iterable]) return result;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (callback(iterable[index], index, collection) === false) return result;
        }
      return result
    };

    /**
     * This method is like `_.forOwn` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
     *   console.log(key);
     * });
     * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
     */
    function forOwnRight(object, callback, thisArg) {
      var props = keys(object),
          length = props.length;

      callback = baseCreateCallback(callback, thisArg, 3);
      while (length--) {
        var key = props[length];
        if (callback(object[key], key, object) === false) {
          break;
        }
      }
      return object;
    }

    /**
     * Creates a sorted array of property names of all enumerable properties,
     * own and inherited, of `object` that have function values.
     *
     * @static
     * @memberOf _
     * @alias methods
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names that have function values.
     * @example
     *
     * _.functions(_);
     * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
     */
    function functions(object) {
      var result = [];
      forIn(object, function(value, key) {
        if (isFunction(value)) {
          result.push(key);
        }
      });
      return result.sort();
    }

    /**
     * Checks if the specified property name exists as a direct property of `object`,
     * instead of an inherited property.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @param {string} key The name of the property to check.
     * @returns {boolean} Returns `true` if key is a direct property, else `false`.
     * @example
     *
     * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
     * // => true
     */
    function has(object, key) {
      return object ? hasOwnProperty.call(object, key) : false;
    }

    /**
     * Creates an object composed of the inverted keys and values of the given object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the created inverted object.
     * @example
     *
     * _.invert({ 'first': 'fred', 'second': 'barney' });
     * // => { 'fred': 'first', 'barney': 'second' }
     */
    function invert(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index];
        result[object[key]] = key;
      }
      return result;
    }

    /**
     * Checks if `value` is a boolean value.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
     * @example
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        value && typeof value == 'object' && toString.call(value) == boolClass || false;
    }

    /**
     * Checks if `value` is a date.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     */
    function isDate(value) {
      return value && typeof value == 'object' && toString.call(value) == dateClass || false;
    }

    /**
     * Checks if `value` is a DOM element.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     */
    function isElement(value) {
      return value && value.nodeType === 1 || false;
    }

    /**
     * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
     * length of `0` and objects with no own enumerable properties are considered
     * "empty".
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({});
     * // => true
     *
     * _.isEmpty('');
     * // => true
     */
    function isEmpty(value) {
      var result = true;
      if (!value) {
        return result;
      }
      var className = toString.call(value),
          length = value.length;

      if ((className == arrayClass || className == stringClass || className == argsClass ) ||
          (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
        return !length;
      }
      forOwn(value, function() {
        return (result = false);
      });
      return result;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent to each other. If a callback is provided it will be executed
     * to compare values. If the callback returns `undefined` comparisons will
     * be handled by the method instead. The callback is bound to `thisArg` and
     * invoked with two arguments; (a, b).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} a The value to compare.
     * @param {*} b The other value to compare.
     * @param {Function} [callback] The function to customize comparing values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'name': 'fred' };
     * var copy = { 'name': 'fred' };
     *
     * object == copy;
     * // => false
     *
     * _.isEqual(object, copy);
     * // => true
     *
     * var words = ['hello', 'goodbye'];
     * var otherWords = ['hi', 'goodbye'];
     *
     * _.isEqual(words, otherWords, function(a, b) {
     *   var reGreet = /^(?:hello|hi)$/i,
     *       aGreet = _.isString(a) && reGreet.test(a),
     *       bGreet = _.isString(b) && reGreet.test(b);
     *
     *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
     * });
     * // => true
     */
    function isEqual(a, b, callback, thisArg) {
      return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
    }

    /**
     * Checks if `value` is, or can be coerced to, a finite number.
     *
     * Note: This is not the same as native `isFinite` which will return true for
     * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
     * @example
     *
     * _.isFinite(-101);
     * // => true
     *
     * _.isFinite('10');
     * // => true
     *
     * _.isFinite(true);
     * // => false
     *
     * _.isFinite('');
     * // => false
     *
     * _.isFinite(Infinity);
     * // => false
     */
    function isFinite(value) {
      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
    }

    /**
     * Checks if `value` is a function.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     */
    function isFunction(value) {
      return typeof value == 'function';
    }

    /**
     * Checks if `value` is the language type of Object.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
    function isObject(value) {
      // check if the value is the ECMAScript language type of Object
      // http://es5.github.io/#x8
      // and avoid a V8 bug
      // http://code.google.com/p/v8/issues/detail?id=2291
      return !!(value && objectTypes[typeof value]);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * Note: This is not the same as native `isNaN` which will return `true` for
     * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // `NaN` as a primitive is the only value that is not equal to itself
      // (perform the [[Class]] check first to avoid errors with some host objects in IE)
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(undefined);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is a number.
     *
     * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(8.4 * 5);
     * // => true
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        value && typeof value == 'object' && toString.call(value) == numberClass || false;
    }

    /**
     * Checks if `value` is an object created by the `Object` constructor.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * _.isPlainObject(new Shape);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     */
    var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
      if (!(value && toString.call(value) == objectClass)) {
        return false;
      }
      var valueOf = value.valueOf,
          objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

      return objProto
        ? (value == objProto || getPrototypeOf(value) == objProto)
        : shimIsPlainObject(value);
    };

    /**
     * Checks if `value` is a regular expression.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
     * @example
     *
     * _.isRegExp(/fred/);
     * // => true
     */
    function isRegExp(value) {
      return value && typeof value == 'object' && toString.call(value) == regexpClass || false;
    }

    /**
     * Checks if `value` is a string.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
     * @example
     *
     * _.isString('fred');
     * // => true
     */
    function isString(value) {
      return typeof value == 'string' ||
        value && typeof value == 'object' && toString.call(value) == stringClass || false;
    }

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     */
    function isUndefined(value) {
      return typeof value == 'undefined';
    }

    /**
     * Creates an object with the same keys as `object` and values generated by
     * running each own enumerable property of `object` through the callback.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new object with values of the results of each `callback` execution.
     * @example
     *
     * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; });
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     *
     * var characters = {
     *   'fred': { 'name': 'fred', 'age': 40 },
     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
     * };
     *
     * // using "_.pluck" callback shorthand
     * _.mapValues(characters, 'age');
     * // => { 'fred': 40, 'pebbles': 1 }
     */
    function mapValues(object, callback, thisArg) {
      var result = {};
      callback = lodash.createCallback(callback, thisArg, 3);

      forOwn(object, function(value, key, object) {
        result[key] = callback(value, key, object);
      });
      return result;
    }

    /**
     * Recursively merges own enumerable properties of the source object(s), that
     * don't resolve to `undefined` into the destination object. Subsequent sources
     * will overwrite property assignments of previous sources. If a callback is
     * provided it will be executed to produce the merged values of the destination
     * and source properties. If the callback returns `undefined` merging will
     * be handled by the method instead. The callback is bound to `thisArg` and
     * invoked with two arguments; (objectValue, sourceValue).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param {Function} [callback] The function to customize merging properties.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * var names = {
     *   'characters': [
     *     { 'name': 'barney' },
     *     { 'name': 'fred' }
     *   ]
     * };
     *
     * var ages = {
     *   'characters': [
     *     { 'age': 36 },
     *     { 'age': 40 }
     *   ]
     * };
     *
     * _.merge(names, ages);
     * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
     *
     * var food = {
     *   'fruits': ['apple'],
     *   'vegetables': ['beet']
     * };
     *
     * var otherFood = {
     *   'fruits': ['banana'],
     *   'vegetables': ['carrot']
     * };
     *
     * _.merge(food, otherFood, function(a, b) {
     *   return _.isArray(a) ? a.concat(b) : undefined;
     * });
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
     */
    function merge(object) {
      var args = arguments,
          length = 2;

      if (!isObject(object)) {
        return object;
      }
      // allows working with `_.reduce` and `_.reduceRight` without using
      // their `index` and `collection` arguments
      if (typeof args[2] != 'number') {
        length = args.length;
      }
      if (length > 3 && typeof args[length - 2] == 'function') {
        var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
      } else if (length > 2 && typeof args[length - 1] == 'function') {
        callback = args[--length];
      }
      var sources = slice(arguments, 1, length),
          index = -1,
          stackA = getArray(),
          stackB = getArray();

      while (++index < length) {
        baseMerge(object, sources[index], callback, stackA, stackB);
      }
      releaseArray(stackA);
      releaseArray(stackB);
      return object;
    }

    /**
     * Creates a shallow clone of `object` excluding the specified properties.
     * Property names may be specified as individual arguments or as arrays of
     * property names. If a callback is provided it will be executed for each
     * property of `object` omitting the properties the callback returns truey
     * for. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The source object.
     * @param {Function|...string|string[]} [callback] The properties to omit or the
     *  function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns an object without the omitted properties.
     * @example
     *
     * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
     * // => { 'name': 'fred' }
     *
     * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
     *   return typeof value == 'number';
     * });
     * // => { 'name': 'fred' }
     */
    function omit(object, callback, thisArg) {
      var result = {};
      if (typeof callback != 'function') {
        var props = [];
        forIn(object, function(value, key) {
          props.push(key);
        });
        props = baseDifference(props, baseFlatten(arguments, true, false, 1));

        var index = -1,
            length = props.length;

        while (++index < length) {
          var key = props[index];
          result[key] = object[key];
        }
      } else {
        callback = lodash.createCallback(callback, thisArg, 3);
        forIn(object, function(value, key, object) {
          if (!callback(value, key, object)) {
            result[key] = value;
          }
        });
      }
      return result;
    }

    /**
     * Creates a two dimensional array of an object's key-value pairs,
     * i.e. `[[key1, value1], [key2, value2]]`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns new array of key-value pairs.
     * @example
     *
     * _.pairs({ 'barney': 36, 'fred': 40 });
     * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
     */
    function pairs(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        var key = props[index];
        result[index] = [key, object[key]];
      }
      return result;
    }

    /**
     * Creates a shallow clone of `object` composed of the specified properties.
     * Property names may be specified as individual arguments or as arrays of
     * property names. If a callback is provided it will be executed for each
     * property of `object` picking the properties the callback returns truey
     * for. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The source object.
     * @param {Function|...string|string[]} [callback] The function called per
     *  iteration or property names to pick, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns an object composed of the picked properties.
     * @example
     *
     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
     * // => { 'name': 'fred' }
     *
     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
     *   return key.charAt(0) != '_';
     * });
     * // => { 'name': 'fred' }
     */
    function pick(object, callback, thisArg) {
      var result = {};
      if (typeof callback != 'function') {
        var index = -1,
            props = baseFlatten(arguments, true, false, 1),
            length = isObject(object) ? props.length : 0;

        while (++index < length) {
          var key = props[index];
          if (key in object) {
            result[key] = object[key];
          }
        }
      } else {
        callback = lodash.createCallback(callback, thisArg, 3);
        forIn(object, function(value, key, object) {
          if (callback(value, key, object)) {
            result[key] = value;
          }
        });
      }
      return result;
    }

    /**
     * An alternative to `_.reduce` this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable properties through a callback, with each callback execution
     * potentially mutating the `accumulator` object. The callback is bound to
     * `thisArg` and invoked with four arguments; (accumulator, value, key, object).
     * Callbacks may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
     *   num *= num;
     *   if (num % 2) {
     *     return result.push(num) < 3;
     *   }
     * });
     * // => [1, 9, 25]
     *
     * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
     *   result[key] = num * 3;
     * });
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     */
    function transform(object, callback, accumulator, thisArg) {
      var isArr = isArray(object);
      if (accumulator == null) {
        if (isArr) {
          accumulator = [];
        } else {
          var ctor = object && object.constructor,
              proto = ctor && ctor.prototype;

          accumulator = baseCreate(proto);
        }
      }
      if (callback) {
        callback = lodash.createCallback(callback, thisArg, 4);
        (isArr ? forEach : forOwn)(object, function(value, index, object) {
          return callback(accumulator, value, index, object);
        });
      }
      return accumulator;
    }

    /**
     * Creates an array composed of the own enumerable property values of `object`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property values.
     * @example
     *
     * _.values({ 'one': 1, 'two': 2, 'three': 3 });
     * // => [1, 2, 3] (property order is not guaranteed across environments)
     */
    function values(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        result[index] = object[props[index]];
      }
      return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates an array of elements from the specified indexes, or keys, of the
     * `collection`. Indexes may be specified as individual arguments or as arrays
     * of indexes.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
     *   to retrieve, specified as individual indexes or arrays of indexes.
     * @returns {Array} Returns a new array of elements corresponding to the
     *  provided indexes.
     * @example
     *
     * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
     * // => ['a', 'c', 'e']
     *
     * _.at(['fred', 'barney', 'pebbles'], 0, 2);
     * // => ['fred', 'pebbles']
     */
    function at(collection) {
      var args = arguments,
          index = -1,
          props = baseFlatten(args, true, false, 1),
          length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
          result = Array(length);

      while(++index < length) {
        result[index] = collection[props[index]];
      }
      return result;
    }

    /**
     * Checks if a given value is present in a collection using strict equality
     * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
     * offset from the end of the collection.
     *
     * @static
     * @memberOf _
     * @alias include
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {*} target The value to check for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
     * @example
     *
     * _.contains([1, 2, 3], 1);
     * // => true
     *
     * _.contains([1, 2, 3], 1, 2);
     * // => false
     *
     * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
     * // => true
     *
     * _.contains('pebbles', 'eb');
     * // => true
     */
    function contains(collection, target, fromIndex) {
      var index = -1,
          indexOf = getIndexOf(),
          length = collection ? collection.length : 0,
          result = false;

      fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
      if (isArray(collection)) {
        result = indexOf(collection, target, fromIndex) > -1;
      } else if (typeof length == 'number') {
        result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
      } else {
        forOwn(collection, function(value) {
          if (++index >= fromIndex) {
            return !(result = value === target);
          }
        });
      }
      return result;
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through the callback. The corresponding value
     * of each key is the number of times the key was returned by the callback.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
    });

    /**
     * Checks if the given callback returns truey value for **all** elements of
     * a collection. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias all
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if all elements passed the callback check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes']);
     * // => false
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.every(characters, 'age');
     * // => true
     *
     * // using "_.where" callback shorthand
     * _.every(characters, { 'age': 36 });
     * // => false
     */
    function every(collection, callback, thisArg) {
      var result = true;
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          if (!(result = !!callback(collection[index], index, collection))) {
            break;
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          return (result = !!callback(value, index, collection));
        });
      }
      return result;
    }

    /**
     * Iterates over elements of a collection, returning an array of all elements
     * the callback returns truey for. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias select
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of elements that passed the callback check.
     * @example
     *
     * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
     * // => [2, 4, 6]
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.filter(characters, 'blocked');
     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
     *
     * // using "_.where" callback shorthand
     * _.filter(characters, { 'age': 36 });
     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
     */
    function filter(collection, callback, thisArg) {
      var result = [];
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          var value = collection[index];
          if (callback(value, index, collection)) {
            result.push(value);
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          if (callback(value, index, collection)) {
            result.push(value);
          }
        });
      }
      return result;
    }

    /**
     * Iterates over elements of a collection, returning the first element that
     * the callback returns truey for. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias detect, findWhere
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the found element, else `undefined`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': false },
     *   { 'name': 'fred',    'age': 40, 'blocked': true },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
     * ];
     *
     * _.find(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => { 'name': 'barney', 'age': 36, 'blocked': false }
     *
     * // using "_.where" callback shorthand
     * _.find(characters, { 'age': 1 });
     * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }
     *
     * // using "_.pluck" callback shorthand
     * _.find(characters, 'blocked');
     * // => { 'name': 'fred', 'age': 40, 'blocked': true }
     */
    function find(collection, callback, thisArg) {
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          var value = collection[index];
          if (callback(value, index, collection)) {
            return value;
          }
        }
      } else {
        var result;
        forOwn(collection, function(value, index, collection) {
          if (callback(value, index, collection)) {
            result = value;
            return false;
          }
        });
        return result;
      }
    }

    /**
     * This method is like `_.find` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the found element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(num) {
     *   return num % 2 == 1;
     * });
     * // => 3
     */
    function findLast(collection, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forEachRight(collection, function(value, index, collection) {
        if (callback(value, index, collection)) {
          result = value;
          return false;
        }
      });
      return result;
    }

    /**
     * Iterates over elements of a collection, executing the callback for each
     * element. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection). Callbacks may exit iteration early by
     * explicitly returning `false`.
     *
     * Note: As with other "Collections" methods, objects with a `length` property
     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
     * may be used for object iteration.
     *
     * @static
     * @memberOf _
     * @alias each
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
     * // => logs each number and returns '1,2,3'
     *
     * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
     * // => logs each number and returns the object (property order is not guaranteed across environments)
     */
    function forEach(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0;

      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        while (++index < length) {
          if (callback(collection[index], index, collection) === false) {
            break;
          }
        }
      } else {
        forOwn(collection, callback);
      }
      return collection;
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias eachRight
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
     * // => logs each number from right to left and returns '3,2,1'
     */
    function forEachRight(collection, callback, thisArg) {
      var length = collection ? collection.length : 0;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        while (length--) {
          if (callback(collection[length], length, collection) === false) {
            break;
          }
        }
      } else {
        var props = keys(collection);
        length = props.length;
        forOwn(collection, function(value, key, collection) {
          key = props ? props[--length] : --length;
          return callback(collection[key], key, collection);
        });
      }
      return collection;
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of a collection through the callback. The corresponding value
     * of each key is an array of the elements responsible for generating the key.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * // using "_.pluck" callback shorthand
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of the collection through the given callback. The corresponding
     * value of each key is the last element responsible for generating the key.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var keys = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.indexBy(keys, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(characters, function(key) { this.fromCharCode(key.code); }, String);
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     */
    var indexBy = createAggregator(function(result, value, key) {
      result[key] = value;
    });

    /**
     * Invokes the method named by `methodName` on each element in the `collection`
     * returning an array of the results of each invoked method. Additional arguments
     * will be provided to each invoked method. If `methodName` is a function it
     * will be invoked for, and `this` bound to, each element in the `collection`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|string} methodName The name of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [arg] Arguments to invoke the method with.
     * @returns {Array} Returns a new array of the results of each invoked method.
     * @example
     *
     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invoke([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    function invoke(collection, methodName) {
      var args = slice(arguments, 2),
          index = -1,
          isFunc = typeof methodName == 'function',
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      forEach(collection, function(value) {
        result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
      });
      return result;
    }

    /**
     * Creates an array of values by running each element in the collection
     * through the callback. The callback is bound to `thisArg` and invoked with
     * three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias collect
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of the results of each `callback` execution.
     * @example
     *
     * _.map([1, 2, 3], function(num) { return num * 3; });
     * // => [3, 6, 9]
     *
     * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
     * // => [3, 6, 9] (property order is not guaranteed across environments)
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.map(characters, 'name');
     * // => ['barney', 'fred']
     */
    function map(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0;

      callback = lodash.createCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        var result = Array(length);
        while (++index < length) {
          result[index] = callback(collection[index], index, collection);
        }
      } else {
        result = [];
        forOwn(collection, function(value, key, collection) {
          result[++index] = callback(value, key, collection);
        });
      }
      return result;
    }

    /**
     * Retrieves the maximum value of a collection. If the collection is empty or
     * falsey `-Infinity` is returned. If a callback is provided it will be executed
     * for each value in the collection to generate the criterion by which the value
     * is ranked. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.max(characters, function(chr) { return chr.age; });
     * // => { 'name': 'fred', 'age': 40 };
     *
     * // using "_.pluck" callback shorthand
     * _.max(characters, 'age');
     * // => { 'name': 'fred', 'age': 40 };
     */
    function max(collection, callback, thisArg) {
      var computed = -Infinity,
          result = computed;

      // allows working with functions like `_.map` without using
      // their `index` argument as a callback
      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
        callback = null;
      }
      if (callback == null && isArray(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          if (value > result) {
            result = value;
          }
        }
      } else {
        callback = (callback == null && isString(collection))
          ? charAtCallback
          : lodash.createCallback(callback, thisArg, 3);

        forEach(collection, function(value, index, collection) {
          var current = callback(value, index, collection);
          if (current > computed) {
            computed = current;
            result = value;
          }
        });
      }
      return result;
    }

    /**
     * Retrieves the minimum value of a collection. If the collection is empty or
     * falsey `Infinity` is returned. If a callback is provided it will be executed
     * for each value in the collection to generate the criterion by which the value
     * is ranked. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.min(characters, function(chr) { return chr.age; });
     * // => { 'name': 'barney', 'age': 36 };
     *
     * // using "_.pluck" callback shorthand
     * _.min(characters, 'age');
     * // => { 'name': 'barney', 'age': 36 };
     */
    function min(collection, callback, thisArg) {
      var computed = Infinity,
          result = computed;

      // allows working with functions like `_.map` without using
      // their `index` argument as a callback
      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
        callback = null;
      }
      if (callback == null && isArray(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          if (value < result) {
            result = value;
          }
        }
      } else {
        callback = (callback == null && isString(collection))
          ? charAtCallback
          : lodash.createCallback(callback, thisArg, 3);

        forEach(collection, function(value, index, collection) {
          var current = callback(value, index, collection);
          if (current < computed) {
            computed = current;
            result = value;
          }
        });
      }
      return result;
    }

    /**
     * Retrieves the value of a specified property from all elements in the collection.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {string} property The name of the property to pluck.
     * @returns {Array} Returns a new array of property values.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.pluck(characters, 'name');
     * // => ['barney', 'fred']
     */
    var pluck = map;

    /**
     * Reduces a collection to a value which is the accumulated result of running
     * each element in the collection through the callback, where each successive
     * callback execution consumes the return value of the previous execution. If
     * `accumulator` is not provided the first element of the collection will be
     * used as the initial `accumulator` value. The callback is bound to `thisArg`
     * and invoked with four arguments; (accumulator, value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @alias foldl, inject
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] Initial value of the accumulator.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var sum = _.reduce([1, 2, 3], function(sum, num) {
     *   return sum + num;
     * });
     * // => 6
     *
     * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
     *   result[key] = num * 3;
     *   return result;
     * }, {});
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     */
    function reduce(collection, callback, accumulator, thisArg) {
      if (!collection) return accumulator;
      var noaccum = arguments.length < 3;
      callback = lodash.createCallback(callback, thisArg, 4);

      var index = -1,
          length = collection.length;

      if (typeof length == 'number') {
        if (noaccum) {
          accumulator = collection[++index];
        }
        while (++index < length) {
          accumulator = callback(accumulator, collection[index], index, collection);
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          accumulator = noaccum
            ? (noaccum = false, value)
            : callback(accumulator, value, index, collection)
        });
      }
      return accumulator;
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias foldr
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] Initial value of the accumulator.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var list = [[0, 1], [2, 3], [4, 5]];
     * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, callback, accumulator, thisArg) {
      var noaccum = arguments.length < 3;
      callback = lodash.createCallback(callback, thisArg, 4);
      forEachRight(collection, function(value, index, collection) {
        accumulator = noaccum
          ? (noaccum = false, value)
          : callback(accumulator, value, index, collection);
      });
      return accumulator;
    }

    /**
     * The opposite of `_.filter` this method returns the elements of a
     * collection that the callback does **not** return truey for.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of elements that failed the callback check.
     * @example
     *
     * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
     * // => [1, 3, 5]
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.reject(characters, 'blocked');
     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
     *
     * // using "_.where" callback shorthand
     * _.reject(characters, { 'age': 36 });
     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
     */
    function reject(collection, callback, thisArg) {
      callback = lodash.createCallback(callback, thisArg, 3);
      return filter(collection, function(value, index, collection) {
        return !callback(value, index, collection);
      });
    }

    /**
     * Retrieves a random element or `n` random elements from a collection.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to sample.
     * @param {number} [n] The number of elements to sample.
     * @param- {Object} [guard] Allows working with functions like `_.map`
     *  without using their `index` arguments as `n`.
     * @returns {Array} Returns the random sample(s) of `collection`.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */
    function sample(collection, n, guard) {
      if (collection && typeof collection.length != 'number') {
        collection = values(collection);
      }
      if (n == null || guard) {
        return collection ? collection[baseRandom(0, collection.length - 1)] : undefined;
      }
      var result = shuffle(collection);
      result.length = nativeMin(nativeMax(0, n), result.length);
      return result;
    }

    /**
     * Creates an array of shuffled values, using a version of the Fisher-Yates
     * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to shuffle.
     * @returns {Array} Returns a new shuffled collection.
     * @example
     *
     * _.shuffle([1, 2, 3, 4, 5, 6]);
     * // => [4, 1, 6, 3, 5, 2]
     */
    function shuffle(collection) {
      var index = -1,
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      forEach(collection, function(value) {
        var rand = baseRandom(0, ++index);
        result[index] = result[rand];
        result[rand] = value;
      });
      return result;
    }

    /**
     * Gets the size of the `collection` by returning `collection.length` for arrays
     * and array-like objects or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns `collection.length` or number of own enumerable properties.
     * @example
     *
     * _.size([1, 2]);
     * // => 2
     *
     * _.size({ 'one': 1, 'two': 2, 'three': 3 });
     * // => 3
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      var length = collection ? collection.length : 0;
      return typeof length == 'number' ? length : keys(collection).length;
    }

    /**
     * Checks if the callback returns a truey value for **any** element of a
     * collection. The function returns as soon as it finds a passing value and
     * does not iterate over the entire collection. The callback is bound to
     * `thisArg` and invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias any
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if any element passed the callback check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.some(characters, 'blocked');
     * // => true
     *
     * // using "_.where" callback shorthand
     * _.some(characters, { 'age': 1 });
     * // => false
     */
    function some(collection, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          if ((result = callback(collection[index], index, collection))) {
            break;
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          return !(result = callback(value, index, collection));
        });
      }
      return !!result;
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through the callback. This method
     * performs a stable sort, that is, it will preserve the original sort order
     * of equal elements. The callback is bound to `thisArg` and invoked with
     * three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an array of property names is provided for `callback` the collection
     * will be sorted by each property value.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of sorted elements.
     * @example
     *
     * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
     * // => [3, 1, 2]
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36 },
     *   { 'name': 'fred',    'age': 40 },
     *   { 'name': 'barney',  'age': 26 },
     *   { 'name': 'fred',    'age': 30 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.map(_.sortBy(characters, 'age'), _.values);
     * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
     *
     * // sorting by multiple properties
     * _.map(_.sortBy(characters, ['name', 'age']), _.values);
     * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
     */
    function sortBy(collection, callback, thisArg) {
      var index = -1,
          isArr = isArray(callback),
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      if (!isArr) {
        callback = lodash.createCallback(callback, thisArg, 3);
      }
      forEach(collection, function(value, key, collection) {
        var object = result[++index] = getObject();
        if (isArr) {
          object.criteria = map(callback, function(key) { return value[key]; });
        } else {
          (object.criteria = getArray())[0] = callback(value, key, collection);
        }
        object.index = index;
        object.value = value;
      });

      length = result.length;
      result.sort(compareAscending);
      while (length--) {
        var object = result[length];
        result[length] = object.value;
        if (!isArr) {
          releaseArray(object.criteria);
        }
        releaseObject(object);
      }
      return result;
    }

    /**
     * Converts the `collection` to an array.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to convert.
     * @returns {Array} Returns the new converted array.
     * @example
     *
     * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
     * // => [2, 3, 4]
     */
    function toArray(collection) {
      if (collection && typeof collection.length == 'number') {
        return slice(collection);
      }
      return values(collection);
    }

    /**
     * Performs a deep comparison of each element in a `collection` to the given
     * `properties` object, returning an array of all elements that have equivalent
     * property values.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Object} props The object of property values to filter by.
     * @returns {Array} Returns a new array of elements that have the given properties.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * _.where(characters, { 'age': 36 });
     * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]
     *
     * _.where(characters, { 'pets': ['dino'] });
     * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]
     */
    var where = filter;

    /*--------------------------------------------------------------------------*/

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are all falsey.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to compact.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * Creates an array excluding all values of the provided arrays using strict
     * equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to process.
     * @param {...Array} [values] The arrays of values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
     * // => [1, 3, 4]
     */
    function difference(array) {
      return baseDifference(array, baseFlatten(arguments, true, true, 1));
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element that passes the callback check, instead of the element itself.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': false },
     *   { 'name': 'fred',    'age': 40, 'blocked': true },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
     * ];
     *
     * _.findIndex(characters, function(chr) {
     *   return chr.age < 20;
     * });
     * // => 2
     *
     * // using "_.where" callback shorthand
     * _.findIndex(characters, { 'age': 36 });
     * // => 0
     *
     * // using "_.pluck" callback shorthand
     * _.findIndex(characters, 'blocked');
     * // => 1
     */
    function findIndex(array, callback, thisArg) {
      var index = -1,
          length = array ? array.length : 0;

      callback = lodash.createCallback(callback, thisArg, 3);
      while (++index < length) {
        if (callback(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': true },
     *   { 'name': 'fred',    'age': 40, 'blocked': false },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
     * ];
     *
     * _.findLastIndex(characters, function(chr) {
     *   return chr.age > 30;
     * });
     * // => 1
     *
     * // using "_.where" callback shorthand
     * _.findLastIndex(characters, { 'age': 36 });
     * // => 0
     *
     * // using "_.pluck" callback shorthand
     * _.findLastIndex(characters, 'blocked');
     * // => 2
     */
    function findLastIndex(array, callback, thisArg) {
      var length = array ? array.length : 0;
      callback = lodash.createCallback(callback, thisArg, 3);
      while (length--) {
        if (callback(array[length], length, array)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Gets the first element or first `n` elements of an array. If a callback
     * is provided elements at the beginning of the array are returned as long
     * as the callback returns truey. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias head, take
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback] The function called
     *  per element or the number of elements to return. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the first element(s) of `array`.
     * @example
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.first([1, 2, 3], function(num) {
     *   return num < 3;
     * });
     * // => [1, 2]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.first(characters, 'blocked');
     * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]
     *
     * // using "_.where" callback shorthand
     * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
     * // => ['barney', 'fred']
     */
    function first(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = -1;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = callback;
        if (n == null || thisArg) {
          return array ? array[0] : undefined;
        }
      }
      return slice(array, 0, nativeMin(nativeMax(0, n), length));
    }

    /**
     * Flattens a nested array (the nesting can be to any depth). If `isShallow`
     * is truey, the array will only be flattened a single level. If a callback
     * is provided each element of the array is passed through the callback before
     * flattening. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to flatten.
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new flattened array.
     * @example
     *
     * _.flatten([1, [2], [3, [[4]]]]);
     * // => [1, 2, 3, 4];
     *
     * _.flatten([1, [2], [3, [[4]]]], true);
     * // => [1, 2, 3, [[4]]];
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.flatten(characters, 'pets');
     * // => ['hoppy', 'baby puss', 'dino']
     */
    function flatten(array, isShallow, callback, thisArg) {
      // juggle arguments
      if (typeof isShallow != 'boolean' && isShallow != null) {
        thisArg = callback;
        callback = (typeof isShallow != 'function' && thisArg && thisArg[isShallow] === array) ? null : isShallow;
        isShallow = false;
      }
      if (callback != null) {
        array = map(array, callback, thisArg);
      }
      return baseFlatten(array, isShallow);
    }

    /**
     * Gets the index at which the first occurrence of `value` is found using
     * strict equality for comparisons, i.e. `===`. If the array is already sorted
     * providing `true` for `fromIndex` will run a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
     *  to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value or `-1`.
     * @example
     *
     * _.indexOf([1, 2, 3, 1, 2, 3], 2);
     * // => 1
     *
     * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
     * // => 4
     *
     * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
     * // => 2
     */
    function indexOf(array, value, fromIndex) {
      if (typeof fromIndex == 'number') {
        var length = array ? array.length : 0;
        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
      } else if (fromIndex) {
        var index = sortedIndex(array, value);
        return array[index] === value ? index : -1;
      }
      return baseIndexOf(array, value, fromIndex);
    }

    /**
     * Gets all but the last element or last `n` elements of an array. If a
     * callback is provided elements at the end of the array are excluded from
     * the result as long as the callback returns truey. The callback is bound
     * to `thisArg` and invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback=1] The function called
     *  per element or the number of elements to exclude. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     *
     * _.initial([1, 2, 3], 2);
     * // => [1]
     *
     * _.initial([1, 2, 3], function(num) {
     *   return num > 1;
     * });
     * // => [1]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.initial(characters, 'blocked');
     * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]
     *
     * // using "_.where" callback shorthand
     * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');
     * // => ['barney', 'fred']
     */
    function initial(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = length;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (index-- && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = (callback == null || thisArg) ? 1 : callback || n;
      }
      return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
    }

    /**
     * Creates an array of unique values present in all provided arrays using
     * strict equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of shared values.
     * @example
     *
     * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
     * // => [1, 2]
     */
    function intersection() {
      var args = [],
          argsIndex = -1,
          argsLength = arguments.length,
          caches = getArray(),
          indexOf = getIndexOf(),
          trustIndexOf = indexOf === baseIndexOf,
          seen = getArray();

      while (++argsIndex < argsLength) {
        var value = arguments[argsIndex];
        if (isArray(value) || isArguments(value)) {
          args.push(value);
          caches.push(trustIndexOf && value.length >= largeArraySize &&
            createCache(argsIndex ? args[argsIndex] : seen));
        }
      }
      var array = args[0],
          index = -1,
          length = array ? array.length : 0,
          result = [];

      outer:
      while (++index < length) {
        var cache = caches[0];
        value = array[index];

        if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
          argsIndex = argsLength;
          (cache || seen).push(value);
          while (--argsIndex) {
            cache = caches[argsIndex];
            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
              continue outer;
            }
          }
          result.push(value);
        }
      }
      while (argsLength--) {
        cache = caches[argsLength];
        if (cache) {
          releaseObject(cache);
        }
      }
      releaseArray(caches);
      releaseArray(seen);
      return result;
    }

    /**
     * Gets the last element or last `n` elements of an array. If a callback is
     * provided elements at the end of the array are returned as long as the
     * callback returns truey. The callback is bound to `thisArg` and invoked
     * with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback] The function called
     *  per element or the number of elements to return. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the last element(s) of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     *
     * _.last([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.last([1, 2, 3], function(num) {
     *   return num > 1;
     * });
     * // => [2, 3]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.pluck(_.last(characters, 'blocked'), 'name');
     * // => ['fred', 'pebbles']
     *
     * // using "_.where" callback shorthand
     * _.last(characters, { 'employer': 'na' });
     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
     */
    function last(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = length;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (index-- && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = callback;
        if (n == null || thisArg) {
          return array ? array[length - 1] : undefined;
        }
      }
      return slice(array, nativeMax(0, length - n));
    }

    /**
     * Gets the index at which the last occurrence of `value` is found using strict
     * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
     * as the offset from the end of the collection.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value or `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
     * // => 4
     *
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var index = array ? array.length : 0;
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
      }
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Removes all provided values from the given array using strict equality for
     * comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to modify.
     * @param {...*} [value] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */
    function pull(array) {
      var args = arguments,
          argsIndex = 0,
          argsLength = args.length,
          length = array ? array.length : 0;

      while (++argsIndex < argsLength) {
        var index = -1,
            value = args[argsIndex];
        while (++index < length) {
          if (array[index] === value) {
            splice.call(array, index--, 1);
            length--;
          }
        }
      }
      return array;
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to but not including `end`. If `start` is less than `stop` a
     * zero-length range is created unless a negative `step` is specified.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns a new range array.
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    function range(start, end, step) {
      start = +start || 0;
      step = typeof step == 'number' ? step : (+step || 1);

      if (end == null) {
        end = start;
        start = 0;
      }
      // use `Array(length)` so engines like Chakra and V8 avoid slower modes
      // http://youtu.be/XAqIpGU8ZZk#t=17m25s
      var index = -1,
          length = nativeMax(0, ceil((end - start) / (step || 1))),
          result = Array(length);

      while (++index < length) {
        result[index] = start;
        start += step;
      }
      return result;
    }

    /**
     * Removes all elements from an array that the callback returns truey for
     * and returns an array of removed elements. The callback is bound to `thisArg`
     * and invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4, 5, 6];
     * var evens = _.remove(array, function(num) { return num % 2 == 0; });
     *
     * console.log(array);
     * // => [1, 3, 5]
     *
     * console.log(evens);
     * // => [2, 4, 6]
     */
    function remove(array, callback, thisArg) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      callback = lodash.createCallback(callback, thisArg, 3);
      while (++index < length) {
        var value = array[index];
        if (callback(value, index, array)) {
          result.push(value);
          splice.call(array, index--, 1);
          length--;
        }
      }
      return result;
    }

    /**
     * The opposite of `_.initial` this method gets all but the first element or
     * first `n` elements of an array. If a callback function is provided elements
     * at the beginning of the array are excluded from the result as long as the
     * callback returns truey. The callback is bound to `thisArg` and invoked
     * with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias drop, tail
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback=1] The function called
     *  per element or the number of elements to exclude. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a slice of `array`.
     * @example
     *
     * _.rest([1, 2, 3]);
     * // => [2, 3]
     *
     * _.rest([1, 2, 3], 2);
     * // => [3]
     *
     * _.rest([1, 2, 3], function(num) {
     *   return num < 3;
     * });
     * // => [3]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.pluck(_.rest(characters, 'blocked'), 'name');
     * // => ['fred', 'pebbles']
     *
     * // using "_.where" callback shorthand
     * _.rest(characters, { 'employer': 'slate' });
     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
     */
    function rest(array, callback, thisArg) {
      if (typeof callback != 'number' && callback != null) {
        var n = 0,
            index = -1,
            length = array ? array.length : 0;

        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
      }
      return slice(array, n);
    }

    /**
     * Uses a binary search to determine the smallest index at which a value
     * should be inserted into a given sorted array in order to maintain the sort
     * order of the array. If a callback is provided it will be executed for
     * `value` and each element of `array` to compute their sort ranking. The
     * callback is bound to `thisArg` and invoked with one argument; (value).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([20, 30, 50], 40);
     * // => 2
     *
     * // using "_.pluck" callback shorthand
     * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
     * // => 2
     *
     * var dict = {
     *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
     * };
     *
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
     *   return dict.wordToNumber[word];
     * });
     * // => 2
     *
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
     *   return this.wordToNumber[word];
     * }, dict);
     * // => 2
     */
    function sortedIndex(array, value, callback, thisArg) {
      var low = 0,
          high = array ? array.length : low;

      // explicitly reference `identity` for better inlining in Firefox
      callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
      value = callback(value);

      while (low < high) {
        var mid = (low + high) >>> 1;
        (callback(array[mid]) < value)
          ? low = mid + 1
          : high = mid;
      }
      return low;
    }

    /**
     * Creates an array of unique values, in order, of the provided arrays using
     * strict equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of combined values.
     * @example
     *
     * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
     * // => [1, 2, 3, 5, 4]
     */
    function union() {
      return baseUniq(baseFlatten(arguments, true, true));
    }

    /**
     * Creates a duplicate-value-free version of an array using strict equality
     * for comparisons, i.e. `===`. If the array is sorted, providing
     * `true` for `isSorted` will use a faster algorithm. If a callback is provided
     * each element of `array` is passed through the callback before uniqueness
     * is computed. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Arrays
     * @param {Array} array The array to process.
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a duplicate-value-free array.
     * @example
     *
     * _.uniq([1, 2, 1, 3, 1]);
     * // => [1, 2, 3]
     *
     * _.uniq([1, 1, 2, 2, 3], true);
     * // => [1, 2, 3]
     *
     * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
     * // => ['A', 'b', 'C']
     *
     * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
     * // => [1, 2.5, 3]
     *
     * // using "_.pluck" callback shorthand
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniq(array, isSorted, callback, thisArg) {
      // juggle arguments
      if (typeof isSorted != 'boolean' && isSorted != null) {
        thisArg = callback;
        callback = (typeof isSorted != 'function' && thisArg && thisArg[isSorted] === array) ? null : isSorted;
        isSorted = false;
      }
      if (callback != null) {
        callback = lodash.createCallback(callback, thisArg, 3);
      }
      return baseUniq(array, isSorted, callback);
    }

    /**
     * Creates an array excluding all provided values using strict equality for
     * comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to filter.
     * @param {...*} [value] The values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
     * // => [2, 3, 4]
     */
    function without(array) {
      return baseDifference(array, slice(arguments, 1));
    }

    /**
     * Creates an array that is the symmetric difference of the provided arrays.
     * See http://en.wikipedia.org/wiki/Symmetric_difference.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of values.
     * @example
     *
     * _.xor([1, 2, 3], [5, 2, 1, 4]);
     * // => [3, 5, 4]
     *
     * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
     * // => [1, 4, 5]
     */
    function xor() {
      var index = -1,
          length = arguments.length;

      while (++index < length) {
        var array = arguments[index];
        if (isArray(array) || isArguments(array)) {
          var result = result
            ? baseUniq(baseDifference(result, array).concat(baseDifference(array, result)))
            : array;
        }
      }
      return result || [];
    }

    /**
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second
     * elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @alias unzip
     * @category Arrays
     * @param {...Array} [array] Arrays to process.
     * @returns {Array} Returns a new array of grouped elements.
     * @example
     *
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     */
    function zip() {
      var array = arguments.length > 1 ? arguments : arguments[0],
          index = -1,
          length = array ? max(pluck(array, 'length')) : 0,
          result = Array(length < 0 ? 0 : length);

      while (++index < length) {
        result[index] = pluck(array, index);
      }
      return result;
    }

    /**
     * Creates an object composed from arrays of `keys` and `values`. Provide
     * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
     * or two arrays, one of `keys` and one of corresponding `values`.
     *
     * @static
     * @memberOf _
     * @alias object
     * @category Arrays
     * @param {Array} keys The array of keys.
     * @param {Array} [values=[]] The array of values.
     * @returns {Object} Returns an object composed of the given keys and
     *  corresponding values.
     * @example
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */
    function zipObject(keys, values) {
      var index = -1,
          length = keys ? keys.length : 0,
          result = {};

      if (!values && length && !isArray(keys[0])) {
        values = [];
      }
      while (++index < length) {
        var key = keys[index];
        if (values) {
          result[key] = values[index];
        } else if (key) {
          result[key[0]] = key[1];
        }
      }
      return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a function that executes `func`, with  the `this` binding and
     * arguments of the created function, only after being called `n` times.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {number} n The number of times the function must be called before
     *  `func` is executed.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('Done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'Done saving!', after all saves have completed
     */
    function after(n, func) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that, when called, invokes `func` with the `this`
     * binding of `thisArg` and prepends any additional `bind` arguments to those
     * provided to the bound function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to bind.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var func = function(greeting) {
     *   return greeting + ' ' + this.name;
     * };
     *
     * func = _.bind(func, { 'name': 'fred' }, 'hi');
     * func();
     * // => 'hi fred'
     */
    function bind(func, thisArg) {
      return arguments.length > 2
        ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
        : createWrapper(func, 1, null, null, thisArg);
    }

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method. Method names may be specified as individual arguments or as arrays
     * of method names. If no method names are provided all the function properties
     * of `object` will be bound.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...string} [methodName] The object method names to
     *  bind, specified as individual method names or arrays of method names.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'onClick': function() { console.log('clicked ' + this.label); }
     * };
     *
     * _.bindAll(view);
     * jQuery('#docs').on('click', view.onClick);
     * // => logs 'clicked docs', when the button is clicked
     */
    function bindAll(object) {
      var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
          index = -1,
          length = funcs.length;

      while (++index < length) {
        var key = funcs[index];
        object[key] = createWrapper(object[key], 1, null, null, object);
      }
      return object;
    }

    /**
     * Creates a function that, when called, invokes the method at `object[key]`
     * and prepends any additional `bindKey` arguments to those provided to the bound
     * function. This method differs from `_.bind` by allowing bound functions to
     * reference methods that will be redefined or don't yet exist.
     * See http://michaux.ca/articles/lazy-function-definition-pattern.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Object} object The object the method belongs to.
     * @param {string} key The key of the method.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'name': 'fred',
     *   'greet': function(greeting) {
     *     return greeting + ' ' + this.name;
     *   }
     * };
     *
     * var func = _.bindKey(object, 'greet', 'hi');
     * func();
     * // => 'hi fred'
     *
     * object.greet = function(greeting) {
     *   return greeting + 'ya ' + this.name + '!';
     * };
     *
     * func();
     * // => 'hiya fred!'
     */
    function bindKey(object, key) {
      return arguments.length > 2
        ? createWrapper(key, 19, slice(arguments, 2), null, object)
        : createWrapper(key, 3, null, null, object);
    }

    /**
     * Creates a function that is the composition of the provided functions,
     * where each function consumes the return value of the function that follows.
     * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
     * Each function is executed with the `this` binding of the composed function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {...Function} [func] Functions to compose.
     * @returns {Function} Returns the new composed function.
     * @example
     *
     * var realNameMap = {
     *   'pebbles': 'penelope'
     * };
     *
     * var format = function(name) {
     *   name = realNameMap[name.toLowerCase()] || name;
     *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
     * };
     *
     * var greet = function(formatted) {
     *   return 'Hiya ' + formatted + '!';
     * };
     *
     * var welcome = _.compose(greet, format);
     * welcome('pebbles');
     * // => 'Hiya Penelope!'
     */
    function compose() {
      var funcs = arguments,
          length = funcs.length;

      while (length--) {
        if (!isFunction(funcs[length])) {
          throw new TypeError;
        }
      }
      return function() {
        var args = arguments,
            length = funcs.length;

        while (length--) {
          args = [funcs[length].apply(this, args)];
        }
        return args[0];
      };
    }

    /**
     * Creates a function which accepts one or more arguments of `func` that when
     * invoked either executes `func` returning its result, if all `func` arguments
     * have been provided, or returns a function that accepts one or more of the
     * remaining `func` arguments, and so on. The arity of `func` can be specified
     * if `func.length` is not sufficient.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var curried = _.curry(function(a, b, c) {
     *   console.log(a + b + c);
     * });
     *
     * curried(1)(2)(3);
     * // => 6
     *
     * curried(1, 2)(3);
     * // => 6
     *
     * curried(1, 2, 3);
     * // => 6
     */
    function curry(func, arity) {
      arity = typeof arity == 'number' ? arity : (+arity || func.length);
      return createWrapper(func, 4, null, null, null, arity);
    }

    /**
     * Creates a function that will delay the execution of `func` until after
     * `wait` milliseconds have elapsed since the last time it was invoked.
     * Provide an options object to indicate that `func` should be invoked on
     * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
     * to the debounced function will return the result of the last `func` call.
     *
     * Note: If `leading` and `trailing` options are `true` `func` will be called
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to debounce.
     * @param {number} wait The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * var lazyLayout = _.debounce(calculateLayout, 150);
     * jQuery(window).on('resize', lazyLayout);
     *
     * // execute `sendMail` when the click event is fired, debouncing subsequent calls
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * });
     *
     * // ensure `batchLog` is executed once after 1 second of debounced calls
     * var source = new EventSource('/stream');
     * source.addEventListener('message', _.debounce(batchLog, 250, {
     *   'maxWait': 1000
     * }, false);
     */
    function debounce(func, wait, options) {
      var args,
          maxTimeoutId,
          result,
          stamp,
          thisArg,
          timeoutId,
          trailingCall,
          lastCalled = 0,
          maxWait = false,
          trailing = true;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      wait = nativeMax(0, wait) || 0;
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (isObject(options)) {
        leading = options.leading;
        maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
        trailing = 'trailing' in options ? options.trailing : trailing;
      }
      var delayed = function() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0) {
          if (maxTimeoutId) {
            clearTimeout(maxTimeoutId);
          }
          var isCalled = trailingCall;
          maxTimeoutId = timeoutId = trailingCall = undefined;
          if (isCalled) {
            lastCalled = now();
            result = func.apply(thisArg, args);
            if (!timeoutId && !maxTimeoutId) {
              args = thisArg = null;
            }
          }
        } else {
          timeoutId = setTimeout(delayed, remaining);
        }
      };

      var maxDelayed = function() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (trailing || (maxWait !== wait)) {
          lastCalled = now();
          result = func.apply(thisArg, args);
          if (!timeoutId && !maxTimeoutId) {
            args = thisArg = null;
          }
        }
      };

      return function() {
        args = arguments;
        stamp = now();
        thisArg = this;
        trailingCall = trailing && (timeoutId || !leading);

        if (maxWait === false) {
          var leadingCall = leading && !timeoutId;
        } else {
          if (!maxTimeoutId && !leading) {
            lastCalled = stamp;
          }
          var remaining = maxWait - (stamp - lastCalled),
              isCalled = remaining <= 0;

          if (isCalled) {
            if (maxTimeoutId) {
              maxTimeoutId = clearTimeout(maxTimeoutId);
            }
            lastCalled = stamp;
            result = func.apply(thisArg, args);
          }
          else if (!maxTimeoutId) {
            maxTimeoutId = setTimeout(maxDelayed, remaining);
          }
        }
        if (isCalled && timeoutId) {
          timeoutId = clearTimeout(timeoutId);
        }
        else if (!timeoutId && wait !== maxWait) {
          timeoutId = setTimeout(delayed, wait);
        }
        if (leadingCall) {
          isCalled = true;
          result = func.apply(thisArg, args);
        }
        if (isCalled && !timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
        return result;
      };
    }

    /**
     * Defers executing the `func` function until the current call stack has cleared.
     * Additional arguments will be provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to defer.
     * @param {...*} [arg] Arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) { console.log(text); }, 'deferred');
     * // logs 'deferred' after one or more milliseconds
     */
    function defer(func) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var args = slice(arguments, 1);
      return setTimeout(function() { func.apply(undefined, args); }, 1);
    }

    /**
     * Executes the `func` function after `wait` milliseconds. Additional arguments
     * will be provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay execution.
     * @param {...*} [arg] Arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) { console.log(text); }, 1000, 'later');
     * // => logs 'later' after one second
     */
    function delay(func, wait) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var args = slice(arguments, 2);
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it will be used to determine the cache key for storing the result
     * based on the arguments provided to the memoized function. By default, the
     * first argument provided to the memoized function is used as the cache key.
     * The `func` is executed with the `this` binding of the memoized function.
     * The result cache is exposed as the `cache` property on the memoized function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] A function used to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var fibonacci = _.memoize(function(n) {
     *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
     * });
     *
     * fibonacci(9)
     * // => 34
     *
     * var data = {
     *   'fred': { 'name': 'fred', 'age': 40 },
     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
     * };
     *
     * // modifying the result cache
     * var get = _.memoize(function(name) { return data[name]; }, _.identity);
     * get('pebbles');
     * // => { 'name': 'pebbles', 'age': 1 }
     *
     * get.cache.pebbles.name = 'penelope';
     * get('pebbles');
     * // => { 'name': 'penelope', 'age': 1 }
     */
    function memoize(func, resolver) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var memoized = function() {
        var cache = memoized.cache,
            key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];

        return hasOwnProperty.call(cache, key)
          ? cache[key]
          : (cache[key] = func.apply(this, arguments));
      }
      memoized.cache = {};
      return memoized;
    }

    /**
     * Creates a function that is restricted to execute `func` once. Repeat calls to
     * the function will return the value of the first call. The `func` is executed
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` executes `createApplication` once
     */
    function once(func) {
      var ran,
          result;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      return function() {
        if (ran) {
          return result;
        }
        ran = true;
        result = func.apply(this, arguments);

        // clear the `func` variable so the function may be garbage collected
        func = null;
        return result;
      };
    }

    /**
     * Creates a function that, when called, invokes `func` with any additional
     * `partial` arguments prepended to those provided to the new function. This
     * method is similar to `_.bind` except it does **not** alter the `this` binding.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) { return greeting + ' ' + name; };
     * var hi = _.partial(greet, 'hi');
     * hi('fred');
     * // => 'hi fred'
     */
    function partial(func) {
      return createWrapper(func, 16, slice(arguments, 1));
    }

    /**
     * This method is like `_.partial` except that `partial` arguments are
     * appended to those provided to the new function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var defaultsDeep = _.partialRight(_.merge, _.defaults);
     *
     * var options = {
     *   'variable': 'data',
     *   'imports': { 'jq': $ }
     * };
     *
     * defaultsDeep(options, _.templateSettings);
     *
     * options.variable
     * // => 'data'
     *
     * options.imports
     * // => { '_': _, 'jq': $ }
     */
    function partialRight(func) {
      return createWrapper(func, 32, null, slice(arguments, 1));
    }

    /**
     * Creates a function that, when executed, will only call the `func` function
     * at most once per every `wait` milliseconds. Provide an options object to
     * indicate that `func` should be invoked on the leading and/or trailing edge
     * of the `wait` timeout. Subsequent calls to the throttled function will
     * return the result of the last `func` call.
     *
     * Note: If `leading` and `trailing` options are `true` `func` will be called
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to throttle.
     * @param {number} wait The number of milliseconds to throttle executions to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * var throttled = _.throttle(updatePosition, 100);
     * jQuery(window).on('scroll', throttled);
     *
     * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
     *   'trailing': false
     * }));
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      if (options === false) {
        leading = false;
      } else if (isObject(options)) {
        leading = 'leading' in options ? options.leading : leading;
        trailing = 'trailing' in options ? options.trailing : trailing;
      }
      debounceOptions.leading = leading;
      debounceOptions.maxWait = wait;
      debounceOptions.trailing = trailing;

      return debounce(func, wait, debounceOptions);
    }

    /**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Additional arguments provided to the function are appended
     * to those provided to the wrapper function. The wrapper is executed with
     * the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('Fred, Wilma, & Pebbles');
     * // => '<p>Fred, Wilma, &amp; Pebbles</p>'
     */
    function wrap(value, wrapper) {
      return createWrapper(wrapper, 16, [value]);
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var object = { 'name': 'fred' };
     * var getter = _.constant(object);
     * getter() === object;
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * Produces a callback bound to an optional `thisArg`. If `func` is a property
     * name the created callback will return the property value for a given element.
     * If `func` is an object the created callback will return `true` for elements
     * that contain the equivalent object properties, otherwise it will return `false`.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {*} [func=identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of the created callback.
     * @param {number} [argCount] The number of arguments the callback accepts.
     * @returns {Function} Returns a callback function.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // wrap to create custom callback shorthands
     * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
     *   return !match ? func(callback, thisArg) : function(object) {
     *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
     *   };
     * });
     *
     * _.filter(characters, 'age__gt38');
     * // => [{ 'name': 'fred', 'age': 40 }]
     */
    function createCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (func == null || type == 'function') {
        return baseCreateCallback(func, thisArg, argCount);
      }
      // handle "_.pluck" style callback shorthands
      if (type != 'object') {
        return property(func);
      }
      var props = keys(func),
          key = props[0],
          a = func[key];

      // handle "_.where" style callback shorthands
      if (props.length == 1 && a === a && !isObject(a)) {
        // fast path the common case of providing an object with a single
        // property containing a primitive value
        return function(object) {
          var b = object[key];
          return a === b && (a !== 0 || (1 / a == 1 / b));
        };
      }
      return function(object) {
        var length = props.length,
            result = false;

        while (length--) {
          if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
            break;
          }
        }
        return result;
      };
    }

    /**
     * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
     * corresponding HTML entities.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} string The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('Fred, Wilma, & Pebbles');
     * // => 'Fred, Wilma, &amp; Pebbles'
     */
    function escape(string) {
      return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
    }

    /**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'name': 'fred' };
     * _.identity(object) === object;
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Adds function properties of a source object to the destination object.
     * If `object` is a function methods will be added to its prototype as well.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Function|Object} [object=lodash] object The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.chain=true] Specify whether the functions added are chainable.
     * @example
     *
     * function capitalize(string) {
     *   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
     * }
     *
     * _.mixin({ 'capitalize': capitalize });
     * _.capitalize('fred');
     * // => 'Fred'
     *
     * _('fred').capitalize().value();
     * // => 'Fred'
     *
     * _.mixin({ 'capitalize': capitalize }, { 'chain': false });
     * _('fred').capitalize();
     * // => 'Fred'
     */
    function mixin(object, source, options) {
      var chain = true,
          methodNames = source && functions(source);

      if (!source || (!options && !methodNames.length)) {
        if (options == null) {
          options = source;
        }
        ctor = lodashWrapper;
        source = object;
        object = lodash;
        methodNames = functions(source);
      }
      if (options === false) {
        chain = false;
      } else if (isObject(options) && 'chain' in options) {
        chain = options.chain;
      }
      var ctor = object,
          isFunc = isFunction(ctor);

      forEach(methodNames, function(methodName) {
        var func = object[methodName] = source[methodName];
        if (isFunc) {
          ctor.prototype[methodName] = function() {
            var chainAll = this.__chain__,
                value = this.__wrapped__,
                args = [value];

            push.apply(args, arguments);
            var result = func.apply(object, args);
            if (chain || chainAll) {
              if (value === result && isObject(result)) {
                return this;
              }
              result = new ctor(result);
              result.__chain__ = chainAll;
            }
            return result;
          };
        }
      });
    }

    /**
     * Reverts the '_' variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      context._ = oldDash;
      return this;
    }

    /**
     * A no-operation function.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @example
     *
     * var object = { 'name': 'fred' };
     * _.noop(object) === undefined;
     * // => true
     */
    function noop() {
      // no operation performed
    }

    /**
     * Gets the number of milliseconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @example
     *
     * var stamp = _.now();
     * _.defer(function() { console.log(_.now() - stamp); });
     * // => logs the number of milliseconds it took for the deferred function to be called
     */
    var now = isNative(now = Date.now) && now || function() {
      return new Date().getTime();
    };

    /**
     * Converts the given value into an integer of the specified radix.
     * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the
     * `value` is a hexadecimal, in which case a `radix` of `16` is used.
     *
     * Note: This method avoids differences in native ES3 and ES5 `parseInt`
     * implementations. See http://es5.github.io/#E.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} value The value to parse.
     * @param {number} [radix] The radix used to interpret the value to parse.
     * @returns {number} Returns the new integer value.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     */
    var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {
      // Firefox < 21 and Opera < 15 follow the ES3 specified implementation of `parseInt`
      return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
    };

    /**
     * Creates a "_.pluck" style function, which returns the `key` value of a
     * given object.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} key The name of the property to retrieve.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var characters = [
     *   { 'name': 'fred',   'age': 40 },
     *   { 'name': 'barney', 'age': 36 }
     * ];
     *
     * var getName = _.property('name');
     *
     * _.map(characters, getName);
     * // => ['barney', 'fred']
     *
     * _.sortBy(characters, getName);
     * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
     */
    function property(key) {
      return function(object) {
        return object[key];
      };
    }

    /**
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number will be
     * returned. If `floating` is truey or either `min` or `max` are floats a
     * floating-point number will be returned instead of an integer.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {number} [min=0] The minimum possible value.
     * @param {number} [max=1] The maximum possible value.
     * @param {boolean} [floating=false] Specify returning a floating-point number.
     * @returns {number} Returns a random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(min, max, floating) {
      var noMin = min == null,
          noMax = max == null;

      if (floating == null) {
        if (typeof min == 'boolean' && noMax) {
          floating = min;
          min = 1;
        }
        else if (!noMax && typeof max == 'boolean') {
          floating = max;
          noMax = true;
        }
      }
      if (noMin && noMax) {
        max = 1;
      }
      min = +min || 0;
      if (noMax) {
        max = min;
        min = 0;
      } else {
        max = +max || 0;
      }
      if (floating || min % 1 || max % 1) {
        var rand = nativeRandom();
        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand +'').length - 1)))), max);
      }
      return baseRandom(min, max);
    }

    /**
     * Resolves the value of property `key` on `object`. If `key` is a function
     * it will be invoked with the `this` binding of `object` and its result returned,
     * else the property value is returned. If `object` is falsey then `undefined`
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Object} object The object to inspect.
     * @param {string} key The name of the property to resolve.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = {
     *   'cheese': 'crumpets',
     *   'stuff': function() {
     *     return 'nonsense';
     *   }
     * };
     *
     * _.result(object, 'cheese');
     * // => 'crumpets'
     *
     * _.result(object, 'stuff');
     * // => 'nonsense'
     */
    function result(object, key) {
      if (object) {
        var value = object[key];
        return isFunction(value) ? object[key]() : value;
      }
    }

    /**
     * A micro-templating method that handles arbitrary delimiters, preserves
     * whitespace, and correctly escapes quotes within interpolated code.
     *
     * Note: In the development build, `_.template` utilizes sourceURLs for easier
     * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
     *
     * For more information on precompiling templates see:
     * http://lodash.com/custom-builds
     *
     * For more information on Chrome extension sandboxes see:
     * http://developer.chrome.com/stable/extensions/sandboxingEval.html
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} text The template text.
     * @param {Object} data The data object used to populate the text.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as local variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [variable] The data object variable name.
     * @returns {Function|string} Returns a compiled function when no `data` object
     *  is given, else it returns the interpolated text.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= name %>');
     * compiled({ 'name': 'fred' });
     * // => 'hello fred'
     *
     * // using the "escape" delimiter to escape HTML in data property values
     * _.template('<b><%- value %></b>', { 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to generate HTML
     * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
     * _.template(list, { 'people': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
     * _.template('hello ${ name }', { 'name': 'pebbles' });
     * // => 'hello pebbles'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
     * // => 'hello barney!'
     *
     * // using a custom template delimiters
     * _.templateSettings = {
     *   'interpolate': /{{([\s\S]+?)}}/g
     * };
     *
     * _.template('hello {{ name }}!', { 'name': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using the `imports` option to import jQuery
     * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
     * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     *   var __t, __p = '', __e = _.escape;
     *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
     *   return __p;
     * }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(text, data, options) {
      // based on John Resig's `tmpl` implementation
      // http://ejohn.org/blog/javascript-micro-templating/
      // and Laura Doktorova's doT.js
      // https://github.com/olado/doT
      var settings = lodash.templateSettings;
      text = String(text || '');

      // avoid missing dependencies when `iteratorTemplate` is not defined
      options = defaults({}, options, settings);

      var imports = defaults({}, options.imports, settings.imports),
          importsKeys = keys(imports),
          importsValues = values(imports);

      var isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // compile the regexp to match each delimiter
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // escape characters that cannot be included in string literals
        source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // replace delimiters with snippets
        if (escapeValue) {
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // the JS engine embedded in Adobe products requires returning the `match`
        // string in order to produce the correct `offset` value
        return match;
      });

      source += "';\n";

      // if `variable` is not specified, wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain
      var variable = options.variable,
          hasVariable = variable;

      if (!hasVariable) {
        variable = 'obj';
        source = 'with (' + variable + ') {\n' + source + '\n}\n';
      }
      // cleanup code by stripping empty strings
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // frame code as the function body
      source = 'function(' + variable + ') {\n' +
        (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
        "var __t, __p = '', __e = _.escape" +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      // Use a sourceURL for easier debugging.
      // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
      var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';

      try {
        var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
      } catch(e) {
        e.source = source;
        throw e;
      }
      if (data) {
        return result(data);
      }
      // provide the compiled function's source by its `toString` method, in
      // supported environments, or the `source` property as a convenience for
      // inlining compiled templates during the build process
      result.source = source;
      return result;
    }

    /**
     * Executes the callback `n` times, returning an array of the results
     * of each callback execution. The callback is bound to `thisArg` and invoked
     * with one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {number} n The number of times to execute the callback.
     * @param {Function} callback The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns an array of the results of each `callback` execution.
     * @example
     *
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
     * // => [3, 6, 4]
     *
     * _.times(3, function(n) { mage.castSpell(n); });
     * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
     *
     * _.times(3, function(n) { this.cast(n); }, mage);
     * // => also calls `mage.castSpell(n)` three times
     */
    function times(n, callback, thisArg) {
      n = (n = +n) > -1 ? n : 0;
      var index = -1,
          result = Array(n);

      callback = baseCreateCallback(callback, thisArg, 1);
      while (++index < n) {
        result[index] = callback(index);
      }
      return result;
    }

    /**
     * The inverse of `_.escape` this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
     * corresponding characters.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} string The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('Fred, Barney &amp; Pebbles');
     * // => 'Fred, Barney & Pebbles'
     */
    function unescape(string) {
      return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
    }

    /**
     * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return String(prefix == null ? '' : prefix) + id;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object that wraps the given value with explicit
     * method chaining enabled.
     *
     * @static
     * @memberOf _
     * @category Chaining
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36 },
     *   { 'name': 'fred',    'age': 40 },
     *   { 'name': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _.chain(characters)
     *     .sortBy('age')
     *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
     *     .first()
     *     .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      value = new lodashWrapper(value);
      value.__chain__ = true;
      return value;
    }

    /**
     * Invokes `interceptor` with the `value` as the first argument and then
     * returns `value`. The purpose of this method is to "tap into" a method
     * chain in order to perform operations on intermediate results within
     * the chain.
     *
     * @static
     * @memberOf _
     * @category Chaining
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3, 4])
     *  .tap(function(array) { array.pop(); })
     *  .reverse()
     *  .value();
     * // => [3, 2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Chaining
     * @returns {*} Returns the wrapper object.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // without explicit chaining
     * _(characters).first();
     * // => { 'name': 'barney', 'age': 36 }
     *
     * // with explicit chaining
     * _(characters).chain()
     *   .first()
     *   .pick('age')
     *   .value();
     * // => { 'age': 36 }
     */
    function wrapperChain() {
      this.__chain__ = true;
      return this;
    }

    /**
     * Produces the `toString` result of the wrapped value.
     *
     * @name toString
     * @memberOf _
     * @category Chaining
     * @returns {string} Returns the string result.
     * @example
     *
     * _([1, 2, 3]).toString();
     * // => '1,2,3'
     */
    function wrapperToString() {
      return String(this.__wrapped__);
    }

    /**
     * Extracts the wrapped value.
     *
     * @name valueOf
     * @memberOf _
     * @alias value
     * @category Chaining
     * @returns {*} Returns the wrapped value.
     * @example
     *
     * _([1, 2, 3]).valueOf();
     * // => [1, 2, 3]
     */
    function wrapperValueOf() {
      return this.__wrapped__;
    }

    /*--------------------------------------------------------------------------*/

    // add functions that return wrapped values when chaining
    lodash.after = after;
    lodash.assign = assign;
    lodash.at = at;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.chain = chain;
    lodash.compact = compact;
    lodash.compose = compose;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.createCallback = createCallback;
    lodash.curry = curry;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.filter = filter;
    lodash.flatten = flatten;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.functions = functions;
    lodash.groupBy = groupBy;
    lodash.indexBy = indexBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.invert = invert;
    lodash.invoke = invoke;
    lodash.keys = keys;
    lodash.map = map;
    lodash.mapValues = mapValues;
    lodash.max = max;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.min = min;
    lodash.omit = omit;
    lodash.once = once;
    lodash.pairs = pairs;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.pick = pick;
    lodash.pluck = pluck;
    lodash.property = property;
    lodash.pull = pull;
    lodash.range = range;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.shuffle = shuffle;
    lodash.sortBy = sortBy;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.times = times;
    lodash.toArray = toArray;
    lodash.transform = transform;
    lodash.union = union;
    lodash.uniq = uniq;
    lodash.values = values;
    lodash.where = where;
    lodash.without = without;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.zip = zip;
    lodash.zipObject = zipObject;

    // add aliases
    lodash.collect = map;
    lodash.drop = rest;
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.extend = assign;
    lodash.methods = functions;
    lodash.object = zipObject;
    lodash.select = filter;
    lodash.tail = rest;
    lodash.unique = uniq;
    lodash.unzip = zip;

    // add functions to `lodash.prototype`
    mixin(lodash);

    /*--------------------------------------------------------------------------*/

    // add functions that return unwrapped values when chaining
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.contains = contains;
    lodash.escape = escape;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.has = has;
    lodash.identity = identity;
    lodash.indexOf = indexOf;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isNaN = isNaN;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isUndefined = isUndefined;
    lodash.lastIndexOf = lastIndexOf;
    lodash.mixin = mixin;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.result = result;
    lodash.runInContext = runInContext;
    lodash.size = size;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.template = template;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;

    // add aliases
    lodash.all = every;
    lodash.any = some;
    lodash.detect = find;
    lodash.findWhere = find;
    lodash.foldl = reduce;
    lodash.foldr = reduceRight;
    lodash.include = contains;
    lodash.inject = reduce;

    mixin(function() {
      var source = {}
      forOwn(lodash, function(func, methodName) {
        if (!lodash.prototype[methodName]) {
          source[methodName] = func;
        }
      });
      return source;
    }(), false);

    /*--------------------------------------------------------------------------*/

    // add functions capable of returning wrapped and unwrapped values when chaining
    lodash.first = first;
    lodash.last = last;
    lodash.sample = sample;

    // add aliases
    lodash.take = first;
    lodash.head = first;

    forOwn(lodash, function(func, methodName) {
      var callbackable = methodName !== 'sample';
      if (!lodash.prototype[methodName]) {
        lodash.prototype[methodName]= function(n, guard) {
          var chainAll = this.__chain__,
              result = func(this.__wrapped__, n, guard);

          return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))
            ? result
            : new lodashWrapper(result, chainAll);
        };
      }
    });

    /*--------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */
    lodash.VERSION = '2.4.1';

    // add "Chaining" functions to the wrapper
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.toString = wrapperToString;
    lodash.prototype.value = wrapperValueOf;
    lodash.prototype.valueOf = wrapperValueOf;

    // add `Array` functions that return unwrapped values
    forEach(['join', 'pop', 'shift'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        var chainAll = this.__chain__,
            result = func.apply(this.__wrapped__, arguments);

        return chainAll
          ? new lodashWrapper(result, chainAll)
          : result;
      };
    });

    // add `Array` functions that return the existing wrapped value
    forEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        func.apply(this.__wrapped__, arguments);
        return this;
      };
    });

    // add `Array` functions that return new wrapped values
    forEach(['concat', 'slice', 'splice'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
      };
    });

    return lodash;
  }

  /*--------------------------------------------------------------------------*/

  // expose Lo-Dash
  var _ = runInContext();

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash is loaded with a RequireJS shim config.
    // See http://requirejs.org/docs/api.html#config-shim
    root._ = _;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return _;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = _)._ = _;
    }
    // in Narwhal or Rhino -require
    else {
      freeExports._ = _;
    }
  }
  else {
    // in a browser or Rhino
    root._ = _;
  }
}.call(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[22])