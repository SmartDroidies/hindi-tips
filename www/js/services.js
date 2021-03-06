/* Services */
var hindiTipsServices = angular.module('hindiTipsServices', ['ngResource']);

//Factory for loading the feed from Local Storage
hindiTipsServices.factory ('StorageService', function () {
	var storageFactory = {}; 
	var keyArticles =  "articles";
	var keySyncTime =  "sync_time";
	var keySyncVersion =  "sync_version";

	//Collect all tips 
	storageFactory.syncDate = function() {
		var self = this;
		var fileURL =  "files/articles.json";
		//var syncTime =  window.localStorage.getItem(keySyncTime);
		var version = window.localStorage.getItem(keySyncVersion);
		
		//FIXME - Check if the data check has been done already
		jQuery.getJSON(fileURL, function (data) {
			//console.log("Loading Articles from FileSystem");
		}).done(function(data) {
			if(!version || data.version > version) {
				console.log("Updating Local Storage");
				window.localStorage.setItem(keySyncTime, data.time);
				window.localStorage.setItem(keySyncVersion, data.version);
				window.localStorage.setItem(keyArticles, JSON.stringify(data.articles));
			}	
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.log("Show Error Message - " + textStatus);
		}).always(function() {
			
		});

		//FIXME - Do it once for each session
		var uri = encodeURI("http://hindi.tips2stayhealthy.com/?json=y");
		var lastSyncTime = window.localStorage.getItem(keySyncTime);
		if(lastSyncTime) {
			uri = encodeURI("http://hindi.tips2stayhealthy.com/?json=y&ts=" + lastSyncTime);
		} 
		//console.log("Download URL : " + uri);
		jQuery.getJSON(uri, function (data) {
			//console.log("Loading Latest Articles from Server");
		}).done(function(data) {
			//console.log("Fresh Data " + JSON.stringify(data));
			self.syncLocalStorage(data);
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.log("Show Error Message - " + textStatus);
		}).always(function() {
			
		});
	}

	//Sync Temp JSON
	storageFactory.syncLocalStorage = function(remoteJSON) {	
		var localArticles =  window.localStorage.getItem(keyArticles);
		var localJSON = JSON.parse(localArticles);
		//console.log("Modified Array Size : " + _.size(remoteJSON));		
		//console.log("Local Array Size : " + _.size(localJSON));		
		if(_.size(remoteJSON) >  0) {
			$.each(remoteJSON.articles, function(key, item) {
				var newArticle = true;
				_.find(localJSON,function(rw, rwIdx) { 
					if(rw.id == item.id) { 
						//console.log ("Replace Existing Object for : " + key); 
						localJSON[rwIdx] = item;
						newArticle = false; 
						return true;
					}; 
				});
				//If new tip
				if(newArticle) {
					//console.log("New Object for : " + key + " - " + JSON.stringify(item));
					item.new = true;
					localJSON.push(item);
					//newJSON.push(item);
				} 
			});
			window.localStorage.setItem(keyArticles, JSON.stringify(localJSON));
			var modifiedTime = remoteJSON.time;
			if(typeof modifiedTime != 'undefined') {
				window.localStorage.setItem(keySyncTime, remoteJSON.time);
			}
		}	
	}


	//Collect all articles 
	storageFactory.collectArticles = function() {
		//console.log('Collecting Articles from Local Storage');
		var data =  window.localStorage.getItem(keyArticles);
		return JSON.parse(data);
	}
	
	return storageFactory;
});


/* Cache Services */
var cacheServices = angular.module('cacheService', []);
cacheServices.factory('cacheService', ['$cacheFactory', function ($cacheFactory) {
			return $cacheFactory('articles-cache');
		}
	]);



//Factory for managing articles
hindiTipsServices.factory ('ArticleService', function (StorageService, _, cacheService) {
	var factory = {}; 

	//Fetch Articles By Category
	factory.fetchArticlesByCategory = function(category) {
		var key = 'CTGRY' + category;
		//console.log("CTGRY : " + key);
		var articlesByCtgry = cacheService.get(key);
		if(!articlesByCtgry) {
			var articlesAll = StorageService.collectArticles();
			//articlesByCtgry = articlesAll;
			if(articlesAll) {
				var filtered = [];
				if(category) {
					articlesByCtgry = _.filter(articlesAll, function(item) {  
						var bCtgryMatch = false;
						for (var j = 0, length = item.category.length; j < length; j++) {
							if(item.category[j] == category) {
								bCtgryMatch = true;
							}
						}
						return bCtgryMatch; 
					});
				}	
				articlesByCtgry = _.sortBy(articlesByCtgry, "post_date").reverse();
				//console.log("Filtered Article Length : " + tipsByCtgry.length);
				cacheService.put(key, articlesByCtgry);
			}
		}
		return articlesByCtgry;
	}

	// Collect indexed Article for a category
	factory.collectArticle = function(category, index) {
		var self = this;
		var article;
		var articles = self.fetchArticlesByCategory(category);
		article = articles[index];
		article.position = parseInt(index) + 1;
		article.size = articles.length;
		return article;
    }

	
    return factory;
}); 



//Factory for managing category
hindiTipsServices.factory ('CategoryService', function (_, cacheService, $http, $q) {
	var factory = {}; 

	//Load Categories into Cache
	factory.loadCategories = function() {
		//console.log('Load Categories From Filesystem');
		return $http.get('files/category.json');
	}

	//Collect Categories from cache
	factory.collectCategories = function() {
		var deferred = $q.defer();
		var key = 'ht-categories';
		var categories = cacheService.get(key);
		if(!categories) {
			var promise = this.loadCategories();
       		promise.then(
          		function(payload) { 
              		categories = payload.data;
					if(categories) {
						cacheService.put(key, categories);
					}
              		deferred.resolve({categories: categories});
					//console.log('Categories ' + JSON.stringify(categories));
          		},
          		function(errorPayload) {
          			console.log('Failure loading movie ' + errorPayload);
          			deferred.reject(errorPayload);
          		});
		} else {
			deferred.resolve({categories: categories});
		}
		return deferred.promise;
	} 

	//Collect Category for an ID
	factory.collectCategory = function(catID) {
		var key = 'ht-categories';
		var categories = cacheService.get(key);
		var category = {};
		if(categories) {
			category = _.find(categories, function(ctgry) { 
				return ctgry.id == catID; 
			});
		} 
		return category;
	} 

    return factory;
}); 