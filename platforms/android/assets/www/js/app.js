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

hindiTipsApp.config(function ($translateProvider) {
        $translateProvider.translations('en', {
          TITLE: 'Tamil Payanam',
          HOME: 'Home'
        });
        $translateProvider.translations('hi', {
          TITLE: 'TITLE _ HINDI',
          HOME: 'HOME - HINDI',
          COOKING: '\u0916\u093e\u0928\u093e \u092a\u0915\u093e\u0928\u0947',
          REMEDY: '\u0918\u0930\u0947\u0932\u0942 \u0909\u092a\u091a\u093e\u0930',
          FITNESS: '\u092b\u093f\u091f\u0928\u0947\u0938',
          BEAUTY: '\u0938\u094c\u0902\u0926\u0930\u094d\u092f',
		  HEALTH: '\u0938\u094d\u0935\u093e\u0938\u094d\u0925\u094d\u092f',
		  HOUSE: '\u0939\u093e\u0909\u0938 \u0915\u0940\u092a\u093f\u0902\u0917'
        });
        $translateProvider.preferredLanguage('hi');
      });


/* Cooking -  - 4 | home-remedy -  3 | fitness -  6 | beauty -  2 | health -  1 | house-keeping -  */