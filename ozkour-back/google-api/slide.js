const { google } = require("googleapis");
const connect = require("./connect.js");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const presentationId = "1Mwzl0-13stcTZRn_0iyIJLZveuY80SW2cmv9p2Wgpug";

const defaultForegroundColor = {
  opaqueColor: {
    rgbColor: {
      blue: 1.0,
      green: 1.0,
      red: 1.0,
    },
  },
};

const unit = "PT"

const greyForegroundColor = {
  opaqueColor: {
    rgbColor: {
      blue: 0.7,
      green: 0.7,
      red: 0.7,
    },
  },
};

const spaceEvent = 45;
const spaceTalk = 40;
const spaceDate = 40;
const defaultStartYIndex = 100;



async function createSlideFromTalks(talks,h) {
  try {
    const res = await connect.authMethode(createSlides, talks);
    return h.response(res).code(200);
  } catch (e) {
    return h.response(e).code(500);
  }
}

/**
 * cluster all the talks by date
 * @param {Array} The talks that need to be clustered
 * @return {dataOrganized} dataOrganized where the keys are the date and the values are the talks
 */
function clusterByDate(data) {
  let dataOrganized = new Map();
  for (let i = 0; i < data.length; i++) {
    if (!dataOrganized.has(data[i].date)) {
      dataOrganized.set(data[i].date, [
        {
          universe: data[i].universe,
          eventType: data[i].eventType,
          eventName: data[i].eventName,
          talkTitle: data[i].talkTitle,
          speakers: data[i].speakers,
        },
      ]);
    } else {
      let newValue = dataOrganized.get(data[i].date);
      newValue.push({
        universe: data[i].universe,
        eventType: data[i].eventType,
        eventName: data[i].eventName,
        talkTitle: data[i].talkTitle,
        speakers: data[i].speakers,
      });
    }
  }
  return clusterByEventName(dataOrganized);
}

/**
 * cluster all the talks by name of events
 * @param {dataOrganized} The talks already clustured by dates
 * @return {dataOrganized} dataOrganized where the keys are the date and the values are an object
 * with 2 attributes: one for the event name and one for the left data
 */
function clusterByEventName(dataOrganized) {
  var mapIter = dataOrganized.keys();
  let date = mapIter.next().value;

  while (date !== undefined) {
    const EventNameAdded = [];
    const EventArray = [];
    for (let i = 0; i < dataOrganized.get(date).length; i++) {
      //pour chaque date
      const talk = dataOrganized.get(date)[i];

      if (EventNameAdded.includes(talk.eventName)) {
        EventArray[EventNameAdded.indexOf(talk.eventName)].talks.push({
          universe: talk.universe,
          eventType: talk.eventType,
          talkTitle: talk.talkTitle,
          speakers: talk.speakers,
        });
      } else {
        EventArray.push({
          eventName: talk.eventName,
          talks: [
            {
              universe: talk.universe,
              eventType: talk.eventType,
              talkTitle: talk.talkTitle,
              speakers: talk.speakers,
            },
          ],
        });
        EventNameAdded.push(talk.eventName);
      }
    }
    dataOrganized.set(date, EventArray);
    date = mapIter.next().value;
  }
  return dataOrganized;
}

async function createSlides(auth, talks) {
  const slides = google.slides({ version: "v1", auth });
  const promiseCreateSlide = new Promise((resolve, reject) => {
    slides.presentations.get(
      {
        presentationId: presentationId,
      },
      async (err, res) => {
        if (err) reject(err.message);
        try {
          copySlide(auth, res.data.slides[0].objectId, talks)
            .then((result) => {
              resolve({message : result, link: "https://docs.google.com/presentation/d/"+presentationId+"/"});
            })
            .catch((e) => {
              reject({message : e});
            });
        } catch (e) {
          console.log(e.response.data.error);
          //reject(e.response.data.error);
        }
      }
    );
  });
  return promiseCreateSlide;
}

/**
 * generate the requests to add a date text to a slide
 * @param {string} the id of the page where the elements need to be deleted
 * @param {string} the date we need to add to the slide
 * @param {int} the place (only axis y) where we need put the date
 * @return {Array} return an array of the requests
 */
