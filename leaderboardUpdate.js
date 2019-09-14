// BEFORE RUNNING:
// ---------------
// 1. If not already done, enable the Google Sheets API
//    and check the quota for your project at
//    https://console.developers.google.com/apis/api/sheets
// 2. Install the Node.js client library by running
//    `npm install googleapis --save`

const google = require('googleapis');
const fs = require('fs');
const readline = require('readline');

const TOKEN_PATH = 'token.json';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

var sheets = google.sheets('v4');

const members = ["Sid", "Eric", "Drew", "Trevor", "Logan", "Rishab", "Andrew"];

const sheetID = "11gJYQ9SRDQMBY-W6gNw9hSggOgse5Bbcx-m1SVU6l4I";

fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), readResultsAndUpdate);
});

function readResultsAndUpdate(authClient) {
    fs.readFile("results.json", (err, content) => {
        if (err) return console.log('Error loading results file:', err);
        updateLeaderboard("J", 23, JSON.parse(content), authClient);
    });
}

function updateLeaderboard(gridLetter, gridNumber, results, authClient) {//grid Letter and Number are the coordinates of the top slot for points
    members.forEach((member) => {
        var request = {
            spreadsheetId: sheetID,
            range: member + "!" + gridLetter + gridNumber,
            auth: authClient
        }
        sheets.spreadsheets.values.get(request, function (err, response) {
            if (err) {
                console.error(err);
                return;
            }
            if (response.data.values !== undefined)
                    var request = {//data to be sent to spreadsheet API
                        // The ID of the spreadsheet to update.
                        spreadsheetId: sheetID,
                        // The A1 notation of the values to update.
                        range: member + '!' + gridLetter + (gridNumber + index),
                        // How the input data should be interpreted.
                        valueInputOption: 'RAW',
                        resource: {
                            "values": [
                                [
                                    points
                                ]
                            ]
                        },

                        auth: authClient,
                    };
                    sheets.spreadsheets.values.update(request, function (err, response) {
                        console.log("done");
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                });
        });
    });
}



//-----------------------HELPER METHODS-----------------------
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