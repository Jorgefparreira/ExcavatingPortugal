var app = angular.module('excavating_portugal', [
    'ngRoute',
    'digControllers',
    'ngTouch',
    'ngAnimate'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/main.html',
    controller: 'MainController'
  }).
  when('/excavation/:itemId', {
    templateUrl: 'partials/dig.html',
    controller: 'MyDigController'
  }).
  otherwise({
    templateUrl: 'partials/main.html',
    controller: 'MainController'
  });
}]);