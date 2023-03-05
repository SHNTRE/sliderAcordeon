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
			'remind': 'true',
			'remove': 'false',
			'destination': '',
			'item': '',
			'time': '',
			'where': 'school',
			'event': 'pick up tom',
			'duration': '',
		};
		var kwiEvent2 = KeyWordIdentifier.KWI("remind me to pick up tom from school");
		assert.equal(JSON.stringify(intendedEvent2), JSON.stringify(kwiEvent2));
		done();	
	});
	it("create JSON for basic reminder \"remind me to pick up tom from school at 7\"", function(done) {
		var intendedEvent3 = {
			'newList': 'false',
			'add': 'false',
			'download': 'false',
			'remind': 'true',
			'remove': 'false',
			'destination': '',
			'item': '',
			'time': '7',
			'where': 'school',
			'event': 'pick up tom',
			'duration': '',
		};
		var kwiEvent3 = KeyWordIdentifier.KWI("remind me to pick up tom from school at 7");
		assert.equal(JSON.stringify(intendedEvent3), JSON.stringify(kwiEvent3));
		done();
	});
	it("create JSON for basic reminder \"remind me to go running for 30 minutes on saturday - must check manually to ensure date is correct\"", function(done) {
		var intendedEvent4 = {
			'newList': 'false',
			'add': 'false',
			'download': 'false',
			'remind': 'true',
			'remove': 'false',
			'destination': '',
			'item': '',
			'time': 'saturday',
			'where': '',
			'event': 'go running',
			'duration': '30 minutes',
		};
		var kwiEvent4 = KeyWordIdentifier.KWI("remind me to go running for 30 minutes on saturday");
		assert.equal(JSON.stringify(intendedEvent4), JSON.stringify(kwiEvent4));
		done();		
	});
	it("check for error when remind keyword is not used \"pick up tom\"", function(done) {
		try {
		KeyWordIdentifier.KWI("pick up tom");
		}
		catch(err){
			assert.equal('Error: No keyword provided.', err.toString());
			done();	
		}	
	});
	it("check for error when no content is provided \"remind me to\"", function(done) {
		try {
		KeyWordIdentifier.KWI("remind me");
		}
		catch(err){
		