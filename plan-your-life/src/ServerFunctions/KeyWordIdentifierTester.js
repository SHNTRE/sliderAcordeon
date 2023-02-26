/*
By: Christian Bonnell
Testing class for KeyWordIdentifier
*/

var chai = require('chai');
var KeyWordIdentifier = require('./KeyWordIdentifier');
var date = require ('date');

var assert = chai.assert;

describe("KeyWordIdentifierTest", function() {

	// beforeEach(function(done) {

	// 	var intendedEvent = {
	// 		'add': 'false',
	// 		'download': 'false',
	// 		'remind': 'false',
	// 		'remove': 'false',
	// 		'destination': '',
	// 		'item': '',
	// 		'time': '',
	// 		'where': '',
	// 		'event': '',
	// 		'duration': '',
	// 	};

	// 	var kwiEvent = KeyWordIdentifier.KWI('');

	// 	done();

	// });
	it("create JSON for basic add to list \"add eggs to groceries\"", function(done) {
		var intendedEvent1 = {
			'newList': 'false',
			'add': 'true',
			'download': 'false',
			'remind': 'false',
			'remove': 'false',
			'destination': 'groceries',
			'item': 'eggs',
			'time': '',
			'where': '',
			'event': '',
			'duration': '',
		};
		var kwiEvent1 = KeyWordIdentifier.KWI("add eggs to groceries");
		assert.equal(JSON.stringify(intendedEvent1), JSON.stringify(kwiEvent1));
		done();	
	});
	it("create JSON for basic reminder \"remind me to pick up tom from school\"", function(done) {
		var intendedEvent2 = {
			'newList': 'false',
			'add': 'false',
			'download': 'false',
			'remind':