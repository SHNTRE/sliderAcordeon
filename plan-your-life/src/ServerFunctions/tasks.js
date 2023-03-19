
module.exports.newTask = newTask;

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';

var task;

var taskData = {
    'title': 'Cookies',
    'notes': 'Me want cookie',
}

var tasklist = {'title': 'A Task List'};

/**
 * Wrapper function to list all taskslists and ids of taskslists.
 * @param taskDetails A JSON object holding task list details
 */
function newTaskList (taskDetails) {
    fs.readFile('credentials.json', (err, content) => {
        task = taskDetails;
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Tasks API.
        authorize(JSON.parse(content), insertTaskList);
    });
}

/**
 * Wrapper function to insert task
 * @param taskDetails A JSON object holding taskdetails
 */
function newTask (taskDetails, taskList) {
    tasklist = taskList;
    console.log(tasklist);
    fs.readFile('credentials.json', (err, content) => {
        task = taskDetails;
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Tasks API.
        authorize(JSON.parse(content), insertTask);
    });
    }

/**
 * Wrapper function to insert task list
 * @param taskDetails A JSON object holding task list details
 */
function newTaskList (taskDetails) {
    fs.readFile('credentials.json', (err, content) => {
        task = taskDetails;
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Tasks API.
        authorize(JSON.parse(content), insertTaskList);
    });
}

/**
 * Inserts task into given task list
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function insertTask(auth) {
    const service = google.tasks({ version: 'v1', auth });
    service.tasks.insert({
        auth: auth,
        tasklist: '@default',
        resource: task,
    }, (err, res) => {
        if (err) return console.error('The API returned an error: ' + err);
        else {
            console.log('Task created.');
        }
    })
}

/**
 * Creates new taskList
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function insertTaskList(auth) {
    const service = google.tasks({ version: 'v1', auth });
    service.tasklists.insert({
        resource: tasklist,
    }, (err, res) => {
        if (err) return console.error('The API returned an error: ' + err);
        else {
            console.log('Task list created.');
        }
    });
}

/**
 * Lists the user's first 10 task lists.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listTaskLists(auth) {
    const service = google.tasks({version: 'v1', auth});
    service.tasklists.list({
      maxResults: 10,
    }, (err, res) => {
      if (err) return console.error('The API returned an error: ' + err);
      const taskLists = res.data.items;
      if (taskLists) {
        console.log('Task lists:');
        taskLists.forEach((taskList) => {
          console.log(`${taskList.title} (${taskList.id})`);
        });
      } else {
        console.log('No task lists found.');
      }
    });
  }

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
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
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

