const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });



const { google } = require('googleapis')
const sheets = google.sheets('v4');

process.env['GCLOUD_PROJECT'] = "portfolio-website-sheets-api";
process.env['GOOGLE_APPLICATION_CREDENTIALS'] = "./portfolio-website-sheets-api.json"
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES
  });
  const authToken = await auth.getClient();
  return authToken;
}
async function getSpreadSheet({spreadsheetId, auth}) {
    const res = await sheets.spreadsheets.get({
      spreadsheetId,
      auth,
    });
    return res;
  }
  async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      auth,
      range: sheetName
    });
    return res;
  }

  async function getValues() {
    const auth = await getAuthToken();
  const spreadsheetId = "1i8UfvBxhb6OeBuxRZGWUxqHCqVEMFLdwNJxgccf9Irc";
  const sheetName = "Sheet1"

  const response= await getSpreadSheetValues({
    spreadsheetId,
    sheetName,
    auth
  });
  return await response.data.values;
  }


const imageLink = "https://raw.githubusercontent.com/DiamondDeadMaw/portfolio-website/main/portfolio-website/public/project_images/"

app.get('/values', (req, res) => {
    getValues().then(r => {
        const [keys, ...values] = r;

        const jsonData = values.map((arr) =>
          Object.fromEntries(keys.map((key, i) => [key, arr[i]]))
        );

        res.json(jsonData);
    })
});