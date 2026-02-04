"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/credentials/route";
exports.ids = ["app/api/auth/credentials/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fcredentials%2Froute&page=%2Fapi%2Fauth%2Fcredentials%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fcredentials%2Froute.ts&appDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fcredentials%2Froute&page=%2Fapi%2Fauth%2Fcredentials%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fcredentials%2Froute.ts&appDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ADDMANIA006_Documents_codes_promora_promora_test_1_server_app_api_auth_credentials_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/credentials/route.ts */ \"(rsc)/./app/api/auth/credentials/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/credentials/route\",\n        pathname: \"/api/auth/credentials\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/credentials/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ADDMANIA006\\\\Documents\\\\codes\\\\promora\\\\promora test 1\\\\server\\\\app\\\\api\\\\auth\\\\credentials\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ADDMANIA006_Documents_codes_promora_promora_test_1_server_app_api_auth_credentials_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/credentials/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGY3JlZGVudGlhbHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZjcmVkZW50aWFscyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZjcmVkZW50aWFscyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBRERNQU5JQTAwNiU1Q0RvY3VtZW50cyU1Q2NvZGVzJTVDcHJvbW9yYSU1Q3Byb21vcmElMjB0ZXN0JTIwMSU1Q3NlcnZlciU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDQURETUFOSUEwMDYlNUNEb2N1bWVudHMlNUNjb2RlcyU1Q3Byb21vcmElNUNwcm9tb3JhJTIwdGVzdCUyMDElNUNzZXJ2ZXImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ2dFO0FBQzdJO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvbW9yYS1zZXJ2ZXIvP2U2MWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQURETUFOSUEwMDZcXFxcRG9jdW1lbnRzXFxcXGNvZGVzXFxcXHByb21vcmFcXFxccHJvbW9yYSB0ZXN0IDFcXFxcc2VydmVyXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxjcmVkZW50aWFsc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9jcmVkZW50aWFscy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvY3JlZGVudGlhbHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvY3JlZGVudGlhbHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxBRERNQU5JQTAwNlxcXFxEb2N1bWVudHNcXFxcY29kZXNcXFxccHJvbW9yYVxcXFxwcm9tb3JhIHRlc3QgMVxcXFxzZXJ2ZXJcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXGNyZWRlbnRpYWxzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL2NyZWRlbnRpYWxzL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fcredentials%2Froute&page=%2Fapi%2Fauth%2Fcredentials%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fcredentials%2Froute.ts&appDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/credentials/route.ts":
/*!*******************************************!*\
  !*** ./app/api/auth/credentials/route.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\n\nasync function POST(req) {\n    let email = null;\n    try {\n        const body = await req.json();\n        email = typeof body.email === \"string\" ? body.email : \"\";\n        const password = typeof body.password === \"string\" ? body.password : \"\";\n        if (!email || !password) {\n            return (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.errorResponse)(\"Missing credentials\", 400, \"MISSING_CREDENTIALS\");\n        }\n        const user = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n            where: {\n                email\n            },\n            select: {\n                id: true,\n                passwordHash: true\n            }\n        });\n        if (!user?.passwordHash) {\n            return (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.errorResponse)(\"User not found\", 404, \"USER_NOT_FOUND\");\n        }\n        const ok = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_0__.compare)(password, user.passwordHash);\n        if (!ok) {\n            return (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.errorResponse)(\"Invalid password\", 401, \"INVALID_PASSWORD\");\n        }\n        return (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.jsonResponse)({\n            ok: true\n        });\n    } catch (error) {\n        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.authErrorLog.create({\n            data: {\n                email,\n                message: error instanceof Error ? error.message : \"UNEXPECTED_ERROR\",\n                stack: error instanceof Error ? error.stack ?? null : null,\n                context: {\n                    source: \"credentials-validate\"\n                }\n            }\n        });\n        return (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.errorResponse)(\"Unexpected error\", 500, \"UNEXPECTED_ERROR\");\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvY3JlZGVudGlhbHMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBbUM7QUFDRDtBQUN1QjtBQUVsRCxlQUFlSSxLQUFLQyxHQUFZO0lBQ3JDLElBQUlDLFFBQXVCO0lBQzNCLElBQUk7UUFDRixNQUFNQyxPQUFPLE1BQU1GLElBQUlHLElBQUk7UUFDM0JGLFFBQVEsT0FBT0MsS0FBS0QsS0FBSyxLQUFLLFdBQVdDLEtBQUtELEtBQUssR0FBRztRQUN0RCxNQUFNRyxXQUFXLE9BQU9GLEtBQUtFLFFBQVEsS0FBSyxXQUFXRixLQUFLRSxRQUFRLEdBQUc7UUFFckUsSUFBSSxDQUFDSCxTQUFTLENBQUNHLFVBQVU7WUFDdkIsT0FBT1Asd0RBQWFBLENBQUMsdUJBQXVCLEtBQUs7UUFDbkQ7UUFFQSxNQUFNUSxPQUFPLE1BQU1ULDJDQUFNQSxDQUFDUyxJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFBRU47WUFBTTtZQUNmTyxRQUFRO2dCQUFFQyxJQUFJO2dCQUFNQyxjQUFjO1lBQUs7UUFDekM7UUFFQSxJQUFJLENBQUNMLE1BQU1LLGNBQWM7WUFDdkIsT0FBT2Isd0RBQWFBLENBQUMsa0JBQWtCLEtBQUs7UUFDOUM7UUFFQSxNQUFNYyxLQUFLLE1BQU1oQixpREFBT0EsQ0FBQ1MsVUFBVUMsS0FBS0ssWUFBWTtRQUNwRCxJQUFJLENBQUNDLElBQUk7WUFDUCxPQUFPZCx3REFBYUEsQ0FBQyxvQkFBb0IsS0FBSztRQUNoRDtRQUVBLE9BQU9DLHVEQUFZQSxDQUFDO1lBQUVhLElBQUk7UUFBSztJQUNqQyxFQUFFLE9BQU9DLE9BQU87UUFDZCxNQUFNaEIsMkNBQU1BLENBQUNpQixZQUFZLENBQUNDLE1BQU0sQ0FBQztZQUMvQkMsTUFBTTtnQkFDSmQ7Z0JBQ0FlLFNBQVNKLGlCQUFpQkssUUFBUUwsTUFBTUksT0FBTyxHQUFHO2dCQUNsREUsT0FBT04saUJBQWlCSyxRQUFRTCxNQUFNTSxLQUFLLElBQUksT0FBTztnQkFDdERDLFNBQVM7b0JBQUVDLFFBQVE7Z0JBQXVCO1lBQzVDO1FBQ0Y7UUFDQSxPQUFPdkIsd0RBQWFBLENBQUMsb0JBQW9CLEtBQUs7SUFDaEQ7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb21vcmEtc2VydmVyLy4vYXBwL2FwaS9hdXRoL2NyZWRlbnRpYWxzL3JvdXRlLnRzPzIzMDQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ2JjcnlwdGpzJztcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvZGInO1xyXG5pbXBvcnQgeyBlcnJvclJlc3BvbnNlLCBqc29uUmVzcG9uc2UgfSBmcm9tICdAL2xpYi9hdXRoJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xyXG4gIGxldCBlbWFpbDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xyXG4gICAgZW1haWwgPSB0eXBlb2YgYm9keS5lbWFpbCA9PT0gJ3N0cmluZycgPyBib2R5LmVtYWlsIDogJyc7XHJcbiAgICBjb25zdCBwYXNzd29yZCA9IHR5cGVvZiBib2R5LnBhc3N3b3JkID09PSAnc3RyaW5nJyA/IGJvZHkucGFzc3dvcmQgOiAnJztcclxuXHJcbiAgICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCkge1xyXG4gICAgICByZXR1cm4gZXJyb3JSZXNwb25zZSgnTWlzc2luZyBjcmVkZW50aWFscycsIDQwMCwgJ01JU1NJTkdfQ1JFREVOVElBTFMnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGVtYWlsIH0sXHJcbiAgICAgIHNlbGVjdDogeyBpZDogdHJ1ZSwgcGFzc3dvcmRIYXNoOiB0cnVlIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXVzZXI/LnBhc3N3b3JkSGFzaCkge1xyXG4gICAgICByZXR1cm4gZXJyb3JSZXNwb25zZSgnVXNlciBub3QgZm91bmQnLCA0MDQsICdVU0VSX05PVF9GT1VORCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9rID0gYXdhaXQgY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZEhhc2gpO1xyXG4gICAgaWYgKCFvaykge1xyXG4gICAgICByZXR1cm4gZXJyb3JSZXNwb25zZSgnSW52YWxpZCBwYXNzd29yZCcsIDQwMSwgJ0lOVkFMSURfUEFTU1dPUkQnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ganNvblJlc3BvbnNlKHsgb2s6IHRydWUgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGF3YWl0IHByaXNtYS5hdXRoRXJyb3JMb2cuY3JlYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGVtYWlsLFxyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1VORVhQRUNURURfRVJST1InLFxyXG4gICAgICAgIHN0YWNrOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3Iuc3RhY2sgPz8gbnVsbCA6IG51bGwsXHJcbiAgICAgICAgY29udGV4dDogeyBzb3VyY2U6ICdjcmVkZW50aWFscy12YWxpZGF0ZScgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGVycm9yUmVzcG9uc2UoJ1VuZXhwZWN0ZWQgZXJyb3InLCA1MDAsICdVTkVYUEVDVEVEX0VSUk9SJyk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJjb21wYXJlIiwicHJpc21hIiwiZXJyb3JSZXNwb25zZSIsImpzb25SZXNwb25zZSIsIlBPU1QiLCJyZXEiLCJlbWFpbCIsImJvZHkiLCJqc29uIiwicGFzc3dvcmQiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwic2VsZWN0IiwiaWQiLCJwYXNzd29yZEhhc2giLCJvayIsImVycm9yIiwiYXV0aEVycm9yTG9nIiwiY3JlYXRlIiwiZGF0YSIsIm1lc3NhZ2UiLCJFcnJvciIsInN0YWNrIiwiY29udGV4dCIsInNvdXJjZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/credentials/route.ts\n");

/***/ }),

