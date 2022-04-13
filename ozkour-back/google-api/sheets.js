const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
require("dotenv").config();

const connect = require("./connect.js");

let dateDeb;
let dateFin;

async function getTalkFromDate(start, end = Date(Date.now()).toLocaleString()) {
  //to do : faire que cette partie soit plus propre
  dateDeb = start;
  dateFin = end;
  const param = {start,end}

  const res = await connect.authMethode(getData,param)
  return res;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
 async function getData(auth, params) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1e50uVl_wAseWD8PDyAeNS9dRNhiq0k_WVyJr2fL9SeE", // TO DO use a variable instead of a link
    range: "Feuille-1!A2:H",
  });
  return dateFilter(res.data.values, params.start, params.end);
}

function dateFilter(talks, dateDeb, dateFin) {
  talks = talks.filter(function (talk){
      return (talk[4] >= dateDeb && talk[4] <= dateFin);
  });
  return talks
}

module.exports = {
  getTalkFromDate,
};
