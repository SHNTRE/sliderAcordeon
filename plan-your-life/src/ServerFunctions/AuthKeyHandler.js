module.exports.authorizeUser = authorizeUser;

var Calendar = require('./calendar');
var TaskHandler = require('./tasks');
const fs = require('fs');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';

function authorizeUser(key, res){
    console.log('key in the authkeyhandler: ' +  key);
    fs.readFile('credentials.json', (err, content) => {
        authorize(JSON.parse(content), key);
    });
}

function authorize(credentials, key) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    getAccessToken(oAuth2Client, key);
    // Check if we have previously stored a token.
}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, key) {
    /*const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });*/
    console.log('key in getAccessToken' + key);
    if(!(key == null || key == undefined)) {
        
        if (fs.existsSync(TOKEN_PATH)) {
            console.log('wiping token');
            fs.unlinkSync(TOKEN_PATH);
        }
    }
    
    oAuth2Client.getToken(key, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        
    });
    
}