/***/ "(rsc)/./auth.ts":
/*!*****************!*\
  !*** ./auth.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                try {\n                    if (!credentials?.email || !credentials?.password) return null;\n                    const user = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                        where: {\n                            email: credentials.email\n                        },\n                        include: {\n                            profile: true\n                        }\n                    });\n                    if (!user?.passwordHash) {\n                        throw new Error(\"USER_NOT_FOUND\");\n                    }\n                    const ok = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_3__.compare)(credentials.password, user.passwordHash);\n                    if (!ok) {\n                        throw new Error(\"INVALID_PASSWORD\");\n                    }\n                    return {\n                        id: user.id,\n                        email: user.email,\n                        name: user.name ?? undefined,\n                        image: user.image ?? undefined\n                    };\n                } catch (error) {\n                    const message = error instanceof Error ? error.message : \"UNEXPECTED_ERROR\";\n                    if (message === \"USER_NOT_FOUND\" || message === \"INVALID_PASSWORD\") {\n                        throw new Error(message);\n                    }\n                    await _lib_db__WEBPACK_IMPORTED_MODULE_2__.prisma.authErrorLog.create({\n                        data: {\n                            email: credentials?.email ?? null,\n                            message,\n                            stack: error instanceof Error ? error.stack ?? null : null,\n                            context: {\n                                source: \"nextauth-authorize\"\n                            }\n                        }\n                    });\n                    throw new Error(\"UNEXPECTED_ERROR\");\n                }\n            }\n        }),\n        ...process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [\n            (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n                clientId: process.env.GOOGLE_CLIENT_ID,\n                clientSecret: process.env.GOOGLE_CLIENT_SECRET\n            })\n        ] : []\n    ],\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.email = user.email;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YS1zZXJ2ZXIvLi9hdXRoLnRzPzkyMzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJztcclxuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvZ29vZ2xlJztcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvZGInO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAnYmNyeXB0anMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogJ2NyZWRlbnRpYWxzJyxcclxuICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0sXHJcbiAgICAgICAgICAgIGluY2x1ZGU6IHsgcHJvZmlsZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoIXVzZXI/LnBhc3N3b3JkSGFzaCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VTRVJfTk9UX0ZPVU5EJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmRIYXNoKTtcclxuICAgICAgICAgIGlmICghb2spIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJTlZBTElEX1BBU1NXT1JEJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogdXNlci5pZCxcclxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSA/PyB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGltYWdlOiB1c2VyLmltYWdlID8/IHVuZGVmaW5lZCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdVTkVYUEVDVEVEX0VSUk9SJztcclxuICAgICAgICAgIGlmIChtZXNzYWdlID09PSAnVVNFUl9OT1RfRk9VTkQnIHx8IG1lc3NhZ2UgPT09ICdJTlZBTElEX1BBU1NXT1JEJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBhd2FpdCBwcmlzbWEuYXV0aEVycm9yTG9nLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHM/LmVtYWlsID8/IG51bGwsXHJcbiAgICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgICBzdGFjazogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLnN0YWNrID8/IG51bGwgOiBudWxsLFxyXG4gICAgICAgICAgICAgIGNvbnRleHQ6IHsgc291cmNlOiAnbmV4dGF1dGgtYXV0aG9yaXplJyB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VORVhQRUNURURfRVJST1InKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIC4uLihwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEICYmIHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUXHJcbiAgICAgID8gW1xyXG4gICAgICAgICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICAgICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCxcclxuICAgICAgICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCxcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIF1cclxuICAgICAgOiBbXSksXHJcbiAgXSxcclxuICBzZXNzaW9uOiB7IHN0cmF0ZWd5OiAnand0JywgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCB9LFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcclxuICAgICAgICB0b2tlbi5lbWFpbCA9IHVzZXIuZW1haWw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcclxuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIHsgaWQ6IHN0cmluZyB9KS5pZCA9IHRva2VuLmlkIGFzIHN0cmluZztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH0sXHJcbiAgfSxcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiAnL2xvZ2luJyxcclxuICB9LFxyXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxyXG59O1xyXG5cclxuZGVjbGFyZSBtb2R1bGUgJ25leHQtYXV0aCcge1xyXG4gIGludGVyZmFjZSBTZXNzaW9uIHtcclxuICAgIHVzZXI6IHsgaWQ6IHN0cmluZzsgZW1haWw/OiBzdHJpbmcgfCBudWxsOyBuYW1lPzogc3RyaW5nIHwgbnVsbDsgaW1hZ2U/OiBzdHJpbmcgfCBudWxsIH07XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiR29vZ2xlUHJvdmlkZXIiLCJwcmlzbWEiLCJjb21wYXJlIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImluY2x1ZGUiLCJwcm9maWxlIiwicGFzc3dvcmRIYXNoIiwiRXJyb3IiLCJvayIsImlkIiwidW5kZWZpbmVkIiwiaW1hZ2UiLCJlcnJvciIsIm1lc3NhZ2UiLCJhdXRoRXJyb3JMb2ciLCJjcmVhdGUiLCJkYXRhIiwic3RhY2siLCJjb250ZXh0Iiwic291cmNlIiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9DTElFTlRfSUQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsImNsaWVudElkIiwiY2xpZW50U2VjcmV0Iiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwibWF4QWdlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJwYWdlcyIsInNpZ25JbiIsInNlY3JldCIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ApiError: () => (/* binding */ ApiError),\n/* harmony export */   errorResponse: () => (/* binding */ errorResponse),\n/* harmony export */   getCurrentUserId: () => (/* binding */ getCurrentUserId),\n/* harmony export */   getSession: () => (/* binding */ getSession),\n/* harmony export */   jsonResponse: () => (/* binding */ jsonResponse),\n/* harmony export */   requireAuth: () => (/* binding */ requireAuth)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/auth */ \"(rsc)/./auth.ts\");\n\n\nasync function getSession() {\n    return (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n}\nasync function getCurrentUserId() {\n    const session = await getSession();\n    return session?.user?.id ?? null;\n}\nasync function requireAuth() {\n    const session = await getSession();\n    if (!session?.user?.id) {\n        throw new ApiError(\"Unauthorized\", 401);\n    }\n    return {\n        id: session.user.id,\n        email: session.user.email,\n        name: session.user.name ?? null\n    };\n}\nclass ApiError extends Error {\n    constructor(message, status = 400, code){\n        super(message);\n        this.status = status;\n        this.code = code;\n        this.name = \"ApiError\";\n    }\n}\nfunction jsonResponse(data, status = 200) {\n    return Response.json(data, {\n        status\n    });\n}\nfunction errorResponse(message, status = 400, code) {\n    return Response.json({\n        message,\n        code\n    }, {\n        status\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBNkM7QUFDUjtBQUU5QixlQUFlRTtJQUNwQixPQUFPRiwyREFBZ0JBLENBQUNDLDhDQUFXQTtBQUNyQztBQUVPLGVBQWVFO0lBQ3BCLE1BQU1DLFVBQVUsTUFBTUY7SUFDdEIsT0FBT0UsU0FBU0MsTUFBTUMsTUFBTTtBQUM5QjtBQUVPLGVBQWVDO0lBQ3BCLE1BQU1ILFVBQVUsTUFBTUY7SUFDdEIsSUFBSSxDQUFDRSxTQUFTQyxNQUFNQyxJQUFJO1FBQ3RCLE1BQU0sSUFBSUUsU0FBUyxnQkFBZ0I7SUFDckM7SUFDQSxPQUFPO1FBQUVGLElBQUlGLFFBQVFDLElBQUksQ0FBQ0MsRUFBRTtRQUFFRyxPQUFPTCxRQUFRQyxJQUFJLENBQUNJLEtBQUs7UUFBR0MsTUFBTU4sUUFBUUMsSUFBSSxDQUFDSyxJQUFJLElBQUk7SUFBSztBQUM1RjtBQUVPLE1BQU1GLGlCQUFpQkc7SUFDNUJDLFlBQ0VDLE9BQWUsRUFDZixTQUF3QixHQUFHLEVBQzNCLElBQW9CLENBQ3BCO1FBQ0EsS0FBSyxDQUFDQTthQUhDQyxTQUFBQTthQUNBQyxPQUFBQTtRQUdQLElBQUksQ0FBQ0wsSUFBSSxHQUFHO0lBQ2Q7QUFDRjtBQUVPLFNBQVNNLGFBQWdCQyxJQUFPLEVBQUVILFNBQWlCLEdBQUc7SUFDM0QsT0FBT0ksU0FBU0MsSUFBSSxDQUFDRixNQUFNO1FBQUVIO0lBQU87QUFDdEM7QUFFTyxTQUFTTSxjQUFjUCxPQUFlLEVBQUVDLFNBQWlCLEdBQUcsRUFBRUMsSUFBYTtJQUNoRixPQUFPRyxTQUFTQyxJQUFJLENBQUM7UUFBRU47UUFBU0U7SUFBSyxHQUFHO1FBQUVEO0lBQU87QUFDbkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9tb3JhLXNlcnZlci8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCc7XHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9hdXRoJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXNzaW9uKCkge1xyXG4gIHJldHVybiBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VySWQoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKTtcclxuICByZXR1cm4gc2Vzc2lvbj8udXNlcj8uaWQgPz8gbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVpcmVBdXRoKCk6IFByb21pc2U8eyBpZDogc3RyaW5nOyBlbWFpbDogc3RyaW5nOyBuYW1lPzogc3RyaW5nIHwgbnVsbCB9PiB7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKTtcclxuICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRXJyb3IoJ1VuYXV0aG9yaXplZCcsIDQwMSk7XHJcbiAgfVxyXG4gIHJldHVybiB7IGlkOiBzZXNzaW9uLnVzZXIuaWQsIGVtYWlsOiBzZXNzaW9uLnVzZXIuZW1haWwhLCBuYW1lOiBzZXNzaW9uLnVzZXIubmFtZSA/PyBudWxsIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBcGlFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHB1YmxpYyBzdGF0dXM6IG51bWJlciA9IDQwMCxcclxuICAgIHB1YmxpYyBjb2RlPzogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgIHRoaXMubmFtZSA9ICdBcGlFcnJvcic7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganNvblJlc3BvbnNlPFQ+KGRhdGE6IFQsIHN0YXR1czogbnVtYmVyID0gMjAwKTogUmVzcG9uc2Uge1xyXG4gIHJldHVybiBSZXNwb25zZS5qc29uKGRhdGEsIHsgc3RhdHVzIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JSZXNwb25zZShtZXNzYWdlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyID0gNDAwLCBjb2RlPzogc3RyaW5nKTogUmVzcG9uc2Uge1xyXG4gIHJldHVybiBSZXNwb25zZS5qc29uKHsgbWVzc2FnZSwgY29kZSB9LCB7IHN0YXR1cyB9KTtcclxufVxyXG4iXSwibmFtZXMiOlsiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiZ2V0U2Vzc2lvbiIsImdldEN1cnJlbnRVc2VySWQiLCJzZXNzaW9uIiwidXNlciIsImlkIiwicmVxdWlyZUF1dGgiLCJBcGlFcnJvciIsImVtYWlsIiwibmFtZSIsIkVycm9yIiwiY29uc3RydWN0b3IiLCJtZXNzYWdlIiwic3RhdHVzIiwiY29kZSIsImpzb25SZXNwb25zZSIsImRhdGEiLCJSZXNwb25zZSIsImpzb24iLCJlcnJvclJlc3BvbnNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBRTlDLE1BQU1DLGtCQUFrQkM7QUFFakIsTUFBTUMsU0FBU0YsZ0JBQWdCRSxNQUFNLElBQUksSUFBSUgsd0RBQVlBLEdBQUc7QUFFbkUsSUFBSUksSUFBeUIsRUFBY0gsZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvbW9yYS1zZXJ2ZXIvLi9saWIvZGIudHM/MWRmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMgeyBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZCB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XHJcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/jose","vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/@babel","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fcredentials%2Froute&page=%2Fapi%2Fauth%2Fcredentials%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fcredentials%2Froute.ts&appDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();