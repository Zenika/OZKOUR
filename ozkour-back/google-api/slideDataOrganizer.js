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
  data.forEach(talk => {
    if (!dataOrganized.has(talk.date)) {
      dataOrganized.set(talk.date, [
        {
          universe: talk.universe,
          eventType: talk.eventType,
          eventName: talk.eventName,
          talkTitle: talk.talkTitle,
          speakers: talk.speakers
        }
      ])
    } else {
      const newValue = dataOrganized.get(talk.date)
      newValue.push({
        universe: talk.universe,
        eventType: talk.eventType,
        eventName: talk.eventName,
        talkTitle: talk.talkTitle,
        speakers: talk.speakers
      })
    }
  })
  return divideInMultipleSlides(clusterByEventName(dataOrganized))
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
    dataOrganized.get(date).forEach(talk => {
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
    })
    dataOrganized.set(date, EventArray)
    date = mapIter.next().value
  }
  return dataOrganized
}

/**
 * divide the data into different slides so there is no overflow on a slide
 * @param {Map} a map of the talks clustered by dates and by events
 * @return { Array } an array of Map where each map represents a slide
 */
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
      yNextElmt += resDate.yAdded

      if (DoesDateFits) {
        dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, dataOrganized.get(date))
      } else {
        const resFillEvent = tryToFillWithEvent(yNextElmtTemp, dataOrganized.get(date), date, dataOrganizedBySlides)
        yNextElmt += resFillEvent.yAdded
        const atLeastOneEventCanFit = resFillEvent.atLeastOneEventCanFit

        if (atLeastOneEventCanFit) {
          dataOrganizedBySlides.pop()
          resFillEvent.data.forEach(event => dataOrganizedBySlides.push(event))
        } else {
          const resFillTalk = tryToFillWithTalk(yNextElmtTemp, dataOrganized.get(date)[0].talks, date, dataOrganized.get(date)[0], dataOrganizedBySlides)
          yNextElmt += resFillTalk.yAdded
          const atLeastOneTalkCanFit = resFillTalk.atLeastOneTalkCanFit

          if (atLeastOneTalkCanFit) {
            dataOrganizedBySlides.pop()
            resFillTalk.data.forEach(slide => dataOrganizedBySlides.push(slide))
          } else {
            isEndOfSlideReached = true
            const map = new Map()
            map.set(date, dataOrganized.get(date))
            dataOrganizedBySlides.push(map)
            yNextElmt = DEFAULT_START_Y_INDEX
          }
        }
      }

      // check if there is data left
      date = mapIter.next().value
      if (date === undefined) {
        isEndOfData = true
      }
    }
  }
  return dataOrganizedBySlides
}

/**
 * try to fits as many as possible events for a date so it can fit on the slide
 * @param {Integer} yNextElmt the index of the next element to put in the slide
 * @param {Array} allEventsInADate an array of all the events in a date
 * @param {String} date a date
 * @param {Integer} slides the slides already generated
 * @return { Object } { data, yNextElmt, atLeastOneEventCanFit } an Object that contains the slides
 * it changed/created to fill the last slide given with events, the spaces it need to display everything
 * for this date on the last slide generated and a boolean to see if at least one event and its talks
 * can fit on the last slide given in parameters
 */
function tryToFillWithEvent (yNextElmt, allEventsInADate, date, slides) {
  const dataOrganizedBySlides = slides.slice(-1) // extract the last slide generated
  let i = 0
  let listOfEventThatFits = []
  let atLeastOneEventCanFit = false
  let worthToContinue = (i === 0 || atLeastOneEventCanFit)
  let DoesEventFits = true
  yNextElmt += slideSpacing.DATE
  while (i < allEventsInADate.length && worthToContinue) {
    worthToContinue = (i === 0 || atLeastOneEventCanFit)
    const event = allEventsInADate[i]
    const resEvent = tryEvent(yNextElmt, event)
    DoesEventFits = resEvent.DoesEventFits
    yNextElmt += resEvent.yAdded
    if (DoesEventFits) {
      atLeastOneEventCanFit = true
      listOfEventThatFits.push(event)
    } else {
      if (atLeastOneEventCanFit) {
        // add what can fit
        dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, listOfEventThatFits)

        // prepare the next iteration
        listOfEventThatFits = []
        const map = new Map()
        dataOrganizedBySlides.push(map)
        listOfEventThatFits.push(event)
        yNextElmt = DEFAULT_START_Y_INDEX
        yNextElmt += slideSpacing.DATE
        yNextElmt += resEvent.yAdded
      } else {
        i = allEventsInADate.length // to end the 'while' loop
      }
    }
    i++
    if (i >= allEventsInADate.length && atLeastOneEventCanFit) {
      // flush what's left in listOfEventThatFits
      dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, listOfEventThatFits)
    }
  }
  return { data: dataOrganizedBySlides, yNextElmt, atLeastOneEventCanFit }
}

