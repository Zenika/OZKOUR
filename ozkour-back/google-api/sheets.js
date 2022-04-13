const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
require('dotenv').config();

const connect = require('./connect.js');

let talks;

    function getTalkFromDate(dateDeb, dateFin = Date(Date.now()).toLocaleString()){
        connect.authMethode(getData)
        // , (err, res) => {
        //     console.log("rererer")
        //     if (err) return console.log('The API returned an error: ' + err);
            
        //         Timeout(console.log(talks),1000);
        //         dateFilter(res,dateDeb, dateFin);

        //   };
        //   setTimeout(console.log(talks),1000);
        //   console.log("nul")
    }
  
  /**
   * Prints the names and majors of students in a sample spreadsheet:
   * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
   */
  async function getData(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1e50uVl_wAseWD8PDyAeNS9dRNhiq0k_WVyJr2fL9SeE',// TO DO use a variable instead of a link
      range: 'Feuille-1!A2:H',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      talks = res.data.values;
      if (rows.length) {
        // console.log('Date, Univers, Evenement, Titre, Speaker:');
        // // Print columns A and E, which correspond to indices 0 and 4.
        // rows.map((row) => {
        //   console.log(`${row[4]}, ${row[1]}, ${row[3]}, ${row[7]}, ${row[6]}`);
        // });
        //dateFilter('13/01/2022')
      } else {
        console.log('No data found.');
      }
      console.log(talks)
      return talks;
    });
    
  }
  
  
  function dateFilter(talks,dateDeb, dateFin = Date(Date.now()).toLocaleString()){
    console.log("Filtered")
    talks.map((talk) => {
      if(talk[4]>=dateDeb && talk[4]<=dateFin)
        console.log(`${talk[4]}, ${talk[1]}, ${talk[3]}, ${talk[7]}, ${talk[6]}`);
    });
  }
  
  
  
  
  // [END sheets_quickstart]
  
  module.exports = {
    getTalkFromDate
  };