/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./env.ts":
/*!****************!*\
  !*** ./env.ts ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   API_KEY: () => (/* binding */ API_KEY),\n/* harmony export */   BASE_URL: () => (/* binding */ BASE_URL)\n/* harmony export */ });\nvar API_KEY = \"0dc79e9f8d8261756060e27eae2708db\";\nvar BASE_URL = \"https://api.themoviedb.org/3/search/movie?api_key=\";\n\n\n//# sourceURL=webpack://tmdb/./env.ts?");

/***/ }),

/***/ "./src/get-movie.service.ts":
/*!**********************************!*\
  !*** ./src/get-movie.service.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GetMovieService: () => (/* binding */ GetMovieService)\n/* harmony export */ });\n/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env */ \"./env.ts\");\n\nvar GetMovieService = /** @class */ (function () {\n    function GetMovieService() {\n        this.mainUrl = _env__WEBPACK_IMPORTED_MODULE_0__.BASE_URL + _env__WEBPACK_IMPORTED_MODULE_0__.API_KEY + \"&query=\";\n        this.url = '';\n    }\n    GetMovieService.prototype.getMovieDetails = function (searchInput) {\n        this.url = this.mainUrl + searchInput;\n        return fetch(this.mainUrl + searchInput)\n            .then(function (response) { return response.json(); })\n            .then(function (data) { return data; })\n            .catch(function (error) {\n            console.error(\"Error: \".concat(error.message));\n            throw error;\n        });\n    };\n    GetMovieService.prototype.getPaginatedData = function (pageNumber) {\n        return fetch(this.url + \"&page=\" + pageNumber)\n            .then(function (response) { return response.json(); })\n            .then(function (data) { return data; })\n            .catch(function (error) {\n            console.error(\"Error: \".concat(error.message));\n            throw error;\n        });\n    };\n    return GetMovieService;\n}());\n\n\n\n//# sourceURL=webpack://tmdb/./src/get-movie.service.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   debounce: () => (/* binding */ debounce)\n/* harmony export */ });\n/* harmony import */ var _get_movie_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-movie.service */ \"./src/get-movie.service.ts\");\n/* harmony import */ var _search_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.component */ \"./src/search.component.ts\");\n\n\nfunction debounce(func, delay) {\n    var timeoutId;\n    return function () {\n        var args = arguments;\n        clearTimeout(timeoutId);\n        timeoutId = setTimeout(function () { return func.apply(null, args); }, delay);\n    };\n}\nvar movieService = new _get_movie_service__WEBPACK_IMPORTED_MODULE_0__.GetMovieService();\nvar searchComponent = new _search_component__WEBPACK_IMPORTED_MODULE_1__.SearchComponent(movieService);\nsearchComponent.init();\n\n\n//# sourceURL=webpack://tmdb/./src/index.ts?");

/***/ }),

/***/ "./src/search.component.ts":
/*!*********************************!*\
  !*** ./src/search.component.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SearchComponent: () => (/* binding */ SearchComponent)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.ts\");\n\nvar SearchComponent = /** @class */ (function () {\n    function SearchComponent(movieService) {\n        this.movieService = movieService;\n        this.userInput = document.getElementById('movieInput');\n        this.resultsDiv = document.getElementById('results');\n        this.pageDetails = { page: 1, results: [], total_pages: 0, total_results: 0 };\n        this.pageSize = this.pageDetails.results.length;\n        this.currentPage = 1;\n        this.totalPages = this.pageDetails.total_pages;\n        this.pageData = [];\n    }\n    SearchComponent.prototype.init = function () {\n        var _this = this;\n        var _a, _b;\n        this.userInput.addEventListener('input', (0,_index__WEBPACK_IMPORTED_MODULE_0__.debounce)(function () {\n            var input = _this.userInput.value;\n            _this.movieService.getMovieDetails(input)\n                .then(function (response) {\n                _this.pageDetails = response;\n                _this.pageSize = _this.pageDetails.results.length;\n                _this.totalPages = _this.pageDetails.total_pages;\n                _this.pageData = _this.pageDetails.results;\n                _this.renderResults();\n            })\n                .catch(function (error) {\n                console.error(\"Error: \".concat(error.message));\n            });\n        }, 750));\n        (_a = document.getElementById('nextBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.onNextPage(); });\n        (_b = document.getElementById('prevBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.onPreviousPage(); });\n    };\n    SearchComponent.prototype.onNextPage = function () {\n        if (this.currentPage < this.totalPages) {\n            this.currentPage += 1;\n            this.getPaginatedData();\n        }\n    };\n    SearchComponent.prototype.onPreviousPage = function () {\n        if (this.currentPage > 1 && this.currentPage <= this.totalPages) {\n            this.currentPage -= 1;\n            this.getPaginatedData();\n        }\n    };\n    SearchComponent.prototype.getPaginatedData = function () {\n        var _this = this;\n        this.movieService.getPaginatedData(this.currentPage)\n            .then(function (response) {\n            _this.pageDetails = response;\n            _this.pageSize = _this.pageDetails.results.length;\n            _this.totalPages = _this.pageDetails.total_pages;\n            _this.pageData = _this.pageDetails.results;\n            _this.renderResults();\n        })\n            .catch(function (error) {\n            console.error(\"Error: \".concat(error.message));\n        });\n    };\n    SearchComponent.prototype.renderResults = function () {\n        var _this = this;\n        this.resultsDiv.innerHTML = '';\n        var pageNumberElement = document.getElementById('pageNumber');\n        if (pageNumberElement) {\n            pageNumberElement.textContent = \"Page \".concat(this.currentPage, \" / \").concat(this.totalPages);\n        }\n        this.pageData.forEach(function (movie) {\n            var movieElement = document.createElement('div');\n            movieElement.classList.add('movie');\n            movieElement.innerHTML = \"\\n            <h3>\".concat(movie.title, \"</h3>\\n            <p>\").concat(movie.overview, \"</p>\\n            <p>Release Date: \").concat(movie.release_date, \"</p>\\n            <p>Vote Average: \").concat(movie.vote_average, \"</p>\\n            <img src=\\\"https://image.tmdb.org/t/p/w500\").concat(movie.poster_path, \"\\\" alt=\\\"\").concat(movie.title, \"\\\">\\n          \");\n            _this.resultsDiv.appendChild(movieElement);\n        });\n    };\n    return SearchComponent;\n}());\n\n\n\n//# sourceURL=webpack://tmdb/./src/search.component.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;