function addDateTextWithStyle(idPage, objectId, Y) {
  const pt350 = {
    magnitude: 350,
    unit
  };
  const pt30 = {
    magnitude: 30,
    unit
  };

  return [
    {
      //create a shape to put text in it
      createShape: {
        objectId,
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
            unit,
          },
        },
      },
    },

    {
      insertText: {
        //add date to the text
        objectId,
        insertionIndex: 0,
        text: objectId.replaceAll('-','/')
      },
    },
    {
      updateTextStyle: {
        //add style to the date
        objectId,
        style: {
          underline: true,
          fontFamily: "Nunito",
          fontSize: {
            magnitude: 17,
            unit,
          },
          foregroundColor: defaultForegroundColor,
        },
        fields: "underline,foregroundColor,fontFamily,fontSize",
      },
    },
    {
      //center the date
      updateParagraphStyle: {
        objectId,
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
    const objectId = date + '-table'
    //calculate size of Table
    let nbTalkForDate = dataOrganized.get(date).length;
    for (let i = 0; i < dataOrganized.get(date).length; i++)
      nbTalkForDate += dataOrganized.get(date)[i].talks.length;
    return [
      {
        createTable: {
          objectId,
          elementProperties: {
            pageObjectId: idPage,
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateY: Y,
              unit,
            },
          },
        },
        rows: nbTalkForDate,
        columns: 2,
      },
      {
        updateTableBorderProperties: {
          objectId,
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
              },
              alpha: 0,
            },
          },
        },
        fields: "tableBorderFill",
      },
      // Set the size of the first column of the table
      {
        updateTableColumnProperties : {
          objectId,
          columnIndices: [0],
          tableColumnProperties : {
            columnWidth: {
              magnitude: 320,
              unit
            }
          },
          fields: "columnWidth",
        },
      },
      // Set the size of the second column of the table
      {
        updateTableColumnProperties : {
          objectId,
          columnIndices: [1],
          tableColumnProperties : {
            columnWidth: {
              magnitude: 130,
              unit
            }
          },
          fields: "columnWidth",
        },
      },
    ];
  }
  
  function addEventNameWithStyleToTable(
    date,
    arrayOfTalksForAnEvent,
    IndexRowInTableToInsert
  ) {
    const objectId = date + '-table'
    return [
      {
        insertText: {
          objectId,
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 0,
          },
          insertionIndex: 0,
          text: arrayOfTalksForAnEvent.eventName,
        },
        insertionIndex: 0,
        text: arrayOfTalksForAnEvent.eventName,
      },
      {
        updateTextStyle: {
          objectId,
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 0,
          },
          style: {
            fontFamily: "Nunito",
            bold: true,
            fontSize: {
              magnitude: 20,
              unit,
            },
            foregroundColor: defaultForegroundColor,
          },
          fields: "bold,foregroundColor,fontFamily,fontSize",
          textRange: {
            type: "ALL",
          },
          foregroundColor: defaultForegroundColor,
        },
        fields: "bold,foregroundColor,fontFamily,fontSize",
        textRange: {
          type: "ALL",
        },
      },
    ];
  }
  
  function addTalkTitleWithStyleToTable(date, talk, IndexRowInTableToInsert) {
    const objectId = date + '-table'
    return [
      {
        insertText: {
          objectId,
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 0,
          },
          insertionIndex: 0,
          text: talk.talkTitle,
        },
        insertionIndex: 0,
        text: talk.talkTitle,
      },
      {
        updateTextStyle: {
          objectId,
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 0,
          },
          style: {
            fontFamily: "Nunito",
            bold: true,
            fontSize: {
              magnitude: 14,
              unit,
            },
            foregroundColor: defaultForegroundColor,
          },
          fields: "bold,foregroundColor,fontFamily,fontSize",
          textRange: {
            type: "ALL",
          },
          foregroundColor: defaultForegroundColor,
        },
        fields: "bold,foregroundColor,fontFamily,fontSize",
        textRange: {
          type: "ALL",
        },
      },
    ];
  }
  
  function addSpeakersWithStyleToTable(date, talk, IndexRowInTableToInsert) {
    const objectId = date + '-table'
    return [
      {
        insertText: {
          objectId,
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 1,
          },
          insertionIndex: 0,
          text: talk.speakers,
        },
        insertionIndex: 0,
        text: talk.speakers,
      },
      {
        updateTextStyle: {
          objectId,
          cellLocation: {
            rowIndex: IndexRowInTableToInsert,
            columnIndex: 1,
          },
          style: {
            fontFamily: "Nunito",
            fontSize: {
              magnitude: 13,
              unit,
            },
            foregroundColor: greyForegroundColor,
          },
          fields: "foregroundColor,fontFamily,fontSize",
          textRange: {
            type: "ALL",
          },
          foregroundColor: greyForegroundColor,
        },
        fields: "foregroundColor,fontFamily,fontSize",
        textRange: {
          type: "ALL",
        },
      },
    ];
  }

