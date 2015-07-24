'use strict';

/* Controllers */

var hindiTipsControllers = angular.module('hindiTipsControllers', []);


hindiTipsControllers.controller('HomeCtrl', ['$scope', '$http', 'StorageService', 
  function($scope, $http, storageService) {
	
	$scope.displayHome = function () {       
		console.log('Display Home Screen');
		//window.plugins.spinnerDialog.show();
		//Sync Local Data
		storageService.syncDate();
    	//window.plugins.spinnerDialog.hide();
	};

	//Show Home
	$scope.displayHome();
  }]
);

//Controller To Load Tips
hindiTipsControllers.controller('ArticlesCtrl', ['$scope', 'ArticleService', '$routeParams',
  function($scope, articleService, $routeParams) {
	$scope.displayArticles = function () {
		var categoryId = $routeParams.cat;
		window.plugins.spinnerDialog.show();
		//console.log("Article Category : " + categoryId);
		/*
		var ctgry = Category.collectCategorty(categoryId);
		if(ctgry) {
			console.log("Category : " + ctgry.ctgryname);
		}
		*/
		var articles = articleService.fetchArticlesByCategory(categoryId);
		if (articles === undefined || articles === null) {
			console.log('JSON is empty. Display Error');
			//FIXME - Display Message
		} else {
			$scope.articles = articles;
		}
		$scope.categoryId = categoryId;
		//UI Changes 
		//$("#main-title").text(ctgry.ctgryname);
		//hidePopup();
		//showBannerAd();
		window.plugins.spinnerDialog.hide();
	}
	
	//Loading the Tips
	$scope.displayArticles();
}]);
