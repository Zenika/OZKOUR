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
  // console.log(dataOrganized.get('19/01/2021')[0].talks);
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

      if (DoesDateFits) { // toute la date rentre
        dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, dataOrganized.get(date))
      } else { // toute la date ne rentre pas
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

      // on verifie s'il reste des données
      date = mapIter.next().value
      if (date === undefined) {
        isEndOfData = true
        // console.log(dataOrganizedBySlides[dataOrganizedBySlides.length - 1], 'no');
        // console.log(dataOrganizedBySlides,' oui');
        // console.log(dataOrganizedBySlides[0], 'ole');

        // console.log('0', dataOrganizedBySlides[0]);
        // console.log('1', dataOrganizedBySlides[1]);
        // console.log('2', dataOrganizedBySlides[2]);

        // if (dataOrganizedBySlides[dataOrganizedBySlides.length - 1].length === 0) {
        //   dataOrganizedBySlides.pop()
        // }
      }
    }
  }
  // console.log(dataOrganizedBySlides)
  // dataOrganizedBySlides.forEach(slide => console.log(slide.get('19/01/2021').talks))

  return dataOrganizedBySlides
}

function tryToFillWithEvent (yNextElmt, allEventsInADate, date, data) {
  const dataOrganizedBySlides = data.slice(-1)
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
        // on ajoute ce qui rentre
        dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, listOfEventThatFits)

        // on prepare la prochaine fois que ça rentre
        listOfEventThatFits = []
        const map = new Map()
        dataOrganizedBySlides.push(map)
        listOfEventThatFits.push(event)
        yNextElmt = DEFAULT_START_Y_INDEX
        yNextElmt += slideSpacing.DATE
        yNextElmt += resEvent.yAdded
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

function tryToFillWithTalk (yNextElmt, allTalksInAnEvent, date, event, data) {
  const dataOrganizedBySlides = data.slice(-1)
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
        // on ajoute ce qui rentre
        const partOfTheEventThatFits = { eventName: event.eventName, eventType: event.eventType, talks: listOfTalksThatFits }
        dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, [partOfTheEventThatFits])

        // on prepare la prochaine fois que ça rentre
        listOfTalksThatFits = []
        const map = new Map()
        dataOrganizedBySlides.push(map)
        listOfTalksThatFits.push(talk)
        yNextElmt = DEFAULT_START_Y_INDEX
        yNextElmt += slideSpacing.DATE
        yNextElmt += slideSpacing.EVENT
        yNextElmt += slideSpacing.TALK
      } else {
        i = allTalksInAnEvent.length // to end the loop
      }
    }
    i++
    if (i >= allTalksInAnEvent.length && atLeastOneTalkCanFit) {
      const partOfTheEventThatFits = { eventName: event.eventName, eventType: event.eventType, talks: listOfTalksThatFits }
      dataOrganizedBySlides[dataOrganizedBySlides.length - 1].set(date, [partOfTheEventThatFits])
    }
  }
  return { data: dataOrganizedBySlides, yNextElmt, atLeastOneTalkCanFit }
}

function tryDate (yNextElmt, data) {
  let sumYAdded = 0
  sumYAdded += slideSpacing.DATE
  data.forEach(event => {
    const yAdded = tryEvent(yNextElmt, event).yAdded
    sumYAdded += yAdded
  })
  return { yAdded: sumYAdded, DoesDateFits: sumYAdded + yNextElmt <= END_OF_SLIDE }
}

function tryEvent (yNextElmt, event) {
  let sumYAdded = 0
  sumYAdded += slideSpacing.EVENT
  event.talks.forEach(talk => {
    sumYAdded += tryTalk(yNextElmt).yAdded
  })

  return { yAdded: sumYAdded, DoesEventFits: sumYAdded + yNextElmt <= END_OF_SLIDE }
}

function tryTalk (yNextElmt) {
  yNextElmt += slideSpacing.TALK
  return {
    yAdded: slideSpacing.TALK, DoesTalkFits: yNextElmt <= END_OF_SLIDE
  }
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
