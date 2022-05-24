const { google } = require("googleapis");
const connect = require("./connect.js");
const dayjs = require("dayjs");
const utilitary = require("../utilitary");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

/**
 * Get all the talks between 2 dates
 * @param {String} start the start of the date range
 * @param {String} end the end of the date range
 */
async function createSlideFromTalks(talks) {
  const res = await connect.authMethode(test, talks);
  return res
}

function test(auth, talks) {
  const slides = google.slides({ version: "v1", auth });
  presentationId = "1_lpgL0UeRYtqvB0X5jT3k2ZPk9kchJNgC6UHq_1J5hI";
  slides.presentations.get(
    {
      presentationId: presentationId,
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      copySlide(auth, res.data.slides[0].objectId, presentationId, talks);
    }
  );
}

/**
 * generate the requests to add a date text to a slide
 * @param {string} the id of the page where the elements need to be deleted
 * @param {string} the date we need to add to the slide
 * @param {int} the place (only axis y) where we need put the date
 * @return {Array} return an array of the requests
 */
 function addDateTextWithStyle(idPage, date, Y) {
    const pt350 = {
      magnitude: 350,
      unit: "PT",
    };
    const pt30 = {
      magnitude: 30,
      unit: "PT",
    };
  
    return [
      {
        //create a shape to put text in it
        createShape: {
          objectId: date.replaceAll("/", "-"),
          shapeType: "TEXT_BOX",
          elementProperties: {
            pageObjectId: idPage,
            size: {
              height: pt30,
              width: pt350,
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 70,
              translateY: Y,
              unit: "PT",
            },
          },
        },
      },
  
      {
        insertText: {
          //add date to the text
          objectId: date.replaceAll("/", "-"),
          insertionIndex: 0,
          text: date,
        },
      },
      {
        updateTextStyle: {
          //add style to the date
          objectId: date.replaceAll("/", "-"),
          style: {
            underline: true,
            fontFamily: "Nunito",
            fontSize: {
              magnitude: 17,
              unit: "PT",
            },
            foregroundColor: defaultForegroundColor,
          },
          fields: "underline,foregroundColor,fontFamily,fontSize",
        },
      },
      {
        //center the date
        updateParagraphStyle: {
          objectId: date.replaceAll("/", "-"),
          style: {
            alignment: "CENTER",
          },
          fields: "alignment",
        },
      },
    ];
  }
  
  function CreateTableWithStyleForAllEventsInDate(
    idPage,
    date,
    Y,
    dataOrganized
  ) {
    //calculate size of Table
    let nbTalkForDate = dataOrganized.get(date).length;
    for (let i = 0; i < dataOrganized.get(date).length; i++)
      nbTalkForDate += dataOrganized.get(date)[i].talks.length;
    return [
      {
        createTable: {
          objectId: date.replaceAll("/", "-") + "-table",
          elementProperties: {
            pageObjectId: idPage,
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateY: Y,
              unit: "PT",
            },
          },
          rows: nbTalkForDate,
          columns: 2,
        },
      },
      {
        updateTableBorderProperties: {
          objectId: date.replaceAll("/", "-") + "-table",
          borderPosition: "ALL",
          tableBorderProperties: {
            tableBorderFill: {
              solidFill: {
                color: {
                  rgbColor: {
                    red: 0,
                    green: 0,
                    blue: 0,
                  },
                },
                alpha: 0,
              },
            },
          },
          fields: "tableBorderFill",
        },
      },
    ];
  }
  
  function addEventNameWithStyleToTable(
    date,
    arrayOfTalksForAnEvent,
    IndexRowInTableToInsert
  ) {
    return [
      {
        insertText: {
          objectId: date.replaceAll("/", "-") + "-table",
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 0,
          },
          insertionIndex: 0,
          text: arrayOfTalksForAnEvent.eventName,
        },
      },
      {
        updateTextStyle: {
          objectId: date.replaceAll("/", "-") + "-table",
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 0,
          },
          style: {
            fontFamily: "Nunito",
            bold: true,
            fontSize: {
              magnitude: 20,
              unit: "PT",
            },
            foregroundColor: defaultForegroundColor,
          },
          fields: "bold,foregroundColor,fontFamily,fontSize",
          textRange: {
            type: "ALL",
          },
        },
      },
    ];
  }
  
  function addTalkTitleWithStyleToTable(date, talk, IndexRowInTableToInsert) {
    return [
      {
        insertText: {
          objectId: date.replaceAll("/", "-") + "-table",
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 0,
          },
          insertionIndex: 0,
          text: talk.talkTitle,
        },
      },
      {
        updateTextStyle: {
          objectId: date.replaceAll("/", "-") + "-table",
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 0,
          },
          style: {
            fontFamily: "Nunito",
            bold: true,
            fontSize: {
              magnitude: 14,
              unit: "PT",
            },
            foregroundColor: defaultForegroundColor,
          },
          fields: "bold,foregroundColor,fontFamily,fontSize",
          textRange: {
            type: "ALL",
          },
        },
      },
    ];
  }
  
  function addSpeakersWithStyleToTable(date, talk, IndexRowInTableToInsert) {
    return [
      {
        insertText: {
          objectId: date.replaceAll("/", "-") + "-table",
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 1,
          },
          insertionIndex: 0,
          text: talk.speakers,
        },
      },
      {
        updateTextStyle: {
          objectId: date.replaceAll("/", "-") + "-table",
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 1,
          },
          style: {
            fontFamily: "Nunito",
            fontSize: {
              magnitude: 13,
              unit: "PT",
            },
            foregroundColor: greyForegroundColor,
          },
          fields: "foregroundColor,fontFamily,fontSize",
          textRange: {
            type: "ALL",
          },
        },
      },
    ];
  }
  
  /**
   * generate the requests to add a date text to a slide
   * @param {string} the id of the page where the elements need to be deleted
   * @param {string} the date we need to add to the slide
   * @param {int} the place (only axis y) where we need put the date
   * @return {Array} return an array of the requests
   */
  function addTableData(auth, idPage, presentationId, data) {
    const slides = google.slides({ version: "v1", auth });
    const dataOrganized = clusterByDate(data);
  
    const requests = [];
    let mapIter = dataOrganized.keys();
  
    let date = mapIter.next().value;
    let IndexRowInTableToInsert = 0;
    let yNextElmt = 100;
  
    while (date !== undefined) {
      IndexRowInTableToInsert = 0;
      requests.push(addDateTextWithStyle(idPage, date, yNextElmt));
      yNextElmt += 40;
  
      requests.push(
        CreateTableWithStyleForAllEventsInDate(
          idPage,
          date,
          yNextElmt,
          dataOrganized
        )
      );
  
      //for each event
      for (let i = 0; i < dataOrganized.get(date).length; i++) {
        const arrayOfTalksForAnEvent = dataOrganized.get(date)[i];
        requests.push(
          addEventNameWithStyleToTable(
            date,
            arrayOfTalksForAnEvent,
            IndexRowInTableToInsert
          )
        );
        IndexRowInTableToInsert++;
  
        //add all talk for the event
        for (let j = 0; j < arrayOfTalksForAnEvent.talks.length; j++) {
          const talk = arrayOfTalksForAnEvent.talks[j];
          requests.push(
            addTalkTitleWithStyleToTable(date, talk, IndexRowInTableToInsert),
            addSpeakersWithStyleToTable(date, talk, IndexRowInTableToInsert)
          );
          IndexRowInTableToInsert++;
        }
      }
  
      yNextElmt += checkSizeElement(
        auth,
        idPage,
        presentationId,
        date.replaceAll("/", "-") + "-table"
      );
      date = mapIter.next().value;
    }
  
    // Execute the request.
    return slides.presentations.batchUpdate(
      {
        presentationId: presentationId,
        resource: {
          requests,
        },
      },
      (err, res) => {
        console.log(err);
      }
    );
  }
  
  // TO DO
  function checkSizeElement(auth, idPage, presentationId, elementId) {
    const size = 130;
    // TO DO
  
    return size;
  }

