/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__offline_offline_js__ = __webpack_require__(34);


var expectedCaches = ['static-v1'];
var version = 1;
var files = ['app.js'];

self.addEventListener('install', function (event) {
    //console.log('V1 installing…');

    event.waitUntil(caches.open('static-v1').then(function (cache) {
        cache.addAll(files);
    }));
});

self.addEventListener('activate', function (event) {
    // delete any caches that aren't in expectedCaches
    // which will get rid of static-v1
    event.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            if (!expectedCaches.includes(key)) {
                return caches.delete(key);
            }
        }));
    }).then(function () {
        //console.log('V1 now ready to handle fetches!');
    }));
});

self.addEventListener('fetch', function (event) {
    if (__WEBPACK_IMPORTED_MODULE_0__offline_offline_js__["a" /* default */].canHandle("/api", event.request)) {
        event.respondWith(__WEBPACK_IMPORTED_MODULE_0__offline_offline_js__["a" /* default */].handle(event.request).then(function (response) {
            return response;
        }));
        return;
    }

    var url = new URL(event.request.url);
    if (event.request.method !== "GET" || url.pathname.includes('/api')) {
        // Ignore some requests
        return;
    }

    event.respondWith(caches.match(event.request).then(function (cached) {
        var networked = fetch(event.request).then(fetchedFromNetwork, unableToResolve).catch(unableToResolve);

        //console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
        return cached || networked;

        function fetchedFromNetwork(response) {
            var cacheCopy = response.clone();

            //console.log('WORKER: fetch response from network.', event.request.url);

            caches.open(version + 'pages').then(function add(cache) {
                cache.put(event.request, cacheCopy);
            }).then(function () {
                //console.log('WORKER: fetch response stored in cache.', event.request.url);
            });

            // Return the response so that the promise is settled in fulfillment.
            return response;
        }

        function unableToResolve() {
            //console.log('WORKER: fetch request failed in both cache and network.');

            return new Response('<h1>Your device doesn\'t support the offline capability.</h1>', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                    'Content-Type': 'text/html'
                })
            });
        }
    }));
});

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__local_api_js__ = __webpack_require__(52);


/* harmony default export */ __webpack_exports__["a"] = ({
	canHandle: function canHandle(basePath, request) {
		var url = new URL(request.url);
		return url.pathname.includes(basePath);
	},
	handle: function handle(request) {
		return new Promise(function (resolve, reject) {
			if (navigator.onLine) {
				fetch(request).then(function (response) {
					var clone = response.clone();
					__WEBPACK_IMPORTED_MODULE_0__local_api_js__["a" /* default */].refresh(request, clone);
					resolve(response);
				}, function (error) {
					return reject(error);
				});
			} else {
				__WEBPACK_IMPORTED_MODULE_0__local_api_js__["a" /* default */].act(request).then(function (response) {
					return resolve(response);
				}, function (error) {
					return reject(error);
				});
			}
		});
	}
});

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
module.exports = __webpack_require__(12);


/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var routes = [];

var add = function add(method, endpoint, act, refresh) {
	routes.push({
		method: method,
		endpoint: endpoint,
		act: act,
		refresh: refresh
	});
};

var route = function route(request) {
	var route = routes.find(function (route) {
		var endpoint = route.endpoint.replace(/\//g, "\\/").replace(/{\w+}/g, "\\w+");
		var matches = request.url.match(new RegExp(".*" + endpoint + ".?", "ig"));
		var urlMatched = "";
		if (matches) urlMatched = matches[0];
		return route.method == request.method && urlMatched == request.url;
	});

	if (route) {
		var params = route.endpoint.match(/{\w+}/g);
		if (params) params = params.map(function (param) {
			return param.replace("{", "").replace("}", "");
		});
		var endpoint = route.endpoint.replace(/\//g, "\\/").replace(/{\w+}/g, "(\\w+)");
		var regex = new RegExp(".*" + endpoint + ".?", "i");
		var values = regex.exec(request.url);

		route.values = {};
		for (var i in params) {
			var param = params[i];
			route.values[param] = values[parseInt(i) + 1];
		}
	}

	return route;
};

var refresh = function refresh(request, response) {
	return new Promise(function (resolve, reject) {
		var r = route(request);

		if (r) {
			resolve(r.refresh(request, r.values, response));
		}

		reject(new Error("Can't handle the request"));
	});
};

var act = function act(request) {
	return new Promise(function (resolve, reject) {
		var r = route(request);

		if (r) {
			resolve(r.act(request, r.values));
		}

		reject(new Error("Can't handle the request"));
	});
};

/* harmony default export */ __webpack_exports__["a"] = ({
	add: add,
	refresh: refresh,
	act: act
});

/*
############ EXAMPLE #################

add("GET", "users", () => {
  console.log("GG");
  return new Response();
}, () => {
  
});

add("PUT", "users/{id}", () => {
  
}, () => {
  
});

add("GET", "users/{user}/books/{book}", () => {
  
}, () => {
  
});

add("GET", "users/{id}", () => {
  
}, () => {
  
});

add("GET", "users/{id}/books", () => {
  
}, () => {
  
});

let request = {
  method: "GET",
  url: "http://localhost/api/users/"
}
act(request).then(response => {
  console.log(response);
  console.log("FINISHED");
});



// CODE TO BE USED

request.text().then(body => {
	const options = {method: request.method};
	if (body) {
		options.body = body;
	}
	const ShadowRequest = new Request(request.url, options);
});

function respond(data) {
	return new Response(JSON.stringify(data), { headers: {'content-type': 'application/json'} });
}


*/

/***/ })

/******/ });