if (!Function.prototype.bind) {
	/**
	 * ES5 Function.prototype.bind
	 * Vrací funkci zbindovanou do zadaného kontextu.
	 * Zbylé volitelné parametry jsou předány volání vnitřní funkce.
	 * @param {object} thisObj Nový kontext
	 * @returns {function}
	 */
	Function.prototype.bind = function(thisObj) {
		var fn = this;
		var args = Array.prototype.slice.call(arguments, 1);
		return function() {
			return fn.apply(thisObj, args.concat(Array.prototype.slice.call(arguments)));
		}
	}
};

if (!Date.now) {
	/**
	 * aktuální timestamp dle ES5 - http://dailyjs.com/2010/01/07/ecmascript5-date/
	 */
	Date.now = function() { return +(new Date); }
}

/**
 * Oriznuti bilych znaku ze zacatku a konce retezce
 */
String.prototype.trim = function() {
	return this.match(/^\s*([\s\S]*?)\s*$/)[1];
}
if (!String.trim) {
	String.trim = function(obj) { return String.prototype.trim.call(obj);}
}

if (!Object.create) {
	/**
	 * Object.create dle ES5 - https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
	 */
	Object.create = function (o) {
		if (arguments.length > 1) { throw new Error("Object.create polyfill only accepts the first parameter"); }
		var tmp = function() {};
		tmp.prototype = o;
		return new tmp();
	};
}

if (!Object.keys) {
	/**
	 * Object.keys dle ES5 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
	 */
	Object.keys = (function () {
		'use strict';

		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;

		return function (obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			}

			var result = [], prop, i;

			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}

			if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}());
}

if(!Array.isArray) {
	/**
	 * Array.isArray dle ES5 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
	 */
	Array.isArray = function (vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	};
}

if ('function' !== typeof Array.prototype.reduce) {
	/**
	 * Array.prototype.reduce dle ES5 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
	 */
	Array.prototype.reduce = function(callback, opt_initialValue) {
		'use strict';

		if (null === this || 'undefined' === typeof this) {
			throw new TypeError('Array.prototype.reduce called on null or undefined');
		}

		if ('function' !== typeof callback) {
			throw new TypeError(callback + ' is not a function');
		}

		var index, value,
			length = this.length >>> 0,
			isValueSet = false;

		if (1 < arguments.length) {
			value = opt_initialValue;
			isValueSet = true;
		}

		for (index = 0; length > index; ++index) {
			if (this.hasOwnProperty(index)) {
				if (isValueSet) {
					value = callback(value, this[index], index, this);
				} else {
					value = this[index];
					isValueSet = true;
				}
			}
		}

		if (!isValueSet) {
			throw new TypeError('Reduce of empty array with no initial value');
		}

		return value;
	};
}

if ('function' !== typeof Array.prototype.reduceRight) {
	/**
	 * Array.prototype.reduceRight dle ES5 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
	 */
	Array.prototype.reduceRight = function(callback, opt_initialValue) {
		'use strict';

		if (null === this || 'undefined' === typeof this) {
			throw new TypeError('Array.prototype.reduceRight called on null or undefined');
		}

		if ('function' !== typeof callback) {
			throw new TypeError(callback + ' is not a function');
		}

		var index, value,
			length = this.length >>> 0,
			isValueSet = false;

		if (1 < arguments.length) {
			value = opt_initialValue;
			isValueSet = true;
		}

		for (index = length - 1; -1 < index; --index) {
			if (!this.hasOwnProperty(index)) {
				if (isValueSet) {
					value = callback(value, this[index], index, this);
				} else {
					value = this[index];
					isValueSet = true;
				}
			}
		}

		if (!isValueSet) {
			throw new TypeError('Reduce of empty array with no initial value');
		}

		return value;
	};
}
