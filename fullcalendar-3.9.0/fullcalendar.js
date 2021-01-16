/*!
 * FullCalendar v3.9.0
 * Docs & License: https://fullcalendar.io/
 * (c) 2018 Adam Shaw
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["moment", "jquery"], factory);
	else if(typeof exports === 'object')
		exports["FullCalendar"] = factory(require("moment"), require("jquery"));
	else
		root["FullCalendar"] = factory(root["moment"], root["jQuery"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 236);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

/*
derived from:
https://github.com/Microsoft/tslib/blob/v1.6.0/tslib.js

only include the helpers we need, to keep down filesize
*/
var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p]; };
exports.__extends = function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(0);
var $ = __webpack_require__(3);
/* FullCalendar-specific DOM Utilities
----------------------------------------------------------------------------------------------------------------------*/
// Given the scrollbar widths of some other container, create borders/margins on rowEls in order to match the left
// and right space that was offset by the scrollbars. A 1-pixel border first, then margin beyond that.
function compensateScroll(rowEls, scrollbarWidths) {
    if (scrollbarWidths.left) {
        rowEls.css({
            'border-left-width': 1,
            'margin-left': scrollbarWidths.left - 1
        });
    }
    if (scrollbarWidths.right) {
        rowEls.css({
            'border-right-width': 1,
            'margin-right': scrollbarWidths.right - 1
        });
    }
}
exports.compensateScroll = compensateScroll;
// Undoes compensateScroll and restores all borders/margins
function uncompensateScroll(rowEls) {
    rowEls.css({
        'margin-left': '',
        'margin-right': '',
        'border-left-width': '',
        'border-right-width': ''
    });
}
exports.uncompensateScroll = uncompensateScroll;
// Make the mouse cursor express that an event is not allowed in the current area
function disableCursor() {
    $('body').addClass('fc-not-allowed');
}
exports.disableCursor = disableCursor;
// Returns the mouse cursor to its original look
function enableCursor() {
    $('body').removeClass('fc-not-allowed');
}
exports.enableCursor = enableCursor;
// Given a total available height to fill, have `els` (essentially child rows) expand to accomodate.
// By default, all elements that are shorter than the recommended height are expanded uniformly, not considering
// any other els that are already too tall. if `shouldRedistribute` is on, it considers these tall rows and
// reduces the available height.
function distributeHeight(els, availableHeight, shouldRedistribute) {
    // *FLOORING NOTE*: we floor in certain places because zoom can give inaccurate floating-point dimensions,
    // and it is better to be shorter than taller, to avoid creating unnecessary scrollbars.
    var minOffset1 = Math.floor(availableHeight / els.length); // for non-last element
    var minOffset2 = Math.floor(availableHeight - minOffset1 * (els.length - 1)); // for last element *FLOORING NOTE*
    var flexEls = []; // elements that are allowed to expand. array of DOM nodes
    var flexOffsets = []; // amount of vertical space it takes up
    var flexHeights = []; // actual css height
    var usedHeight = 0;
    undistributeHeight(els); // give all elements their natural height
    // find elements that are below the recommended height (expandable).
    // important to query for heights in a single first pass (to avoid reflow oscillation).
    els.each(function (i, el) {
        var minOffset = i === els.length - 1 ? minOffset2 : minOffset1;
        var naturalOffset = $(el).outerHeight(true);
        if (naturalOffset < minOffset) {
            flexEls.push(el);
            flexOffsets.push(naturalOffset);
            flexHeights.push($(el).height());
        }
        else {
            // this element stretches past recommended height (non-expandable). mark the space as occupied.
            usedHeight += naturalOffset;
        }
    });
    // readjust the recommended height to only consider the height available to non-maxed-out rows.
    if (shouldRedistribute) {
        availableHeight -= usedHeight;
        minOffset1 = Math.floor(availableHeight / flexEls.length);
        minOffset2 = Math.floor(availableHeight - minOffset1 * (flexEls.length - 1)); // *FLOORING NOTE*
    }
    // assign heights to all expandable elements
    $(flexEls).each(function (i, el) {
        var minOffset = i === flexEls.length - 1 ? minOffset2 : minOffset1;
        var naturalOffset = flexOffsets[i];
        var naturalHeight = flexHeights[i];
        var newHeight = minOffset - (naturalOffset - naturalHeight); // subtract the margin/padding
        if (naturalOffset < minOffset) {
            $(el).height(newHeight);
        }
    });
}
exports.distributeHeight = distributeHeight;
// Undoes distrubuteHeight, restoring all els to their natural height
function undistributeHeight(els) {
    els.height('');
}
exports.undistributeHeight = undistributeHeight;
// Given `els`, a jQuery set of <td> cells, find the cell with the largest natural width and set the widths of all the
// cells to be that width.
// PREREQUISITE: if you want a cell to take up width, it needs to have a single inner element w/ display:inline
function matchCellWidths(els) {
    var maxInnerWidth = 0;
    els.find('> *').each(function (i, innerEl) {
        var innerWidth = $(innerEl).outerWidth();
        if (innerWidth > maxInnerWidth) {
            maxInnerWidth = innerWidth;
        }
    });
    maxInnerWidth++; // sometimes not accurate of width the text needs to stay on one line. insurance
    els.width(maxInnerWidth);
    return maxInnerWidth;
}
exports.matchCellWidths = matchCellWidths;
// Given one element that resides inside another,
// Subtracts the height of the inner element from the outer element.
function subtractInnerElHeight(outerEl, innerEl) {
    var both = outerEl.add(innerEl);
    var diff;
    // effin' IE8/9/10/11 sometimes returns 0 for dimensions. this weird hack was the only thing that worked
    both.css({
        position: 'relative',
        left: -1 // ensure reflow in case the el was already relative. negative is less likely to cause new scroll
    });
    diff = outerEl.outerHeight() - innerEl.outerHeight(); // grab the dimensions
    both.css({ position: '', left: '' }); // undo hack
    return diff;
}
exports.subtractInnerElHeight = subtractInnerElHeight;
/* Element Geom Utilities
----------------------------------------------------------------------------------------------------------------------*/
// borrowed from https://github.com/jquery/jquery-ui/blob/1.11.0/ui/core.js#L51
function getScrollParent(el) {
    var position = el.css('position');
    var scrollParent = el.parents().filter(function () {
        var parent = $(this);
        return (/(auto|scroll)/).test(parent.css('overflow') + parent.css('overflow-y') + parent.css('overflow-x'));
    }).eq(0);
    return position === 'fixed' || !scrollParent.length ? $(el[0].ownerDocument || document) : scrollParent;
}
exports.getScrollParent = getScrollParent;
// Queries the outer bounding area of a jQuery element.
// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
// Origin is optional.
function getOuterRect(el, origin) {
    var offset = el.offset();
    var left = offset.left - (origin ? origin.left : 0);
    var top = offset.top - (origin ? origin.top : 0);
    return {
        left: left,
        right: left + el.outerWidth(),
        top: top,
        bottom: top + el.outerHeight()
    };
}
exports.getOuterRect = getOuterRect;
// Queries the area within the margin/border/scrollbars of a jQuery element. Does not go within the padding.
// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
// Origin is optional.
// WARNING: given element can't have borders
// NOTE: should use clientLeft/clientTop, but very unreliable cross-browser.
function getClientRect(el, origin) {
    var offset = el.offset();
    var scrollbarWidths = getScrollbarWidths(el);
    var left = offset.left + getCssFloat(el, 'border-left-width') + scrollbarWidths.left - (origin ? origin.left : 0);
    var top = offset.top + getCssFloat(el, 'border-top-width') + scrollbarWidths.top - (origin ? origin.top : 0);
    return {
        left: left,
        right: left + el[0].clientWidth,
        top: top,
        bottom: top + el[0].clientHeight // clientHeight includes padding but NOT scrollbars
    };
}
exports.getClientRect = getClientRect;
// Queries the area within the margin/border/padding of a jQuery element. Assumed not to have scrollbars.
// Returns a rectangle with absolute coordinates: left, right (exclusive), top, bottom (exclusive).
// Origin is optional.
function getContentRect(el, origin) {
    var offset = el.offset(); // just outside of border, margin not included
    var left = offset.left + getCssFloat(el, 'border-left-width') + getCssFloat(el, 'padding-left') -
        (origin ? origin.left : 0);
    var top = offset.top + getCssFloat(el, 'border-top-width') + getCssFloat(el, 'padding-top') -
        (origin ? origin.top : 0);
    return {
        left: left,
        right: left + el.width(),
        top: top,
        bottom: top + el.height()
    };
}
exports.getContentRect = getContentRect;
// Returns the computed left/right/top/bottom scrollbar widths for the given jQuery element.
// WARNING: given element can't have borders (which will cause offsetWidth/offsetHeight to be larger).
// NOTE: should use clientLeft/clientTop, but very unreliable cross-browser.
function getScrollbarWidths(el) {
    var leftRightWidth = el[0].offsetWidth - el[0].clientWidth;
    var bottomWidth = el[0].offsetHeight - el[0].clientHeight;
    var widths;
    leftRightWidth = sanitizeScrollbarWidth(leftRightWidth);
    bottomWidth = sanitizeScrollbarWidth(bottomWidth);
    widths = { left: 0, right: 0, top: 0, bottom: bottomWidth };
    if (getIsLeftRtlScrollbars() && el.css('direction') === 'rtl') {
        widths.left = leftRightWidth;
    }
    else {
        widths.right = leftRightWidth;
    }
    return widths;
}
exports.getScrollbarWidths = getScrollbarWidths;
// The scrollbar width computations in getScrollbarWidths are sometimes flawed when it comes to
// retina displays, rounding, and IE11. Massage them into a usable value.
function sanitizeScrollbarWidth(width) {
    width = Math.max(0, width); // no negatives
    width = Math.round(width);
    return width;
}
// Logic for determining if, when the element is right-to-left, the scrollbar appears on the left side
var _isLeftRtlScrollbars = null;
function getIsLeftRtlScrollbars() {
    if (_isLeftRtlScrollbars === null) {
        _isLeftRtlScrollbars = computeIsLeftRtlScrollbars();
    }
    return _isLeftRtlScrollbars;
}
function computeIsLeftRtlScrollbars() {
    var el = $('<div><div/></div>')
        .css({
        position: 'absolute',
        top: -1000,
        left: 0,
        border: 0,
        padding: 0,
        overflow: 'scroll',
        direction: 'rtl'
    })
        .appendTo('body');
    var innerEl = el.children();
    var res = innerEl.offset().left > el.offset().left; // is the inner div shifted to accommodate a left scrollbar?
    el.remove();
    return res;
}
// Retrieves a jQuery element's computed CSS value as a floating-point number.
// If the queried value is non-numeric (ex: IE can return "medium" for border width), will just return zero.
function getCssFloat(el, prop) {
    return parseFloat(el.css(prop)) || 0;
}
/* Mouse / Touch Utilities
----------------------------------------------------------------------------------------------------------------------*/
// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
function isPrimaryMouseButton(ev) {
    return ev.which === 1 && !ev.ctrlKey;
}
exports.isPrimaryMouseButton = isPrimaryMouseButton;
function getEvX(ev) {
    var touches = ev.originalEvent.touches;
    // on mobile FF, pageX for touch events is present, but incorrect,
    // so, look at touch coordinates first.
    if (touches && touches.length) {
        return touches[0].pageX;
    }
    return ev.pageX;
}
exports.getEvX = getEvX;
function getEvY(ev) {
    var touches = ev.originalEvent.touches;
    // on mobile FF, pageX for touch events is present, but incorrect,
    // so, look at touch coordinates first.
    if (touches && touches.length) {
        return touches[0].pageY;
    }
    return ev.pageY;
}
exports.getEvY = getEvY;
function getEvIsTouch(ev) {
    return /^touch/.test(ev.type);
}
exports.getEvIsTouch = getEvIsTouch;
function preventSelection(el) {
    el.addClass('fc-unselectable')
        .on('selectstart', preventDefault);
}
exports.preventSelection = preventSelection;
function allowSelection(el) {
    el.removeClass('fc-unselectable')
        .off('selectstart', preventDefault);
}
exports.allowSelection = allowSelection;
// Stops a mouse/touch event from doing it's native browser action
function preventDefault(ev) {
    ev.preventDefault();
}
exports.preventDefault = preventDefault;
/* General Geometry Utils
----------------------------------------------------------------------------------------------------------------------*/
// Returns a new rectangle that is the intersection of the two rectangles. If they don't intersect, returns false
function intersectRects(rect1, rect2) {
    var res = {
        left: Math.max(rect1.left, rect2.left),
        right: Math.min(rect1.right, rect2.right),
        top: Math.max(rect1.top, rect2.top),
        bottom: Math.min(rect1.bottom, rect2.bottom)
    };
    if (res.left < res.right && res.top < res.bottom) {
        return res;
    }
    return false;
}
exports.intersectRects = intersectRects;
// Returns a new point that will have been moved to reside within the given rectangle
function constrainPoint(point, rect) {
    return {
        left: Math.min(Math.max(point.left, rect.left), rect.right),
        top: Math.min(Math.max(point.top, rect.top), rect.bottom)
    };
}
exports.constrainPoint = constrainPoint;
// Returns a point that is the center of the given rectangle
function getRectCenter(rect) {
    return {
        left: (rect.left + rect.right) / 2,
        top: (rect.top + rect.bottom) / 2
    };
}
exports.getRectCenter = getRectCenter;
// Subtracts point2's coordinates from point1's coordinates, returning a delta
function diffPoints(point1, point2) {
    return {
        left: point1.left - point2.left,
        top: point1.top - point2.top
    };
}
exports.diffPoints = diffPoints;
/* Object Ordering by Field
----------------------------------------------------------------------------------------------------------------------*/
function parseFieldSpecs(input) {
    var specs = [];
    var tokens = [];
    var i;
    var token;
    if (typeof input === 'string') {
        tokens = input.split(/\s*,\s*/);
    }
    else if (typeof input === 'function') {
        tokens = [input];
    }
    else if ($.isArray(input)) {
        tokens = input;
    }
    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        if (typeof token === 'string') {
            specs.push(token.charAt(0) === '-' ?
                { field: token.substring(1), order: -1 } :
                { field: token, order: 1 });
        }
        else if (typeof token === 'function') {
            specs.push({ func: token });
        }
    }
    return specs;
}
exports.parseFieldSpecs = parseFieldSpecs;
function compareByFieldSpecs(obj1, obj2, fieldSpecs, obj1fallback, obj2fallback) {
    var i;
    var cmp;
    for (i = 0; i < fieldSpecs.length; i++) {
        cmp = compareByFieldSpec(obj1, obj2, fieldSpecs[i], obj1fallback, obj2fallback);
        if (cmp) {
            return cmp;
        }
    }
    return 0;
}
exports.compareByFieldSpecs = compareByFieldSpecs;
function compareByFieldSpec(obj1, obj2, fieldSpec, obj1fallback, obj2fallback) {
    if (fieldSpec.func) {
        return fieldSpec.func(obj1, obj2);
    }
    var val1 = obj1[fieldSpec.field];
    var val2 = obj2[fieldSpec.field];
    if (val1 == null && obj1fallback) {
        val1 = obj1fallback[fieldSpec.field];
    }
    if (val2 == null && obj2fallback) {
        val2 = obj2fallback[fieldSpec.field];
    }
    return flexibleCompare(val1, val2) * (fieldSpec.order || 1);
}
exports.compareByFieldSpec = compareByFieldSpec;
function flexibleCompare(a, b) {
    if (!a && !b) {
        return 0;
    }
    if (b == null) {
        return -1;
    }
    if (a == null) {
        return 1;
    }
    if ($.type(a) === 'string' || $.type(b) === 'string') {
        return String(a).localeCompare(String(b));
    }
    return a - b;
}
exports.flexibleCompare = flexibleCompare;
/* Date Utilities
----------------------------------------------------------------------------------------------------------------------*/
exports.dayIDs = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
exports.unitsDesc = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond']; // descending
// Diffs the two moments into a Duration where full-days are recorded first, then the remaining time.
// Moments will have their timezones normalized.
function diffDayTime(a, b) {
    return moment.duration({
        days: a.clone().stripTime().diff(b.clone().stripTime(), 'days'),
        ms: a.time() - b.time() // time-of-day from day start. disregards timezone
    });
}
exports.diffDayTime = diffDayTime;
// Diffs the two moments via their start-of-day (regardless of timezone). Produces whole-day durations.
function diffDay(a, b) {
    return moment.duration({
        days: a.clone().stripTime().diff(b.clone().stripTime(), 'days')
    });
}
exports.diffDay = diffDay;
// Diffs two moments, producing a duration, made of a whole-unit-increment of the given unit. Uses rounding.
function diffByUnit(a, b, unit) {
    return moment.duration(Math.round(a.diff(b, unit, true)), // returnFloat=true
    unit);
}
exports.diffByUnit = diffByUnit;
// Computes the unit name of the largest whole-unit period of time.
// For example, 48 hours will be "days" whereas 49 hours will be "hours".
// Accepts start/end, a range object, or an original duration object.
function computeGreatestUnit(start, end) {
    var i;
    var unit;
    var val;
    for (i = 0; i < exports.unitsDesc.length; i++) {
        unit = exports.unitsDesc[i];
        val = computeRangeAs(unit, start, end);
        if (val >= 1 && isInt(val)) {
            break;
        }
    }
    return unit; // will be "milliseconds" if nothing else matches
}
exports.computeGreatestUnit = computeGreatestUnit;
// like computeGreatestUnit, but has special abilities to interpret the source input for clues
function computeDurationGreatestUnit(duration, durationInput) {
    var unit = computeGreatestUnit(duration);
    // prevent days:7 from being interpreted as a week
    if (unit === 'week' && typeof durationInput === 'object' && durationInput.days) {
        unit = 'day';
    }
    return unit;
}
exports.computeDurationGreatestUnit = computeDurationGreatestUnit;
// Computes the number of units (like "hours") in the given range.
// Range can be a {start,end} object, separate start/end args, or a Duration.
// Results are based on Moment's .as() and .diff() methods, so results can depend on internal handling
// of month-diffing logic (which tends to vary from version to version).
function computeRangeAs(unit, start, end) {
    if (end != null) {
        return end.diff(start, unit, true);
    }
    else if (moment.isDuration(start)) {
        return start.as(unit);
    }
    else {
        return start.end.diff(start.start, unit, true);
    }
}
// Intelligently divides a range (specified by a start/end params) by a duration
function divideRangeByDuration(start, end, dur) {
    var months;
    if (durationHasTime(dur)) {
        return (end - start) / dur;
    }
    months = dur.asMonths();
    if (Math.abs(months) >= 1 && isInt(months)) {
        return end.diff(start, 'months', true) / months;
    }
    return end.diff(start, 'days', true) / dur.asDays();
}
exports.divideRangeByDuration = divideRangeByDuration;
// Intelligently divides one duration by another
function divideDurationByDuration(dur1, dur2) {
    var months1;
    var months2;
    if (durationHasTime(dur1) || durationHasTime(dur2)) {
        return dur1 / dur2;
    }
    months1 = dur1.asMonths();
    months2 = dur2.asMonths();
    if (Math.abs(months1) >= 1 && isInt(months1) &&
        Math.abs(months2) >= 1 && isInt(months2)) {
        return months1 / months2;
    }
    return dur1.asDays() / dur2.asDays();
}
exports.divideDurationByDuration = divideDurationByDuration;
// Intelligently multiplies a duration by a number
function multiplyDuration(dur, n) {
    var months;
    if (durationHasTime(dur)) {
        return moment.duration(dur * n);
    }
    months = dur.asMonths();
    if (Math.abs(months) >= 1 && isInt(months)) {
        return moment.duration({ months: months * n });
    }
    return moment.duration({ days: dur.asDays() * n });
}
exports.multiplyDuration = multiplyDuration;
// Returns a boolean about whether the given duration has any time parts (hours/minutes/seconds/ms)
function durationHasTime(dur) {
    return Boolean(dur.hours() || dur.minutes() || dur.seconds() || dur.milliseconds());
}
exports.durationHasTime = durationHasTime;
function isNativeDate(input) {
    return Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
}
exports.isNativeDate = isNativeDate;
// Returns a boolean about whether the given input is a time string, like "06:40:00" or "06:00"
function isTimeString(str) {
    return typeof str === 'string' &&
        /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(str);
}
exports.isTimeString = isTimeString;
/* Logging and Debug
----------------------------------------------------------------------------------------------------------------------*/
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var console = window.console;
    if (console && console.log) {
        return console.log.apply(console, args);
    }
}
exports.log = log;
function warn() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var console = window.console;
    if (console && console.warn) {
        return console.warn.apply(console, args);
    }
    else {
        return log.apply(null, args);
    }
}
exports.warn = warn;
/* General Utilities
----------------------------------------------------------------------------------------------------------------------*/
var hasOwnPropMethod = {}.hasOwnProperty;
// Merges an array of objects into a single object.
// The second argument allows for an array of property names who's object values will be merged together.
function mergeProps(propObjs, complexProps) {
    var dest = {};
    var i;
    var name;
    var complexObjs;
    var j;
    var val;
    var props;
    if (complexProps) {
        for (i = 0; i < complexProps.length; i++) {
            name = complexProps[i];
            complexObjs = [];
            // collect the trailing object values, stopping when a non-object is discovered
            for (j = propObjs.length - 1; j >= 0; j--) {
                val = propObjs[j][name];
                if (typeof val === 'object') {
                    complexObjs.unshift(val);
                }
                else if (val !== undefined) {
                    dest[name] = val; // if there were no objects, this value will be used
                    break;
                }
            }
            // if the trailing values were objects, use the merged value
            if (complexObjs.length) {
                dest[name] = mergeProps(complexObjs);
            }
        }
    }
    // copy values into the destination, going from last to first
    for (i = propObjs.length - 1; i >= 0; i--) {
        props = propObjs[i];
        for (name in props) {
            if (!(name in dest)) {
                dest[name] = props[name];
            }
        }
    }
    return dest;
}
exports.mergeProps = mergeProps;
function copyOwnProps(src, dest) {
    for (var name_1 in src) {
        if (hasOwnProp(src, name_1)) {
            dest[name_1] = src[name_1];
        }
    }
}
exports.copyOwnProps = copyOwnProps;
function hasOwnProp(obj, name) {
    return hasOwnPropMethod.call(obj, name);
}
exports.hasOwnProp = hasOwnProp;
function applyAll(functions, thisObj, args) {
    if ($.isFunction(functions)) {
        functions = [functions];
    }
    if (functions) {
        var i = void 0;
        var ret = void 0;
        for (i = 0; i < functions.length; i++) {
            ret = functions[i].apply(thisObj, args) || ret;
        }
        return ret;
    }
}
exports.applyAll = applyAll;
function removeMatching(array, testFunc) {
    var removeCnt = 0;
    var i = 0;
    while (i < array.length) {
        if (testFunc(array[i])) {
            array.splice(i, 1);
            removeCnt++;
        }
        else {
            i++;
        }
    }
    return removeCnt;
}
exports.removeMatching = removeMatching;
function removeExact(array, exactVal) {
    var removeCnt = 0;
    var i = 0;
    while (i < array.length) {
        if (array[i] === exactVal) {
            array.splice(i, 1);
            removeCnt++;
        }
        else {
            i++;
        }
    }
    return removeCnt;
}
exports.removeExact = removeExact;
function isArraysEqual(a0, a1) {
    var len = a0.length;
    var i;
    if (len == null || len !== a1.length) {
        return false;
    }
    for (i = 0; i < len; i++) {
        if (a0[i] !== a1[i]) {
            return false;
        }
    }
    return true;
}
exports.isArraysEqual = isArraysEqual;
function firstDefined() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var i = 0; i < args.length; i++) {
        if (args[i] !== undefined) {
            return args[i];
        }
    }
}
exports.firstDefined = firstDefined;
function htmlEscape(s) {
    return (s + '').replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#039;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br />');
}
exports.htmlEscape = htmlEscape;
function stripHtmlEntities(text) {
    return text.replace(/&.*?;/g, '');
}
exports.stripHtmlEntities = stripHtmlEntities;
// Given a hash of CSS properties, returns a string of CSS.
// Uses property names as-is (no camel-case conversion). Will not make statements for null/undefined values.
function cssToStr(cssProps) {
    var statements = [];
    $.each(cssProps, function (name, val) {
        if (val != null) {
            statements.push(name + ':' + val);
        }
    });
    return statements.join(';');
}
exports.cssToStr = cssToStr;
// Given an object hash of HTML attribute names to values,
// generates a string that can be injected between < > in HTML
function attrsToStr(attrs) {
    var parts = [];
    $.each(attrs, function (name, val) {
        if (val != null) {
            parts.push(name + '="' + htmlEscape(val) + '"');
        }
    });
    return parts.join(' ');
}
exports.attrsToStr = attrsToStr;
function capitaliseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitaliseFirstLetter = capitaliseFirstLetter;
function compareNumbers(a, b) {
    return a - b;
}
exports.compareNumbers = compareNumbers;
function isInt(n) {
    return n % 1 === 0;
}
exports.isInt = isInt;
// Returns a method bound to the given object context.
// Just like one of the jQuery.proxy signatures, but without the undesired behavior of treating the same method with
// different contexts as identical when binding/unbinding events.
function proxy(obj, methodName) {
    var method = obj[methodName];
    return function () {
        return method.apply(obj, arguments);
    };
}
exports.proxy = proxy;
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// https://github.com/jashkenas/underscore/blob/1.6.0/underscore.js#L714
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    var args;
    var context;
    var timestamp;
    var result;
    var later = function () {
        var last = +new Date() - timestamp;
        if (last < wait) {
            timeout = setTimeout(later, wait - last);
        }
        else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    };
    return function () {
        context = this;
        args = arguments;
        timestamp = +new Date();
        var callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}
