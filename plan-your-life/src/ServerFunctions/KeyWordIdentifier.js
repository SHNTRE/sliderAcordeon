/*
By: Christian Bonnell
*/

// Prompt object
// var prompt = require('prompt');
//var date = require('date');

var keywords = [];

var keys = [];
var keyValues = [];

// The following variables hold the values of the JSON file
var newList = 'false'
var add = 'false';
var download = 'false';
var remind = 'false';
var remove = 'false';
// Used with Tasks
var destination = '';
var item = '';
// Used with Calendar
var time = '';
var where = '';
var event = '';
var duration = '';

/*
Current means to get user input until front end integration is complete

prompt.start();
prompt.get(['command'], function (err, result) {
	KWI(result.command);
});

// Following 

/*
Currently not implemented
Will communicate with front end to grab the users input and pass it to KWI
*/
function getInput(command){
	console.log('Command: ' + command);
	KWI(command);
}

/*
Function sets the fields to a specific value for testing purposes.
*/	
function resetFields(){
	keywords = [];
	keys = [];
	keyValues = [];
	add = 'false';
	download = 'false';
	remind = 'false';
	remove = 'false';
	destination = '';
	item = '';
	time = '';
	where = '';
	event = '';
	duration = '';
}

/*
Pulls the key words from the server.
Currently just populates the keywords array until back end integration is complete
*/
function getKeyWords(){
	keywords.push('add');
	keywords.push('download');
	keywords.push('remind me to');
	keywords.push('remind');
	keywords.push('remove');
	keywords.push('to');
	keywords.push('at');
	keywords.push('from');
	keywords.push('for');
	keywords.push('on');
	keywords.push('me');
	keywords.push('event');
	keywords.push('list');
}

/*
Runs through the command and stores the key words with equivalent key word values in their respective arrays
*/
function extractCache(command){

	var keyword = '';
	var values = '';

	// Creates an array containing all the words within a String for easy manipulation
	command.forEach(function(element){
		if