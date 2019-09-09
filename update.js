// BEFORE RUNNING:
// ---------------
// 1. If not already done, enable the Google Sheets API
//    and check the quota for your project at
//    https://console.developers.google.com/apis/api/sheets
// 2. Install the Node.js client library by running
//    `npm install googleapis --save`

const { google } = require('googleapis');
const fs = require('fs');
const TOKEN_PATH = 'token.json';
var sheets = google.sheets('v4');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const readline = require('readline');

var members = ["Sid", "Eric", "Drew", "Trevor", "Logan", "Rishab", "Andrew"];
fs.readFile("results.json",(err, content) => {
    if (err) return console.log('Error loading results file:', err);
    updatePoints("C1", JSON.parse(content));
  });
function updatePoints(gridSpace,results) {//gridSpace is the grid space where the title of the meet is(top left)
    members.forEach((member) => {
        var players = [];//TODO get an array of the players the person put in for the meet using values get method
        players.forEach((player,index) => {
            var points = results[player];
            //TODO update point value of player using value update method
        });
    });
}





















fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), changeData);
});
var changeData = function (authClient) {

    var request = {
        // The ID of the spreadsheet to update.
        spreadsheetId: '1HWcEocs48wDcUZN7HOT-y1TR78k6t85iiyUmqz0MzJg',  // TODO: Update placeholder value.

        // The A1 notation of the values to update.
        range: 'Eric!A12',  // TODO: Update placeholder value.

        // How the input data should be interpreted.
        valueInputOption: 'RAW',  // TODO: Update placeholder value.

        resource: {
            "values": [
                [
                    "Hi there"
                ]
            ]
        },

        auth: authClient,
    };

    sheets.spreadsheets.values.update(request, function (err, response) {
        if (err) {
            console.error(err);
            return;
        }

        // TODO: Change code below to process the `response` object:
        console.log(JSON.stringify(response, null, 2));
    });
};


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
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
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}