exports.debounce = debounce;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(0);
var moment_ext_1 = __webpack_require__(10);
var UnzonedRange = /** @class */ (function () {
    function UnzonedRange(startInput, endInput) {
        // TODO: move these into footprint.
        // Especially, doesn't make sense for null startMs/endMs.
        this.isStart = true;
        this.isEnd = true;
        if (moment.isMoment(startInput)) {
            startInput = startInput.clone().stripZone();
        }
        if (moment.isMoment(endInput)) {
            endInput = endInput.clone().stripZone();
        }
        if (startInput) {
            this.startMs = startInput.valueOf();
        }
        if (endInput) {
            this.endMs = endInput.valueOf();
        }
    }
    /*
    SIDEEFFECT: will mutate eventRanges.
    Will return a new array result.
    Only works for non-open-ended ranges.
    */
    UnzonedRange.invertRanges = function (ranges, constraintRange) {
        var invertedRanges = [];
        var startMs = constraintRange.startMs; // the end of the previous range. the start of the new range
        var i;
        var dateRange;
        // ranges need to be in order. required for our date-walking algorithm
        ranges.sort(compareUnzonedRanges);
        for (i = 0; i < ranges.length; i++) {
            dateRange = ranges[i];
            // add the span of time before the event (if there is any)
            if (dateRange.startMs > startMs) {
                invertedRanges.push(new UnzonedRange(startMs, dateRange.startMs));
            }
            if (dateRange.endMs > startMs) {
                startMs = dateRange.endMs;
            }
        }
        // add the span of time after the last event (if there is any)
        if (startMs < constraintRange.endMs) {
            invertedRanges.push(new UnzonedRange(startMs, constraintRange.endMs));
        }
        return invertedRanges;
    };
    UnzonedRange.prototype.intersect = function (otherRange) {
        var startMs = this.startMs;
        var endMs = this.endMs;
        var newRange = null;
        if (otherRange.startMs != null) {
            if (startMs == null) {
                startMs = otherRange.startMs;
            }
            else {
                startMs = Math.max(startMs, otherRange.startMs);
            }
        }
        if (otherRange.endMs != null) {
            if (endMs == null) {
                endMs = otherRange.endMs;
            }
            else {
                endMs = Math.min(endMs, otherRange.endMs);
            }
        }
        if (startMs == null || endMs == null || startMs < endMs) {
            newRange = new UnzonedRange(startMs, endMs);
            newRange.isStart = this.isStart && startMs === this.startMs;
            newRange.isEnd = this.isEnd && endMs === this.endMs;
        }
        return newRange;
    };
    UnzonedRange.prototype.intersectsWith = function (otherRange) {
        return (this.endMs == null || otherRange.startMs == null || this.endMs > otherRange.startMs) &&
            (this.startMs == null || otherRange.endMs == null || this.startMs < otherRange.endMs);
    };
    UnzonedRange.prototype.containsRange = function (innerRange) {
        return (this.startMs == null || (innerRange.startMs != null && innerRange.startMs >= this.startMs)) &&
            (this.endMs == null || (innerRange.endMs != null && innerRange.endMs <= this.endMs));
    };
    // `date` can be a moment, a Date, or a millisecond time.
    UnzonedRange.prototype.containsDate = function (date) {
        var ms = date.valueOf();
        return (this.startMs == null || ms >= this.startMs) &&
            (this.endMs == null || ms < this.endMs);
    };
    // If the given date is not within the given range, move it inside.
    // (If it's past the end, make it one millisecond before the end).
    // `date` can be a moment, a Date, or a millisecond time.
    // Returns a MS-time.
    UnzonedRange.prototype.constrainDate = function (date) {
        var ms = date.valueOf();
        if (this.startMs != null && ms < this.startMs) {
            ms = this.startMs;
        }
        if (this.endMs != null && ms >= this.endMs) {
            ms = this.endMs - 1;
        }
        return ms;
    };
    UnzonedRange.prototype.equals = function (otherRange) {
        return this.startMs === otherRange.startMs && this.endMs === otherRange.endMs;
    };
    UnzonedRange.prototype.clone = function () {
        var range = new UnzonedRange(this.startMs, this.endMs);
        range.isStart = this.isStart;
        range.isEnd = this.isEnd;
        return range;
    };
    // Returns an ambig-zoned moment from startMs.
    // BEWARE: returned moment is not localized.
    // Formatting and start-of-week will be default.
    UnzonedRange.prototype.getStart = function () {
        if (this.startMs != null) {
            return moment_ext_1.default.utc(this.startMs).stripZone();
        }
        return null;
    };
    // Returns an ambig-zoned moment from startMs.
    // BEWARE: returned moment is not localized.
    // Formatting and start-of-week will be default.
    UnzonedRange.prototype.getEnd = function () {
        if (this.endMs != null) {
            return moment_ext_1.default.utc(this.endMs).stripZone();
        }
        return null;
    };
    UnzonedRange.prototype.as = function (unit) {
        return moment.utc(this.endMs).diff(moment.utc(this.startMs), unit, true);
    };
    return UnzonedRange;
}());
exports.default = UnzonedRange;
/*
Only works for non-open-ended ranges.
*/
function compareUnzonedRanges(range1, range2) {
    return range1.startMs - range2.startMs; // earlier ranges go first
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var ParsableModelMixin_1 = __webpack_require__(208);
var Class_1 = __webpack_require__(33);
var EventDefParser_1 = __webpack_require__(49);
var EventSource = /** @class */ (function (_super) {
    tslib_1.__extends(EventSource, _super);
    // can we do away with calendar? at least for the abstract?
    // useful for buildEventDef
    function EventSource(calendar) {
        var _this = _super.call(this) || this;
        _this.calendar = calendar;
        _this.className = [];
        _this.uid = String(EventSource.uuid++);
        return _this;
    }
    /*
    rawInput can be any data type!
    */
    EventSource.parse = function (rawInput, calendar) {
        var source = new this(calendar);
        if (typeof rawInput === 'object') {
            if (source.applyProps(rawInput)) {
                return source;
            }
        }
        return false;
    };
    EventSource.normalizeId = function (id) {
        if (id) {
            return String(id);
        }
        return null;
    };
    EventSource.prototype.fetch = function (start, end, timezone) {
        // subclasses must implement. must return a promise.
    };
    EventSource.prototype.removeEventDefsById = function (eventDefId) {
        // optional for subclasses to implement
    };
    EventSource.prototype.removeAllEventDefs = function () {
        // optional for subclasses to implement
    };
    /*
    For compairing/matching
    */
    EventSource.prototype.getPrimitive = function (otherSource) {
        // subclasses must implement
    };
    EventSource.prototype.parseEventDefs = function (rawEventDefs) {
        var i;
        var eventDef;
        var eventDefs = [];
        for (i = 0; i < rawEventDefs.length; i++) {
            eventDef = this.parseEventDef(rawEventDefs[i]);
            if (eventDef) {
                eventDefs.push(eventDef);
            }
        }
        return eventDefs;
    };
    EventSource.prototype.parseEventDef = function (rawInput) {
        var calendarTransform = this.calendar.opt('eventDataTransform');
        var sourceTransform = this.eventDataTransform;
        if (calendarTransform) {
            rawInput = calendarTransform(rawInput, this.calendar);
        }
        if (sourceTransform) {
            rawInput = sourceTransform(rawInput, this.calendar);
        }
        return EventDefParser_1.default.parse(rawInput, this);
    };
    EventSource.prototype.applyManualStandardProps = function (rawProps) {
        if (rawProps.id != null) {
            this.id = EventSource.normalizeId(rawProps.id);
        }
        // TODO: converge with EventDef
        if ($.isArray(rawProps.className)) {
            this.className = rawProps.className;
        }
        else if (typeof rawProps.className === 'string') {
            this.className = rawProps.className.split(/\s+/);
        }
        return true;
    };
    EventSource.uuid = 0;
    EventSource.defineStandardProps = ParsableModelMixin_1.default.defineStandardProps;
    EventSource.copyVerbatimStandardProps = ParsableModelMixin_1.default.copyVerbatimStandardProps;
    return EventSource;
}(Class_1.default));
exports.default = EventSource;
ParsableModelMixin_1.default.mixInto(EventSource);
// Parsing
// ---------------------------------------------------------------------------------------------------------------------
EventSource.defineStandardProps({
    // manually process...
    id: false,
    className: false,
    // automatically transfer...
    color: true,
    backgroundColor: true,
    borderColor: true,
    textColor: true,
    editable: true,
    startEditable: true,
    durationEditable: true,
    rendering: true,
    overlap: true,
    constraint: true,
    allDayDefault: true,
    eventDataTransform: true
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
Utility methods for easily listening to events on another object,
and more importantly, easily unlistening from them.

USAGE:
  import { default as ListenerMixin, ListenerInterface } from './ListenerMixin'
in class:
  listenTo: ListenerInterface['listenTo']
  stopListeningTo: ListenerInterface['stopListeningTo']
after class:
  ListenerMixin.mixInto(TheClass)
*/
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var Mixin_1 = __webpack_require__(14);
var guid = 0;
var ListenerMixin = /** @class */ (function (_super) {
    tslib_1.__extends(ListenerMixin, _super);
    function ListenerMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    Given an `other` object that has on/off methods, bind the given `callback` to an event by the given name.
    The `callback` will be called with the `this` context of the object that .listenTo is being called on.
    Can be called:
      .listenTo(other, eventName, callback)
    OR
      .listenTo(other, {
        eventName1: callback1,
        eventName2: callback2
      })
    */
    ListenerMixin.prototype.listenTo = function (other, arg, callback) {
        if (typeof arg === 'object') {
            for (var eventName in arg) {
                if (arg.hasOwnProperty(eventName)) {
                    this.listenTo(other, eventName, arg[eventName]);
                }
            }
        }
        else if (typeof arg === 'string') {
            other.on(arg + '.' + this.getListenerNamespace(), // use event namespacing to identify this object
            $.proxy(callback, this) // always use `this` context
            // the usually-undesired jQuery guid behavior doesn't matter,
            // because we always unbind via namespace
            );
        }
    };
    /*
    Causes the current object to stop listening to events on the `other` object.
    `eventName` is optional. If omitted, will stop listening to ALL events on `other`.
    */
    ListenerMixin.prototype.stopListeningTo = function (other, eventName) {
        other.off((eventName || '') + '.' + this.getListenerNamespace());
    };
    /*
    Returns a string, unique to this object, to be used for event namespacing
    */
    ListenerMixin.prototype.getListenerNamespace = function () {
        if (this.listenerId == null) {
            this.listenerId = guid++;
        }
        return '_listener' + this.listenerId;
    };
    return ListenerMixin;
}(Mixin_1.default));
exports.default = ListenerMixin;


/***/ }),
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(0);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var ambigDateOfMonthRegex = /^\s*\d{4}-\d\d$/;
var ambigTimeOrZoneRegex = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/;
var newMomentProto = moment.fn; // where we will attach our new methods
exports.newMomentProto = newMomentProto;
var oldMomentProto = $.extend({}, newMomentProto); // copy of original moment methods
exports.oldMomentProto = oldMomentProto;
// tell momentjs to transfer these properties upon clone
var momentProperties = moment.momentProperties;
momentProperties.push('_fullCalendar');
momentProperties.push('_ambigTime');
momentProperties.push('_ambigZone');
/*
Call this if you want Moment's original format method to be used
*/
function oldMomentFormat(mom, formatStr) {
    return oldMomentProto.format.call(mom, formatStr); // oldMomentProto defined in moment-ext.js
}
exports.oldMomentFormat = oldMomentFormat;
// Creating
// -------------------------------------------------------------------------------------------------
// Creates a new moment, similar to the vanilla moment(...) constructor, but with
// extra features (ambiguous time, enhanced formatting). When given an existing moment,
// it will function as a clone (and retain the zone of the moment). Anything else will
// result in a moment in the local zone.
var momentExt = function () {
    return makeMoment(arguments);
};
exports.default = momentExt;
// Sames as momentExt, but forces the resulting moment to be in the UTC timezone.
momentExt.utc = function () {
    var mom = makeMoment(arguments, true);
    // Force it into UTC because makeMoment doesn't guarantee it
    // (if given a pre-existing moment for example)
    if (mom.hasTime()) {
        mom.utc();
    }
    return mom;
};
// Same as momentExt, but when given an ISO8601 string, the timezone offset is preserved.
// ISO8601 strings with no timezone offset will become ambiguously zoned.
momentExt.parseZone = function () {
    return makeMoment(arguments, true, true);
};
// Builds an enhanced moment from args. When given an existing moment, it clones. When given a
// native Date, or called with no arguments (the current time), the resulting moment will be local.
// Anything else needs to be "parsed" (a string or an array), and will be affected by:
//    parseAsUTC - if there is no zone information, should we parse the input in UTC?
//    parseZone - if there is zone information, should we force the zone of the moment?
function makeMoment(args, parseAsUTC, parseZone) {
    if (parseAsUTC === void 0) { parseAsUTC = false; }
    if (parseZone === void 0) { parseZone = false; }
    var input = args[0];
    var isSingleString = args.length === 1 && typeof input === 'string';
    var isAmbigTime;
    var isAmbigZone;
    var ambigMatch;
    var mom;
    if (moment.isMoment(input) || util_1.isNativeDate(input) || input === undefined) {
        mom = moment.apply(null, args);
    }
    else {
        isAmbigTime = false;
        isAmbigZone = false;
        if (isSingleString) {
            if (ambigDateOfMonthRegex.test(input)) {
                // accept strings like '2014-05', but convert to the first of the month
                input += '-01';
                args = [input]; // for when we pass it on to moment's constructor
                isAmbigTime = true;
                isAmbigZone = true;
            }
            else if ((ambigMatch = ambigTimeOrZoneRegex.exec(input))) {
                isAmbigTime = !ambigMatch[5]; // no time part?
                isAmbigZone = true;
            }
        }
        else if ($.isArray(input)) {
            // arrays have no timezone information, so assume ambiguous zone
            isAmbigZone = true;
        }
        // otherwise, probably a string with a format
        if (parseAsUTC || isAmbigTime) {
            mom = moment.utc.apply(moment, args);
        }
        else {
            mom = moment.apply(null, args);
        }
        if (isAmbigTime) {
            mom._ambigTime = true;
            mom._ambigZone = true; // ambiguous time always means ambiguous zone
        }
        else if (parseZone) {
            if (isAmbigZone) {
                mom._ambigZone = true;
            }
            else if (isSingleString) {
                mom.utcOffset(input); // if not a valid zone, will assign UTC
            }
        }
    }
    mom._fullCalendar = true; // flag for extended functionality
    return mom;
}
// Week Number
// -------------------------------------------------------------------------------------------------
// Returns the week number, considering the locale's custom week number calcuation
// `weeks` is an alias for `week`
newMomentProto.week = newMomentProto.weeks = function (input) {
    var weekCalc = this._locale._fullCalendar_weekCalc;
    if (input == null && typeof weekCalc === 'function') {
        return weekCalc(this);
    }
    else if (weekCalc === 'ISO') {
        return oldMomentProto.isoWeek.apply(this, arguments); // ISO getter/setter
    }
    return oldMomentProto.week.apply(this, arguments); // local getter/setter
};
// Time-of-day
// -------------------------------------------------------------------------------------------------
// GETTER
// Returns a Duration with the hours/minutes/seconds/ms values of the moment.
// If the moment has an ambiguous time, a duration of 00:00 will be returned.
//
// SETTER
// You can supply a Duration, a Moment, or a Duration-like argument.
// When setting the time, and the moment has an ambiguous time, it then becomes unambiguous.
newMomentProto.time = function (time) {
    // Fallback to the original method (if there is one) if this moment wasn't created via FullCalendar.
    // `time` is a generic enough method name where this precaution is necessary to avoid collisions w/ other plugins.
    if (!this._fullCalendar) {
        return oldMomentProto.time.apply(this, arguments);
    }
    if (time == null) {
        return moment.duration({
            hours: this.hours(),
            minutes: this.minutes(),
            seconds: this.seconds(),
            milliseconds: this.milliseconds()
        });
    }
    else {
        this._ambigTime = false; // mark that the moment now has a time
        if (!moment.isDuration(time) && !moment.isMoment(time)) {
            time = moment.duration(time);
        }
        // The day value should cause overflow (so 24 hours becomes 00:00:00 of next day).
        // Only for Duration times, not Moment times.
        var dayHours = 0;
        if (moment.isDuration(time)) {
            dayHours = Math.floor(time.asDays()) * 24;
        }
        // We need to set the individual fields.
        // Can't use startOf('day') then add duration. In case of DST at start of day.
        return this.hours(dayHours + time.hours())
            .minutes(time.minutes())
            .seconds(time.seconds())
            .milliseconds(time.milliseconds());
    }
};
// Converts the moment to UTC, stripping out its time-of-day and timezone offset,
// but preserving its YMD. A moment with a stripped time will display no time
// nor timezone offset when .format() is called.
newMomentProto.stripTime = function () {
    if (!this._ambigTime) {
        this.utc(true); // keepLocalTime=true (for keeping *date* value)
        // set time to zero
        this.set({
            hours: 0,
            minutes: 0,
            seconds: 0,
            ms: 0
        });
        // Mark the time as ambiguous. This needs to happen after the .utc() call, which might call .utcOffset(),
        // which clears all ambig flags.
        this._ambigTime = true;
        this._ambigZone = true; // if ambiguous time, also ambiguous timezone offset
    }
    return this; // for chaining
};
// Returns if the moment has a non-ambiguous time (boolean)
newMomentProto.hasTime = function () {
    return !this._ambigTime;
};
// Timezone
// -------------------------------------------------------------------------------------------------
// Converts the moment to UTC, stripping out its timezone offset, but preserving its
// YMD and time-of-day. A moment with a stripped timezone offset will display no
// timezone offset when .format() is called.
newMomentProto.stripZone = function () {
    var wasAmbigTime;
    if (!this._ambigZone) {
        wasAmbigTime = this._ambigTime;
        this.utc(true); // keepLocalTime=true (for keeping date and time values)
        // the above call to .utc()/.utcOffset() unfortunately might clear the ambig flags, so restore
        this._ambigTime = wasAmbigTime || false;
        // Mark the zone as ambiguous. This needs to happen after the .utc() call, which might call .utcOffset(),
        // which clears the ambig flags.
        this._ambigZone = true;
    }
    return this; // for chaining
};
// Returns of the moment has a non-ambiguous timezone offset (boolean)
newMomentProto.hasZone = function () {
    return !this._ambigZone;
};
// implicitly marks a zone
newMomentProto.local = function (keepLocalTime) {
    // for when converting from ambiguously-zoned to local,
    // keep the time values when converting from UTC -> local
    oldMomentProto.local.call(this, this._ambigZone || keepLocalTime);
    // ensure non-ambiguous
    // this probably already happened via local() -> utcOffset(), but don't rely on Moment's internals
    this._ambigTime = false;
    this._ambigZone = false;
    return this; // for chaining
};
// implicitly marks a zone
newMomentProto.utc = function (keepLocalTime) {
    oldMomentProto.utc.call(this, keepLocalTime);
    // ensure non-ambiguous
    // this probably already happened via utc() -> utcOffset(), but don't rely on Moment's internals
    this._ambigTime = false;
    this._ambigZone = false;
    return this;
};
// implicitly marks a zone (will probably get called upon .utc() and .local())
newMomentProto.utcOffset = function (tzo) {
    if (tzo != null) {
        // these assignments needs to happen before the original zone method is called.
        // I forget why, something to do with a browser crash.
        this._ambigTime = false;
        this._ambigZone = false;
    }
    return oldMomentProto.utcOffset.apply(this, arguments);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
USAGE:
  import { default as EmitterMixin, EmitterInterface } from './EmitterMixin'
in class:
  on: EmitterInterface['on']
  one: EmitterInterface['one']
  off: EmitterInterface['off']
  trigger: EmitterInterface['trigger']
  triggerWith: EmitterInterface['triggerWith']
  hasHandlers: EmitterInterface['hasHandlers']
after class:
  EmitterMixin.mixInto(TheClass)
*/
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var Mixin_1 = __webpack_require__(14);
var EmitterMixin = /** @class */ (function (_super) {
    tslib_1.__extends(EmitterMixin, _super);
    function EmitterMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // jQuery-ification via $(this) allows a non-DOM object to have
    // the same event handling capabilities (including namespaces).
    EmitterMixin.prototype.on = function (types, handler) {
        $(this).on(types, this._prepareIntercept(handler));
        return this; // for chaining
    };
    EmitterMixin.prototype.one = function (types, handler) {
        $(this).one(types, this._prepareIntercept(handler));
        return this; // for chaining
    };
    EmitterMixin.prototype._prepareIntercept = function (handler) {
        // handlers are always called with an "event" object as their first param.
        // sneak the `this` context and arguments into the extra parameter object
        // and forward them on to the original handler.
        var intercept = function (ev, extra) {
            return handler.apply(extra.context || this, extra.args || []);
        };
        // mimick jQuery's internal "proxy" system (risky, I know)
        // causing all functions with the same .guid to appear to be the same.
        // https://github.com/jquery/jquery/blob/2.2.4/src/core.js#L448
        // this is needed for calling .off with the original non-intercept handler.
        if (!handler.guid) {
            handler.guid = $.guid++;
        }
        intercept.guid = handler.guid;
        return intercept;
    };
    EmitterMixin.prototype.off = function (types, handler) {
        $(this).off(types, handler);
        return this; // for chaining
    };
    EmitterMixin.prototype.trigger = function (types) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // pass in "extra" info to the intercept
        $(this).triggerHandler(types, { args: args });
        return this; // for chaining
    };
    EmitterMixin.prototype.triggerWith = function (types, context, args) {
        // `triggerHandler` is less reliant on the DOM compared to `trigger`.
        // pass in "extra" info to the intercept.
        $(this).triggerHandler(types, { context: context, args: args });
        return this; // for chaining
    };
    EmitterMixin.prototype.hasHandlers = function (type) {
        var hash = $._data(this, 'events'); // http://blog.jquery.com/2012/08/09/jquery-1-8-released/
        return hash && hash[type] && hash[type].length > 0;
    };
    return EmitterMixin;
}(Mixin_1.default));
exports.default = EmitterMixin;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/*
Meant to be immutable
*/
var ComponentFootprint = /** @class */ (function () {
    function ComponentFootprint(unzonedRange, isAllDay) {
        this.isAllDay = false; // component can choose to ignore this
        this.unzonedRange = unzonedRange;
        this.isAllDay = isAllDay;
    }
    /*
    Only works for non-open-ended ranges.
    */
    ComponentFootprint.prototype.toLegacy = function (calendar) {
        return {
            start: calendar.msToMoment(this.unzonedRange.startMs, this.isAllDay),
            end: calendar.msToMoment(this.unzonedRange.endMs, this.isAllDay)
        };
    };
    return ComponentFootprint;
}());
exports.default = ComponentFootprint;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var EventDef_1 = __webpack_require__(34);
var EventInstance_1 = __webpack_require__(209);
var EventDateProfile_1 = __webpack_require__(17);
var SingleEventDef = /** @class */ (function (_super) {
    tslib_1.__extends(SingleEventDef, _super);
    function SingleEventDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    Will receive start/end params, but will be ignored.
    */
    SingleEventDef.prototype.buildInstances = function () {
        return [this.buildInstance()];
    };
    SingleEventDef.prototype.buildInstance = function () {
        return new EventInstance_1.default(this, // definition
        this.dateProfile);
    };
    SingleEventDef.prototype.isAllDay = function () {
        return this.dateProfile.isAllDay();
    };
    SingleEventDef.prototype.clone = function () {
        var def = _super.prototype.clone.call(this);
        def.dateProfile = this.dateProfile;
        return def;
    };
    SingleEventDef.prototype.rezone = function () {
        var calendar = this.source.calendar;
        var dateProfile = this.dateProfile;
        this.dateProfile = new EventDateProfile_1.default(calendar.moment(dateProfile.start), dateProfile.end ? calendar.moment(dateProfile.end) : null, calendar);
    };
    /*
    NOTE: if super-method fails, should still attempt to apply
    */
    SingleEventDef.prototype.applyManualStandardProps = function (rawProps) {
        var superSuccess = _super.prototype.applyManualStandardProps.call(this, rawProps);
        var dateProfile = EventDateProfile_1.default.parse(rawProps, this.source); // returns null on failure
        if (dateProfile) {
            this.dateProfile = dateProfile;
            // make sure `date` shows up in the legacy event objects as-is
            if (rawProps.date != null) {
                this.miscProps.date = rawProps.date;
            }
            return superSuccess;
        }
        else {
            return false;
        }
    };
    return SingleEventDef;
}(EventDef_1.default));
exports.default = SingleEventDef;
// Parsing
// ---------------------------------------------------------------------------------------------------------------------
SingleEventDef.defineStandardProps({
    start: false,
    date: false,
    end: false,
    allDay: false
});


/***/ }),
/* 14 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var Mixin = /** @class */ (function () {
    function Mixin() {
    }
    Mixin.mixInto = function (destClass) {
        var _this = this;
        Object.getOwnPropertyNames(this.prototype).forEach(function (name) {
            if (!destClass.prototype[name]) {
                destClass.prototype[name] = _this.prototype[name];
            }
        });
    };
    /*
    will override existing methods
    TODO: remove! not used anymore
    */
    Mixin.mixOver = function (destClass) {
        var _this = this;
        Object.getOwnPropertyNames(this.prototype).forEach(function (name) {
            destClass.prototype[name] = _this.prototype[name];
        });
    };
    return Mixin;
}());
exports.default = Mixin;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var Interaction = /** @class */ (function () {
    function Interaction(component) {
        this.view = component._getView();
        this.component = component;
    }
    Interaction.prototype.opt = function (name) {
        return this.view.opt(name);
    };
    Interaction.prototype.end = function () {
        // subclasses can implement
    };
    return Interaction;
}());
exports.default = Interaction;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.version = '3.9.0';
// When introducing internal API incompatibilities (where fullcalendar plugins would break),
// the minor version of the calendar should be upped (ex: 2.7.2 -> 2.8.0)
// and the below integer should be incremented.
exports.internalApiVersion = 12;
var util_1 = __webpack_require__(4);
exports.applyAll = util_1.applyAll;
exports.debounce = util_1.debounce;
exports.isInt = util_1.isInt;
exports.htmlEscape = util_1.htmlEscape;
exports.cssToStr = util_1.cssToStr;
exports.proxy = util_1.proxy;
exports.capitaliseFirstLetter = util_1.capitaliseFirstLetter;
exports.getOuterRect = util_1.getOuterRect;
exports.getClientRect = util_1.getClientRect;
exports.getContentRect = util_1.getContentRect;
exports.getScrollbarWidths = util_1.getScrollbarWidths;
exports.preventDefault = util_1.preventDefault;
exports.parseFieldSpecs = util_1.parseFieldSpecs;
exports.compareByFieldSpecs = util_1.compareByFieldSpecs;
exports.compareByFieldSpec = util_1.compareByFieldSpec;
exports.flexibleCompare = util_1.flexibleCompare;
exports.computeGreatestUnit = util_1.computeGreatestUnit;
exports.divideRangeByDuration = util_1.divideRangeByDuration;
exports.divideDurationByDuration = util_1.divideDurationByDuration;
exports.multiplyDuration = util_1.multiplyDuration;
exports.durationHasTime = util_1.durationHasTime;
exports.log = util_1.log;
exports.warn = util_1.warn;
exports.removeExact = util_1.removeExact;
exports.intersectRects = util_1.intersectRects;
var date_formatting_1 = __webpack_require__(47);
exports.formatDate = date_formatting_1.formatDate;
exports.formatRange = date_formatting_1.formatRange;
exports.queryMostGranularFormatUnit = date_formatting_1.queryMostGranularFormatUnit;
var locale_1 = __webpack_require__(31);
exports.datepickerLocale = locale_1.datepickerLocale;
exports.locale = locale_1.locale;
var moment_ext_1 = __webpack_require__(10);
exports.moment = moment_ext_1.default;
var EmitterMixin_1 = __webpack_require__(11);
exports.EmitterMixin = EmitterMixin_1.default;
var ListenerMixin_1 = __webpack_require__(7);
exports.ListenerMixin = ListenerMixin_1.default;
var Model_1 = __webpack_require__(48);
exports.Model = Model_1.default;
var Constraints_1 = __webpack_require__(207);
exports.Constraints = Constraints_1.default;
var UnzonedRange_1 = __webpack_require__(5);
exports.UnzonedRange = UnzonedRange_1.default;
var ComponentFootprint_1 = __webpack_require__(12);
exports.ComponentFootprint = ComponentFootprint_1.default;
var BusinessHourGenerator_1 = __webpack_require__(212);
exports.BusinessHourGenerator = BusinessHourGenerator_1.default;
var EventDef_1 = __webpack_require__(34);
exports.EventDef = EventDef_1.default;
var EventDefMutation_1 = __webpack_require__(37);
exports.EventDefMutation = EventDefMutation_1.default;
var EventSourceParser_1 = __webpack_require__(38);
exports.EventSourceParser = EventSourceParser_1.default;
var EventSource_1 = __webpack_require__(6);
exports.EventSource = EventSource_1.default;
var ThemeRegistry_1 = __webpack_require__(51);
exports.defineThemeSystem = ThemeRegistry_1.defineThemeSystem;
var EventInstanceGroup_1 = __webpack_require__(18);
exports.EventInstanceGroup = EventInstanceGroup_1.default;
var ArrayEventSource_1 = __webpack_require__(52);
exports.ArrayEventSource = ArrayEventSource_1.default;
var FuncEventSource_1 = __webpack_require__(215);
exports.FuncEventSource = FuncEventSource_1.default;
var JsonFeedEventSource_1 = __webpack_require__(216);
exports.JsonFeedEventSource = JsonFeedEventSource_1.default;
var EventFootprint_1 = __webpack_require__(36);
exports.EventFootprint = EventFootprint_1.default;
var Class_1 = __webpack_require__(33);
exports.Class = Class_1.default;
var Mixin_1 = __webpack_require__(14);
exports.Mixin = Mixin_1.default;
var CoordCache_1 = __webpack_require__(53);
exports.CoordCache = CoordCache_1.default;
var DragListener_1 = __webpack_require__(54);
exports.DragListener = DragListener_1.default;
var Promise_1 = __webpack_require__(20);
exports.Promise = Promise_1.default;
var TaskQueue_1 = __webpack_require__(217);
exports.TaskQueue = TaskQueue_1.default;
var RenderQueue_1 = __webpack_require__(218);
exports.RenderQueue = RenderQueue_1.default;
var Scroller_1 = __webpack_require__(39);
exports.Scroller = Scroller_1.default;
var Theme_1 = __webpack_require__(19);
exports.Theme = Theme_1.default;
var DateComponent_1 = __webpack_require__(219);
exports.DateComponent = DateComponent_1.default;
var InteractiveDateComponent_1 = __webpack_require__(40);
exports.InteractiveDateComponent = InteractiveDateComponent_1.default;
var Calendar_1 = __webpack_require__(220);
exports.Calendar = Calendar_1.default;
var View_1 = __webpack_require__(41);
exports.View = View_1.default;
var ViewRegistry_1 = __webpack_require__(22);
exports.defineView = ViewRegistry_1.defineView;
exports.getViewConfig = ViewRegistry_1.getViewConfig;
var DayTableMixin_1 = __webpack_require__(55);
exports.DayTableMixin = DayTableMixin_1.default;
var BusinessHourRenderer_1 = __webpack_require__(56);
exports.BusinessHourRenderer = BusinessHourRenderer_1.default;
var EventRenderer_1 = __webpack_require__(42);
exports.EventRenderer = EventRenderer_1.default;
var FillRenderer_1 = __webpack_require__(57);
exports.FillRenderer = FillRenderer_1.default;
var HelperRenderer_1 = __webpack_require__(58);
exports.HelperRenderer = HelperRenderer_1.default;
var ExternalDropping_1 = __webpack_require__(222);
exports.ExternalDropping = ExternalDropping_1.default;
var EventResizing_1 = __webpack_require__(223);
exports.EventResizing = EventResizing_1.default;
var EventPointing_1 = __webpack_require__(59);
exports.EventPointing = EventPointing_1.default;
var EventDragging_1 = __webpack_require__(224);
exports.EventDragging = EventDragging_1.default;
var DateSelecting_1 = __webpack_require__(225);
exports.DateSelecting = DateSelecting_1.default;
var StandardInteractionsMixin_1 = __webpack_require__(60);
exports.StandardInteractionsMixin = StandardInteractionsMixin_1.default;
var AgendaView_1 = __webpack_require__(226);
exports.AgendaView = AgendaView_1.default;
var TimeGrid_1 = __webpack_require__(227);
exports.TimeGrid = TimeGrid_1.default;
var DayGrid_1 = __webpack_require__(61);
exports.DayGrid = DayGrid_1.default;
var BasicView_1 = __webpack_require__(62);
exports.BasicView = BasicView_1.default;
var MonthView_1 = __webpack_require__(229);
exports.MonthView = MonthView_1.default;
var ListView_1 = __webpack_require__(230);
exports.ListView = ListView_1.default;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var UnzonedRange_1 = __webpack_require__(5);
/*
Meant to be immutable
*/
var EventDateProfile = /** @class */ (function () {
    function EventDateProfile(start, end, calendar) {
        this.start = start;
        this.end = end || null;
        this.unzonedRange = this.buildUnzonedRange(calendar);
    }
    /*
    Needs an EventSource object
    */
    EventDateProfile.parse = function (rawProps, source) {
        var startInput = rawProps.start || rawProps.date;
        var endInput = rawProps.end;
        if (!startInput) {
            return false;
        }
        var calendar = source.calendar;
        var start = calendar.moment(startInput);
        var end = endInput ? calendar.moment(endInput) : null;
        var forcedAllDay = rawProps.allDay;
        var forceEventDuration = calendar.opt('forceEventDuration');
        if (!start.isValid()) {
            return false;
        }
        if (end && (!end.isValid() || !end.isAfter(start))) {
            end = null;
        }
        if (forcedAllDay == null) {
            forcedAllDay = source.allDayDefault;
            if (forcedAllDay == null) {
                forcedAllDay = calendar.opt('allDayDefault');
            }
        }
        if (forcedAllDay === true) {
            start.stripTime();
            if (end) {
                end.stripTime();
            }
        }
        else if (forcedAllDay === false) {
            if (!start.hasTime()) {
                start.time(0);
            }
            if (end && !end.hasTime()) {
                end.time(0);
            }
        }
        if (!end && forceEventDuration) {
            end = calendar.getDefaultEventEnd(!start.hasTime(), start);
        }
        return new EventDateProfile(start, end, calendar);
    };
    EventDateProfile.isStandardProp = function (propName) {
        return propName === 'start' || propName === 'date' || propName === 'end' || propName === 'allDay';
    };
    EventDateProfile.prototype.isAllDay = function () {
        return !(this.start.hasTime() || (this.end && this.end.hasTime()));
    };
    /*
    Needs a Calendar object
    */
    EventDateProfile.prototype.buildUnzonedRange = function (calendar) {
        var startMs = this.start.clone().stripZone().valueOf();
        var endMs = this.getEnd(calendar).stripZone().valueOf();
        return new UnzonedRange_1.default(startMs, endMs);
    };
    /*
    Needs a Calendar object
    */
    EventDateProfile.prototype.getEnd = function (calendar) {
        return this.end ?
            this.end.clone() :
            // derive the end from the start and allDay. compute allDay if necessary
            calendar.getDefaultEventEnd(this.isAllDay(), this.start);
    };
    return EventDateProfile;
}());
exports.default = EventDateProfile;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var UnzonedRange_1 = __webpack_require__(5);
var util_1 = __webpack_require__(35);
var EventRange_1 = __webpack_require__(211);
/*
It's expected that there will be at least one EventInstance,
OR that an explicitEventDef is assigned.
*/
var EventInstanceGroup = /** @class */ (function () {
    function EventInstanceGroup(eventInstances) {
        this.eventInstances = eventInstances || [];
    }
    EventInstanceGroup.prototype.getAllEventRanges = function (constraintRange) {
        if (constraintRange) {
            return this.sliceNormalRenderRanges(constraintRange);
        }
        else {
            return this.eventInstances.map(util_1.eventInstanceToEventRange);
        }
    };
    EventInstanceGroup.prototype.sliceRenderRanges = function (constraintRange) {
        if (this.isInverse()) {
            return this.sliceInverseRenderRanges(constraintRange);
        }
        else {
            return this.sliceNormalRenderRanges(constraintRange);
        }
    };
    EventInstanceGroup.prototype.sliceNormalRenderRanges = function (constraintRange) {
        var eventInstances = this.eventInstances;
        var i;
        var eventInstance;
        var slicedRange;
        var slicedEventRanges = [];
        for (i = 0; i < eventInstances.length; i++) {
            eventInstance = eventInstances[i];
            slicedRange = eventInstance.dateProfile.unzonedRange.intersect(constraintRange);
            if (slicedRange) {
                slicedEventRanges.push(new EventRange_1.default(slicedRange, eventInstance.def, eventInstance));
            }
        }
        return slicedEventRanges;
    };
    EventInstanceGroup.prototype.sliceInverseRenderRanges = function (constraintRange) {
        var unzonedRanges = this.eventInstances.map(util_1.eventInstanceToUnzonedRange);
        var ownerDef = this.getEventDef();
        unzonedRanges = UnzonedRange_1.default.invertRanges(unzonedRanges, constraintRange);
        return unzonedRanges.map(function (unzonedRange) {
            return new EventRange_1.default(unzonedRange, ownerDef); // don't give an EventInstance
        });
    };
    EventInstanceGroup.prototype.isInverse = function () {
        return this.getEventDef().hasInverseRendering();
    };
    EventInstanceGroup.prototype.getEventDef = function () {
        return this.explicitEventDef || this.eventInstances[0].def;
    };
    return EventInstanceGroup;
}());
exports.default = EventInstanceGroup;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var Theme = /** @class */ (function () {
    function Theme(optionsManager) {
        this.optionsManager = optionsManager;
        this.processIconOverride();
    }
    Theme.prototype.processIconOverride = function () {
        if (this.iconOverrideOption) {
            this.setIconOverride(this.optionsManager.get(this.iconOverrideOption));
        }
    };
    Theme.prototype.setIconOverride = function (iconOverrideHash) {
        var iconClassesCopy;
        var buttonName;
        if ($.isPlainObject(iconOverrideHash)) {
            iconClassesCopy = $.extend({}, this.iconClasses);
            for (buttonName in iconOverrideHash) {
                iconClassesCopy[buttonName] = this.applyIconOverridePrefix(iconOverrideHash[buttonName]);
            }
            this.iconClasses = iconClassesCopy;
        }
        else if (iconOverrideHash === false) {
            this.iconClasses = {};
        }
    };
    Theme.prototype.applyIconOverridePrefix = function (className) {
        var prefix = this.iconOverridePrefix;
        if (prefix && className.indexOf(prefix) !== 0) {
            className = prefix + className;
        }
        return className;
    };
    Theme.prototype.getClass = function (key) {
        return this.classes[key] || '';
    };
    Theme.prototype.getIconClass = function (buttonName) {
        var className = this.iconClasses[buttonName];
        if (className) {
            return this.baseIconClass + ' ' + className;
        }
        return '';
    };
    Theme.prototype.getCustomButtonIconClass = function (customButtonProps) {
        var className;
        if (this.iconOverrideCustomButtonOption) {
            className = customButtonProps[this.iconOverrideCustomButtonOption];
            if (className) {
                return this.baseIconClass + ' ' + this.applyIconOverridePrefix(className);
            }
        }
        return '';
    };
    return Theme;
}());
exports.default = Theme;
Theme.prototype.classes = {};
Theme.prototype.iconClasses = {};
Theme.prototype.baseIconClass = '';
Theme.prototype.iconOverridePrefix = '';


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var PromiseStub = {
    construct: function (executor) {
        var deferred = $.Deferred();
        var promise = deferred.promise();
        if (typeof executor === 'function') {
            executor(function (val) {
                deferred.resolve(val);
                attachImmediatelyResolvingThen(promise, val);
            }, function () {
                deferred.reject();
                attachImmediatelyRejectingThen(promise);
            });
        }
        return promise;
    },
    resolve: function (val) {
        var deferred = $.Deferred().resolve(val);
        var promise = deferred.promise();
        attachImmediatelyResolvingThen(promise, val);
        return promise;
    },
    reject: function () {
        var deferred = $.Deferred().reject();
        var promise = deferred.promise();
        attachImmediatelyRejectingThen(promise);
        return promise;
    }
};
exports.default = PromiseStub;
function attachImmediatelyResolvingThen(promise, val) {
    promise.then = function (onResolve) {
        if (typeof onResolve === 'function') {
            return PromiseStub.resolve(onResolve(val));
        }
        return promise;
    };
}
function attachImmediatelyRejectingThen(promise) {
    promise.then = function (onResolve, onReject) {
        if (typeof onReject === 'function') {
            onReject();
        }
        return promise;
    };
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var exportHooks = __webpack_require__(16);
var EmitterMixin_1 = __webpack_require__(11);
var ListenerMixin_1 = __webpack_require__(7);
exportHooks.touchMouseIgnoreWait = 500;
var globalEmitter = null;
var neededCount = 0;
/*
Listens to document and window-level user-interaction events, like touch events and mouse events,
and fires these events as-is to whoever is observing a GlobalEmitter.
Best when used as a singleton via GlobalEmitter.get()

Normalizes mouse/touch events. For examples:
- ignores the the simulated mouse events that happen after a quick tap: mousemove+mousedown+mouseup+click
- compensates for various buggy scenarios where a touchend does not fire
*/
var GlobalEmitter = /** @class */ (function () {
    function GlobalEmitter() {
        this.isTouching = false;
        this.mouseIgnoreDepth = 0;
    }
    // gets the singleton
    GlobalEmitter.get = function () {
        if (!globalEmitter) {
            globalEmitter = new GlobalEmitter();
            globalEmitter.bind();
        }
        return globalEmitter;
    };
    // called when an object knows it will need a GlobalEmitter in the near future.
    GlobalEmitter.needed = function () {
        GlobalEmitter.get(); // ensures globalEmitter
        neededCount++;
    };
    // called when the object that originally called needed() doesn't need a GlobalEmitter anymore.
    GlobalEmitter.unneeded = function () {
        neededCount--;
        if (!neededCount) {
            globalEmitter.unbind();
            globalEmitter = null;
        }
    };
    GlobalEmitter.prototype.bind = function () {
        var _this = this;
        this.listenTo($(document), {
            touchstart: this.handleTouchStart,
            touchcancel: this.handleTouchCancel,
            touchend: this.handleTouchEnd,
            mousedown: this.handleMouseDown,
            mousemove: this.handleMouseMove,
            mouseup: this.handleMouseUp,
            click: this.handleClick,
            selectstart: this.handleSelectStart,
            contextmenu: this.handleContextMenu
        });
        // because we need to call preventDefault
        // because https://www.chromestatus.com/features/5093566007214080
        // TODO: investigate performance because this is a global handler
        window.addEventListener('touchmove', this.handleTouchMoveProxy = function (ev) {
            _this.handleTouchMove($.Event(ev));
        }, { passive: false } // allows preventDefault()
        );
        // attach a handler to get called when ANY scroll action happens on the page.
        // this was impossible to do with normal on/off because 'scroll' doesn't bubble.
        // http://stackoverflow.com/a/32954565/96342
        window.addEventListener('scroll', this.handleScrollProxy = function (ev) {
            _this.handleScroll($.Event(ev));
        }, true // useCapture
        );
    };
    GlobalEmitter.prototype.unbind = function () {
        this.stopListeningTo($(document));
        window.removeEventListener('touchmove', this.handleTouchMoveProxy);
        window.removeEventListener('scroll', this.handleScrollProxy, true // useCapture
        );
    };
    // Touch Handlers
    // -----------------------------------------------------------------------------------------------------------------
    GlobalEmitter.prototype.handleTouchStart = function (ev) {
        // if a previous touch interaction never ended with a touchend, then implicitly end it,
        // but since a new touch interaction is about to begin, don't start the mouse ignore period.
        this.stopTouch(ev, true); // skipMouseIgnore=true
        this.isTouching = true;
        this.trigger('touchstart', ev);
    };
    GlobalEmitter.prototype.handleTouchMove = function (ev) {
        if (this.isTouching) {
            this.trigger('touchmove', ev);
        }
    };
    GlobalEmitter.prototype.handleTouchCancel = function (ev) {
        if (this.isTouching) {
            this.trigger('touchcancel', ev);
            // Have touchcancel fire an artificial touchend. That way, handlers won't need to listen to both.
            // If touchend fires later, it won't have any effect b/c isTouching will be false.
            this.stopTouch(ev);
        }
    };
    GlobalEmitter.prototype.handleTouchEnd = function (ev) {
        this.stopTouch(ev);
    };
    // Mouse Handlers
    // -----------------------------------------------------------------------------------------------------------------
    GlobalEmitter.prototype.handleMouseDown = function (ev) {
        if (!this.shouldIgnoreMouse()) {
            this.trigger('mousedown', ev);
        }
    };
    GlobalEmitter.prototype.handleMouseMove = function (ev) {
        if (!this.shouldIgnoreMouse()) {
            this.trigger('mousemove', ev);
        }
    };
    GlobalEmitter.prototype.handleMouseUp = function (ev) {
        if (!this.shouldIgnoreMouse()) {
            this.trigger('mouseup', ev);
        }
    };
    GlobalEmitter.prototype.handleClick = function (ev) {
        if (!this.shouldIgnoreMouse()) {
            this.trigger('click', ev);
        }
    };
    // Misc Handlers
    // -----------------------------------------------------------------------------------------------------------------
    GlobalEmitter.prototype.handleSelectStart = function (ev) {
        this.trigger('selectstart', ev);
    };
    GlobalEmitter.prototype.handleContextMenu = function (ev) {
        this.trigger('contextmenu', ev);
    };
    GlobalEmitter.prototype.handleScroll = function (ev) {
        this.trigger('scroll', ev);
    };
    // Utils
    // -----------------------------------------------------------------------------------------------------------------
    GlobalEmitter.prototype.stopTouch = function (ev, skipMouseIgnore) {
        if (skipMouseIgnore === void 0) { skipMouseIgnore = false; }
        if (this.isTouching) {
            this.isTouching = false;
            this.trigger('touchend', ev);
            if (!skipMouseIgnore) {
                this.startTouchMouseIgnore();
            }
        }
    };
    GlobalEmitter.prototype.startTouchMouseIgnore = function () {
        var _this = this;
        var wait = exportHooks.touchMouseIgnoreWait;
        if (wait) {
            this.mouseIgnoreDepth++;
            setTimeout(function () {
                _this.mouseIgnoreDepth--;
            }, wait);
        }
    };
    GlobalEmitter.prototype.shouldIgnoreMouse = function () {
        return this.isTouching || Boolean(this.mouseIgnoreDepth);
    };
    return GlobalEmitter;
}());
exports.default = GlobalEmitter;
ListenerMixin_1.default.mixInto(GlobalEmitter);
EmitterMixin_1.default.mixInto(GlobalEmitter);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var exportHooks = __webpack_require__(16);
exports.viewHash = {};
exportHooks.views = exports.viewHash;
function defineView(viewName, viewConfig) {
    exports.viewHash[viewName] = viewConfig;
}
exports.defineView = defineView;
function getViewConfig(viewName) {
    return exports.viewHash[viewName];
}
exports.getViewConfig = getViewConfig;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
var DragListener_1 = __webpack_require__(54);
/* Tracks mouse movements over a component and raises events about which hit the mouse is over.
------------------------------------------------------------------------------------------------------------------------
options:
- subjectEl
- subjectCenter
*/
var HitDragListener = /** @class */ (function (_super) {
    tslib_1.__extends(HitDragListener, _super);
    function HitDragListener(component, options) {
        var _this = _super.call(this, options) || this;
        _this.component = component;
        return _this;
    }
    // Called when drag listening starts (but a real drag has not necessarily began).
    // ev might be undefined if dragging was started manually.
    HitDragListener.prototype.handleInteractionStart = function (ev) {
        var subjectEl = this.subjectEl;
        var subjectRect;
        var origPoint;
        var point;
        this.component.hitsNeeded();
        this.computeScrollBounds(); // for autoscroll
        if (ev) {
            origPoint = { left: util_1.getEvX(ev), top: util_1.getEvY(ev) };
            point = origPoint;
            // constrain the point to bounds of the element being dragged
            if (subjectEl) {
                subjectRect = util_1.getOuterRect(subjectEl); // used for centering as well
                point = util_1.constrainPoint(point, subjectRect);
            }
            this.origHit = this.queryHit(point.left, point.top);
            // treat the center of the subject as the collision point?
            if (subjectEl && this.options.subjectCenter) {
                // only consider the area the subject overlaps the hit. best for large subjects.
                // TODO: skip this if hit didn't supply left/right/top/bottom
                if (this.origHit) {
                    subjectRect = util_1.intersectRects(this.origHit, subjectRect) ||
                        subjectRect; // in case there is no intersection
                }
                point = util_1.getRectCenter(subjectRect);
            }
            this.coordAdjust = util_1.diffPoints(point, origPoint); // point - origPoint
        }
        else {
            this.origHit = null;
            this.coordAdjust = null;
        }
        // call the super-method. do it after origHit has been computed
        _super.prototype.handleInteractionStart.call(this, ev);
    };
    // Called when the actual drag has started
    HitDragListener.prototype.handleDragStart = function (ev) {
        var hit;
        _super.prototype.handleDragStart.call(this, ev);
        // might be different from this.origHit if the min-distance is large
        hit = this.queryHit(util_1.getEvX(ev), util_1.getEvY(ev));
        // report the initial hit the mouse is over
        // especially important if no min-distance and drag starts immediately
        if (hit) {
            this.handleHitOver(hit);
        }
    };
    // Called when the drag moves
    HitDragListener.prototype.handleDrag = function (dx, dy, ev) {
        var hit;
        _super.prototype.handleDrag.call(this, dx, dy, ev);
        hit = this.queryHit(util_1.getEvX(ev), util_1.getEvY(ev));
        if (!isHitsEqual(hit, this.hit)) {
            if (this.hit) {
                this.handleHitOut();
            }
            if (hit) {
                this.handleHitOver(hit);
            }
        }
    };
    // Called when dragging has been stopped
    HitDragListener.prototype.handleDragEnd = function (ev) {
        this.handleHitDone();
        _super.prototype.handleDragEnd.call(this, ev);
    };
    // Called when a the mouse has just moved over a new hit
    HitDragListener.prototype.handleHitOver = function (hit) {
        var isOrig = isHitsEqual(hit, this.origHit);
        this.hit = hit;
        this.trigger('hitOver', this.hit, isOrig, this.origHit);
    };
    // Called when the mouse has just moved out of a hit
    HitDragListener.prototype.handleHitOut = function () {
        if (this.hit) {
            this.trigger('hitOut', this.hit);
            this.handleHitDone();
            this.hit = null;
        }
    };
    // Called after a hitOut. Also called before a dragStop
    HitDragListener.prototype.handleHitDone = function () {
        if (this.hit) {
            this.trigger('hitDone', this.hit);
        }
    };
    // Called when the interaction ends, whether there was a real drag or not
    HitDragListener.prototype.handleInteractionEnd = function (ev, isCancelled) {
        _super.prototype.handleInteractionEnd.call(this, ev, isCancelled);
        this.origHit = null;
        this.hit = null;
        this.component.hitsNotNeeded();
    };
    // Called when scrolling has stopped, whether through auto scroll, or the user scrolling
    HitDragListener.prototype.handleScrollEnd = function () {
        _super.prototype.handleScrollEnd.call(this);
        // hits' absolute positions will be in new places after a user's scroll.
        // HACK for recomputing.
        if (this.isDragging) {
            this.component.releaseHits();
            this.component.prepareHits();
        }
    };
    // Gets the hit underneath the coordinates for the given mouse event
    HitDragListener.prototype.queryHit = function (left, top) {
        if (this.coordAdjust) {
            left += this.coordAdjust.left;
            top += this.coordAdjust.top;
        }
        return this.component.queryHit(left, top);
    };
    return HitDragListener;
}(DragListener_1.default));
exports.default = HitDragListener;
// Returns `true` if the hits are identically equal. `false` otherwise. Must be from the same component.
// Two null values will be considered equal, as two "out of the component" states are the same.
function isHitsEqual(hit0, hit1) {
    if (!hit0 && !hit1) {
        return true;
    }
    if (hit0 && hit1) {
        return hit0.component === hit1.component &&
            isHitPropsWithin(hit0, hit1) &&
            isHitPropsWithin(hit1, hit0); // ensures all props are identical
    }
    return false;
}
// Returns true if all of subHit's non-standard properties are within superHit
function isHitPropsWithin(subHit, superHit) {
    for (var propName in subHit) {
        if (!/^(component|left|right|top|bottom)$/.test(propName)) {
            if (subHit[propName] !== superHit[propName]) {
                return false;
            }
        }
    }
    return true;
}


/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var exportHooks = __webpack_require__(16);
var options_1 = __webpack_require__(32);
var util_1 = __webpack_require__(4);
exports.localeOptionHash = {};
exportHooks.locales = exports.localeOptionHash;
// NOTE: can't guarantee any of these computations will run because not every locale has datepicker
// configs, so make sure there are English fallbacks for these in the defaults file.
var dpComputableOptions = {
    buttonText: function (dpOptions) {
        return {
            // the translations sometimes wrongly contain HTML entities
            prev: util_1.stripHtmlEntities(dpOptions.prevText),
            next: util_1.stripHtmlEntities(dpOptions.nextText),
            today: util_1.stripHtmlEntities(dpOptions.currentText)
        };
    },
    // Produces format strings like "MMMM YYYY" -> "September 2014"
    monthYearFormat: function (dpOptions) {
        return dpOptions.showMonthAfterYear ?
            'YYYY[' + dpOptions.yearSuffix + '] MMMM' :
            'MMMM YYYY[' + dpOptions.yearSuffix + ']';
    }
};
var momComputableOptions = {
    // Produces format strings like "ddd M/D" -> "Fri 9/15"
    dayOfMonthFormat: function (momOptions, fcOptions) {
        var format = momOptions.longDateFormat('l'); // for the format like "M/D/YYYY"
        // strip the year off the edge, as well as other misc non-whitespace chars
        format = format.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, '');
        if (fcOptions.isRTL) {
            format += ' ddd'; // for RTL, add day-of-week to end
        }
        else {
            format = 'ddd ' + format; // for LTR, add day-of-week to beginning
        }
        return format;
    },
    // Produces format strings like "h:mma" -> "6:00pm"
    mediumTimeFormat: function (momOptions) {
        return momOptions.longDateFormat('LT')
            .replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
    },
    // Produces format strings like "h(:mm)a" -> "6pm" / "6:30pm"
    smallTimeFormat: function (momOptions) {
        return momOptions.longDateFormat('LT')
            .replace(':mm', '(:mm)')
            .replace(/(\Wmm)$/, '($1)') // like above, but for foreign locales
            .replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
    },
    // Produces format strings like "h(:mm)t" -> "6p" / "6:30p"
    extraSmallTimeFormat: function (momOptions) {
        return momOptions.longDateFormat('LT')
            .replace(':mm', '(:mm)')
            .replace(/(\Wmm)$/, '($1)') // like above, but for foreign locales
            .replace(/\s*a$/i, 't'); // convert to AM/PM/am/pm to lowercase one-letter. remove any spaces beforehand
    },
    // Produces format strings like "ha" / "H" -> "6pm" / "18"
    hourFormat: function (momOptions) {
        return momOptions.longDateFormat('LT')
            .replace(':mm', '')
            .replace(/(\Wmm)$/, '') // like above, but for foreign locales
            .replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
    },
    // Produces format strings like "h:mm" -> "6:30" (with no AM/PM)
    noMeridiemTimeFormat: function (momOptions) {
        return momOptions.longDateFormat('LT')
            .replace(/\s*a$/i, ''); // remove trailing AM/PM
    }
};
// options that should be computed off live calendar options (considers override options)
// TODO: best place for this? related to locale?
// TODO: flipping text based on isRTL is a bad idea because the CSS `direction` might want to handle it
var instanceComputableOptions = {
    // Produces format strings for results like "Mo 16"
    smallDayDateFormat: function (options) {
        return options.isRTL ?
            'D dd' :
            'dd D';
    },
    // Produces format strings for results like "Wk 5"
    weekFormat: function (options) {
        return options.isRTL ?
            'w[ ' + options.weekNumberTitle + ']' :
            '[' + options.weekNumberTitle + ' ]w';
    },
    // Produces format strings for results like "Wk5"
    smallWeekFormat: function (options) {
        return options.isRTL ?
            'w[' + options.weekNumberTitle + ']' :
            '[' + options.weekNumberTitle + ']w';
    }
};
// TODO: make these computable properties in optionsManager
function populateInstanceComputableOptions(options) {
    $.each(instanceComputableOptions, function (name, func) {
        if (options[name] == null) {
            options[name] = func(options);
        }
    });
}
exports.populateInstanceComputableOptions = populateInstanceComputableOptions;
// Initialize jQuery UI datepicker translations while using some of the translations
// Will set this as the default locales for datepicker.
function datepickerLocale(localeCode, dpLocaleCode, dpOptions) {
    // get the FullCalendar internal option hash for this locale. create if necessary
    var fcOptions = exports.localeOptionHash[localeCode] || (exports.localeOptionHash[localeCode] = {});
    // transfer some simple options from datepicker to fc
    fcOptions.isRTL = dpOptions.isRTL;
    fcOptions.weekNumberTitle = dpOptions.weekHeader;
    // compute some more complex options from datepicker
    $.each(dpComputableOptions, function (name, func) {
        fcOptions[name] = func(dpOptions);
    });
    var jqDatePicker = $.datepicker;
    // is jQuery UI Datepicker is on the page?
    if (jqDatePicker) {
        // Register the locale data.
        // FullCalendar and MomentJS use locale codes like "pt-br" but Datepicker
        // does it like "pt-BR" or if it doesn't have the locale, maybe just "pt".
        // Make an alias so the locale can be referenced either way.
        jqDatePicker.regional[dpLocaleCode] =
            jqDatePicker.regional[localeCode] = // alias
                dpOptions;
        // Alias 'en' to the default locale data. Do this every time.
        jqDatePicker.regional.en = jqDatePicker.regional[''];
        // Set as Datepicker's global defaults.
        jqDatePicker.setDefaults(dpOptions);
    }
}
exports.datepickerLocale = datepickerLocale;
// Sets FullCalendar-specific translations. Will set the locales as the global default.
function locale(localeCode, newFcOptions) {
    var fcOptions;
    var momOptions;
    // get the FullCalendar internal option hash for this locale. create if necessary
    fcOptions = exports.localeOptionHash[localeCode] || (exports.localeOptionHash[localeCode] = {});
    // provided new options for this locales? merge them in
    if (newFcOptions) {
        fcOptions = exports.localeOptionHash[localeCode] = options_1.mergeOptions([fcOptions, newFcOptions]);
    }
    // compute locale options that weren't defined.
    // always do this. newFcOptions can be undefined when initializing from i18n file,
    // so no way to tell if this is an initialization or a default-setting.
    momOptions = getMomentLocaleData(localeCode); // will fall back to en
    $.each(momComputableOptions, function (name, func) {
        if (fcOptions[name] == null) {
            fcOptions[name] = (func)(momOptions, fcOptions);
        }
    });
    // set it as the default locale for FullCalendar
    options_1.globalDefaults.locale = localeCode;
}
exports.locale = locale;
// Returns moment's internal locale data. If doesn't exist, returns English.
function getMomentLocaleData(localeCode) {
    return moment.localeData(localeCode) || moment.localeData('en');
}
exports.getMomentLocaleData = getMomentLocaleData;
// Initialize English by forcing computation of moment-derived options.
// Also, sets it as the default.
locale('en', options_1.englishDefaults);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(4);
exports.globalDefaults = {
    titleRangeSeparator: ' \u2013 ',
    monthYearFormat: 'MMMM YYYY',
    defaultTimedEventDuration: '02:00:00',
    defaultAllDayEventDuration: { days: 1 },
    forceEventDuration: false,
    nextDayThreshold: '09:00:00',
    // display
    columnHeader: true,
    defaultView: 'month',
    aspectRatio: 1.35,
    header: {
        left: 'title',
        center: '',
        right: 'today prev,next'
    },
    weekends: true,
    weekNumbers: false,
    weekNumberTitle: 'W',
    weekNumberCalculation: 'local',
    // editable: false,
    // nowIndicator: false,
    scrollTime: '06:00:00',
    minTime: '00:00:00',
    maxTime: '24:00:00',
    showNonCurrentDates: true,
    // event ajax
    lazyFetching: true,
    startParam: 'start',
    endParam: 'end',
    timezoneParam: 'timezone',
    timezone: false,
    // allDayDefault: undefined,
    // locale
    locale: null,
    isRTL: false,
    buttonText: {
        prev: 'prev',
        next: 'next',
        prevYear: 'prev year',
        nextYear: 'next year',
        year: 'year',
        today: 'today',
        month: 'month',
        week: 'week',
        day: 'day'
    },
    // buttonIcons: null,
    allDayText: 'all-day',
    // allows setting a min-height to the event segment to prevent short events overlapping each other
    agendaEventMinHeight: 0,
    // jquery-ui theming
    theme: false,
    // themeButtonIcons: null,
    // eventResizableFromStart: false,
    dragOpacity: .75,
    dragRevertDuration: 500,
    dragScroll: true,
    // selectable: false,
    unselectAuto: true,
    // selectMinDistance: 0,
    dropAccept: '*',
    eventOrder: 'title',
    // eventRenderWait: null,
    eventLimit: false,
    eventLimitText: 'more',
    eventLimitClick: 'popover',
    dayPopoverFormat: 'LL',
    handleWindowResize: true,
    windowResizeDelay: 100,
    longPressDelay: 1000
};
exports.englishDefaults = {
    dayPopoverFormat: 'dddd, MMMM D'
};
exports.rtlDefaults = {
    header: {
        left: 'next,prev today',
        center: '',
        right: 'title'
    },
    buttonIcons: {
        prev: 'right-single-arrow',
        next: 'left-single-arrow',
        prevYear: 'right-double-arrow',
        nextYear: 'left-double-arrow'
    },
    themeButtonIcons: {
        prev: 'circle-triangle-e',
        next: 'circle-triangle-w',
        nextYear: 'seek-prev',
        prevYear: 'seek-next'
    }
};
var complexOptions = [
    'header',
    'footer',
    'buttonText',
    'buttonIcons',
    'themeButtonIcons'
];
// Merges an array of option objects into a single object
function mergeOptions(optionObjs) {
    return util_1.mergeProps(optionObjs, complexOptions);
}
exports.mergeOptions = mergeOptions;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
// Class that all other classes will inherit from
var Class = /** @class */ (function () {
    function Class() {
    }
    // Called on a class to create a subclass.
    // LIMITATION: cannot provide a constructor!
    Class.extend = function (members) {
        var SubClass = /** @class */ (function (_super) {
            tslib_1.__extends(SubClass, _super);
            function SubClass() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SubClass;
        }(this));
        util_1.copyOwnProps(members, SubClass.prototype);
        return SubClass;
    };
    // Adds new member variables/methods to the class's prototype.
    // Can be called with another class, or a plain object hash containing new members.
    Class.mixin = function (members) {
        util_1.copyOwnProps(members, this.prototype);
    };
    return Class;
}());
exports.default = Class;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var ParsableModelMixin_1 = __webpack_require__(208);
var EventDef = /** @class */ (function () {
    function EventDef(source) {
        this.source = source;
        this.className = [];
        this.miscProps = {};
    }
    EventDef.parse = function (rawInput, source) {
        var def = new this(source);
        if (def.applyProps(rawInput)) {
            return def;
        }
        return false;
    };
    EventDef.normalizeId = function (id) {
        return String(id);
    };
    EventDef.generateId = function () {
        return '_fc' + (EventDef.uuid++);
    };
    EventDef.prototype.clone = function () {
        var copy = new this.constructor(this.source);
        copy.id = this.id;
        copy.rawId = this.rawId;
        copy.uid = this.uid; // not really unique anymore :(
        EventDef.copyVerbatimStandardProps(this, copy);
        copy.className = this.className.slice(); // copy
        copy.miscProps = $.extend({}, this.miscProps);
        return copy;
    };
    EventDef.prototype.hasInverseRendering = function () {
        return this.getRendering() === 'inverse-background';
    };
    EventDef.prototype.hasBgRendering = function () {
        var rendering = this.getRendering();
        return rendering === 'inverse-background' || rendering === 'background';
    };
    EventDef.prototype.getRendering = function () {
        if (this.rendering != null) {
            return this.rendering;
        }
        return this.source.rendering;
    };
    EventDef.prototype.getConstraint = function () {
        if (this.constraint != null) {
            return this.constraint;
        }
        if (this.source.constraint != null) {
            return this.source.constraint;
        }
        return this.source.calendar.opt('eventConstraint'); // what about View option?
    };
    EventDef.prototype.getOverlap = function () {
        if (this.overlap != null) {
            return this.overlap;
        }
        if (this.source.overlap != null) {
            return this.source.overlap;
        }
        return this.source.calendar.opt('eventOverlap'); // what about View option?
    };
    EventDef.prototype.isStartExplicitlyEditable = function () {
        if (this.startEditable != null) {
            return this.startEditable;
        }
        return this.source.startEditable;
    };
    EventDef.prototype.isDurationExplicitlyEditable = function () {
        if (this.durationEditable != null) {
            return this.durationEditable;
        }
        return this.source.durationEditable;
    };
    EventDef.prototype.isExplicitlyEditable = function () {
        if (this.editable != null) {
            return this.editable;
        }
        return this.source.editable;
    };
    EventDef.prototype.toLegacy = function () {
        var obj = $.extend({}, this.miscProps);
        obj._id = this.uid;
        obj.source = this.source;
        obj.className = this.className.slice(); // copy
        obj.allDay = this.isAllDay();
        if (this.rawId != null) {
            obj.id = this.rawId;
        }
        EventDef.copyVerbatimStandardProps(this, obj);
        return obj;
    };
    EventDef.prototype.applyManualStandardProps = function (rawProps) {
        if (rawProps.id != null) {
            this.id = EventDef.normalizeId((this.rawId = rawProps.id));
        }
        else {
            this.id = EventDef.generateId();
        }
        if (rawProps._id != null) {
            this.uid = String(rawProps._id);
        }
        else {
            this.uid = EventDef.generateId();
        }
        // TODO: converge with EventSource
        if ($.isArray(rawProps.className)) {
            this.className = rawProps.className;
        }
        if (typeof rawProps.className === 'string') {
            this.className = rawProps.className.split(/\s+/);
        }
        return true;
    };
    EventDef.prototype.applyMiscProps = function (rawProps) {
        $.extend(this.miscProps, rawProps);
    };
    EventDef.uuid = 0;
    EventDef.defineStandardProps = ParsableModelMixin_1.default.defineStandardProps;
    EventDef.copyVerbatimStandardProps = ParsableModelMixin_1.default.copyVerbatimStandardProps;
    return EventDef;
}());
exports.default = EventDef;
ParsableModelMixin_1.default.mixInto(EventDef);
EventDef.defineStandardProps({
    // not automatically assigned (`false`)
    _id: false,
    id: false,
    className: false,
    source: false,
    // automatically assigned (`true`)
    title: true,
    url: true,
    rendering: true,
    constraint: true,
    overlap: true,
    editable: true,
    startEditable: true,
    durationEditable: true,
    color: true,
    backgroundColor: true,
    borderColor: true,
    textColor: true
});


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var EventRange_1 = __webpack_require__(211);
var EventFootprint_1 = __webpack_require__(36);
var ComponentFootprint_1 = __webpack_require__(12);
function eventDefsToEventInstances(eventDefs, unzonedRange) {
    var eventInstances = [];
    var i;
    for (i = 0; i < eventDefs.length; i++) {
        eventInstances.push.apply(eventInstances, // append
        eventDefs[i].buildInstances(unzonedRange));
    }
    return eventInstances;
}
exports.eventDefsToEventInstances = eventDefsToEventInstances;
function eventInstanceToEventRange(eventInstance) {
    return new EventRange_1.default(eventInstance.dateProfile.unzonedRange, eventInstance.def, eventInstance);
}
exports.eventInstanceToEventRange = eventInstanceToEventRange;
function eventRangeToEventFootprint(eventRange) {
    return new EventFootprint_1.default(new ComponentFootprint_1.default(eventRange.unzonedRange, eventRange.eventDef.isAllDay()), eventRange.eventDef, eventRange.eventInstance // might not exist
    );
}
exports.eventRangeToEventFootprint = eventRangeToEventFootprint;
function eventInstanceToUnzonedRange(eventInstance) {
    return eventInstance.dateProfile.unzonedRange;
}
exports.eventInstanceToUnzonedRange = eventInstanceToUnzonedRange;
function eventFootprintToComponentFootprint(eventFootprint) {
    return eventFootprint.componentFootprint;
}
exports.eventFootprintToComponentFootprint = eventFootprintToComponentFootprint;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var EventFootprint = /** @class */ (function () {
    function EventFootprint(componentFootprint, eventDef, eventInstance) {
        this.componentFootprint = componentFootprint;
        this.eventDef = eventDef;
        if (eventInstance) {
            this.eventInstance = eventInstance;
        }
    }
    EventFootprint.prototype.getEventLegacy = function () {
        return (this.eventInstance || this.eventDef).toLegacy();
    };
    return EventFootprint;
}());
exports.default = EventFootprint;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(4);
var EventDateProfile_1 = __webpack_require__(17);
var EventDef_1 = __webpack_require__(34);
var EventDefDateMutation_1 = __webpack_require__(50);
var SingleEventDef_1 = __webpack_require__(13);
var EventDefMutation = /** @class */ (function () {
    function EventDefMutation() {
    }
    EventDefMutation.createFromRawProps = function (eventInstance, rawProps, largeUnit) {
        var eventDef = eventInstance.def;
        var dateProps = {};
        var standardProps = {};
        var miscProps = {};
        var verbatimStandardProps = {};
        var eventDefId = null;
        var className = null;
        var propName;
        var dateProfile;
        var dateMutation;
        var defMutation;
        for (propName in rawProps) {
            if (EventDateProfile_1.default.isStandardProp(propName)) {
                dateProps[propName] = rawProps[propName];
            }
            else if (eventDef.isStandardProp(propName)) {
                standardProps[propName] = rawProps[propName];
            }
            else if (eventDef.miscProps[propName] !== rawProps[propName]) {
                miscProps[propName] = rawProps[propName];
            }
        }
        dateProfile = EventDateProfile_1.default.parse(dateProps, eventDef.source);
        if (dateProfile) {
            dateMutation = EventDefDateMutation_1.default.createFromDiff(eventInstance.dateProfile, dateProfile, largeUnit);
        }
        if (standardProps.id !== eventDef.id) {
            eventDefId = standardProps.id; // only apply if there's a change
        }
        if (!util_1.isArraysEqual(standardProps.className, eventDef.className)) {
            className = standardProps.className; // only apply if there's a change
        }
        EventDef_1.default.copyVerbatimStandardProps(standardProps, // src
        verbatimStandardProps // dest
        );
        defMutation = new EventDefMutation();
        defMutation.eventDefId = eventDefId;
        defMutation.className = className;
        defMutation.verbatimStandardProps = verbatimStandardProps;
        defMutation.miscProps = miscProps;
        if (dateMutation) {
            defMutation.dateMutation = dateMutation;
        }
        return defMutation;
    };
    /*
    eventDef assumed to be a SingleEventDef.
    returns an undo function.
    */
    EventDefMutation.prototype.mutateSingle = function (eventDef) {
        var origDateProfile;
        if (this.dateMutation) {
            origDateProfile = eventDef.dateProfile;
            eventDef.dateProfile = this.dateMutation.buildNewDateProfile(origDateProfile, eventDef.source.calendar);
        }
        // can't undo
        // TODO: more DRY with EventDef::applyManualStandardProps
        if (this.eventDefId != null) {
            eventDef.id = EventDef_1.default.normalizeId((eventDef.rawId = this.eventDefId));
        }
        // can't undo
        // TODO: more DRY with EventDef::applyManualStandardProps
        if (this.className) {
            eventDef.className = this.className;
        }
        // can't undo
        if (this.verbatimStandardProps) {
            SingleEventDef_1.default.copyVerbatimStandardProps(this.verbatimStandardProps, // src
            eventDef // dest
            );
        }
        // can't undo
        if (this.miscProps) {
            eventDef.applyMiscProps(this.miscProps);
        }
        if (origDateProfile) {
            return function () {
                eventDef.dateProfile = origDateProfile;
            };
        }
        else {
            return function () { };
        }
    };
    EventDefMutation.prototype.setDateMutation = function (dateMutation) {
        if (dateMutation && !dateMutation.isEmpty()) {
            this.dateMutation = dateMutation;
        }
        else {
            this.dateMutation = null;
        }
    };
    EventDefMutation.prototype.isEmpty = function () {
        return !this.dateMutation;
    };
    return EventDefMutation;
}());
exports.default = EventDefMutation;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    sourceClasses: [],
    registerClass: function (EventSourceClass) {
        this.sourceClasses.unshift(EventSourceClass); // give highest priority
    },
    parse: function (rawInput, calendar) {
        var sourceClasses = this.sourceClasses;
        var i;
        var eventSource;
        for (i = 0; i < sourceClasses.length; i++) {
            eventSource = sourceClasses[i].parse(rawInput, calendar);
            if (eventSource) {
                return eventSource;
            }
        }
    }
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var Class_1 = __webpack_require__(33);
/*
Embodies a div that has potential scrollbars
*/
var Scroller = /** @class */ (function (_super) {
    tslib_1.__extends(Scroller, _super);
    function Scroller(options) {
        var _this = _super.call(this) || this;
        options = options || {};
        _this.overflowX = options.overflowX || options.overflow || 'auto';
        _this.overflowY = options.overflowY || options.overflow || 'auto';
        return _this;
    }
    Scroller.prototype.render = function () {
        this.el = this.renderEl();
        this.applyOverflow();
    };
    Scroller.prototype.renderEl = function () {
        return (this.scrollEl = $('<div class="fc-scroller"></div>'));
    };
    // sets to natural height, unlocks overflow
    Scroller.prototype.clear = function () {
        this.setHeight('auto');
        this.applyOverflow();
    };
    Scroller.prototype.destroy = function () {
        this.el.remove();
    };
    // Overflow
    // -----------------------------------------------------------------------------------------------------------------
    Scroller.prototype.applyOverflow = function () {
        this.scrollEl.css({
            'overflow-x': this.overflowX,
            'overflow-y': this.overflowY
        });
    };
    // Causes any 'auto' overflow values to resolves to 'scroll' or 'hidden'.
    // Useful for preserving scrollbar widths regardless of future resizes.
    // Can pass in scrollbarWidths for optimization.
    Scroller.prototype.lockOverflow = function (scrollbarWidths) {
        var overflowX = this.overflowX;
        var overflowY = this.overflowY;
        scrollbarWidths = scrollbarWidths || this.getScrollbarWidths();
        if (overflowX === 'auto') {
            overflowX = (scrollbarWidths.top || scrollbarWidths.bottom || // horizontal scrollbars?
                // OR scrolling pane with massless scrollbars?
                this.scrollEl[0].scrollWidth - 1 > this.scrollEl[0].clientWidth) ? 'scroll' : 'hidden';
        }
        if (overflowY === 'auto') {
            overflowY = (scrollbarWidths.left || scrollbarWidths.right || // vertical scrollbars?
                // OR scrolling pane with massless scrollbars?
                this.scrollEl[0].scrollHeight - 1 > this.scrollEl[0].clientHeight) ? 'scroll' : 'hidden';
        }
        this.scrollEl.css({ 'overflow-x': overflowX, 'overflow-y': overflowY });
    };
    // Getters / Setters
    // -----------------------------------------------------------------------------------------------------------------
    Scroller.prototype.setHeight = function (height) {
        this.scrollEl.height(height);
    };
    Scroller.prototype.getScrollTop = function () {
        return this.scrollEl.scrollTop();
    };
    Scroller.prototype.setScrollTop = function (top) {
        this.scrollEl.scrollTop(top);
    };
    Scroller.prototype.getClientWidth = function () {
        return this.scrollEl[0].clientWidth;
    };
    Scroller.prototype.getClientHeight = function () {
        return this.scrollEl[0].clientHeight;
    };
    Scroller.prototype.getScrollbarWidths = function () {
        return util_1.getScrollbarWidths(this.scrollEl);
    };
    return Scroller;
}(Class_1.default));
exports.default = Scroller;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var DateComponent_1 = __webpack_require__(219);
var GlobalEmitter_1 = __webpack_require__(21);
var InteractiveDateComponent = /** @class */ (function (_super) {
    tslib_1.__extends(InteractiveDateComponent, _super);
    function InteractiveDateComponent(_view, _options) {
        var _this = _super.call(this, _view, _options) || this;
        // self-config, overridable by subclasses
        _this.segSelector = '.fc-event-container > *'; // what constitutes an event element?
        if (_this.dateSelectingClass) {
            _this.dateClicking = new _this.dateClickingClass(_this);
        }
        if (_this.dateSelectingClass) {
            _this.dateSelecting = new _this.dateSelectingClass(_this);
        }
        if (_this.eventPointingClass) {
            _this.eventPointing = new _this.eventPointingClass(_this);
        }
        if (_this.eventDraggingClass && _this.eventPointing) {
            _this.eventDragging = new _this.eventDraggingClass(_this, _this.eventPointing);
        }
        if (_this.eventResizingClass && _this.eventPointing) {
            _this.eventResizing = new _this.eventResizingClass(_this, _this.eventPointing);
        }
        if (_this.externalDroppingClass) {
            _this.externalDropping = new _this.externalDroppingClass(_this);
        }
        return _this;
    }
    // Sets the container element that the view should render inside of, does global DOM-related initializations,
    // and renders all the non-date-related content inside.
    InteractiveDateComponent.prototype.setElement = function (el) {
        _super.prototype.setElement.call(this, el);
        if (this.dateClicking) {
            this.dateClicking.bindToEl(el);
        }
        if (this.dateSelecting) {
            this.dateSelecting.bindToEl(el);
        }
        this.bindAllSegHandlersToEl(el);
    };
    InteractiveDateComponent.prototype.removeElement = function () {
        this.endInteractions();
        _super.prototype.removeElement.call(this);
    };
    InteractiveDateComponent.prototype.executeEventUnrender = function () {
        this.endInteractions();
        _super.prototype.executeEventUnrender.call(this);
    };
    InteractiveDateComponent.prototype.bindGlobalHandlers = function () {
        _super.prototype.bindGlobalHandlers.call(this);
        if (this.externalDropping) {
            this.externalDropping.bindToDocument();
        }
    };
    InteractiveDateComponent.prototype.unbindGlobalHandlers = function () {
        _super.prototype.unbindGlobalHandlers.call(this);
        if (this.externalDropping) {
            this.externalDropping.unbindFromDocument();
        }
    };
    InteractiveDateComponent.prototype.bindDateHandlerToEl = function (el, name, handler) {
        var _this = this;
        // attach a handler to the grid's root element.
        // jQuery will take care of unregistering them when removeElement gets called.
        this.el.on(name, function (ev) {
            if (!$(ev.target).is(_this.segSelector + ':not(.fc-helper),' + // directly on an event element
                _this.segSelector + ':not(.fc-helper) *,' + // within an event element
                '.fc-more,' + // a "more.." link
                'a[data-goto]' // a clickable nav link
            )) {
                return handler.call(_this, ev);
            }
        });
    };
    InteractiveDateComponent.prototype.bindAllSegHandlersToEl = function (el) {
        [
            this.eventPointing,
            this.eventDragging,
            this.eventResizing
        ].forEach(function (eventInteraction) {
            if (eventInteraction) {
                eventInteraction.bindToEl(el);
            }
        });
    };
    InteractiveDateComponent.prototype.bindSegHandlerToEl = function (el, name, handler) {
        var _this = this;
        el.on(name, this.segSelector, function (ev) {
            var segEl = $(ev.currentTarget);
            if (!segEl.is('.fc-helper')) {
                var seg = segEl.data('fc-seg'); // grab segment data. put there by View::renderEventsPayload
                if (seg && !_this.shouldIgnoreEventPointing()) {
                    return handler.call(_this, seg, ev); // context will be the Grid
                }
            }
        });
    };
    InteractiveDateComponent.prototype.shouldIgnoreMouse = function () {
        // HACK
        // This will still work even though bindDateHandlerToEl doesn't use GlobalEmitter.
        return GlobalEmitter_1.default.get().shouldIgnoreMouse();
    };
    InteractiveDateComponent.prototype.shouldIgnoreTouch = function () {
        var view = this._getView();
        // On iOS (and Android?) when a new selection is initiated overtop another selection,
        // the touchend never fires because the elements gets removed mid-touch-interaction (my theory).
        // HACK: simply don't allow this to happen.
        // ALSO: prevent selection when an *event* is already raised.
        return view.isSelected || view.selectedEvent;
    };
    InteractiveDateComponent.prototype.shouldIgnoreEventPointing = function () {
        // only call the handlers if there is not a drag/resize in progress
        return (this.eventDragging && this.eventDragging.isDragging) ||
            (this.eventResizing && this.eventResizing.isResizing);
    };
    InteractiveDateComponent.prototype.canStartSelection = function (seg, ev) {
        return util_1.getEvIsTouch(ev) &&
            !this.canStartResize(seg, ev) &&
            (this.isEventDefDraggable(seg.footprint.eventDef) ||
                this.isEventDefResizable(seg.footprint.eventDef));
    };
    InteractiveDateComponent.prototype.canStartDrag = function (seg, ev) {
        return !this.canStartResize(seg, ev) &&
            this.isEventDefDraggable(seg.footprint.eventDef);
    };
    InteractiveDateComponent.prototype.canStartResize = function (seg, ev) {
        var view = this._getView();
        var eventDef = seg.footprint.eventDef;
        return (!util_1.getEvIsTouch(ev) || view.isEventDefSelected(eventDef)) &&
            this.isEventDefResizable(eventDef) &&
            $(ev.target).is('.fc-resizer');
    };
    // Kills all in-progress dragging.
    // Useful for when public API methods that result in re-rendering are invoked during a drag.
    // Also useful for when touch devices misbehave and don't fire their touchend.
    InteractiveDateComponent.prototype.endInteractions = function () {
        [
            this.dateClicking,
            this.dateSelecting,
            this.eventPointing,
            this.eventDragging,
            this.eventResizing
        ].forEach(function (interaction) {
            if (interaction) {
                interaction.end();
            }
        });
    };
    // Event Drag-n-Drop
    // ---------------------------------------------------------------------------------------------------------------
    // Computes if the given event is allowed to be dragged by the user
    InteractiveDateComponent.prototype.isEventDefDraggable = function (eventDef) {
        return this.isEventDefStartEditable(eventDef);
    };
    InteractiveDateComponent.prototype.isEventDefStartEditable = function (eventDef) {
        var isEditable = eventDef.isStartExplicitlyEditable();
        if (isEditable == null) {
            isEditable = this.opt('eventStartEditable');
            if (isEditable == null) {
                isEditable = this.isEventDefGenerallyEditable(eventDef);
            }
        }
        return isEditable;
    };
    InteractiveDateComponent.prototype.isEventDefGenerallyEditable = function (eventDef) {
        var isEditable = eventDef.isExplicitlyEditable();
        if (isEditable == null) {
            isEditable = this.opt('editable');
        }
        return isEditable;
    };
    // Event Resizing
    // ---------------------------------------------------------------------------------------------------------------
    // Computes if the given event is allowed to be resized from its starting edge
    InteractiveDateComponent.prototype.isEventDefResizableFromStart = function (eventDef) {
        return this.opt('eventResizableFromStart') && this.isEventDefResizable(eventDef);
    };
    // Computes if the given event is allowed to be resized from its ending edge
    InteractiveDateComponent.prototype.isEventDefResizableFromEnd = function (eventDef) {
        return this.isEventDefResizable(eventDef);
    };
    // Computes if the given event is allowed to be resized by the user at all
    InteractiveDateComponent.prototype.isEventDefResizable = function (eventDef) {
        var isResizable = eventDef.isDurationExplicitlyEditable();
        if (isResizable == null) {
            isResizable = this.opt('eventDurationEditable');
            if (isResizable == null) {
                isResizable = this.isEventDefGenerallyEditable(eventDef);
            }
        }
        return isResizable;
    };
    // Event Mutation / Constraints
    // ---------------------------------------------------------------------------------------------------------------
    // Diffs the two dates, returning a duration, based on granularity of the grid
    // TODO: port isTimeScale into this system?
    InteractiveDateComponent.prototype.diffDates = function (a, b) {
        if (this.largeUnit) {
            return util_1.diffByUnit(a, b, this.largeUnit);
        }
        else {
            return util_1.diffDayTime(a, b);
        }
    };
    // is it allowed, in relation to the view's validRange?
    // NOTE: very similar to isExternalInstanceGroupAllowed
    InteractiveDateComponent.prototype.isEventInstanceGroupAllowed = function (eventInstanceGroup) {
        var view = this._getView();
        var dateProfile = this.dateProfile;
        var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
        var i;
        for (i = 0; i < eventFootprints.length; i++) {
            // TODO: just use getAllEventRanges directly
            if (!dateProfile.validUnzonedRange.containsRange(eventFootprints[i].componentFootprint.unzonedRange)) {
                return false;
            }
        }
        return view.calendar.constraints.isEventInstanceGroupAllowed(eventInstanceGroup);
    };
    // NOTE: very similar to isEventInstanceGroupAllowed
    // when it's a completely anonymous external drag, no event.
    InteractiveDateComponent.prototype.isExternalInstanceGroupAllowed = function (eventInstanceGroup) {
        var view = this._getView();
        var dateProfile = this.dateProfile;
        var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
        var i;
        for (i = 0; i < eventFootprints.length; i++) {
            if (!dateProfile.validUnzonedRange.containsRange(eventFootprints[i].componentFootprint.unzonedRange)) {
                return false;
            }
        }
        for (i = 0; i < eventFootprints.length; i++) {
            // treat it as a selection
            // TODO: pass in eventInstanceGroup instead
            //  because we don't want calendar's constraint system to depend on a component's
            //  determination of footprints.
            if (!view.calendar.constraints.isSelectionFootprintAllowed(eventFootprints[i].componentFootprint)) {
                return false;
            }
        }
        return true;
    };
    return InteractiveDateComponent;
}(DateComponent_1.default));
exports.default = InteractiveDateComponent;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var util_1 = __webpack_require__(4);
var RenderQueue_1 = __webpack_require__(218);
var DateProfileGenerator_1 = __webpack_require__(221);
var InteractiveDateComponent_1 = __webpack_require__(40);
var GlobalEmitter_1 = __webpack_require__(21);
var UnzonedRange_1 = __webpack_require__(5);
/* An abstract class from which other views inherit from
----------------------------------------------------------------------------------------------------------------------*/
var View = /** @class */ (function (_super) {
    tslib_1.__extends(View, _super);
    function View(calendar, viewSpec) {
        var _this = _super.call(this, null, viewSpec.options) || this;
        _this.batchRenderDepth = 0;
        _this.isSelected = false; // boolean whether a range of time is user-selected or not
        _this.calendar = calendar;
        _this.viewSpec = viewSpec;
        // shortcuts
        _this.type = viewSpec.type;
        // .name is deprecated
        _this.name = _this.type;
        _this.initRenderQueue();
        _this.initHiddenDays();
        _this.dateProfileGenerator = new _this.dateProfileGeneratorClass(_this);
        _this.bindBaseRenderHandlers();
        _this.eventOrderSpecs = util_1.parseFieldSpecs(_this.opt('eventOrder'));
        // legacy
        if (_this['initialize']) {
            _this['initialize']();
        }
        return _this;
    }
    View.prototype._getView = function () {
        return this;
    };
    // Retrieves an option with the given name
    View.prototype.opt = function (name) {
        return this.options[name];
    };
    /* Render Queue
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.initRenderQueue = function () {
        this.renderQueue = new RenderQueue_1.default({
            event: this.opt('eventRenderWait')
        });
        this.renderQueue.on('start', this.onRenderQueueStart.bind(this));
        this.renderQueue.on('stop', this.onRenderQueueStop.bind(this));
        this.on('before:change', this.startBatchRender);
        this.on('change', this.stopBatchRender);
    };
    View.prototype.onRenderQueueStart = function () {
        this.calendar.freezeContentHeight();
        this.addScroll(this.queryScroll());
    };
    View.prototype.onRenderQueueStop = function () {
        if (this.calendar.updateViewSize()) {
            this.popScroll();
        }
        this.calendar.thawContentHeight();
    };
    View.prototype.startBatchRender = function () {
        if (!(this.batchRenderDepth++)) {
            this.renderQueue.pause();
        }
    };
    View.prototype.stopBatchRender = function () {
        if (!(--this.batchRenderDepth)) {
            this.renderQueue.resume();
        }
    };
    View.prototype.requestRender = function (func, namespace, actionType) {
        this.renderQueue.queue(func, namespace, actionType);
    };
    // given func will auto-bind to `this`
    View.prototype.whenSizeUpdated = function (func) {
        if (this.renderQueue.isRunning) {
            this.renderQueue.one('stop', func.bind(this));
        }
        else {
            func.call(this);
        }
    };
    /* Title and Date Formatting
    ------------------------------------------------------------------------------------------------------------------*/
    // Computes what the title at the top of the calendar should be for this view
    View.prototype.computeTitle = function (dateProfile) {
        var unzonedRange;
        // for views that span a large unit of time, show the proper interval, ignoring stray days before and after
        if (/^(year|month)$/.test(dateProfile.currentRangeUnit)) {
            unzonedRange = dateProfile.currentUnzonedRange;
        }
        else {
            unzonedRange = dateProfile.activeUnzonedRange;
        }
        return this.formatRange({
            start: this.calendar.msToMoment(unzonedRange.startMs, dateProfile.isRangeAllDay),
            end: this.calendar.msToMoment(unzonedRange.endMs, dateProfile.isRangeAllDay)
        }, dateProfile.isRangeAllDay, this.opt('titleFormat') || this.computeTitleFormat(dateProfile), this.opt('titleRangeSeparator'));
    };
    // Generates the format string that should be used to generate the title for the current date range.
    // Attempts to compute the most appropriate format if not explicitly specified with `titleFormat`.
    View.prototype.computeTitleFormat = function (dateProfile) {
        var currentRangeUnit = dateProfile.currentRangeUnit;
        if (currentRangeUnit === 'year') {
            return 'YYYY';
        }
        else if (currentRangeUnit === 'month') {
            return this.opt('monthYearFormat'); // like "September 2014"
        }
        else if (dateProfile.currentUnzonedRange.as('days') > 1) {
            return 'll'; // multi-day range. shorter, like "Sep 9 - 10 2014"
        }
        else {
            return 'LL'; // one day. longer, like "September 9 2014"
        }
    };
    // Date Setting/Unsetting
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.setDate = function (date) {
        var currentDateProfile = this.get('dateProfile');
        var newDateProfile = this.dateProfileGenerator.build(date, undefined, true); // forceToValid=true
        if (!currentDateProfile ||
            !currentDateProfile.activeUnzonedRange.equals(newDateProfile.activeUnzonedRange)) {
            this.set('dateProfile', newDateProfile);
        }
    };
    View.prototype.unsetDate = function () {
        this.unset('dateProfile');
    };
    // Event Data
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.fetchInitialEvents = function (dateProfile) {
        var calendar = this.calendar;
        var forceAllDay = dateProfile.isRangeAllDay && !this.usesMinMaxTime;
        return calendar.requestEvents(calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, forceAllDay), calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, forceAllDay));
    };
    View.prototype.bindEventChanges = function () {
        this.listenTo(this.calendar, 'eventsReset', this.resetEvents); // TODO: make this a real event
    };
    View.prototype.unbindEventChanges = function () {
        this.stopListeningTo(this.calendar, 'eventsReset');
    };
    View.prototype.setEvents = function (eventsPayload) {
        this.set('currentEvents', eventsPayload);
        this.set('hasEvents', true);
    };
    View.prototype.unsetEvents = function () {
        this.unset('currentEvents');
        this.unset('hasEvents');
    };
    View.prototype.resetEvents = function (eventsPayload) {
        this.startBatchRender();
        this.unsetEvents();
        this.setEvents(eventsPayload);
        this.stopBatchRender();
    };
    // Date High-level Rendering
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.requestDateRender = function (dateProfile) {
        var _this = this;
        this.requestRender(function () {
            _this.executeDateRender(dateProfile);
        }, 'date', 'init');
    };
    View.prototype.requestDateUnrender = function () {
        var _this = this;
        this.requestRender(function () {
            _this.executeDateUnrender();
        }, 'date', 'destroy');
    };
    // if dateProfile not specified, uses current
    View.prototype.executeDateRender = function (dateProfile) {
        _super.prototype.executeDateRender.call(this, dateProfile);
        if (this['render']) {
            this['render'](); // TODO: deprecate
        }
        this.trigger('datesRendered');
        this.addScroll({ isDateInit: true });
        this.startNowIndicator(); // shouldn't render yet because updateSize will be called soon
    };
    View.prototype.executeDateUnrender = function () {
        this.unselect();
        this.stopNowIndicator();
        this.trigger('before:datesUnrendered');
        if (this['destroy']) {
            this['destroy'](); // TODO: deprecate
        }
        _super.prototype.executeDateUnrender.call(this);
    };
    // "Base" rendering
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.bindBaseRenderHandlers = function () {
        var _this = this;
        this.on('datesRendered', function () {
            _this.whenSizeUpdated(_this.triggerViewRender);
        });
        this.on('before:datesUnrendered', function () {
            _this.triggerViewDestroy();
        });
    };
    View.prototype.triggerViewRender = function () {
        this.publiclyTrigger('viewRender', {
            context: this,
            args: [this, this.el]
        });
    };
    View.prototype.triggerViewDestroy = function () {
        this.publiclyTrigger('viewDestroy', {
            context: this,
            args: [this, this.el]
        });
    };
    // Event High-level Rendering
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.requestEventsRender = function (eventsPayload) {
        var _this = this;
        this.requestRender(function () {
            _this.executeEventRender(eventsPayload);
            _this.whenSizeUpdated(_this.triggerAfterEventsRendered);
        }, 'event', 'init');
    };
    View.prototype.requestEventsUnrender = function () {
        var _this = this;
        this.requestRender(function () {
            _this.triggerBeforeEventsDestroyed();
            _this.executeEventUnrender();
        }, 'event', 'destroy');
    };
    // Business Hour High-level Rendering
    // -----------------------------------------------------------------------------------------------------------------
    View.prototype.requestBusinessHoursRender = function (businessHourGenerator) {
        var _this = this;
        this.requestRender(function () {
            _this.renderBusinessHours(businessHourGenerator);
        }, 'businessHours', 'init');
    };
    View.prototype.requestBusinessHoursUnrender = function () {
        var _this = this;
        this.requestRender(function () {
            _this.unrenderBusinessHours();
        }, 'businessHours', 'destroy');
    };
    // Misc view rendering utils
    // -----------------------------------------------------------------------------------------------------------------
    // Binds DOM handlers to elements that reside outside the view container, such as the document
    View.prototype.bindGlobalHandlers = function () {
        _super.prototype.bindGlobalHandlers.call(this);
        this.listenTo(GlobalEmitter_1.default.get(), {
            touchstart: this.processUnselect,
            mousedown: this.handleDocumentMousedown
        });
    };
    // Unbinds DOM handlers from elements that reside outside the view container
    View.prototype.unbindGlobalHandlers = function () {
        _super.prototype.unbindGlobalHandlers.call(this);
        this.stopListeningTo(GlobalEmitter_1.default.get());
    };
    /* Now Indicator
    ------------------------------------------------------------------------------------------------------------------*/
    // Immediately render the current time indicator and begins re-rendering it at an interval,
    // which is defined by this.getNowIndicatorUnit().
    // TODO: somehow do this for the current whole day's background too
    View.prototype.startNowIndicator = function () {
        var _this = this;
        var unit;
        var update;
        var delay; // ms wait value
        if (this.opt('nowIndicator')) {
            unit = this.getNowIndicatorUnit();
            if (unit) {
                update = util_1.proxy(this, 'updateNowIndicator'); // bind to `this`
                this.initialNowDate = this.calendar.getNow();
                this.initialNowQueriedMs = new Date().valueOf();
                // wait until the beginning of the next interval
                delay = this.initialNowDate.clone().startOf(unit).add(1, unit).valueOf() - this.initialNowDate.valueOf();
                this.nowIndicatorTimeoutID = setTimeout(function () {
                    _this.nowIndicatorTimeoutID = null;
                    update();
                    delay = +moment.duration(1, unit);
                    delay = Math.max(100, delay); // prevent too frequent
                    _this.nowIndicatorIntervalID = setInterval(update, delay); // update every interval
                }, delay);
            }
            // rendering will be initiated in updateSize
        }
    };
    // rerenders the now indicator, computing the new current time from the amount of time that has passed
    // since the initial getNow call.
    View.prototype.updateNowIndicator = function () {
        if (this.isDatesRendered &&
            this.initialNowDate // activated before?
        ) {
            this.unrenderNowIndicator(); // won't unrender if unnecessary
            this.renderNowIndicator(this.initialNowDate.clone().add(new Date().valueOf() - this.initialNowQueriedMs) // add ms
            );
            this.isNowIndicatorRendered = true;
        }
    };
    // Immediately unrenders the view's current time indicator and stops any re-rendering timers.
    // Won't cause side effects if indicator isn't rendered.
    View.prototype.stopNowIndicator = function () {
        if (this.isNowIndicatorRendered) {
            if (this.nowIndicatorTimeoutID) {
                clearTimeout(this.nowIndicatorTimeoutID);
                this.nowIndicatorTimeoutID = null;
            }
            if (this.nowIndicatorIntervalID) {
                clearInterval(this.nowIndicatorIntervalID);
                this.nowIndicatorIntervalID = null;
            }
            this.unrenderNowIndicator();
            this.isNowIndicatorRendered = false;
        }
    };
    /* Dimensions
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.updateSize = function (totalHeight, isAuto, isResize) {
        if (this['setHeight']) {
            this['setHeight'](totalHeight, isAuto);
        }
        else {
            _super.prototype.updateSize.call(this, totalHeight, isAuto, isResize);
        }
        this.updateNowIndicator();
    };
    /* Scroller
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.addScroll = function (scroll) {
        var queuedScroll = this.queuedScroll || (this.queuedScroll = {});
        $.extend(queuedScroll, scroll);
    };
    View.prototype.popScroll = function () {
        this.applyQueuedScroll();
        this.queuedScroll = null;
    };
    View.prototype.applyQueuedScroll = function () {
        if (this.queuedScroll) {
            this.applyScroll(this.queuedScroll);
        }
    };
    View.prototype.queryScroll = function () {
        var scroll = {};
        if (this.isDatesRendered) {
            $.extend(scroll, this.queryDateScroll());
        }
        return scroll;
    };
    View.prototype.applyScroll = function (scroll) {
        if (scroll.isDateInit && this.isDatesRendered) {
            $.extend(scroll, this.computeInitialDateScroll());
        }
        if (this.isDatesRendered) {
            this.applyDateScroll(scroll);
        }
    };
    View.prototype.computeInitialDateScroll = function () {
        return {}; // subclasses must implement
    };
    View.prototype.queryDateScroll = function () {
        return {}; // subclasses must implement
    };
    View.prototype.applyDateScroll = function (scroll) {
        // subclasses must implement
    };
    /* Event Drag-n-Drop
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.reportEventDrop = function (eventInstance, eventMutation, el, ev) {
        var eventManager = this.calendar.eventManager;
        var undoFunc = eventManager.mutateEventsWithId(eventInstance.def.id, eventMutation);
        var dateMutation = eventMutation.dateMutation;
        // update the EventInstance, for handlers
        if (dateMutation) {
            eventInstance.dateProfile = dateMutation.buildNewDateProfile(eventInstance.dateProfile, this.calendar);
        }
        this.triggerEventDrop(eventInstance, 
        // a drop doesn't necessarily mean a date mutation (ex: resource change)
        (dateMutation && dateMutation.dateDelta) || moment.duration(), undoFunc, el, ev);
    };
    // Triggers event-drop handlers that have subscribed via the API
    View.prototype.triggerEventDrop = function (eventInstance, dateDelta, undoFunc, el, ev) {
        this.publiclyTrigger('eventDrop', {
            context: el[0],
            args: [
                eventInstance.toLegacy(),
                dateDelta,
                undoFunc,
                ev,
                {},
                this
            ]
        });
    };
    /* External Element Drag-n-Drop
    ------------------------------------------------------------------------------------------------------------------*/
    // Must be called when an external element, via jQuery UI, has been dropped onto the calendar.
    // `meta` is the parsed data that has been embedded into the dragging event.
    // `dropLocation` is an object that contains the new zoned start/end/allDay values for the event.
    View.prototype.reportExternalDrop = function (singleEventDef, isEvent, isSticky, el, ev, ui) {
        if (isEvent) {
            this.calendar.eventManager.addEventDef(singleEventDef, isSticky);
        }
        this.triggerExternalDrop(singleEventDef, isEvent, el, ev, ui);
    };
    // Triggers external-drop handlers that have subscribed via the API
    View.prototype.triggerExternalDrop = function (singleEventDef, isEvent, el, ev, ui) {
        // trigger 'drop' regardless of whether element represents an event
        this.publiclyTrigger('drop', {
            context: el[0],
            args: [
                singleEventDef.dateProfile.start.clone(),
                ev,
                ui,
                this
            ]
        });
        if (isEvent) {
            // signal an external event landed
            this.publiclyTrigger('eventReceive', {
                context: this,
                args: [
                    singleEventDef.buildInstance().toLegacy(),
                    this
                ]
            });
        }
    };
    /* Event Resizing
    ------------------------------------------------------------------------------------------------------------------*/
    // Must be called when an event in the view has been resized to a new length
    View.prototype.reportEventResize = function (eventInstance, eventMutation, el, ev) {
        var eventManager = this.calendar.eventManager;
        var undoFunc = eventManager.mutateEventsWithId(eventInstance.def.id, eventMutation);
        // update the EventInstance, for handlers
        eventInstance.dateProfile = eventMutation.dateMutation.buildNewDateProfile(eventInstance.dateProfile, this.calendar);
        this.triggerEventResize(eventInstance, eventMutation.dateMutation.endDelta, undoFunc, el, ev);
    };
    // Triggers event-resize handlers that have subscribed via the API
    View.prototype.triggerEventResize = function (eventInstance, durationDelta, undoFunc, el, ev) {
        this.publiclyTrigger('eventResize', {
            context: el[0],
            args: [
                eventInstance.toLegacy(),
                durationDelta,
                undoFunc,
                ev,
                {},
                this
            ]
        });
    };
    /* Selection (time range)
    ------------------------------------------------------------------------------------------------------------------*/
    // Selects a date span on the view. `start` and `end` are both Moments.
    // `ev` is the native mouse event that begin the interaction.
    View.prototype.select = function (footprint, ev) {
        this.unselect(ev);
        this.renderSelectionFootprint(footprint);
        this.reportSelection(footprint, ev);
    };
    View.prototype.renderSelectionFootprint = function (footprint) {
        if (this['renderSelection']) {
            this['renderSelection'](footprint.toLegacy(this.calendar));
        }
        else {
            _super.prototype.renderSelectionFootprint.call(this, footprint);
        }
    };
    // Called when a new selection is made. Updates internal state and triggers handlers.
    View.prototype.reportSelection = function (footprint, ev) {
        this.isSelected = true;
        this.triggerSelect(footprint, ev);
    };
    // Triggers handlers to 'select'
    View.prototype.triggerSelect = function (footprint, ev) {
        var dateProfile = this.calendar.footprintToDateProfile(footprint); // abuse of "Event"DateProfile?
        this.publiclyTrigger('select', {
            context: this,
            args: [
                dateProfile.start,
                dateProfile.end,
                ev,
                this
            ]
        });
    };
    // Undoes a selection. updates in the internal state and triggers handlers.
    // `ev` is the native mouse event that began the interaction.
    View.prototype.unselect = function (ev) {
        if (this.isSelected) {
            this.isSelected = false;
            if (this['destroySelection']) {
                this['destroySelection'](); // TODO: deprecate
            }
            this.unrenderSelection();
            this.publiclyTrigger('unselect', {
                context: this,
                args: [ev, this]
            });
        }
    };
    /* Event Selection
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.selectEventInstance = function (eventInstance) {
        if (!this.selectedEventInstance ||
            this.selectedEventInstance !== eventInstance) {
            this.unselectEventInstance();
            this.getEventSegs().forEach(function (seg) {
                if (seg.footprint.eventInstance === eventInstance &&
                    seg.el // necessary?
                ) {
                    seg.el.addClass('fc-selected');
                }
            });
            this.selectedEventInstance = eventInstance;
        }
    };
    View.prototype.unselectEventInstance = function () {
        if (this.selectedEventInstance) {
            this.getEventSegs().forEach(function (seg) {
                if (seg.el) {
                    seg.el.removeClass('fc-selected');
                }
            });
            this.selectedEventInstance = null;
        }
    };
    View.prototype.isEventDefSelected = function (eventDef) {
        // event references might change on refetchEvents(), while selectedEventInstance doesn't,
        // so compare IDs
        return this.selectedEventInstance && this.selectedEventInstance.def.id === eventDef.id;
    };
    /* Mouse / Touch Unselecting (time range & event unselection)
    ------------------------------------------------------------------------------------------------------------------*/
    // TODO: move consistently to down/start or up/end?
    // TODO: don't kill previous selection if touch scrolling
    View.prototype.handleDocumentMousedown = function (ev) {
        if (util_1.isPrimaryMouseButton(ev)) {
            this.processUnselect(ev);
        }
    };
    View.prototype.processUnselect = function (ev) {
        this.processRangeUnselect(ev);
        this.processEventUnselect(ev);
    };
    View.prototype.processRangeUnselect = function (ev) {
        var ignore;
        // is there a time-range selection?
        if (this.isSelected && this.opt('unselectAuto')) {
            // only unselect if the clicked element is not identical to or inside of an 'unselectCancel' element
            ignore = this.opt('unselectCancel');
            if (!ignore || !$(ev.target).closest(ignore).length) {
                this.unselect(ev);
            }
        }
    };
    View.prototype.processEventUnselect = function (ev) {
        if (this.selectedEventInstance) {
            if (!$(ev.target).closest('.fc-selected').length) {
                this.unselectEventInstance();
            }
        }
    };
    /* Triggers
    ------------------------------------------------------------------------------------------------------------------*/
    View.prototype.triggerBaseRendered = function () {
        this.publiclyTrigger('viewRender', {
            context: this,
            args: [this, this.el]
        });
    };
    View.prototype.triggerBaseUnrendered = function () {
        this.publiclyTrigger('viewDestroy', {
            context: this,
            args: [this, this.el]
        });
    };
    // Triggers handlers to 'dayClick'
    // Span has start/end of the clicked area. Only the start is useful.
    View.prototype.triggerDayClick = function (footprint, dayEl, ev) {
        var dateProfile = this.calendar.footprintToDateProfile(footprint); // abuse of "Event"DateProfile?
        this.publiclyTrigger('dayClick', {
            context: dayEl,
            args: [dateProfile.start, ev, this]
        });
    };
    /* Date Utils
    ------------------------------------------------------------------------------------------------------------------*/
    // For DateComponent::getDayClasses
    View.prototype.isDateInOtherMonth = function (date, dateProfile) {
        return false;
    };
    // Arguments after name will be forwarded to a hypothetical function value
    // WARNING: passed-in arguments will be given to generator functions as-is and can cause side-effects.
    // Always clone your objects if you fear mutation.
    View.prototype.getUnzonedRangeOption = function (name) {
        var val = this.opt(name);
        if (typeof val === 'function') {
            val = val.apply(null, Array.prototype.slice.call(arguments, 1));
        }
        if (val) {
            return this.calendar.parseUnzonedRange(val);
        }
    };
    /* Hidden Days
    ------------------------------------------------------------------------------------------------------------------*/
    // Initializes internal variables related to calculating hidden days-of-week
    View.prototype.initHiddenDays = function () {
        var hiddenDays = this.opt('hiddenDays') || []; // array of day-of-week indices that are hidden
        var isHiddenDayHash = []; // is the day-of-week hidden? (hash with day-of-week-index -> bool)
        var dayCnt = 0;
        var i;
        if (this.opt('weekends') === false) {
            hiddenDays.push(0, 6); // 0=sunday, 6=saturday
        }
        for (i = 0; i < 7; i++) {
            if (!(isHiddenDayHash[i] = $.inArray(i, hiddenDays) !== -1)) {
                dayCnt++;
            }
        }
        if (!dayCnt) {
            throw new Error('invalid hiddenDays'); // all days were hidden? bad.
        }
        this.isHiddenDayHash = isHiddenDayHash;
    };
    // Remove days from the beginning and end of the range that are computed as hidden.
    // If the whole range is trimmed off, returns null
    View.prototype.trimHiddenDays = function (inputUnzonedRange) {
        var start = inputUnzonedRange.getStart();
        var end = inputUnzonedRange.getEnd();
        if (start) {
            start = this.skipHiddenDays(start);
        }
        if (end) {
            end = this.skipHiddenDays(end, -1, true);
        }
        if (start === null || end === null || start < end) {
            return new UnzonedRange_1.default(start, end);
        }
        return null;
    };
    // Is the current day hidden?
    // `day` is a day-of-week index (0-6), or a Moment
    View.prototype.isHiddenDay = function (day) {
        if (moment.isMoment(day)) {
            day = day.day();
        }
        return this.isHiddenDayHash[day];
    };
    // Incrementing the current day until it is no longer a hidden day, returning a copy.
    // DOES NOT CONSIDER validUnzonedRange!
    // If the initial value of `date` is not a hidden day, don't do anything.
    // Pass `isExclusive` as `true` if you are dealing with an end date.
    // `inc` defaults to `1` (increment one day forward each time)
    View.prototype.skipHiddenDays = function (date, inc, isExclusive) {
        if (inc === void 0) { inc = 1; }
        if (isExclusive === void 0) { isExclusive = false; }
        var out = date.clone();
        while (this.isHiddenDayHash[(out.day() + (isExclusive ? inc : 0) + 7) % 7]) {
            out.add(inc, 'days');
        }
        return out;
    };
    return View;
}(InteractiveDateComponent_1.default));
exports.default = View;
View.prototype.usesMinMaxTime = false;
View.prototype.dateProfileGeneratorClass = DateProfileGenerator_1.default;
View.watch('displayingDates', ['isInDom', 'dateProfile'], function (deps) {
    this.requestDateRender(deps.dateProfile);
}, function () {
    this.requestDateUnrender();
});
View.watch('displayingBusinessHours', ['displayingDates', 'businessHourGenerator'], function (deps) {
    this.requestBusinessHoursRender(deps.businessHourGenerator);
}, function () {
    this.requestBusinessHoursUnrender();
});
View.watch('initialEvents', ['dateProfile'], function (deps) {
    return this.fetchInitialEvents(deps.dateProfile);
});
View.watch('bindingEvents', ['initialEvents'], function (deps) {
    this.setEvents(deps.initialEvents);
    this.bindEventChanges();
}, function () {
    this.unbindEventChanges();
    this.unsetEvents();
});
View.watch('displayingEvents', ['displayingDates', 'hasEvents'], function () {
    this.requestEventsRender(this.get('currentEvents'));
}, function () {
    this.requestEventsUnrender();
});
View.watch('title', ['dateProfile'], function (deps) {
    return (this.title = this.computeTitle(deps.dateProfile)); // assign to View for legacy reasons
});
View.watch('legacyDateProps', ['dateProfile'], function (deps) {
    var calendar = this.calendar;
    var dateProfile = deps.dateProfile;
    // DEPRECATED, but we need to keep it updated...
    this.start = calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, dateProfile.isRangeAllDay);
    this.end = calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, dateProfile.isRangeAllDay);
    this.intervalStart = calendar.msToMoment(dateProfile.currentUnzonedRange.startMs, dateProfile.isRangeAllDay);
    this.intervalEnd = calendar.msToMoment(dateProfile.currentUnzonedRange.endMs, dateProfile.isRangeAllDay);
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var EventRenderer = /** @class */ (function () {
    function EventRenderer(component, fillRenderer) {
        this.view = component._getView();
        this.component = component;
        this.fillRenderer = fillRenderer;
    }
    EventRenderer.prototype.opt = function (name) {
        return this.view.opt(name);
    };
    // Updates values that rely on options and also relate to range
    EventRenderer.prototype.rangeUpdated = function () {
        var displayEventTime;
        var displayEventEnd;
        this.eventTimeFormat =
            this.opt('eventTimeFormat') ||
                this.opt('timeFormat') || // deprecated
                this.computeEventTimeFormat();
        displayEventTime = this.opt('displayEventTime');
        if (displayEventTime == null) {
            displayEventTime = this.computeDisplayEventTime(); // might be based off of range
        }
        displayEventEnd = this.opt('displayEventEnd');
        if (displayEventEnd == null) {
            displayEventEnd = this.computeDisplayEventEnd(); // might be based off of range
        }
        this.displayEventTime = displayEventTime;
        this.displayEventEnd = displayEventEnd;
    };
    EventRenderer.prototype.render = function (eventsPayload) {
        var dateProfile = this.component._getDateProfile();
        var eventDefId;
        var instanceGroup;
        var eventRanges;
        var bgRanges = [];
        var fgRanges = [];
        for (eventDefId in eventsPayload) {
            instanceGroup = eventsPayload[eventDefId];
            eventRanges = instanceGroup.sliceRenderRanges(dateProfile.activeUnzonedRange);
            if (instanceGroup.getEventDef().hasBgRendering()) {
                bgRanges.push.apply(bgRanges, eventRanges);
            }
            else {
                fgRanges.push.apply(fgRanges, eventRanges);
            }
        }
        this.renderBgRanges(bgRanges);
        this.renderFgRanges(fgRanges);
    };
    EventRenderer.prototype.unrender = function () {
        this.unrenderBgRanges();
        this.unrenderFgRanges();
    };
    EventRenderer.prototype.renderFgRanges = function (eventRanges) {
        var eventFootprints = this.component.eventRangesToEventFootprints(eventRanges);
        var segs = this.component.eventFootprintsToSegs(eventFootprints);
        // render an `.el` on each seg
        // returns a subset of the segs. segs that were actually rendered
        segs = this.renderFgSegEls(segs);
        if (this.renderFgSegs(segs) !== false) {
            this.fgSegs = segs;
        }
    };
    EventRenderer.prototype.unrenderFgRanges = function () {
        this.unrenderFgSegs(this.fgSegs || []);
        this.fgSegs = null;
    };
    EventRenderer.prototype.renderBgRanges = function (eventRanges) {
        var eventFootprints = this.component.eventRangesToEventFootprints(eventRanges);
        var segs = this.component.eventFootprintsToSegs(eventFootprints);
        if (this.renderBgSegs(segs) !== false) {
            this.bgSegs = segs;
        }
    };
    EventRenderer.prototype.unrenderBgRanges = function () {
        this.unrenderBgSegs();
        this.bgSegs = null;
    };
    EventRenderer.prototype.getSegs = function () {
        return (this.bgSegs || []).concat(this.fgSegs || []);
    };
    // Renders foreground event segments onto the grid
    EventRenderer.prototype.renderFgSegs = function (segs) {
        // subclasses must implement
        // segs already has rendered els, and has been filtered.
        return false; // signal failure if not implemented
    };
    // Unrenders all currently rendered foreground segments
    EventRenderer.prototype.unrenderFgSegs = function (segs) {
        // subclasses must implement
    };
    EventRenderer.prototype.renderBgSegs = function (segs) {
        var _this = this;
        if (this.fillRenderer) {
            this.fillRenderer.renderSegs('bgEvent', segs, {
                getClasses: function (seg) {
                    return _this.getBgClasses(seg.footprint.eventDef);
                },
                getCss: function (seg) {
                    return {
                        'background-color': _this.getBgColor(seg.footprint.eventDef)
                    };
                },
                filterEl: function (seg, el) {
                    return _this.filterEventRenderEl(seg.footprint, el);
                }
            });
        }
        else {
            return false; // signal failure if no fillRenderer
        }
    };
    EventRenderer.prototype.unrenderBgSegs = function () {
        if (this.fillRenderer) {
            this.fillRenderer.unrender('bgEvent');
        }
    };
    // Renders and assigns an `el` property for each foreground event segment.
    // Only returns segments that successfully rendered.
    EventRenderer.prototype.renderFgSegEls = function (segs, disableResizing) {
        var _this = this;
        if (disableResizing === void 0) { disableResizing = false; }
        var hasEventRenderHandlers = this.view.hasPublicHandlers('eventRender');
        var html = '';
        var renderedSegs = [];
        var i;
        if (segs.length) {
            // build a large concatenation of event segment HTML
            for (i = 0; i < segs.length; i++) {
                this.beforeFgSegHtml(segs[i]);
                html += this.fgSegHtml(segs[i], disableResizing);
            }
            // Grab individual elements from the combined HTML string. Use each as the default rendering.
            // Then, compute the 'el' for each segment. An el might be null if the eventRender callback returned false.
            $(html).each(function (i, node) {
                var seg = segs[i];
                var el = $(node);
                if (hasEventRenderHandlers) {
                    el = _this.filterEventRenderEl(seg.footprint, el);
                }
                if (el) {
                    el.data('fc-seg', seg); // used by handlers
                    seg.el = el;
                    renderedSegs.push(seg);
                }
            });
        }
        return renderedSegs;
    };
    EventRenderer.prototype.beforeFgSegHtml = function (seg) {
    };
    // Generates the HTML for the default rendering of a foreground event segment. Used by renderFgSegEls()
    EventRenderer.prototype.fgSegHtml = function (seg, disableResizing) {
        // subclasses should implement
    };
    // Generic utility for generating the HTML classNames for an event segment's element
    EventRenderer.prototype.getSegClasses = function (seg, isDraggable, isResizable) {
        var classes = [
            'fc-event',
            seg.isStart ? 'fc-start' : 'fc-not-start',
            seg.isEnd ? 'fc-end' : 'fc-not-end'
        ].concat(this.getClasses(seg.footprint.eventDef));
        if (isDraggable) {
            classes.push('fc-draggable');
        }
        if (isResizable) {
            classes.push('fc-resizable');
        }
        // event is currently selected? attach a className.
        if (this.view.isEventDefSelected(seg.footprint.eventDef)) {
            classes.push('fc-selected');
        }
        return classes;
    };
    // Given an event and the default element used for rendering, returns the element that should actually be used.
    // Basically runs events and elements through the eventRender hook.
    EventRenderer.prototype.filterEventRenderEl = function (eventFootprint, el) {
        var legacy = eventFootprint.getEventLegacy();
        var custom = this.view.publiclyTrigger('eventRender', {
            context: legacy,
            args: [legacy, el, this.view]
        });
        if (custom === false) {
            el = null;
        }
        else if (custom && custom !== true) {
            el = $(custom);
        }
        return el;
    };
    // Compute the text that should be displayed on an event's element.
    // `range` can be the Event object itself, or something range-like, with at least a `start`.
    // If event times are disabled, or the event has no time, will return a blank string.
    // If not specified, formatStr will default to the eventTimeFormat setting,
    // and displayEnd will default to the displayEventEnd setting.
    EventRenderer.prototype.getTimeText = function (eventFootprint, formatStr, displayEnd) {
        return this._getTimeText(eventFootprint.eventInstance.dateProfile.start, eventFootprint.eventInstance.dateProfile.end, eventFootprint.componentFootprint.isAllDay, formatStr, displayEnd);
    };
    EventRenderer.prototype._getTimeText = function (start, end, isAllDay, formatStr, displayEnd) {
        if (formatStr == null) {
            formatStr = this.eventTimeFormat;
        }
        if (displayEnd == null) {
            displayEnd = this.displayEventEnd;
        }
        if (this.displayEventTime && !isAllDay) {
            if (displayEnd && end) {
                return this.view.formatRange({ start: start, end: end }, false, // allDay
                formatStr);
            }
            else {
                return start.format(formatStr);
            }
        }
        return '';
    };
    EventRenderer.prototype.computeEventTimeFormat = function () {
        return this.opt('smallTimeFormat');
    };
    EventRenderer.prototype.computeDisplayEventTime = function () {
        return true;
    };
    EventRenderer.prototype.computeDisplayEventEnd = function () {
        return true;
    };
    EventRenderer.prototype.getBgClasses = function (eventDef) {
        var classNames = this.getClasses(eventDef);
        classNames.push('fc-bgevent');
        return classNames;
    };
    EventRenderer.prototype.getClasses = function (eventDef) {
        var objs = this.getStylingObjs(eventDef);
        var i;
        var classNames = [];
        for (i = 0; i < objs.length; i++) {
            classNames.push.apply(// append
            classNames, objs[i].eventClassName || objs[i].className || []);
        }
        return classNames;
    };
    // Utility for generating event skin-related CSS properties
    EventRenderer.prototype.getSkinCss = function (eventDef) {
        return {
            'background-color': this.getBgColor(eventDef),
            'border-color': this.getBorderColor(eventDef),
            color: this.getTextColor(eventDef)
        };
    };
    // Queries for caller-specified color, then falls back to default
    EventRenderer.prototype.getBgColor = function (eventDef) {
        var objs = this.getStylingObjs(eventDef);
        var i;
        var val;
        for (i = 0; i < objs.length && !val; i++) {
            val = objs[i].eventBackgroundColor || objs[i].eventColor ||
                objs[i].backgroundColor || objs[i].color;
        }
        if (!val) {
            val = this.opt('eventBackgroundColor') || this.opt('eventColor');
        }
        return val;
    };
    // Queries for caller-specified color, then falls back to default
    EventRenderer.prototype.getBorderColor = function (eventDef) {
        var objs = this.getStylingObjs(eventDef);
        var i;
        var val;
        for (i = 0; i < objs.length && !val; i++) {
            val = objs[i].eventBorderColor || objs[i].eventColor ||
                objs[i].borderColor || objs[i].color;
        }
        if (!val) {
            val = this.opt('eventBorderColor') || this.opt('eventColor');
        }
        return val;
    };
    // Queries for caller-specified color, then falls back to default
    EventRenderer.prototype.getTextColor = function (eventDef) {
        var objs = this.getStylingObjs(eventDef);
        var i;
        var val;
        for (i = 0; i < objs.length && !val; i++) {
            val = objs[i].eventTextColor ||
                objs[i].textColor;
        }
        if (!val) {
            val = this.opt('eventTextColor');
        }
        return val;
    };
    EventRenderer.prototype.getStylingObjs = function (eventDef) {
        var objs = this.getFallbackStylingObjs(eventDef);
        objs.unshift(eventDef);
        return objs;
    };
    EventRenderer.prototype.getFallbackStylingObjs = function (eventDef) {
        return [eventDef.source];
    };
    EventRenderer.prototype.sortEventSegs = function (segs) {
        segs.sort(util_1.proxy(this, 'compareEventSegs'));
    };
    // A cmp function for determining which segments should take visual priority
    EventRenderer.prototype.compareEventSegs = function (seg1, seg2) {
        var f1 = seg1.footprint;
        var f2 = seg2.footprint;
        var cf1 = f1.componentFootprint;
        var cf2 = f2.componentFootprint;
        var r1 = cf1.unzonedRange;
        var r2 = cf2.unzonedRange;
        return r1.startMs - r2.startMs || // earlier events go first
            (r2.endMs - r2.startMs) - (r1.endMs - r1.startMs) || // tie? longer events go first
            cf2.isAllDay - cf1.isAllDay || // tie? put all-day events first (booleans cast to 0/1)
            util_1.compareByFieldSpecs(f1.eventDef, f2.eventDef, this.view.eventOrderSpecs, f1.eventDef.miscProps, f2.eventDef.miscProps);
    };
    return EventRenderer;
}());
exports.default = EventRenderer;


