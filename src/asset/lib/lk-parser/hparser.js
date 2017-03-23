(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("HParser", [], factory);
	else if(typeof exports === 'object')
		exports["HParser"] = factory();
	else
		root["HParser"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-05-20T17:23Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.4",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},

		isPlainObject: function( obj ) {
			var key;

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			// Not own constructor property must be Object
			if ( obj.constructor &&
					!hasOwn.call( obj, "constructor" ) &&
					!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for ( key in obj ) {}

			return key === undefined || hasOwn.call( obj, key );
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add( function() {

						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	} );


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {

		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function( owner, initial ) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;

			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key === undefined ) {
				this.register( owner );

			} else {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );

					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;

				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

					if ( data !== undefined ) {
						return data;
					}

					camelKey = jQuery.camelCase( key );

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([\w:-]+)/ );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName( "tbody" )[ 0 ] ||
				elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			display = jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var documentElement = document.documentElement;



	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );
		}

		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

				documentElement.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;

				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		window.clearInterval( timerId );

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {

						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// The jqXHR state
				state = 0,

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {

									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );

					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );


	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
	}));


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var isLock = false;

	//拼接params
	function parseParams(obj) {
	    var paramString = '';

	    // 如果是非空对象
	    if (getNonVoidObject(obj)) {
	        for (var key in obj) {
	            var value = obj[key];

	            // value = !value ? value : '';
	            if (value !== undefined && value !== null) {
	                paramString += '&' + key + '=' + value;
	            }
	        }
	    }

	    return paramString.substring(1);
	}

	//url序列化
	function urlSerialize(url, obj) {
	    if (getNonVoidObject(obj)) {
	        var strParams = parseParams(obj);
	        if (strParams) {
	            url = url + '?' + parseParams(obj);
	        }
	    }

	    return url;
	}

	// url反序列化
	function urlUnserialize(url) {
	    var pattern = new RegExp('[?&](.*?\=?[^&]+)', 'g'),
	        matcher = (url + '').split('#')[0].match(pattern);

	    var obj = {};

	    if (matcher && matcher.length > 0) {
	        for (var i = 0, l = matcher.length; i < l; i++) {
	            var paramArr = matcher[i].substring(1).split('=');
	            obj[paramArr[0]] = paramArr[1];
	        }
	    }

	    return obj;
	}

	// 生成[min, max)间的浮点数
	function random(min, max) {
	    return min + Math.random() * (max - min);
	}

	// 生成[min, max]间的整数
	function randomInt(min, max) {
	    return Math.floor(min + Math.random() * (max - min + 1));
	}

	/*// 去除字符串两边的白边
	 function trim(text) {
	 var whitespace = '[\\x20\\t\\r\\n\\f]',
	 rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g');

	 return (text == null || text === undefined) ?
	 '' :
	 ( text + '' ).replace(rtrim, '');
	 }*/
	// 之前的去除前后空格的字符串有问题，重新修改后的方法
	function trim(text) {
	    return text == null || text === undefined ? '' : (text + '').replace(/(^\s*)|(\s*$)/g, '');
	}

	/**
	 * 自动补零
	 * @method
	 * @param     <Number | String> number 需要补零的数字
	 * @param     <Number> n 补零后的位数
	 * @return    <Number | String> 补零后的数字
	 * @todo      未验证n是否为数字类型
	 */
	function zeroize(number, n) {
	    var numberLength = ('' + number).length;

	    // 如果number本身的字符串长度大于n+1则返回number本身，不再补零
	    if (numberLength > n + 1) return number;

	    return Array(n - numberLength + 1).join(0) + number;
	}

	function loadImg(url, callback) {
	    var img = new Image();

	    // img.setAttribute('crossOrigin', 'anonymous');
	    img.src = url;
	    if (img.complete) {
	        callback(img.width, img.height, null);
	    } else {
	        img.onload = function () {
	            callback && callback(img.width, img.height, null);
	            img.onload = null;
	        };
	    }

	    img.onerror = function () {
	        callback && callback(0, 0, 'error');
	    };
	}

	//load a group of images and return an array with images' size
	// eg: loadImgGroup(urlArr, function(allImgArray){ some code });
	function loadImgGroup(urlArr, callback, everyLoadedCallback) {
	    var len, loadNum, allImgArray;

	    urlArr = Object.prototype.toString.call(urlArr) == '[object Array]' ? urlArr : [];

	    len = urlArr.length;
	    loadNum = 0;
	    allImgArray = [];

	    if (!len) {
	        everyLoadedCallback && everyLoadedCallback(0, 0, {});
	        callback && callback(allImgArray);
	    }

	    for (var i = 0; i < len; i++) {
	        (function (i) {
	            loadImg(urlArr[i], function (w, h, msg) {
	                loadNum++;
	                allImgArray[i] = { w: w, h: h, msg: msg };
	                // i为第n个要加载的图片，loadNum是加载了多少张图片，len是要加载的图片张数
	                everyLoadedCallback && everyLoadedCallback(i, loadNum / len, allImgArray[i]);
	                if (loadNum == len) {
	                    callback && callback(allImgArray);
	                }
	            });
	        })(i);
	    }
	}

	// 验证url
	function isURL(url) {
	    return !!url.match(/^(http[s]?):/);
	}

	// 获取对象的类型
	function typeOf(param) {
	    var reg = /\[object (.*)\]/;

	    return Object.prototype.toString.call(param).match(reg)[1];
	}

	function isString(param) {
	    return typeOf(param) === 'String';
	}

	function isObject(param) {
	    return typeOf(param) === 'Object';
	}

	function isFunction(param) {
	    return typeOf(param) === 'Function';
	}

	function isArray(param) {
	    return typeOf(param) === 'Array';
	}

	function isNumber(param) {
	    return typeOf(param) === 'Number';
	}

	function isDate(param) {
	    return typeOf(param) === 'Date';
	}

	function isUndefined(param) {
	    return typeOf(param) === 'Undefined';
	}

	function isNull(param) {
	    return typeOf(param) === 'Null';
	}

	function isFile(param) {
	    return typeOf(param) === 'File';
	}

	function isFileList(param) {
	    return typeOf(param) === 'FileList';
	}

	function isFormData(param) {
	    return typeOf(param) === 'FormData';
	}

	/**
	 * if the pararm obj has no property, return undefined,
	 * if the pararm obj is falsy, return undefined,
	 * else return the original obj
	 */
	function getNonVoidObject(obj) {
	    var hasProperty = false;

	    if (obj && isObject(obj)) {
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                hasProperty = true;
	                break;
	            }
	        }

	        if (hasProperty) {
	            return obj;
	        }
	    }
	}

	// 根据obj编译含有'{string}'的字符串
	function compileBraceStr(str, obj) {
	    return compileStr(str, obj, '\\{', '\\}');
	}

	// 根据obj编译字符串
	function compileStr(str, obj, regStartSymbol, regEndSymbol) {
	    if (getNonVoidObject(obj)) {
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                var reg = new RegExp(regStartSymbol + key + regEndSymbol, 'gi');

	                str = str.replace(reg, obj[key]);
	            }
	        }
	    }

	    return str;
	}

	// 数组去重
	function arrayUnique(arr) {
	    var tmpArr = [],
	        curr;

	    for (var i = 0, l = arr.length; i < l; i++) {
	        curr = arr[i];
	        if (tmpArr.indexOf(curr) == -1) {
	            tmpArr.push(curr);
	        }
	    }

	    return tmpArr;
	}

	// 数组去重合并
	function arrayMerge(arr1, arr2) {
	    return arrayUnique(arr1.concat(arr2));
	}

	// 删除数组子项
	function removeArrayItem(arr, val) {
	    var index = arr.indexOf(val);
	    if (!isNaN(index) && index > -1) {
	        arr.splice(index, 1);
	    }
	    return arr;
	}

	// 全局锁
	function lock(callback, autoUnLock) {
	    if (!isLock) {
	        if (typeof callback == 'function') {
	            isLock = true;
	            callback();
	            if (autoUnLock) {
	                setTimeout(function () {
	                    isLock = false;
	                }, 400);
	            }
	        }
	    }
	}

	// 全局解锁
	function unLock() {
	    isLock = false;
	}

	exports.default = {
	    // url处理
	    parseParams: parseParams,
	    urlSerialize: urlSerialize,
	    urlUnserialize: urlUnserialize,
	    isURL: isURL,

	    // 随机数
	    random: random,
	    randomInt: randomInt,

	    // 图片加载
	    loadImg: loadImg,
	    loadImgGroup: loadImgGroup,

	    // 值类型的判断与获取
	    typeOf: typeOf,
	    isString: isString,
	    isObject: isObject,
	    isFunction: isFunction,
	    isArray: isArray,
	    isNumber: isNumber,
	    isDate: isDate,
	    isUndefined: isUndefined,
	    isNull: isNull,
	    isFile: isFile,
	    isFileList: isFileList,
	    isFormData: isFormData,
	    getNonVoidObject: getNonVoidObject,

	    // 字符串操作
	    trim: trim,

	    // 其他
	    zeroize: zeroize,
	    compileStr: compileStr,
	    compileBraceStr: compileBraceStr,

	    // 数组操作
	    arrayUnique: arrayUnique,
	    arrayMerge: arrayMerge,

	    // 移除数组子项
	    removeArrayItem: removeArrayItem,

	    lock: lock,
	    unLock: unLock
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var jvveCompile = false,
	    jvveVersion = '1.0.0';

	var env = transformEnvName('@@ENV');
	var envConfig = generateEnvConfig(),
	    envType = generateEnvType(envConfig),
	    envIsOnline = isOnline(env, envType);

	function _getEnv() {
	    return env;
	}

	// 设置需要的工作环境
	function _setEnv(envName) {
	    env = transformEnvName(envName), envConfig = generateEnvConfig(), envType = generateEnvType(envConfig), envIsOnline = isOnline(env, envType);
	}

	// 将jenkins构建前替换的环境名称转换成前端对应的环境名
	function transformEnvName(envName) {
	    var realEnvName = envName;

	    if (envName === 'prd') {
	        realEnvName = 'PRD';
	    } else if (envName === 'uat') {
	        realEnvName = 'UAT';
	    } else if (envName === 'sit') {
	        realEnvName = 'SIT';
	    } else if (envName === 'dev') {
	        realEnvName = 'DEV';
	    } else if (envName === 'local' || envName === '@@ENV') {
	        realEnvName = 'LOCAL';
	    }

	    return realEnvName;
	}

	// 生成环境配置对象
	function generateEnvConfig() {
	    var jvvePath = '/plugins/jvveshow/' + jvveVersion;

	    var paths = {
	        LOCAL: 'http://localhost:8090',
	        DEV: 'http://iloka.dev.vveshow.com',
	        SIT: 'http://iloka.sit.vveshow.com',
	        UAT: 'http://iloka.uat.vveshow.com',
	        PRD: 'http://www.iloka.me'
	    };

	    var key = '';
	    if (jvveCompile == undefined) {
	        for (key in paths) {
	            paths[key] += jvvePath;
	        }
	    }

	    return paths;
	}

	// 生成一个键值相同的环境类型对象
	function generateEnvType(envConfig) {
	    var envType = {};
	    var key = '';

	    for (key in envConfig) {
	        envType[key] = key;
	    }

	    return envType;
	}

	// 返回布尔值，判断是否是线上环境
	function isOnline(env, envType) {
	    return env === envType['PRD'];
	}

	// 解析绝对地址到当前环境的绝对地址
	function parseUrl(absolutePath) {
	    return envConfig[env] + absolutePath;
	}

	function getStaticResourcePrefix() {
	    return env === envType['PRD'] ? 'http://cdn.vveshow.com/cloud/iloka/' : '';
	}

	exports.default = {
	    VERSION: '@VERSION@',

	    // 设置项目目前的环境
	    ENV: env,

	    getEnv: _getEnv,

	    setEnv: _setEnv,
	    // 返回项目跟路径
	    ROOT_URL: envConfig[env],

	    // 返回所有环境项目跟路径
	    ROOT_URLS: envConfig,

	    // 环境类型
	    ENV_TYPE: envType,

	    // 是否是线上环境(TEST || PRODUCTION)
	    ENV_IS_ONLINE: envIsOnline,

	    // 解析绝对地址到当前环境的绝对地址
	    parseUrl: parseUrl,

	    // 是否编译jvveshow
	    JVVE_IS_COMPILE: jvveCompile,

	    // jvveshow版本
	    JVVE_VERSION: jvveVersion,

	    // 全局参数,由入口页面设置
	    // G_PARAMS: root['G_PARAMS'] || {},

	    // 生产环境下的静态资源路径，使用CDN静态资源CDN路径(JS直接引用图片时 )
	    STATIC_RESOURCE_PREFIX: getStaticResourcePrefix()
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lkUtils = __webpack_require__(2);

	var _lkUtils2 = _interopRequireDefault(_lkUtils);

	var _vveConfigEnv = __webpack_require__(3);

	var _vveConfigEnv2 = _interopRequireDefault(_vveConfigEnv);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var API_URLS = {};

	var BASE_URL = function (baseUrls) {
	    return baseUrls[_vveConfigEnv2.default.ENV] ? baseUrls[_vveConfigEnv2.default.ENV] : baseUrls['LOCAL'];
	}({
	    LOCAL: 'http://api.dev.vveshow.com',
	    DEV: 'http://api.dev.vveshow.com',
	    SIT: 'http://api.sit.vveshow.com',
	    UAT: 'http://api.uat.vveshow.com',
	    PRD: 'http://api.linkin.mobi'
	});

	// iLoka平台接口列表
	var ILOKA_API_URLS = {
	    USER_GUIDE: '/api/{version}/{client}/{channel}/user/guide',

	    // 登录
	    USER_SIGN_IN_POST: '/security_check',
	    // 登出
	    USER_SIGN_OUT_GET: '/logout',

	    // 获取当前账号用户信息
	    USER_INFO_GET: '/api/{version}/{client}/{channel}/user/info',
	    // 提交当前账号用户信息
	    USER_INFO_POST: '/api/{version}/{client}/{channel}/user/info',

	    // 获取指定用户基本账号信息(nickName, headImg)
	    USER_INFO_BASIC_GET: '/api/{version}/{client}/{channel}/user/info/basic/{id}',

	    USER_AVS_GET: '/api/v1/{client}/{channel}/avs/user',

	    // 找回密码-发送验证链接到邮箱
	    USER_FORGOT_MAIL_POST: '/api/{version}/{client}/{channel}/user/forgot/password',
	    // 重置密码-用验证链接中的重置code跟新密码重置用户的旧密码
	    USER_FORGOT_RESET_POST: '/api/{version}/{client}/{channel}/user/forgot/password/reset',
	    // 严重验证链接中的重置code
	    USER_FORGOT_VERIFY_GET: '/api/{version}/{client}/{channel}/user/forgot/password/{code}',

	    // 检查用户名是否可以注册(验证了是否被注册/注册后是否验证/是否是邮箱)
	    USER_NAME_CHECK_GET: '/api/{version}/{client}/{channel}/user/reg/account/check',
	    // 检查用户昵称是否可以注册(验证了是否已被使用)
	    USER_NICKNAME_CHECK_GET: '/api/{version}/{client}/{channel}/user/reg/nickname/check',
	    // 注册
	    USER_REG_POST: '/api/{version}/{client}/{channel}/user/reg',
	    // 根据验证code重新发送验证链接
	    USER_REG_REACTIVATE_GET: '/api/{version}/{client}/{channel}/user/reg/reactivate/{code}',
	    // 根据验证code激活账号
	    USER_REG_ACTIVATE_GET: '/api/{version}/{client}/{channel}/user/reg/activate/{code}',
	    // 修改用户密码
	    USER_PASSOWRD_MODIFY_POST: '/api/{version}/{client}/{channel}/user/password',

	    // 基础信息-获取(职业/应用分类/tag)-列表
	    BASE_INFO_LIST_GET: '/api/{version}/{client}/{channel}/basic/{service}',
	    // 基础信息-新增
	    BASE_INFO_POST: '/api/{version}/{client}/{channel}/basic/{service}',
	    // 基础信息-修改
	    BASE_INFO_PUT: '/api/{version}/{client}/{channel}/basic/{service}/{id}',
	    // 基础信息-删除
	    BASE_INFO_DELETE: '/api/{version}/{client}/{channel}/basic/{service}/{id}',

	    // 媒体分类-获取-列表
	    MEDIA_CATEGORIES_LIST_GET: '/api/{version}/{client}/{channel}/media/type',
	    // 媒体分类-新增
	    MEDIA_CATEGORIES_POST: '/api/{version}/{client}/{channel}/media/type',
	    // 媒体分类-修改
	    MEDIA_CATEGORIES_PUT: '/api/{version}/{client}/{channel}/media/type/{id}',
	    // 媒体分类-删除
	    MEDIA_CATEGORIES_DELETE: '/api/{version}/{client}/{channel}/media/type/{id}',

	    // 媒体资源(用户)-获取-列表
	    MEDIA_LIST_GET: '/api/{version}/{client}/{channel}/media/{owner}/{restype}/{mimetype}',
	    // 媒体资源(用户)-新增
	    MEDIA_POST: '/api/{version}/{client}/{channel}/media/{owner}/{restype}',
	    // 媒体资源-删除
	    MEDIA_DELETE: '/api/{version}/{client}/{channel}/media',

	    // 非认证媒体资源-新增(插件数据服务-插件上传媒体文件)，用在不需要登陆的页面上传文件
	    MEDIA_UNAUTH_POST: '/api/{version}/{client}/{channel}/plugin/media/{type}',
	    // 图片base64格式-新增
	    IMAGE_BASE64_POST: '/api/{version}/{client}/{channel}/media/img/{owner}/{restype}',
	    // 图片-获取
	    IMAGE_GET: '/api/{version}/{client}/{channel}/media/image/{mediaid}',
	    // 音频-获取
	    AUDIO_GET: '/api/{version}/{client}/{channel}/media/audio/{mediaid}',
	    FONT_GET: '/api/{version}/{client}/{channel}/media/font/{mediaid}',

	    // 获取二维码图片
	    QRCODE_GET: '/api/v1/{client}/{channel}/media/qrcode/{width}/{height}',

	    // 附属信息-反馈-新增
	    ATTACHMENT_FEEDBACK_POST: '/api/{version}/{client}/{channel}/user/attachment/feedback',
	    // 附属信息-留言-新增
	    ATTACHMENT_GUESTBOOK_POST: '/api/{version}/{client}/{channel}/user/attachment/guestbook',
	    // 附属信息-吐槽-新增
	    ATTACHMENT_SPITSLOT_POST: '/api/{version}/{client}/{channel}/user/attachment/spitslot',
	    // 附属信息-系统消息-获取-列表
	    ATTACHMENT_SYSMSG_GET: '/api/{version}/{client}/{channel}/user/attachment/systemmessages',

	    // 作品-获取-列表
	    WORKS_LIST_GET: '/api/{version}/{client}/{channel}/user/app/category/{categorytype}',
	    // 编辑时,获取作品
	    WORKS_GET: '/api/{version}/{client}/{channel}/user/app/data/{appid}',

	    // GET /api/v1/{client}/{channel}/app/preview/{id} 作品预览
	    WORKS_PREVIEW_GET: '/api/v1/{client}/{channel}/app/preview/{id}',

	    // GET /api/v1/{client}/{channel}/vsite/app/{id} C端站点作品查看
	    WORKS_VSITE_GET: '/api/v1/{client}/{channel}/vsite/app/{id}',

	    // 作品-新增
	    WORKS_POST: '/api/{version}/{client}/{channel}/user/app/data',
	    // 模板-修改保存
	    TEMPLATE_POST: '/api/{version}/{client}/{channel}/user/tpl/data',
	    // 作品-删除
	    WORKS_DELETE: '/api/{version}/{client}/{channel}/user/app/data/{appid}',
	    // 作品-搜索
	    WORKS_SEARCH_POST: '/api/{version}/{client}/{channel}/search/app',
	    // 作品-公开
	    WORKS_PUBLIC_PUT: '/api/{version}/{client}/{channel}/user/app/oppen/{appid}',
	    // 作品-取消公开
	    WORKS_UNPUBLIC_PUT: '/api/{version}/{client}/{channel}/user/app/close/{appid}',
	    // 作品-设置分享
	    WORKS_SET_SHARE_PUT: '/api/{version}/{client}/{channel}/user/app/shareinfo/{appid}',
	    // 作品-获取表单
	    WORKS_FORMDATA_GET: '/api/{version}/{client}/{channel}/app/collect/data/{appid}',
	    // 作品-表单数据导出
	    WORKS_FORMDATA_EXPORT: '/api/v1/w1/linkin/app/collect/data/export/{appid}',

	    WORKS_CONTENT_PUBLISH_POST: '/api/v1/{client}/{channel}/manager/content/channel',

	    // 模板-获取-列表
	    TEMPLATE_LIST_GET: '/api/{version}/{client}/{channel}/user/tpl/category/{categorytype}',
	    // 模板-获取
	    TEMPLATE_GET: '/api/{version}/{client}/{channel}/user/tpl/data/{tplid}',

	    // GET /api/v1/{client}/{channel}/tpl/preview/{id} 预览模板数据服务
	    TEMPLATE_PREVIEW_GET: '/api/v1/{client}/{channel}/tpl/preview/{id}',

	    // 模板-删除
	    TEMPLATE_DELETE: '/api/{version}/{client}/{channel}/user/tpl/data/{tplid}',
	    // 模板-搜索
	    TEMPLATE_SEARCH_POST: '/api/{version}/{client}/{channel}/search/tpl',
	    // 模板-上架
	    TEMPLATE_ONLINE_PUT: '/api/{version}/{client}/{channel}/user/tpl/online/{tplid}',
	    // 模板-下架
	    TEMPLATE_OFFLINE_PUT: '/api/{version}/{client}/{channel}/user/tpl/offline/{tplid}',
	    // 模板-收藏
	    TEMPLATE_FAVORITE_POST: '/api/{version}/{client}/{channel}/user/tpl/favorite/{tplid}',
	    // 模板-取消收藏
	    TEMPLATE_FAVORITE_DELETE: '/api/{version}/{client}/{channel}/user/tpl/favorite/{tplid}',

	    // 其他
	    WX_JS_API_GET: '/api/wechat/jsapi/{channel}/{uin}/{intercode}',
	    COUNT_UNIFY_GET: '/api/v1/{client}/{channel}/countly/{type}/{code}/{id}',
	    WORKS_FORM_POST: '/api/v1/{client}/{channel}/app/collect/data',

	    // 开放平台 - 获取签名  1
	    OPEN_SIGNATURE_GET: '/api/v1/{client}/{channel}/platadmin/ticket/sign',
	    // 开放平台 - 检测签名
	    OPEN_SIGNATURE_CHECK_GET: '/v1/ticket/checksign',
	    // 开放平台 - 获取ticket
	    OPEN_TICKET_GET: '/v1/ticket/getticket',
	    // 开放平台 - 获取token
	    OPEN_TOKEN_GET: '/v1/token/get',

	    //灵肯开放平台@微秀场 (OPEN-API@iloka)
	    // 模板:: 获取用户模板列表
	    OPEN_TEMPLATE_LIST_GET: '/{version}/iloka/template/list',
	    // 模板:: 模板实例化
	    OPEN_TEMPLATE_INSTANTIATE_GET: '/{version}/iloka/template/instantiate/{templateid}',

	    // 作品:: 用户作品保存
	    OPEN_WORKS_POST: '/{version}/iloka/app',
	    // 作品:: 用户作品发布
	    OPEN_WORKS_PUBLISH_PUT: '/{version}/iloka/app/publish/{worksid}',
	    // 作品:: 设置作品分享信息
	    OPEN_WORKS_SHAREINFO_PUT: '/{version}/iloka/app/shareinfo/{worksid}',
	    // 作品:: 根据作品ID获取作品
	    OPEN_WORKS_GET: '/{version}/iloka/app/{worksid}',
	    // 作品:: 获取用户原创作品列别
	    OPEN_WORKS_LIST_GET: '/{version}/iloka/app/list',
	    //作品::  根据作品ID克隆作品
	    OPEN_WORKS_CLONE_GET: '/{version}/iloka/app/clone/{id}',

	    // 媒体:: 上传base64图片
	    OPEN_IMAGE_BASE64_POST: '/{version}/iloka/media/upload/{restype}',
	    // 媒体:: 上传图片
	    OPEN_MEDIA_POST: '/{version}/iloka/media/{restype}',
	    // 媒体:: 获取图片
	    OPEN_IMAGE_GET: '/{version}/iloka/media/{mediaid}',

	    /*新增接口*/

	    // 资讯-获取-列表：已对接
	    CONTENT_LIST_GET: '/api/{version}/{client}/{channel}/manager/content/list',
	    // 资讯-获取
	    CONTENT_GET: '/api/{version}/{client}/{channel}/manager/content/{id}',
	    // 资讯-新增
	    CONTENT_ADD_POST: '/api/{version}/{client}/{channel}/manager/content',
	    // 资讯-设置分享：已对接
	    CONTENT_SET_SHARE_POST: '/api/{version}/{client}/{channel}/manager/content/share/{id}',
	    // 资讯-修改
	    CONTENT_MODIFY_POST: '/api/{version}/{client}/{channel}/manager/content/{id}',
	    // 资讯-状态管理：已对接
	    CONTENT_STATUS_PUT: '/api/{version}/{client}/{channel}/manager/content/status/{status}/{id}',

	    /*新增接口*/

	    // 资讯模板-获取-列表：已对接
	    CONTENT_TEMPLATE_LIST_GET: '/api/v1/{client}/{channel}/manager/content/tpl/list',
	    // 资讯模板-获取
	    CONTENT_TEMPLATE_GET: '/api/v1/{client}/{channel}/manager/content/tpl/{id}',
	    // 资讯模板-删除：已对接
	    CONTENT_TEMPLATE_DELETE: '/api/v1/{client}/{channel}/manager/content/tpl/{id}',
	    // 资讯模板-新增
	    CONTENT_TEMPLATE_ADD_POST: '/api/v1/{client}/{channel}/manager/content/tpl',
	    // 资讯模板-修改
	    CONTENT_TEMPLATE_MODIFY_POST: '/api/v1/{client}/{channel}/manager/content/tpl/{id}',

	    // 资讯通道状态管理
	    CHANNEL_RES_STATUS_PUT: '/api/v1/{client}/{channel}/manager/content/channel/{resType}/status/{status}/{id}',

	    // 平台资讯模板-新增
	    PLAT_CONTENT_TEMPLATE_ADD_POST: '/api/v1/{client}/{channel}/platadmin/content/tpl',
	    // 平台资讯模板-修改
	    PLAT_CONTENT_TEMPLATE_MODIFY_POST: '/api/v1/{client}/{channel}/platadmin/content/tpl/{id}',

	    // 资讯点赞
	    CONTENT_LIKE_GET: '/api/v1/{client}/{channel}/site/{resType}/praise/{id}',

	    /*新增接口*/

	    // 资讯-统计（按时：daily，按日：day）：已对接
	    CONTENT_STATISTICS_POST: '/api/v1/{client}/{channel}/manager/content/data/{type}/{id}',

	    /*新增接口*/

	    // 资讯-获取站点配置
	    CONTENT_SITE_CONFIG_GET: '/api/v1/{client}/{channel}/manager/site/config',
	    // 资讯-站点配置
	    CONTENT_SITE_CONFIG_POST: '/api/v1/{client}/{channel}/manager/site/config',

	    /*新增接口*/
	    //删除资资讯块
	    CONTENT_SIGNATURE_DELETE: '/api/v1/{client}/{channel}/manager/content/bulk/{bulkType}/{id}',
	    //获取资讯块列表
	    CONTENT_SIGNATURE_LIST_GET: '/api/v1/{client}/{channel}/manager/content/bulk/list',
	    //获取资讯块
	    CONTENT_SIGNATURE_BULK_GET: '/api/v1/{client}/{channel}/manager/content/bulk/{bulkType}/{id}',
	    //修改签名
	    CONTENT_SIGNATURE_MODIFY_POST: '/api/v1/{client}/{channel}/manager/content/bulk/{bulkType}/{id}',
	    //添加签名
	    CONTENT_SIGNATURE_ADD_POST: '/api/v1/{client}/{channel}/manager/content/bulk/{bulkType}',

	    /*新增接口*/

	    // 后台-获取作品列表
	    ADMIN_APP_LIST_GET: '/api/v1/{client}/{channel}/admin/app',
	    // 后台-获取总数据
	    ADMIN_APP_OPDATA_GET: '/api/v1/{client}/{channel}/admin/app/opdata/total',
	    // 后台-作品首页管理服务
	    ADMIN_APP_HOMEPAGE_POST: '/api/v1/{client}/{channel}/admin/app/homepage/sequence',
	    // 后台-作品审查服务
	    ADMIN_APP_AUDIT_PUT: '/api/v1/{client}/{channel}/admin/app/audit/{audit}/{appid}',
	    // 后台-作品管理服务
	    ADMIN_APP_OP_PUT: '/api/v1/{client}/{channel}/admin/app/op/{operation}/{appid}',

	    // 打赏流水
	    AWARD_LIST_GET: '/api/v1/{client}/{channel}/manager/tips/list/{resId}',

	    /*新增标签*/
	    //删除平台标签
	    PLATFORM_TAGS_DELETE: '/api/v1/{client}/{channel}/platadmin/tags/{id}',

	    //获取平台标签
	    PLATFORM_TAGS_GET: '/api/v1/{client}/{channel}/platadmin/tags/{id}',

	    //平台标签列表服务
	    PLATFORM_TAGS_LIST_GET: '/api/v1/{client}/{channel}/tags/list',

	    //添加平台标签
	    PLATFORM_TAGS_ADD_POST: '/api/v1/{client}/{channel}/platadmin/tags',

	    //修改平台标签
	    PLATFORM_TAGS_MODIFY_POST: '/api/v1/{client}/{channel}/platadmin/tags/{id}',

	    // 平台资源分发
	    PLATFORM_DISTTRIBUTE_GET: '/distribute/entry/{uin}/{openChannel}/{channelUin}/{resType}/{resId}/{pubId}',

	    // 入口URL
	    MALL_ENTRY: '/entry/{uin}/{code}/{channel}',

	    WECHAT_ENTRY: '/api/wechat/entry/{uin}/linkin/{channel}'
	};

	// Buy平台接口列表
	var BUY_API_URLS = {

	    // 积分包列表
	    INTEGRAL_LIST_GET: '/api/v1/{client}/{channel}/manager/integral/list',
	    // 获取积分包详情
	    INTEGRAL_GET: '/api/v1/{client}/{channel}/manager/integral/{id}',
	    // 查看积分资源绑定详情
	    INTEGRAL_RES_GET: '/api/v1/{client}/{channel}/manager/integral/res/{resId}/{id}',

	    // 优惠券列表
	    COUPON_LIST_GET: '/api/v1/{client}/{channel}/manager/coupon/list',

	    // 获取优惠券详情
	    COUPON_GET: '/api/v1/{client}/{channel}/manager/coupon/{id}',

	    // 查看优惠券资源绑定详情
	    COUPON_RES_GET: '/api/v1/{client}/{channel}/manager/coupon/res/{resId}/{id}',

	    //商品列表-资讯适配
	    CONTENT_CHANNEL_PRODUCT_LIST_POST: '/api/v1/{client}/{channel}/manager/product/channel/content/list'
	};

	// 将接口URL加上url前缀
	function resolveApiUrls(platform, urls) {
	    var rootUrl = BASE_URL,
	        currUrl;

	    if (rootUrl) {
	        for (var key in urls) {
	            currUrl = _lkUtils2.default.compileBraceStr(urls[key], {
	                version: 'v1',
	                channel: 'linkin',
	                intercode: 'iloka'
	                // client: 'w2'//(web pc端) // 'w2'(web pc端预览) / 'm'(web 移动端)
	            });

	            API_URLS[key] = rootUrl + '/' + platform + currUrl;
	        }
	    }

	    // 如果是生产环境，图片的获取要指向CDN
	    if (_vveConfigEnv2.default.ENV == 'PRD') {
	        API_URLS['IMAGE_GET'] = 'http://cdn.vveshow.com/api/v1/w1/linkin/media/image/{mediaid}';
	    }
	}

	resolveApiUrls('iloka', ILOKA_API_URLS);

	resolveApiUrls('buy', BUY_API_URLS);

	exports.default = API_URLS;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _vveConfigApis = __webpack_require__(4);

	var _vveConfigApis2 = _interopRequireDefault(_vveConfigApis);

	var _lkHttpUtils = __webpack_require__(8);

	var _lkHttpUtils2 = _interopRequireDefault(_lkHttpUtils);

	var _vveConfigEnv = __webpack_require__(3);

	var _vveConfigEnv2 = _interopRequireDefault(_vveConfigEnv);

	var _lkHttpIntercept = __webpack_require__(27);

	var _lkHttpIntercept2 = _interopRequireDefault(_lkHttpIntercept);

	var _lkUtils = __webpack_require__(2);

	var _lkUtils2 = _interopRequireDefault(_lkUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function get(config, replacer, exceptionHandler) {
	    return ajax('GET', config, replacer, exceptionHandler);
	}

	function put(config, replacer, exceptionHandler) {
	    return ajax('PUT', config, replacer, exceptionHandler);
	}

	function del(config, replacer, exceptionHandler) {
	    return ajax('DELETE', config, replacer, exceptionHandler);
	}

	function post(config, replacer, exceptionHandler) {
	    return ajax('POST', config, replacer, exceptionHandler);
	}

	function ajax(method, config, replacer, exceptionHandler) {
	    return request(_jquery2.default.extend(config, { method: method }), replacer, exceptionHandler);
	}

	/**
	 * @param config           <Object{method, url, params, data, etc}> 请求参数
	 * @param replacer         <Object>   url参数替换对象
	 * @param exceptionHandler <Function> 请求的对请求异常的特殊处理
	 */
	function request(config, replacer, exceptionHandler) {
	    var deferred = _jquery2.default.Deferred();

	    // 获取合并后的参数
	    var opts = _jquery2.default.extend(true, {}, defaults, config);
	    opts.xhrFields = {
	        withCredentials: true
	    };

	    // 生成url
	    opts.url = _lkHttpUtils2.default.generateUrl({
	        url: opts.url,
	        replacer: replacer,
	        params: config.params
	    });

	    // 删除params，因为在generateUrl已经将params与url合并了
	    delete opts.params;

	    // 处理opts.data属性
	    // 如果method为GET，则删除data属性
	    // 将opts.data转换成json格式
	    processData(opts);

	    // 发起请求，并在httpIntercept中对请求的结果做相应的分发
	    (0, _lkHttpIntercept2.default)(_jquery2.default.ajax(opts), deferred, exceptionHandler, 'resJqueryLike');

	    return deferred.promise();
	}

	// 如果method为GET，则删除data属性，否则将opts.data转换成json格式
	function processData(config) {
	    if (config.hasOwnProperty('data')) {
	        if (config.method.toUpperCase() == 'GET') {
	            delete config.data;
	        } else {
	            // 如果不是FormData则转化成JSON数据格式
	            if (!_lkUtils2.default.isFormData(config.data)) {
	                config.data = JSON.stringify(config.data);
	            }
	        }
	    }
	}

	function generateUrl(config, replacer) {
	    // 获取合并后的参数
	    var opts = _jquery2.default.extend({}, config);

	    // 生成url
	    return _lkHttpUtils2.default.generateUrl({
	        url: opts.url,
	        replacer: replacer,
	        params: config.params
	    });
	}

	function getVveImage(imageId) {
	    var imageUrl;

	    var url = '';

	    if (_vveConfigEnv2.default.ENV === 'PRD') {
	        url = 'http://cdn.vveshow.com/api/v1/w1/linkin/media/image/{mediaid}';
	    } else {
	        url = _vveConfigApis2.default['IMAGE_GET'];
	    }

	    if (imageId) {
	        imageUrl = generateUrl({
	            url: url
	        }, {
	            mediaid: imageId
	        });
	    } else {
	        imageUrl = undefined;
	    }

	    return imageUrl;
	}

	function getVveFont(fontId) {
	    var fontUrl;

	    if (fontId) {
	        fontUrl = generateUrl({
	            url: _vveConfigApis2.default['FONT_GET']
	        }, {
	            mediaid: fontId
	        });
	    } else {
	        fontUrl = undefined;
	    }

	    return fontUrl;
	}

	function getVveAudio(audioId) {
	    var audioUrl;

	    if (audioId) {
	        audioUrl = generateUrl({
	            url: _vveConfigApis2.default['AUDIO_GET']
	        }, {
	            mediaid: audioId
	        });
	    } else {
	        audioUrl = undefined;
	    }

	    return audioUrl;
	}

	// http请求的默认参数
	var defaults = {
	    method: 'GET',
	    dataType: 'json',
	    processData: false,
	    contentType: 'application/json; charset=utf-8',
	    headers: {}
	    //  xhrFields: {
	    //    withCredentials: true
	    // }
	};

	exports.default = {
	    getVveImage: getVveImage,
	    getVveAudio: getVveAudio,
	    generateUrl: generateUrl,
	    getVveFont: getVveFont,
	    get: get,
	    put: put,
	    del: del,
	    post: post,
	    request: request
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    ITEM_WIDGET_MODEL: 'widget.model',

	    // 组件类型
	    WIDGET_SUBCLASS_TEXT: 'widget-text',
	    WIDGET_SUBCLASS_IMAGE: 'widget-image',
	    WIDGET_SUBCLASS_SHAPE_LINE_H: 'widget-shape-h-line',
	    WIDGET_SUBCLASS_SHAPE_LINE_V: 'widget-shape-v-line',
	    WIDGET_SUBCLASS_SHAPE_CIRCLE: 'widget-shape-circle',
	    WIDGET_SUBCLASS_SHAPE_RECTANGLE: 'widget-shape-rectangle',
	    WIDGET_SUBCLASS_SHAPE_TRIANGLE: 'widget-shape-triangle',
	    WIDGET_SUBCLASS_SHAPE_POLYGON: 'widget-shape-polygon',
	    WIDGET_SUBCLASS_SHAPE_ELLIPSE: 'widget-shape-ellipse',
	    WIDGET_SUBCLASS_SHAPE_STAR: 'widget-shape-star',
	    WIDGET_SUBCLASS_SHAPE_HEART: 'widget-shape-heart',
	    WIDGET_SUBCLASS_SHAPE_ROUND_RECTANGLE: 'widget-shape-round-rectangle',
	    WIDGET_SUBCLASS_VIDEO: 'widget-video',
	    WIDGET_SUBCLASS_FORM_DATA_SET: 'widget-form-data',

	    SLIDER_HORIZONTAL: 'slide-horizontally',
	    SLIDER_VERTICAL: 'slide-vertically',

	    GLOBAL_COLOR: 'background-global',
	    LOCAL_COLOR: 'background-local',

	    GLOBAL_BACKGROUND_IMAGE: 'background-global',
	    LOCAL_BACKGROUND_IMAGE: 'background-local',

	    // 文字段落方向
	    TEXT_DIRECTION_HORIZONTAL: 'text-direction-horizontal',
	    TEXT_DIRECTION_VERTICAL: 'text-direction-vertical',

	    FORM_FIELD_TYPE_TEXT: 'text',
	    FORM_FIELD_TYPE_NUMERIC: 'numeric',
	    FORM_FIELD_TYPE_EMAIL: 'email',
	    FORM_FIELD_TYPE_MOBILE: 'mobile',
	    FORM_FIELD_TYPE_URL: 'url',
	    FORM_FIELD_TYPE_RADIO: 'radio',
	    FORM_FIELD_TYPE_CHECKBOX: 'checkbox',
	    FORM_FIELD_TYPE_SELECT: 'select',

	    WIDGET_LINK_TAG: 'widget-link-tag',
	    WIDGET_LINK_MODEL: 'widget-link-model',

	    WIDGET_ACTIONS_TAG: 'widget-actions-tag',
	    WIDGET_ACTIONS_MODEL: 'widget-actions-model',

	    WIDGET_VIDEO_TAG: 'widget-video-tag',
	    WIDGET_VIDEO_MODEL: 'widget-video-model',

	    WIDGET_FORM_MODEL: 'widget-form-btn-model',
	    WIDGET_FORM_TAG: 'widget-form-btn-tag',

	    VALID_PAGE_ANIMATION: /external|inner|phone/
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _vveConfigApis = __webpack_require__(4);

	var _vveConfigApis2 = _interopRequireDefault(_vveConfigApis);

	var _lkHttp = __webpack_require__(5);

	var _lkHttp2 = _interopRequireDefault(_lkHttp);

	var _vveMedia = __webpack_require__(16);

	var _vveMedia2 = _interopRequireDefault(_vveMedia);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    getWxconfig: getWxconfig,
	    wxShareCount: wxShareCount,
	    postForm: postForm,
	    getFixedPageConfig: getFixedPageConfig,
	    distributeApp: distributeApp
	};

	/**
	 * 获取微信jssdk配置信息
	 * @return {jQ Promise}
	 */

	function getWxconfig(uin) {
	    var deferred = _jquery2.default.Deferred();

	    _lkHttp2.default.get({
	        contentType: false,
	        url: _vveConfigApis2.default['WX_JS_API_GET'],
	        params: {
	            url: encodeURIComponent(top.location.href)
	        }
	    }, {
	        uin: uin || 'linkin'
	    }).then(function (data) {
	        deferred.resolve(data);
	    }, function (data) {
	        deferred.reject(data);
	    });

	    return deferred.promise();
	}

	/**
	 * 添加微信分享次数到后台
	 * @return {jQ Promise}
	 */
	function wxShareCount(id) {
	    var deferred = _jquery2.default.Deferred();

	    _lkHttp2.default.get({
	        url: _vveConfigApis2.default['COUNT_UNIFY_GET']
	    }, {
	        type: 'forward',
	        code: 'h5',
	        id: id
	    }).then(function (data) {
	        deferred.resolve(data);
	    }, function (data) {
	        deferred.reject(data);
	    });

	    return deferred.promise();
	}

	/**
	 * 提交表单
	 * @return {jQ Promise}
	 */
	function postForm(data) {
	    var deferred = _jquery2.default.Deferred();

	    _lkHttp2.default.post({
	        url: _vveConfigApis2.default['WORKS_FORM_POST'],
	        data: data
	    }, {}, function (data) {
	        deferred.reject(data);
	    }).then(function (data) {
	        deferred.resolve(data);
	    }, function (data) {
	        deferred.reject(data);
	    });

	    return deferred.promise();
	}

	/**
	 * 应用分发
	 *
	 * @return {jQ Promise}
	 */
	function distributeApp(param) {
	    // console.log("=== 在调用分发接口 ===");
	    var deferred = _jquery2.default.Deferred();

	    _lkHttp2.default.get({
	        url: _vveConfigApis2.default['PLATFORM_DISTTRIBUTE_GET']
	    }, param, function (response) {
	        deferred.reject(response);
	    }).then(function (response) {
	        // console.log("==== 接口调用成功 ===");
	        deferred.resolve(response);
	    }, function (response) {
	        deferred.reject(response);
	    });

	    return deferred.promise();
	}

	/**
	 * 修正/格式化page的配置对象
	 * @return {Object} 格式化后的对象
	 */
	function getFixedPageConfig(config) {
	    var model = {},
	        shareInfo = config.shareInfo || {};

	    // 要该作品要加载的图片列表
	    model.imgList = config.imageSet || [];
	    // 是否有音乐
	    model.musicEnabled = !!config.musicEnabled;
	    // 音乐url
	    model.musicUrl = config.musicUrl;
	    // 页面是横向还是纵向滑动的
	    model.slideVertical = config.slideVertical;
	    // 作品名称
	    model.appName = config.appName || '艾乐卡';

	    // 作品分享信息
	    model.shareInfo = {
	        title: shareInfo.title || '',
	        desc: shareInfo.desc || '',
	        imgUrl: _vveMedia2.default.shareImage(shareInfo.imgId).url
	    };
	    // 作品表单信息
	    model.formData = config.formData;
	    // 当前页进入完成
	    model.onPageIn = config.onPageIn || _jquery2.default.noop;
	    // 当前页退出完成
	    model.onPageOut = config.onPageOut || _jquery2.default.noop;
	    // 页面动画配置对象
	    model.pageAnimations = config.animationSet;

	    // 应用数据模型
	    model.appModel = config.appModel;

	    return model;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _lkUtils = __webpack_require__(2);

	var _lkUtils2 = _interopRequireDefault(_lkUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// api url中要默认替换的值
	var defautReplacer = {
	    client: 'w1'
	};

	function generateUrl(config) {
	    var url = config.url;

	    var replacer = _jquery2.default.extend({}, defautReplacer, config.replacer);

	    url = _lkUtils2.default.compileBraceStr(url, replacer);

	    url = _lkUtils2.default.urlSerialize(url, config.params);

	    return url;
	}

	exports.default = {
	    generateUrl: generateUrl
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lkUtils = __webpack_require__(2);

	var _lkUtils2 = _interopRequireDefault(_lkUtils);

	var _vveConfigApis = __webpack_require__(4);

	var _vveConfigApis2 = _interopRequireDefault(_vveConfigApis);

	var _vveConfigConstants = __webpack_require__(13);

	var _vveConfigConstants2 = _interopRequireDefault(_vveConfigConstants);

	var _vveConfigEnv = __webpack_require__(3);

	var _vveConfigEnv2 = _interopRequireDefault(_vveConfigEnv);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// configEnv

	var BUY_ENTRY_CODE = _vveConfigConstants2.default.BUY_ENTRY_CODE;
	var PACKET_TYPE = _vveConfigConstants2.default.PACKET_TYPE;

	// 获取入口地址  { uin, code, url }
	// /entry/{uin}/{code}/{channel}
	function getBuyEntryUrl(params) {
	    if (!params.uin) {
	        return '';
	    }

	    var url = _lkUtils2.default.compileBraceStr(_vveConfigApis2.default['MALL_ENTRY'], params);

	    url = _lkUtils2.default.urlSerialize(url, {
	        origid: params.origid,
	        url: params.url ? encodeURIComponent(params.url) : null
	    });

	    return url;
	}

	// 获取活动链接
	function getActivityUrl(uin, params) {
	    var type = params.type;

	    if (type == 'h5') {
	        var mobileUrlBase = _vveConfigEnv2.default.parseUrl('/mobile.html');
	        return _lkUtils2.default.urlSerialize(mobileUrlBase, {
	            id: params.id
	        });
	    } else if (params.url) {
	        return params.url;
	    }

	    return '';
	}

	// 获取一键导购的地址
	function getProductGuideUrl(uin, params, paramObject) {
	    var type = params.type;
	    if (params.url) {
	        return params.url;
	    }
	    switch (type) {
	        case 'product':
	            if (params.buyType == 'mall') {
	                return getMallProductShowUrl(uin, params.id, paramObject);
	            }

	            if (params.buyType == 'yyg') {
	                return getYygProductShowUrl(uin, params.id, paramObject);
	            }
	            break;
	        case 'mall':
	            return getMallIndexUrl(uin);
	        case 'yyg':
	            return getYygIndexUrl(uin);
	    }
	    return '';
	}

	function getWechatEntry(uin) {
	    if (!uin) {
	        return '';
	    }

	    return _lkUtils2.default.compileBraceStr(_vveConfigApis2.default['WECHAT_ENTRY'], {
	        uin: uin
	    });
	}

	// 获取商城入口
	// http://api.sit.vveshow.com/buy/entry/dev/mall/linkin
	function getMallIndexUrl(uin) {
	    return getBuyEntryUrl({
	        uin: uin,
	        code: BUY_ENTRY_CODE.MALL
	    });
	}

	// 获取一元购入口
	// http://api.sit.vveshow.com/buy/entry/dev/yyg/linkin
	function getYygIndexUrl(uin) {
	    return getBuyEntryUrl({
	        uin: uin,
	        code: BUY_ENTRY_CODE.YYG
	    });
	}

	// 获取商城商品详情
	// http://api.sit.vveshow.com/buy/entry/dev/customize/linkin?url=#!/product/show/57b41bc20f93d5223998d52f
	function getMallProductShowUrl(uin, id, paramObject) {
	    if (!id) {
	        return '';
	    }
	    var url = _lkUtils2.default.compileBraceStr('#!/product/show/{id}', { id: id });

	    url = url + '?resType=' + paramObject.resType + '&resId=' + paramObject.resId;

	    return getBuyEntryUrl({
	        uin: uin,
	        code: BUY_ENTRY_CODE.CUSTOMIZE,
	        url: url
	    });
	}

	// 获取一元购商品详情
	// http://api.sit.vveshow.com/buy/entry/dev/yyg/linkin?url=/product/show/57c14f380f93d52c67612b01
	function getYygProductShowUrl(uin, id, paramObject) {
	    if (!id) {
	        return '';
	    }
	    var url = _lkUtils2.default.compileBraceStr('/product/show/{id}', { id: id });

	    url = url + '?resType=' + paramObject.resType + '&resId=' + paramObject.resId;

	    return getBuyEntryUrl({
	        uin: uin,
	        code: BUY_ENTRY_CODE.YYG,
	        url: url,
	        resType: paramObject.resType,
	        resId: paramObject.resId
	    });
	}

	// 获取资讯列表入口
	// http://api.sit.vveshow.com/buy/entry/dev/content/linkin
	function getContentIndexUrl(uin) {
	    return getBuyEntryUrl({
	        uin: uin,
	        code: BUY_ENTRY_CODE.CONTENT
	    });
	}

	// 获取资讯详情
	// http://api.sit.vveshow.com/buy/entry/dev/content/linkin?url=/show/57bbe82a0f93d55937bbe7b5
	function getContentShowUrl(uin, id) {
	    if (!id) {
	        return '';
	    }
	    var url = _lkUtils2.default.compileBraceStr('/show/{id}', { id: id });
	    return getBuyEntryUrl({
	        uin: uin,
	        code: BUY_ENTRY_CODE.CONTENT,
	        url: url
	    });
	}

	// 获取资讯预览
	// http://api.sit.vveshow.com/buy/entry/dev/content/linkin?url=/show/57bbe82a0f93d55937bbe7b5
	function getContentPreviewUrl(uin, id) {
	    if (!id) {
	        return '';
	    }
	    var url = _lkUtils2.default.compileBraceStr('/preview/{id}', { id: id });
	    return getBuyEntryUrl({
	        uin: uin,
	        code: BUY_ENTRY_CODE.CONTENT,
	        url: url
	    });
	}

	// 获取打赏入口
	// http://api.sit.vveshow.com/buy/entry/dev/customize/linkin?url=#!/tips?resId=57a5cd480f93d53025a77f63&resType=content
	function getTipsUrl(uin, resId, resType) {
	    if (!resId || !resType) {
	        return '';
	    }
	    var url = _lkUtils2.default.urlSerialize('#!/tips', { resId: resId, resType: resType });
	    return getBuyEntryUrl({
	        uin: uin,
	        code: BUY_ENTRY_CODE.CUSTOMIZE,
	        url: url
	    });
	}

	// 获取红包入口 // integral coupon
	// packet = {resId, type, id}
	function getPacketUrl(uin, packet) {
	    // http://api.sit.vveshow.com/buy/entry/dev/customize/linkin?url=#!/packet?integralId=57bbe7980f93d55937e4825d&resId=57bbe82a0f93d55937bbe7b5
	    // http://api.sit.vveshow.com/buy/entry/dev/customize/linkin?url=#!/packet?couponId=57bb011a0f93d55937e47183&resId=57bb01350f93d55937bbe433
	    if (packet.url) {
	        return packet.url;
	    }

	    var params = {
	        resId: packet.resId,
	        resType: 'H5'
	    };

	    switch (packet.type) {
	        default:
	            return '';
	        case PACKET_TYPE.COUPON:
	            params.couponId = packet.id;
	            break;
	        case PACKET_TYPE.INTEGRAL:
	            params.integralId = packet.id;
	            break;
	        case PACKET_TYPE.LINK:
	            return packet.url;
	    }

	    var url = _lkUtils2.default.urlSerialize('#!/packet', params);

	    return getBuyEntryUrl({
	        uin: uin,
	        code: BUY_ENTRY_CODE.CUSTOMIZE,
	        url: url
	    });
	}

	//* 创建作品 /editor.html#/?operation=create
	//* 修改作品 /editor.html#/?operation=modify&id=[作品id]
	//* 使用模板创建作品 /editor.html#/?operation=use&id=[模板id]

	//* 创建模板 /editor.html#/?operation=create&type=template
	//* 修改模板 /editor.html#/?operation=modify&type=template&id=[模板id]
	//* 使用作品创建模板 /editor.html#/?operation=use&type=template&id=[作品id]
	function getEditorUrl(opts) {
	    return _lkUtils2.default.urlSerialize('/editor.html#/', opts);
	}

	exports.default = {
	    getBuyEntryUrl: getBuyEntryUrl,
	    getActivityUrl: getActivityUrl,
	    getProductGuideUrl: getProductGuideUrl,
	    getWechatEntry: getWechatEntry,
	    getMallIndexUrl: getMallIndexUrl,
	    getYygIndexUrl: getYygIndexUrl,
	    getContentIndexUrl: getContentIndexUrl,
	    getContentShowUrl: getContentShowUrl,
	    getContentPreviewUrl: getContentPreviewUrl,
	    getMallProductShowUrl: getMallProductShowUrl,
	    getYygProductShowUrl: getYygProductShowUrl,
	    getTipsUrl: getTipsUrl,
	    getPacketUrl: getPacketUrl,
	    getEditorUrl: getEditorUrl
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var tpls = {
	    normal: '<div class="vve-display-tip">\
	                        <div class="vve-display-tip-wp vve-display-tip-body">\
	                            <div class="vve-display-tip-msg">{{msg}}</div>\
	                            <div class="vve-display-tip-btns">\
	                                <div class="vve-display-tip-btn vve-display-tip-cancel">取消</div>\
	                                <div class="vve-display-tip-btn vve-display-tip-confirm">确定</div>\
	                            </div>\
	                        </div>\
	                    </div>',

	    fullscreen: '<div class="vve-display-tip">\
	                            <div class="vve-display-tip-wp vve-display-tip-full">\
	                                {{msg}}\
	                            </div>\
	                        </div>'
	};

	// notify default options
	var defaults = {
	    tplName: 'normal',
	    msg: '', // string
	    documentClose: false,
	    duration: 0, // boolean | millisecond
	    callbackClose: false, // boolean | function
	    callbackOpen: false, // boolean | function
	    callbackCancel: false, // boolean | function
	    callbackConfirm: false, // boolean | function
	    container: 'body'
	};

	_jquery2.default.extend(Notify.prototype, {
	    show: show,
	    mergeOptions: mergeOptions,
	    appendToBody: appendToBody,
	    documentClickCloseEvent: documentClickCloseEvent,
	    bindBtnClickEvent: bindBtnClickEvent,
	    getHtml: getHtml,
	    close: close
	});

	_jquery2.default.extend(Popup.prototype, {
	    loading: loading,
	    alert: alert,
	    confirm: confirm,
	    tip: tip,
	    showMsg: showMsg
	});

	exports.default = Popup;

	// Popup class

	function Popup(container) {
	    var t = this;

	    t.container = container ? (0, _jquery2.default)(container) : (0, _jquery2.default)('body');
	}

	/***
	 * TODO 需要确认一下msg的用法
	 * 异步操作时的loading
	 * @param msg 提示信息
	 */
	function loading(msg) {
	    var t = this;

	    var loadingImgSrc = (0, _jquery2.default)('.vve-display-loading-wp img').attr('src'),
	        loadingImgHtml = '<img src=' + loadingImgSrc + ' width="50%"  height: "50%">';

	    msg = loadingImgHtml + '<br />' + msg;

	    var p = t.tip({
	        msg: msg
	    });

	    p.elem.find('.vve-display-tip-body').css({
	        backgroundColor: 'transparent',
	        color: '#fff'
	    });

	    return p;
	}

	// 提示信息
	function showMsg(msg) {
	    var t = this;

	    return t.tip({
	        msg: msg
	    });
	}

	// 提示信息
	function alert(msg) {
	    var t = this;

	    return t.tip({
	        msg: msg,
	        duration: 1000
	    });
	}

	// 对话框
	function confirm(msg, fnConfirm, fnCancel) {
	    var t = this;

	    return t.tip({
	        msg: msg,
	        callbackCancel: fnCancel,
	        callbackConfirm: fnConfirm
	    });
	}

	// 底层的popup
	function tip(options) {
	    var t = this;

	    var notify = new Notify();

	    options = _jquery2.default.extend({
	        container: t.container
	    }, options);

	    notify.show(options);

	    return notify;
	}

	// Notify class
	function Notify() {
	    this.opts = null;
	    this.elem = null;
	}

	function show(options) {
	    this.mergeOptions(options);
	    this.appendToBody();
	}

	function mergeOptions(options) {
	    var t = this;

	    t.opts = _jquery2.default.extend({}, defaults, options);
	}

	function appendToBody() {
	    var t = this,
	        opts = this.opts;

	    t.elem = (0, _jquery2.default)(t.getHtml()).hide().appendTo((0, _jquery2.default)(opts.container)).fadeIn(400, function () {
	        _jquery2.default.isFunction(opts.callbackOpen) && opts.callbackOpen();

	        if (opts.duration) {
	            setTimeout(function () {
	                t.close();
	            }, opts.duration);
	        }
	    });

	    t.bindBtnClickEvent(t.elem);
	    t.documentClickCloseEvent(t.elem);
	}

	function documentClickCloseEvent(tipContiner) {
	    var t = this,
	        opts = this.opts;

	    if (opts.documentClose) {
	        tipContiner.click(function () {
	            t.close();
	        });

	        tipContiner.find('.vve-display-tip-wp').click(function (e) {
	            e.stopPropagation();
	        });
	    }
	}

	function bindBtnClickEvent(tipContiner) {
	    var t = this,
	        opts = this.opts;

	    var fnCancel = opts.callbackCancel,
	        fnConfirm = opts.callbackConfirm;

	    var btns = tipContiner.find('.vve-display-tip-btns'),
	        btnCancel = tipContiner.find('.vve-display-tip-cancel'),
	        btnConfirm = tipContiner.find('.vve-display-tip-confirm');

	    // 隐藏按钮
	    if (!fnCancel && !fnConfirm) {
	        btns.hide();
	    }

	    // 绑定和控制cancel按钮的显示
	    if (fnCancel && _jquery2.default.isFunction(fnCancel)) {
	        btnCancel.click(function () {
	            t.close();
	            fnCancel();
	        });
	    } else {
	        btnCancel.remove();
	    }

	    // 绑定和控制comfirm按钮的显示
	    if (fnConfirm && _jquery2.default.isFunction(fnConfirm)) {
	        btnConfirm.click(function () {
	            t.close();
	            fnConfirm();
	        });
	    } else {
	        btnConfirm.remove();
	    }
	}

	function getHtml() {
	    var t = this;

	    var tpl,
	        tplName = t.opts.tplName;

	    if (typeof tplName === 'string' && tpls[tplName]) {
	        tpl = tpls[tplName];
	    } else {
	        tpl = tpls['normal'];
	    }

	    return tpl.replace('{{msg}}', t.opts.msg);
	}

	function close() {
	    var t = this,
	        opts = this.opts;

	    t.elem.stop(true, false).fadeOut(400, function () {
	        // remove element
	        t.elem.remove();

	        // 执行close回调
	        _jquery2.default.isFunction(opts.callbackClose) && opts.callbackClose();
	    });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vveConfigEnv = __webpack_require__(3);

	var _vveConfigEnv2 = _interopRequireDefault(_vveConfigEnv);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 获取看框架模板
	function getFrame() {
	    var templateFrame = '<div class="vve-display-stage"></div>\
	         <div class="vve-display-arrow vve-display-arrow-down"></div>\
	         <div class="vve-display-arrow vve-display-arrow-right"></div>\
	         <div class="vve-display-loading">\
	             <div class="vve-display-loading-wp">\
	                 <!--<img src="{ROOT_URL}/style/display/img/display-icon-loading.gif">-->\
	                 <div class="vve-display-loading-gif"></div>\
	                 <div class="vve-display-loading-percent">0%</div>\
	             </div>\
	             <div class="vve-display-loading-copyright">iloka.me 制作</div>\
	         </div>';

	    return compileUrl(templateFrame);
	}

	function getMusicPlayer() {
	    return '\
	                <div class="vve-display-music">\
	                    <div class="vve-display-music-icon"></div>\
	                    <div class="vve-display-music-loading">loading</div>\
	                </div>';
	}

	// 将url占位符替换成具体的路径
	function compileUrl(template) {
	    return template.replace(/\{ROOT_URL\}/g, _vveConfigEnv2.default.ROOT_URL);
	}

	exports.default = {
	    frame: getFrame(),
	    musicPlayer: getMusicPlayer()
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    setViewportScale: setViewportScale,
	    getViewport: getViewport,
	    setMiddle: setMiddle
	};


	function setViewportScale(viewportId, pageWidth, pageHeight) {
	    var viewport = document.getElementById(viewportId);
	    var viewportSize = getViewport();

	    var viewportWidth = viewportSize.width,
	        viewportHeight = viewportSize.height,
	        winRatio = viewportWidth / viewportHeight;

	    var pageRatio = pageWidth / pageHeight,
	        scale = 1;

	    var viewportContent;

	    if (winRatio > pageRatio) {
	        scale = viewportHeight / pageHeight;
	    } else {
	        scale = viewportWidth / pageWidth;
	    }

	    viewportContent = 'width={pageWidth}, initial-scale={scale}, maximum-scale={scale}, user-scalable=no'.replace('{pageWidth}', pageWidth).replace(/{scale}/g, scale);

	    viewport.setAttribute('content', viewportContent);
	}

	function setMiddle(elem) {
	    var height = elem.outerHeight(),
	        viewportHeight = getViewport().height;

	    elem.css({
	        marginTop: (viewportHeight - height) / 2
	    });
	}

	function getViewport() {
	    var viewportWidth;
	    var viewportHeight;

	    viewportWidth = document.documentElement.clientWidth;
	    viewportHeight = document.documentElement.clientHeight;

	    return {
	        width: viewportWidth,
	        height: viewportHeight
	    };
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var CONSTANTS = {
	    // 角色等级
	    ROLE: {
	        // 游客
	        VISITOR: 0,
	        // 会员
	        MEMBER: 10,
	        // 用户
	        USER: 20,
	        // 运营
	        MANAGER: 30,
	        // 管理
	        ADMIN: 40,
	        // 运维
	        PLATFORM: 50
	    },
	    // 作品编辑类型
	    EDITOR_TYPE: {
	        // 主编辑器
	        MAIN: 'main',
	        // 迷你编辑器
	        MINI: 'mini'
	    },
	    // 作品资源类型
	    RES_TYPE: {
	        // H5作品
	        H5: 'h5',
	        // 资讯内容作品
	        CONTENT: 'content',
	        // 商品
	        PRODUCT: 'product',
	        // 互动游戏
	        INTERACT: 'interact',
	        // 外部链接
	        LINKS: 'links'
	    },
	    // 媒体文件类型
	    MEDIA_RES_TYPE: {
	        // 通用
	        RES: 'res',
	        // 红包
	        REDENVELOPE: 'redenvelope'
	    },
	    // 商城入口Code
	    BUY_ENTRY_CODE: {
	        // 主页
	        HOME: 'home',
	        // 一元购
	        YYG: 'yyg',
	        // 商城
	        MALL: 'mall',
	        // 资讯
	        CONTENT: 'content',
	        // 会员中心
	        MEMBER: 'member',
	        // 自定义
	        CUSTOMIZE: 'customize'
	    },
	    // 红包类型
	    PACKET_TYPE: {
	        // 优惠券
	        COUPON: 'coupon',
	        // 积分
	        INTEGRAL: 'integral',
	        // 外链
	        LINK: 'link'
	    },
	    // 迷你编辑器，编辑模式
	    OEM_EDIT_MODE: {
	        INTERAL: 'internal',
	        EXTERNAL: 'external'
	    },
	    BASIC_SERVICE: {
	        // 职业专长
	        METIER: 'metier',
	        // 秀场分类
	        WESHOW_CATEGORY: 'weShowCategory',
	        // 秀场标签
	        TAG: 'tag',
	        // 渠道
	        CHANNEL: 'channel'
	    },
	    BULKTYPE: {
	        SIGNATURE: 'signature'
	    }
	};

	exports.default = {
	    CONSTANTS: CONSTANTS
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {

	    // 还原图片的完整路径
	    var baseUrl = _vveConfigEnv2.default.ROOT_URL + BASE_URL;

	    for (var key in IMAGES) {
	        IMAGES[key] = baseUrl + IMAGES[key];
	    }

	    return IMAGES;
	};

	var _vveConfigEnv = __webpack_require__(3);

	var _vveConfigEnv2 = _interopRequireDefault(_vveConfigEnv);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BASE_URL = '/resource/img/';

	var IMAGES = {

	    // 应用默认封面图片
	    APP_COVER_DEFAULT: 'common/cover.png',

	    // 应用分享默认图片
	    APP_SHARE_DEFAULT: 'common/cover.png',

	    // 用户默认头像
	    USER_HEAD_IMAGE: 'common/portrait.png',

	    // pc端预览视频的占位图片
	    VIDEO_PLACEHOLDER: 'editor/video-placeholder.jpg',

	    // 首页banner图片
	    HOME_BANNER_PIC1: 'home/home-banner-1.jpg',
	    HOME_BANNER_PIC2: 'home/home-banner-2.jpg',
	    HOME_BANNER_PIC3: 'home/home-banner-3.jpg'

	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _lkUtils = __webpack_require__(2);

	var _lkUtils2 = _interopRequireDefault(_lkUtils);

	var _lkFixWx = __webpack_require__(26);

	var _lkFixWx2 = _interopRequireDefault(_lkFixWx);

	var _vveUrl = __webpack_require__(9);

	var _vveUrl2 = _interopRequireDefault(_vveUrl);

	var _vveDisplayRender = __webpack_require__(23);

	var _vveDisplayRender2 = _interopRequireDefault(_vveDisplayRender);

	var _vveDisplayTemplate = __webpack_require__(11);

	var _vveDisplayTemplate2 = _interopRequireDefault(_vveDisplayTemplate);

	var _vveDisplayLoading = __webpack_require__(20);

	var _vveDisplayLoading2 = _interopRequireDefault(_vveDisplayLoading);

	var _vveDisplayShow = __webpack_require__(24);

	var _vveDisplayShow2 = _interopRequireDefault(_vveDisplayShow);

	var _vveDisplayViewport = __webpack_require__(12);

	var _vveDisplayViewport2 = _interopRequireDefault(_vveDisplayViewport);

	var _vveDisplayJssdk = __webpack_require__(19);

	var _vveDisplayJssdk2 = _interopRequireDefault(_vveDisplayJssdk);

	var _vveDisplayModel = __webpack_require__(7);

	var _vveDisplayModel2 = _interopRequireDefault(_vveDisplayModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 配置require
	// require.config(window.configRequire);


	//TODO:参数解析

	// 应用id ?id={id}&mode=&openChannel&channelUin&resType&pubId

	// 作品详情 mobile.html?id={id}

	// 预览作品 mobile.html?id={id}&mode=previewApp

	// 预览模板 mobile.html?id={id}&mode=previewTpl


	var params = _jquery2.default.extend({
	    mode: 'show'
	}, _lkUtils2.default.urlUnserialize(location.href));

	params.resId = params.id;

	var appId = params.id;
	var mode = params.mode;
	var openChannel = params.openChannel;
	var channelUin = params.channelUin;
	var resType = params.resType;
	var pubId = params.pubId;

	//TODO:待优化
	window.paramObject = params;

	// TODO:作品分发
	if (params.mode == 'show' && params.openChannel && params.channelUin && params.resType && params.pubId) {
	    _vveDisplayModel2.default.distributeApp(params).then(function () {
	        //console.log("分发接口调用成功");
	    }, function () {
	        //console.log("分发接口调用失败");
	    });
	}

	/**
	 * 判定是否微信浏览器
	 * @returns {boolean}
	 */
	function isWeiXin() {
	    var ua = window.navigator.userAgent.toLowerCase();
	    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
	        return true;
	    } else {
	        return false;
	    }
	}

	(0, _jquery2.default)(function () {
	    // 初始化页面结构
	    var previewContainer = (0, _jquery2.default)('body');
	    previewContainer.html(_vveDisplayTemplate2.default.frame);
	    var previewStage = previewContainer.find('.vve-display-stage');
	    // 设置viewport缩放以适配
	    _vveDisplayViewport2.default.setViewportScale('viewport', 320, 486);

	    // 加载应用数据模型，并渲染到页面
	    _vveDisplayRender2.default.loadPageData({
	        loadType: 'display',
	        container: previewStage,

	        appId: appId,
	        mode: params.mode,

	        callbackSuccess: function callbackSuccess(data, options) {
	            // data: 从后台拿到的数据; options：需要的数据

	            var pageConfig = _vveDisplayModel2.default.getFixedPageConfig(options),
	                // 格式化数据
	            shareInfo = pageConfig.shareInfo;

	            // 传递给应用的worksId和uin用于营销插件业务处理
	            var appId = data.data.id;
	            var uin = data.data.uin;
	            var thisLink = encodeURIComponent(location.href + '&shareKey=' + data.data.shareKey);
	            var shareLink = '';

	            //let entry = "http://api.dev.vveshow.com/iloka/api/wechat/entry/zmind1/linkin/linkin";

	            var entry = _vveUrl2.default.getWechatEntry(uin);

	            if (channelUin !== undefined && channelUin !== '') {
	                shareLink = entry + '?appId=' + appId + '&url=' + thisLink;
	            } else {
	                shareLink = entry + '?url=' + thisLink;
	            }

	            var loadingWorks = function loadingWorks() {
	                // 图片预加载
	                (0, _vveDisplayLoading2.default)({
	                    previewContainer: previewContainer,
	                    imgList: pageConfig.imgList,
	                    callback: function callback() {
	                        // 将preview-layer-wp垂直居中
	                        _vveDisplayViewport2.default.setMiddle((0, _jquery2.default)('.vve-display-layer-wp'));
	                        // 设置文档标题为当前应用的标题
	                        _lkFixWx2.default.setTitle(pageConfig.appName);
	                        // 页面展示渲染
	                        new _vveDisplayShow2.default({
	                            uin: uin,
	                            appId: appId,
	                            isLockedMode: true,
	                            isPc: false,
	                            previewContainer: previewContainer,
	                            linkEnabled: true,
	                            formData: pageConfig.formData,
	                            musicEnabled: pageConfig.musicEnabled,
	                            musicUrl: pageConfig.musicUrl,
	                            isVertical: pageConfig.slideVertical,
	                            disableDocumentMove: false,
	                            disableHashchange: true,
	                            pageAnimations: pageConfig.pageAnimations,
	                            onPageIn: pageConfig.onPageIn,
	                            onPageOut: pageConfig.onPageOut
	                        });
	                    }
	                });
	            };

	            if (isWeiXin()) {
	                _vveDisplayJssdk2.default.share({
	                    uin: uin,
	                    title: shareInfo.title,
	                    description: shareInfo.desc,
	                    link: shareLink,
	                    imgUrl: shareInfo.imgUrl,
	                    type: 'link',
	                    dataUrl: '',
	                    success: function success() {
	                        _vveDisplayModel2.default.wxShareCount(appId);
	                    },
	                    cancel: function cancel() {
	                        throw new Error('微信初始化接口失败!');
	                    },
	                    done: function done() {
	                        loadingWorks();
	                    }
	                });
	            } else {
	                loadingWorks();
	            }
	        }
	    });
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lkHttp = __webpack_require__(5);

	var _lkHttp2 = _interopRequireDefault(_lkHttp);

	var _vveConfigImages = __webpack_require__(14);

	var _vveConfigImages2 = _interopRequireDefault(_vveConfigImages);

	var _vveConfigApis = __webpack_require__(4);

	var _vveConfigApis2 = _interopRequireDefault(_vveConfigApis);

	var _lkHttpUtils = __webpack_require__(8);

	var _lkHttpUtils2 = _interopRequireDefault(_lkHttpUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    image: image,
	    audio: audio,
	    headImage: headImage,
	    coverImage: coverImage,
	    shareImage: shareImage,
	    qrcodeImage: qrcodeImage
	};

	// ## Schema ##
	// {
	//     id: '56303fc6f0a7281e5c269b63',
	//     url: 'http://192.168.16.188:8080/vveshow/api/v1/w1/linkin/media/image/56303fc6f0a7281e5c269b63'
	// }

	function image(imageId) {

	    var vm = {};

	    if (!imageId) {
	        return vm;
	    }

	    // image id
	    vm.id = imageId;

	    // image url
	    vm.url = _lkHttp2.default.getVveImage(imageId);

	    return vm;
	}

	// ## Schema ##
	// {
	//     id: '56303fc6f0a7281e5c269b63',
	//     url: 'http://192.168.16.188:8080/vveshow/api/v1/w1/linkin/media/image/56303fc6f0a7281e5c269b63'
	// }
	function audio(audioId) {

	    var vm = {};

	    // audio id
	    vm.id = audioId;

	    // audio url
	    vm.url = _lkHttp2.default.getVveAudio(audioId);

	    return vm;
	}

	// ## Schema ##
	// {
	//     id: '56303fc6f0a7281e5c269b63',
	//     url: 'http://192.168.16.188:8080/vveshow/api/v1/w1/linkin/media/image/56303fc6f0a7281e5c269b63'
	// }
	// or
	// {
	//     id: undefined,
	//     url: 'local default head image'
	// }
	function headImage(imageId) {
	    var vm = {};

	    // image id
	    vm.id = imageId ? imageId : undefined;

	    // image url
	    if (imageId) {
	        vm.url = _lkHttp2.default.getVveImage(imageId);
	    } else {
	        vm.url = _vveConfigImages2.default['USER_HEAD_IMAGE'];
	    }

	    return vm;
	}

	// ## Schema ##
	// {
	//     id: '56303fc6f0a7281e5c269b63',
	//     url: 'http://192.168.16.188:8080/vveshow/api/v1/w1/linkin/media/image/56303fc6f0a7281e5c269b63'
	// }
	// or
	// {
	//     id: undefined,
	//     url: 'local default cover image'
	// }
	function coverImage(imageId) {
	    var vm = {};

	    // image id
	    vm.id = imageId ? imageId : undefined;

	    // image url
	    if (imageId) {
	        vm.url = _lkHttp2.default.getVveImage(imageId);
	    } else {
	        vm.url = _vveConfigImages2.default['APP_COVER_DEFAULT'];
	    }

	    return vm;
	}

	// ## Schema ##
	// {
	//     id: '56303fc6f0a7281e5c269b63',
	//     url: 'http://192.168.16.188:8080/vveshow/api/v1/w1/linkin/media/image/56303fc6f0a7281e5c269b63'
	// }
	// or
	// {
	//     id: undefined,
	//     url: 'local default share image'
	// }
	function shareImage(imageId) {
	    var vm = {};

	    // image id
	    vm.id = imageId ? imageId : undefined;

	    // image url
	    if (imageId) {
	        vm.url = _lkHttp2.default.getVveImage(imageId);
	    } else {
	        vm.url = _vveConfigImages2.default['APP_SHARE_DEFAULT'];
	    }

	    return vm;
	}

	// ## params ##
	// {
	//     width: 218,
	//     height: 218,
	//     content: 'http://www.vveshow.com'
	// }
	// ## Schema ##
	// {
	//     content: 'http://www.vveshow.com',
	//     url: 'http://192.168.16.188:8080/vveshow/api/v1/{client}/{channel}/media/qrcode/218/218?content=http%3A%2F%2Fwww.vveshow.com'
	// }
	function qrcodeImage(config) {
	    var vm = {};

	    var width = config.width || 218,
	        height = config.height || 218;

	    // content
	    vm.content = config.content || '';

	    // url
	    vm.url = _lkHttpUtils2.default.generateUrl({
	        url: _vveConfigApis2.default['QRCODE_GET'],
	        replacer: {
	            width: width,
	            height: height
	        },
	        params: {
	            content: vm.content
	        }
	    });

	    return vm;
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _vveConfigImages = __webpack_require__(14);

	var _vveConfigImages2 = _interopRequireDefault(_vveConfigImages);

	var _vveDisplayConstants = __webpack_require__(6);

	var _vveDisplayConstants2 = _interopRequireDefault(_vveDisplayConstants);

	var _lkHttp = __webpack_require__(5);

	var _lkHttp2 = _interopRequireDefault(_lkHttp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 扩展jquery插件
	_jquery2.default.fn.extend({
	    mobileSetbackgroundcolor: function mobileSetbackgroundcolor(color) {
	        (0, _jquery2.default)(this).css({
	            'background-color': color
	        });
	    },
	    mobileDecoratetext: function mobileDecoratetext() {
	        var $widget = (0, _jquery2.default)(this);
	        var model = $widget.mobileGetmodel();

	        $widget.addClass('mobile-widget');

	        var shadowString = model.shadowColor + ' ' + model.shadowSize + 'px ' + model.shadowSize + 'px ' + model.blurSize + 'px';

	        var $text = (0, _jquery2.default)('<div>', {
	            class: 'animation-ghost'
	        });
	        $text.html(model.text);
	        $text.addClass('mobile-widget-content');
	        $text.addClass('mobile-widget-content-text');
	        $widget.append($text);

	        var textStyle = {
	            'color': model.textColor,
	            'font-size': model.fontSize + 'px',
	            'font-style': model.fontStyle,
	            'text-align': model.textAlign,
	            'font-weight': model.fontWeight,
	            'text-decoration': model.textDecoration,
	            'line-height': model.textLineHeight + 'px',
	            'letter-spacing': model.letterSpace,
	            'z-index': model.zIndex,
	            'border-radius': model.borderRadius + 'px',
	            'border-color': model.borderColor,
	            'border-style': model.borderStyle,
	            'border-width': model.borderWidth + 'px',
	            'box-shadow': shadowString
	        };

	        if (model.fontFamily !== undefined) {
	            if (model.fontfamily === 'none') {
	                textStyle = '"微软雅黑",Helvetica,sans-serif,arial';
	            } else {
	                textStyle['font-family'] = model.fontFamily;
	            }
	        }

	        var widgetStyle = {
	            'top': model.position.top + 'px',
	            'left': model.position.left + 'px',
	            'width': model.size.width + 'px',
	            'height': model.size.height + 'px',
	            'transform': 'rotate(' + model.rotation + 'deg)',
	            // 'transform': 'rotate(' + model.rotation + 'deg) translateZ(0px)',
	            'z-index': model.zIndex
	        };

	        if (model.textDirection == _vveDisplayConstants2.default.TEXT_DIRECTION_HORIZONTAL) {
	            textStyle['writing-mode'] = 'lr-tb';
	            textStyle['-webkit-writing-mode'] = 'horizontal-tb';
	        } else {
	            textStyle['writing-mode'] = 'tb-rl';
	            textStyle['-webkit-writing-mode'] = 'vertical-rl';
	        }
	        $text.css(textStyle);

	        $widget.css(widgetStyle);
	    },
	    mobileDecorateshape: function mobileDecorateshape(resource) {
	        var $widget = (0, _jquery2.default)(this);
	        var model = $widget.mobileGetmodel();

	        $widget.addClass('mobile-widget');

	        var shadowString = model.shadowColor + ' ' + model.shadowSize + 'px ' + model.shadowSize + 'px ' + model.blurSize + 'px';

	        var $image = (0, _jquery2.default)('<img>', {
	            src: resource
	        });
	        $image.addClass('mobile-widget-content');
	        $image.addClass('mobile-widget-content-shape');
	        $image.css({
	            position: 'absolute',
	            left: 0,
	            top: 0,
	            width: '100%',
	            height: '100%'
	        });
	        $image.appendTo($widget);

	        $widget.css({
	            'top': model.position.top + 'px',
	            'left': model.position.left + 'px',
	            'width': model.size.width + 'px',
	            'height': model.size.height + 'px',
	            'background-size': '100% 100%',
	            //'background-image': 'url(' + resource + ')',
	            'transform': 'rotate(' + model.rotation + 'deg)',
	            // 'transform': 'rotate(' + model.rotation + 'deg) translateZ(0px)',
	            'opacity': model.opacity,
	            'z-index': model.zIndex,
	            'border-radius': model.borderRadius + 'px',
	            'border-color': model.borderColor,
	            'border-style': model.borderStyle,
	            'border-width': model.borderWidth + 'px',
	            'box-shadow': shadowString
	        });
	    },
	    mobileDecorateimage: function mobileDecorateimage() {
	        var $widget = (0, _jquery2.default)(this);
	        var model = $widget.mobileGetmodel();

	        var imageUrl = _lkHttp2.default.getVveImage(model.imageMediaId);

	        $widget.addClass('mobile-widget');

	        var shadowString = model.shadowColor + ' ' + model.shadowSize + 'px ' + model.shadowSize + 'px ' + model.blurSize + 'px';

	        var $image = (0, _jquery2.default)('<img>', {
	            src: imageUrl
	        });
	        $image.addClass('mobile-widget-content');
	        $image.addClass('mobile-widget-content-image');
	        $image.css({
	            position: 'absolute',
	            left: 0,
	            top: 0,
	            width: '100%',
	            height: '100%',
	            'opacity': model.opacity,
	            'border-radius': model.borderRadius + 'px',
	            'border-color': model.borderColor,
	            'border-style': model.borderStyle,
	            'border-width': model.borderWidth + 'px',
	            'box-shadow': shadowString
	        });
	        $image.appendTo($widget);

	        $widget.css({
	            'top': model.position.top + 'px',
	            'left': model.position.left + 'px',
	            'width': model.size.width + 'px',
	            'height': model.size.height + 'px',
	            'background-size': '100% 100%',
	            //'background-image': 'url(' + imageUrl + ')',
	            'transform': 'rotate(' + model.rotation + 'deg)',
	            // 'transform': 'rotate(' + model.rotation + 'deg) translateZ(0px)',
	            'z-index': model.zIndex
	        });
	    },
	    mobileDecorateVideo: function mobileDecorateVideo(accessFromMobile) {
	        var $widget = (0, _jquery2.default)(this);
	        var model = $widget.mobileGetmodel();

	        $widget.addClass('mobile-widget');
	        $widget.addClass('mobile-widget-content');
	        $widget.addClass('mobile-widget-content-video');

	        if (accessFromMobile == undefined) {
	            accessFromMobile = true;
	        }

	        var videoSource = model.video;
	        if (typeof videoSource == 'string' && videoSource != '') {
	            var idString = videoSource.match(/\/id_\w+==/g);

	            if (idString != null && idString[0]) {
	                var id = videoSource.match(/\/id_\w+==/g)[0].substring(4);
	                var url = 'http://player.youku.com/embed/' + id;

	                $widget.addClass(_vveDisplayConstants2.default.WIDGET_VIDEO_TAG);
	                $widget.data(_vveDisplayConstants2.default.WIDGET_VIDEO_MODEL, {
	                    platform: 'youku',
	                    url: url
	                });
	            }
	        }

	        var backgroundImagePath = _vveConfigImages2.default['VIDEO_PLACEHOLDER'];

	        $widget.css({
	            'background-image': 'url("' + backgroundImagePath + '")',
	            'background-size': 'cover',
	            'background-position': 'center',
	            'top': model.position.top + 'px',
	            'left': model.position.left + 'px',
	            'width': model.size.width + 'px',
	            'height': model.size.height + 'px',
	            'opacity': model.opacity,
	            'border-color': model.borderColor,
	            'border-style': model.borderStyle,
	            'border-width': model.borderWidth + 'px',
	            'transform': 'rotate(' + model.rotation + 'deg)',
	            // 'transform': 'rotate(' + model.rotation + 'deg) translateZ(0px)',
	            'z-index': model.zIndex
	        });
	    },
	    mobileDecorateFormDataSet: function mobileDecorateFormDataSet() {
	        var $widget = (0, _jquery2.default)(this);
	        var model = $widget.mobileGetmodel();

	        $widget.addClass('mobile-widget');
	        $widget.addClass('mobile-widget-content');
	        $widget.addClass('mobile-widget-content-form');

	        $widget.css({
	            'top': model.position.top + 'px',
	            'left': model.position.left + 'px',
	            'width': model.size.width + 'px',
	            'height': model.size.height + 'px',
	            'border-width': model.borderWidth + 'px',
	            'border-color': model.borderColor,
	            'border-style': model.borderStyle,
	            'border-radius': model.borderRadius + 'px',
	            'z-index': model.zIndex,
	            'transform': 'rotate(' + model.rotation + 'deg)',
	            // 'transform': 'rotate(' + model.rotation + 'deg) translateZ(0px)',
	            'opacity': model.opacity,
	            'background-color': model.backgroundColor,
	            'padding': '20px',
	            'box-sizing': 'content-box'
	        });
	    },
	    mobileSetmodel: function mobileSetmodel(_model) {
	        (0, _jquery2.default)(this).data(_vveDisplayConstants2.default.ITEM_WIDGET_MODEL, _model);
	    },
	    mobileGetmodel: function mobileGetmodel() {
	        return (0, _jquery2.default)(this).data(_vveDisplayConstants2.default.ITEM_WIDGET_MODEL);
	    }
	});

	exports.default = _jquery2.default;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _vveDisplayModel = __webpack_require__(7);

	var _vveDisplayModel2 = _interopRequireDefault(_vveDisplayModel);

	var _vveDisplayPopup = __webpack_require__(10);

	var _vveDisplayPopup2 = _interopRequireDefault(_vveDisplayPopup);

	var _vveDisplayViewport = __webpack_require__(12);

	var _vveDisplayViewport2 = _interopRequireDefault(_vveDisplayViewport);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FIELD_VALID = {
	    text: {
	        errorMsg: '{{fieldName}}长度在{{minLength}}到{{maxLength}}个字符之间'
	    },
	    message: {
	        errorMsg: '{{fieldName}}长度在{{minLength}}到{{maxLength}}个字符之间'
	    },
	    mobile: {
	        pattern: /^1[3|4|5|7|8]\d{9}$/,
	        errorMsg: '请输入11位正确的手机号码'
	    },
	    numeric: {
	        pattern: /^\d+$/,
	        errorMsg: '{{fieldName}}应在{{minLength}}到{{maxLength}}之间'
	    },
	    email: {
	        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
	        errorMsg: '请输入正确的邮箱'
	    },
	    radio: {
	        errorMsg: '请选择{{fieldName}}'
	    }
	    // v1.2版本中暂时没有以下字段
	    // checkbox: {
	    //     errorMsg: 'error'
	    // },
	    // url: {
	    //     pattern: /^$/,
	    //     errorMsg: 'error'
	    // },
	    // select: {
	    //     errorMsg: 'error'
	    // }
	};

	var DATA_FIELD_FORM_BTN = 'widget-form-btn-model',
	    CLASS_FORM_BTN = '.widget-form-btn-tag';

	_jquery2.default.extend(Form.prototype, {
	    init: init,
	    bindSubmitEvent: bindSubmitEvent,
	    validateDistribute: validateDistribute,
	    validateText: validateText,
	    validateMessage: validateMessage,
	    validateMobile: validateMobile,
	    validateNumeric: validateNumeric,
	    validateEmail: validateEmail,
	    validateRadio: validateRadio,
	    fixFormBugInAndroid: fixFormBugInAndroid
	});

	exports.default = Form;

	/**
	 * 实例化表达操作
	 * @param {Object} config {previewContainer, formData, appId, isPc}
	 */

	function Form(config) {
	    var t = this;

	    // 作品id
	    t.appId = config.appId;

	    // 表单数据
	    t.formData = config.formData;

	    // 是否在pc端渲染
	    t.isPc = config.isPc;

	    // 表单容器
	    t.previewContainer = config.previewContainer;

	    // 表单集合
	    t.forms = t.previewContainer.find('.vve-display-form');

	    // 每页内容的容器，表单元素聚焦的时候会被偏移，已修正输入框的位置
	    t.wrapper = t.previewContainer.find('.vve-display-layer-wp');

	    // 所有输入项
	    t.formItem = t.previewContainer.find('.vve-display-form-item');

	    // 表单提交id
	    t.formSubmitId = '';

	    // 实例化popup
	    t.popup = new _vveDisplayPopup2.default(t.previewContainer);

	    // 初始化表达那验证，提交动作
	    t.init(config);
	}

	/***
	 * 初始化表单验证、提交，popup的容器，移动端bug的修复
	 */
	function init() {
	    var t = this;
	    t.bindSubmitEvent();
	    t.fixFormBugInAndroid();
	}

	/***
	 * 初始化表单验证、提交
	 */
	function bindSubmitEvent() {
	    var t = this,
	        forms = t.forms;

	    // 如果没有表单则取消表单的提交事件绑定
	    if (forms.length < 1) return;

	    forms.each(function () {
	        var groups = (0, _jquery2.default)(this).find('.vve-display-form-group'),
	            currBtn = (0, _jquery2.default)(this).find(CLASS_FORM_BTN),
	            currFormData = currBtn.data(DATA_FIELD_FORM_BTN);

	        // 如果当前表单没有表单元素则取消表单的提交事件绑定
	        if (groups.length < 1) return;

	        currBtn.click(function () {
	            var isAllValid = true,
	                postData = {
	                'appId': t.appId,
	                'form': [{
	                    'data': [],
	                    'formId': currFormData.formId,
	                    'formName': currFormData.formName
	                }],
	                'id': t.formSubmitId
	            };

	            // 分别验证每个表单元素
	            groups.each(function (j) {
	                var dataObj = currFormData.fields[j];

	                if (!t.validateDistribute(groups.eq(j), dataObj)) {
	                    isAllValid = false;
	                    return false;
	                }
	            });

	            // 如果都验证通过
	            if (isAllValid) {

	                // 如果在pc端则不提交表单
	                if (t.isPc) {
	                    t.popup.alert('表单验证成功！');
	                    return;
	                }

	                // 填充表单提交数据
	                groups.each(function (j) {
	                    var dataObj = currFormData.fields[j],
	                        currVal = getVal(groups.eq(j), dataObj);

	                    postData.form[0].data.push({
	                        name: dataObj.name,
	                        text: dataObj.text,
	                        value: currVal
	                    });
	                });

	                // 显示loading
	                //var currLoading = t.popup.loading('表单提交中');
	                var currLoading = t.popup.loading('祝福心愿传递中...');

	                _vveDisplayModel2.default.postForm(postData).then(function (data) {
	                    t.formSubmitId = data.data;
	                    currLoading.close();
	                    //t.popup.alert('表单提交成功！');

	                    t.popup.alert('亲！您的祝福心愿已收到！');
	                }, function (data) {
	                    currLoading.close();
	                    t.popup.alert(data.errMsg);
	                });
	            }
	        });
	    });
	}

	/***
	 * 根据dataObj中信息，执行对应的验证函数验证对应的表单元素
	 * @param formGroup 当前表单元素的包裹元素
	 * @param dataObj 与当前表单元素相关的对象（其中包含了需要验证的项）
	 */
	function validateDistribute(formGroup, dataObj) {
	    var t = this;

	    if (!dataObj) return;

	    var type = dataObj.type;

	    var ret = false;

	    switch (type) {
	        case 'text':
	            if (dataObj.ext.multiline) {
	                ret = t.validateMessage(formGroup, dataObj);
	            } else {
	                ret = t.validateText(formGroup, dataObj);
	            }
	            break;
	        case 'mobile':
	            ret = t.validateMobile(formGroup, dataObj);
	            break;
	        case 'numeric':
	            ret = t.validateNumeric(formGroup, dataObj);
	            break;
	        case 'email':
	            ret = t.validateEmail(formGroup, dataObj);
	            break;
	        case 'radio':
	            ret = t.validateRadio(formGroup, dataObj);
	            break;
	        default:
	            throw new Error('没有对应的表单类型!');
	    }

	    return ret;
	}

	/***
	 * 获取当前表单元素的值
	 */
	function getVal(formGroup, dataObj) {
	    var inputTextRange = ['text', 'message', 'mobile', 'numeric', 'email'],
	        inputRadio = ['radio'];

	    if (inputTextRange.indexOf(dataObj.type) > -1) {
	        return _jquery2.default.trim(formGroup.find('.lk-input-full').val());
	    }

	    if (inputRadio.indexOf(dataObj.type) > -1) {
	        return _jquery2.default.trim(formGroup.find('.lk-choice-input:checked').val());
	    }
	}

	/***
	 * 验证text类型的表单元素
	 * @param formGroup 当前表单元素的包裹元素
	 * @param dataObj 与当前表单元素相关的对象（其中包含了需要验证的项）
	 */
	function validateText(formGroup, dataObj) {
	    var t = this;

	    var val = _jquery2.default.trim(formGroup.find('.lk-input').val());

	    var isValid = true,
	        isSuitableSize = true,
	        isMandatoryValid = true;

	    val = !val ? '' : val;

	    // 如果是必填
	    if (dataObj.mandatory) {
	        // 必填验证
	        isMandatoryValid = val.length > 0;

	        // 长度验证
	        isSuitableSize = val.length >= dataObj.minLen && val.length <= dataObj.maxLen;

	        isValid = isMandatoryValid && isSuitableSize;
	    }

	    !isValid && t.popup.alert(FIELD_VALID.text.errorMsg.replace(/{{fieldName}}/, dataObj.text).replace(/{{minLength}}/, dataObj.minLen).replace(/{{maxLength}}/, dataObj.maxLen));

	    return isValid;
	}

	/***
	 * 验证text类型的表单元素
	 * @param formGroup 当前表单元素的包裹元素
	 * @param dataObj 与当前表单元素相关的对象（其中包含了需要验证的项）
	 */
	function validateMessage(formGroup, dataObj) {
	    var t = this;

	    var val = _jquery2.default.trim(formGroup.find('.lk-textarea').val()),
	        valOneline = val.replace(/[\n\r]/g, '');

	    var isValid = true,
	        isSuitableSize = true,
	        isMandatoryValid = true;

	    val = !val ? '' : val;

	    // 如果是必填
	    if (dataObj.mandatory) {
	        // 必填验证
	        isMandatoryValid = val.length > 0;

	        // 长度验证
	        isSuitableSize = valOneline.length >= dataObj.minLen && valOneline.length <= dataObj.maxLen;

	        isValid = isMandatoryValid && isSuitableSize;
	    }

	    !isValid && t.popup.alert(FIELD_VALID.message.errorMsg.replace(/{{fieldName}}/, dataObj.text).replace(/{{minLength}}/, dataObj.minLen).replace(/{{maxLength}}/, dataObj.maxLen));

	    return isValid;
	}

	/***
	 * 验证text类型的表单元素
	 * @param formGroup 当前表单元素的包裹元素
	 * @param dataObj 与当前表单元素相关的对象（其中包含了需要验证的项）
	 */
	function validateMobile(formGroup, dataObj) {
	    var t = this;

	    var val = _jquery2.default.trim(formGroup.find('.lk-input').val());

	    var isValid = true,
	        isMobile = true;

	    val = !val ? '' : val;

	    // 如果是必填
	    if (dataObj.mandatory) {
	        // 手机格式验证
	        isMobile = FIELD_VALID.mobile.pattern.test(val);

	        isValid = isMobile;
	    }

	    !isValid && t.popup.alert(FIELD_VALID.mobile.errorMsg);

	    return isValid;
	}

	/***
	 * 验证numeric类型的表单元素
	 * @param formGroup 当前表单元素的包裹元素
	 * @param dataObj 与当前表单元素相关的对象（其中包含了需要验证的项）
	 */
	function validateNumeric(formGroup, dataObj) {
	    var t = this;

	    var val = _jquery2.default.trim(formGroup.find('.lk-input').val());

	    var isValid = true,
	        isNumeric = true,
	        isSuitableSize = true,
	        isMandatoryValid = true;

	    val = !val ? 0 : val;
	    val = parseInt(val);

	    // 如果是必填
	    if (dataObj.mandatory) {
	        // 是否为数字验证
	        isNumeric = FIELD_VALID.numeric.pattern.test(val);

	        // 长度验证
	        isSuitableSize = val >= dataObj.minValue && val <= dataObj.maxValue;

	        isValid = isMandatoryValid && isNumeric && isSuitableSize;
	    }

	    !isValid && t.popup.alert(FIELD_VALID.numeric.errorMsg.replace(/{{fieldName}}/, dataObj.text).replace(/{{minLength}}/, dataObj.minValue).replace(/{{maxLength}}/, dataObj.maxValue));

	    return isValid;
	}

	/***
	 * 验证email类型的表单元素
	 * @param formGroup 当前表单元素的包裹元素
	 * @param dataObj 与当前表单元素相关的对象（其中包含了需要验证的项）
	 */
	function validateEmail(formGroup, dataObj) {
	    var t = this;

	    var val = _jquery2.default.trim(formGroup.find('.lk-input').val());

	    var isValid = true,
	        isEmail = true;

	    val = !val ? '' : val;

	    // 如果是必填
	    if (dataObj.mandatory) {
	        // 是否为数字验证
	        isEmail = FIELD_VALID.email.pattern.test(val);

	        isValid = isEmail;
	    }

	    !isValid && t.popup.alert(FIELD_VALID.email.errorMsg);

	    return isValid;
	}

	/***
	 * 验证radio类型的表单元素
	 * @param formGroup 当前表单元素的包裹元素
	 * @param dataObj 与当前表单元素相关的对象（其中包含了需要验证的项）
	 */
	function validateRadio(formGroup, dataObj) {
	    var t = this;

	    var radios = formGroup.find('.lk-choice-input');

	    var isValid = true,
	        isChecked = true;

	    isValid = true;

	    // 如果是必填
	    if (dataObj.mandatory) {
	        // 验证是否有单选框被选中
	        isChecked = false;
	        radios.each(function () {
	            if (this.checked) {
	                isChecked = true;
	                return false;
	            }
	        });

	        isValid = isChecked;
	    }

	    !isValid && t.popup.alert(FIELD_VALID.radio.errorMsg.replace(/{{fieldName}}/, dataObj.text));

	    return isValid;
	}

	/***
	 * 修复Android中的表单元素焦点获取后的没显示在可视区域的问题
	 */
	function fixFormBugInAndroid() {
	    var t = this;

	    var viewportHeight = _vveDisplayViewport2.default.getViewport().height;

	    t.formItem.each(function () {
	        var _this = (0, _jquery2.default)(this),
	            itemTop = _this.offset().top;

	        if (itemTop > viewportHeight / 2) {
	            _this.on('focus', function () {
	                var shiftting = itemTop - viewportHeight / 2 + 40;

	                t.wrapper.css({
	                    top: -shiftting
	                });
	            }).on('blur', function () {
	                t.wrapper.css({
	                    top: 0
	                });
	            });
	        }
	    });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _weixinJsSdk = __webpack_require__(31);

	var _weixinJsSdk2 = _interopRequireDefault(_weixinJsSdk);

	var _vveDisplayModel = __webpack_require__(7);

	var _vveDisplayModel2 = _interopRequireDefault(_vveDisplayModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    share: share
	};


	function share(config) {
	    // 获取微信jssdk配置
	    _vveDisplayModel2.default.getWxconfig(config.uin).then(function (data) {

	        var configData = data.data;

	        // 配置获取到的信息
	        _weixinJsSdk2.default.config({
	            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	            appId: configData.appId, // 必填，公众号的唯一标识
	            timestamp: configData.timestamp, // 必填，生成签名的时间戳
	            nonceStr: configData.nonceStr, // 必填，生成签名的随机串
	            signature: configData.signature, // 必填，签名，见附录1
	            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	        });

	        // 配置成功
	        _weixinJsSdk2.default.ready(function () {

	            // alert('weixin config信息验证成功！')

	            var shareTitle = config.title,
	                shareDesp = config.description,
	                shareLink = config.link,
	                shareImg = config.imgUrl;

	            // 分享到朋友圈
	            _weixinJsSdk2.default.onMenuShareTimeline({
	                title: shareTitle, // 分享标题
	                link: shareLink, // 分享链接
	                imgUrl: shareImg, // 分享图标
	                success: function success() {
	                    config.success && config.success();
	                },
	                cancel: function cancel() {
	                    // 用户取消分享后执行的回调函数
	                    // alert('朋友圈取消分享！')
	                    config.cancel && config.cancel();
	                }
	            });

	            // 分享给朋友
	            _weixinJsSdk2.default.onMenuShareAppMessage({
	                title: shareTitle, // 分享标题
	                desc: shareDesp, // 分享描述
	                link: shareLink, // 分享链接
	                imgUrl: shareImg, // 分享图标
	                type: 'link', // 分享类型,music、video或link，不填默认为link
	                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	                success: function success() {
	                    // 用户确认分享后执行的回调函数
	                    // alert('分享到朋友成功！')
	                    // alert(JSON.stringify(successData));
	                    config.success && config.success();
	                },
	                cancel: function cancel() {
	                    // 用户取消分享后执行的回调函数
	                    // alert('分享到朋友失败！')
	                    config.cancel && config.cancel();
	                }
	            });
	        });

	        _weixinJsSdk2.default.error(function () {
	            // alert('weixin config信息验证失败！')
	        });

	        config.done();
	    }, function () {
	        config.done();
	        // alert('获取wx jsskd配置失败')
	    });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lkUtils = __webpack_require__(2);

	var _lkUtils2 = _interopRequireDefault(_lkUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CLASS_STAGE = '.vve-display-stage';

	/***
	 * 开始预加载图片
	 */
	function loadImages(config) {
	    var previewContainer = config.previewContainer,
	        loadingBox = previewContainer.find('.vve-display-loading'),
	        loadingBoxPercent = previewContainer.find('.vve-display-loading-percent');

	    var imgList = config.imgList,
	        callback = config.callback;

	    _lkUtils2.default.loadImgGroup(imgList, function () {
	        loadingBox.fadeOut(400);

	        // 防止预览时弹窗关掉而继续执行回调
	        if (previewContainer.find(CLASS_STAGE).length) {
	            callback && callback();
	        }
	    }, function (i, loadPercent) {
	        loadingBoxPercent.text(parseInt(loadPercent * 100, 10) + '%');
	    });
	}

	exports.default = loadImages;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _vveDisplayTemplate = __webpack_require__(11);

	var _vveDisplayTemplate2 = _interopRequireDefault(_vveDisplayTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CLASS_NAME_RUNNING = 'running';

	_jquery2.default.extend(Music.prototype, {
	    init: init,
	    loadMusic: loadMusic,
	    bindMusicEvent: bindMusicEvent,
	    play: play,
	    pause: pause,
	    showLoading: showLoading,
	    hideLoading: hideLoading,
	    showPlayer: showPlayer,
	    hidePlayer: hidePlayer,
	    destory: destory,
	    createMusicPlayer: createMusicPlayer,
	    destoryMusicPlayer: destoryMusicPlayer
	});

	exports.default = Music;

	// Music class

	function Music(config) {
	    var t = this;

	    // Audio实例
	    t.music = new Audio();

	    // 是否有音乐
	    t.musicEnabled = config.musicEnabled;

	    // 音乐地址
	    t.musicUrl = config.musicUrl;

	    // 当前音乐是否正在播放
	    t.isPlaying = false;

	    t.previewContainer = config.previewContainer;

	    t.musicPlayer = null;

	    t.musicPlayerLoading = null;

	    // 防止canplaythrough多次触发
	    this.hasCanplaythroughFired = false;

	    // 初始化音乐组件
	    t.init(config);
	}

	/***
	 * 初始化音乐组件
	 * @param config object  [previewContainer, url]
	 */
	function init() {
	    var t = this;

	    if (!t.musicEnabled) return;

	    // 创建音乐播放按钮
	    t.createMusicPlayer();

	    // 加载音乐
	    t.loadMusic(function () {
	        // 绑定音乐操作事件
	        t.bindMusicEvent();
	    });
	}

	/**
	 * 创建播放按钮
	 * @return {Undefined}
	 */
	function createMusicPlayer() {
	    var t = this;

	    t.musicPlayer = (0, _jquery2.default)(_vveDisplayTemplate2.default.musicPlayer);
	    t.musicPlayerLoading = t.musicPlayer.find('.vve-display-music-loading');

	    t.previewContainer.append(t.musicPlayer);
	}

	/**
	 * 销毁播放按钮
	 * @return {Undefined}
	 */
	function destoryMusicPlayer() {
	    var t = this;

	    t.musicPlayer && t.musicPlayer.remove();
	}

	/***
	 * 加载音乐
	 */
	function loadMusic(callback) {
	    var t = this;

	    var music = t.music,
	        source;

	    source = document.createElement('source');

	    // 配置循环播放和预加载
	    (0, _jquery2.default)(music).prop({
	        loop: false, // 后面用监听ended事件的方式实现循环播放
	        preload: 'auto'
	    });

	    // 配置播放源和播放类型
	    (0, _jquery2.default)(source).prop({
	        src: t.musicUrl,
	        type: 'audio/mpeg'
	    });

	    music.appendChild(source);

	    t.showPlayer();
	    t.showLoading();

	    music.addEventListener('canplaythrough', function () {
	        // 防止canplaythrough多次触发
	        if (this.hasCanplaythroughFired) return;

	        this.hasCanplaythroughFired = true;

	        t.hideLoading();
	        t.play();
	        callback && callback();
	    }, false);

	    // 解决ios上MP3不能循环播放的问题
	    ///////////////
	    // 注意一个坑。。。。
	    // 每次音乐播放完毕后，会再次触发一次'canplaythrough'事件。。。
	    ///////////////
	    music.addEventListener('ended', function () {
	        t.pause();
	        t.play();
	    }, false);

	    // 手机设备不能自动播放
	    music.play(); // 必须执行这一句，否则在iOS上不会加载音乐
	    // $(document).one("touchstart", function(){
	    //     play();
	    // });
	    /*document.addEventListener("WeixinJSBridgeReady", function () {
	        music.play();
	    }, false);*/
	}

	/***
	 * 绑定音乐操作事件
	 */
	function bindMusicEvent() {
	    var t = this;

	    t.musicPlayer.on('click', function () {
	        if (t.isPlaying) {
	            t.pause();
	        } else {
	            t.play();
	        }
	    });
	}

	/***
	 * 播放音乐
	 */
	function play() {
	    var t = this;

	    t.isPlaying = true;
	    t.musicPlayer.addClass(CLASS_NAME_RUNNING);
	    t.music.play();
	}

	/***
	 * 暂停音乐
	 */
	function pause() {
	    var t = this;

	    t.isPlaying = false;
	    t.musicPlayer.removeClass(CLASS_NAME_RUNNING);
	    t.music.pause();
	}

	/***
	 * show music loading
	 */
	function showLoading() {
	    var t = this;

	    t.musicPlayerLoading.stop(true, false).fadeIn(400);
	}

	/***
	 * hide music loading
	 */
	function hideLoading() {
	    var t = this;

	    t.musicPlayerLoading.stop(true, false).fadeOut(400);
	}

	/***
	 * show music player
	 */
	function showPlayer() {
	    var t = this;

	    t.musicPlayer && t.musicPlayer.show();
	}

	/***
	 * hide music player
	 */
	function hidePlayer() {
	    var t = this;

	    t.musicPlayer && t.musicPlayer.hide();
	}

	// destroy music
	function destory() {
	    var t = this;

	    if (t.musicEnabled && t.musicPlayer) {
	        t.pause();
	        t.destoryMusicPlayer();
	    }
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    'none': {
	        't2b': {
	            'currStateBefore': {
	                transform: 'translate3d(0,' + 0 + '%,0)',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(0,' + 100 + '%,0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0,' + -100 + '%,0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(0,' + 0 + '%,0)'
	            }
	        },
	        'b2t': {
	            'currStateBefore': {
	                transform: 'translate3d(0,' + 0 + '%, 0)',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(0,' + -100 + '%, 0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0,' + 100 + '%, 0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0)'
	            }
	        },
	        'l2r': {
	            'currStateBefore': {
	                transform: 'translate3d(' + 0 + ', 0, 0)',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(' + 100 + '%, 0, 0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(' + -100 + '%, 0, 0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(' + 0 + ', 0, 0)'
	            }
	        },
	        'r2l': {
	            'currStateBefore': {
	                transform: 'translate3d(' + 0 + ', 0, 0)',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(' + -100 + '%, 0, 0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(' + 100 + '%, 0, 0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(' + 0 + ', 0, 0)'
	            }
	        }
	    },
	    'scale': {
	        't2b': {
	            'currStateBefore': {
	                transform: 'translate3d(0, ' + 0 + '%, 0)',
	                transformOrigin: 'center bottom',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0) scale(0.7)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0, ' + -100 + '%, 0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0)'
	            }
	        },
	        'b2t': {
	            'currStateBefore': {
	                transform: 'translate3d(0, ' + 0 + '%, 0)',
	                transformOrigin: 'center top',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0) scale(0.7)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0, ' + 100 + '%, 0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0)'
	            }
	        },
	        'l2r': {
	            'currStateBefore': {
	                transform: 'translate3d(' + 0 + ', 0, 0)',
	                transformOrigin: 'right center',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(' + 0 + '%, 0, 0) scale(0.7)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(' + -100 + '%, 0, 0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(' + 0 + '%, 0, 0)'
	            }
	        },
	        'r2l': {
	            'currStateBefore': {
	                transform: 'translate3d(' + 0 + '%, 0, 0)',
	                transformOrigin: 'left center',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(' + 0 + '%, 0, 0) scale(0.7)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(' + 100 + '%, 0, 0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(' + 0 + '%, 0, 0)'
	            }
	        }
	    },
	    'slide': {
	        't2b': {
	            'currStateBefore': {
	                transform: 'translate3d(0, ' + -0.0001 + 'px, 0)', // 防止transitionEnd事件不触发
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0, ' + -100 + '%, 0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0)'
	            }
	        },
	        'b2t': {
	            'currStateBefore': {
	                transform: 'translate3d(0, ' + -0.0001 + 'px, 0)', // 防止transitionEnd事件不触发
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0, ' + 100 + '%, 0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0)'
	            }
	        },
	        'l2r': {
	            'currStateBefore': {
	                transform: 'translate3d(' + -0.0001 + 'px, 0, 0)', // 防止transitionEnd事件不触发
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(' + 0 + '%, 0, 0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(' + -100 + '%, 0, 0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(' + 0 + '%, 0, 0)'
	            }
	        },
	        'r2l': {
	            'currStateBefore': {
	                transform: 'translate3d(' + -0.0001 + 'px, 0, 0)', // 防止transitionEnd事件不触发
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(' + 0 + '%, 0, 0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(' + 100 + '%, 0, 0)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(' + 0 + '%, 0, 0)'
	            }
	        }
	    },
	    'flip-3D': {
	        't2b': {
	            'currStateBefore': {
	                transform: 'translate3d(0,' + 0 + '%,0) rotateX(0deg)',
	                transformOrigin: 'center top',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(0,' + 100 + '%,0) rotateX(-45deg)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0,' + -100 + '%,0) rotateX(45deg)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(0,' + 0 + '%,0) rotateX(0deg)',
	                transformOrigin: 'center bottom'
	            }
	        },
	        'b2t': {
	            'currStateBefore': {
	                transform: 'translate3d(0,' + 0 + '%, 0) rotateX(0deg)',
	                transformOrigin: 'center bottom',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(0,' + -100 + '%, 0) rotateX(45deg)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0,' + 100 + '%, 0) rotateX(-45deg)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0) rotateX(0deg)',
	                transformOrigin: 'center top'
	            }
	        },
	        'l2r': {
	            'currStateBefore': {
	                transform: 'translate3d(' + 0 + ', 0, 0) rotateY(0deg)',
	                transformOrigin: 'left center',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(' + 100 + '%, 0, 0) rotateY(45deg)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(' + -100 + '%, 0, 0) rotateY(-45deg)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(' + 0 + ', 0, 0) rotateY(0deg)',
	                transformOrigin: 'right center'
	            }
	        },
	        'r2l': {
	            'currStateBefore': {
	                transform: 'translate3d(' + 0 + ', 0, 0) rotateY(0deg)',
	                transformOrigin: 'right center',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(' + -100 + '%, 0, 0) rotateY(-45deg)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(' + 100 + '%, 0, 0) rotateY(45deg)',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(' + 0 + ', 0, 0) rotateY(0deg)',
	                transformOrigin: 'left center'
	            }
	        }
	    },
	    'flip': {
	        't2b': {
	            'currStateBefore': {
	                transform: 'translate3d(0, ' + -0.0001 + '%, 0)',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0, ' + 0 + '%, 0) rotateZ(90deg)',
	                transformOrigin: 'right top',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0) rotateZ(0deg)'
	            }
	        },
	        'b2t': {
	            'currStateBefore': {
	                transform: 'translate3d(0, ' + -0.0001 + '%, 0)',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0, ' + 0 + '%, 0) rotateZ(90deg)',
	                transformOrigin: 'left bottom',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(0, ' + 0 + '%, 0) rotateZ(0deg)'
	            }
	        },
	        'l2r': {
	            'currStateBefore': {
	                transform: 'translate3d(' + -0.0001 + ', 0, 0)',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(' + 0 + '%, 0, 0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(' + 0 + '%, 0, 0) rotateZ(90deg)',
	                transformOrigin: 'left top',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(' + 0 + ', 0, 0) rotateZ(0deg)'
	            }
	        },
	        'r2l': {
	            'currStateBefore': {
	                transform: 'translate3d(' + -0.0001 + ', 0, 0)',
	                zIndex: 1
	            },
	            'currStateAfter': {
	                transform: 'translate3d(' + 0 + '%, 0, 0)'
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(' + 0 + '%, 0, 0) rotateZ(90deg)',
	                transformOrigin: 'right bottom',
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                transform: 'translate3d(' + 0 + ', 0, 0) rotateZ(0deg)'
	            }
	        }
	    },
	    'fade': {
	        't2b': {
	            'currStateBefore': {
	                opacity: 1,
	                zIndex: 1
	            },
	            'currStateAfter': {
	                opacity: 0
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0, 0, 0)',
	                opacity: 0,
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                opacity: 1
	            }
	        },
	        'b2t': {
	            'currStateBefore': {
	                opacity: 1,
	                zIndex: 1
	            },
	            'currStateAfter': {
	                opacity: 0
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0, 0, 0)',
	                opacity: 0,
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                opacity: 1
	            }
	        },
	        'l2r': {
	            'currStateBefore': {
	                opacity: 1,
	                zIndex: 1
	            },
	            'currStateAfter': {
	                opacity: 0
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0, 0, 0)',
	                opacity: 0,
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                opacity: 1
	            }
	        },
	        'r2l': {
	            'currStateBefore': {
	                opacity: 1,
	                zIndex: 1
	            },
	            'currStateAfter': {
	                opacity: 0
	            },
	            'nextStateBefore': {
	                transform: 'translate3d(0, 0, 0)',
	                opacity: 0,
	                display: 'block',
	                zIndex: 2
	            },
	            'nextStateAfter': {
	                opacity: 1
	            }
	        }
	    }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lkHttp = __webpack_require__(5);

	var _lkHttp2 = _interopRequireDefault(_lkHttp);

	var _lkHttpUtils = __webpack_require__(8);

	var _lkHttpUtils2 = _interopRequireDefault(_lkHttpUtils);

	var _vveDisplayConstants = __webpack_require__(6);

	var _vveDisplayConstants2 = _interopRequireDefault(_vveDisplayConstants);

	var _vveDisplayAdapter = __webpack_require__(17);

	var _vveDisplayAdapter2 = _interopRequireDefault(_vveDisplayAdapter);

	var _vveConfigApis = __webpack_require__(4);

	var _vveConfigApis2 = _interopRequireDefault(_vveConfigApis);

	var _vveConfigConstants = __webpack_require__(13);

	var _vveConfigConstants2 = _interopRequireDefault(_vveConfigConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 页面渲染部件模板
	var _VERTICAL_PAGE_TEMPLATE = '<div class="vve-display-layer vve-display-layer0">' + '    <div class="vve-display-layer vve-display-layer1">' + '        <div class="vve-display-layer-wp"></div>' + '    </div>' + '</div>';

	var _WIDGET_FORM_TEXT = '<div class="vve-display-form-group">' + '<input class="lk-input lk-input-full vve-display-form-item biz-formitem-placeholder" placeholder="">' + '<span class="vve-display-form-required">*</span>' + '</div>';

	var _WIDGET_FORM_MULTILINE = '<div class="vve-display-form-group">' + '<textarea class="lk-textarea lk-input-full vve-display-form-item biz-formitem-placeholder" placeholder=""></textarea>' + '<span class="vve-display-form-required">*</span>' + '</div>';

	var _WIDGET_FORM_RADIOBOX = '<div class="vve-display-form-group">' + '<div class="vve-display-outline vve-display-form-item">' + '<span class="biz-form-radio-name"></span>&nbsp;' + '</div>' + '<span class="vve-display-form-required">*</span>' + '</div>';

	var _WIDGWT_FORM_RADIO_ITEM = '<label class="vve-display-radio-item">' + '<label class="lk-choice lk-radio">' + '<input class="lk-choice-input biz-form-radio-item-value" type="radio" name="a">' + '<span class="lk-choice-view"></span>' + '</label>' + '&nbsp;<span class="biz-form-radio-item-text">女</span>' + '</label>';

	var _WIDGET_FORM_SUBMIT_BTN = '<a href="javascript:;" class="lk-btn lk-btn-primary lk-btn-full vve-display-form-submit">提交</a>';

	var _PAGE_LAYER1_CLASS_NAME = 'vve-display-layer1',
	    _PAGE_LAYER1_CLASS = '.' + _PAGE_LAYER1_CLASS_NAME,
	    _PAGE_LAYER_WP_CLASS = '.vve-display-layer-wp';

	var DATA_FIELD_WIDGET = 'jvve-model-widget';

	function Application(model, options) {
	    var $workspace = options.container;
	    var shapeResourceMap = {};
	    var formDataMap = {};
	    var appModel = {};
	    var formData = [];

	    var buildTable = {};
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_TEXT] = _renderText;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_IMAGE] = _renderImage;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_SHAPE_LINE_H] = _renderShape;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_SHAPE_LINE_V] = _renderShape;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_SHAPE_CIRCLE] = _renderCircle;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_SHAPE_ELLIPSE] = _renderShape;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_SHAPE_POLYGON] = _renderShape;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_SHAPE_STAR] = _renderShape;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_SHAPE_HEART] = _renderShape;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_SHAPE_RECTANGLE] = _renderRectangle;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_SHAPE_TRIANGLE] = _renderShape;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_SHAPE_ROUND_RECTANGLE] = _renderShape;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_VIDEO] = _renderVideo;
	    buildTable[_vveDisplayConstants2.default.WIDGET_SUBCLASS_FORM_DATA_SET] = _renderForm;

	    //alert(JSON.stringify(model.fontFiles));

	    _vveDisplayAdapter2.default.each(model.fontFiles, function (idx, font) {
	        var fontUrl = _lkHttp2.default.getVveFont(font.mediaId);
	        var style = '@font-face{\
	                font-family:"' + font.refId + '";\
	                src:url("' + fontUrl + '") format("woff");\
	                font-style: normal; \
	                font-weight: 400;\
	            }';

	        var ss = '<style>' + style + '</style>';
	        (0, _vveDisplayAdapter2.default)('head').append((0, _vveDisplayAdapter2.default)(ss));

	        //alert("11> " + ss + " " + fontUrl);
	    });

	    function _renderForm($page, _model) {
	        var $widget = (0, _vveDisplayAdapter2.default)('<div>', {
	            id: _model.id,
	            'class': 'vve-display-form'
	        });

	        if (formDataMap[_model.form.formId] == undefined) {
	            return $widget;
	        }

	        var formModel = {};
	        for (var idx = 0; idx < formData.length; idx++) {
	            var form = formData[idx];
	            if (form.formId == _model.form.formId) {
	                formModel = form;
	                break;
	            }
	        }

	        _vveDisplayAdapter2.default.each(formModel.fields, function (idx, field) {
	            _updateWidget($widget, field, _model);
	        });

	        if (_model.form.submitButtonStyle.text === undefined) {
	            _model.form.submitButtonStyle.text = '提 交';
	        }
	        var $submitButton = (0, _vveDisplayAdapter2.default)(_WIDGET_FORM_SUBMIT_BTN);
	        $submitButton.text(_model.form.submitButtonStyle.text);

	        $submitButton.css({
	            'background-color': _model.form.submitButtonStyle.backgroundColor,
	            'border-width': _model.form.submitButtonStyle.borderSize + 'px',
	            'border-radius': _model.form.submitButtonStyle.borderRadius + 'px',
	            'border-style': 'solid',
	            'border-color': _model.form.submitButtonStyle.borderColor
	        });

	        $submitButton.addClass(_vveDisplayConstants2.default.WIDGET_FORM_TAG);
	        $submitButton.data(_vveDisplayConstants2.default.WIDGET_FORM_MODEL, formDataMap[_model.form.formId]);

	        $widget.append($submitButton);
	        $page.append($widget);
	        $widget.mobileSetmodel(_model, form);
	        $widget.mobileDecorateFormDataSet();

	        return $widget;
	    }

	    /**
	     * 设置当前元素的动画
	     * @param {Object} aniObject 动画属性集合
	     * @param {jQ element} $widget
	     */
	    function _setWidgetAnimation(aniObject, $widget) {
	        var animation,
	            animationTpl = '{name} {duration} {timingFn} {delay} {count} {direction} {fillMode}';

	        animation = animationTpl.replace('{name}', aniObject.name).replace('{duration}', aniObject.duration + 's').replace('{timingFn}', 'linear').replace('{delay}', aniObject.startAt + 's').replace('{count}', aniObject.repeat).replace('{direction}', 'normal').replace('{fillMode}', 'both');

	        var model = $widget.mobileGetmodel(),
	            animationHolder = $widget;

	        if (model.subClass.indexOf('widget-shape') != -1) {
	            animationHolder = $widget.find('img');
	        } else if (model.subClass == _vveDisplayConstants2.default.WIDGET_SUBCLASS_IMAGE) {
	            animationHolder = $widget.find('img');
	        } else if (model.subClass == _vveDisplayConstants2.default.WIDGET_SUBCLASS_TEXT) {
	            animationHolder = $widget.find('.animation-ghost');
	        }

	        animationHolder.css('animation', animation);
	    }

	    /**
	     * 设置当前页中每个元素的动画
	     */
	    function _setPageAnimation(pageModel) {
	        var $widget = '';
	        var animationSet = '';

	        var $page = $workspace.find('#' + pageModel.pageCode).find(_PAGE_LAYER_WP_CLASS);

	        var pageWidgetSet = $page.data('page-widget-set');
	        //var $page = $('#'+pageModel.pageCode).find(_PAGE_LAYER_WP_CLASS);

	        _vveDisplayAdapter2.default.each(pageModel.widgetList, function (idx, widgetModel) {
	            var model = widgetModel.model;
	            var animation = model.animation;
	            var widgetId = model.id;
	            $widget = pageWidgetSet[widgetId];

	            if (animation && animation.length) {
	                animationSet = animation[0];

	                if (animationSet.name === 'none') return;

	                _setWidgetAnimation(animationSet, $widget);
	            }

	            $widget.show();
	        });
	    }

	    /**
	     * 设置整个app中每个元素的动画
	     */
	    function _setAppAnimation(pageList) {
	        if (!_vveDisplayAdapter2.default.isPlainObject(pageList)) return;

	        _vveDisplayAdapter2.default.each(pageList, function (pageId, pageData) {
	            _setPageAnimation(pageData.model);
	        });
	    }

	    function _updateWidget($widget, fieldModel, model) {
	        var $item = '';
	        switch (fieldModel.type) {
	            case _vveDisplayConstants2.default.FORM_FIELD_TYPE_TEXT:
	            case _vveDisplayConstants2.default.FORM_FIELD_TYPE_NUMERIC:
	            case _vveDisplayConstants2.default.FORM_FIELD_TYPE_EMAIL:
	            case _vveDisplayConstants2.default.FORM_FIELD_TYPE_MOBILE:
	            case _vveDisplayConstants2.default.FORM_FIELD_TYPE_URL:
	                if (fieldModel.ext.multiline) {
	                    $item = (0, _vveDisplayAdapter2.default)(_WIDGET_FORM_MULTILINE);
	                    $item.addClass(fieldModel.name);
	                    $widget.append($item);
	                    $item.find('textarea').attr('placeholder', fieldModel.text);
	                } else {
	                    $item = (0, _vveDisplayAdapter2.default)(_WIDGET_FORM_TEXT);
	                    $item.addClass(fieldModel.name);
	                    $widget.append($item);
	                    $item.find('input').attr('placeholder', fieldModel.text);
	                }
	                break;

	            case _vveDisplayConstants2.default.FORM_FIELD_TYPE_RADIO:
	                $item = (0, _vveDisplayAdapter2.default)(_WIDGET_FORM_RADIOBOX);
	                $item.addClass(fieldModel.name);

	                $item.find('.biz-form-radio-name').text(fieldModel.text);

	                var groupName = _vveDisplayAdapter2.default.now();
	                var $itemContainer = $item.find('.vve-display-form-item');
	                _vveDisplayAdapter2.default.each(fieldModel.options, function (text, value) {
	                    var $radioItem = (0, _vveDisplayAdapter2.default)(_WIDGWT_FORM_RADIO_ITEM);

	                    var $input = $radioItem.find('.biz-form-radio-item-value');
	                    $input.attr('name', groupName);
	                    $input.val(value.value);

	                    var $radioName = $radioItem.find('.biz-form-radio-item-text');
	                    $radioName.text(value.text);

	                    $itemContainer.append($radioItem);
	                });

	                $widget.append($item);
	                break;

	            case _vveDisplayConstants2.default.FORM_FIELD_TYPE_CHECKBOX:
	                break;

	            case _vveDisplayConstants2.default.FORM_FIELD_TYPE_SELECT:
	                break;
	        }

	        if (fieldModel.mandatory) {
	            $item.addClass('required');
	        }

	        var fmdl = model.form;
	        $item.css({
	            'background-color': fmdl.fieldStyle.backgroundColor,
	            'border-width': fmdl.fieldStyle.borderSize + 'px',
	            'border-color': fmdl.fieldStyle.borderColor,
	            'border-style': 'solid',
	            'border-radius': fmdl.fieldStyle.borderRadius + 'px'
	        });

	        $item.children().css({
	            'background-color': fmdl.fieldStyle.backgroundColor
	        });
	    }

	    /**
	     * 渲染圆形组件
	     * @param {jquery} $page 需要渲染的页面
	     * @param {object} _model 圆形图形数据
	     * @private
	     */
	    function _renderCircle($page, _model, resource) {
	        var mediaId = resource[_model.shapeId];

	        var $widget = (0, _vveDisplayAdapter2.default)('<div>', {
	            id: _model.id
	        });

	        var url = _lkHttp2.default.getVveImage(mediaId);
	        $widget.mobileSetmodel(_model);
	        $widget.mobileDecorateshape(url);
	        $page.append($widget);

	        return $widget;
	    }

	    /**
	     * 渲染文本组件
	     * @parem {jquery} $page 需要渲染的页面
	     * @param {object} _model 文本数据模型
	     * @private
	     */
	    function _renderText($page, _model) {
	        var $widget = (0, _vveDisplayAdapter2.default)('<div>', {
	            id: _model.id
	        });

	        $widget.mobileSetmodel(_model);
	        $widget.mobileDecoratetext();

	        $page.append($widget);

	        return $widget;
	    }

	    /**
	     * 渲染图像组件
	     * @paeam {jquery} $page 需要渲染的页面
	     * @param {object} _model 图像数据模型
	     * @private
	     */
	    function _renderImage($page, _model) {
	        var $widget = (0, _vveDisplayAdapter2.default)('<div>', {
	            id: _model.id
	        });

	        $widget.mobileSetmodel(_model);
	        $widget.mobileDecorateimage();
	        $page.append($widget);

	        return $widget;
	    }

	    /**
	     * 渲染矩形图形
	     * @param {jquery} $page 需要渲染的页面
	     * @param {object} _model 矩形图形数据
	     * @private
	     */
	    function _renderRectangle($page, _model, resource) {
	        var mediaId = resource[_model.shapeId];

	        var $widget = (0, _vveDisplayAdapter2.default)('<div>', {
	            id: _model.id
	        });

	        var url = _lkHttp2.default.getVveImage(mediaId);
	        $widget.mobileSetmodel(_model);
	        $widget.mobileDecorateshape(url);
	        $page.append($widget);

	        return $widget;
	    }

	    /**
	     * 渲染图形对象
	     * @param {jquery} $page 需要渲染的页面
	     * @param {object} _model 图形数据对象
	     * @private
	     */
	    function _renderShape($page, _model, resource) {
	        var mediaId = resource[_model.shapeId];

	        var $widget = (0, _vveDisplayAdapter2.default)('<div>', {
	            id: _model.id
	        });

	        var url = _lkHttp2.default.getVveImage(mediaId);
	        $widget.mobileSetmodel(_model);
	        $widget.mobileDecorateshape(url);
	        $page.append($widget);

	        return $widget;
	    }

	    /**
	     * 渲染视频组件
	     * @parem {jquery} $page 需要渲染的页面
	     * @param {object} _model 文本数据模型
	     * @private
	     */
	    function _renderVideo($page, _model, resource, accessFromMobile) {
	        var $widget = (0, _vveDisplayAdapter2.default)('<div>', {
	            id: _model.id
	        });

	        $widget.mobileSetmodel(_model);
	        $widget.mobileDecorateVideo(accessFromMobile);

	        $page.append($widget);

	        return $widget;
	    }

	    /**
	     * 渲染组件对象，通过组件类型和路由函数表，渲染指定的组件对象
	     * @param {jquery} $page 需要渲染的页面对象
	     * @param {object} model 组件数据对象
	     * @private
	     */
	    function renderWidget($page, model, resource, accessFromMobile) {
	        return buildTable[model.subClass]($page, model, resource, accessFromMobile);
	    }

	    /**
	     * 构建页面滑动结构
	     * @param {object} model 需要渲染的应用数据模型对象
	     * @private
	     */
	    function _buildPageStructure(appModel, accessFromMobile) {
	        var validType = _vveDisplayConstants2.default.VALID_PAGE_ANIMATION;
	        var renderIndex = 0;

	        var model = appModel.richData;
	        _vveDisplayAdapter2.default.each(model.pageList, function (idx, pageModel) {
	            var $pageWraper = (0, _vveDisplayAdapter2.default)(_VERTICAL_PAGE_TEMPLATE);
	            var $page = $pageWraper.find(_PAGE_LAYER_WP_CLASS);

	            var windowHeight = $workspace.height();
	            var windowWidth = $workspace.width();

	            $pageWraper.attr('renderIndex', renderIndex++);
	            $pageWraper.mobileSetmodel(pageModel);
	            var pmodel = pageModel.model;
	            $pageWraper.find(_PAGE_LAYER1_CLASS).attr('id', pmodel.pageCode);

	            // 绑定页面数据模型
	            var editModel = {
	                appModel: appModel,
	                pageModel: pmodel
	            };
	            $pageWraper.find(_PAGE_LAYER1_CLASS).data(DATA_FIELD_WIDGET, editModel);

	            var backgroundColor = '#fff';
	            // 渲染背景颜色
	            if (model.backgroundColorScope == _vveDisplayConstants2.default.LOCAL_COLOR) {
	                backgroundColor = pageModel.model.backgroundColor;
	            } else {
	                backgroundColor = model.backgroundColor;
	            }

	            var scale = 1;
	            //var method = -1;
	            if (model.referenceSize.width / model.referenceSize.height >= windowWidth / windowHeight) {
	                scale = (windowHeight + 48) / 486;
	                //method = 0;
	            } else {
	                //method =1 ;
	                scale = (windowWidth + 32) / 320;
	            }

	            //var dump = {
	            //    wHeight: windowHeight,
	            //    wWidth: windowWidth,
	            //    method: method,
	            //    scale: scale,
	            //    diff: 1010
	            //};
	            //
	            //alert("=== param:"+JSON.stringify(dump));

	            var $bglayer = (0, _vveDisplayAdapter2.default)('<div>');
	            $bglayer.addClass('vve-display-layer-bg');
	            $bglayer.css({
	                'background-color': backgroundColor,
	                'position': 'absolute',
	                'top': '50%',
	                'left': '50%',
	                'width': model.referenceSize.width + 'px',
	                'height': model.referenceSize.height + 'px',
	                'transform': 'translate(-50%, -50%) scale(' + scale + ')',
	                outline: '5px solid #f00'
	            });

	            // 渲染背景图片
	            if (model.backgroundImageScope !== undefined) {
	                var imageModel = '';
	                if (model.backgroundImageScope === _vveDisplayConstants2.default.LOCAL_BACKGROUND_IMAGE) {
	                    imageModel = pageModel.model.backgroundImageModel;
	                } else {
	                    imageModel = model.backgroundImageModel;
	                }

	                if (_vveDisplayAdapter2.default.trim(imageModel.mediaId) != '') {
	                    var bgImage = _lkHttp2.default.getVveImage(imageModel.mediaId);

	                    var ratio = 320 / 60;
	                    var offsetX = -ratio * (imageModel.aperture.left - imageModel.location.left);
	                    var offsetY = -ratio * (imageModel.aperture.top - imageModel.location.top);
	                    var viewWidth = ratio * imageModel.viewsize.width;
	                    var viewHeight = ratio * imageModel.viewsize.height;

	                    var bgStyle = {
	                        'background-image': 'url(' + bgImage + ')',
	                        'background-repeat': 'no-repeat',
	                        'opacity': imageModel.opacity,
	                        'background-position': offsetX + 'px ' + offsetY + 'px',
	                        'background-size': viewWidth + 'px ' + viewHeight + 'px'
	                    };

	                    $bglayer.css(bgStyle);
	                }
	            }

	            $page.before($bglayer);

	            // 渲染组件内容
	            var pageWidgetSet = {};
	            _vveDisplayAdapter2.default.each(pmodel.widgetList, function (wkey, widgetModel) {
	                var wmodel = widgetModel.model;

	                var $widget = renderWidget($page, wmodel, shapeResourceMap, accessFromMobile);
	                $widget.mobileSetmodel(wmodel);
	                pageWidgetSet[wmodel.id] = $widget;

	                // 附加链接数据
	                var link = wmodel.link;
	                var actions = wmodel.actions;

	                // 绑定业务事件
	                if (!_vveDisplayAdapter2.default.isEmptyObject(link) && validType.test(link.linkType)) {
	                    $widget.addClass(_vveDisplayConstants2.default.WIDGET_LINK_TAG + ' ' + _vveDisplayConstants2.default.WIDGET_LINK_TAG + '-' + link.linkType);
	                    $widget.data(_vveDisplayConstants2.default.WIDGET_LINK_MODEL, link);
	                }

	                // TODO:暂时性兼容老数据
	                if (!_vveDisplayAdapter2.default.isEmptyObject(actions)) {
	                    var _WIDGET_ACTIONS_KEYS = ['activity', 'buy-now', 'coupon'];
	                    for (var i = 0; i < _WIDGET_ACTIONS_KEYS.length; i++) {
	                        if (actions[_WIDGET_ACTIONS_KEYS[i]]) {
	                            actions = actions[_WIDGET_ACTIONS_KEYS[i]];
	                            break;
	                        }
	                    }
	                }

	                if (!_vveDisplayAdapter2.default.isEmptyObject(actions)) {
	                    $widget.addClass(_vveDisplayConstants2.default.WIDGET_ACTIONS_TAG + '-' + actions.name);
	                    $widget.data(_vveDisplayConstants2.default.WIDGET_ACTIONS_MODEL, actions);
	                }
	            });

	            $page.data('page-widget-set', pageWidgetSet);
	            $workspace.append($pageWraper);
	        });
	    }

	    /**
	     * 提取动画列表
	     * @param model
	     * @returns {Array}
	     * @private
	     */
	    function _retriveAnimation(model) {
	        var animationSet = [];
	        var animation = '';

	        // 目前支持的动画类型
	        var pageAnimation = /none|fade|flip|flip-3D|slide|scale/;

	        if (model.animationScope == 'animation-global') {
	            animation = model.animation;

	            _vveDisplayAdapter2.default.each(model.pageList, function () {
	                animationSet.push([animation]);
	            });
	        } else {
	            _vveDisplayAdapter2.default.each(model.pageList, function (idx, pageModel) {
	                var pmodel = pageModel.model;

	                if (pageAnimation.test(pmodel.animation)) {
	                    animationSet.push([pmodel.animation]);
	                } else {
	                    animationSet.push(['none']);
	                }
	            });
	        }

	        return animationSet;
	    }

	    /**
	     * 转换图形和对应图像的引用关系
	     * @param  {object} model 应用数据模型
	     * @return {object}       图像组件对应的图像资源引用
	     */
	    function _retriveShapeResourceMap(model) {

	        if (model.hasOwnProperty('shapeImg')) {
	            _vveDisplayAdapter2.default.each(model.shapeImg, function (idx, shape) {
	                shapeResourceMap[shape.refId] = shape.mediaId;
	            });
	        }

	        return shapeResourceMap;
	    }

	    /**
	     * 转换表单数据的引用关系
	     * @param  {object} model 应用数据模型
	     * @return {object}       表单数据引用关系
	     */
	    function _retriveFormResourceMap(model) {
	        if (model.hasOwnProperty('formData')) {
	            _vveDisplayAdapter2.default.each(model.formData, function (key, form) {
	                formDataMap[form.formId] = form;
	            });
	        }

	        return formDataMap;
	    }

	    /**
	     * 监听页面进入事件
	     * @private
	     */
	    function _onPageIn() {}

	    /**
	     * 监听页面退出事件
	     */
	    function _onPageOut() {}

	    /**
	     * 在展示模式下,渲染时，排除隐藏节点
	     * @param model 应用数据模型
	     * @private
	     */
	    function _removeDisabledPages(model) {
	        // 渲染时也同时排除隐藏页面
	        _vveDisplayAdapter2.default.each(model.richData.pageList, function (idx, pageModel) {
	            if (pageModel.model.isDisabled === true && options.loadType === 'display') {
	                delete model.richData.pageList[idx];
	            }
	        });
	    }

	    /**
	     * 收集应用数据上的图片资源，用于在移动端进行异步加载
	     *
	     * @param  {object} model 应用数据模型
	     * @return {array}  应用所涉及的所有图片资源
	     */
	    function _gatherImageResource(model) {
	        var imageArray = [];

	        _vveDisplayAdapter2.default.each(model.richData.pageList, function (idx, pageModel) {
	            var pmodel = pageModel.model;

	            // 不提取隐藏页面的图片资源
	            if (pageModel.model.isDisabled === true && options.loadType === 'edit') {
	                return;
	            }

	            _vveDisplayAdapter2.default.each(pmodel.widgetList, function (wkey, widgetModel) {
	                var wmodel = widgetModel.model;
	                var imageUrl = '';
	                // 提取图像组件的图片资源
	                if (wmodel.subClass === _vveDisplayConstants2.default.WIDGET_SUBCLASS_IMAGE) {
	                    imageUrl = _lkHttp2.default.getVveImage(wmodel.imageMediaId);
	                }

	                // 提取图形渲染生成的图片资源
	                if (wmodel.subClass.indexOf('widget-shape') != -1) {
	                    var shapeImage = shapeResourceMap[wmodel.shapeId];
	                    imageUrl = _lkHttp2.default.getVveImage(shapeImage);
	                }

	                if (_vveDisplayAdapter2.default.trim(imageUrl) !== '') {
	                    imageArray.push(imageUrl);
	                }
	            });

	            //  提取页面背景图片
	            if (model.richData.backgroundImageScope === _vveDisplayConstants2.default.LOCAL_BACKGROUND_IMAGE) {
	                var bgModel = pageModel.model.backgroundImageModel;
	                var imageUrl = _lkHttp2.default.getVveImage(bgModel.mediaId);

	                if (bgModel !== undefined && bgModel.mediaId !== '' && bgModel.mediaId !== undefined) {
	                    imageArray.push(imageUrl);
	                }
	            }
	        });

	        // 提取公共背景图片
	        if (model.richData.backgroundImageScope !== _vveDisplayConstants2.default.LOCAL_BACKGROUND_IMAGE) {
	            var bgModel = model.richData.backgroundImageModel;

	            if (bgModel !== undefined && bgModel.mediaId !== '' && bgModel.mediaId !== undefined) {
	                imageArray.push(_lkHttp2.default.getVveImage(bgModel.mediaId));
	            }
	        }

	        return imageArray;
	    }

	    function render() {
	        appModel = model.richData;
	        formData = model.formData;

	        _retriveShapeResourceMap(model);
	        _retriveFormResourceMap(model);

	        var allImageToLoad = _gatherImageResource(model);
	        var animationSet = _retriveAnimation(model.richData);
	        _removeDisabledPages(model);

	        $workspace.mobileSetmodel(appModel);
	        _buildPageStructure(model);

	        // 渲染音乐处理，根据情况使用外部链接或者内部音乐媒体文件
	        var musicConfig = model.richData.musicConfig;
	        var musicUrl = musicConfig.musicUrl;
	        if (musicConfig.musicMediaId != '') {
	            musicUrl = _lkHttp2.default.getVveAudio(musicConfig.musicMediaId);
	        }

	        // 渲染需要的业务选项
	        // 音乐配置，分享配置，滑动配置等
	        var renderOptions = {
	            imageSet: allImageToLoad,
	            musicEnabled: musicConfig.musicEnabled,
	            musicUrl: musicUrl,
	            slideVertical: model.richData.slideDirection == _vveDisplayConstants2.default.SLIDER_VERTICAL,
	            appName: model.name,
	            shareInfo: model.share,
	            onPageIn: _onPageIn,
	            onPageOut: _onPageOut,
	            animationSet: animationSet,
	            formData: formData,
	            appModel: model
	        };

	        // 矫正分享信息
	        _correctShareData(renderOptions, model);

	        // 初始化每个widget的动画
	        _setAppAnimation(appModel.pageList);

	        return renderOptions;
	    }

	    return {
	        render: render
	    };
	}

	//转换用函数
	/*function contentParse(model) {

	    var $content = $(model);

	    var newModel = $('<div>');

	    $.each($content, function (index, content) {

	        //音频处理
	        var audio = $(content).find('.edui-faked-music');

	        if (audio.length != 0) {

	            var $media;

	            $media = $('<audio>');
	            $media.prop('autoplay', 'autoplay');
	            $media.prop('controls', 'controls');
	            $media.prop('src', $(audio[0]).attr('src'));
	            $media.prop('loop', $(audio[0]).attr('loop'));

	            newModel.append($media);

	        } else {

	            newModel.append($(content));
	        }
	    });

	    return newModel.get(0).innerHTML;
	}*/

	/*function _selectDataInterface(options) {

	}*/

	/**
	 * 获取渲染模式数据加载接口
	 * @private
	 */
	function _getDisplayApiUrl(options) {
	    var urlOptions = {
	        replacer: {
	            id: options.appId
	        }
	    };

	    switch (options.mode) {
	        case 'show':
	            // 作品详情 WORKS_VSITE_GET
	            urlOptions.url = _vveConfigApis2.default['WORKS_VSITE_GET'];
	            break;
	        case 'previewApp':
	            // 作品预览 WORKS_PREVIEW_GET
	            urlOptions.url = _vveConfigApis2.default['WORKS_PREVIEW_GET'];
	            break;
	        case 'previewTpl':
	            // 模板预览 TEMPLATE_PREVIEW_GET
	            urlOptions.url = _vveConfigApis2.default['TEMPLATE_PREVIEW_GET'];
	            break;
	    }

	    return _lkHttpUtils2.default.generateUrl(urlOptions);
	}

	/**
	 * 获取编辑模式数据加载接口
	 * @private
	 */
	function _getEditApiUrl(options) {
	    var urlOptions = {};

	    var AUTHORIZE_METHOD = _vveConfigConstants2.default.OEM_EDIT_MODE;
	    var signature = options.signature;

	    // 内部授权:直接访问
	    if (options.authorizeMethod == AUTHORIZE_METHOD.INTERAL) {
	        if (options.isTemplate) {
	            urlOptions.url = _vveConfigApis2.default['TEMPLATE_GET'];
	            urlOptions.replacer = { tplid: options.appId };
	        } else {
	            urlOptions.url = _vveConfigApis2.default['WORKS_GET'];
	            urlOptions.replacer = { appid: options.appId };
	        }
	    }
	    // 外部授权：调用openapi,需提供 signature
	    else if (options.authorizeMethod == AUTHORIZE_METHOD.EXTERNAL) {
	            if (options.isTemplate) {
	                // TODO:外部授权模式下的模板加载尚未对接
	                throw new Error('尚未支持的业务：外部授权模式下，不可编辑模板！');
	            } else {
	                urlOptions.url = _vveConfigApis2.default['OPEN_WORKS_GET'];
	                urlOptions.replacer = { worksid: options.appId };
	            }

	            urlOptions.params = {
	                appid: signature.appid,
	                noncestr: signature.noncestr,
	                timestamp: signature.timestamp,
	                sign: signature.sign,
	                url: signature.url
	            };
	        } else {
	            // 1.0.0 版本的 迷你编辑器
	            urlOptions.url = _vveConfigApis2.default['OPEN_WORKS_GET'];
	            urlOptions.replacer = { worksid: options.appId };
	            urlOptions.params = {
	                appid: signature.appid,
	                noncestr: signature.noncestr,
	                timestamp: signature.timestamp,
	                sign: signature.sign,
	                url: signature.url
	            };
	        }

	    return _lkHttpUtils2.default.generateUrl(urlOptions);
	}

	/**
	 * 加载并渲染页面应用数据
	 * @param {function} callback 页面应用数据加载并渲染成功后，后续执行的动作
	 * {
	         *     container: $(),
	         *     appId: String,
	         *     callback:Function,
	         *     isTemplate: false,
	         *     loadType: display|edit
	         * }
	 */
	// 新增isContent:true
	function loadPageData(options) {
	    var url = options.loadType === 'edit' ? _getEditApiUrl(options) : _getDisplayApiUrl(options);

	    _lkHttp2.default.get({ url: url }).then(function (data) {
	        var app = new Application(data.data, options);
	        var renderOptions = app.render();
	        options.callbackSuccess(data, renderOptions);
	    }, function (data) {
	        if (_vveDisplayAdapter2.default.isFunction(options.callbackError)) {
	            options.callbackError(data);
	        }
	    });
	}

	/**
	 *
	 * 如果应用未设置分享信息,则使用作品元信息替代
	 * 分享标题: <- 作品标题
	 * 分享描述: <- ''
	 * 分享图片: <- 封面
	 * @private
	 */
	function _correctShareData(renderOptions, appObj) {
	    var shareObj = renderOptions.shareInfo;
	    shareObj = Object.prototype.toString.call(shareObj) === '[object Object]' ? shareObj : {};

	    if (!shareObj.title) {
	        shareObj.title = '';
	    }

	    if (!shareObj.desc) {
	        shareObj.desc = '';
	    }

	    if (!shareObj.imgId) {
	        if (appObj.coverMediaId) {
	            shareObj.imgId = appObj.coverMediaId;
	        } else {
	            // 设置默认图片id
	            shareObj.imgId = 'NOIMAGE';
	        }
	    }

	    renderOptions.shareInfo = shareObj;
	}

	exports.default = {
	    loadPageData: loadPageData
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	__webpack_require__(29);

	__webpack_require__(30);

	var _lkUtils = __webpack_require__(2);

	var _lkUtils2 = _interopRequireDefault(_lkUtils);

	var _vveDisplayConstants = __webpack_require__(6);

	var _vveDisplayConstants2 = _interopRequireDefault(_vveDisplayConstants);

	var _vveDisplayPageAnimate = __webpack_require__(22);

	var _vveDisplayPageAnimate2 = _interopRequireDefault(_vveDisplayPageAnimate);

	var _vveDisplayPopup = __webpack_require__(10);

	var _vveDisplayPopup2 = _interopRequireDefault(_vveDisplayPopup);

	var _vveDisplayForm = __webpack_require__(18);

	var _vveDisplayForm2 = _interopRequireDefault(_vveDisplayForm);

	var _vveDisplayMusic = __webpack_require__(21);

	var _vveDisplayMusic2 = _interopRequireDefault(_vveDisplayMusic);

	var _vveUrl = __webpack_require__(9);

	var _vveUrl2 = _interopRequireDefault(_vveUrl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// config const
	var LAYER_DURATION = 1000;

	// html class const
	var DATA_FIELD_CURR_INDEX = 'layerCurrIndex',
	    CLASS_NAME_STAGE = 'vve-display-stage',
	    CLASS_STAGE = '.' + CLASS_NAME_STAGE,
	    CLASS_NAME_LAYER = 'vve-display-layer',
	    CLASS_LAYER = '.' + CLASS_NAME_LAYER,
	    CLASS_NAME_LAYER0 = 'vve-display-layer0',
	    CLASS_LAYER0 = '.' + CLASS_NAME_LAYER0,
	    CLASS_NAME_LAYER1 = 'vve-display-layer1',
	    CLASS_LAYER1 = '.' + CLASS_NAME_LAYER1,
	    CLASS_NAME_TRANSITION = 'vve-display-transition',

	// arrow
	CLASS_ARROW_DOWN = '.vve-display-arrow-down',
	    CLASS_ARROW_RIGHT = '.vve-display-arrow-right';

	// widge和page的数据模型都存在data('jvve-model-widget')中
	var DATA_FIELD_WIDGET = 'jvve-model-widget';

	_jquery2.default.extend(Show.prototype, {
	    init: init,
	    getHash: getHash,
	    setHash: setHash,
	    setHashSilent: setHashSilent,
	    setArrowElem: setArrowElem,
	    setAd: setAd,
	    initHashLayer: initHashLayer,
	    bindHashEvent: bindHashEvent,
	    unbindHashEvent: unbindHashEvent,
	    hashchangeHandler: hashchangeHandler,
	    initEachLayerGroup: initEachLayerGroup,
	    documentMoveDisable: documentMoveDisable,
	    bindSwipeEvent: bindSwipeEvent,
	    toLayer: toLayer,
	    moveLayer: moveLayer,
	    setTransitionStatus: setTransitionStatus,
	    setAllTransitionStatus: setAllTransitionStatus,
	    isTransition: isTransition,
	    arrowLayerInit: arrowLayerInit,
	    arrowLayer0Show: arrowLayer0Show,
	    arrowLayer0Hide: arrowLayer0Hide,
	    arrowLayer1Show: arrowLayer1Show,
	    arrowLayer1Hide: arrowLayer1Hide,
	    arrowLayer1Set: arrowLayer1Set,
	    bindLinkEvent: bindLinkEvent,
	    setVideos: setVideos,
	    bindVideoShowEvent: bindVideoShowEvent,
	    setForm: setForm,
	    setMusic: setMusic,
	    isPageLocked: isPageLocked
	});

	exports.default = Show;

	/**
	 * 作品展示Class
	 * @param {Object} config
	 */

	function Show(config) {
	    var t = this;

	    // appId
	    t.appId = config.appId;
	    t.uin = config.uin;

	    // 要用到的jquery对象
	    t.previewContainer = config.previewContainer;

	    t.stage = t.previewContainer.find(CLASS_STAGE);
	    t.layer0 = t.previewContainer.find(CLASS_LAYER0);
	    t.layer1 = t.previewContainer.find(CLASS_LAYER1);

	    t.arrowLayer0 = null;
	    t.arrowLayer1 = null;

	    // 正在transition的状态，用来控制页面是否可以滑动，第一个表示layer0的运动状态，第二个表示layer1的运动状态
	    t.transitionStatus = [false, false];

	    t.isPc = config.isPc;
	    t.isLockedMode = config.isLockedMode;

	    t.isVertical = config.isVertical;
	    t.disableDocumentMove = !!config.disableDocumentMove;
	    t.disableHashchange = !!config.disableHashchange;

	    t.pageInCallback = config.onPageIn || _jquery2.default.noop;
	    t.pageOutCallback = config.onPageOut || _jquery2.default.noop;

	    t.pageAnimations = config.pageAnimations;

	    t.linkEnabled = !!config.linkEnabled;

	    // 表单数据
	    t.formData = config.formData;

	    // 音乐
	    t.musicEnabled = config.musicEnabled;
	    t.musicUrl = config.musicUrl;

	    // 实例化popup
	    t.popup = new _vveDisplayPopup2.default(t.previewContainer);

	    // 初始化页面展示
	    t.init(config);

	    // 初始化表单验证，提交
	    t.form = t.setForm();

	    // 初始化音乐播放
	    t.music = t.setMusic();
	}

	/***
	 * 初始化
	 * @param config object  [previewContainer, isVertical, disableDocumentMove, disableHashchange]
	 */
	function init() {
	    var t = this;

	    // 设置第一层级和第二层及的箭头
	    t.setArrowElem();

	    // 初始化每组layer的数据
	    t.initEachLayerGroup(t.stage);
	    t.initEachLayerGroup(t.layer0);

	    // 设置广告到最后一页
	    t.setAd();

	    // 绑定swipe事件到stage
	    t.bindSwipeEvent();

	    // 绑定链接行为事件
	    if (t.linkEnabled) {
	        t.bindLinkEvent();
	    }

	    // 设置视频播放器
	    t.setVideos();

	    // 运动到hash指定的layer
	    if (!t.disableHashchange) {
	        t.bindHashEvent();
	        t.initHashLayer();
	    }

	    // 阻止doucment的touchmove默认动作
	    if (t.disableDocumentMove) {
	        t.documentMoveDisable();
	    }

	    t.arrowLayerInit();

	    // 执行第一页的元素动画
	    t.pageInCallback && t.pageInCallback(0, 0);
	}

	/***
	 * // 设置第一层级和第二层及的箭头
	 */
	function setArrowElem() {
	    var t = this,
	        previewContainer = t.previewContainer;

	    var arrowDown = previewContainer.find(CLASS_ARROW_DOWN),
	        arrowRight = previewContainer.find(CLASS_ARROW_RIGHT);

	    if (t.isVertical) {
	        t.arrowLayer0 = arrowDown;
	        t.arrowLayer1 = arrowRight;
	    } else {
	        t.arrowLayer0 = arrowRight;
	        t.arrowLayer1 = arrowDown;
	    }
	}

	/***
	 * 设置最后一页的底部广告
	 */
	function setAd() {
	    var t = this;

	    var tpl = '<div class="vve-display-ad">想拥有自己的作品？<a href="http://www.iloka.me" class="vve-display-ad-link">iLoka轻松制作H5 &#x2192;</a></div>';

	    t.layer0.last().append(tpl);
	}

	/***
	 * 设置hash
	 */
	function setHash(layer0Index, layer1Index, layer0Direction, layer1Direction) {
	    window.location.hash = _lkUtils2.default.urlSerialize('', {
	        layer0Index: layer0Index,
	        layer1Index: layer1Index,
	        layer0Direction: layer0Direction,
	        layer1Direction: layer1Direction
	    });
	}

	/***
	 * 设置hash，但不触发hashchange事件
	 */
	function setHashSilent(layer0Index, layer1Index, layer0Direction, layer1Direction) {
	    var t = this;

	    if (!t.disableHashchange) {
	        t.unbindHashEvent();
	    }

	    t.setHash(layer0Index, layer1Index, layer0Direction, layer1Direction);

	    if (!t.disableHashchange) {
	        setTimeout(function () {
	            t.bindHashEvent();
	        }, 0);
	    }
	}

	/***
	 * 获取hash上的数据
	 */
	function getHash() {
	    return _lkUtils2.default.urlUnserialize(window.location.hash.substr(1));
	}

	/***
	 * 初始化hanh上指定的页面切换
	 */
	function initHashLayer() {
	    var t = this;

	    var initIndexs = t.getHash();

	    t.toLayer(initIndexs.layer0Index, initIndexs.layer1Index);
	}

	/***
	 * 绑定hashchagne事件
	 */
	function bindHashEvent() {
	    var t = this;

	    window.addEventListener('hashchange', t.hashchangeHandler);
	}

	/***
	 * 解绑hashchagne事件
	 */
	function unbindHashEvent() {
	    var t = this;

	    window.removeEventListener('hashchange', t.hashchangeHandler);
	}

	/***
	 * hashchagne事件句柄
	 */
	function hashchangeHandler() {
	    var t = this;

	    var initIndexs = t.getHash();

	    t.toLayer(initIndexs.layer0Index, initIndexs.layer1Index, initIndexs.layer0Direction, initIndexs.layer1Direction);
	}

	/***
	 * 将每组layer的length和当前页的index挂在他们的父元素上
	 * 显示每组的默认页
	 */
	function initEachLayerGroup(layerParentElement) {
	    layerParentElement.each(function () {
	        var _this = (0, _jquery2.default)(this),
	            layerGroup = _this.children(CLASS_LAYER);

	        // 记录每组layer当前显示页的索引
	        _this.data(DATA_FIELD_CURR_INDEX, 0);

	        // 初始化每组layer中的默认屏
	        layerGroup.eq(0).show();
	    });
	}

	/***
	 * 阻止doucment的touchmove默认动作
	 */
	function documentMoveDisable() {
	    (0, _jquery2.default)(document).on('move', function (e) {
	        e.preventDefault();
	    });
	}

	// 判定currLayer1是否是被禁止滑动翻页
	function isPageLocked() {
	    var t = this,
	        layer0 = t.layer0;

	    var currLayer0 = layer0.eq(t.stage.data(DATA_FIELD_CURR_INDEX)),
	        currLayer1Group = currLayer0.find(CLASS_LAYER1),
	        currLayer1 = currLayer1Group.eq(currLayer0.data(DATA_FIELD_CURR_INDEX));

	    var data = currLayer1.data(DATA_FIELD_WIDGET) || {},
	        pageModel = data.pageModel || {};

	    // 判断是否以锁定模式切换页面
	    if (t.isLockedMode) {
	        return !!pageModel.isLocked;
	    } else {
	        return false;
	    }
	}

	/***
	 * 绑定swipe事件到stage
	 */
	function bindSwipeEvent() {
	    var t = this;

	    t.stage.on('swipeup swipedown swipeleft swiperight', function (e) {

	        // 判断当前页面是否锁定滑动切换
	        if (t.isPageLocked()) {
	            return;
	        }

	        var currIndex, nextIndex, currGroupParent, currGroup, currGroupLength, moveDirection; // 1 for next, -1 for prev
	        var // 当前swipe的方向是否是vertical
	        isVerticalSwipe = Math.abs(e.distY) > Math.abs(e.distX),

	        // 是否要移动layer0
	        isMoveLayer0 = isVerticalSwipe && t.isVertical || !isVerticalSwipe && !t.isVertical,

	        // 是移动到下一页还是上一页
	        isMoveNext = isVerticalSwipe && e.distY < 0 || !isVerticalSwipe && e.distX < 0;

	        moveDirection = isMoveNext ? 1 : -1;

	        // 获取当前layer组的父元素
	        // 向上或者向下
	        if (isMoveLayer0) {
	            // 获取当前页的索引值
	            currGroupParent = t.stage;
	        }
	        // 向左或者向右
	        else {
	                // 获取当前页的索引值
	                currGroupParent = t.layer0.eq(t.stage.data(DATA_FIELD_CURR_INDEX));
	            }

	        // 获取当前组的一些数据
	        currGroup = currGroupParent.children(CLASS_LAYER);
	        currGroupLength = currGroup.length;
	        currIndex = currGroupParent.data(DATA_FIELD_CURR_INDEX);
	        nextIndex = currIndex;

	        // 如果少于2页则不执行动画
	        if (currGroupLength < 2) return;

	        // 获取下一页的索引值
	        if (isMoveNext) {
	            // 下一个
	            nextIndex = ++nextIndex === currGroupLength ? 0 : nextIndex;
	        } else {
	            // 上一个
	            nextIndex = --nextIndex === -1 ? currGroupLength - 1 : nextIndex;
	        }

	        // 运动元素
	        if (isMoveLayer0) {
	            t.toLayer(nextIndex, null, moveDirection, null);
	        } else {
	            t.toLayer(null, nextIndex, null, moveDirection);
	        }
	    });
	}

	/***
	 * 跳转到第几页
	 * @param level0Index       level0组的当前索引值
	 * @param level1Index       level1组的当前索引值
	 * @param level0Direction   运动到level0Index的方向，-1表示next，1表示prev
	 * @param level1Direction   运动到level1Index的方向，-1表示next，1表示prev
	 */
	function toLayer(level0Index, level1Index, level0Direction, level1Direction) {
	    var t = this;

	    // layer0
	    var currLayer0Parent, currLayer0Group, currLayer0GroupLength, currLayer0Index, currLayer0, nextLayer0Index, nextLayer0;

	    // layer1
	    var currLayer1Parent, currLayer1Group, currLayer1GroupLength, currLayer1Index, currLayer1, nextLayer1Index, nextLayer1;

	    // 是否运动对应的layer
	    var shouldMoveLayer0, shouldMoveLayer1;

	    nextLayer0Index = parseInt(level0Index);
	    nextLayer1Index = parseInt(level1Index);

	    level0Direction = parseInt(level0Direction);
	    level1Direction = parseInt(level1Direction);

	    shouldMoveLayer0 = !isNaN(nextLayer0Index), shouldMoveLayer1 = !isNaN(nextLayer1Index);

	    // layer0's info
	    currLayer0Parent = t.stage;
	    currLayer0Group = currLayer0Parent.children(CLASS_LAYER);
	    currLayer0GroupLength = currLayer0Group.length;
	    currLayer0Index = currLayer0Parent.data(DATA_FIELD_CURR_INDEX);
	    currLayer0 = currLayer0Group.eq(currLayer0Index);

	    // get nextLayer0Index and nextLayer0
	    if (shouldMoveLayer0) {
	        nextLayer0Index = nextLayer0Index < 0 ? 0 : nextLayer0Index;
	        nextLayer0Index = nextLayer0Index > currLayer0GroupLength - 1 ? currLayer0GroupLength - 1 : nextLayer0Index;

	        nextLayer0 = currLayer0Group.eq(nextLayer0Index);
	    } else {
	        nextLayer0Index = currLayer0Index;
	        nextLayer0 = currLayer0;
	    }

	    // 修正level0Direction
	    if (isNaN(level0Direction)) {
	        // 如果没有指定level0Direction，则根据layer在页面中的顺序判断
	        level0Direction = nextLayer0Index > currLayer0Index ? 1 : -1;
	    } else {
	        // 如果指定了，则修正level0Direction
	        level0Direction = level0Direction > 0 ? 1 : -1;
	    }

	    // layer1's info
	    currLayer1Parent = nextLayer0;
	    currLayer1Group = currLayer1Parent.children(CLASS_LAYER);
	    currLayer1GroupLength = currLayer1Group.length;
	    currLayer1Index = currLayer1Parent.data(DATA_FIELD_CURR_INDEX);
	    currLayer1 = currLayer1Group.eq(currLayer1Index);

	    // get nextLayer1Index and nextLayer1
	    if (shouldMoveLayer1) {
	        nextLayer1Index = nextLayer1Index < 0 ? 0 : nextLayer1Index;
	        nextLayer1Index = nextLayer1Index > currLayer1GroupLength - 1 ? currLayer1GroupLength - 1 : nextLayer1Index;

	        nextLayer1 = currLayer1Group.eq(nextLayer1Index);
	    } else {
	        nextLayer1Index = currLayer1Index;
	        nextLayer1 = currLayer1;
	    }

	    // 修正level1Direction
	    if (isNaN(level1Direction)) {
	        // 如果没有指定level0Direction，则根据layer在页面中的顺序判断
	        level1Direction = nextLayer1Index > currLayer1Index ? 1 : -1;
	    } else {
	        // 如果指定了，则修正level1Direction
	        level1Direction = level1Direction > 0 ? 1 : -1;
	    }

	    // 如果页面正在切换，则不继续执行下一轮切换
	    if (t.isTransition()) {
	        return;
	    }

	    // 设置hash
	    if (!t.disableHashchange) {
	        t.setHashSilent(nextLayer0Index, nextLayer1Index, level0Direction, level1Direction);
	    }

	    // 重置所有视频，以解决在Android上切换时视频浮层的问题
	    t.setVideos();

	    // 如果运动layer0
	    if (shouldMoveLayer0) {
	        if (currLayer0Index == nextLayer0Index) {
	            shouldMoveLayer0 = false;
	        } else {
	            // 保存当前layer的索引值到他们的父元素中，以便下次使用
	            currLayer0Parent.data(DATA_FIELD_CURR_INDEX, nextLayer0Index);

	            // 设定layer0的运动状态为false，屏蔽运动时的再次swipe
	            t.setTransitionStatus(0, true);

	            // 运动当前元素
	            t.moveLayer(currLayer0, nextLayer0, t.isVertical, level0Direction, 0);
	        }
	    }

	    // 如果运动layer1
	    if (shouldMoveLayer1) {
	        if (currLayer1Index == nextLayer1Index) {
	            shouldMoveLayer1 = false;
	        } else {
	            // 保存当前layer的索引值到他们的父元素中，以便下次使用
	            currLayer1Parent.data(DATA_FIELD_CURR_INDEX, nextLayer1Index);

	            // 设定layer1的运动状态为false，屏蔽运动时的再次swipe
	            setTransitionStatus(1, true);

	            // 运动当前元素
	            if (shouldMoveLayer0) {
	                setTimeout(function () {
	                    moveLayer(currLayer1, nextLayer1, !t.isVertical, level1Direction, 1);
	                }, LAYER_DURATION);
	            } else {
	                moveLayer(currLayer1, nextLayer1, !t.isVertical, level1Direction, 1);
	            }
	        }
	    }
	}

	/***
	 * 运动元素
	 * @param curr                      当前元素
	 * @param next                      目标元素
	 * @param isVertical                是否是垂直方向运动
	 * @param moveDirection             运动方向，-1表示next，1表示prev
	 * @param transitionStatusIndex     当前运动的元素的transition status在transitionStatus中的索引值
	 */
	function moveLayer(curr, next, isVertical, moveDirection, transitionStatusIndex) {
	    var t = this;

	    var currState, currStateStyle, currStateStyleName, currStateBefore, nextStateBefore, currStateAfter, nextStateAfter;

	    var currLayer0Index, currLayer1Index, nextLayer0Index, nextLayer1Index;

	    // 获取curr和next的索引
	    if (curr.attr('class').indexOf(CLASS_NAME_LAYER0) > -1) {
	        // 如果当前元素是preview-layer1
	        currLayer0Index = curr.index();
	        currLayer1Index = curr.data(DATA_FIELD_CURR_INDEX);
	        nextLayer0Index = next.index();
	        nextLayer1Index = next.data(DATA_FIELD_CURR_INDEX);
	    } else {
	        // 如果当前元素是preview-layer0
	        currLayer0Index = nextLayer0Index = curr.parent().index();

	        currLayer1Index = curr.index();
	        nextLayer1Index = next.index();
	    }

	    currStateStyleName = t.pageAnimations[nextLayer0Index][nextLayer1Index];
	    currStateStyle = _vveDisplayPageAnimate2.default[currStateStyleName];

	    // 获取当前运动配置
	    if (t.isVertical) {
	        // 纵向
	        if (moveDirection > 0) {
	            currState = currStateStyle.b2t;
	        } else {
	            currState = currStateStyle.t2b;
	        }
	    } else {
	        // 横向
	        if (moveDirection > 0) {
	            currState = currStateStyle.r2l;
	        } else {
	            currState = currStateStyle.l2r;
	        }
	    }

	    // 当前页运动前的状态
	    currStateBefore = currState.currStateBefore;
	    // 当前页运动后的状态
	    currStateAfter = currState.currStateAfter;

	    // 下一页运动后的状态
	    nextStateAfter = currState.nextStateAfter;
	    // 下一页运动前的状态
	    nextStateBefore = currState.nextStateBefore;

	    // 预设动画初始位置
	    curr.css(currStateBefore);
	    next.css(nextStateBefore);

	    // 设定过渡属性和终点位置
	    setTimeout(function () {

	        curr.addClass(CLASS_NAME_TRANSITION).css(currStateAfter);
	        next.addClass(CLASS_NAME_TRANSITION).css(nextStateAfter);

	        pageAnimate().then(function () {
	            //### curr
	            curr.removeClass(CLASS_NAME_TRANSITION);
	            curr.off('webkitTransitionEnd');
	            // out回调
	            t.pageOutCallback && t.pageOutCallback(currLayer0Index, currLayer1Index);
	            // 隐藏当前元素，并设置透明度为1
	            curr.css({
	                display: 'none',
	                opacity: 1
	            });

	            //### next
	            next.removeClass(CLASS_NAME_TRANSITION);
	            next.off('webkitTransitionEnd');
	            // 控制arrowLayer0, arrowLayer1的显示和隐藏
	            t.arrowLayerInit();
	            // in回调
	            t.pageInCallback && t.pageInCallback(nextLayer0Index, nextLayer1Index);
	            // 设定当前layer的运动状态为false
	            t.setTransitionStatus(transitionStatusIndex, false);
	        });

	        function pageAnimate() {
	            var deferred = _jquery2.default.Deferred();

	            curr.on('webkitTransitionEnd', function () {
	                deferred.resolve();
	            });

	            next.on('webkitTransitionEnd', function () {
	                deferred.resolve();
	            });

	            return deferred.promise();
	        }
	    }, 20);
	}

	/***
	 * TODO 需要检查一下index的使用状态
	 *
	 * 设定元素运动状态
	 * @param index     当前元素的运动状态在transitionStatus中的索引值
	 * @param status    当前元素要设置的运动状态 true|false
	 */
	function setTransitionStatus(index, status) {
	    var t = this;
	    index = parseInt(index, 10);
	    var length = t.transitionStatus.length;

	    if (!isNaN(index) && index > -1 && index < length) {
	        t.transitionStatus[index] = !!status;
	    }
	}

	/***
	 * 将所有元素的运动状态设置为true
	 * @param status    所有元素即将被设置的运动状态 true|false
	 */
	function setAllTransitionStatus(status) {
	    var t = this;

	    for (var i = 0, l = t.transitionStatus.length; i < l; i++) {
	        t.transitionStatus[i] = !!status;
	    }
	}

	/***
	 * 检测是否有元素仍在运动
	 */
	function isTransition() {
	    var t = this;

	    var status = false;

	    for (var i = 0, l = t.transitionStatus.length; i < l; i++) {
	        if (t.transitionStatus[i]) {
	            status = true;
	            break;
	        }
	    }

	    return status;
	}

	/***
	 * 初始化arrowLayer的显示
	 */
	function arrowLayerInit() {
	    var t = this,
	        layer0 = t.layer0;

	    if (t.isPageLocked()) {
	        t.arrowLayer0Hide();
	        t.arrowLayer1Hide();
	    } else {
	        // 显示arrowLayer0
	        if (layer0.length > 1) {
	            t.arrowLayer0Show();
	        } else {
	            t.arrowLayer0Hide();
	        }

	        // 控制arrowLayer1的显示和隐藏
	        layer0.length && t.arrowLayer1Set();
	    }
	}

	/***
	 * 显示arrowLayer0
	 */
	function arrowLayer0Show() {
	    this.arrowLayer0.stop(true, false).fadeIn();
	}

	/***
	 * 隐藏arrowLayer0
	 */
	function arrowLayer0Hide() {
	    this.arrowLayer0.stop(true, false).fadeOut();
	}

	/***
	 * 显示arrowLayer1
	 */
	function arrowLayer1Show() {
	    this.arrowLayer1.stop(true, false).fadeIn();
	}

	/***
	 * 隐藏arrowLayer1
	 */
	function arrowLayer1Hide() {
	    this.arrowLayer1.stop(true, false).fadeOut();
	}

	/***
	 * 控制arrowLayer1的显示和隐藏
	 */
	function arrowLayer1Set() {
	    var t = this,
	        layer0 = t.layer0;

	    var currLayer0 = layer0.eq(t.stage.data(DATA_FIELD_CURR_INDEX)),
	        currLayer1Group = currLayer0.find(CLASS_LAYER1);

	    if (currLayer1Group.length > 1) {
	        t.arrowLayer1Show();
	    } else {
	        t.arrowLayer1Hide();
	    }
	}

	/***
	 * 绑定链接行为事件
	 */
	function bindLinkEvent() {
	    var t = this;

	    // 内链
	    t.stage.on('click', '.' + _vveDisplayConstants2.default.WIDGET_LINK_TAG + '-inner', function () {
	        var linkModel = (0, _jquery2.default)(this).data(_vveDisplayConstants2.default.WIDGET_LINK_MODEL);
	        t.toLayer(linkModel.vIndex * 1 - 1, linkModel.hIndex);
	    });
	    // 电话
	    t.stage.on('click', '.' + _vveDisplayConstants2.default.WIDGET_LINK_TAG + '-phone', function () {
	        var linkModel = (0, _jquery2.default)(this).data(_vveDisplayConstants2.default.WIDGET_LINK_MODEL);
	        if (linkModel.phone) {
	            window.location.href = 'tel://' + linkModel.phone;
	        }
	    });

	    // 外链
	    t.stage.on('click', '.' + _vveDisplayConstants2.default.WIDGET_LINK_TAG + '-external', function () {
	        var linkModel = (0, _jquery2.default)(this).data(_vveDisplayConstants2.default.WIDGET_LINK_MODEL);
	        redirect(linkModel.url);
	    });

	    // 优惠券红包
	    t.stage.on('click', '.' + _vveDisplayConstants2.default.WIDGET_ACTIONS_TAG + '-coupon', function () {
	        var actionModel = (0, _jquery2.default)(this).data(_vveDisplayConstants2.default.WIDGET_ACTIONS_MODEL);
	        var packet = actionModel.model;
	        var url = _vveUrl2.default.getPacketUrl(t.uin, {
	            type: packet.type,
	            id: packet.id,
	            resId: t.appId
	        });
	        redirect(url);
	    });

	    // 一键导购
	    t.stage.on('click', '.' + _vveDisplayConstants2.default.WIDGET_ACTIONS_TAG + '-buy-now', function () {
	        var actionModel = (0, _jquery2.default)(this).data(_vveDisplayConstants2.default.WIDGET_ACTIONS_MODEL);
	        var url = _vveUrl2.default.getProductGuideUrl(t.uin, actionModel.model, paramObject);
	        redirect(url);
	    });

	    // 活动链接
	    t.stage.on('click', '.' + _vveDisplayConstants2.default.WIDGET_ACTIONS_TAG + '-activity', function () {
	        var actionModel = (0, _jquery2.default)(this).data(_vveDisplayConstants2.default.WIDGET_ACTIONS_MODEL);
	        var url = _vveUrl2.default.getActivityUrl(t.uin, actionModel.model);
	        // console.log(actionModel, url);
	        redirect(url);
	    });

	    // 积分红包
	    // t.stage.on('click', '.oem-mobile-action-integral', function () {
	    //     var actionModel = $(this).data('oem-mobile-action-data');
	    //     var packet = actionModel.model;
	    //     var url = vveUrl.getPacketUrl(t.uin, {
	    //         type: packet.type,
	    //         id: packet.id,
	    //         resId: t.appId
	    //     });

	    //     redirect(url);
	    // });

	    // console.log("===== 绑定一键导购业务:", window.paramObject);

	    // // 打赏
	    // t.stage.on('click', '.oem-mobile-action-reward', function () {
	    //     var url = vveUrl.getTipsUrl(t.uin, t.appId, RES_TYPE.H5);
	    //     redirect(url);
	    // });

	    // // 点赞
	    // t.stage.on('click', '.oem-mobile-action-like', function () {
	    //     http.get({
	    //         url: configApis['CONTENT_LIKE_GET']
	    //     }, {
	    //             id: t.appId,
	    //             resType: 'h5'
	    //         }).then(function () {
	    //         });
	    // });
	}

	function redirect(url) {
	    if (_lkUtils2.default.isURL(url)) {
	        window.location.href = url;
	    }
	}

	/***
	 * 设置视频播放器
	 */
	function setVideos() {
	    var t = this,
	        stage = t.stage;

	    if (!t.isPc) {
	        // $.find(className)要加'.'
	        // console.log(stage.find('.'+constants.WIDGET_VIDEO_TAG));
	        stage.find('.' + _vveDisplayConstants2.default.WIDGET_VIDEO_TAG).each(function () {
	            var _this = (0, _jquery2.default)(this),
	                videoData = _this.data(_vveDisplayConstants2.default.WIDGET_VIDEO_MODEL);

	            var videoContent = '<iframe width="100%" height="100%" src="' + videoData.url + '"></iframe>';

	            _this.html(videoContent);
	        });
	    }
	}

	/***
	 * 绑定视屏播放事件
	 */
	function bindVideoShowEvent() {
	    var t = this,
	        stage = t.stage;

	    stage.on('click', '.' + _vveDisplayConstants2.default.WIDGET_VIDEO_TAG, function () {
	        var _this = (0, _jquery2.default)(this),
	            videoData = _this.data(_vveDisplayConstants2.default.WIDGET_VIDEO_MODEL);

	        var videoContent = '<div style="width: 320px; height: 194px;"><iframe width="100%" height="100%" src="' + videoData.url + '"></iframe></div>';

	        t.popup.tip({
	            msg: videoContent,
	            tplName: 'fullscreen',
	            documentClose: true
	        });
	    });
	}

	// 设置表单验证，表单提交
	function setForm() {
	    var t = this;

	    return new _vveDisplayForm2.default({
	        previewContainer: t.previewContainer,
	        formData: t.formData,
	        appId: t.appId,
	        isPc: t.isPc
	    });
	}

	// 设置背景音乐
	function setMusic() {
	    var t = this;

	    // 加载背景音乐
	    return new _vveDisplayMusic2.default({
	        previewContainer: t.previewContainer,
	        musicUrl: t.musicUrl,
	        musicEnabled: t.musicEnabled
	    });
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {

	    // ng component register
	    NG_COMPONENT_EXISTED: 'The {componentType} "{componentName}" is already existed!',
	    NG_MODULE_NAME_ERROR: 'The module name "{moduleName}" is not String!',
	    NG_MODULE_DEPENDENCE_ERROR: 'The module\'s depdencies should be an Array!',
	    NG_MODULE_DEPENDENCE_NAME_ERROR: 'The module\'s depdencies should be an Array!',

	    // http exception tip
	    HTTP_NETWORK_INTERRUPTION: '您的网络已中断，请连接后再试',
	    HTTP_UNAUTHORIZED: '您尚未登陆，请登陆后操作',
	    HTTP_TIMEOUT: '请求超时，请重新尝试刚才的操作',
	    HTTP_SERVER_ERROR: '服务器内部错误，请重新尝试刚才的操作',
	    HTTP_OPERATION_FAILURE: '操作不成功，请重试'

	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// 解决在iOS下的微信上无法设置文档标题的问题
	function setTitle(str) {
	    var body = document.getElementsByTagName('body')[0],
	        iframe = document.createElement('iframe');

	    // 设置文档标题
	    document.title = str;

	    iframe.setAttribute('src', '/favicon.ico');
	    iframe.addEventListener('load', iframeOperate);
	    body.appendChild(iframe);

	    function iframeOperate() {
	        setTimeout(function () {
	            iframe.removeEventListener('load', iframeOperate);
	            body.removeChild(iframe);
	        });
	    }
	}

	exports.default = {
	    setTitle: setTitle
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vveConfigExceptions = __webpack_require__(25);

	var _vveConfigExceptions2 = _interopRequireDefault(_vveConfigExceptions);

	var _lkLog = __webpack_require__(28);

	var _lkLog2 = _interopRequireDefault(_lkLog);

	var _lkUtils = __webpack_require__(2);

	var _lkUtils2 = _interopRequireDefault(_lkUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RESPONSE_JQUERY_LIKE = 'resJqueryLike',
	    RESPONSE_NG_LIKE = 'resNgLike';

	/**
	 * -1      400   所有校验不通过的错误
	 * 40100   400   缺少参数
	 * 40101   400   参数所带值错误
	 * 40001   401   Unauthorized    未认证
	 * 40003   403   Forbidden   未授权
	 * 40004   404   Not Found   资源不存在
	 * 40008   408   操作超时
	 * 50000   500   internal Server Error   服务器内部错误
	 * 50002   502   Bad Gateway 错误的网关
	 *
	 * http异常需要默认处理的errCode
	 */
	var ERRCODE_UNAUTHORIZED = 40001,
	    ERRCODE_TIMEOUT = 40008,
	    ERRCODE_SERVER_ERROR = 50000;

	/**
	 * 43001   200   操作不成功，请重试。  网络中断等偶发状态
	 *
	 * http业务操作失败需要默认处理的errCode
	 */
	var LOGIC_ERRCODE_OPERATION_FAILURE = 43001;

	/**
	 * 41000   200   Token Invalidated
	 * 44000   200   未知的错误
	 * 44001   200   Not Support
	 * 44002   200   空指针错误
	 * 44003   200   运行时错误
	 * 49001   200   openId is null
	 * 49002   200   微信验证不成功，请重新打开进入页面
	 *
	 * 底层不需要处理的逻辑错误
	 */
	var LOGIC_ERRCODES_IGNORE = [41000, 44000, 44001, 44002, 44003, 49001, 49002];

	/**
	 * 其他业务逻辑错误
	 * 41001   200   用户名或者密码错误
	 * 41002   200   用户己存在
	 * 41003   200   不支持的文件类型
	 * 41004   200   己超过最大的允许值
	 * 41005   200   尚未发布
	 * 41006   200   无效的邮件地址
	 * 42001   200   不被允许更改的状态值  越界修改、越权修改
	 * 42002   200   不允许删除
	 * 42003   200   Not Ready Or Not allowed To View
	 * -1      200
	 */

	/**
	 * 前端封装请求接口生成的，错误代码为“99999”，错误信息格式如下
	 * 999999        前端错误信息
	 * {
	         *     errCode: 99999,
	         *     errMsg: 'an error messsage'
	         * }
	 */

	exports.default = httpIntercept;

	/**
	 * @param  {jQ promise object}
	 * @param  {jQ Deferred object}
	 * @param  {Function}
	 * @param  {String} 返回结果的类型['resJqueryLike' | 'resNgLike']
	 * @return {Undefined}
	 */

	function httpIntercept(ajaxPromise, wrapperDeferredObj, exceptionHandler, resType) {
	    var deferred = wrapperDeferredObj;

	    ajaxPromise.then(function (result) {
	        var data = getSuccessData(result, resType);

	        // 处理errCode
	        if (data.errCode === 0) {
	            deferred.resolve(result);
	        } else {
	            // 业务逻辑失败的分类处理参见《Linkin Rest服务接口错误状态码(v1.1)》

	            // 网络中断等偶发状态导致的操作不成功，统一处理
	            if (data.errCode === LOGIC_ERRCODE_OPERATION_FAILURE) {
	                alert(_vveConfigExceptions2.default['HTTP_OPERATION_FAILURE']);
	            }
	            // 其他业务逻辑不需要处理的失败
	            else if (LOGIC_ERRCODES_IGNORE.indexOf(data.errCode) > -1) {
	                    _lkLog2.default.error('HTTP FAILED: ' + data.errMsg);
	                }
	                // 业务逻辑需要处理的失败
	                else {
	                        deferred.reject(data);
	                    }
	        }
	    }, function (result) {
	        var data = getErrorData(result, resType);

	        // 网络中断
	        if (isNetworkInterrupt(result, resType)) {
	            _lkLog2.default.error('HTTP ERROR: ' + _vveConfigExceptions2.default['HTTP_NETWORK_INTERRUPTION']);
	            return;
	        }

	        // 请求对异常的特殊处理
	        if (_lkUtils2.default.isFunction(exceptionHandler)) {
	            exceptionHandler(data);
	        }
	        // 异常的统一处理
	        // 异常的分类处理参见《Linkin Rest服务接口错误状态码(v1.1)》
	        else {
	                // 未认证（未登陆）
	                if (data.errCode === ERRCODE_UNAUTHORIZED) {
	                    // log.error( configExceptions['HTTP_UNAUTHORIZED'] );
	                    // 请求超时
	                } else if (data.errCode === ERRCODE_TIMEOUT) {
	                    //alert( configExceptions['HTTP_TIMEOUT'] );
	                    // 服务器内部错误
	                } else if (data.errCode === ERRCODE_SERVER_ERROR) {
	                    // alert( configExceptions['HTTP_SERVER_ERROR'] );
	                    // 其他错误
	                } else {
	                    _lkLog2.default.error('HTTP ERROR: ' + data.errMsg);
	                }
	                deferred.reject(data);
	            }
	    });
	}

	/**
	 * 返回统一的成功回调的数据对象
	 */
	function getSuccessData(result, resType) {
	    var data;

	    // 拿到后端返回的数据
	    if (resType === RESPONSE_JQUERY_LIKE) {
	        // jqery ajax response data
	        data = result;
	    } else if (resType === RESPONSE_NG_LIKE) {
	        // angular ajax response data
	        data = result.data;
	    } else {
	        data = {};
	    }

	    return data;
	}

	/**
	 * 返回统一的错误回调的数据对象
	 */
	function getErrorData(result, resType) {
	    var data;

	    // 拿到后端返回的数据
	    if (resType === RESPONSE_JQUERY_LIKE) {
	        // jqery ajax response data
	        data = result.responseJSON;
	    } else if (resType === RESPONSE_NG_LIKE) {
	        // angular ajax response data
	        data = result.data;
	    } else {
	        data = {};
	    }

	    return data;
	}

	/**
	 * 判断是否网络中断
	 */
	function isNetworkInterrupt(result, resType) {
	    var isInterrupt = false;

	    // jquery ajax response status
	    if (resType === RESPONSE_JQUERY_LIKE) {
	        if (result.status === 0) {
	            isInterrupt = true;
	        }
	        // angular ajax response status
	    } else if (resType === RESPONSE_NG_LIKE) {
	        if (result.status === -1) {
	            isInterrupt = true;
	        }
	    }

	    return isInterrupt;
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vveConfigEnv = __webpack_require__(3);

	var _vveConfigEnv2 = _interopRequireDefault(_vveConfigEnv);

	var _lkUtils = __webpack_require__(2);

	var _lkUtils2 = _interopRequireDefault(_lkUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function output(type, msg, data) {

	    if ('console' in window) {
	        msg = _lkUtils2.default.compileBraceStr(msg, data);
	        if (!_vveConfigEnv2.default.ENV_IS_ONLINE) {
	            /* eslint-disable */
	            console[type](msg);
	            /* eslint-enable */
	        }
	    }
	}

	exports.default = {
	    log: function log(msg, data) {
	        output('log', msg, data);
	    },

	    info: function info(msg, data) {
	        output('info', msg, data);
	    },

	    warn: function warn(msg, data) {
	        output('warn', msg, data);
	    },

	    error: function error(msg, data) {
	        output('error', msg, data);
	    },

	    debug: function debug(msg, data) {
	        output('debug', msg, data);
	    }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// jquery.event.move
	//
	// 1.3.6
	//
	// Stephen Band
	//
	// Triggers 'movestart', 'move' and 'moveend' events after
	// mousemoves following a mousedown cross a distance threshold,
	// similar to the native 'dragstart', 'drag' and 'dragend' events.
	// Move events are throttled to animation frames. Move event objects
	// have the properties:
	//
	// pageX:
	// pageY:   Page coordinates of pointer.
	// startX:
	// startY:  Page coordinates of pointer at movestart.
	// distX:
	// distY:  Distance the pointer has moved since movestart.
	// deltaX:
	// deltaY:  Distance the finger has moved since last event.
	// velocityX:
	// velocityY:  Average velocity over last few events.


	(function (module) {
		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (module), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			// Browser globals
			module(jQuery);
		}
	})(function(jQuery, undefined){

		var // Number of pixels a pressed pointer travels before movestart
		    // event is fired.
		    threshold = 6,
		
		    add = jQuery.event.add,
		
		    remove = jQuery.event.remove,

		    // Just sugar, so we can have arguments in the same order as
		    // add and remove.
		    trigger = function(node, type, data) {
		    	jQuery.event.trigger(type, data, node);
		    },

		    // Shim for requestAnimationFrame, falling back to timer. See:
		    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
		    requestFrame = (function(){
		    	return (
		    		window.requestAnimationFrame ||
		    		window.webkitRequestAnimationFrame ||
		    		window.mozRequestAnimationFrame ||
		    		window.oRequestAnimationFrame ||
		    		window.msRequestAnimationFrame ||
		    		function(fn, element){
		    			return window.setTimeout(function(){
		    				fn();
		    			}, 25);
		    		}
		    	);
		    })(),
		    
		    ignoreTags = {
		    	textarea: true,
		    	input: true,
		    	select: true,
		    	button: true
		    },
		    
		    mouseevents = {
		    	move: 'mousemove',
		    	cancel: 'mouseup dragstart',
		    	end: 'mouseup'
		    },
		    
		    touchevents = {
		    	move: 'touchmove',
		    	cancel: 'touchend',
		    	end: 'touchend'
		    };


		// Constructors
		
		function Timer(fn){
			var callback = fn,
			    active = false,
			    running = false;
			
			function trigger(time) {
				if (active){
					callback();
					requestFrame(trigger);
					running = true;
					active = false;
				}
				else {
					running = false;
				}
			}
			
			this.kick = function(fn) {
				active = true;
				if (!running) { trigger(); }
			};
			
			this.end = function(fn) {
				var cb = callback;
				
				if (!fn) { return; }
				
				// If the timer is not running, simply call the end callback.
				if (!running) {
					fn();
				}
				// If the timer is running, and has been kicked lately, then
				// queue up the current callback and the end callback, otherwise
				// just the end callback.
				else {
					callback = active ?
						function(){ cb(); fn(); } : 
						fn ;
					
					active = true;
				}
			};
		}


		// Functions
		
		function returnTrue() {
			return true;
		}
		
		function returnFalse() {
			return false;
		}
		
		function preventDefault(e) {
			e.preventDefault();
		}
		
		function preventIgnoreTags(e) {
			// Don't prevent interaction with form elements.
			if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }
			
			e.preventDefault();
		}

		function isLeftButton(e) {
			// Ignore mousedowns on any button other than the left (or primary)
			// mouse button, or when a modifier key is pressed.
			return (e.which === 1 && !e.ctrlKey && !e.altKey);
		}

		function identifiedTouch(touchList, id) {
			var i, l;

			if (touchList.identifiedTouch) {
				return touchList.identifiedTouch(id);
			}
			
			// touchList.identifiedTouch() does not exist in
			// webkit yet… we must do the search ourselves...
			
			i = -1;
			l = touchList.length;
			
			while (++i < l) {
				if (touchList[i].identifier === id) {
					return touchList[i];
				}
			}
		}

		function changedTouch(e, event) {
			var touch = identifiedTouch(e.changedTouches, event.identifier);

			// This isn't the touch you're looking for.
			if (!touch) { return; }

			// Chrome Android (at least) includes touches that have not
			// changed in e.changedTouches. That's a bit annoying. Check
			// that this touch has changed.
			if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

			return touch;
		}


		// Handlers that decide when the first movestart is triggered
		
		function mousedown(e){
			var data;

			if (!isLeftButton(e)) { return; }

			data = {
				target: e.target,
				startX: e.pageX,
				startY: e.pageY,
				timeStamp: e.timeStamp
			};

			add(document, mouseevents.move, mousemove, data);
			add(document, mouseevents.cancel, mouseend, data);
		}

		function mousemove(e){
			var data = e.data;

			checkThreshold(e, data, e, removeMouse);
		}

		function mouseend(e) {
			removeMouse();
		}

		function removeMouse() {
			remove(document, mouseevents.move, mousemove);
			remove(document, mouseevents.cancel, mouseend);
		}

		function touchstart(e) {
			var touch, template;

			// Don't get in the way of interaction with form elements.
			if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

			touch = e.changedTouches[0];
			
			// iOS live updates the touch objects whereas Android gives us copies.
			// That means we can't trust the touchstart object to stay the same,
			// so we must copy the data. This object acts as a template for
			// movestart, move and moveend event objects.
			template = {
				target: touch.target,
				startX: touch.pageX,
				startY: touch.pageY,
				timeStamp: e.timeStamp,
				identifier: touch.identifier
			};

			// Use the touch identifier as a namespace, so that we can later
			// remove handlers pertaining only to this touch.
			add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
			add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
		}

		function touchmove(e){
			var data = e.data,
			    touch = changedTouch(e, data);

			if (!touch) { return; }

			checkThreshold(e, data, touch, removeTouch);
		}

		function touchend(e) {
			var template = e.data,
			    touch = identifiedTouch(e.changedTouches, template.identifier);

			if (!touch) { return; }

			removeTouch(template.identifier);
		}

		function removeTouch(identifier) {
			remove(document, '.' + identifier, touchmove);
			remove(document, '.' + identifier, touchend);
		}


		// Logic for deciding when to trigger a movestart.

		function checkThreshold(e, template, touch, fn) {
			var distX = touch.pageX - template.startX,
			    distY = touch.pageY - template.startY;

			// Do nothing if the threshold has not been crossed.
			if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

			triggerStart(e, template, touch, distX, distY, fn);
		}

		function handled() {
			// this._handled should return false once, and after return true.
			this._handled = returnTrue;
			return false;
		}

		function flagAsHandled(e) {
			e._handled();
		}

		function triggerStart(e, template, touch, distX, distY, fn) {
			var node = template.target,
			    touches, time;

			touches = e.targetTouches;
			time = e.timeStamp - template.timeStamp;

			// Create a movestart object with some special properties that
			// are passed only to the movestart handlers.
			template.type = 'movestart';
			template.distX = distX;
			template.distY = distY;
			template.deltaX = distX;
			template.deltaY = distY;
			template.pageX = touch.pageX;
			template.pageY = touch.pageY;
			template.velocityX = distX / time;
			template.velocityY = distY / time;
			template.targetTouches = touches;
			template.finger = touches ?
				touches.length :
				1 ;

			// The _handled method is fired to tell the default movestart
			// handler that one of the move events is bound.
			template._handled = handled;
				
			// Pass the touchmove event so it can be prevented if or when
			// movestart is handled.
			template._preventTouchmoveDefault = function() {
				e.preventDefault();
			};

			// Trigger the movestart event.
			trigger(template.target, template);

			// Unbind handlers that tracked the touch or mouse up till now.
			fn(template.identifier);
		}


		// Handlers that control what happens following a movestart

		function activeMousemove(e) {
			var timer = e.data.timer;

			e.data.touch = e;
			e.data.timeStamp = e.timeStamp;
			timer.kick();
		}

		function activeMouseend(e) {
			var event = e.data.event,
			    timer = e.data.timer;
			
			removeActiveMouse();

			endEvent(event, timer, function() {
				// Unbind the click suppressor, waiting until after mouseup
				// has been handled.
				setTimeout(function(){
					remove(event.target, 'click', returnFalse);
				}, 0);
			});
		}

		function removeActiveMouse(event) {
			remove(document, mouseevents.move, activeMousemove);
			remove(document, mouseevents.end, activeMouseend);
		}

		function activeTouchmove(e) {
			var event = e.data.event,
			    timer = e.data.timer,
			    touch = changedTouch(e, event);

			if (!touch) { return; }

			// Stop the interface from gesturing
			e.preventDefault();

			event.targetTouches = e.targetTouches;
			e.data.touch = touch;
			e.data.timeStamp = e.timeStamp;
			timer.kick();
		}

		function activeTouchend(e) {
			var event = e.data.event,
			    timer = e.data.timer,
			    touch = identifiedTouch(e.changedTouches, event.identifier);

			// This isn't the touch you're looking for.
			if (!touch) { return; }

			removeActiveTouch(event);
			endEvent(event, timer);
		}

		function removeActiveTouch(event) {
			remove(document, '.' + event.identifier, activeTouchmove);
			remove(document, '.' + event.identifier, activeTouchend);
		}


		// Logic for triggering move and moveend events

		function updateEvent(event, touch, timeStamp, timer) {
			var time = timeStamp - event.timeStamp;

			event.type = 'move';
			event.distX =  touch.pageX - event.startX;
			event.distY =  touch.pageY - event.startY;
			event.deltaX = touch.pageX - event.pageX;
			event.deltaY = touch.pageY - event.pageY;
			
			// Average the velocity of the last few events using a decay
			// curve to even out spurious jumps in values.
			event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
			event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
			event.pageX =  touch.pageX;
			event.pageY =  touch.pageY;
		}

		function endEvent(event, timer, fn) {
			timer.end(function(){
				event.type = 'moveend';

				trigger(event.target, event);
				
				return fn && fn();
			});
		}


		// jQuery special event definition

		function setup(data, namespaces, eventHandle) {
			// Stop the node from being dragged
			//add(this, 'dragstart.move drag.move', preventDefault);
			
			// Prevent text selection and touch interface scrolling
			//add(this, 'mousedown.move', preventIgnoreTags);
			
			// Tell movestart default handler that we've handled this
			add(this, 'movestart.move', flagAsHandled);

			// Don't bind to the DOM. For speed.
			return true;
		}
		
		function teardown(namespaces) {
			remove(this, 'dragstart drag', preventDefault);
			remove(this, 'mousedown touchstart', preventIgnoreTags);
			remove(this, 'movestart', flagAsHandled);
			
			// Don't bind to the DOM. For speed.
			return true;
		}
		
		function addMethod(handleObj) {
			// We're not interested in preventing defaults for handlers that
			// come from internal move or moveend bindings
			if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
				return;
			}
			
			// Stop the node from being dragged
			add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);
			
			// Prevent text selection and touch interface scrolling
			add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
		}
		
		function removeMethod(handleObj) {
			if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
				return;
			}
			
			remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
			remove(this, 'mousedown.' + handleObj.guid);
		}
		
		jQuery.event.special.movestart = {
			setup: setup,
			teardown: teardown,
			add: addMethod,
			remove: removeMethod,

			_default: function(e) {
				var event, data;
				
				// If no move events were bound to any ancestors of this
				// target, high tail it out of here.
				if (!e._handled()) { return; }

				function update(time) {
					updateEvent(event, data.touch, data.timeStamp);
					trigger(e.target, event);
				}

				event = {
					target: e.target,
					startX: e.startX,
					startY: e.startY,
					pageX: e.pageX,
					pageY: e.pageY,
					distX: e.distX,
					distY: e.distY,
					deltaX: e.deltaX,
					deltaY: e.deltaY,
					velocityX: e.velocityX,
					velocityY: e.velocityY,
					timeStamp: e.timeStamp,
					identifier: e.identifier,
					targetTouches: e.targetTouches,
					finger: e.finger
				};

				data = {
					event: event,
					timer: new Timer(update),
					touch: undefined,
					timeStamp: undefined
				};
				
				if (e.identifier === undefined) {
					// We're dealing with a mouse
					// Stop clicks from propagating during a move
					add(e.target, 'click', returnFalse);
					add(document, mouseevents.move, activeMousemove, data);
					add(document, mouseevents.end, activeMouseend, data);
				}
				else {
					// We're dealing with a touch. Stop touchmove doing
					// anything defaulty.
					e._preventTouchmoveDefault();
					add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
					add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
				}
			}
		};

		jQuery.event.special.move = {
			setup: function() {
				// Bind a noop to movestart. Why? It's the movestart
				// setup that decides whether other move events are fired.
				add(this, 'movestart.move', jQuery.noop);
			},
			
			teardown: function() {
				remove(this, 'movestart.move', jQuery.noop);
			}
		};
		
		jQuery.event.special.moveend = {
			setup: function() {
				// Bind a noop to movestart. Why? It's the movestart
				// setup that decides whether other move events are fired.
				add(this, 'movestart.moveend', jQuery.noop);
			},
			
			teardown: function() {
				remove(this, 'movestart.moveend', jQuery.noop);
			}
		};

		add(document, 'mousedown.move', mousedown);
		add(document, 'touchstart.move', touchstart);

		// Make jQuery copy touch event properties over to the jQuery event
		// object, if they are not already listed. But only do the ones we
		// really need. IE7/8 do not have Array#indexOf(), but nor do they
		// have touch events, so let's assume we can ignore them.
		if (typeof Array.prototype.indexOf === 'function') {
			(function(jQuery, undefined){
				var props = ["changedTouches", "targetTouches"],
				    l = props.length;
				
				while (l--) {
					if (jQuery.event.props.indexOf(props[l]) === -1) {
						jQuery.event.props.push(props[l]);
					}
				}
			})(jQuery);
		};
	});


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// jQuery.event.swipe
	// 0.5
	// Stephen Band

	// Dependencies
	// jQuery.event.move 1.2

	// One of swipeleft, swiperight, swipeup or swipedown is triggered on
	// moveend, when the move has covered a threshold ratio of the dimension
	// of the target node, or has gone really fast. Threshold and velocity
	// sensitivity changed with:
	//
	// jQuery.event.special.swipe.settings.threshold
	// jQuery.event.special.swipe.settings.sensitivity

	(function (thisModule) {
		if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (thisModule), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof module !== "undefined" && module !== null) && module.exports) {
	        module.exports = thisModule;
		} else {
			// Browser globals
	        thisModule(jQuery);
		}
	})(function(jQuery, undefined){
		var add = jQuery.event.add,
		   
		    remove = jQuery.event.remove,

		    // Just sugar, so we can have arguments in the same order as
		    // add and remove.
		    trigger = function(node, type, data) {
		    	jQuery.event.trigger(type, data, node);
		    },

		    settings = {
		    	// Ratio of distance over target finger must travel to be
		    	// considered a swipe.
		    	threshold: 0.4,
		    	// Faster fingers can travel shorter distances to be considered
		    	// swipes. 'sensitivity' controls how much. Bigger is shorter.
		    	sensitivity: 6
		    };

		function moveend(e) {
			var w, h, event;

			w = e.currentTarget.offsetWidth;
			h = e.currentTarget.offsetHeight;

			// Copy over some useful properties from the move event
			event = {
				distX: e.distX,
				distY: e.distY,
				velocityX: e.velocityX,
				velocityY: e.velocityY,
				finger: e.finger
			};

			// Find out which of the four directions was swiped
			if (e.distX > e.distY) {
				if (e.distX > -e.distY) {
					if (e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
						event.type = 'swiperight';
						trigger(e.currentTarget, event);
					}
				}
				else {
					if (-e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
						event.type = 'swipeup';
						trigger(e.currentTarget, event);
					}
				}
			}
			else {
				if (e.distX > -e.distY) {
					if (e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
						event.type = 'swipedown';
						trigger(e.currentTarget, event);
					}
				}
				else {
					if (-e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
						event.type = 'swipeleft';
						trigger(e.currentTarget, event);
					}
				}
			}
		}

		function getData(node) {
			var data = jQuery.data(node, 'event_swipe');
			
			if (!data) {
				data = { count: 0 };
				jQuery.data(node, 'event_swipe', data);
			}
			
			return data;
		}

		jQuery.event.special.swipe =
		jQuery.event.special.swipeleft =
		jQuery.event.special.swiperight =
		jQuery.event.special.swipeup =
		jQuery.event.special.swipedown = {
			setup: function( data, namespaces, eventHandle ) {
				var data = getData(this);

				// If another swipe event is already setup, don't setup again.
				if (data.count++ > 0) { return; }

				add(this, 'moveend', moveend);

				return true;
			},

			teardown: function() {
				var data = getData(this);

				// If another swipe event is still setup, don't teardown.
				if (--data.count > 0) { return; }

				remove(this, 'moveend', moveend);

				return true;
			},

			settings: settings
		};
	});


/***/ },
/* 31 */
/***/ function(module, exports) {

	!function (a, b) {
	    module.exports = b(a)
	}(window, function (a, b) {
	    function c(b, c, d) {
	        a.WeixinJSBridge ? WeixinJSBridge.invoke(b, e(c), function (a) {
	            h(b, a, d)
	        }) : k(b, d)
	    }

	    function d(b, c, d) {
	        a.WeixinJSBridge ? WeixinJSBridge.on(b, function (a) {
	            d && d.trigger && d.trigger(a), h(b, a, c)
	        }) : d ? k(b, d) : k(b, c)
	    }

	    function e(a) {
	        return a = a || {}, a.appId = D.appId, a.verifyAppId = D.appId, a.verifySignType = "sha1", a.verifyTimestamp = D.timestamp + "", a.verifyNonceStr = D.nonceStr, a.verifySignature = D.signature, a
	    }

	    function f(a) {
	        return {
	            timeStamp: a.timestamp + "",
	            nonceStr: a.nonceStr,
	            "package": a["package"],
	            paySign: a.paySign,
	            signType: a.signType || "SHA1"
	        }
	    }

	    function g(a) {
	        return a.postalCode = a.addressPostalCode, delete a.addressPostalCode, a.provinceName = a.proviceFirstStageName, delete a.proviceFirstStageName, a.cityName = a.addressCitySecondStageName, delete a.addressCitySecondStageName, a.countryName = a.addressCountiesThirdStageName, delete a.addressCountiesThirdStageName, a.detailInfo = a.addressDetailInfo, delete a.addressDetailInfo, a
	    }

	    function h(a, b, c) {
	        "openEnterpriseChat" == a && (b.errCode = b.err_code), delete b.err_code, delete b.err_desc, delete b.err_detail;
	        var d = b.errMsg;
	        d || (d = b.err_msg, delete b.err_msg, d = i(a, d), b.errMsg = d), c = c || {}, c._complete && (c._complete(b), delete c._complete), d = b.errMsg || "", D.debug && !c.isInnerInvoke && alert(JSON.stringify(b));
	        var e = d.indexOf(":"), f = d.substring(e + 1);
	        switch (f) {
	            case"ok":
	                c.success && c.success(b);
	                break;
	            case"cancel":
	                c.cancel && c.cancel(b);
	                break;
	            default:
	                c.fail && c.fail(b)
	        }
	        c.complete && c.complete(b)
	    }

	    function i(a, b) {
	        var c = a, d = q[c];
	        d && (c = d);
	        var e = "ok";
	        if (b) {
	            var f = b.indexOf(":");
	            e = b.substring(f + 1), "confirm" == e && (e = "ok"), "failed" == e && (e = "fail"), -1 != e.indexOf("failed_") && (e = e.substring(7)), -1 != e.indexOf("fail_") && (e = e.substring(5)), e = e.replace(/_/g, " "), e = e.toLowerCase(), ("access denied" == e || "no permission to execute" == e) && (e = "permission denied"), "config" == c && "function not exist" == e && (e = "ok"), "" == e && (e = "fail")
	        }
	        return b = c + ":" + e
	    }

	    function j(a) {
	        if (a) {
	            for (var b = 0, c = a.length; c > b; ++b) {
	                var d = a[b], e = p[d];
	                e && (a[b] = e)
	            }
	            return a
	        }
	    }

	    function k(a, b) {
	        if (!(!D.debug || b && b.isInnerInvoke)) {
	            var c = q[a];
	            c && (a = c), b && b._complete && delete b._complete, console.log('"' + a + '",', b || "")
	        }
	    }

	    function l(a) {
	        if (!(v || w || D.debug || "6.0.2" > A || C.systemType < 0)) {
	            var b = new Image;
	            C.appId = D.appId, C.initTime = B.initEndTime - B.initStartTime, C.preVerifyTime = B.preVerifyEndTime - B.preVerifyStartTime, I.getNetworkType({
	                isInnerInvoke: !0,
	                success: function (a) {
	                    C.networkType = a.networkType;
	                    var c = "https://open.weixin.qq.com/sdk/report?v=" + C.version + "&o=" + C.isPreVerifyOk + "&s=" + C.systemType + "&c=" + C.clientVersion + "&a=" + C.appId + "&n=" + C.networkType + "&i=" + C.initTime + "&p=" + C.preVerifyTime + "&u=" + C.url;
	                    b.src = c
	                }
	            })
	        }
	    }

	    function m() {
	        return (new Date).getTime()
	    }

	    function n(b) {
	        x && (a.WeixinJSBridge ? b() : r.addEventListener && r.addEventListener("WeixinJSBridgeReady", b, !1))
	    }

	    function o() {
	        I.invoke || (I.invoke = function (b, c, d) {
	            a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d)
	        }, I.on = function (b, c) {
	            a.WeixinJSBridge && WeixinJSBridge.on(b, c)
	        })
	    }

	    if (!a.jWeixin) {
	        var p = {
	            config: "preVerifyJSAPI",
	            onMenuShareTimeline: "menu:share:timeline",
	            onMenuShareAppMessage: "menu:share:appmessage",
	            onMenuShareQQ: "menu:share:qq",
	            onMenuShareWeibo: "menu:share:weiboApp",
	            onMenuShareQZone: "menu:share:QZone",
	            previewImage: "imagePreview",
	            getLocation: "geoLocation",
	            openProductSpecificView: "openProductViewWithPid",
	            addCard: "batchAddCard",
	            openCard: "batchViewCard",
	            chooseWXPay: "getBrandWCPayRequest",
	            openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
	            startSearchBeacons: "startMonitoringBeacons",
	            stopSearchBeacons: "stopMonitoringBeacons",
	            onSearchBeacons: "onBeaconsInRange",
	            consumeAndShareCard: "consumedShareCard",
	            openAddress: "editAddress"
	        }, q = function () {
	            var a = {};
	            for (var b in p)a[p[b]] = b;
	            return a
	        }(), r = a.document, s = r.title, t = navigator.userAgent.toLowerCase(), u = navigator.platform.toLowerCase(), v = !(!u.match("mac") && !u.match("win")), w = -1 != t.indexOf("wxdebugger"), x = -1 != t.indexOf("micromessenger"), y = -1 != t.indexOf("android"), z = -1 != t.indexOf("iphone") || -1 != t.indexOf("ipad"), A = function () {
	            var a = t.match(/micromessenger\/(\d+\.\d+\.\d+)/) || t.match(/micromessenger\/(\d+\.\d+)/);
	            return a ? a[1] : ""
	        }(), B = {initStartTime: m(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0}, C = {
	            version: 1,
	            appId: "",
	            initTime: 0,
	            preVerifyTime: 0,
	            networkType: "",
	            isPreVerifyOk: 1,
	            systemType: z ? 1 : y ? 2 : -1,
	            clientVersion: A,
	            url: encodeURIComponent(location.href)
	        }, D = {}, E = {_completes: []}, F = {state: 0, data: {}};
	        n(function () {
	            B.initEndTime = m()
	        });
	        var G = !1, H = [], I = {
	            config: function (a) {
	                D = a, k("config", a);
	                var b = D.check === !1 ? !1 : !0;
	                n(function () {
	                    if (b)c(p.config, {verifyJsApiList: j(D.jsApiList)}, function () {
	                        E._complete = function (a) {
	                            B.preVerifyEndTime = m(), F.state = 1, F.data = a
	                        }, E.success = function (a) {
	                            C.isPreVerifyOk = 0
	                        }, E.fail = function (a) {
	                            E._fail ? E._fail(a) : F.state = -1
	                        };
	                        var a = E._completes;
	                        return a.push(function () {
	                            l()
	                        }), E.complete = function (b) {
	                            for (var c = 0, d = a.length; d > c; ++c)a[c]();
	                            E._completes = []
	                        }, E
	                    }()), B.preVerifyStartTime = m(); else {
	                        F.state = 1;
	                        for (var a = E._completes, d = 0, e = a.length; e > d; ++d)a[d]();
	                        E._completes = []
	                    }
	                }), D.beta && o()
	            }, ready: function (a) {
	                0 != F.state ? a() : (E._completes.push(a), !x && D.debug && a())
	            }, error: function (a) {
	                "6.0.2" > A || (-1 == F.state ? a(F.data) : E._fail = a)
	            }, checkJsApi: function (a) {
	                var b = function (a) {
	                    var b = a.checkResult;
	                    for (var c in b) {
	                        var d = q[c];
	                        d && (b[d] = b[c], delete b[c])
	                    }
	                    return a
	                };
	                c("checkJsApi", {jsApiList: j(a.jsApiList)}, function () {
	                    return a._complete = function (a) {
	                        if (y) {
	                            var c = a.checkResult;
	                            c && (a.checkResult = JSON.parse(c))
	                        }
	                        a = b(a)
	                    }, a
	                }())
	            }, onMenuShareTimeline: function (a) {
	                d(p.onMenuShareTimeline, {
	                    complete: function () {
	                        c("shareTimeline", {
	                            title: a.title || s,
	                            desc: a.title || s,
	                            img_url: a.imgUrl || "",
	                            link: a.link || location.href,
	                            type: a.type || "link",
	                            data_url: a.dataUrl || ""
	                        }, a)
	                    }
	                }, a)
	            }, onMenuShareAppMessage: function (a) {
	                d(p.onMenuShareAppMessage, {
	                    complete: function () {
	                        c("sendAppMessage", {
	                            title: a.title || s,
	                            desc: a.desc || "",
	                            link: a.link || location.href,
	                            img_url: a.imgUrl || "",
	                            type: a.type || "link",
	                            data_url: a.dataUrl || ""
	                        }, a)
	                    }
	                }, a)
	            }, onMenuShareQQ: function (a) {
	                d(p.onMenuShareQQ, {
	                    complete: function () {
	                        c("shareQQ", {
	                            title: a.title || s,
	                            desc: a.desc || "",
	                            img_url: a.imgUrl || "",
	                            link: a.link || location.href
	                        }, a)
	                    }
	                }, a)
	            }, onMenuShareWeibo: function (a) {
	                d(p.onMenuShareWeibo, {
	                    complete: function () {
	                        c("shareWeiboApp", {
	                            title: a.title || s,
	                            desc: a.desc || "",
	                            img_url: a.imgUrl || "",
	                            link: a.link || location.href
	                        }, a)
	                    }
	                }, a)
	            }, onMenuShareQZone: function (a) {
	                d(p.onMenuShareQZone, {
	                    complete: function () {
	                        c("shareQZone", {
	                            title: a.title || s,
	                            desc: a.desc || "",
	                            img_url: a.imgUrl || "",
	                            link: a.link || location.href
	                        }, a)
	                    }
	                }, a)
	            }, startRecord: function (a) {
	                c("startRecord", {}, a)
	            }, stopRecord: function (a) {
	                c("stopRecord", {}, a)
	            }, onVoiceRecordEnd: function (a) {
	                d("onVoiceRecordEnd", a)
	            }, playVoice: function (a) {
	                c("playVoice", {localId: a.localId}, a)
	            }, pauseVoice: function (a) {
	                c("pauseVoice", {localId: a.localId}, a)
	            }, stopVoice: function (a) {
	                c("stopVoice", {localId: a.localId}, a)
	            }, onVoicePlayEnd: function (a) {
	                d("onVoicePlayEnd", a)
	            }, uploadVoice: function (a) {
	                c("uploadVoice", {localId: a.localId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
	            }, downloadVoice: function (a) {
	                c("downloadVoice", {serverId: a.serverId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
	            }, translateVoice: function (a) {
	                c("translateVoice", {localId: a.localId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
	            }, chooseImage: function (a) {
	                c("chooseImage", {
	                    scene: "1|2",
	                    count: a.count || 9,
	                    sizeType: a.sizeType || ["original", "compressed"],
	                    sourceType: a.sourceType || ["album", "camera"]
	                }, function () {
	                    return a._complete = function (a) {
	                        if (y) {
	                            var b = a.localIds;
	                            b && (a.localIds = JSON.parse(b))
	                        }
	                    }, a
	                }())
	            }, getLocation: function (a) {
	            }, previewImage: function (a) {
	                c(p.previewImage, {current: a.current, urls: a.urls}, a)
	            }, uploadImage: function (a) {
	                c("uploadImage", {localId: a.localId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
	            }, downloadImage: function (a) {
	                c("downloadImage", {serverId: a.serverId, isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
	            }, getLocalImgData: function (a) {
	                G === !1 ? (G = !0, c("getLocalImgData", {localId: a.localId}, function () {
	                    return a._complete = function (a) {
	                        if (G = !1, H.length > 0) {
	                            var b = H.shift();
	                            wx.getLocalImgData(b)
	                        }
	                    }, a
	                }())) : H.push(a)
	            }, getNetworkType: function (a) {
	                var b = function (a) {
	                    var b = a.errMsg;
	                    a.errMsg = "getNetworkType:ok";
	                    var c = a.subtype;
	                    if (delete a.subtype, c)a.networkType = c; else {
	                        var d = b.indexOf(":"), e = b.substring(d + 1);
	                        switch (e) {
	                            case"wifi":
	                            case"edge":
	                            case"wwan":
	                                a.networkType = e;
	                                break;
	                            default:
	                                a.errMsg = "getNetworkType:fail"
	                        }
	                    }
	                    return a
	                };
	                c("getNetworkType", {}, function () {
	                    return a._complete = function (a) {
	                        a = b(a)
	                    }, a
	                }())
	            }, openLocation: function (a) {
	                c("openLocation", {
	                    latitude: a.latitude,
	                    longitude: a.longitude,
	                    name: a.name || "",
	                    address: a.address || "",
	                    scale: a.scale || 28,
	                    infoUrl: a.infoUrl || ""
	                }, a)
	            }, getLocation: function (a) {
	                a = a || {}, c(p.getLocation, {type: a.type || "wgs84"}, function () {
	                    return a._complete = function (a) {
	                        delete a.type
	                    }, a
	                }())
	            }, hideOptionMenu: function (a) {
	                c("hideOptionMenu", {}, a)
	            }, showOptionMenu: function (a) {
	                c("showOptionMenu", {}, a)
	            }, closeWindow: function (a) {
	                a = a || {}, c("closeWindow", {}, a)
	            }, hideMenuItems: function (a) {
	                c("hideMenuItems", {menuList: a.menuList}, a)
	            }, showMenuItems: function (a) {
	                c("showMenuItems", {menuList: a.menuList}, a)
	            }, hideAllNonBaseMenuItem: function (a) {
	                c("hideAllNonBaseMenuItem", {}, a)
	            }, showAllNonBaseMenuItem: function (a) {
	                c("showAllNonBaseMenuItem", {}, a)
	            }, scanQRCode: function (a) {
	                a = a || {}, c("scanQRCode", {
	                    needResult: a.needResult || 0,
	                    scanType: a.scanType || ["qrCode", "barCode"]
	                }, function () {
	                    return a._complete = function (a) {
	                        if (z) {
	                            var b = a.resultStr;
	                            if (b) {
	                                var c = JSON.parse(b);
	                                a.resultStr = c && c.scan_code && c.scan_code.scan_result
	                            }
	                        }
	                    }, a
	                }())
	            }, openAddress: function (a) {
	                c(p.openAddress, {}, function () {
	                    return a._complete = function (a) {
	                        a = g(a)
	                    }, a
	                }())
	            }, openProductSpecificView: function (a) {
	                c(p.openProductSpecificView, {pid: a.productId, view_type: a.viewType || 0, ext_info: a.extInfo}, a)
	            }, addCard: function (a) {
	                for (var b = a.cardList, d = [], e = 0, f = b.length; f > e; ++e) {
	                    var g = b[e], h = {card_id: g.cardId, card_ext: g.cardExt};
	                    d.push(h)
	                }
	                c(p.addCard, {card_list: d}, function () {
	                    return a._complete = function (a) {
	                        var b = a.card_list;
	                        if (b) {
	                            b = JSON.parse(b);
	                            for (var c = 0, d = b.length; d > c; ++c) {
	                                var e = b[c];
	                                e.cardId = e.card_id, e.cardExt = e.card_ext, e.isSuccess = e.is_succ ? !0 : !1, delete e.card_id, delete e.card_ext, delete e.is_succ
	                            }
	                            a.cardList = b, delete a.card_list
	                        }
	                    }, a
	                }())
	            }, chooseCard: function (a) {
	                c("chooseCard", {
	                    app_id: D.appId,
	                    location_id: a.shopId || "",
	                    sign_type: a.signType || "SHA1",
	                    card_id: a.cardId || "",
	                    card_type: a.cardType || "",
	                    card_sign: a.cardSign,
	                    time_stamp: a.timestamp + "",
	                    nonce_str: a.nonceStr
	                }, function () {
	                    return a._complete = function (a) {
	                        a.cardList = a.choose_card_info, delete a.choose_card_info
	                    }, a
	                }())
	            }, openCard: function (a) {
	                for (var b = a.cardList, d = [], e = 0, f = b.length; f > e; ++e) {
	                    var g = b[e], h = {card_id: g.cardId, code: g.code};
	                    d.push(h)
	                }
	                c(p.openCard, {card_list: d}, a)
	            }, consumeAndShareCard: function (a) {
	                c(p.consumeAndShareCard, {consumedCardId: a.cardId, consumedCode: a.code}, a)
	            }, chooseWXPay: function (a) {
	                c(p.chooseWXPay, f(a), a)
	            }, openEnterpriseRedPacket: function (a) {
	                c(p.openEnterpriseRedPacket, f(a), a)
	            }, startSearchBeacons: function (a) {
	                c(p.startSearchBeacons, {ticket: a.ticket}, a)
	            }, stopSearchBeacons: function (a) {
	                c(p.stopSearchBeacons, {}, a)
	            }, onSearchBeacons: function (a) {
	                d(p.onSearchBeacons, a)
	            }, openEnterpriseChat: function (a) {
	                c("openEnterpriseChat", {useridlist: a.userIds, chatname: a.groupName}, a)
	            }
	        }, J = 1, K = {};
	        return r.addEventListener("error", function (a) {
	            if (!y) {
	                var b = a.target, c = b.tagName, d = b.src;
	                if ("IMG" == c || "VIDEO" == c || "AUDIO" == c || "SOURCE" == c) {
	                    var e = -1 != d.indexOf("wxlocalresource://");
	                    if (e) {
	                        a.preventDefault(), a.stopPropagation();
	                        var f = b["wx-id"];
	                        if (f || (f = J++, b["wx-id"] = f), K[f])return;
	                        K[f] = !0, wx.getLocalImgData({
	                            localId: d, success: function (a) {
	                                b.src = a.localData
	                            }
	                        })
	                    }
	                }
	            }
	        }, !0), r.addEventListener("load", function (a) {
	            if (!y) {
	                var b = a.target, c = b.tagName;
	                b.src;
	                if ("IMG" == c || "VIDEO" == c || "AUDIO" == c || "SOURCE" == c) {
	                    var d = b["wx-id"];
	                    d && (K[d] = !1)
	                }
	            }
	        }, !0), b && (a.wx = a.jWeixin = I), I
	    }
	});

/***/ }
/******/ ])
});
;