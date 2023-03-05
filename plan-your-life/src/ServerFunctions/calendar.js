module.exports.createEvent = createEvent;
module.exports.deleteEvent = deleteEvent;
module.exports.getEvents = getEvents;

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/tasks'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';
//const CREDENTIALS = {"installed":{"client_id":"12352763295-sl6ipfoe5oqld84fo76qjj5u9l07el3d.apps.g