/***/ }),
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment_ext_1 = __webpack_require__(10);
// Plugin
// -------------------------------------------------------------------------------------------------
moment_ext_1.newMomentProto.format = function () {
    if (this._fullCalendar && arguments[0]) {
        return formatDate(this, arguments[0]); // our extended formatting
    }
    if (this._ambigTime) {
        return moment_ext_1.oldMomentFormat(englishMoment(this), 'YYYY-MM-DD');
    }
    if (this._ambigZone) {
        return moment_ext_1.oldMomentFormat(englishMoment(this), 'YYYY-MM-DD[T]HH:mm:ss');
    }
    if (this._fullCalendar) {
        // moment.format() doesn't ensure english, but we want to.
        return moment_ext_1.oldMomentFormat(englishMoment(this));
    }
    return moment_ext_1.oldMomentProto.format.apply(this, arguments);
};
moment_ext_1.newMomentProto.toISOString = function () {
    if (this._ambigTime) {
        return moment_ext_1.oldMomentFormat(englishMoment(this), 'YYYY-MM-DD');
    }
    if (this._ambigZone) {
        return moment_ext_1.oldMomentFormat(englishMoment(this), 'YYYY-MM-DD[T]HH:mm:ss');
    }
    if (this._fullCalendar) {
        // depending on browser, moment might not output english. ensure english.
        // https://github.com/moment/moment/blob/2.18.1/src/lib/moment/format.js#L22
        return moment_ext_1.oldMomentProto.toISOString.apply(englishMoment(this), arguments);
    }
    return moment_ext_1.oldMomentProto.toISOString.apply(this, arguments);
};
function englishMoment(mom) {
    if (mom.locale() !== 'en') {
        return mom.clone().locale('en');
    }
    return mom;
}
// Config
// ---------------------------------------------------------------------------------------------------------------------
/*
Inserted between chunks in the fake ("intermediate") formatting string.
Important that it passes as whitespace (\s) because moment often identifies non-standalone months
via a regexp with an \s.
*/
var PART_SEPARATOR = '\u000b'; // vertical tab
/*
Inserted as the first character of a literal-text chunk to indicate that the literal text is not actually literal text,
but rather, a "special" token that has custom rendering (see specialTokens map).
*/
var SPECIAL_TOKEN_MARKER = '\u001f'; // information separator 1
/*
Inserted at the beginning and end of a span of text that must have non-zero numeric characters.
Handling of these markers is done in a post-processing step at the very end of text rendering.
*/
var MAYBE_MARKER = '\u001e'; // information separator 2
var MAYBE_REGEXP = new RegExp(MAYBE_MARKER + '([^' + MAYBE_MARKER + ']*)' + MAYBE_MARKER, 'g'); // must be global
/*
Addition formatting tokens we want recognized
*/
var specialTokens = {
    t: function (date) {
        return moment_ext_1.oldMomentFormat(date, 'a').charAt(0);
    },
    T: function (date) {
        return moment_ext_1.oldMomentFormat(date, 'A').charAt(0);
    }
};
/*
The first characters of formatting tokens for units that are 1 day or larger.
`value` is for ranking relative size (lower means bigger).
`unit` is a normalized unit, used for comparing moments.
*/
var largeTokenMap = {
    Y: { value: 1, unit: 'year' },
    M: { value: 2, unit: 'month' },
    W: { value: 3, unit: 'week' },
    w: { value: 3, unit: 'week' },
    D: { value: 4, unit: 'day' },
    d: { value: 4, unit: 'day' } // day of week
};
// Single Date Formatting
// ---------------------------------------------------------------------------------------------------------------------
/*
Formats `date` with a Moment formatting string, but allow our non-zero areas and special token
*/
function formatDate(date, formatStr) {
    return renderFakeFormatString(getParsedFormatString(formatStr).fakeFormatString, date);
}
exports.formatDate = formatDate;
// Date Range Formatting
// -------------------------------------------------------------------------------------------------
// TODO: make it work with timezone offset
/*
Using a formatting string meant for a single date, generate a range string, like
"Sep 2 - 9 2013", that intelligently inserts a separator where the dates differ.
If the dates are the same as far as the format string is concerned, just return a single
rendering of one date, without any separator.
*/
function formatRange(date1, date2, formatStr, separator, isRTL) {
    var localeData;
    date1 = moment_ext_1.default.parseZone(date1);
    date2 = moment_ext_1.default.parseZone(date2);
    localeData = date1.localeData();
    // Expand localized format strings, like "LL" -> "MMMM D YYYY".
    // BTW, this is not important for `formatDate` because it is impossible to put custom tokens
    // or non-zero areas in Moment's localized format strings.
    formatStr = localeData.longDateFormat(formatStr) || formatStr;
    return renderParsedFormat(getParsedFormatString(formatStr), date1, date2, separator || ' - ', isRTL);
}
exports.formatRange = formatRange;
/*
Renders a range with an already-parsed format string.
*/
function renderParsedFormat(parsedFormat, date1, date2, separator, isRTL) {
    var sameUnits = parsedFormat.sameUnits;
    var unzonedDate1 = date1.clone().stripZone(); // for same-unit comparisons
    var unzonedDate2 = date2.clone().stripZone(); // "
    var renderedParts1 = renderFakeFormatStringParts(parsedFormat.fakeFormatString, date1);
    var renderedParts2 = renderFakeFormatStringParts(parsedFormat.fakeFormatString, date2);
    var leftI;
    var leftStr = '';
    var rightI;
    var rightStr = '';
    var middleI;
    var middleStr1 = '';
    var middleStr2 = '';
    var middleStr = '';
    // Start at the leftmost side of the formatting string and continue until you hit a token
    // that is not the same between dates.
    for (leftI = 0; leftI < sameUnits.length && (!sameUnits[leftI] || unzonedDate1.isSame(unzonedDate2, sameUnits[leftI])); leftI++) {
        leftStr += renderedParts1[leftI];
    }
    // Similarly, start at the rightmost side of the formatting string and move left
    for (rightI = sameUnits.length - 1; rightI > leftI && (!sameUnits[rightI] || unzonedDate1.isSame(unzonedDate2, sameUnits[rightI])); rightI--) {
        // If current chunk is on the boundary of unique date-content, and is a special-case
        // date-formatting postfix character, then don't consume it. Consider it unique date-content.
        // TODO: make configurable
        if (rightI - 1 === leftI && renderedParts1[rightI] === '.') {
            break;
        }
        rightStr = renderedParts1[rightI] + rightStr;
    }
    // The area in the middle is different for both of the dates.
    // Collect them distinctly so we can jam them together later.
    for (middleI = leftI; middleI <= rightI; middleI++) {
        middleStr1 += renderedParts1[middleI];
        middleStr2 += renderedParts2[middleI];
    }
    if (middleStr1 || middleStr2) {
        if (isRTL) {
            middleStr = middleStr2 + separator + middleStr1;
        }
        else {
            middleStr = middleStr1 + separator + middleStr2;
        }
    }
    return processMaybeMarkers(leftStr + middleStr + rightStr);
}
// Format String Parsing
// ---------------------------------------------------------------------------------------------------------------------
var parsedFormatStrCache = {};
/*
Returns a parsed format string, leveraging a cache.
*/
function getParsedFormatString(formatStr) {
    return parsedFormatStrCache[formatStr] ||
        (parsedFormatStrCache[formatStr] = parseFormatString(formatStr));
}
/*
Parses a format string into the following:
- fakeFormatString: a momentJS formatting string, littered with special control characters that get post-processed.
- sameUnits: for every part in fakeFormatString, if the part is a token, the value will be a unit string (like "day"),
  that indicates how similar a range's start & end must be in order to share the same formatted text.
  If not a token, then the value is null.
  Always a flat array (not nested liked "chunks").
*/
function parseFormatString(formatStr) {
    var chunks = chunkFormatString(formatStr);
    return {
        fakeFormatString: buildFakeFormatString(chunks),
        sameUnits: buildSameUnits(chunks)
    };
}
/*
Break the formatting string into an array of chunks.
A 'maybe' chunk will have nested chunks.
*/
function chunkFormatString(formatStr) {
    var chunks = [];
    var match;
    // TODO: more descrimination
    // \4 is a backreference to the first character of a multi-character set.
    var chunker = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g;
    while ((match = chunker.exec(formatStr))) {
        if (match[1]) {
            chunks.push.apply(chunks, // append
            splitStringLiteral(match[1]));
        }
        else if (match[2]) {
            chunks.push({ maybe: chunkFormatString(match[2]) });
        }
        else if (match[3]) {
            chunks.push({ token: match[3] });
        }
        else if (match[5]) {
            chunks.push.apply(chunks, // append
            splitStringLiteral(match[5]));
        }
    }
    return chunks;
}
/*
Potentially splits a literal-text string into multiple parts. For special cases.
*/
function splitStringLiteral(s) {
    if (s === '. ') {
        return ['.', ' ']; // for locales with periods bound to the end of each year/month/date
    }
    else {
        return [s];
    }
}
/*
Given chunks parsed from a real format string, generate a fake (aka "intermediate") format string with special control
characters that will eventually be given to moment for formatting, and then post-processed.
*/
function buildFakeFormatString(chunks) {
    var parts = [];
    var i;
    var chunk;
    for (i = 0; i < chunks.length; i++) {
        chunk = chunks[i];
        if (typeof chunk === 'string') {
            parts.push('[' + chunk + ']');
        }
        else if (chunk.token) {
            if (chunk.token in specialTokens) {
                parts.push(SPECIAL_TOKEN_MARKER + // useful during post-processing
                    '[' + chunk.token + ']' // preserve as literal text
                );
            }
            else {
                parts.push(chunk.token); // unprotected text implies a format string
            }
        }
        else if (chunk.maybe) {
            parts.push(MAYBE_MARKER + // useful during post-processing
                buildFakeFormatString(chunk.maybe) +
                MAYBE_MARKER);
        }
    }
    return parts.join(PART_SEPARATOR);
}
/*
Given parsed chunks from a real formatting string, generates an array of unit strings (like "day") that indicate
in which regard two dates must be similar in order to share range formatting text.
The `chunks` can be nested (because of "maybe" chunks), however, the returned array will be flat.
*/
function buildSameUnits(chunks) {
    var units = [];
    var i;
    var chunk;
    var tokenInfo;
    for (i = 0; i < chunks.length; i++) {
        chunk = chunks[i];
        if (chunk.token) {
            tokenInfo = largeTokenMap[chunk.token.charAt(0)];
            units.push(tokenInfo ? tokenInfo.unit : 'second'); // default to a very strict same-second
        }
        else if (chunk.maybe) {
            units.push.apply(units, // append
            buildSameUnits(chunk.maybe));
        }
        else {
            units.push(null);
        }
    }
    return units;
}
// Rendering to text
// ---------------------------------------------------------------------------------------------------------------------
/*
Formats a date with a fake format string, post-processes the control characters, then returns.
*/
function renderFakeFormatString(fakeFormatString, date) {
    return processMaybeMarkers(renderFakeFormatStringParts(fakeFormatString, date).join(''));
}
/*
Formats a date into parts that will have been post-processed, EXCEPT for the "maybe" markers.
*/
function renderFakeFormatStringParts(fakeFormatString, date) {
    var parts = [];
    var fakeRender = moment_ext_1.oldMomentFormat(date, fakeFormatString);
    var fakeParts = fakeRender.split(PART_SEPARATOR);
    var i;
    var fakePart;
    for (i = 0; i < fakeParts.length; i++) {
        fakePart = fakeParts[i];
        if (fakePart.charAt(0) === SPECIAL_TOKEN_MARKER) {
            parts.push(
            // the literal string IS the token's name.
            // call special token's registered function.
            specialTokens[fakePart.substring(1)](date));
        }
        else {
            parts.push(fakePart);
        }
    }
    return parts;
}
/*
Accepts an almost-finally-formatted string and processes the "maybe" control characters, returning a new string.
*/
function processMaybeMarkers(s) {
    return s.replace(MAYBE_REGEXP, function (m0, m1) {
        if (m1.match(/[1-9]/)) {
            return m1;
        }
        else {
            return '';
        }
    });
}
// Misc Utils
// -------------------------------------------------------------------------------------------------
/*
Returns a unit string, either 'year', 'month', 'day', or null for the most granular formatting token in the string.
*/
function queryMostGranularFormatUnit(formatStr) {
    var chunks = chunkFormatString(formatStr);
    var i;
    var chunk;
    var candidate;
    var best;
    for (i = 0; i < chunks.length; i++) {
        chunk = chunks[i];
        if (chunk.token) {
            candidate = largeTokenMap[chunk.token.charAt(0)];
            if (candidate) {
                if (!best || candidate.value > best.value) {
                    best = candidate;
                }
            }
        }
    }
    if (best) {
        return best.unit;
    }
    return null;
}
exports.queryMostGranularFormatUnit = queryMostGranularFormatUnit;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var Class_1 = __webpack_require__(33);
var EmitterMixin_1 = __webpack_require__(11);
var ListenerMixin_1 = __webpack_require__(7);
var Model = /** @class */ (function (_super) {
    tslib_1.__extends(Model, _super);
    function Model() {
        var _this = _super.call(this) || this;
        _this._watchers = {};
        _this._props = {};
        _this.applyGlobalWatchers();
        _this.constructed();
        return _this;
    }
    Model.watch = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // subclasses should make a masked-copy of the superclass's map
        // TODO: write test
        if (!this.prototype.hasOwnProperty('_globalWatchArgs')) {
            this.prototype._globalWatchArgs = Object.create(this.prototype._globalWatchArgs);
        }
        this.prototype._globalWatchArgs[name] = args;
    };
    Model.prototype.constructed = function () {
        // useful for monkeypatching. TODO: BaseClass?
    };
    Model.prototype.applyGlobalWatchers = function () {
        var map = this._globalWatchArgs;
        var name;
        for (name in map) {
            this.watch.apply(this, [name].concat(map[name]));
        }
    };
    Model.prototype.has = function (name) {
        return name in this._props;
    };
    Model.prototype.get = function (name) {
        if (name === undefined) {
            return this._props;
        }
        return this._props[name];
    };
    Model.prototype.set = function (name, val) {
        var newProps;
        if (typeof name === 'string') {
            newProps = {};
            newProps[name] = val === undefined ? null : val;
        }
        else {
            newProps = name;
        }
        this.setProps(newProps);
    };
    Model.prototype.reset = function (newProps) {
        var oldProps = this._props;
        var changeset = {}; // will have undefined's to signal unsets
        var name;
        for (name in oldProps) {
            changeset[name] = undefined;
        }
        for (name in newProps) {
            changeset[name] = newProps[name];
        }
        this.setProps(changeset);
    };
    Model.prototype.unset = function (name) {
        var newProps = {};
        var names;
        var i;
        if (typeof name === 'string') {
            names = [name];
        }
        else {
            names = name;
        }
        for (i = 0; i < names.length; i++) {
            newProps[names[i]] = undefined;
        }
        this.setProps(newProps);
    };
    Model.prototype.setProps = function (newProps) {
        var changedProps = {};
        var changedCnt = 0;
        var name;
        var val;
        for (name in newProps) {
            val = newProps[name];
            // a change in value?
            // if an object, don't check equality, because might have been mutated internally.
            // TODO: eventually enforce immutability.
            if (typeof val === 'object' ||
                val !== this._props[name]) {
                changedProps[name] = val;
                changedCnt++;
            }
        }
        if (changedCnt) {
            this.trigger('before:batchChange', changedProps);
            for (name in changedProps) {
                val = changedProps[name];
                this.trigger('before:change', name, val);
                this.trigger('before:change:' + name, val);
            }
            for (name in changedProps) {
                val = changedProps[name];
                if (val === undefined) {
                    delete this._props[name];
                }
                else {
                    this._props[name] = val;
                }
                this.trigger('change:' + name, val);
                this.trigger('change', name, val);
            }
            this.trigger('batchChange', changedProps);
        }
    };
    Model.prototype.watch = function (name, depList, startFunc, stopFunc) {
        var _this = this;
        this.unwatch(name);
        this._watchers[name] = this._watchDeps(depList, function (deps) {
            var res = startFunc.call(_this, deps);
            if (res && res.then) {
                _this.unset(name); // put in an unset state while resolving
                res.then(function (val) {
                    _this.set(name, val);
                });
            }
            else {
                _this.set(name, res);
            }
        }, function (deps) {
            _this.unset(name);
            if (stopFunc) {
                stopFunc.call(_this, deps);
            }
        });
    };
    Model.prototype.unwatch = function (name) {
        var watcher = this._watchers[name];
        if (watcher) {
            delete this._watchers[name];
            watcher.teardown();
        }
    };
    Model.prototype._watchDeps = function (depList, startFunc, stopFunc) {
        var _this = this;
        var queuedChangeCnt = 0;
        var depCnt = depList.length;
        var satisfyCnt = 0;
        var values = {}; // what's passed as the `deps` arguments
        var bindTuples = []; // array of [ eventName, handlerFunc ] arrays
        var isCallingStop = false;
        var onBeforeDepChange = function (depName, val, isOptional) {
            queuedChangeCnt++;
            if (queuedChangeCnt === 1) {
                if (satisfyCnt === depCnt) {
                    isCallingStop = true;
                    stopFunc(values);
                    isCallingStop = false;
                }
            }
        };
        var onDepChange = function (depName, val, isOptional) {
            if (val === undefined) {
                // required dependency that was previously set?
                if (!isOptional && values[depName] !== undefined) {
                    satisfyCnt--;
                }
                delete values[depName];
            }
            else {
                // required dependency that was previously unset?
                if (!isOptional && values[depName] === undefined) {
                    satisfyCnt++;
                }
                values[depName] = val;
            }
            queuedChangeCnt--;
            if (!queuedChangeCnt) {
                // now finally satisfied or satisfied all along?
                if (satisfyCnt === depCnt) {
                    // if the stopFunc initiated another value change, ignore it.
                    // it will be processed by another change event anyway.
                    if (!isCallingStop) {
                        startFunc(values);
                    }
                }
            }
        };
        // intercept for .on() that remembers handlers
        var bind = function (eventName, handler) {
            _this.on(eventName, handler);
            bindTuples.push([eventName, handler]);
        };
        // listen to dependency changes
        depList.forEach(function (depName) {
            var isOptional = false;
            if (depName.charAt(0) === '?') {
                depName = depName.substring(1);
                isOptional = true;
            }
            bind('before:change:' + depName, function (val) {
                onBeforeDepChange(depName, val, isOptional);
            });
            bind('change:' + depName, function (val) {
                onDepChange(depName, val, isOptional);
            });
        });
        // process current dependency values
        depList.forEach(function (depName) {
            var isOptional = false;
            if (depName.charAt(0) === '?') {
                depName = depName.substring(1);
                isOptional = true;
            }
            if (_this.has(depName)) {
                values[depName] = _this.get(depName);
                satisfyCnt++;
            }
            else if (isOptional) {
                satisfyCnt++;
            }
        });
        // initially satisfied
        if (satisfyCnt === depCnt) {
            startFunc(values);
        }
        return {
            teardown: function () {
                // remove all handlers
                for (var i = 0; i < bindTuples.length; i++) {
                    _this.off(bindTuples[i][0], bindTuples[i][1]);
                }
                bindTuples = null;
                // was satisfied, so call stopFunc
                if (satisfyCnt === depCnt) {
                    stopFunc();
                }
            },
            flash: function () {
                if (satisfyCnt === depCnt) {
                    stopFunc();
                    startFunc(values);
                }
            }
        };
    };
    Model.prototype.flash = function (name) {
        var watcher = this._watchers[name];
        if (watcher) {
            watcher.flash();
        }
    };
    return Model;
}(Class_1.default));
exports.default = Model;
Model.prototype._globalWatchArgs = {}; // mutation protection in Model.watch
EmitterMixin_1.default.mixInto(Model);
ListenerMixin_1.default.mixInto(Model);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(0);
var util_1 = __webpack_require__(4);
var SingleEventDef_1 = __webpack_require__(13);
var RecurringEventDef_1 = __webpack_require__(210);
exports.default = {
    parse: function (eventInput, source) {
        if (util_1.isTimeString(eventInput.start) || moment.isDuration(eventInput.start) ||
            util_1.isTimeString(eventInput.end) || moment.isDuration(eventInput.end)) {
            return RecurringEventDef_1.default.parse(eventInput, source);
        }
        else {
            return SingleEventDef_1.default.parse(eventInput, source);
        }
    }
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(4);
var EventDateProfile_1 = __webpack_require__(17);
var EventDefDateMutation = /** @class */ (function () {
    function EventDefDateMutation() {
        this.clearEnd = false;
        this.forceTimed = false;
        this.forceAllDay = false;
    }
    EventDefDateMutation.createFromDiff = function (dateProfile0, dateProfile1, largeUnit) {
        var clearEnd = dateProfile0.end && !dateProfile1.end;
        var forceTimed = dateProfile0.isAllDay() && !dateProfile1.isAllDay();
        var forceAllDay = !dateProfile0.isAllDay() && dateProfile1.isAllDay();
        var dateDelta;
        var endDiff;
        var endDelta;
        var mutation;
        // subtracts the dates in the appropriate way, returning a duration
        function subtractDates(date1, date0) {
            if (largeUnit) {
                return util_1.diffByUnit(date1, date0, largeUnit); // poorly named
            }
            else if (dateProfile1.isAllDay()) {
                return util_1.diffDay(date1, date0); // poorly named
            }
            else {
                return util_1.diffDayTime(date1, date0); // poorly named
            }
        }
        dateDelta = subtractDates(dateProfile1.start, dateProfile0.start);
        if (dateProfile1.end) {
            // use unzonedRanges because dateProfile0.end might be null
            endDiff = subtractDates(dateProfile1.unzonedRange.getEnd(), dateProfile0.unzonedRange.getEnd());
            endDelta = endDiff.subtract(dateDelta);
        }
        mutation = new EventDefDateMutation();
        mutation.clearEnd = clearEnd;
        mutation.forceTimed = forceTimed;
        mutation.forceAllDay = forceAllDay;
        mutation.setDateDelta(dateDelta);
        mutation.setEndDelta(endDelta);
        return mutation;
    };
    /*
    returns an undo function.
    */
    EventDefDateMutation.prototype.buildNewDateProfile = function (eventDateProfile, calendar) {
        var start = eventDateProfile.start.clone();
        var end = null;
        var shouldRezone = false;
        if (eventDateProfile.end && !this.clearEnd) {
            end = eventDateProfile.end.clone();
        }
        else if (this.endDelta && !end) {
            end = calendar.getDefaultEventEnd(eventDateProfile.isAllDay(), start);
        }
        if (this.forceTimed) {
            shouldRezone = true;
            if (!start.hasTime()) {
                start.time(0);
            }
            if (end && !end.hasTime()) {
                end.time(0);
            }
        }
        else if (this.forceAllDay) {
            if (start.hasTime()) {
                start.stripTime();
            }
            if (end && end.hasTime()) {
                end.stripTime();
            }
        }
        if (this.dateDelta) {
            shouldRezone = true;
            start.add(this.dateDelta);
            if (end) {
                end.add(this.dateDelta);
            }
        }
        // do this before adding startDelta to start, so we can work off of start
        if (this.endDelta) {
            shouldRezone = true;
            end.add(this.endDelta);
        }
        if (this.startDelta) {
            shouldRezone = true;
            start.add(this.startDelta);
        }
        if (shouldRezone) {
            start = calendar.applyTimezone(start);
            if (end) {
                end = calendar.applyTimezone(end);
            }
        }
        // TODO: okay to access calendar option?
        if (!end && calendar.opt('forceEventDuration')) {
            end = calendar.getDefaultEventEnd(eventDateProfile.isAllDay(), start);
        }
        return new EventDateProfile_1.default(start, end, calendar);
    };
    EventDefDateMutation.prototype.setDateDelta = function (dateDelta) {
        if (dateDelta && dateDelta.valueOf()) {
            this.dateDelta = dateDelta;
        }
        else {
            this.dateDelta = null;
        }
    };
    EventDefDateMutation.prototype.setStartDelta = function (startDelta) {
        if (startDelta && startDelta.valueOf()) {
            this.startDelta = startDelta;
        }
        else {
            this.startDelta = null;
        }
    };
    EventDefDateMutation.prototype.setEndDelta = function (endDelta) {
        if (endDelta && endDelta.valueOf()) {
            this.endDelta = endDelta;
        }
        else {
            this.endDelta = null;
        }
    };
    EventDefDateMutation.prototype.isEmpty = function () {
        return !this.clearEnd && !this.forceTimed && !this.forceAllDay &&
            !this.dateDelta && !this.startDelta && !this.endDelta;
    };
    return EventDefDateMutation;
}());
exports.default = EventDefDateMutation;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var StandardTheme_1 = __webpack_require__(213);
var JqueryUiTheme_1 = __webpack_require__(214);
var themeClassHash = {};
function defineThemeSystem(themeName, themeClass) {
    themeClassHash[themeName] = themeClass;
}
exports.defineThemeSystem = defineThemeSystem;
function getThemeSystemClass(themeSetting) {
    if (!themeSetting) {
        return StandardTheme_1.default;
    }
    else if (themeSetting === true) {
        return JqueryUiTheme_1.default;
    }
    else {
        return themeClassHash[themeSetting];
    }
}
exports.getThemeSystemClass = getThemeSystemClass;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var Promise_1 = __webpack_require__(20);
var EventSource_1 = __webpack_require__(6);
var SingleEventDef_1 = __webpack_require__(13);
var ArrayEventSource = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayEventSource, _super);
    function ArrayEventSource(calendar) {
        var _this = _super.call(this, calendar) || this;
        _this.eventDefs = []; // for if setRawEventDefs is never called
        return _this;
    }
    ArrayEventSource.parse = function (rawInput, calendar) {
        var rawProps;
        // normalize raw input
        if ($.isArray(rawInput.events)) {
            rawProps = rawInput;
        }
        else if ($.isArray(rawInput)) {
            rawProps = { events: rawInput };
        }
        if (rawProps) {
            return EventSource_1.default.parse.call(this, rawProps, calendar);
        }
        return false;
    };
    ArrayEventSource.prototype.setRawEventDefs = function (rawEventDefs) {
        this.rawEventDefs = rawEventDefs;
        this.eventDefs = this.parseEventDefs(rawEventDefs);
    };
    ArrayEventSource.prototype.fetch = function (start, end, timezone) {
        var eventDefs = this.eventDefs;
        var i;
        if (this.currentTimezone != null &&
            this.currentTimezone !== timezone) {
            for (i = 0; i < eventDefs.length; i++) {
                if (eventDefs[i] instanceof SingleEventDef_1.default) {
                    eventDefs[i].rezone();
                }
            }
        }
        this.currentTimezone = timezone;
        return Promise_1.default.resolve(eventDefs);
    };
    ArrayEventSource.prototype.addEventDef = function (eventDef) {
        this.eventDefs.push(eventDef);
    };
    /*
    eventDefId already normalized to a string
    */
    ArrayEventSource.prototype.removeEventDefsById = function (eventDefId) {
        return util_1.removeMatching(this.eventDefs, function (eventDef) {
            return eventDef.id === eventDefId;
        });
    };
    ArrayEventSource.prototype.removeAllEventDefs = function () {
        this.eventDefs = [];
    };
    ArrayEventSource.prototype.getPrimitive = function () {
        return this.rawEventDefs;
    };
    ArrayEventSource.prototype.applyManualStandardProps = function (rawProps) {
        var superSuccess = _super.prototype.applyManualStandardProps.call(this, rawProps);
        this.setRawEventDefs(rawProps.events);
        return superSuccess;
    };
    return ArrayEventSource;
}(EventSource_1.default));
exports.default = ArrayEventSource;
ArrayEventSource.defineStandardProps({
    events: false // don't automatically transfer
});


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
/*
A cache for the left/right/top/bottom/width/height values for one or more elements.
Works with both offset (from topleft document) and position (from offsetParent).

options:
- els
- isHorizontal
- isVertical
*/
var CoordCache = /** @class */ (function () {
    function CoordCache(options) {
        this.isHorizontal = false; // whether to query for left/right/width
        this.isVertical = false; // whether to query for top/bottom/height
        this.els = $(options.els);
        this.isHorizontal = options.isHorizontal;
        this.isVertical = options.isVertical;
        this.forcedOffsetParentEl = options.offsetParent ? $(options.offsetParent) : null;
    }
    // Queries the els for coordinates and stores them.
    // Call this method before using and of the get* methods below.
    CoordCache.prototype.build = function () {
        var offsetParentEl = this.forcedOffsetParentEl;
        if (!offsetParentEl && this.els.length > 0) {
            offsetParentEl = this.els.eq(0).offsetParent();
        }
        this.origin = offsetParentEl ?
            offsetParentEl.offset() :
            null;
        this.boundingRect = this.queryBoundingRect();
        if (this.isHorizontal) {
            this.buildElHorizontals();
        }
        if (this.isVertical) {
            this.buildElVerticals();
        }
    };
    // Destroys all internal data about coordinates, freeing memory
    CoordCache.prototype.clear = function () {
        this.origin = null;
        this.boundingRect = null;
        this.lefts = null;
        this.rights = null;
        this.tops = null;
        this.bottoms = null;
    };
    // When called, if coord caches aren't built, builds them
    CoordCache.prototype.ensureBuilt = function () {
        if (!this.origin) {
            this.build();
        }
    };
    // Populates the left/right internal coordinate arrays
    CoordCache.prototype.buildElHorizontals = function () {
        var lefts = [];
        var rights = [];
        this.els.each(function (i, node) {
            var el = $(node);
            var left = el.offset().left;
            var width = el.outerWidth();
            lefts.push(left);
            rights.push(left + width);
        });
        this.lefts = lefts;
        this.rights = rights;
    };
    // Populates the top/bottom internal coordinate arrays
    CoordCache.prototype.buildElVerticals = function () {
        var tops = [];
        var bottoms = [];
        this.els.each(function (i, node) {
            var el = $(node);
            var top = el.offset().top;
            var height = el.outerHeight();
            tops.push(top);
            bottoms.push(top + height);
        });
        this.tops = tops;
        this.bottoms = bottoms;
    };
    // Given a left offset (from document left), returns the index of the el that it horizontally intersects.
    // If no intersection is made, returns undefined.
    CoordCache.prototype.getHorizontalIndex = function (leftOffset) {
        this.ensureBuilt();
        var lefts = this.lefts;
        var rights = this.rights;
        var len = lefts.length;
        var i;
        for (i = 0; i < len; i++) {
            if (leftOffset >= lefts[i] && leftOffset < rights[i]) {
                return i;
            }
        }
    };
    // Given a top offset (from document top), returns the index of the el that it vertically intersects.
    // If no intersection is made, returns undefined.
    CoordCache.prototype.getVerticalIndex = function (topOffset) {
        this.ensureBuilt();
        var tops = this.tops;
        var bottoms = this.bottoms;
        var len = tops.length;
        var i;
        for (i = 0; i < len; i++) {
            if (topOffset >= tops[i] && topOffset < bottoms[i]) {
                return i;
            }
        }
    };
    // Gets the left offset (from document left) of the element at the given index
    CoordCache.prototype.getLeftOffset = function (leftIndex) {
        this.ensureBuilt();
        return this.lefts[leftIndex];
    };
    // Gets the left position (from offsetParent left) of the element at the given index
    CoordCache.prototype.getLeftPosition = function (leftIndex) {
        this.ensureBuilt();
        return this.lefts[leftIndex] - this.origin.left;
    };
    // Gets the right offset (from document left) of the element at the given index.
    // This value is NOT relative to the document's right edge, like the CSS concept of "right" would be.
    CoordCache.prototype.getRightOffset = function (leftIndex) {
        this.ensureBuilt();
        return this.rights[leftIndex];
    };
    // Gets the right position (from offsetParent left) of the element at the given index.
    // This value is NOT relative to the offsetParent's right edge, like the CSS concept of "right" would be.
    CoordCache.prototype.getRightPosition = function (leftIndex) {
        this.ensureBuilt();
        return this.rights[leftIndex] - this.origin.left;
    };
    // Gets the width of the element at the given index
    CoordCache.prototype.getWidth = function (leftIndex) {
        this.ensureBuilt();
        return this.rights[leftIndex] - this.lefts[leftIndex];
    };
    // Gets the top offset (from document top) of the element at the given index
    CoordCache.prototype.getTopOffset = function (topIndex) {
        this.ensureBuilt();
        return this.tops[topIndex];
    };
    // Gets the top position (from offsetParent top) of the element at the given position
    CoordCache.prototype.getTopPosition = function (topIndex) {
        this.ensureBuilt();
        return this.tops[topIndex] - this.origin.top;
    };
    // Gets the bottom offset (from the document top) of the element at the given index.
    // This value is NOT relative to the offsetParent's bottom edge, like the CSS concept of "bottom" would be.
    CoordCache.prototype.getBottomOffset = function (topIndex) {
        this.ensureBuilt();
        return this.bottoms[topIndex];
    };
    // Gets the bottom position (from the offsetParent top) of the element at the given index.
    // This value is NOT relative to the offsetParent's bottom edge, like the CSS concept of "bottom" would be.
    CoordCache.prototype.getBottomPosition = function (topIndex) {
        this.ensureBuilt();
        return this.bottoms[topIndex] - this.origin.top;
    };
    // Gets the height of the element at the given index
    CoordCache.prototype.getHeight = function (topIndex) {
        this.ensureBuilt();
        return this.bottoms[topIndex] - this.tops[topIndex];
    };
    // Bounding Rect
    // TODO: decouple this from CoordCache
    // Compute and return what the elements' bounding rectangle is, from the user's perspective.
    // Right now, only returns a rectangle if constrained by an overflow:scroll element.
    // Returns null if there are no elements
    CoordCache.prototype.queryBoundingRect = function () {
        var scrollParentEl;
        if (this.els.length > 0) {
            scrollParentEl = util_1.getScrollParent(this.els.eq(0));
            if (!scrollParentEl.is(document)) {
                return util_1.getClientRect(scrollParentEl);
            }
        }
        return null;
    };
    CoordCache.prototype.isPointInBounds = function (leftOffset, topOffset) {
        return this.isLeftInBounds(leftOffset) && this.isTopInBounds(topOffset);
    };
    CoordCache.prototype.isLeftInBounds = function (leftOffset) {
        return !this.boundingRect || (leftOffset >= this.boundingRect.left && leftOffset < this.boundingRect.right);
    };
    CoordCache.prototype.isTopInBounds = function (topOffset) {
        return !this.boundingRect || (topOffset >= this.boundingRect.top && topOffset < this.boundingRect.bottom);
    };
    return CoordCache;
}());
exports.default = CoordCache;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var ListenerMixin_1 = __webpack_require__(7);
var GlobalEmitter_1 = __webpack_require__(21);
/* Tracks a drag's mouse movement, firing various handlers
----------------------------------------------------------------------------------------------------------------------*/
// TODO: use Emitter
var DragListener = /** @class */ (function () {
    function DragListener(options) {
        this.isInteracting = false;
        this.isDistanceSurpassed = false;
        this.isDelayEnded = false;
        this.isDragging = false;
        this.isTouch = false;
        this.isGeneric = false; // initiated by 'dragstart' (jqui)
        this.shouldCancelTouchScroll = true;
        this.scrollAlwaysKills = false;
        this.isAutoScroll = false;
        // defaults
        this.scrollSensitivity = 30; // pixels from edge for scrolling to start
        this.scrollSpeed = 200; // pixels per second, at maximum speed
        this.scrollIntervalMs = 50; // millisecond wait between scroll increment
        this.options = options || {};
    }
    // Interaction (high-level)
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.startInteraction = function (ev, extraOptions) {
        if (extraOptions === void 0) { extraOptions = {}; }
        if (ev.type === 'mousedown') {
            if (GlobalEmitter_1.default.get().shouldIgnoreMouse()) {
                return;
            }
            else if (!util_1.isPrimaryMouseButton(ev)) {
                return;
            }
            else {
                ev.preventDefault(); // prevents native selection in most browsers
            }
        }
        if (!this.isInteracting) {
            // process options
            this.delay = util_1.firstDefined(extraOptions.delay, this.options.delay, 0);
            this.minDistance = util_1.firstDefined(extraOptions.distance, this.options.distance, 0);
            this.subjectEl = this.options.subjectEl;
            util_1.preventSelection($('body'));
            this.isInteracting = true;
            this.isTouch = util_1.getEvIsTouch(ev);
            this.isGeneric = ev.type === 'dragstart';
            this.isDelayEnded = false;
            this.isDistanceSurpassed = false;
            this.originX = util_1.getEvX(ev);
            this.originY = util_1.getEvY(ev);
            this.scrollEl = util_1.getScrollParent($(ev.target));
            this.bindHandlers();
            this.initAutoScroll();
            this.handleInteractionStart(ev);
            this.startDelay(ev);
            if (!this.minDistance) {
                this.handleDistanceSurpassed(ev);
            }
        }
    };
    DragListener.prototype.handleInteractionStart = function (ev) {
        this.trigger('interactionStart', ev);
    };
    DragListener.prototype.endInteraction = function (ev, isCancelled) {
        if (this.isInteracting) {
            this.endDrag(ev);
            if (this.delayTimeoutId) {
                clearTimeout(this.delayTimeoutId);
                this.delayTimeoutId = null;
            }
            this.destroyAutoScroll();
            this.unbindHandlers();
            this.isInteracting = false;
            this.handleInteractionEnd(ev, isCancelled);
            util_1.allowSelection($('body'));
        }
    };
    DragListener.prototype.handleInteractionEnd = function (ev, isCancelled) {
        this.trigger('interactionEnd', ev, isCancelled || false);
    };
    // Binding To DOM
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.bindHandlers = function () {
        // some browsers (Safari in iOS 10) don't allow preventDefault on touch events that are bound after touchstart,
        // so listen to the GlobalEmitter singleton, which is always bound, instead of the document directly.
        var globalEmitter = GlobalEmitter_1.default.get();
        if (this.isGeneric) {
            this.listenTo($(document), {
                drag: this.handleMove,
                dragstop: this.endInteraction
            });
        }
        else if (this.isTouch) {
            this.listenTo(globalEmitter, {
                touchmove: this.handleTouchMove,
                touchend: this.endInteraction,
                scroll: this.handleTouchScroll
            });
        }
        else {
            this.listenTo(globalEmitter, {
                mousemove: this.handleMouseMove,
                mouseup: this.endInteraction
            });
        }
        this.listenTo(globalEmitter, {
            selectstart: util_1.preventDefault,
            contextmenu: util_1.preventDefault // long taps would open menu on Chrome dev tools
        });
    };
    DragListener.prototype.unbindHandlers = function () {
        this.stopListeningTo(GlobalEmitter_1.default.get());
        this.stopListeningTo($(document)); // for isGeneric
    };
    // Drag (high-level)
    // -----------------------------------------------------------------------------------------------------------------
    // extraOptions ignored if drag already started
    DragListener.prototype.startDrag = function (ev, extraOptions) {
        this.startInteraction(ev, extraOptions); // ensure interaction began
        if (!this.isDragging) {
            this.isDragging = true;
            this.handleDragStart(ev);
        }
    };
    DragListener.prototype.handleDragStart = function (ev) {
        this.trigger('dragStart', ev);
    };
    DragListener.prototype.handleMove = function (ev) {
        var dx = util_1.getEvX(ev) - this.originX;
        var dy = util_1.getEvY(ev) - this.originY;
        var minDistance = this.minDistance;
        var distanceSq; // current distance from the origin, squared
        if (!this.isDistanceSurpassed) {
            distanceSq = dx * dx + dy * dy;
            if (distanceSq >= minDistance * minDistance) {
                this.handleDistanceSurpassed(ev);
            }
        }
        if (this.isDragging) {
            this.handleDrag(dx, dy, ev);
        }
    };
    // Called while the mouse is being moved and when we know a legitimate drag is taking place
    DragListener.prototype.handleDrag = function (dx, dy, ev) {
        this.trigger('drag', dx, dy, ev);
        this.updateAutoScroll(ev); // will possibly cause scrolling
    };
    DragListener.prototype.endDrag = function (ev) {
        if (this.isDragging) {
            this.isDragging = false;
            this.handleDragEnd(ev);
        }
    };
    DragListener.prototype.handleDragEnd = function (ev) {
        this.trigger('dragEnd', ev);
    };
    // Delay
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.startDelay = function (initialEv) {
        var _this = this;
        if (this.delay) {
            this.delayTimeoutId = setTimeout(function () {
                _this.handleDelayEnd(initialEv);
            }, this.delay);
        }
        else {
            this.handleDelayEnd(initialEv);
        }
    };
    DragListener.prototype.handleDelayEnd = function (initialEv) {
        this.isDelayEnded = true;
        if (this.isDistanceSurpassed) {
            this.startDrag(initialEv);
        }
    };
    // Distance
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.handleDistanceSurpassed = function (ev) {
        this.isDistanceSurpassed = true;
        if (this.isDelayEnded) {
            this.startDrag(ev);
        }
    };
    // Mouse / Touch
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.handleTouchMove = function (ev) {
        // prevent inertia and touchmove-scrolling while dragging
        if (this.isDragging && this.shouldCancelTouchScroll) {
            ev.preventDefault();
        }
        this.handleMove(ev);
    };
    DragListener.prototype.handleMouseMove = function (ev) {
        this.handleMove(ev);
    };
    // Scrolling (unrelated to auto-scroll)
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.handleTouchScroll = function (ev) {
        // if the drag is being initiated by touch, but a scroll happens before
        // the drag-initiating delay is over, cancel the drag
        if (!this.isDragging || this.scrollAlwaysKills) {
            this.endInteraction(ev, true); // isCancelled=true
        }
    };
    // Utils
    // -----------------------------------------------------------------------------------------------------------------
    // Triggers a callback. Calls a function in the option hash of the same name.
    // Arguments beyond the first `name` are forwarded on.
    DragListener.prototype.trigger = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.options[name]) {
            this.options[name].apply(this, args);
        }
        // makes _methods callable by event name. TODO: kill this
        if (this['_' + name]) {
            this['_' + name].apply(this, args);
        }
    };
    // Auto-scroll
    // -----------------------------------------------------------------------------------------------------------------
    DragListener.prototype.initAutoScroll = function () {
        var scrollEl = this.scrollEl;
        this.isAutoScroll =
            this.options.scroll &&
                scrollEl &&
                !scrollEl.is(window) &&
                !scrollEl.is(document);
        if (this.isAutoScroll) {
            // debounce makes sure rapid calls don't happen
            this.listenTo(scrollEl, 'scroll', util_1.debounce(this.handleDebouncedScroll, 100));
        }
    };
    DragListener.prototype.destroyAutoScroll = function () {
        this.endAutoScroll(); // kill any animation loop
        // remove the scroll handler if there is a scrollEl
        if (this.isAutoScroll) {
            this.stopListeningTo(this.scrollEl, 'scroll'); // will probably get removed by unbindHandlers too :(
        }
    };
    // Computes and stores the bounding rectangle of scrollEl
    DragListener.prototype.computeScrollBounds = function () {
        if (this.isAutoScroll) {
            this.scrollBounds = util_1.getOuterRect(this.scrollEl);
            // TODO: use getClientRect in future. but prevents auto scrolling when on top of scrollbars
        }
    };
    // Called when the dragging is in progress and scrolling should be updated
    DragListener.prototype.updateAutoScroll = function (ev) {
        var sensitivity = this.scrollSensitivity;
        var bounds = this.scrollBounds;
        var topCloseness;
        var bottomCloseness;
        var leftCloseness;
        var rightCloseness;
        var topVel = 0;
        var leftVel = 0;
        if (bounds) {
            // compute closeness to edges. valid range is from 0.0 - 1.0
            topCloseness = (sensitivity - (util_1.getEvY(ev) - bounds.top)) / sensitivity;
            bottomCloseness = (sensitivity - (bounds.bottom - util_1.getEvY(ev))) / sensitivity;
            leftCloseness = (sensitivity - (util_1.getEvX(ev) - bounds.left)) / sensitivity;
            rightCloseness = (sensitivity - (bounds.right - util_1.getEvX(ev))) / sensitivity;
            // translate vertical closeness into velocity.
            // mouse must be completely in bounds for velocity to happen.
            if (topCloseness >= 0 && topCloseness <= 1) {
                topVel = topCloseness * this.scrollSpeed * -1; // negative. for scrolling up
            }
            else if (bottomCloseness >= 0 && bottomCloseness <= 1) {
                topVel = bottomCloseness * this.scrollSpeed;
            }
            // translate horizontal closeness into velocity
            if (leftCloseness >= 0 && leftCloseness <= 1) {
                leftVel = leftCloseness * this.scrollSpeed * -1; // negative. for scrolling left
            }
            else if (rightCloseness >= 0 && rightCloseness <= 1) {
                leftVel = rightCloseness * this.scrollSpeed;
            }
        }
        this.setScrollVel(topVel, leftVel);
    };
    // Sets the speed-of-scrolling for the scrollEl
    DragListener.prototype.setScrollVel = function (topVel, leftVel) {
        this.scrollTopVel = topVel;
        this.scrollLeftVel = leftVel;
        this.constrainScrollVel(); // massages into realistic values
        // if there is non-zero velocity, and an animation loop hasn't already started, then START
        if ((this.scrollTopVel || this.scrollLeftVel) && !this.scrollIntervalId) {
            this.scrollIntervalId = setInterval(util_1.proxy(this, 'scrollIntervalFunc'), // scope to `this`
            this.scrollIntervalMs);
        }
    };
    // Forces scrollTopVel and scrollLeftVel to be zero if scrolling has already gone all the way
    DragListener.prototype.constrainScrollVel = function () {
        var el = this.scrollEl;
        if (this.scrollTopVel < 0) {
            if (el.scrollTop() <= 0) {
                this.scrollTopVel = 0;
            }
        }
        else if (this.scrollTopVel > 0) {
            if (el.scrollTop() + el[0].clientHeight >= el[0].scrollHeight) {
                this.scrollTopVel = 0;
            }
        }
        if (this.scrollLeftVel < 0) {
            if (el.scrollLeft() <= 0) {
                this.scrollLeftVel = 0;
            }
        }
        else if (this.scrollLeftVel > 0) {
            if (el.scrollLeft() + el[0].clientWidth >= el[0].scrollWidth) {
                this.scrollLeftVel = 0;
            }
        }
    };
    // This function gets called during every iteration of the scrolling animation loop
    DragListener.prototype.scrollIntervalFunc = function () {
        var el = this.scrollEl;
        var frac = this.scrollIntervalMs / 1000; // considering animation frequency, what the vel should be mult'd by
        // change the value of scrollEl's scroll
        if (this.scrollTopVel) {
            el.scrollTop(el.scrollTop() + this.scrollTopVel * frac);
        }
        if (this.scrollLeftVel) {
            el.scrollLeft(el.scrollLeft() + this.scrollLeftVel * frac);
        }
        this.constrainScrollVel(); // since the scroll values changed, recompute the velocities
        // if scrolled all the way, which causes the vels to be zero, stop the animation loop
        if (!this.scrollTopVel && !this.scrollLeftVel) {
            this.endAutoScroll();
        }
    };
    // Kills any existing scrolling animation loop
    DragListener.prototype.endAutoScroll = function () {
        if (this.scrollIntervalId) {
            clearInterval(this.scrollIntervalId);
            this.scrollIntervalId = null;
            this.handleScrollEnd();
        }
    };
    // Get called when the scrollEl is scrolled (NOTE: this is delayed via debounce)
    DragListener.prototype.handleDebouncedScroll = function () {
        // recompute all coordinates, but *only* if this is *not* part of our scrolling animation
        if (!this.scrollIntervalId) {
            this.handleScrollEnd();
        }
    };
    DragListener.prototype.handleScrollEnd = function () {
        // Called when scrolling has stopped, whether through auto scroll, or the user scrolling
    };
    return DragListener;
}());
exports.default = DragListener;
ListenerMixin_1.default.mixInto(DragListener);


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
var Mixin_1 = __webpack_require__(14);
/*
A set of rendering and date-related methods for a visual component comprised of one or more rows of day columns.
Prerequisite: the object being mixed into needs to be a *Grid*
*/
var DayTableMixin = /** @class */ (function (_super) {
    tslib_1.__extends(DayTableMixin, _super);
    function DayTableMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Populates internal variables used for date calculation and rendering
    DayTableMixin.prototype.updateDayTable = function () {
        var t = this;
        var view = t.view;
        var calendar = view.calendar;
        var date = calendar.msToUtcMoment(t.dateProfile.renderUnzonedRange.startMs, true);
        var end = calendar.msToUtcMoment(t.dateProfile.renderUnzonedRange.endMs, true);
        var dayIndex = -1;
        var dayIndices = [];
        var dayDates = [];
        var daysPerRow;
        var firstDay;
        var rowCnt;
        while (date.isBefore(end)) {
            if (view.isHiddenDay(date)) {
                dayIndices.push(dayIndex + 0.5); // mark that it's between indices
            }
            else {
                dayIndex++;
                dayIndices.push(dayIndex);
                dayDates.push(date.clone());
            }
            date.add(1, 'days');
        }
        if (this.breakOnWeeks) {
            // count columns until the day-of-week repeats
            firstDay = dayDates[0].day();
            for (daysPerRow = 1; daysPerRow < dayDates.length; daysPerRow++) {
                if (dayDates[daysPerRow].day() === firstDay) {
                    break;
                }
            }
            rowCnt = Math.ceil(dayDates.length / daysPerRow);
        }
        else {
            rowCnt = 1;
            daysPerRow = dayDates.length;
        }
        this.dayDates = dayDates;
        this.dayIndices = dayIndices;
        this.daysPerRow = daysPerRow;
        this.rowCnt = rowCnt;
        this.updateDayTableCols();
    };
    // Computes and assigned the colCnt property and updates any options that may be computed from it
    DayTableMixin.prototype.updateDayTableCols = function () {
        this.colCnt = this.computeColCnt();
        this.colHeadFormat =
            this.opt('columnHeaderFormat') ||
                this.opt('columnFormat') || // deprecated
                this.computeColHeadFormat();
    };
    // Determines how many columns there should be in the table
    DayTableMixin.prototype.computeColCnt = function () {
        return this.daysPerRow;
    };
    // Computes the ambiguously-timed moment for the given cell
    DayTableMixin.prototype.getCellDate = function (row, col) {
        return this.dayDates[this.getCellDayIndex(row, col)].clone();
    };
    // Computes the ambiguously-timed date range for the given cell
    DayTableMixin.prototype.getCellRange = function (row, col) {
        var start = this.getCellDate(row, col);
        var end = start.clone().add(1, 'days');
        return { start: start, end: end };
    };
    // Returns the number of day cells, chronologically, from the first of the grid (0-based)
    DayTableMixin.prototype.getCellDayIndex = function (row, col) {
        return row * this.daysPerRow + this.getColDayIndex(col);
    };
    // Returns the numner of day cells, chronologically, from the first cell in *any given row*
    DayTableMixin.prototype.getColDayIndex = function (col) {
        if (this.isRTL) {
            return this.colCnt - 1 - col;
        }
        else {
            return col;
        }
    };
    // Given a date, returns its chronolocial cell-index from the first cell of the grid.
    // If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
    // If before the first offset, returns a negative number.
    // If after the last offset, returns an offset past the last cell offset.
    // Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
    DayTableMixin.prototype.getDateDayIndex = function (date) {
        var dayIndices = this.dayIndices;
        var dayOffset = date.diff(this.dayDates[0], 'days');
        if (dayOffset < 0) {
            return dayIndices[0] - 1;
        }
        else if (dayOffset >= dayIndices.length) {
            return dayIndices[dayIndices.length - 1] + 1;
        }
        else {
            return dayIndices[dayOffset];
        }
    };
    /* Options
    ------------------------------------------------------------------------------------------------------------------*/
    // Computes a default column header formatting string if `colFormat` is not explicitly defined
    DayTableMixin.prototype.computeColHeadFormat = function () {
        // if more than one week row, or if there are a lot of columns with not much space,
        // put just the day numbers will be in each cell
        if (this.rowCnt > 1 || this.colCnt > 10) {
            return 'ddd'; // "Sat"
        }
        else if (this.colCnt > 1) {
            return this.opt('dayOfMonthFormat'); // "Sat 12/10"
        }
        else {
            return 'dddd'; // "Saturday"
        }
    };
    /* Slicing
    ------------------------------------------------------------------------------------------------------------------*/
    // Slices up a date range into a segment for every week-row it intersects with
    DayTableMixin.prototype.sliceRangeByRow = function (unzonedRange) {
        var daysPerRow = this.daysPerRow;
        var normalRange = this.view.computeDayRange(unzonedRange); // make whole-day range, considering nextDayThreshold
        var rangeFirst = this.getDateDayIndex(normalRange.start); // inclusive first index
        var rangeLast = this.getDateDayIndex(normalRange.end.clone().subtract(1, 'days')); // inclusive last index
        var segs = [];
        var row;
        var rowFirst;
        var rowLast; // inclusive day-index range for current row
        var segFirst;
        var segLast; // inclusive day-index range for segment
        for (row = 0; row < this.rowCnt; row++) {
            rowFirst = row * daysPerRow;
            rowLast = rowFirst + daysPerRow - 1;
            // intersect segment's offset range with the row's
            segFirst = Math.max(rangeFirst, rowFirst);
            segLast = Math.min(rangeLast, rowLast);
            // deal with in-between indices
            segFirst = Math.ceil(segFirst); // in-between starts round to next cell
            segLast = Math.floor(segLast); // in-between ends round to prev cell
            if (segFirst <= segLast) {
                segs.push({
                    row: row,
                    // normalize to start of row
                    firstRowDayIndex: segFirst - rowFirst,
                    lastRowDayIndex: segLast - rowFirst,
                    // must be matching integers to be the segment's start/end
                    isStart: segFirst === rangeFirst,
                    isEnd: segLast === rangeLast
                });
            }
        }
        return segs;
    };
    // Slices up a date range into a segment for every day-cell it intersects with.
    // TODO: make more DRY with sliceRangeByRow somehow.
    DayTableMixin.prototype.sliceRangeByDay = function (unzonedRange) {
        var daysPerRow = this.daysPerRow;
        var normalRange = this.view.computeDayRange(unzonedRange); // make whole-day range, considering nextDayThreshold
        var rangeFirst = this.getDateDayIndex(normalRange.start); // inclusive first index
        var rangeLast = this.getDateDayIndex(normalRange.end.clone().subtract(1, 'days')); // inclusive last index
        var segs = [];
        var row;
        var rowFirst;
        var rowLast; // inclusive day-index range for current row
        var i;
        var segFirst;
        var segLast; // inclusive day-index range for segment
        for (row = 0; row < this.rowCnt; row++) {
            rowFirst = row * daysPerRow;
            rowLast = rowFirst + daysPerRow - 1;
            for (i = rowFirst; i <= rowLast; i++) {
                // intersect segment's offset range with the row's
                segFirst = Math.max(rangeFirst, i);
                segLast = Math.min(rangeLast, i);
                // deal with in-between indices
                segFirst = Math.ceil(segFirst); // in-between starts round to next cell
                segLast = Math.floor(segLast); // in-between ends round to prev cell
                if (segFirst <= segLast) {
                    segs.push({
                        row: row,
                        // normalize to start of row
                        firstRowDayIndex: segFirst - rowFirst,
                        lastRowDayIndex: segLast - rowFirst,
                        // must be matching integers to be the segment's start/end
                        isStart: segFirst === rangeFirst,
                        isEnd: segLast === rangeLast
                    });
                }
            }
        }
        return segs;
    };
    /* Header Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayTableMixin.prototype.renderHeadHtml = function () {
        var theme = this.view.calendar.theme;
        return '' +
            '<div class="fc-row ' + theme.getClass('headerRow') + '">' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            '<thead>' +
            this.renderHeadTrHtml() +
            '</thead>' +
            '</table>' +
            '</div>';
    };
    DayTableMixin.prototype.renderHeadIntroHtml = function () {
        return this.renderIntroHtml(); // fall back to generic
    };
    DayTableMixin.prototype.renderHeadTrHtml = function () {
        return '' +
            '<tr>' +
            (this.isRTL ? '' : this.renderHeadIntroHtml()) +
            this.renderHeadDateCellsHtml() +
            (this.isRTL ? this.renderHeadIntroHtml() : '') +
            '</tr>';
    };
    DayTableMixin.prototype.renderHeadDateCellsHtml = function () {
        var htmls = [];
        var col;
        var date;
        for (col = 0; col < this.colCnt; col++) {
            date = this.getCellDate(0, col);
            htmls.push(this.renderHeadDateCellHtml(date));
        }
        return htmls.join('');
    };
    // TODO: when internalApiVersion, accept an object for HTML attributes
    // (colspan should be no different)
    DayTableMixin.prototype.renderHeadDateCellHtml = function (date, colspan, otherAttrs) {
        var t = this;
        var view = t.view;
        var isDateValid = t.dateProfile.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
        var classNames = [
            'fc-day-header',
            view.calendar.theme.getClass('widgetHeader')
        ];
        var innerHtml;
        if (typeof t.opt('columnHeaderHtml') === 'function') {
            innerHtml = t.opt('columnHeaderHtml')(date);
        }
        else if (typeof t.opt('columnHeaderText') === 'function') {
            innerHtml = util_1.htmlEscape(t.opt('columnHeaderText')(date));
        }
        else {
            innerHtml = util_1.htmlEscape(date.format(t.colHeadFormat));
        }
        // if only one row of days, the classNames on the header can represent the specific days beneath
        if (t.rowCnt === 1) {
            classNames = classNames.concat(
            // includes the day-of-week class
            // noThemeHighlight=true (don't highlight the header)
            t.getDayClasses(date, true));
        }
        else {
            classNames.push('fc-' + util_1.dayIDs[date.day()]); // only add the day-of-week class
        }
        return '' +
            '<th class="' + classNames.join(' ') + '"' +
            ((isDateValid && t.rowCnt) === 1 ?
                ' data-date="' + date.format('YYYY-MM-DD') + '"' :
                '') +
            (colspan > 1 ?
                ' colspan="' + colspan + '"' :
                '') +
            (otherAttrs ?
                ' ' + otherAttrs :
                '') +
            '>' +
            (isDateValid ?
                // don't make a link if the heading could represent multiple days, or if there's only one day (forceOff)
                view.buildGotoAnchorHtml({ date: date, forceOff: t.rowCnt > 1 || t.colCnt === 1 }, innerHtml) :
                // if not valid, display text, but no link
                innerHtml) +
            '</th>';
    };
    /* Background Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayTableMixin.prototype.renderBgTrHtml = function (row) {
        return '' +
            '<tr>' +
            (this.isRTL ? '' : this.renderBgIntroHtml(row)) +
            this.renderBgCellsHtml(row) +
            (this.isRTL ? this.renderBgIntroHtml(row) : '') +
            '</tr>';
    };
    DayTableMixin.prototype.renderBgIntroHtml = function (row) {
        return this.renderIntroHtml(); // fall back to generic
    };
    DayTableMixin.prototype.renderBgCellsHtml = function (row) {
        var htmls = [];
        var col;
        var date;
        for (col = 0; col < this.colCnt; col++) {
            date = this.getCellDate(row, col);
            htmls.push(this.renderBgCellHtml(date));
        }
        return htmls.join('');
    };
    DayTableMixin.prototype.renderBgCellHtml = function (date, otherAttrs) {
        var t = this;
        var view = t.view;
        var isDateValid = t.dateProfile.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
        var classes = t.getDayClasses(date);
        classes.unshift('fc-day', view.calendar.theme.getClass('widgetContent'));
        return '<td class="' + classes.join(' ') + '"' +
            (isDateValid ?
                ' data-date="' + date.format('YYYY-MM-DD') + '"' : // if date has a time, won't format it
                '') +
            (otherAttrs ?
                ' ' + otherAttrs :
                '') +
            '></td>';
    };
    /* Generic
    ------------------------------------------------------------------------------------------------------------------*/
    DayTableMixin.prototype.renderIntroHtml = function () {
        // Generates the default HTML intro for any row. User classes should override
    };
    // TODO: a generic method for dealing with <tr>, RTL, intro
    // when increment internalApiVersion
    // wrapTr (scheduler)
    /* Utils
    ------------------------------------------------------------------------------------------------------------------*/
    // Applies the generic "intro" and "outro" HTML to the given cells.
    // Intro means the leftmost cell when the calendar is LTR and the rightmost cell when RTL. Vice-versa for outro.
    DayTableMixin.prototype.bookendCells = function (trEl) {
        var introHtml = this.renderIntroHtml();
        if (introHtml) {
            if (this.isRTL) {
                trEl.append(introHtml);
            }
            else {
                trEl.prepend(introHtml);
            }
        }
    };
    return DayTableMixin;
}(Mixin_1.default));
exports.default = DayTableMixin;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var BusinessHourRenderer = /** @class */ (function () {
    /*
    component implements:
      - eventRangesToEventFootprints
      - eventFootprintsToSegs
    */
    function BusinessHourRenderer(component, fillRenderer) {
        this.component = component;
        this.fillRenderer = fillRenderer;
    }
    BusinessHourRenderer.prototype.render = function (businessHourGenerator) {
        var component = this.component;
        var unzonedRange = component._getDateProfile().activeUnzonedRange;
        var eventInstanceGroup = businessHourGenerator.buildEventInstanceGroup(component.hasAllDayBusinessHours, unzonedRange);
        var eventFootprints = eventInstanceGroup ?
            component.eventRangesToEventFootprints(eventInstanceGroup.sliceRenderRanges(unzonedRange)) :
            [];
        this.renderEventFootprints(eventFootprints);
    };
    BusinessHourRenderer.prototype.renderEventFootprints = function (eventFootprints) {
        var segs = this.component.eventFootprintsToSegs(eventFootprints);
        this.renderSegs(segs);
        this.segs = segs;
    };
    BusinessHourRenderer.prototype.renderSegs = function (segs) {
        if (this.fillRenderer) {
            this.fillRenderer.renderSegs('businessHours', segs, {
                getClasses: function (seg) {
                    return ['fc-nonbusiness', 'fc-bgevent'];
                }
            });
        }
    };
    BusinessHourRenderer.prototype.unrender = function () {
        if (this.fillRenderer) {
            this.fillRenderer.unrender('businessHours');
        }
        this.segs = null;
    };
    BusinessHourRenderer.prototype.getSegs = function () {
        return this.segs || [];
    };
    return BusinessHourRenderer;
}());
exports.default = BusinessHourRenderer;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var FillRenderer = /** @class */ (function () {
    function FillRenderer(component) {
        this.fillSegTag = 'div';
        this.component = component;
        this.elsByFill = {};
    }
    FillRenderer.prototype.renderFootprint = function (type, componentFootprint, props) {
        this.renderSegs(type, this.component.componentFootprintToSegs(componentFootprint), props);
    };
    FillRenderer.prototype.renderSegs = function (type, segs, props) {
        var els;
        segs = this.buildSegEls(type, segs, props); // assignes `.el` to each seg. returns successfully rendered segs
        els = this.attachSegEls(type, segs);
        if (els) {
            this.reportEls(type, els);
        }
        return segs;
    };
    // Unrenders a specific type of fill that is currently rendered on the grid
    FillRenderer.prototype.unrender = function (type) {
        var el = this.elsByFill[type];
        if (el) {
            el.remove();
            delete this.elsByFill[type];
        }
    };
    // Renders and assigns an `el` property for each fill segment. Generic enough to work with different types.
    // Only returns segments that successfully rendered.
    FillRenderer.prototype.buildSegEls = function (type, segs, props) {
        var _this = this;
        var html = '';
        var renderedSegs = [];
        var i;
        if (segs.length) {
            // build a large concatenation of segment HTML
            for (i = 0; i < segs.length; i++) {
                html += this.buildSegHtml(type, segs[i], props);
            }
            // Grab individual elements from the combined HTML string. Use each as the default rendering.
            // Then, compute the 'el' for each segment.
            $(html).each(function (i, node) {
                var seg = segs[i];
                var el = $(node);
                // allow custom filter methods per-type
                if (props.filterEl) {
                    el = props.filterEl(seg, el);
                }
                if (el) {
                    el = $(el); // allow custom filter to return raw DOM node
                    // correct element type? (would be bad if a non-TD were inserted into a table for example)
                    if (el.is(_this.fillSegTag)) {
                        seg.el = el;
                        renderedSegs.push(seg);
                    }
                }
            });
        }
        return renderedSegs;
    };
    // Builds the HTML needed for one fill segment. Generic enough to work with different types.
    FillRenderer.prototype.buildSegHtml = function (type, seg, props) {
        // custom hooks per-type
        var classes = props.getClasses ? props.getClasses(seg) : [];
        var css = util_1.cssToStr(props.getCss ? props.getCss(seg) : {});
        return '<' + this.fillSegTag +
            (classes.length ? ' class="' + classes.join(' ') + '"' : '') +
            (css ? ' style="' + css + '"' : '') +
            ' />';
    };
    // Should return wrapping DOM structure
    FillRenderer.prototype.attachSegEls = function (type, segs) {
        // subclasses must implement
    };
    FillRenderer.prototype.reportEls = function (type, nodes) {
        if (this.elsByFill[type]) {
            this.elsByFill[type] = this.elsByFill[type].add(nodes);
        }
        else {
            this.elsByFill[type] = $(nodes);
        }
    };
    return FillRenderer;
}());
exports.default = FillRenderer;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var SingleEventDef_1 = __webpack_require__(13);
var EventFootprint_1 = __webpack_require__(36);
var EventSource_1 = __webpack_require__(6);
var HelperRenderer = /** @class */ (function () {
    function HelperRenderer(component, eventRenderer) {
        this.view = component._getView();
        this.component = component;
        this.eventRenderer = eventRenderer;
    }
    HelperRenderer.prototype.renderComponentFootprint = function (componentFootprint) {
        this.renderEventFootprints([
            this.fabricateEventFootprint(componentFootprint)
        ]);
    };
    HelperRenderer.prototype.renderEventDraggingFootprints = function (eventFootprints, sourceSeg, isTouch) {
        this.renderEventFootprints(eventFootprints, sourceSeg, 'fc-dragging', isTouch ? null : this.view.opt('dragOpacity'));
    };
    HelperRenderer.prototype.renderEventResizingFootprints = function (eventFootprints, sourceSeg, isTouch) {
        this.renderEventFootprints(eventFootprints, sourceSeg, 'fc-resizing');
    };
    HelperRenderer.prototype.renderEventFootprints = function (eventFootprints, sourceSeg, extraClassNames, opacity) {
        var segs = this.component.eventFootprintsToSegs(eventFootprints);
        var classNames = 'fc-helper ' + (extraClassNames || '');
        var i;
        // assigns each seg's el and returns a subset of segs that were rendered
        segs = this.eventRenderer.renderFgSegEls(segs);
        for (i = 0; i < segs.length; i++) {
            segs[i].el.addClass(classNames);
        }
        if (opacity != null) {
            for (i = 0; i < segs.length; i++) {
                segs[i].el.css('opacity', opacity);
            }
        }
        this.helperEls = this.renderSegs(segs, sourceSeg);
    };
    /*
    Must return all mock event elements
    */
    HelperRenderer.prototype.renderSegs = function (segs, sourceSeg) {
        // Subclasses must implement
    };
    HelperRenderer.prototype.unrender = function () {
        if (this.helperEls) {
            this.helperEls.remove();
            this.helperEls = null;
        }
    };
    HelperRenderer.prototype.fabricateEventFootprint = function (componentFootprint) {
        var calendar = this.view.calendar;
        var eventDateProfile = calendar.footprintToDateProfile(componentFootprint);
        var dummyEvent = new SingleEventDef_1.default(new EventSource_1.default(calendar));
        var dummyInstance;
        dummyEvent.dateProfile = eventDateProfile;
        dummyInstance = dummyEvent.buildInstance();
        return new EventFootprint_1.default(componentFootprint, dummyEvent, dummyInstance);
    };
    return HelperRenderer;
}());
exports.default = HelperRenderer;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var GlobalEmitter_1 = __webpack_require__(21);
var Interaction_1 = __webpack_require__(15);
var EventPointing = /** @class */ (function (_super) {
    tslib_1.__extends(EventPointing, _super);
    function EventPointing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    component must implement:
      - publiclyTrigger
    */
    EventPointing.prototype.bindToEl = function (el) {
        var component = this.component;
        component.bindSegHandlerToEl(el, 'click', this.handleClick.bind(this));
        component.bindSegHandlerToEl(el, 'mouseenter', this.handleMouseover.bind(this));
        component.bindSegHandlerToEl(el, 'mouseleave', this.handleMouseout.bind(this));
    };
    EventPointing.prototype.handleClick = function (seg, ev) {
        var res = this.component.publiclyTrigger('eventClick', {
            context: seg.el[0],
            args: [seg.footprint.getEventLegacy(), ev, this.view]
        });
        if (res === false) {
            ev.preventDefault();
        }
    };
    // Updates internal state and triggers handlers for when an event element is moused over
    EventPointing.prototype.handleMouseover = function (seg, ev) {
        if (!GlobalEmitter_1.default.get().shouldIgnoreMouse() &&
            !this.mousedOverSeg) {
            this.mousedOverSeg = seg;
            // TODO: move to EventSelecting's responsibility
            if (this.view.isEventDefResizable(seg.footprint.eventDef)) {
                seg.el.addClass('fc-allow-mouse-resize');
            }
            this.component.publiclyTrigger('eventMouseover', {
                context: seg.el[0],
                args: [seg.footprint.getEventLegacy(), ev, this.view]
            });
        }
    };
    // Updates internal state and triggers handlers for when an event element is moused out.
    // Can be given no arguments, in which case it will mouseout the segment that was previously moused over.
    EventPointing.prototype.handleMouseout = function (seg, ev) {
        if (this.mousedOverSeg) {
            this.mousedOverSeg = null;
            // TODO: move to EventSelecting's responsibility
            if (this.view.isEventDefResizable(seg.footprint.eventDef)) {
                seg.el.removeClass('fc-allow-mouse-resize');
            }
            this.component.publiclyTrigger('eventMouseout', {
                context: seg.el[0],
                args: [
                    seg.footprint.getEventLegacy(),
                    ev || {},
                    this.view
                ]
            });
        }
    };
    EventPointing.prototype.end = function () {
        if (this.mousedOverSeg) {
            this.handleMouseout(this.mousedOverSeg);
        }
    };
    return EventPointing;
}(Interaction_1.default));
exports.default = EventPointing;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var Mixin_1 = __webpack_require__(14);
var DateClicking_1 = __webpack_require__(245);
var DateSelecting_1 = __webpack_require__(225);
var EventPointing_1 = __webpack_require__(59);
var EventDragging_1 = __webpack_require__(224);
var EventResizing_1 = __webpack_require__(223);
var ExternalDropping_1 = __webpack_require__(222);
var StandardInteractionsMixin = /** @class */ (function (_super) {
    tslib_1.__extends(StandardInteractionsMixin, _super);
    function StandardInteractionsMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StandardInteractionsMixin;
}(Mixin_1.default));
exports.default = StandardInteractionsMixin;
StandardInteractionsMixin.prototype.dateClickingClass = DateClicking_1.default;
StandardInteractionsMixin.prototype.dateSelectingClass = DateSelecting_1.default;
StandardInteractionsMixin.prototype.eventPointingClass = EventPointing_1.default;
StandardInteractionsMixin.prototype.eventDraggingClass = EventDragging_1.default;
StandardInteractionsMixin.prototype.eventResizingClass = EventResizing_1.default;
StandardInteractionsMixin.prototype.externalDroppingClass = ExternalDropping_1.default;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var CoordCache_1 = __webpack_require__(53);
var Popover_1 = __webpack_require__(249);
var UnzonedRange_1 = __webpack_require__(5);
var ComponentFootprint_1 = __webpack_require__(12);
var EventFootprint_1 = __webpack_require__(36);
var BusinessHourRenderer_1 = __webpack_require__(56);
var StandardInteractionsMixin_1 = __webpack_require__(60);
var InteractiveDateComponent_1 = __webpack_require__(40);
var DayTableMixin_1 = __webpack_require__(55);
var DayGridEventRenderer_1 = __webpack_require__(250);
var DayGridHelperRenderer_1 = __webpack_require__(251);
var DayGridFillRenderer_1 = __webpack_require__(252);
/* A component that renders a grid of whole-days that runs horizontally. There can be multiple rows, one per week.
----------------------------------------------------------------------------------------------------------------------*/
var DayGrid = /** @class */ (function (_super) {
    tslib_1.__extends(DayGrid, _super);
    function DayGrid(view) {
        var _this = _super.call(this, view) || this;
        _this.cellWeekNumbersVisible = false; // display week numbers in day cell?
        _this.bottomCoordPadding = 0; // hack for extending the hit area for the last row of the coordinate grid
        // isRigid determines whether the individual rows should ignore the contents and be a constant height.
        // Relies on the view's colCnt and rowCnt. In the future, this component should probably be self-sufficient.
        _this.isRigid = false;
        _this.hasAllDayBusinessHours = true;
        return _this;
    }
    // Slices up the given span (unzoned start/end with other misc data) into an array of segments
    DayGrid.prototype.componentFootprintToSegs = function (componentFootprint) {
        var segs = this.sliceRangeByRow(componentFootprint.unzonedRange);
        var i;
        var seg;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            if (this.isRTL) {
                seg.leftCol = this.daysPerRow - 1 - seg.lastRowDayIndex;
                seg.rightCol = this.daysPerRow - 1 - seg.firstRowDayIndex;
            }
            else {
                seg.leftCol = seg.firstRowDayIndex;
                seg.rightCol = seg.lastRowDayIndex;
            }
        }
        return segs;
    };
    /* Date Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.renderDates = function (dateProfile) {
        this.dateProfile = dateProfile;
        this.updateDayTable();
        this.renderGrid();
    };
    DayGrid.prototype.unrenderDates = function () {
        this.removeSegPopover();
    };
    // Renders the rows and columns into the component's `this.el`, which should already be assigned.
    DayGrid.prototype.renderGrid = function () {
        var view = this.view;
        var rowCnt = this.rowCnt;
        var colCnt = this.colCnt;
        var html = '';
        var row;
        var col;
        if (this.headContainerEl) {
            this.headContainerEl.html(this.renderHeadHtml());
        }
        for (row = 0; row < rowCnt; row++) {
            html += this.renderDayRowHtml(row, this.isRigid);
        }
        this.el.html(html);
        this.rowEls = this.el.find('.fc-row');
        this.cellEls = this.el.find('.fc-day, .fc-disabled-day');
        this.rowCoordCache = new CoordCache_1.default({
            els: this.rowEls,
            isVertical: true
        });
        this.colCoordCache = new CoordCache_1.default({
            els: this.cellEls.slice(0, this.colCnt),
            isHorizontal: true
        });
        // trigger dayRender with each cell's element
        for (row = 0; row < rowCnt; row++) {
            for (col = 0; col < colCnt; col++) {
                this.publiclyTrigger('dayRender', {
                    context: view,
                    args: [
                        this.getCellDate(row, col),
                        this.getCellEl(row, col),
                        view
                    ]
                });
            }
        }
    };
    // Generates the HTML for a single row, which is a div that wraps a table.
    // `row` is the row number.
    DayGrid.prototype.renderDayRowHtml = function (row, isRigid) {
        var theme = this.view.calendar.theme;
        var classes = ['fc-row', 'fc-week', theme.getClass('dayRow')];
        if (isRigid) {
            classes.push('fc-rigid');
        }
        return '' +
            '<div class="' + classes.join(' ') + '">' +
            '<div class="fc-bg">' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            this.renderBgTrHtml(row) +
            '</table>' +
            '</div>' +
            '<div class="fc-content-skeleton">' +
            '<table>' +
            (this.getIsNumbersVisible() ?
                '<thead>' +
                    this.renderNumberTrHtml(row) +
                    '</thead>' :
                '') +
            '</table>' +
            '</div>' +
            '</div>';
    };
    DayGrid.prototype.getIsNumbersVisible = function () {
        return this.getIsDayNumbersVisible() || this.cellWeekNumbersVisible;
    };
    DayGrid.prototype.getIsDayNumbersVisible = function () {
        return this.rowCnt > 1;
    };
    /* Grid Number Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.renderNumberTrHtml = function (row) {
        return '' +
            '<tr>' +
            (this.isRTL ? '' : this.renderNumberIntroHtml(row)) +
            this.renderNumberCellsHtml(row) +
            (this.isRTL ? this.renderNumberIntroHtml(row) : '') +
            '</tr>';
    };
    DayGrid.prototype.renderNumberIntroHtml = function (row) {
        return this.renderIntroHtml();
    };
    DayGrid.prototype.renderNumberCellsHtml = function (row) {
        var htmls = [];
        var col;
        var date;
        for (col = 0; col < this.colCnt; col++) {
            date = this.getCellDate(row, col);
            htmls.push(this.renderNumberCellHtml(date));
        }
        return htmls.join('');
    };
    // Generates the HTML for the <td>s of the "number" row in the DayGrid's content skeleton.
    // The number row will only exist if either day numbers or week numbers are turned on.
    DayGrid.prototype.renderNumberCellHtml = function (date) {
        var view = this.view;
        var html = '';
        var isDateValid = this.dateProfile.activeUnzonedRange.containsDate(date); // TODO: called too frequently. cache somehow.
        var isDayNumberVisible = this.getIsDayNumbersVisible() && isDateValid;
        var classes;
        var weekCalcFirstDoW;
        if (!isDayNumberVisible && !this.cellWeekNumbersVisible) {
            // no numbers in day cell (week number must be along the side)
            return '<td/>'; //  will create an empty space above events :(
        }
        classes = this.getDayClasses(date);
        classes.unshift('fc-day-top');
        if (this.cellWeekNumbersVisible) {
            // To determine the day of week number change under ISO, we cannot
            // rely on moment.js methods such as firstDayOfWeek() or weekday(),
            // because they rely on the locale's dow (possibly overridden by
            // our firstDay option), which may not be Monday. We cannot change
            // dow, because that would affect the calendar start day as well.
            if (date._locale._fullCalendar_weekCalc === 'ISO') {
                weekCalcFirstDoW = 1; // Monday by ISO 8601 definition
            }
            else {
                weekCalcFirstDoW = date._locale.firstDayOfWeek();
            }
        }
        html += '<td class="' + classes.join(' ') + '"' +
            (isDateValid ?
                ' data-date="' + date.format() + '"' :
                '') +
            '>';
        if (this.cellWeekNumbersVisible && (date.day() === weekCalcFirstDoW)) {
            html += view.buildGotoAnchorHtml({ date: date, type: 'week' }, { 'class': 'fc-week-number' }, date.format('w') // inner HTML
            );
        }
        if (isDayNumberVisible) {
            html += view.buildGotoAnchorHtml(date, { 'class': 'fc-day-number' }, date.format('D') // inner HTML
            );
        }
        html += '</td>';
        return html;
    };
    /* Hit System
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.prepareHits = function () {
        this.colCoordCache.build();
        this.rowCoordCache.build();
        this.rowCoordCache.bottoms[this.rowCnt - 1] += this.bottomCoordPadding; // hack
    };
    DayGrid.prototype.releaseHits = function () {
        this.colCoordCache.clear();
        this.rowCoordCache.clear();
    };
    DayGrid.prototype.queryHit = function (leftOffset, topOffset) {
        if (this.colCoordCache.isLeftInBounds(leftOffset) && this.rowCoordCache.isTopInBounds(topOffset)) {
            var col = this.colCoordCache.getHorizontalIndex(leftOffset);
            var row = this.rowCoordCache.getVerticalIndex(topOffset);
            if (row != null && col != null) {
                return this.getCellHit(row, col);
            }
        }
    };
    DayGrid.prototype.getHitFootprint = function (hit) {
        var range = this.getCellRange(hit.row, hit.col);
        return new ComponentFootprint_1.default(new UnzonedRange_1.default(range.start, range.end), true // all-day?
        );
    };
    DayGrid.prototype.getHitEl = function (hit) {
        return this.getCellEl(hit.row, hit.col);
    };
    /* Cell System
    ------------------------------------------------------------------------------------------------------------------*/
    // FYI: the first column is the leftmost column, regardless of date
    DayGrid.prototype.getCellHit = function (row, col) {
        return {
            row: row,
            col: col,
            component: this,
            left: this.colCoordCache.getLeftOffset(col),
            right: this.colCoordCache.getRightOffset(col),
            top: this.rowCoordCache.getTopOffset(row),
            bottom: this.rowCoordCache.getBottomOffset(row)
        };
    };
    DayGrid.prototype.getCellEl = function (row, col) {
        return this.cellEls.eq(row * this.colCnt + col);
    };
    /* Event Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    // Unrenders all events currently rendered on the grid
    DayGrid.prototype.executeEventUnrender = function () {
        this.removeSegPopover(); // removes the "more.." events popover
        _super.prototype.executeEventUnrender.call(this);
    };
    // Retrieves all rendered segment objects currently rendered on the grid
    DayGrid.prototype.getOwnEventSegs = function () {
        // append the segments from the "more..." popover
        return _super.prototype.getOwnEventSegs.call(this).concat(this.popoverSegs || []);
    };
    /* Event Drag Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders a visual indication of an event or external element being dragged.
    // `eventLocation` has zoned start and end (optional)
    DayGrid.prototype.renderDrag = function (eventFootprints, seg, isTouch) {
        var i;
        for (i = 0; i < eventFootprints.length; i++) {
            this.renderHighlight(eventFootprints[i].componentFootprint);
        }
        // render drags from OTHER components as helpers
        if (eventFootprints.length && seg && seg.component !== this) {
            this.helperRenderer.renderEventDraggingFootprints(eventFootprints, seg, isTouch);
            return true; // signal helpers rendered
        }
    };
    // Unrenders any visual indication of a hovering event
    DayGrid.prototype.unrenderDrag = function () {
        this.unrenderHighlight();
        this.helperRenderer.unrender();
    };
    /* Event Resize Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders a visual indication of an event being resized
    DayGrid.prototype.renderEventResize = function (eventFootprints, seg, isTouch) {
        var i;
        for (i = 0; i < eventFootprints.length; i++) {
            this.renderHighlight(eventFootprints[i].componentFootprint);
        }
        this.helperRenderer.renderEventResizingFootprints(eventFootprints, seg, isTouch);
    };
    // Unrenders a visual indication of an event being resized
    DayGrid.prototype.unrenderEventResize = function () {
        this.unrenderHighlight();
        this.helperRenderer.unrender();
    };
    /* More+ Link Popover
    ------------------------------------------------------------------------------------------------------------------*/
    DayGrid.prototype.removeSegPopover = function () {
        if (this.segPopover) {
            this.segPopover.hide(); // in handler, will call segPopover's removeElement
        }
    };
    // Limits the number of "levels" (vertically stacking layers of events) for each row of the grid.
    // `levelLimit` can be false (don't limit), a number, or true (should be computed).
    DayGrid.prototype.limitRows = function (levelLimit) {
        var rowStructs = this.eventRenderer.rowStructs || [];
        var row; // row #
        var rowLevelLimit;
        for (row = 0; row < rowStructs.length; row++) {
            this.unlimitRow(row);
            if (!levelLimit) {
                rowLevelLimit = false;
            }
            else if (typeof levelLimit === 'number') {
                rowLevelLimit = levelLimit;
            }
            else {
                rowLevelLimit = this.computeRowLevelLimit(row);
            }
            if (rowLevelLimit !== false) {
                this.limitRow(row, rowLevelLimit);
            }
        }
    };
    // Computes the number of levels a row will accomodate without going outside its bounds.
    // Assumes the row is "rigid" (maintains a constant height regardless of what is inside).
    // `row` is the row number.
    DayGrid.prototype.computeRowLevelLimit = function (row) {
        var rowEl = this.rowEls.eq(row); // the containing "fake" row div
        var rowHeight = rowEl.height(); // TODO: cache somehow?
        var trEls = this.eventRenderer.rowStructs[row].tbodyEl.children();
        var i;
        var trEl;
        var trHeight;
        function iterInnerHeights(i, childNode) {
            trHeight = Math.max(trHeight, $(childNode).outerHeight());
        }
        // Reveal one level <tr> at a time and stop when we find one out of bounds
        for (i = 0; i < trEls.length; i++) {
            trEl = trEls.eq(i).removeClass('fc-limited'); // reset to original state (reveal)
            // with rowspans>1 and IE8, trEl.outerHeight() would return the height of the largest cell,
            // so instead, find the tallest inner content element.
            trHeight = 0;
            trEl.find('> td > :first-child').each(iterInnerHeights);
            if (trEl.position().top + trHeight > rowHeight) {
                return i;
            }
        }
        return false; // should not limit at all
    };
    // Limits the given grid row to the maximum number of levels and injects "more" links if necessary.
    // `row` is the row number.
    // `levelLimit` is a number for the maximum (inclusive) number of levels allowed.
    DayGrid.prototype.limitRow = function (row, levelLimit) {
        var _this = this;
        var rowStruct = this.eventRenderer.rowStructs[row];
        var moreNodes = []; // array of "more" <a> links and <td> DOM nodes
        var col = 0; // col #, left-to-right (not chronologically)
        var levelSegs; // array of segment objects in the last allowable level, ordered left-to-right
        var cellMatrix; // a matrix (by level, then column) of all <td> jQuery elements in the row
        var limitedNodes; // array of temporarily hidden level <tr> and segment <td> DOM nodes
        var i;
        var seg;
        var segsBelow; // array of segment objects below `seg` in the current `col`
        var totalSegsBelow; // total number of segments below `seg` in any of the columns `seg` occupies
        var colSegsBelow; // array of segment arrays, below seg, one for each column (offset from segs's first column)
        var td;
        var rowspan;
        var segMoreNodes; // array of "more" <td> cells that will stand-in for the current seg's cell
        var j;
        var moreTd;
        var moreWrap;
        var moreLink;
        // Iterates through empty level cells and places "more" links inside if need be
        var emptyCellsUntil = function (endCol) {
            while (col < endCol) {
                segsBelow = _this.getCellSegs(row, col, levelLimit);
                if (segsBelow.length) {
                    td = cellMatrix[levelLimit - 1][col];
                    moreLink = _this.renderMoreLink(row, col, segsBelow);
                    moreWrap = $('<div/>').append(moreLink);
                    td.append(moreWrap);
                    moreNodes.push(moreWrap[0]);
                }
                col++;
            }
        };
        if (levelLimit && levelLimit < rowStruct.segLevels.length) {
            levelSegs = rowStruct.segLevels[levelLimit - 1];
            cellMatrix = rowStruct.cellMatrix;
            limitedNodes = rowStruct.tbodyEl.children().slice(levelLimit) // get level <tr> elements past the limit
                .addClass('fc-limited').get(); // hide elements and get a simple DOM-nodes array
            // iterate though segments in the last allowable level
            for (i = 0; i < levelSegs.length; i++) {
                seg = levelSegs[i];
                emptyCellsUntil(seg.leftCol); // process empty cells before the segment
                // determine *all* segments below `seg` that occupy the same columns
                colSegsBelow = [];
                totalSegsBelow = 0;
                while (col <= seg.rightCol) {
                    segsBelow = this.getCellSegs(row, col, levelLimit);
                    colSegsBelow.push(segsBelow);
                    totalSegsBelow += segsBelow.length;
                    col++;
                }
                if (totalSegsBelow) {
                    td = cellMatrix[levelLimit - 1][seg.leftCol]; // the segment's parent cell
                    rowspan = td.attr('rowspan') || 1;
                    segMoreNodes = [];
                    // make a replacement <td> for each column the segment occupies. will be one for each colspan
                    for (j = 0; j < colSegsBelow.length; j++) {
                        moreTd = $('<td class="fc-more-cell"/>').attr('rowspan', rowspan);
                        segsBelow = colSegsBelow[j];
                        moreLink = this.renderMoreLink(row, seg.leftCol + j, [seg].concat(segsBelow) // count seg as hidden too
                        );
                        moreWrap = $('<div/>').append(moreLink);
                        moreTd.append(moreWrap);
                        segMoreNodes.push(moreTd[0]);
                        moreNodes.push(moreTd[0]);
                    }
                    td.addClass('fc-limited').after($(segMoreNodes)); // hide original <td> and inject replacements
                    limitedNodes.push(td[0]);
                }
            }
            emptyCellsUntil(this.colCnt); // finish off the level
            rowStruct.moreEls = $(moreNodes); // for easy undoing later
            rowStruct.limitedEls = $(limitedNodes); // for easy undoing later
        }
    };
    // Reveals all levels and removes all "more"-related elements for a grid's row.
    // `row` is a row number.
    DayGrid.prototype.unlimitRow = function (row) {
        var rowStruct = this.eventRenderer.rowStructs[row];
        if (rowStruct.moreEls) {
            rowStruct.moreEls.remove();
            rowStruct.moreEls = null;
        }
        if (rowStruct.limitedEls) {
            rowStruct.limitedEls.removeClass('fc-limited');
            rowStruct.limitedEls = null;
        }
    };
    // Renders an <a> element that represents hidden event element for a cell.
    // Responsible for attaching click handler as well.
    DayGrid.prototype.renderMoreLink = function (row, col, hiddenSegs) {
        var _this = this;
        var view = this.view;
        return $('<a class="fc-more"/>')
            .text(this.getMoreLinkText(hiddenSegs.length))
            .on('click', function (ev) {
            var clickOption = _this.opt('eventLimitClick');
            var date = _this.getCellDate(row, col);
            var moreEl = $(ev.currentTarget);
            var dayEl = _this.getCellEl(row, col);
            var allSegs = _this.getCellSegs(row, col);
            // rescope the segments to be within the cell's date
            var reslicedAllSegs = _this.resliceDaySegs(allSegs, date);
            var reslicedHiddenSegs = _this.resliceDaySegs(hiddenSegs, date);
            if (typeof clickOption === 'function') {
                // the returned value can be an atomic option
                clickOption = _this.publiclyTrigger('eventLimitClick', {
                    context: view,
                    args: [
                        {
                            date: date.clone(),
                            dayEl: dayEl,
                            moreEl: moreEl,
                            segs: reslicedAllSegs,
                            hiddenSegs: reslicedHiddenSegs
                        },
                        ev,
                        view
                    ]
                });
            }
            if (clickOption === 'popover') {
                _this.showSegPopover(row, col, moreEl, reslicedAllSegs);
            }
            else if (typeof clickOption === 'string') {
                view.calendar.zoomTo(date, clickOption);
            }
        });
    };
    // Reveals the popover that displays all events within a cell
    DayGrid.prototype.showSegPopover = function (row, col, moreLink, segs) {
        var _this = this;
        var view = this.view;
        var moreWrap = moreLink.parent(); // the <div> wrapper around the <a>
        var topEl; // the element we want to match the top coordinate of
        var options;
        if (this.rowCnt === 1) {
            topEl = view.el; // will cause the popover to cover any sort of header
        }
        else {
            topEl = this.rowEls.eq(row); // will align with top of row
        }
        options = {
            className: 'fc-more-popover ' + view.calendar.theme.getClass('popover'),
            content: this.renderSegPopoverContent(row, col, segs),
            parentEl: view.el,
            top: topEl.offset().top,
            autoHide: true,
            viewportConstrain: this.opt('popoverViewportConstrain'),
            hide: function () {
                // kill everything when the popover is hidden
                // notify events to be removed
                if (_this.popoverSegs) {
                    _this.triggerBeforeEventSegsDestroyed(_this.popoverSegs);
                }
                _this.segPopover.removeElement();
                _this.segPopover = null;
                _this.popoverSegs = null;
            }
        };
        // Determine horizontal coordinate.
        // We use the moreWrap instead of the <td> to avoid border confusion.
        if (this.isRTL) {
            options.right = moreWrap.offset().left + moreWrap.outerWidth() + 1; // +1 to be over cell border
        }
        else {
            options.left = moreWrap.offset().left - 1; // -1 to be over cell border
        }
        this.segPopover = new Popover_1.default(options);
        this.segPopover.show();
        // the popover doesn't live within the grid's container element, and thus won't get the event
        // delegated-handlers for free. attach event-related handlers to the popover.
        this.bindAllSegHandlersToEl(this.segPopover.el);
        this.triggerAfterEventSegsRendered(segs);
    };
    // Builds the inner DOM contents of the segment popover
    DayGrid.prototype.renderSegPopoverContent = function (row, col, segs) {
        var view = this.view;
        var theme = view.calendar.theme;
        var title = this.getCellDate(row, col).format(this.opt('dayPopoverFormat'));
        var content = $('<div class="fc-header ' + theme.getClass('popoverHeader') + '">' +
            '<span class="fc-close ' + theme.getIconClass('close') + '"></span>' +
            '<span class="fc-title">' +
            util_1.htmlEscape(title) +
            '</span>' +
            '<div class="fc-clear"/>' +
            '</div>' +
            '<div class="fc-body ' + theme.getClass('popoverContent') + '">' +
            '<div class="fc-event-container"></div>' +
            '</div>');
        var segContainer = content.find('.fc-event-container');
        var i;
        // render each seg's `el` and only return the visible segs
        segs = this.eventRenderer.renderFgSegEls(segs, true); // disableResizing=true
        this.popoverSegs = segs;
        for (i = 0; i < segs.length; i++) {
            // because segments in the popover are not part of a grid coordinate system, provide a hint to any
            // grids that want to do drag-n-drop about which cell it came from
            this.hitsNeeded();
            segs[i].hit = this.getCellHit(row, col);
            this.hitsNotNeeded();
            segContainer.append(segs[i].el);
        }
        return content;
    };
    // Given the events within an array of segment objects, reslice them to be in a single day
    DayGrid.prototype.resliceDaySegs = function (segs, dayDate) {
        var dayStart = dayDate.clone();
        var dayEnd = dayStart.clone().add(1, 'days');
        var dayRange = new UnzonedRange_1.default(dayStart, dayEnd);
        var newSegs = [];
        var i;
        var seg;
        var slicedRange;
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            slicedRange = seg.footprint.componentFootprint.unzonedRange.intersect(dayRange);
            if (slicedRange) {
                newSegs.push($.extend({}, seg, {
                    footprint: new EventFootprint_1.default(new ComponentFootprint_1.default(slicedRange, seg.footprint.componentFootprint.isAllDay), seg.footprint.eventDef, seg.footprint.eventInstance),
                    isStart: seg.isStart && slicedRange.isStart,
                    isEnd: seg.isEnd && slicedRange.isEnd
                }));
            }
        }
        // force an order because eventsToSegs doesn't guarantee one
        // TODO: research if still needed
        this.eventRenderer.sortEventSegs(newSegs);
        return newSegs;
    };
    // Generates the text that should be inside a "more" link, given the number of events it represents
    DayGrid.prototype.getMoreLinkText = function (num) {
        var opt = this.opt('eventLimitText');
        if (typeof opt === 'function') {
            return opt(num);
        }
        else {
            return '+' + num + ' ' + opt;
        }
    };
    // Returns segments within a given cell.
    // If `startLevel` is specified, returns only events including and below that level. Otherwise returns all segs.
    DayGrid.prototype.getCellSegs = function (row, col, startLevel) {
        var segMatrix = this.eventRenderer.rowStructs[row].segMatrix;
        var level = startLevel || 0;
        var segs = [];
        var seg;
        while (level < segMatrix.length) {
            seg = segMatrix[level][col];
            if (seg) {
                segs.push(seg);
            }
            level++;
        }
        return segs;
    };
    return DayGrid;
}(InteractiveDateComponent_1.default));
exports.default = DayGrid;
DayGrid.prototype.eventRendererClass = DayGridEventRenderer_1.default;
DayGrid.prototype.businessHourRendererClass = BusinessHourRenderer_1.default;
DayGrid.prototype.helperRendererClass = DayGridHelperRenderer_1.default;
DayGrid.prototype.fillRendererClass = DayGridFillRenderer_1.default;
StandardInteractionsMixin_1.default.mixInto(DayGrid);
DayTableMixin_1.default.mixInto(DayGrid);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var Scroller_1 = __webpack_require__(39);
var View_1 = __webpack_require__(41);
var BasicViewDateProfileGenerator_1 = __webpack_require__(228);
var DayGrid_1 = __webpack_require__(61);
/* An abstract class for the "basic" views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.
var BasicView = /** @class */ (function (_super) {
    tslib_1.__extends(BasicView, _super);
    function BasicView(calendar, viewSpec) {
        var _this = _super.call(this, calendar, viewSpec) || this;
        _this.dayGrid = _this.instantiateDayGrid();
        _this.dayGrid.isRigid = _this.hasRigidRows();
        if (_this.opt('weekNumbers')) {
            if (_this.opt('weekNumbersWithinDays')) {
                _this.dayGrid.cellWeekNumbersVisible = true;
                _this.dayGrid.colWeekNumbersVisible = false;
            }
            else {
                _this.dayGrid.cellWeekNumbersVisible = false;
                _this.dayGrid.colWeekNumbersVisible = true;
            }
        }
        _this.addChild(_this.dayGrid);
        _this.scroller = new Scroller_1.default({
            overflowX: 'hidden',
            overflowY: 'auto'
        });
        return _this;
    }
    // Generates the DayGrid object this view needs. Draws from this.dayGridClass
    BasicView.prototype.instantiateDayGrid = function () {
        // generate a subclass on the fly with BasicView-specific behavior
        // TODO: cache this subclass
        var subclass = makeDayGridSubclass(this.dayGridClass);
        return new subclass(this);
    };
    BasicView.prototype.executeDateRender = function (dateProfile) {
        this.dayGrid.breakOnWeeks = /year|month|week/.test(dateProfile.currentRangeUnit);
        _super.prototype.executeDateRender.call(this, dateProfile);
    };
    BasicView.prototype.renderSkeleton = function () {
        var dayGridContainerEl;
        var dayGridEl;
        this.el.addClass('fc-basic-view').html(this.renderSkeletonHtml());
        this.scroller.render();
        dayGridContainerEl = this.scroller.el.addClass('fc-day-grid-container');
        dayGridEl = $('<div class="fc-day-grid" />').appendTo(dayGridContainerEl);
        this.el.find('.fc-body > tr > td').append(dayGridContainerEl);
        this.dayGrid.headContainerEl = this.el.find('.fc-head-container');
        this.dayGrid.setElement(dayGridEl);
    };
    BasicView.prototype.unrenderSkeleton = function () {
        this.dayGrid.removeElement();
        this.scroller.destroy();
    };
    // Builds the HTML skeleton for the view.
    // The day-grid component will render inside of a container defined by this HTML.
    BasicView.prototype.renderSkeletonHtml = function () {
        var theme = this.calendar.theme;
        return '' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            (this.opt('columnHeader') ?
                '<thead class="fc-head">' +
                    '<tr>' +
                    '<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
                    '</tr>' +
                    '</thead>' :
                '') +
            '<tbody class="fc-body">' +
            '<tr>' +
            '<td class="' + theme.getClass('widgetContent') + '"></td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';
    };
    // Generates an HTML attribute string for setting the width of the week number column, if it is known
    BasicView.prototype.weekNumberStyleAttr = function () {
        if (this.weekNumberWidth != null) {
            return 'style="width:' + this.weekNumberWidth + 'px"';
        }
        return '';
    };
    // Determines whether each row should have a constant height
    BasicView.prototype.hasRigidRows = function () {
        var eventLimit = this.opt('eventLimit');
        return eventLimit && typeof eventLimit !== 'number';
    };
    /* Dimensions
    ------------------------------------------------------------------------------------------------------------------*/
    // Refreshes the horizontal dimensions of the view
    BasicView.prototype.updateSize = function (totalHeight, isAuto, isResize) {
        var eventLimit = this.opt('eventLimit');
        var headRowEl = this.dayGrid.headContainerEl.find('.fc-row');
        var scrollerHeight;
        var scrollbarWidths;
        // hack to give the view some height prior to dayGrid's columns being rendered
        // TODO: separate setting height from scroller VS dayGrid.
        if (!this.dayGrid.rowEls) {
            if (!isAuto) {
                scrollerHeight = this.computeScrollerHeight(totalHeight);
                this.scroller.setHeight(scrollerHeight);
            }
            return;
        }
        _super.prototype.updateSize.call(this, totalHeight, isAuto, isResize);
        if (this.dayGrid.colWeekNumbersVisible) {
            // Make sure all week number cells running down the side have the same width.
            // Record the width for cells created later.
            this.weekNumberWidth = util_1.matchCellWidths(this.el.find('.fc-week-number'));
        }
        // reset all heights to be natural
        this.scroller.clear();
        util_1.uncompensateScroll(headRowEl);
        this.dayGrid.removeSegPopover(); // kill the "more" popover if displayed
        // is the event limit a constant level number?
        if (eventLimit && typeof eventLimit === 'number') {
            this.dayGrid.limitRows(eventLimit); // limit the levels first so the height can redistribute after
        }
        // distribute the height to the rows
        // (totalHeight is a "recommended" value if isAuto)
        scrollerHeight = this.computeScrollerHeight(totalHeight);
        this.setGridHeight(scrollerHeight, isAuto);
        // is the event limit dynamically calculated?
        if (eventLimit && typeof eventLimit !== 'number') {
            this.dayGrid.limitRows(eventLimit); // limit the levels after the grid's row heights have been set
        }
        if (!isAuto) {
            this.scroller.setHeight(scrollerHeight);
            scrollbarWidths = this.scroller.getScrollbarWidths();
            if (scrollbarWidths.left || scrollbarWidths.right) {
                util_1.compensateScroll(headRowEl, scrollbarWidths);
                // doing the scrollbar compensation might have created text overflow which created more height. redo
                scrollerHeight = this.computeScrollerHeight(totalHeight);
                this.scroller.setHeight(scrollerHeight);
            }
            // guarantees the same scrollbar widths
            this.scroller.lockOverflow(scrollbarWidths);
        }
    };
    // given a desired total height of the view, returns what the height of the scroller should be
    BasicView.prototype.computeScrollerHeight = function (totalHeight) {
        return totalHeight -
            util_1.subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
    };
    // Sets the height of just the DayGrid component in this view
    BasicView.prototype.setGridHeight = function (height, isAuto) {
        if (isAuto) {
            util_1.undistributeHeight(this.dayGrid.rowEls); // let the rows be their natural height with no expanding
        }
        else {
            util_1.distributeHeight(this.dayGrid.rowEls, height, true); // true = compensate for height-hogging rows
        }
    };
    /* Scroll
    ------------------------------------------------------------------------------------------------------------------*/
    BasicView.prototype.computeInitialDateScroll = function () {
        return { top: 0 };
    };
    BasicView.prototype.queryDateScroll = function () {
        return { top: this.scroller.getScrollTop() };
    };
    BasicView.prototype.applyDateScroll = function (scroll) {
        if (scroll.top !== undefined) {
            this.scroller.setScrollTop(scroll.top);
        }
    };
    return BasicView;
}(View_1.default));
exports.default = BasicView;
BasicView.prototype.dateProfileGeneratorClass = BasicViewDateProfileGenerator_1.default;
BasicView.prototype.dayGridClass = DayGrid_1.default;
// customize the rendering behavior of BasicView's dayGrid
function makeDayGridSubclass(SuperClass) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(SubClass, _super);
        function SubClass() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.colWeekNumbersVisible = false; // display week numbers along the side?
            return _this;
        }
        // Generates the HTML that will go before the day-of week header cells
        SubClass.prototype.renderHeadIntroHtml = function () {
            var view = this.view;
            if (this.colWeekNumbersVisible) {
                return '' +
                    '<th class="fc-week-number ' + view.calendar.theme.getClass('widgetHeader') + '" ' + view.weekNumberStyleAttr() + '>' +
                    '<span>' + // needed for matchCellWidths
                    util_1.htmlEscape(this.opt('weekNumberTitle')) +
                    '</span>' +
                    '</th>';
            }
            return '';
        };
        // Generates the HTML that will go before content-skeleton cells that display the day/week numbers
        SubClass.prototype.renderNumberIntroHtml = function (row) {
            var view = this.view;
            var weekStart = this.getCellDate(row, 0);
            if (this.colWeekNumbersVisible) {
                return '' +
                    '<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '>' +
                    view.buildGotoAnchorHtml(// aside from link, important for matchCellWidths
                    { date: weekStart, type: 'week', forceOff: this.colCnt === 1 }, weekStart.format('w') // inner HTML
                    ) +
                    '</td>';
            }
            return '';
        };
        // Generates the HTML that goes before the day bg cells for each day-row
        SubClass.prototype.renderBgIntroHtml = function () {
            var view = this.view;
            if (this.colWeekNumbersVisible) {
                return '<td class="fc-week-number ' + view.calendar.theme.getClass('widgetContent') + '" ' +
                    view.weekNumberStyleAttr() + '></td>';
            }
            return '';
        };
        // Generates the HTML that goes before every other type of row generated by DayGrid.
        // Affects helper-skeleton and highlight-skeleton rows.
        SubClass.prototype.renderIntroHtml = function () {
            var view = this.view;
            if (this.colWeekNumbersVisible) {
                return '<td class="fc-week-number" ' + view.weekNumberStyleAttr() + '></td>';
            }
            return '';
        };
        SubClass.prototype.getIsNumbersVisible = function () {
            return DayGrid_1.default.prototype.getIsNumbersVisible.apply(this, arguments) || this.colWeekNumbersVisible;
        };
        return SubClass;
    }(SuperClass));
}


