const slideSpacing = {
  EVENT: 50,
  TALK: 45,
  DATE: 40
}

const DEFAULT_START_Y_INDEX = 100

const END_OF_SLIDE = 520

/**
 * cluster all the talks by date
 * @param {Array} The talks that need to be clustered
 * @return {dataOrganized} dataOrganized where the keys are the date and the values are the talks
 */
function clusterByDate (data) {
  const dataOrganized = new Map()
  for (let i = 0; i < data.length; i++) {
    if (!dataOrganized.has(data[i].date)) {
      dataOrganized.set(data[i].date, [
        {
          universe: data[i].universe,
          eventType: data[i].eventType,
          eventName: data[i].eventName,
          talkTitle: data[i].talkTitle,
          speakers: data[i].speakers
        }
      ])
    } else {
      const newValue = dataOrganized.get(data[i].date)
      newValue.push({
        universe: data[i].universe,
        eventType: data[i].eventType,
        eventName: data[i].eventName,
        talkTitle: data[i].talkTitle,
        speakers: data[i].speakers
      })
    }
  }
  return divideInMultipleSlides(clusterByEventName(dataOrganized))
}

function divideInMultipleSlides (dataOrganized) {
  const mapIter = dataOrganized.keys()
  let date = mapIter.next().value
  let isEndOfData = false
  let isEndOfSlideReached = false
  let yNextElmt = DEFAULT_START_Y_INDEX
  let yNextElmtTemp
  let DoesDateFits
  const dataOrganizedBySlides = []
  dataOrganizedBySlides.push(new Map())

  while (!isEndOfData) {
    isEndOfSlideReached = false
    while (!isEndOfData && !isEndOfSlideReached) {
      DoesDateFits = true
      yNextElmtTemp = yNextElmt
      const resDate = tryDate(yNextElmt, dataOrganized.get(date))
      DoesDateFits = resDate.DoesDateFits
      yNextElmt = resDate.yNextElmt

      if (!DoesDateFits) { // toute la date ne rentre pas
        const resFilEvent = tryToFillWithEvent(yNextElmtTemp, dataOrganized.get(date), date, dataOrganizedBySlides)

        yNextElmt = resFilEvent.yNextElmt
        const atLeastOneEventCanFit = resFilEvent.atLeastOneEventCanFit
        if (!atLeastOneEventCanFit) {
          isEndOfSlideReached = true
          const map = new Map()
          map.set(date, dataOrganized.get(date))
          dataOrganizedBySlides.push(map)
          yNextElmt = DEFAULT_START_Y_INDEX
        } else {
          dataOrganizedBySlides.pop()
          resFilEvent.data.forEach(event => dataOrganizedBySlides.push(event))
        }
      } else { // toute la date rentre
        dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, dataOrganized.get(date))
      }

      // on verifie s'il reste des données
      date = mapIter.next().value
      if (date === undefined) {
        isEndOfData = true
      }
    }
  }
  return dataOrganizedBySlides
}

function tryToFillWithEvent (yNextElmt, allEventsInADate, date, data) {
  const dataOrganizedBySlides = data.slice(-1)
  let i = 0
  let listOfEventThatFits = []
  let atLeastOneEventCanFit = false
  let worthToContinue = (i === 0 || atLeastOneEventCanFit)
  let DoesEventFits = true

  while (i < allEventsInADate.length && worthToContinue) {
    worthToContinue = (i === 0 || atLeastOneEventCanFit)
    const event = allEventsInADate[i]
    const resEvent = tryEvent(yNextElmt, event)
    DoesEventFits = resEvent.DoesEventFits
    yNextElmt = resEvent.yNextElmt
    if (DoesEventFits) {
      atLeastOneEventCanFit = true
      listOfEventThatFits.push(event)
    } else {
      if (atLeastOneEventCanFit) {
        // on ajoute ce qui rentre
        dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, listOfEventThatFits)

        // on prepare la prochaine fois que ça rentre
        listOfEventThatFits = []
        const map = new Map()
        dataOrganizedBySlides.push(map)
        listOfEventThatFits.push(event)
        yNextElmt = DEFAULT_START_Y_INDEX
      } else {
        i = allEventsInADate.length // to end the loop
      }
    }
    i++
    if (i >= allEventsInADate.length && atLeastOneEventCanFit) {
      dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, listOfEventThatFits)
    }
  }
  return { data: dataOrganizedBySlides, yNextElmt, atLeastOneEventCanFit }
}

function tryDate (yNextElmt, data) {
  yNextElmt += slideSpacing.DATE
  data.forEach(event => {
    yNextElmt = tryEvent(yNextElmt, event).yNextElmt
  })
  return { yNextElmt, DoesDateFits: yNextElmt <= END_OF_SLIDE }
}

function tryEvent (yNextElmt, event) {
  yNextElmt += slideSpacing.EVENT
  event.talks.forEach(talk => {
    yNextElmt += slideSpacing.TALK
  })

  return { yNextElmt, DoesEventFits: yNextElmt <= END_OF_SLIDE }
}

/**
   * cluster all the talks by name of events
   * @param {dataOrganized} The talks already clustured by dates
   * @return {dataOrganized} dataOrganized where the keys are the date and the values are an object
   * with 2 attributes: one for the event name and one for the left data
   */
function clusterByEventName (dataOrganized) {
  const mapIter = dataOrganized.keys()
  let date = mapIter.next().value

  while (date !== undefined) {
    const EventNameAdded = []
    const EventArray = []
    for (let i = 0; i < dataOrganized.get(date).length; i++) {
      // pour chaque date
      const talk = dataOrganized.get(date)[i]

      if (EventNameAdded.includes(talk.eventName)) {
        EventArray[EventNameAdded.indexOf(talk.eventName)].talks.push({
          universe: talk.universe,
          talkTitle: talk.talkTitle,
          speakers: talk.speakers
        })
      } else {
        EventArray.push({
          eventName: talk.eventName,
          eventType: talk.eventType,
          talks: [
            {
              universe: talk.universe,
              talkTitle: talk.talkTitle,
              speakers: talk.speakers
            }
          ]
        })
        EventNameAdded.push(talk.eventName)
      }
    }
    dataOrganized.set(date, EventArray)
    date = mapIter.next().value
  }
  return dataOrganized
}

module.exports = {
  clusterByDate,
  DEFAULT_START_Y_INDEX,
  END_OF_SLIDE,
  slideSpacing
}
