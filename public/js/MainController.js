var digControllers = angular.module('digControllers', []);

digControllers.controller('MainController', function($scope, $http) {
  $http.get("js/data.json").then(function (response) {
    $scope.digs = response.data.data;
  });
  $scope.load = function() {
		$(document).ready(function(){

		});
   };


  $scope.map1 = function() {
    $('.map').css('display', 'none');
  }   
  $scope.load();        
});

digControllers.controller('MyDigController', function($scope, $http, $routeParams) {
  $http.get("js/data.json").then(function (response) {
    $scope.digs = response.data.data;
    $scope.whichItem = $routeParams.itemId;
    $scope.position = $scope.digs[$routeParams.itemId].mapPosition;

	  // google maps

	  var mapOptions = {
	    zoom: 13,
	    center: new google.maps.LatLng($scope.position.lat, $scope.position.long),
	  }

	  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	  
	  $scope.markers = [];
	  
	  var createMarker = function (info){
	      
	    var marker = new google.maps.Marker({
	      map: $scope.map,
	      position: new google.maps.LatLng(info.lat, info.long),
	      title: $scope.digs[$routeParams.itemId].name
	    });    
	   }
	  createMarker($scope.position);
  $scope.load = function() {
    $(document).ready(function(){
      $(function () {
        $('.my-tooltip').tooltip();
      });
    });
   };
   
  $scope.load();     
  });
});