/***/ }),
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var UnzonedRange_1 = __webpack_require__(5);
var ComponentFootprint_1 = __webpack_require__(12);
var EventDefParser_1 = __webpack_require__(49);
var EventSource_1 = __webpack_require__(6);
var util_1 = __webpack_require__(35);
var Constraints = /** @class */ (function () {
    function Constraints(eventManager, _calendar) {
        this.eventManager = eventManager;
        this._calendar = _calendar;
    }
    Constraints.prototype.opt = function (name) {
        return this._calendar.opt(name);
    };
    /*
    determines if eventInstanceGroup is allowed,
    in relation to other EVENTS and business hours.
    */
    Constraints.prototype.isEventInstanceGroupAllowed = function (eventInstanceGroup) {
        var eventDef = eventInstanceGroup.getEventDef();
        var eventFootprints = this.eventRangesToEventFootprints(eventInstanceGroup.getAllEventRanges());
        var i;
        var peerEventInstances = this.getPeerEventInstances(eventDef);
        var peerEventRanges = peerEventInstances.map(util_1.eventInstanceToEventRange);
        var peerEventFootprints = this.eventRangesToEventFootprints(peerEventRanges);
        var constraintVal = eventDef.getConstraint();
        var overlapVal = eventDef.getOverlap();
        var eventAllowFunc = this.opt('eventAllow');
        for (i = 0; i < eventFootprints.length; i++) {
            if (!this.isFootprintAllowed(eventFootprints[i].componentFootprint, peerEventFootprints, constraintVal, overlapVal, eventFootprints[i].eventInstance)) {
                return false;
            }
        }
        if (eventAllowFunc) {
            for (i = 0; i < eventFootprints.length; i++) {
                if (eventAllowFunc(eventFootprints[i].componentFootprint.toLegacy(this._calendar), eventFootprints[i].getEventLegacy()) === false) {
                    return false;
                }
            }
        }
        return true;
    };
    Constraints.prototype.getPeerEventInstances = function (eventDef) {
        return this.eventManager.getEventInstancesWithoutId(eventDef.id);
    };
    Constraints.prototype.isSelectionFootprintAllowed = function (componentFootprint) {
        var peerEventInstances = this.eventManager.getEventInstances();
        var peerEventRanges = peerEventInstances.map(util_1.eventInstanceToEventRange);
        var peerEventFootprints = this.eventRangesToEventFootprints(peerEventRanges);
        var selectAllowFunc;
        if (this.isFootprintAllowed(componentFootprint, peerEventFootprints, this.opt('selectConstraint'), this.opt('selectOverlap'))) {
            selectAllowFunc = this.opt('selectAllow');
            if (selectAllowFunc) {
                return selectAllowFunc(componentFootprint.toLegacy(this._calendar)) !== false;
            }
            else {
                return true;
            }
        }
        return false;
    };
    Constraints.prototype.isFootprintAllowed = function (componentFootprint, peerEventFootprints, constraintVal, overlapVal, subjectEventInstance // optional
    ) {
        var constraintFootprints; // ComponentFootprint[]
        var overlapEventFootprints; // EventFootprint[]
        if (constraintVal != null) {
            constraintFootprints = this.constraintValToFootprints(constraintVal, componentFootprint.isAllDay);
            if (!this.isFootprintWithinConstraints(componentFootprint, constraintFootprints)) {
                return false;
            }
        }
        overlapEventFootprints = this.collectOverlapEventFootprints(peerEventFootprints, componentFootprint);
        if (overlapVal === false) {
            if (overlapEventFootprints.length) {
                return false;
            }
        }
        else if (typeof overlapVal === 'function') {
            if (!isOverlapsAllowedByFunc(overlapEventFootprints, overlapVal, subjectEventInstance)) {
                return false;
            }
        }
        if (subjectEventInstance) {
            if (!isOverlapEventInstancesAllowed(overlapEventFootprints, subjectEventInstance)) {
                return false;
            }
        }
        return true;
    };
    // Constraint
    // ------------------------------------------------------------------------------------------------
    Constraints.prototype.isFootprintWithinConstraints = function (componentFootprint, constraintFootprints) {
        var i;
        for (i = 0; i < constraintFootprints.length; i++) {
            if (this.footprintContainsFootprint(constraintFootprints[i], componentFootprint)) {
                return true;
            }
        }
        return false;
    };
    Constraints.prototype.constraintValToFootprints = function (constraintVal, isAllDay) {
        var eventInstances;
        if (constraintVal === 'businessHours') {
            return this.buildCurrentBusinessFootprints(isAllDay);
        }
        else if (typeof constraintVal === 'object') {
            eventInstances = this.parseEventDefToInstances(constraintVal); // handles recurring events
            if (!eventInstances) {
                return this.parseFootprints(constraintVal);
            }
            else {
                return this.eventInstancesToFootprints(eventInstances);
            }
        }
        else if (constraintVal != null) {
            eventInstances = this.eventManager.getEventInstancesWithId(constraintVal);
            return this.eventInstancesToFootprints(eventInstances);
        }
    };
    // returns ComponentFootprint[]
    // uses current view's range
    Constraints.prototype.buildCurrentBusinessFootprints = function (isAllDay) {
        var view = this._calendar.view;
        var businessHourGenerator = view.get('businessHourGenerator');
        var unzonedRange = view.dateProfile.activeUnzonedRange;
        var eventInstanceGroup = businessHourGenerator.buildEventInstanceGroup(isAllDay, unzonedRange);
        if (eventInstanceGroup) {
            return this.eventInstancesToFootprints(eventInstanceGroup.eventInstances);
        }
        else {
            return [];
        }
    };
    // conversion util
    Constraints.prototype.eventInstancesToFootprints = function (eventInstances) {
        var eventRanges = eventInstances.map(util_1.eventInstanceToEventRange);
        var eventFootprints = this.eventRangesToEventFootprints(eventRanges);
        return eventFootprints.map(util_1.eventFootprintToComponentFootprint);
    };
    // Overlap
    // ------------------------------------------------------------------------------------------------
    Constraints.prototype.collectOverlapEventFootprints = function (peerEventFootprints, targetFootprint) {
        var overlapEventFootprints = [];
        var i;
        for (i = 0; i < peerEventFootprints.length; i++) {
            if (this.footprintsIntersect(targetFootprint, peerEventFootprints[i].componentFootprint)) {
                overlapEventFootprints.push(peerEventFootprints[i]);
            }
        }
        return overlapEventFootprints;
    };
    // Conversion: eventDefs -> eventInstances -> eventRanges -> eventFootprints -> componentFootprints
    // ------------------------------------------------------------------------------------------------
    // NOTE: this might seem like repetitive code with the Grid class, however, this code is related to
    // constraints whereas the Grid code is related to rendering. Each approach might want to convert
    // eventRanges -> eventFootprints in a different way. Regardless, there are opportunities to make
    // this more DRY.
    /*
    Returns false on invalid input.
    */
    Constraints.prototype.parseEventDefToInstances = function (eventInput) {
        var eventManager = this.eventManager;
        var eventDef = EventDefParser_1.default.parse(eventInput, new EventSource_1.default(this._calendar));
        if (!eventDef) {
            return false;
        }
        return eventDef.buildInstances(eventManager.currentPeriod.unzonedRange);
    };
    Constraints.prototype.eventRangesToEventFootprints = function (eventRanges) {
        var i;
        var eventFootprints = [];
        for (i = 0; i < eventRanges.length; i++) {
            eventFootprints.push.apply(// footprints
            eventFootprints, this.eventRangeToEventFootprints(eventRanges[i]));
        }
        return eventFootprints;
    };
    Constraints.prototype.eventRangeToEventFootprints = function (eventRange) {
        return [util_1.eventRangeToEventFootprint(eventRange)];
    };
    /*
    Parses footprints directly.
    Very similar to EventDateProfile::parse :(
    */
    Constraints.prototype.parseFootprints = function (rawInput) {
        var start;
        var end;
        if (rawInput.start) {
            start = this._calendar.moment(rawInput.start);
            if (!start.isValid()) {
                start = null;
            }
        }
        if (rawInput.end) {
            end = this._calendar.moment(rawInput.end);
            if (!end.isValid()) {
                end = null;
            }
        }
        return [
            new ComponentFootprint_1.default(new UnzonedRange_1.default(start, end), (start && !start.hasTime()) || (end && !end.hasTime()) // isAllDay
            )
        ];
    };
    // Footprint Utils
    // ----------------------------------------------------------------------------------------
    Constraints.prototype.footprintContainsFootprint = function (outerFootprint, innerFootprint) {
        return outerFootprint.unzonedRange.containsRange(innerFootprint.unzonedRange);
    };
    Constraints.prototype.footprintsIntersect = function (footprint0, footprint1) {
        return footprint0.unzonedRange.intersectsWith(footprint1.unzonedRange);
    };
    return Constraints;
}());
exports.default = Constraints;
// optional subjectEventInstance
function isOverlapsAllowedByFunc(overlapEventFootprints, overlapFunc, subjectEventInstance) {
    var i;
    for (i = 0; i < overlapEventFootprints.length; i++) {
        if (!overlapFunc(overlapEventFootprints[i].eventInstance.toLegacy(), subjectEventInstance ? subjectEventInstance.toLegacy() : null)) {
            return false;
        }
    }
    return true;
}
function isOverlapEventInstancesAllowed(overlapEventFootprints, subjectEventInstance) {
    var subjectLegacyInstance = subjectEventInstance.toLegacy();
    var i;
    var overlapEventInstance;
    var overlapEventDef;
    var overlapVal;
    for (i = 0; i < overlapEventFootprints.length; i++) {
        overlapEventInstance = overlapEventFootprints[i].eventInstance;
        overlapEventDef = overlapEventInstance.def;
        // don't need to pass in calendar, because don't want to consider global eventOverlap property,
        // because we already considered that earlier in the process.
        overlapVal = overlapEventDef.getOverlap();
        if (overlapVal === false) {
            return false;
        }
        else if (typeof overlapVal === 'function') {
            if (!overlapVal(overlapEventInstance.toLegacy(), subjectLegacyInstance)) {
                return false;
            }
        }
    }
    return true;
}


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

