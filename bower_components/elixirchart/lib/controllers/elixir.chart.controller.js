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

