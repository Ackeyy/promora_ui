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
exports.id = "app/api/auth/signup/route";
exports.ids = ["app/api/auth/signup/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ADDMANIA006_Documents_codes_promora_promora_test_1_server_app_api_auth_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/signup/route.ts */ \"(rsc)/./app/api/auth/signup/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/signup/route\",\n        pathname: \"/api/auth/signup\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/signup/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ADDMANIA006\\\\Documents\\\\codes\\\\promora\\\\promora test 1\\\\server\\\\app\\\\api\\\\auth\\\\signup\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ADDMANIA006_Documents_codes_promora_promora_test_1_server_app_api_auth_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/signup/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGc2lnbnVwJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGc2lnbnVwJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRnNpZ251cCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBRERNQU5JQTAwNiU1Q0RvY3VtZW50cyU1Q2NvZGVzJTVDcHJvbW9yYSU1Q3Byb21vcmElMjB0ZXN0JTIwMSU1Q3NlcnZlciU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDQURETUFOSUEwMDYlNUNEb2N1bWVudHMlNUNjb2RlcyU1Q3Byb21vcmElNUNwcm9tb3JhJTIwdGVzdCUyMDElNUNzZXJ2ZXImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQzJEO0FBQ3hJO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvbW9yYS1zZXJ2ZXIvP2IyMTUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQURETUFOSUEwMDZcXFxcRG9jdW1lbnRzXFxcXGNvZGVzXFxcXHByb21vcmFcXFxccHJvbW9yYSB0ZXN0IDFcXFxcc2VydmVyXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxzaWdudXBcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvc2lnbnVwL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9zaWdudXBcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvc2lnbnVwL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcQURETUFOSUEwMDZcXFxcRG9jdW1lbnRzXFxcXGNvZGVzXFxcXHByb21vcmFcXFxccHJvbW9yYSB0ZXN0IDFcXFxcc2VydmVyXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxzaWdudXBcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvc2lnbnVwL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/signup/route.ts":
/*!**************************************!*\
  !*** ./app/api/auth/signup/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\n\n\nconst signupSchema = zod__WEBPACK_IMPORTED_MODULE_3__.object({\n    email: zod__WEBPACK_IMPORTED_MODULE_3__.string().email(),\n    password: zod__WEBPACK_IMPORTED_MODULE_3__.string().min(8).max(100),\n    name: zod__WEBPACK_IMPORTED_MODULE_3__.string().min(1).max(100).optional(),\n    role: zod__WEBPACK_IMPORTED_MODULE_3__[\"enum\"]([\n        \"creator\",\n        \"host\"\n    ])\n});\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const parsed = signupSchema.safeParse(body);\n        if (!parsed.success) {\n            return (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.errorResponse)(parsed.error.message, 400);\n        }\n        const { email, password, name, role } = parsed.data;\n        const existing = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n            where: {\n                email\n            }\n        });\n        if (existing) return (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.errorResponse)(\"Email already registered\", 409);\n        const passwordHash = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_0__.hash)(password, 10);\n        const user = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.user.create({\n            data: {\n                email,\n                name: name ?? email.split(\"@\")[0],\n                passwordHash\n            }\n        });\n        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.profile.create({\n            data: {\n                userId: user.id,\n                creatorEnabled: role === \"creator\",\n                hostEnabled: role === \"host\",\n                onboardingDone: false\n            }\n        });\n        return (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.jsonResponse)({\n            data: {\n                id: user.id,\n                email: user.email,\n                name: user.name\n            }\n        });\n    } catch (e) {\n        console.error(e);\n        return (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.errorResponse)(\"Signup failed\", 500);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvc2lnbnVwL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNnQztBQUNSO0FBQ1U7QUFDdUI7QUFFekQsTUFBTUssZUFBZUosdUNBQVEsQ0FBQztJQUM1Qk0sT0FBT04sdUNBQVEsR0FBR00sS0FBSztJQUN2QkUsVUFBVVIsdUNBQVEsR0FBR1MsR0FBRyxDQUFDLEdBQUdDLEdBQUcsQ0FBQztJQUNoQ0MsTUFBTVgsdUNBQVEsR0FBR1MsR0FBRyxDQUFDLEdBQUdDLEdBQUcsQ0FBQyxLQUFLRSxRQUFRO0lBQ3pDQyxNQUFNYix3Q0FBTSxDQUFDO1FBQUM7UUFBVztLQUFPO0FBQ2xDO0FBRU8sZUFBZWUsS0FBS0MsR0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsSUFBSUUsSUFBSTtRQUMzQixNQUFNQyxTQUFTZixhQUFhZ0IsU0FBUyxDQUFDSDtRQUN0QyxJQUFJLENBQUNFLE9BQU9FLE9BQU8sRUFBRTtZQUNuQixPQUFPbkIsd0RBQWFBLENBQUNpQixPQUFPRyxLQUFLLENBQUNDLE9BQU8sRUFBRTtRQUM3QztRQUNBLE1BQU0sRUFBRWpCLEtBQUssRUFBRUUsUUFBUSxFQUFFRyxJQUFJLEVBQUVFLElBQUksRUFBRSxHQUFHTSxPQUFPSyxJQUFJO1FBQ25ELE1BQU1DLFdBQVcsTUFBTXhCLDJDQUFNQSxDQUFDeUIsSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFBRUMsT0FBTztnQkFBRXRCO1lBQU07UUFBRTtRQUNqRSxJQUFJbUIsVUFBVSxPQUFPdkIsd0RBQWFBLENBQUMsNEJBQTRCO1FBQy9ELE1BQU0yQixlQUFlLE1BQU05Qiw4Q0FBSUEsQ0FBQ1MsVUFBVTtRQUMxQyxNQUFNa0IsT0FBTyxNQUFNekIsMkNBQU1BLENBQUN5QixJQUFJLENBQUNJLE1BQU0sQ0FBQztZQUNwQ04sTUFBTTtnQkFDSmxCO2dCQUNBSyxNQUFNQSxRQUFRTCxNQUFNeUIsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqQ0Y7WUFDRjtRQUNGO1FBQ0EsTUFBTTVCLDJDQUFNQSxDQUFDK0IsT0FBTyxDQUFDRixNQUFNLENBQUM7WUFDMUJOLE1BQU07Z0JBQ0pTLFFBQVFQLEtBQUtRLEVBQUU7Z0JBQ2ZDLGdCQUFnQnRCLFNBQVM7Z0JBQ3pCdUIsYUFBYXZCLFNBQVM7Z0JBQ3RCd0IsZ0JBQWdCO1lBQ2xCO1FBQ0Y7UUFDQSxPQUFPbEMsdURBQVlBLENBQUM7WUFDbEJxQixNQUFNO2dCQUFFVSxJQUFJUixLQUFLUSxFQUFFO2dCQUFFNUIsT0FBT29CLEtBQUtwQixLQUFLO2dCQUFFSyxNQUFNZSxLQUFLZixJQUFJO1lBQUM7UUFDMUQ7SUFDRixFQUFFLE9BQU8yQixHQUFHO1FBQ1ZDLFFBQVFqQixLQUFLLENBQUNnQjtRQUNkLE9BQU9wQyx3REFBYUEsQ0FBQyxpQkFBaUI7SUFDeEM7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb21vcmEtc2VydmVyLy4vYXBwL2FwaS9hdXRoL3NpZ251cC9yb3V0ZS50cz9jY2RkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0IH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBoYXNoIH0gZnJvbSAnYmNyeXB0anMnO1xyXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvZGInO1xyXG5pbXBvcnQgeyBlcnJvclJlc3BvbnNlLCBqc29uUmVzcG9uc2UgfSBmcm9tICdAL2xpYi9hdXRoJztcclxuXHJcbmNvbnN0IHNpZ251cFNjaGVtYSA9IHoub2JqZWN0KHtcclxuICBlbWFpbDogei5zdHJpbmcoKS5lbWFpbCgpLFxyXG4gIHBhc3N3b3JkOiB6LnN0cmluZygpLm1pbig4KS5tYXgoMTAwKSxcclxuICBuYW1lOiB6LnN0cmluZygpLm1pbigxKS5tYXgoMTAwKS5vcHRpb25hbCgpLFxyXG4gIHJvbGU6IHouZW51bShbJ2NyZWF0b3InLCAnaG9zdCddKSxcclxufSk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xyXG4gICAgY29uc3QgcGFyc2VkID0gc2lnbnVwU2NoZW1hLnNhZmVQYXJzZShib2R5KTtcclxuICAgIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHtcclxuICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocGFyc2VkLmVycm9yLm1lc3NhZ2UsIDQwMCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCwgbmFtZSwgcm9sZSB9ID0gcGFyc2VkLmRhdGE7XHJcbiAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBlbWFpbCB9IH0pO1xyXG4gICAgaWYgKGV4aXN0aW5nKSByZXR1cm4gZXJyb3JSZXNwb25zZSgnRW1haWwgYWxyZWFkeSByZWdpc3RlcmVkJywgNDA5KTtcclxuICAgIGNvbnN0IHBhc3N3b3JkSGFzaCA9IGF3YWl0IGhhc2gocGFzc3dvcmQsIDEwKTtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5jcmVhdGUoe1xyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgZW1haWwsXHJcbiAgICAgICAgbmFtZTogbmFtZSA/PyBlbWFpbC5zcGxpdCgnQCcpWzBdLFxyXG4gICAgICAgIHBhc3N3b3JkSGFzaCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgYXdhaXQgcHJpc21hLnByb2ZpbGUuY3JlYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcclxuICAgICAgICBjcmVhdG9yRW5hYmxlZDogcm9sZSA9PT0gJ2NyZWF0b3InLFxyXG4gICAgICAgIGhvc3RFbmFibGVkOiByb2xlID09PSAnaG9zdCcsXHJcbiAgICAgICAgb25ib2FyZGluZ0RvbmU6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ganNvblJlc3BvbnNlKHtcclxuICAgICAgZGF0YTogeyBpZDogdXNlci5pZCwgZW1haWw6IHVzZXIuZW1haWwsIG5hbWU6IHVzZXIubmFtZSB9LFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgIHJldHVybiBlcnJvclJlc3BvbnNlKCdTaWdudXAgZmFpbGVkJywgNTAwKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImhhc2giLCJ6IiwicHJpc21hIiwiZXJyb3JSZXNwb25zZSIsImpzb25SZXNwb25zZSIsInNpZ251cFNjaGVtYSIsIm9iamVjdCIsImVtYWlsIiwic3RyaW5nIiwicGFzc3dvcmQiLCJtaW4iLCJtYXgiLCJuYW1lIiwib3B0aW9uYWwiLCJyb2xlIiwiZW51bSIsIlBPU1QiLCJyZXEiLCJib2R5IiwianNvbiIsInBhcnNlZCIsInNhZmVQYXJzZSIsInN1Y2Nlc3MiLCJlcnJvciIsIm1lc3NhZ2UiLCJkYXRhIiwiZXhpc3RpbmciLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwicGFzc3dvcmRIYXNoIiwiY3JlYXRlIiwic3BsaXQiLCJwcm9maWxlIiwidXNlcklkIiwiaWQiLCJjcmVhdG9yRW5hYmxlZCIsImhvc3RFbmFibGVkIiwib25ib2FyZGluZ0RvbmUiLCJlIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/signup/route.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/jose","vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/@babel","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADDMANIA006%5CDocuments%5Ccodes%5Cpromora%5Cpromora%20test%201%5Cserver&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();