/*
USAGE:
  import { default as ParsableModelMixin, ParsableModelInterface } from './ParsableModelMixin'
in class:
  applyProps: ParsableModelInterface['applyProps']
  applyManualStandardProps: ParsableModelInterface['applyManualStandardProps']
  applyMiscProps: ParsableModelInterface['applyMiscProps']
  isStandardProp: ParsableModelInterface['isStandardProp']
  static defineStandardProps = ParsableModelMixin.defineStandardProps
  static copyVerbatimStandardProps = ParsableModelMixin.copyVerbatimStandardProps
after class:
  ParsableModelMixin.mixInto(TheClass)
*/
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var util_1 = __webpack_require__(4);
var Mixin_1 = __webpack_require__(14);
var ParsableModelMixin = /** @class */ (function (_super) {
    tslib_1.__extends(ParsableModelMixin, _super);
    function ParsableModelMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParsableModelMixin.defineStandardProps = function (propDefs) {
        var proto = this.prototype;
        if (!proto.hasOwnProperty('standardPropMap')) {
            proto.standardPropMap = Object.create(proto.standardPropMap);
        }
        util_1.copyOwnProps(propDefs, proto.standardPropMap);
    };
    ParsableModelMixin.copyVerbatimStandardProps = function (src, dest) {
        var map = this.prototype.standardPropMap;
        var propName;
        for (propName in map) {
            if (src[propName] != null && // in the src object?
                map[propName] === true // false means "copy verbatim"
            ) {
                dest[propName] = src[propName];
            }
        }
    };
    /*
    Returns true/false for success.
    Meant to be only called ONCE, at object creation.
    */
    ParsableModelMixin.prototype.applyProps = function (rawProps) {
        var standardPropMap = this.standardPropMap;
        var manualProps = {};
        var miscProps = {};
        var propName;
        for (propName in rawProps) {
            if (standardPropMap[propName] === true) {
                this[propName] = rawProps[propName];
            }
            else if (standardPropMap[propName] === false) {
                manualProps[propName] = rawProps[propName];
            }
            else {
                miscProps[propName] = rawProps[propName];
            }
        }
        this.applyMiscProps(miscProps);
        return this.applyManualStandardProps(manualProps);
    };
    /*
    If subclasses override, they must call this supermethod and return the boolean response.
    Meant to be only called ONCE, at object creation.
    */
    ParsableModelMixin.prototype.applyManualStandardProps = function (rawProps) {
        return true;
    };
    /*
    Can be called even after initial object creation.
    */
    ParsableModelMixin.prototype.applyMiscProps = function (rawProps) {
        // subclasses can implement
    };
    /*
    TODO: why is this a method when defineStandardProps is static
    */
    ParsableModelMixin.prototype.isStandardProp = function (propName) {
        return propName in this.standardPropMap;
    };
    return ParsableModelMixin;
}(Mixin_1.default));
exports.default = ParsableModelMixin;
ParsableModelMixin.prototype.standardPropMap = {}; // will be cloned by defineStandardProps


