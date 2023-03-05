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
    deleteId = eventDe