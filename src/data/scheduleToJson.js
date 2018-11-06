const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const util = require('util');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = '../token.json'; // expects to be run from root

const storeLocation = "assets/json/events.json"

if (process.argv[2] != null) {
  storeLocation =process.argv[2]
}

// Load client secrets from a local file.
fs.readFile('creds/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  return authorize(JSON.parse(content), getDatas);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    return callback(oAuth2Client);
  });
}

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
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function getDatas(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  const startRow = 2;
  const endRow = 50;
  const sheet = "Data"

  return sheets.spreadsheets.values.get({
    spreadsheetId: '1e61Vdyc38611QGEUx7UQGSqlprnkG7tOlDGJrLhVsys',
    range: sheet + '!' + startRow + ':' + endRow + '',
  }, (err, res) => {
        if (err) return console.log('The API returned an error: ', err);
        return formatData(res);
    }
  );
}

function formatData(res) {
  //the row and collumn that the date and times are stores
    var dateRow = 0;
    var timeCollumn = 0;

    //the data
    var data = res.data.values;

    var json = "[\n"
    for(var rowIndex = 1; rowIndex < data.length; rowIndex++){
      if (data[rowIndex][0] != "" && data[rowIndex][0] != undefined) {
        var title = cleanfield(data[rowIndex][0])
        var startDateTime = cleanfield(data[rowIndex][1])
        var duration = cleanfield(data[rowIndex][2])
        var shortDescription = cleanfield(data[rowIndex][3]) // if no short description provided, just chop long one
        var description = cleanfield(data[rowIndex][4])
        var longDescription = cleanfield(data[rowIndex][5])
        var instructor = cleanfield(data[rowIndex][6])
        var location = cleanfield(data[rowIndex][7])
        jsonFormatter = "\t{\n\t\t\"id\": %d,\n\t\t\"startTime\": \"%s\",\n\t\t\"endTime\": \"%s\",\n\t\t\"date\": \"%s\",\n\t\t\"title\": \"%s\",\n\t\t\"description\": \"%s\",\n\t\t\"longDescription\": \"%s\",\n\t\t\"instructor\": \"%s\",\n\t\t\"location\": \"%s\"\n\t},\n"
        json += util.format(jsonFormatter, rowIndex, startTime, endTime, date, title, description, longDescription, instructor,location);
      }
    }

     json += "]"
     console.log(json)
    fs.writeFile(storeLocation, json, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    });
  }

  function cleanfield(data) {
    if(data == undefined) {
      return ""
    }
    data = data.replace(/(\")/g,"\'");
    data = data.replace(/(\r\n\t|\n|\r\t)/gm," ");
    return data;
  }