/***/ }),
/* 209 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var EventInstance = /** @class */ (function () {
    function EventInstance(def, dateProfile) {
        this.def = def;
        this.dateProfile = dateProfile;
    }
    EventInstance.prototype.toLegacy = function () {
        var dateProfile = this.dateProfile;
        var obj = this.def.toLegacy();
        obj.start = dateProfile.start.clone();
        obj.end = dateProfile.end ? dateProfile.end.clone() : null;
        return obj;
    };
    return EventInstance;
}());
exports.default = EventInstance;


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var EventDef_1 = __webpack_require__(34);
var EventInstance_1 = __webpack_require__(209);
var EventDateProfile_1 = __webpack_require__(17);
var RecurringEventDef = /** @class */ (function (_super) {
    tslib_1.__extends(RecurringEventDef, _super);
    function RecurringEventDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecurringEventDef.prototype.isAllDay = function () {
        return !this.startTime && !this.endTime;
    };
    RecurringEventDef.prototype.buildInstances = function (unzonedRange) {
        var calendar = this.source.calendar;
        var unzonedDate = unzonedRange.getStart();
        var unzonedEnd = unzonedRange.getEnd();
        var zonedDayStart;
        var instanceStart;
        var instanceEnd;
        var instances = [];
        while (unzonedDate.isBefore(unzonedEnd)) {
            // if everyday, or this particular day-of-week
            if (!this.dowHash || this.dowHash[unzonedDate.day()]) {
                zonedDayStart = calendar.applyTimezone(unzonedDate);
                instanceStart = zonedDayStart.clone();
                instanceEnd = null;
                if (this.startTime) {
                    instanceStart.time(this.startTime);
                }
                else {
                    instanceStart.stripTime();
                }
                if (this.endTime) {
                    instanceEnd = zonedDayStart.clone().time(this.endTime);
                }
                instances.push(new EventInstance_1.default(this, // definition
                new EventDateProfile_1.default(instanceStart, instanceEnd, calendar)));
            }
            unzonedDate.add(1, 'days');
        }
        return instances;
    };
    RecurringEventDef.prototype.setDow = function (dowNumbers) {
        if (!this.dowHash) {
            this.dowHash = {};
        }
        for (var i = 0; i < dowNumbers.length; i++) {
            this.dowHash[dowNumbers[i]] = true;
        }
    };
    RecurringEventDef.prototype.clone = function () {
        var def = _super.prototype.clone.call(this);
        if (def.startTime) {
            def.startTime = moment.duration(this.startTime);
        }
        if (def.endTime) {
            def.endTime = moment.duration(this.endTime);
        }
        if (this.dowHash) {
            def.dowHash = $.extend({}, this.dowHash);
        }
        return def;
    };
    return RecurringEventDef;
}(EventDef_1.default));
exports.default = RecurringEventDef;
/*
HACK to work with TypeScript mixins
NOTE: if super-method fails, should still attempt to apply
*/
RecurringEventDef.prototype.applyProps = function (rawProps) {
    var superSuccess = EventDef_1.default.prototype.applyProps.call(this, rawProps);
    if (rawProps.start) {
        this.startTime = moment.duration(rawProps.start);
    }
    if (rawProps.end) {
        this.endTime = moment.duration(rawProps.end);
    }
    if (rawProps.dow) {
        this.setDow(rawProps.dow);
    }
    return superSuccess;
};
// Parsing
// ---------------------------------------------------------------------------------------------------------------------
RecurringEventDef.defineStandardProps({
    start: false,
    end: false,
    dow: false
});