/**
 * try to fits as many as possible talks for a event so it can fit on the slide
 * @param {Integer} yNextElmt the index of the next element to put in the slide
 * @param {Array} allTalksInAnEvent an array of all the talks for an event
 * @param {String} date a date
 * @param {Object} event an event
 * @param {Integer} slides the slides already generated
 * @return { Object } { data, yNextElmt, atLeastOneTalkCanFit } an Object that contains the slides
 * it changed/created to fill the last slide given with talks, the spaces it need to display everything
 * for this date and this event on the last slide and a boolean to see if at least one talk can
 * fit on the last slide given in parameters
 */
function tryToFillWithTalk (yNextElmt, allTalksInAnEvent, date, event, slides) {
  const dataOrganizedBySlides = slides.slice(-1) // extract the last slide generated
  let i = 0
  let listOfTalksThatFits = []
  let atLeastOneTalkCanFit = false
  let worthToContinue = (i === 0 || atLeastOneTalkCanFit)
  let DoesTalkFits = true
  yNextElmt += slideSpacing.DATE
  yNextElmt += slideSpacing.EVENT
  while (i < allTalksInAnEvent.length && worthToContinue) {
    worthToContinue = (i === 0 || atLeastOneTalkCanFit)
    const talk = allTalksInAnEvent[i]
    const resTalk = tryTalk(yNextElmt)
    DoesTalkFits = resTalk.DoesTalkFits
    yNextElmt += resTalk.yAdded
    if (DoesTalkFits) {
      atLeastOneTalkCanFit = true
      listOfTalksThatFits.push(talk)
    } else {
      if (atLeastOneTalkCanFit) {
        // add what can fit
        const partOfTheEventThatFits = { eventName: event.eventName, eventType: event.eventType, talks: listOfTalksThatFits }
        dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, [partOfTheEventThatFits])

        // prepare the next iteration
        listOfTalksThatFits = []
        const map = new Map()
        dataOrganizedBySlides.push(map)
        listOfTalksThatFits.push(talk)
        yNextElmt = DEFAULT_START_Y_INDEX
        yNextElmt += slideSpacing.DATE
        yNextElmt += slideSpacing.EVENT
        yNextElmt += slideSpacing.TALK
      } else {
        i = allTalksInAnEvent.length // to end the 'while' loop
      }
    }
    i++
    if (i >= allTalksInAnEvent.length && atLeastOneTalkCanFit) {
      // flush what's left in listOfTalksThatFits
      const partOfTheEventThatFits = { eventName: event.eventName, eventType: event.eventType, talks: listOfTalksThatFits }
      dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, [partOfTheEventThatFits])
    }
  }
  return { data: dataOrganizedBySlides, yNextElmt, atLeastOneTalkCanFit }
}

/**
 * check if all the events of a date can fit on the slide
 * @param {Integer} yNextElmt the index of the next element to put in the slide
 * @param {Object} data the data for one date
 * @return {Object} {yAdded, DoesEventFits} an Object that contains the spaces it need to display everything for this date
 * and a boolean to see if it fits on the slide
 */
function tryDate (yNextElmt, data) {
  let sumYAdded = 0
  sumYAdded += slideSpacing.DATE
  data.forEach(event => {
    const yAdded = tryEvent(yNextElmt, event).yAdded
    sumYAdded += yAdded
  })
  return { yAdded: sumYAdded, DoesDateFits: sumYAdded + yNextElmt <= END_OF_SLIDE }
}

/**
 * check if all the talks of an event can fit on the slide
 * @param {Integer} yNextElmt the index of the next element to put in the slide
 * @param {Object} event the event we want to check
 * @return { Object } {yAdded, DoesEventFits} an Object that contains the spaces it need to display everything for this event
 * and a boolean to see if it fits on the slide
 */
function tryEvent (yNextElmt, event) {
  let sumYAdded = 0
  sumYAdded += slideSpacing.EVENT
  event.talks.forEach(talk => {
    sumYAdded += tryTalk(yNextElmt).yAdded
  })

  return { yAdded: sumYAdded, DoesEventFits: sumYAdded + yNextElmt <= END_OF_SLIDE }
}

/**
 * check if a talks can fit on the slide
 * @param {Integer} yNextElmt the index of the next element to put in the slide
 * @return { Object } {yAdded, DoesTalkFits} an Object that contains the spaces it need to display a talk
 * and a boolean to see if it fits on the slide
 */
function tryTalk (yNextElmt) {
  yNextElmt += slideSpacing.TALK
  return {
    yAdded: slideSpacing.TALK, DoesTalkFits: yNextElmt <= END_OF_SLIDE
  }
}

module.exports = {
  clusterByDate,
  DEFAULT_START_Y_INDEX,
  END_OF_SLIDE,
  slideSpacing
}
