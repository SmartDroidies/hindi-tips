'use strict';
/* App Module */

/* var tamilPaarvaiApp = angular.module('tamilPaarvaiApp', ['ngRoute', 'ngSanitize', 'pascalprecht.translate', 'tamilPaarvaiControllers', 'parvaiServices', 'parvaiFilters', 'underscore', 'cacheService']); */
var hindiTipsApp = angular.module('hindiTipsApp', ['ngRoute', 'ngSanitize', 'pascalprecht.translate', 'underscore']); 

hindiTipsApp.config(['$routeProvider', 
	function ($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl : 'partials/home.html',
			/* controller : 'HomeCtrl' */
		}).when('/articles/:cat', {
	        templateUrl : 'partials/articles.html',
	        controller : 'ArticlesCtrl'
	    }).when('/article/:cat/:id/:index', {
	        templateUrl : 'partials/article.html',
	        controller : 'ArticleCtrl'
	    }).otherwise({
			redirectTo : '/home'
		});
	}
]);
