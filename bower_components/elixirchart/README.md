# elixirchart

Elixirchart is modified from [angular-nvd3's](https://github.com/Elixirdoc/angular-nvd3) gh-pages and designed to making the charts with json data easily.

## Usage

get js from `./dist/elixirchart.js`
get css from `./lib/css/elixirchart.css`
get views from `./pages`

```javascript
angular.module('myApp', ['elixirchart'])
        .controller('myCtrl', function($scope){
          $scope.data = { /* JSON data or API */};
          $scope.params = {
            mode: 'basic', 
            autorefresh: true,
            visible: true,
            disabled: false
          };
        });
```
and in html again you can use it like:

```html
<link rel="stylesheet" href="bower_components/bootswatch/bootstrap.css" media="screen">
<link rel="stylesheet" href="bower_components/json-tree/json-tree.css">
<link rel="stylesheet" href="bower_components/nvd3/nv.d3.css">
<link rel="stylesheet" href="lib/css/elixirchart.css">

<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="vendors/highlight.pack.js"></script>
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-route/angular-route.min.js"></script>
<script src="bower_components/d3/d3.min.js"></script>
<script src="bower_components/angular-nvd3/dist/angular-nvd3.js"></script>
<script src="vendors/json-tree.js"></script>
<script src="bower_components/nvd3/nv.d3.min.js"></script>
<script src="./dist/elixirchart.js"></script>

<body ng-app='myApp'>
  <div ng-controller='myCtrl'>
    <elixir-chart data="data" params="params"></elixir-chart>
  </div>
</body>
```


## Example

Here is a sample json 

```
[
    {
        "name":"Darron Weissnat IV",
        "BMI":20.72,
        "age":39,
        "birthday":"2005-01-03T00:00:00.000Z",
        "city":"East Russel",
        "married":false,
        "index":0
    }
,
    {
        "name":"Pablo Ondricka",
        "BMI":19.32,
        "age":38,
        "birthday":"1974-05-13T00:00:00.000Z",
        "city":"Lake Edytheville",
        "married":false,
        "index":1
    }
,
    {
        "name":"Mr. Stella Kiehn Jr.",
        "BMI":16.8,
        "age":34,
        "birthday":"2003-07-25T00:00:00.000Z",
        "city":"Lake Veronicaburgh",
        "married":false,
        "index":2
    }
,
    ...
    ...
    ...
]
```
will convert into charts like

[DEMO](http://elixirdoc.github.io/elixirchart/)

## Deploy

 ```git subtree push --prefix sample origin gh-pages```

## License

MIT

