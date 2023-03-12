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
//const CREDENTIALS = {"installed":{"client_id":"12352763295-sl6ipfoe5oqld84fo76qjj5u9l07el3d.apps.googleusercontent.com","project_id":"planyourlife-221800","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://www.googleapis.com/oauth2/v3/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"8rvzGa3ZdmDqAS4Ag7s73uyT","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}};
//const { client_secret, client_id, redirect_uris } = CREDENTIALS.installed;
//const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
//const TOKEN = {"access_token":"ya29.GltTBnsTeJK9x4MtwhQmngziEL0Ta8VRfWM594X8kH73Zc2Mx6FEee8xmw7Q-CpIr5zaFqvTEcSq9EQzijaiGjvP9BCb2cQEw__1QFlE0q6ZKiGbefXmQ09u4Vo_","refresh_token":"1/uFSRO9tMyYtKfqcDDRO05H_DoMMoG9cuAkIpN3L0WvY","scope":"https://www.googleapis.com/auth/calendar","token_type":"Bearer","expiry_date":1542149690952};
//oAuth2Client.setCredentials(TOKEN);

//variables
var event;
var deleteId;
var events;
var eventsToReturn = new Array();
//code to parse event information from json file and test /*
/*fs.readFile('event.json', (err, content) => {
    if (err) return console.log('Error loading event information file:', err);
    event = JSON.parse(content)
});*/
//createEvent(event);

//*/

/**
 * Wrapper function to create event
 * @param eventDetails A JSON object holding event details.
 */
function createEvent(eventDetails) {
    event = eventDetails;
    console.log('event to add: ' + event.summary);
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), addEvent);
    });    
}

/**
 * Wrapper function to delete event
 * @param eventDetails A JSON object holding event Id.
 */
function deleteEvent(eventDetails) {
    deleteId = eventDetails;
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), removeEvent);
    });
}

async function getEvents() {
    events =  getEventId(oAuth2Client);
    console.log('events in getEventId after leaving calendar.events.list: ' + events);
    
    /*fs.readFile(CREDENTIALS_PATH, (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        //authorize(JSON.parse(content), getEventId);
        
        
        //return events;
    });*/
    return events;
}
/**
 * Wrapper function to delete event
 * @param eventDetails A JSON object holding event Id.
 */
function getEvent(eventDetails) {
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), getEventId);
    });
}

/**
 * Adds event with information given by variable event to users's primary calendar
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function addEvent(auth) {
    const calendar = google.calendar({ version: 'v3', auth });
    //This code will be in an insert function that takes in the event as a parameter
    calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: event,
    }, function (err, event) {
        if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
        }
        console.log('Event created: ' + event.summary);
    });
}

/**
 * Deletes event specified by eventId.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function removeEvent(auth) {
    const calendar = google.calendar({version: 'v3', auth});    
    calendar.events.delete({
      calendarId: 'primary',
      eventId: deleteId,
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      else
        console.log('Event deleted.');
      
    });
}

/**
 * Stores the next upcoming eventId to deleteId.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function getEventId(auth) {
    
    const calendar = google.calendar({version: 'v3', auth});
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    console.log(res.data);
    /*, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        //console.log('Upcoming 10 events:');
        events.map((event, i) => {
          deleteId = event.id;
          //console.log(event);
          eventsToReturn[i] = event;
          //console.log(eventsToReturn[i]);
          //console.log('\n\ni: ' + i);
        });
      } 
      else {
        console.log('No upcoming events found.');
      }
      var j;
      for (j = 0; j < 10; j++) {
        //console.log(eventsToReturn[j].summary);
        console.log(eventsToReturn[j]);
      }
    }); */
    
  }

//Google functions

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
    //console.log('credentials' + credentials);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    console.log("getaccesstoken was called");
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
          