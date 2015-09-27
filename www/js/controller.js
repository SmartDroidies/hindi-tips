'use strict';

/* Controllers */

var hindiTipsControllers = angular.module('hindiTipsControllers', []);


hindiTipsControllers.controller('HomeCtrl', ['$scope', '$http', 'StorageService',  'CategoryService',
  function($scope, $http, storageService, categoryService) {
	
	$scope.displayHome = function () {       
		console.log('Display Home Screen');
		//window.plugins.spinnerDialog.show();
		//Sync Local Data
		storageService.syncDate();
    	//window.plugins.spinnerDialog.hide();


    	var promise =  categoryService.collectCategories();
		promise.then (
  			function(data) {
			 	$scope.categories = data.categories;
			 	//console.log("Data Collected " + JSON.stringify(data));
  			},
  			function(error) {
  				//FIXME - Display Error
    			console.log('No Categories Found.');
  			});

	};

	//Show Home
	$scope.displayHome();
  }]
);

//Controller To Load Tips
hindiTipsControllers.controller('ArticlesCtrl', ['$scope', 'ArticleService', '$routeParams', 'CategoryService',
  function($scope, articleService, $routeParams, Category) {
	$scope.displayArticles = function () {
		var categoryId = $routeParams.cat;
		window.plugins.spinnerDialog.show();
		//console.log("Article Category : " + categoryId);
		var ctgry = Category.collectCategory(categoryId);
		if(ctgry) {
			//console.log("Category : " + JSON.stringify(ctgry));
		}
		var articles = articleService.fetchArticlesByCategory(categoryId);
		if (articles === undefined || articles === null) {
			console.log('JSON is empty. Display Error');
		} else {
			$scope.articles = articles;
		}
		$scope.categoryId = categoryId;
		$scope.category = ctgry;
		//UI Changes 
		//$("#main-title").text(ctgry.ctgryname);
		hideMenu();
		//showBannerAd();
		window.plugins.spinnerDialog.hide();
	}
	
	//Loading the Tips
	$scope.displayArticles();
}]);

//Controller to display Tip Details
hindiTipsControllers.controller('ArticleCtrl', ['$scope', '$routeParams', 'ArticleService',  '$interval', 'CategoryService',
	function($scope, $routeParams, articleService, $interval, Category) {

	$scope.displaySelectedArticle = function() {
		var categoryId = $routeParams.cat;
		var idx = $routeParams.index;
		$scope.index = idx;
		$scope.categoryId = categoryId;
		$scope.displayArticleDetail();
	}

	//Method to display tip detail
	$scope.displayArticleDetail = function () {         
		//console.log("Tip Category : " + $scope.categoryId);
		var categoryId = $scope.categoryId;
		//console.log("Tip Category : " + categoryId);
		var ctgry = Category.collectCategory(categoryId);
		if(ctgry) {
			//console.log("Category : " + ctgry.code);
		}

		var article = articleService.collectArticle($scope.categoryId, $scope.index);
		if (article === undefined || article === null) {
			console.log('JSON is empty. Display Error');
		} else {
			//console.log("Article : " + JSON.stringify(article));
			//article.contentHtml = $sce.trustAsHtml(tip.content);
			$scope.article = article;
			$interval(showInterstitial, 5000);
		}
		$scope.category = ctgry;
		$scope.size = article.size;
	}

	//Older Article  
	$scope.older = function () {
		$scope.index = ($scope.index < $scope.size) ? ++$scope.index : $scope.size;
		$scope.displayArticleDetail();
	};
	//Newer Article  
	$scope.newer = function () {
		$scope.index = ($scope.index > 0) ? --$scope.index : 0;
		$scope.displayArticleDetail();
	};

	/*
	$scope.share = function ($event, tip) {         
		//console.log('Gesture ' + $event.type + ' - tip ' + JSON.stringify(tip));
		window.plugins.socialsharing.share('\n Download Tamil Kuripugal App https://play.google.com/store/apps/details?id=com.smart.droid.tamil.tips', tip.title + ' Read More - ' + tip.link)
	};
	*/

	//Loading the Article
	$scope.displaySelectedArticle();

}]);	


//Controller to take directly to tip
hindiTipsControllers.controller('ArticleDirectCtrl', ['$scope', '$routeParams', '$http', '$location',  '$interval',
	function($scope, $routeParams, $http, $location, $interval) {
		$scope.loadTip = function () {       
			$http.get('http://hindi.tips2stayhealthy.com/?json=y&id=' + $routeParams.id).
				success(function(data) {
	    	    	if (!angular.isUndefined(data.articles) && data.articles.length > 0) {
	            		$scope.article = data.articles[0];
	            		$interval(showInterstitial, 3000);
	            	} else {
	            		$location.path('/home');  
	            	}
	    	})
	}	

	//Collecting the details of the tip
	$scope.loadTip();
	
}]);
