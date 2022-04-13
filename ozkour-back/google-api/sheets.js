const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
require("dotenv").config();
const connect = require("./connect.js");

/**
 * Get all the talks between 2 dates
 * @param {String} start the start of the date range
 * @param {String} end the end of the date range
 */
async function getTalkFromDate(start, end = Date(Date.now()).toLocaleString()) {
  const param = { start, end };
  const res = await connect.authMethode(getData, param);
  return res;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 * @param {Object} params the parameters passed by the connect
 */
async function getData(auth, params) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1e50uVl_wAseWD8PDyAeNS9dRNhiq0k_WVyJr2fL9SeE", // TO DO use a variable instead of a link
    range: "Feuille-1!A2:H",
  });
  return dateFilter(res.data.values, params.start, params.end);
}

/**
 * Filter the talks between 2 dates
 * @param {String} talks the talks that need to be filtered
 * @param {String} start the start of the date range
 * @param {String} end the end of the date range
 */
function dateFilter(talks, start, end) {
  talks = talks.filter(function (talk) {
    return talk[4] >= start && talk[4] <= end;
  });
  return talks;
}

module.exports = {
  getTalkFromDate,
};
