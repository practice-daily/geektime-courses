/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

console.log('start require')

let lib = __webpack_require__(/*! ./lib.js */ "./lib.js")

console.log('end require')
console.log('require:', lib)
console.log('\n')

// require 进来的是一个引用
lib.test = 'add'

// setTimeout(() => {
//   console.log()
//   console.log('=== index.js: exports start ===')
//   console.log(typeof exports, exports)
//   console.log('=== index.js: exports end ===')

//   console.log('\n')

//   console.log('=== index.js: module.exports start ===')
//   console.log(typeof module.exports, module.exports)
//   console.log('=== index.js: module.exports end ===')
// }, 2000)

// /**
//  * 可以使用 webpack 分析 commonjs 模块化规范
//  * webpack --devtool none --mode development --target node index.js
//  */


// function changeAgeAndRef(person) {
//   person.age = 30
//   person = {
//     name: 'world',
//     age: 40
//   }
//   return person
// }

// var person = {
//   name: 'hello',
//   age: 18
// }

// var person2 = changeAgeAndRef(person)
// console.log(person) // { name: 'hello', age: 30 }
// console.log(person2) // { name: 'world', age: 40 }


/***/ }),

/***/ "./lib.js":
/*!****************!*\
  !*** ./lib.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * exports 导出的都挂载在一个对象下，所以可多次挂载
 * module.exports 可以不用挂载在对象下，可以导出任意数据类型
 * 
 * module.exports 和 exports 一开始都是一个空对象，并且指向同一块内存。
 * 即 module.exports 和 exports 是等价的（前提是：不去重新赋值改变它们指向的内存地址）。
 * 
 * require 导入的本质上是 module.exports。
 * 这就产生了一个问题，当 module.exports 和 exports 指向的不是同一块内存时，exports 的内容就会失效。
 * 
 * 参考: https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
 */

console.log('start lib')

exports.hello = 'world'

exports.add = function (a, b) {
  return a + b
}

exports = {
  'hi': 'ha'
}

module.exports.node = 'js'
// module.exports = 'Hello World!'
// module.exports = function minus (a, b) {
//   return a - b
// }


setTimeout(() => {
  console.group('=== setTimeout lib.js: exports ===')
  console.log('exports:', typeof exports, exports)
  console.groupEnd('=== setTimeout lib.js: exports ===')

  console.log('\n')

  console.group('=== setTimeout lib.js: module.exports ===')
  console.log('module.exports:', typeof module.exports, module.exports)
  console.groupEnd('=== setTimeout lib.js: module.exports ===')
}, 1000)


/***/ })

/******/ });