/***/ }),
/* 211 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var EventRange = /** @class */ (function () {
    function EventRange(unzonedRange, eventDef, eventInstance) {
        this.unzonedRange = unzonedRange;
        this.eventDef = eventDef;
        if (eventInstance) {
            this.eventInstance = eventInstance;
        }
    }
    return EventRange;
}());
exports.default = EventRange;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(35);
var EventInstanceGroup_1 = __webpack_require__(18);
var RecurringEventDef_1 = __webpack_require__(210);
var EventSource_1 = __webpack_require__(6);
var BUSINESS_HOUR_EVENT_DEFAULTS = {
    start: '09:00',
    end: '17:00',
    dow: [1, 2, 3, 4, 5],
    rendering: 'inverse-background'
    // classNames are defined in businessHoursSegClasses
};
var BusinessHourGenerator = /** @class */ (function () {
    function BusinessHourGenerator(rawComplexDef, calendar) {
        this.rawComplexDef = rawComplexDef;
        this.calendar = calendar;
    }
    BusinessHourGenerator.prototype.buildEventInstanceGroup = function (isAllDay, unzonedRange) {
        var eventDefs = this.buildEventDefs(isAllDay);
        var eventInstanceGroup;
        if (eventDefs.length) {
            eventInstanceGroup = new EventInstanceGroup_1.default(util_1.eventDefsToEventInstances(eventDefs, unzonedRange));
            // so that inverse-background rendering can happen even when no eventRanges in view
            eventInstanceGroup.explicitEventDef = eventDefs[0];
            return eventInstanceGroup;
        }
    };
    BusinessHourGenerator.prototype.buildEventDefs = function (isAllDay) {
        var rawComplexDef = this.rawComplexDef;
        var rawDefs = [];
        var requireDow = false;
        var i;
        var defs = [];
        if (rawComplexDef === true) {
            rawDefs = [{}]; // will get BUSINESS_HOUR_EVENT_DEFAULTS verbatim
        }
        else if ($.isPlainObject(rawComplexDef)) {
            rawDefs = [rawComplexDef];
        }
        else if ($.isArray(rawComplexDef)) {
            rawDefs = rawComplexDef;
            requireDow = true; // every sub-definition NEEDS a day-of-week
        }
        for (i = 0; i < rawDefs.length; i++) {
            if (!requireDow || rawDefs[i].dow) {
                defs.push(this.buildEventDef(isAllDay, rawDefs[i]));
            }
        }
        return defs;
    };
    BusinessHourGenerator.prototype.buildEventDef = function (isAllDay, rawDef) {
        var fullRawDef = $.extend({}, BUSINESS_HOUR_EVENT_DEFAULTS, rawDef);
        if (isAllDay) {
            fullRawDef.start = null;
            fullRawDef.end = null;
        }
        return RecurringEventDef_1.default.parse(fullRawDef, new EventSource_1.default(this.calendar) // dummy source
        );
    };
    return BusinessHourGenerator;
}());
exports.default = BusinessHourGenerator;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var Theme_1 = __webpack_require__(19);
var StandardTheme = /** @class */ (function (_super) {
    tslib_1.__extends(StandardTheme, _super);
    function StandardTheme() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StandardTheme;
}(Theme_1.default));
exports.default = StandardTheme;
StandardTheme.prototype.classes = {
    widget: 'fc-unthemed',
    widgetHeader: 'fc-widget-header',
    widgetContent: 'fc-widget-content',
    buttonGroup: 'fc-button-group',
    button: 'fc-button',
    cornerLeft: 'fc-corner-left',
    cornerRight: 'fc-corner-right',
    stateDefault: 'fc-state-default',
    stateActive: 'fc-state-active',
    stateDisabled: 'fc-state-disabled',
    stateHover: 'fc-state-hover',
    stateDown: 'fc-state-down',
    popoverHeader: 'fc-widget-header',
    popoverContent: 'fc-widget-content',
    // day grid
    headerRow: 'fc-widget-header',
    dayRow: 'fc-widget-content',
    // list view
    listView: 'fc-widget-content'
};
StandardTheme.prototype.baseIconClass = 'fc-icon';
StandardTheme.prototype.iconClasses = {
    close: 'fc-icon-x',
    prev: 'fc-icon-left-single-arrow',
    next: 'fc-icon-right-single-arrow',
    prevYear: 'fc-icon-left-double-arrow',
    nextYear: 'fc-icon-right-double-arrow'
};
StandardTheme.prototype.iconOverrideOption = 'buttonIcons';
StandardTheme.prototype.iconOverrideCustomButtonOption = 'icon';
StandardTheme.prototype.iconOverridePrefix = 'fc-icon-';


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var Theme_1 = __webpack_require__(19);
var JqueryUiTheme = /** @class */ (function (_super) {
    tslib_1.__extends(JqueryUiTheme, _super);
    function JqueryUiTheme() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JqueryUiTheme;
}(Theme_1.default));
exports.default = JqueryUiTheme;
JqueryUiTheme.prototype.classes = {
    widget: 'ui-widget',
    widgetHeader: 'ui-widget-header',
    widgetContent: 'ui-widget-content',
    buttonGroup: 'fc-button-group',
    button: 'ui-button',
    cornerLeft: 'ui-corner-left',
    cornerRight: 'ui-corner-right',
    stateDefault: 'ui-state-default',
    stateActive: 'ui-state-active',
    stateDisabled: 'ui-state-disabled',
    stateHover: 'ui-state-hover',
    stateDown: 'ui-state-down',
    today: 'ui-state-highlight',
    popoverHeader: 'ui-widget-header',
    popoverContent: 'ui-widget-content',
    // day grid
    headerRow: 'ui-widget-header',
    dayRow: 'ui-widget-content',
    // list view
    listView: 'ui-widget-content'
};
JqueryUiTheme.prototype.baseIconClass = 'ui-icon';
JqueryUiTheme.prototype.iconClasses = {
    close: 'ui-icon-closethick',
    prev: 'ui-icon-circle-triangle-w',
    next: 'ui-icon-circle-triangle-e',
    prevYear: 'ui-icon-seek-prev',
    nextYear: 'ui-icon-seek-next'
};
JqueryUiTheme.prototype.iconOverrideOption = 'themeButtonIcons';
JqueryUiTheme.prototype.iconOverrideCustomButtonOption = 'themeIcon';
JqueryUiTheme.prototype.iconOverridePrefix = 'ui-icon-';


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var Promise_1 = __webpack_require__(20);
var EventSource_1 = __webpack_require__(6);
var FuncEventSource = /** @class */ (function (_super) {
    tslib_1.__extends(FuncEventSource, _super);
    function FuncEventSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FuncEventSource.parse = function (rawInput, calendar) {
        var rawProps;
        // normalize raw input
        if ($.isFunction(rawInput.events)) {
            rawProps = rawInput;
        }
        else if ($.isFunction(rawInput)) {
            rawProps = { events: rawInput };
        }
        if (rawProps) {
            return EventSource_1.default.parse.call(this, rawProps, calendar);
        }
        return false;
    };
    FuncEventSource.prototype.fetch = function (start, end, timezone) {
        var _this = this;
        this.calendar.pushLoading();
        return Promise_1.default.construct(function (onResolve) {
            _this.func.call(_this.calendar, start.clone(), end.clone(), timezone, function (rawEventDefs) {
                _this.calendar.popLoading();
                onResolve(_this.parseEventDefs(rawEventDefs));
            });
        });
    };
    FuncEventSource.prototype.getPrimitive = function () {
        return this.func;
    };
    FuncEventSource.prototype.applyManualStandardProps = function (rawProps) {
        var superSuccess = _super.prototype.applyManualStandardProps.call(this, rawProps);
        this.func = rawProps.events;
        return superSuccess;
    };
    return FuncEventSource;
}(EventSource_1.default));
exports.default = FuncEventSource;
FuncEventSource.defineStandardProps({
    events: false // don't automatically transfer
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var util_1 = __webpack_require__(4);
var Promise_1 = __webpack_require__(20);
var EventSource_1 = __webpack_require__(6);
var JsonFeedEventSource = /** @class */ (function (_super) {
    tslib_1.__extends(JsonFeedEventSource, _super);
    function JsonFeedEventSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonFeedEventSource.parse = function (rawInput, calendar) {
        var rawProps;
        // normalize raw input
        if (typeof rawInput.url === 'string') {
            rawProps = rawInput;
        }
        else if (typeof rawInput === 'string') {
            rawProps = { url: rawInput };
        }
        if (rawProps) {
            return EventSource_1.default.parse.call(this, rawProps, calendar);
        }
        return false;
    };
    JsonFeedEventSource.prototype.fetch = function (start, end, timezone) {
        var _this = this;
        var ajaxSettings = this.ajaxSettings;
        var onSuccess = ajaxSettings.success;
        var onError = ajaxSettings.error;
        var requestParams = this.buildRequestParams(start, end, timezone);
        // todo: eventually handle the promise's then,
        // don't intercept success/error
        // tho will be a breaking API change
        this.calendar.pushLoading();
        return Promise_1.default.construct(function (onResolve, onReject) {
            $.ajax($.extend({}, // destination
            JsonFeedEventSource.AJAX_DEFAULTS, ajaxSettings, {
                url: _this.url,
                data: requestParams,
                success: function (rawEventDefs, status, xhr) {
                    var callbackRes;
                    _this.calendar.popLoading();
                    if (rawEventDefs) {
                        callbackRes = util_1.applyAll(onSuccess, _this, [rawEventDefs, status, xhr]); // redirect `this`
                        if ($.isArray(callbackRes)) {
                            rawEventDefs = callbackRes;
                        }
                        onResolve(_this.parseEventDefs(rawEventDefs));
                    }
                    else {
                        onReject();
                    }
                },
                error: function (xhr, statusText, errorThrown) {
                    _this.calendar.popLoading();
                    util_1.applyAll(onError, _this, [xhr, statusText, errorThrown]); // redirect `this`
                    onReject();
                }
            }));
        });
    };
    JsonFeedEventSource.prototype.buildRequestParams = function (start, end, timezone) {
        var calendar = this.calendar;
        var ajaxSettings = this.ajaxSettings;
        var startParam;
        var endParam;
        var timezoneParam;
        var customRequestParams;
        var params = {};
        startParam = this.startParam;
        if (startParam == null) {
            startParam = calendar.opt('startParam');
        }
        endParam = this.endParam;
        if (endParam == null) {
            endParam = calendar.opt('endParam');
        }
        timezoneParam = this.timezoneParam;
        if (timezoneParam == null) {
            timezoneParam = calendar.opt('timezoneParam');
        }
        // retrieve any outbound GET/POST $.ajax data from the options
        if ($.isFunction(ajaxSettings.data)) {
            // supplied as a function that returns a key/value object
            customRequestParams = ajaxSettings.data();
        }
        else {
            // probably supplied as a straight key/value object
            customRequestParams = ajaxSettings.data || {};
        }
        $.extend(params, customRequestParams);
        params[startParam] = start.format();
        params[endParam] = end.format();
        if (timezone && timezone !== 'local') {
            params[timezoneParam] = timezone;
        }
        return params;
    };
    JsonFeedEventSource.prototype.getPrimitive = function () {
        return this.url;
    };
    JsonFeedEventSource.prototype.applyMiscProps = function (rawProps) {
        this.ajaxSettings = rawProps;
    };
    JsonFeedEventSource.AJAX_DEFAULTS = {
        dataType: 'json',
        cache: false
    };
    return JsonFeedEventSource;
}(EventSource_1.default));
exports.default = JsonFeedEventSource;
JsonFeedEventSource.defineStandardProps({
    // automatically transfer (true)...
    url: true,
    startParam: true,
    endParam: true,
    timezoneParam: true
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var EmitterMixin_1 = __webpack_require__(11);
var TaskQueue = /** @class */ (function () {
    function TaskQueue() {
        this.q = [];
        this.isPaused = false;
        this.isRunning = false;
    }
    TaskQueue.prototype.queue = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.q.push.apply(this.q, args); // append
        this.tryStart();
    };
    TaskQueue.prototype.pause = function () {
        this.isPaused = true;
    };
    TaskQueue.prototype.resume = function () {
        this.isPaused = false;
        this.tryStart();
    };
    TaskQueue.prototype.getIsIdle = function () {
        return !this.isRunning && !this.isPaused;
    };
    TaskQueue.prototype.tryStart = function () {
        if (!this.isRunning && this.canRunNext()) {
            this.isRunning = true;
            this.trigger('start');
            this.runRemaining();
        }
    };
    TaskQueue.prototype.canRunNext = function () {
        return !this.isPaused && this.q.length;
    };
    TaskQueue.prototype.runRemaining = function () {
        var _this = this;
        var task;
        var res;
        do {
            task = this.q.shift(); // always freshly reference q. might have been reassigned.
            res = this.runTask(task);
            if (res && res.then) {
                res.then(function () {
                    if (_this.canRunNext()) {
                        _this.runRemaining();
                    }
                });
                return; // prevent marking as stopped
            }
        } while (this.canRunNext());
        this.trigger('stop'); // not really a 'stop' ... more of a 'drained'
        this.isRunning = false;
        // if 'stop' handler added more tasks.... TODO: write test for this
        this.tryStart();
    };
    TaskQueue.prototype.runTask = function (task) {
        return task(); // task *is* the function, but subclasses can change the format of a task
    };
    return TaskQueue;
}());
exports.default = TaskQueue;
EmitterMixin_1.default.mixInto(TaskQueue);


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var TaskQueue_1 = __webpack_require__(217);
var RenderQueue = /** @class */ (function (_super) {
    tslib_1.__extends(RenderQueue, _super);
    function RenderQueue(waitsByNamespace) {
        var _this = _super.call(this) || this;
        _this.waitsByNamespace = waitsByNamespace || {};
        return _this;
    }
    RenderQueue.prototype.queue = function (taskFunc, namespace, type) {
        var task = {
            func: taskFunc,
            namespace: namespace,
            type: type
        };
        var waitMs;
        if (namespace) {
            waitMs = this.waitsByNamespace[namespace];
        }
        if (this.waitNamespace) {
            if (namespace === this.waitNamespace && waitMs != null) {
                this.delayWait(waitMs);
            }
            else {
                this.clearWait();
                this.tryStart();
            }
        }
        if (this.compoundTask(task)) {
            if (!this.waitNamespace && waitMs != null) {
                this.startWait(namespace, waitMs);
            }
            else {
                this.tryStart();
            }
        }
    };
    RenderQueue.prototype.startWait = function (namespace, waitMs) {
        this.waitNamespace = namespace;
        this.spawnWait(waitMs);
    };
    RenderQueue.prototype.delayWait = function (waitMs) {
        clearTimeout(this.waitId);
        this.spawnWait(waitMs);
    };
    RenderQueue.prototype.spawnWait = function (waitMs) {
        var _this = this;
        this.waitId = setTimeout(function () {
            _this.waitNamespace = null;
            _this.tryStart();
        }, waitMs);
    };
    RenderQueue.prototype.clearWait = function () {
        if (this.waitNamespace) {
            clearTimeout(this.waitId);
            this.waitId = null;
            this.waitNamespace = null;
        }
    };
    RenderQueue.prototype.canRunNext = function () {
        if (!_super.prototype.canRunNext.call(this)) {
            return false;
        }
        // waiting for a certain namespace to stop receiving tasks?
        if (this.waitNamespace) {
            var q = this.q;
            // if there was a different namespace task in the meantime,
            // that forces all previously-waiting tasks to suddenly execute.
            // TODO: find a way to do this in constant time.
            for (var i = 0; i < q.length; i++) {
                if (q[i].namespace !== this.waitNamespace) {
                    return true; // allow execution
                }
            }
            return false;
        }
        return true;
    };
    RenderQueue.prototype.runTask = function (task) {
        task.func();
    };
    RenderQueue.prototype.compoundTask = function (newTask) {
        var q = this.q;
        var shouldAppend = true;
        var i;
        var task;
        if (newTask.namespace && newTask.type === 'destroy') {
            // remove all init/add/remove ops with same namespace, regardless of order
            for (i = q.length - 1; i >= 0; i--) {
                task = q[i];
                switch (task.type) {
                    case 'init':
                        shouldAppend = false;
                    // the latest destroy is cancelled out by not doing the init
                    /* falls through */
                    case 'add':
                    /* falls through */
                    case 'remove':
                        q.splice(i, 1); // remove task
                }
            }
        }
        if (shouldAppend) {
            q.push(newTask);
        }
        return shouldAppend;
    };
    return RenderQueue;
}(TaskQueue_1.default));
exports.default = RenderQueue;


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var util_1 = __webpack_require__(4);
var moment_ext_1 = __webpack_require__(10);
var date_formatting_1 = __webpack_require__(47);
var Component_1 = __webpack_require__(237);
var util_2 = __webpack_require__(35);
var DateComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DateComponent, _super);
    function DateComponent(_view, _options) {
        var _this = _super.call(this) || this;
        _this.isRTL = false; // frequently accessed options
        _this.hitsNeededDepth = 0; // necessary because multiple callers might need the same hits
        _this.hasAllDayBusinessHours = false; // TODO: unify with largeUnit and isTimeScale?
        _this.isDatesRendered = false;
        // hack to set options prior to the this.opt calls
        if (_view) {
            _this['view'] = _view;
        }
        if (_options) {
            _this['options'] = _options;
        }
        _this.uid = String(DateComponent.guid++);
        _this.childrenByUid = {};
        _this.nextDayThreshold = moment.duration(_this.opt('nextDayThreshold'));
        _this.isRTL = _this.opt('isRTL');
        if (_this.fillRendererClass) {
            _this.fillRenderer = new _this.fillRendererClass(_this);
        }
        if (_this.eventRendererClass) {
            _this.eventRenderer = new _this.eventRendererClass(_this, _this.fillRenderer);
        }
        if (_this.helperRendererClass && _this.eventRenderer) {
            _this.helperRenderer = new _this.helperRendererClass(_this, _this.eventRenderer);
        }
        if (_this.businessHourRendererClass && _this.fillRenderer) {
            _this.businessHourRenderer = new _this.businessHourRendererClass(_this, _this.fillRenderer);
        }
        return _this;
    }
    DateComponent.prototype.addChild = function (child) {
        if (!this.childrenByUid[child.uid]) {
            this.childrenByUid[child.uid] = child;
            return true;
        }
        return false;
    };
    DateComponent.prototype.removeChild = function (child) {
        if (this.childrenByUid[child.uid]) {
            delete this.childrenByUid[child.uid];
            return true;
        }
        return false;
    };
    // TODO: only do if isInDom?
    // TODO: make part of Component, along with children/batch-render system?
    DateComponent.prototype.updateSize = function (totalHeight, isAuto, isResize) {
        this.callChildren('updateSize', arguments);
    };
    // Options
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.opt = function (name) {
        return this._getView().opt(name); // default implementation
    };
    DateComponent.prototype.publiclyTrigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var calendar = this._getCalendar();
        return calendar.publiclyTrigger.apply(calendar, args);
    };
    DateComponent.prototype.hasPublicHandlers = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var calendar = this._getCalendar();
        return calendar.hasPublicHandlers.apply(calendar, args);
    };
    // Date
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.executeDateRender = function (dateProfile) {
        this.dateProfile = dateProfile; // for rendering
        this.renderDates(dateProfile);
        this.isDatesRendered = true;
        this.callChildren('executeDateRender', arguments);
    };
    DateComponent.prototype.executeDateUnrender = function () {
        this.callChildren('executeDateUnrender', arguments);
        this.dateProfile = null;
        this.unrenderDates();
        this.isDatesRendered = false;
    };
    // date-cell content only
    DateComponent.prototype.renderDates = function (dateProfile) {
        // subclasses should implement
    };
    // date-cell content only
    DateComponent.prototype.unrenderDates = function () {
        // subclasses should override
    };
    // Now-Indicator
    // -----------------------------------------------------------------------------------------------------------------
    // Returns a string unit, like 'second' or 'minute' that defined how often the current time indicator
    // should be refreshed. If something falsy is returned, no time indicator is rendered at all.
    DateComponent.prototype.getNowIndicatorUnit = function () {
        // subclasses should implement
    };
    // Renders a current time indicator at the given datetime
    DateComponent.prototype.renderNowIndicator = function (date) {
        this.callChildren('renderNowIndicator', arguments);
    };
    // Undoes the rendering actions from renderNowIndicator
    DateComponent.prototype.unrenderNowIndicator = function () {
        this.callChildren('unrenderNowIndicator', arguments);
    };
    // Business Hours
    // ---------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.renderBusinessHours = function (businessHourGenerator) {
        if (this.businessHourRenderer) {
            this.businessHourRenderer.render(businessHourGenerator);
        }
        this.callChildren('renderBusinessHours', arguments);
    };
    // Unrenders previously-rendered business-hours
    DateComponent.prototype.unrenderBusinessHours = function () {
        this.callChildren('unrenderBusinessHours', arguments);
        if (this.businessHourRenderer) {
            this.businessHourRenderer.unrender();
        }
    };
    // Event Displaying
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.executeEventRender = function (eventsPayload) {
        if (this.eventRenderer) {
            this.eventRenderer.rangeUpdated(); // poorly named now
            this.eventRenderer.render(eventsPayload);
        }
        else if (this['renderEvents']) {
            this['renderEvents'](convertEventsPayloadToLegacyArray(eventsPayload));
        }
        this.callChildren('executeEventRender', arguments);
    };
    DateComponent.prototype.executeEventUnrender = function () {
        this.callChildren('executeEventUnrender', arguments);
        if (this.eventRenderer) {
            this.eventRenderer.unrender();
        }
        else if (this['destroyEvents']) {
            this['destroyEvents']();
        }
    };
    DateComponent.prototype.getBusinessHourSegs = function () {
        var segs = this.getOwnBusinessHourSegs();
        this.iterChildren(function (child) {
            segs.push.apply(segs, child.getBusinessHourSegs());
        });
        return segs;
    };
    DateComponent.prototype.getOwnBusinessHourSegs = function () {
        if (this.businessHourRenderer) {
            return this.businessHourRenderer.getSegs();
        }
        return [];
    };
    DateComponent.prototype.getEventSegs = function () {
        var segs = this.getOwnEventSegs();
        this.iterChildren(function (child) {
            segs.push.apply(segs, child.getEventSegs());
        });
        return segs;
    };
    DateComponent.prototype.getOwnEventSegs = function () {
        if (this.eventRenderer) {
            return this.eventRenderer.getSegs();
        }
        return [];
    };
    // Event Rendering Triggering
    // -----------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.triggerAfterEventsRendered = function () {
        this.triggerAfterEventSegsRendered(this.getEventSegs());
        this.publiclyTrigger('eventAfterAllRender', {
            context: this,
            args: [this]
        });
    };
    DateComponent.prototype.triggerAfterEventSegsRendered = function (segs) {
        var _this = this;
        // an optimization, because getEventLegacy is expensive
        if (this.hasPublicHandlers('eventAfterRender')) {
            segs.forEach(function (seg) {
                var legacy;
                if (seg.el) {
                    legacy = seg.footprint.getEventLegacy();
                    _this.publiclyTrigger('eventAfterRender', {
                        context: legacy,
                        args: [legacy, seg.el, _this]
                    });
                }
            });
        }
    };
    DateComponent.prototype.triggerBeforeEventsDestroyed = function () {
        this.triggerBeforeEventSegsDestroyed(this.getEventSegs());
    };
    DateComponent.prototype.triggerBeforeEventSegsDestroyed = function (segs) {
        var _this = this;
        if (this.hasPublicHandlers('eventDestroy')) {
            segs.forEach(function (seg) {
                var legacy;
                if (seg.el) {
                    legacy = seg.footprint.getEventLegacy();
                    _this.publiclyTrigger('eventDestroy', {
                        context: legacy,
                        args: [legacy, seg.el, _this]
                    });
                }
            });
        }
    };
    // Event Rendering Utils
    // -----------------------------------------------------------------------------------------------------------------
    // Hides all rendered event segments linked to the given event
    // RECURSIVE with subcomponents
    DateComponent.prototype.showEventsWithId = function (eventDefId) {
        this.getEventSegs().forEach(function (seg) {
            if (seg.footprint.eventDef.id === eventDefId &&
                seg.el // necessary?
            ) {
                seg.el.css('visibility', '');
            }
        });
        this.callChildren('showEventsWithId', arguments);
    };
    // Shows all rendered event segments linked to the given event
    // RECURSIVE with subcomponents
    DateComponent.prototype.hideEventsWithId = function (eventDefId) {
        this.getEventSegs().forEach(function (seg) {
            if (seg.footprint.eventDef.id === eventDefId &&
                seg.el // necessary?
            ) {
                seg.el.css('visibility', 'hidden');
            }
        });
        this.callChildren('hideEventsWithId', arguments);
    };
    // Drag-n-Drop Rendering (for both events and external elements)
    // ---------------------------------------------------------------------------------------------------------------
    // Renders a visual indication of a event or external-element drag over the given drop zone.
    // If an external-element, seg will be `null`.
    // Must return elements used for any mock events.
    DateComponent.prototype.renderDrag = function (eventFootprints, seg, isTouch) {
        var renderedHelper = false;
        this.iterChildren(function (child) {
            if (child.renderDrag(eventFootprints, seg, isTouch)) {
                renderedHelper = true;
            }
        });
        return renderedHelper;
    };
    // Unrenders a visual indication of an event or external-element being dragged.
    DateComponent.prototype.unrenderDrag = function () {
        this.callChildren('unrenderDrag', arguments);
    };
    // Event Resizing
    // ---------------------------------------------------------------------------------------------------------------
    // Renders a visual indication of an event being resized.
    DateComponent.prototype.renderEventResize = function (eventFootprints, seg, isTouch) {
        this.callChildren('renderEventResize', arguments);
    };
    // Unrenders a visual indication of an event being resized.
    DateComponent.prototype.unrenderEventResize = function () {
        this.callChildren('unrenderEventResize', arguments);
    };
    // Selection
    // ---------------------------------------------------------------------------------------------------------------
    // Renders a visual indication of the selection
    // TODO: rename to `renderSelection` after legacy is gone
    DateComponent.prototype.renderSelectionFootprint = function (componentFootprint) {
        this.renderHighlight(componentFootprint);
        this.callChildren('renderSelectionFootprint', arguments);
    };
    // Unrenders a visual indication of selection
    DateComponent.prototype.unrenderSelection = function () {
        this.unrenderHighlight();
        this.callChildren('unrenderSelection', arguments);
    };
    // Highlight
    // ---------------------------------------------------------------------------------------------------------------
    // Renders an emphasis on the given date range. Given a span (unzoned start/end and other misc data)
    DateComponent.prototype.renderHighlight = function (componentFootprint) {
        if (this.fillRenderer) {
            this.fillRenderer.renderFootprint('highlight', componentFootprint, {
                getClasses: function () {
                    return ['fc-highlight'];
                }
            });
        }
        this.callChildren('renderHighlight', arguments);
    };
    // Unrenders the emphasis on a date range
    DateComponent.prototype.unrenderHighlight = function () {
        if (this.fillRenderer) {
            this.fillRenderer.unrender('highlight');
        }
        this.callChildren('unrenderHighlight', arguments);
    };
    // Hit Areas
    // ---------------------------------------------------------------------------------------------------------------
    // just because all DateComponents support this interface
    // doesn't mean they need to have their own internal coord system. they can defer to sub-components.
    DateComponent.prototype.hitsNeeded = function () {
        if (!(this.hitsNeededDepth++)) {
            this.prepareHits();
        }
        this.callChildren('hitsNeeded', arguments);
    };
    DateComponent.prototype.hitsNotNeeded = function () {
        if (this.hitsNeededDepth && !(--this.hitsNeededDepth)) {
            this.releaseHits();
        }
        this.callChildren('hitsNotNeeded', arguments);
    };
    DateComponent.prototype.prepareHits = function () {
        // subclasses can implement
    };
    DateComponent.prototype.releaseHits = function () {
        // subclasses can implement
    };
    // Given coordinates from the topleft of the document, return data about the date-related area underneath.
    // Can return an object with arbitrary properties (although top/right/left/bottom are encouraged).
    // Must have a `grid` property, a reference to this current grid. TODO: avoid this
    // The returned object will be processed by getHitFootprint and getHitEl.
    DateComponent.prototype.queryHit = function (leftOffset, topOffset) {
        var childrenByUid = this.childrenByUid;
        var uid;
        var hit;
        for (uid in childrenByUid) {
            hit = childrenByUid[uid].queryHit(leftOffset, topOffset);
            if (hit) {
                break;
            }
        }
        return hit;
    };
    DateComponent.prototype.getSafeHitFootprint = function (hit) {
        var footprint = this.getHitFootprint(hit);
        if (!this.dateProfile.activeUnzonedRange.containsRange(footprint.unzonedRange)) {
            return null;
        }
        return footprint;
    };
    DateComponent.prototype.getHitFootprint = function (hit) {
        // what about being abstract!?
    };
    // Given position-level information about a date-related area within the grid,
    // should return a jQuery element that best represents it. passed to dayClick callback.
    DateComponent.prototype.getHitEl = function (hit) {
        // what about being abstract!?
    };
    /* Converting eventRange -> eventFootprint
    ------------------------------------------------------------------------------------------------------------------*/
    DateComponent.prototype.eventRangesToEventFootprints = function (eventRanges) {
        var eventFootprints = [];
        var i;
        for (i = 0; i < eventRanges.length; i++) {
            eventFootprints.push.apply(// append
            eventFootprints, this.eventRangeToEventFootprints(eventRanges[i]));
        }
        return eventFootprints;
    };
    DateComponent.prototype.eventRangeToEventFootprints = function (eventRange) {
        return [util_2.eventRangeToEventFootprint(eventRange)];
    };
    /* Converting componentFootprint/eventFootprint -> segs
    ------------------------------------------------------------------------------------------------------------------*/
    DateComponent.prototype.eventFootprintsToSegs = function (eventFootprints) {
        var segs = [];
        var i;
        for (i = 0; i < eventFootprints.length; i++) {
            segs.push.apply(segs, this.eventFootprintToSegs(eventFootprints[i]));
        }
        return segs;
    };
    // Given an event's span (unzoned start/end and other misc data), and the event itself,
    // slices into segments and attaches event-derived properties to them.
    // eventSpan - { start, end, isStart, isEnd, otherthings... }
    DateComponent.prototype.eventFootprintToSegs = function (eventFootprint) {
        var unzonedRange = eventFootprint.componentFootprint.unzonedRange;
        var segs;
        var i;
        var seg;
        segs = this.componentFootprintToSegs(eventFootprint.componentFootprint);
        for (i = 0; i < segs.length; i++) {
            seg = segs[i];
            if (!unzonedRange.isStart) {
                seg.isStart = false;
            }
            if (!unzonedRange.isEnd) {
                seg.isEnd = false;
            }
            seg.footprint = eventFootprint;
            // TODO: rename to seg.eventFootprint
        }
        return segs;
    };
    DateComponent.prototype.componentFootprintToSegs = function (componentFootprint) {
        return [];
    };
    // Utils
    // ---------------------------------------------------------------------------------------------------------------
    DateComponent.prototype.callChildren = function (methodName, args) {
        this.iterChildren(function (child) {
            child[methodName].apply(child, args);
        });
    };
    DateComponent.prototype.iterChildren = function (func) {
        var childrenByUid = this.childrenByUid;
        var uid;
        for (uid in childrenByUid) {
            func(childrenByUid[uid]);
        }
    };
    DateComponent.prototype._getCalendar = function () {
        var t = this;
        return t.calendar || t.view.calendar;
    };
    DateComponent.prototype._getView = function () {
        return this.view;
    };
    DateComponent.prototype._getDateProfile = function () {
        return this._getView().get('dateProfile');
    };
    // Generates HTML for an anchor to another view into the calendar.
    // Will either generate an <a> tag or a non-clickable <span> tag, depending on enabled settings.
    // `gotoOptions` can either be a moment input, or an object with the form:
    // { date, type, forceOff }
    // `type` is a view-type like "day" or "week". default value is "day".
    // `attrs` and `innerHtml` are use to generate the rest of the HTML tag.
    DateComponent.prototype.buildGotoAnchorHtml = function (gotoOptions, attrs, innerHtml) {
        var date;
        var type;
        var forceOff;
        var finalOptions;
        if ($.isPlainObject(gotoOptions)) {
            date = gotoOptions.date;
            type = gotoOptions.type;
            forceOff = gotoOptions.forceOff;
        }
        else {
            date = gotoOptions; // a single moment input
        }
        date = moment_ext_1.default(date); // if a string, parse it
        finalOptions = {
            date: date.format('YYYY-MM-DD'),
            type: type || 'day'
        };
        if (typeof attrs === 'string') {
            innerHtml = attrs;
            attrs = null;
        }
        attrs = attrs ? ' ' + util_1.attrsToStr(attrs) : ''; // will have a leading space
        innerHtml = innerHtml || '';
        if (!forceOff && this.opt('navLinks')) {
            return '<a' + attrs +
                ' data-goto="' + util_1.htmlEscape(JSON.stringify(finalOptions)) + '">' +
                innerHtml +
                '</a>';
        }
        else {
            return '<span' + attrs + '>' +
                innerHtml +
                '</span>';
        }
    };
    DateComponent.prototype.getAllDayHtml = function () {
        return this.opt('allDayHtml') || util_1.htmlEscape(this.opt('allDayText'));
    };
    // Computes HTML classNames for a single-day element
    DateComponent.prototype.getDayClasses = function (date, noThemeHighlight) {
        var view = this._getView();
        var classes = [];
        var today;
        if (!this.dateProfile.activeUnzonedRange.containsDate(date)) {
            classes.push('fc-disabled-day'); // TODO: jQuery UI theme?
        }
        else {
            classes.push('fc-' + util_1.dayIDs[date.day()]);
            if (view.isDateInOtherMonth(date, this.dateProfile)) {
                classes.push('fc-other-month');
            }
            today = view.calendar.getNow();
            if (date.isSame(today, 'day')) {
                classes.push('fc-today');
                if (noThemeHighlight !== true) {
                    classes.push(view.calendar.theme.getClass('today'));
                }
            }
            else if (date < today) {
                classes.push('fc-past');
            }
            else {
                classes.push('fc-future');
            }
        }
        return classes;
    };
    // Utility for formatting a range. Accepts a range object, formatting string, and optional separator.
    // Displays all-day ranges naturally, with an inclusive end. Takes the current isRTL into account.
    // The timezones of the dates within `range` will be respected.
    DateComponent.prototype.formatRange = function (range, isAllDay, formatStr, separator) {
        var end = range.end;
        if (isAllDay) {
            end = end.clone().subtract(1); // convert to inclusive. last ms of previous day
        }
        return date_formatting_1.formatRange(range.start, end, formatStr, separator, this.isRTL);
    };
    // Compute the number of the give units in the "current" range.
    // Will return a floating-point number. Won't round.
    DateComponent.prototype.currentRangeAs = function (unit) {
        return this._getDateProfile().currentUnzonedRange.as(unit);
    };
    // Returns the date range of the full days the given range visually appears to occupy.
    // Returns a plain object with start/end, NOT an UnzonedRange!
    DateComponent.prototype.computeDayRange = function (unzonedRange) {
        var calendar = this._getCalendar();
        var startDay = calendar.msToUtcMoment(unzonedRange.startMs, true); // the beginning of the day the range starts
        var end = calendar.msToUtcMoment(unzonedRange.endMs);
        var endTimeMS = +end.time(); // # of milliseconds into `endDay`
        var endDay = end.clone().stripTime(); // the beginning of the day the range exclusively ends
        // If the end time is actually inclusively part of the next day and is equal to or
        // beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
        // Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
        if (endTimeMS && endTimeMS >= this.nextDayThreshold) {
            endDay.add(1, 'days');
        }
        // If end is within `startDay` but not past nextDayThreshold, assign the default duration of one day.
        if (endDay <= startDay) {
            endDay = startDay.clone().add(1, 'days');
        }
        return { start: startDay, end: endDay };
    };
    // Does the given range visually appear to occupy more than one day?
    DateComponent.prototype.isMultiDayRange = function (unzonedRange) {
        var dayRange = this.computeDayRange(unzonedRange);
        return dayRange.end.diff(dayRange.start, 'days') > 1;
    };
    DateComponent.guid = 0; // TODO: better system for this?
    return DateComponent;
}(Component_1.default));
exports.default = DateComponent;
// legacy
function convertEventsPayloadToLegacyArray(eventsPayload) {
    var eventDefId;
    var eventInstances;
    var legacyEvents = [];
    var i;
    for (eventDefId in eventsPayload) {
        eventInstances = eventsPayload[eventDefId].eventInstances;
        for (i = 0; i < eventInstances.length; i++) {
            legacyEvents.push(eventInstances[i].toLegacy());
        }
    }
    return legacyEvents;
}


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var moment = __webpack_require__(0);
var util_1 = __