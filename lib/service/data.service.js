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