/**
 * delete the elements copied from the model used for the style of the data
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 * @param {string} the id of the page where the elements need to be deleted
 * @param {string} the id of the google slide presentation
 */
function deleteTemplateInfo(auth, idPage, presentationId) {
  const slides = google.slides({ version: "v1", auth });
  slides.presentations.get(
    {
      presentationId: presentationId,
    },
    async (err, res) => {
      if (err) return console.log("The API returned an error: " + err);

      res.data.slides.map((slide) => {
        if (slide.objectId === idPage) {
          // if the page is the one we're looking for
          let pageElements = slide.pageElements;

          let requests = [];
          requests.push({
            deleteObject: {
              //delete icon
              objectId: pageElements[pageElements.length - 1].objectId,
            },
          });
          requests.push({
            deleteObject: {
              //delete table event
              objectId: pageElements[pageElements.length - 2].objectId,
            },
          });
          requests.push({
            deleteObject: {
              //delete date
              objectId: pageElements[pageElements.length - 3].objectId,
            },
          });
          slides.presentations.batchUpdate(
            {
              presentationId: presentationId,
              resource: {
                requests,
              },
            },
            (err, res) => {
              console.log(err);
            }
          );
        }
      });
    }
  );
}

function copySlide(auth, idPage, presentationId, talkSelected) {
    const slides = google.slides({ version: "v1", auth });
    const newIdPage = Date.now().toString();//New id is supposed to be unique
    let requests = [
      {
        duplicateObject: {
          objectId: idPage,
          objectIds: {
            p: newIdPage,
          },
        },
      },
    ];
    slides.presentations.batchUpdate(
      {
        presentationId: presentationId,
        resource: {
          requests,
        },
      },
      (err, res) => {
        deleteTemplateInfo(auth, newIdPage, presentationId);
        addTableData(auth, newIdPage, presentationId, talkSelected);
      }
    );
  }

module.exports = {
  createSlideFromTalks,
};