/**
 * Adds an image to a presentation.
 * @param {string} presentationId The presentation ID.
 * @param {string} pageId The presentation page ID.
 */
 async function createImage(presentationId, pageId, auth, eventType) {
  const {GoogleAuth} = require('google-auth-library');
  const {google} = require('googleapis');

  // const auth = new GoogleAuth(
  //     {scopes: 'https://www.googleapis.com/auth/presentations'});

  const service = google.slides({version: 'v1', auth});

  const pictogram = new Map();

  pictogram.set('Conference', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20conference.png')
  pictogram.set('Matinale', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20matinale.png')
  pictogram.set('Meetup', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20meetup.png')
  pictogram.set('NightClazz', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20nightclazz.png')
  pictogram.set('Webinar', 'https://19927536.fs1.hubspotusercontent-na1.net/hubfs/19927536/picto%20webinar.png')


  const imageUrl = pictogram.get(eventType)
  // Create a new image, using the supplied object ID, with content downloaded from imageUrl.
  const imageId = function(){
    return Date.now().toString(36) + Math.random().toString(36);
  };

  const imgSize = {
    magnitude: 110,
    unit
  };
  const requests = [{
    createImage: {
      objectId: imageId,
      url: imageUrl,
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: imgSize,
          width: imgSize,
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 455,
          translateY: 140,
          unit
        },
      },
    },
  }];

  // Execute the request.
  try {
    const response = await service.presentations.batchUpdate({
      presentationId,
      resource: {requests},
    });
    const createImageResponse = response.data.replies;
    console.log(`Created image with ID: ${createImageResponse[0].createImage.objectId}`);
    return createImageResponse;
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err;
  }
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
    let yNextElmt = defaultStartYIndex;
  
    while (date !== undefined) {
      IndexRowInTableToInsert = 0;
      const dateId = date.replaceAll("/", "-")
      requests.push(addDateTextWithStyle(idPage, dateId, yNextElmt));
      yNextElmt += spaceDate;
  
function addTableData(auth, idPage, data) {
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
        CreateTableWithStyleForAllEventsInDate(
          idPage,
          dateId,
          yNextElmt,
          dataOrganized
        )
      );
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
        createImage(presentationId, idPage, auth, arrayOfTalksForAnEvent.talks[0].eventType)
        yNextElmt += spaceEvent;
  
        //add all talk for the event
        for (let j = 0; j < arrayOfTalksForAnEvent.talks.length; j++) {
          const talk = arrayOfTalksForAnEvent.talks[j];
          requests.push(
            addTalkTitleWithStyleToTable(date, talk, IndexRowInTableToInsert),
            addSpeakersWithStyleToTable(date, talk, IndexRowInTableToInsert)
          );
          IndexRowInTableToInsert++;
          yNextElmt += spaceTalk;
        }
      }
      date = mapIter.next().value;
    }

    yNextElmt += checkSizeElement(
      auth,
      idPage,
      presentationId,
      date.replaceAll("/", "-") + "-table"
    );
    date = mapIter.next().value;
  }
  const promiseAddTableData = new Promise((resolve, reject) => {
    // Execute the request.
    slides.presentations.batchUpdate(
      {
        presentationId: presentationId,
        resource: {
          requests,
        },
      },
      (err, res) => {
        try {
          if (err) {
            reject(err.message);
          } else {
            resolve("Table Added");
          }
        } catch (e) {
          reject("error catch copy");
        }
      }
    );
  });
  return promiseAddTableData;
}



/**
 * delete the elements copied from the model used for the style of the data
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 * @param {string} the id of the page where the elements need to be deleted
 * @param {string} the id of the google slide presentation
 */
function deleteTemplateInfo(auth, idPage) {
  const slides = google.slides({ version: "v1", auth });
  const promiseDeleteTemplateInfo = new Promise((resolve, reject) => {
    slides.presentations.get(
      {
        presentationId: presentationId,
      },
      async (err, res) => {
        //if (err) return console.log("The API returned an error: " + err);

        const slide = res.data.slides.find(slide => slide.objectId === idPage)
        if(slide !== undefined) {
            // if the page is the one we're looking for
            let pageElements = slide.pageElements;

            let requests = [];
            try {
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
                  if (err) {
                    reject(err);
                  }
                  else{
                    resolve("style template element deleted");
                  }
                }
              );
            } catch (e) {
              reject("missing element on template slide");
            }
          }
          else{
            reject("error delete template element")
          }
      }
    );
  });
  return promiseDeleteTemplateInfo;
}

function copySlide(auth, idPage, talkSelected) {
  const slides = google.slides({ version: "v1", auth });
  const newIdPage = Date.now().toString(); //New id is supposed to be unique
  let requests = [
    {
      duplicateObject: {
        objectId: idPage,
        objectIds: {
          [idPage]: newIdPage,
        },
      },
    },
  ];
  const promiseCopySlide = new Promise((resolve, reject) => {
    slides.presentations.batchUpdate(
      {
        presentationId: presentationId,
        resource: {
          requests,
        },
      },
      async (err, res) => {
        try {
          if (err) {
            reject(err.message);
          }
          await deleteTemplateInfo(auth, newIdPage);
          await addTableData(auth, newIdPage, talkSelected);
          resolve("Created !")
        } catch (e) {
          reject(e);
        }
      }
    );
  });
  return promiseCopySlide;
}


module.exports = {
  createSlideFromTalks,
  clusterByDate,
  clusterByEventName,
};
