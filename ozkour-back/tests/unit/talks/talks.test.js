const { Talk } = require('../../../src/domain/model/talk.js')
describe('Talks', () => {
  it('return the talk as a String', () => {
    const newTalk = {
      date: '21/12/2021',
      universe: 'Univers 1',
      eventType: 'Meetup',
      eventName: 'Le Meetup',
      talkTitle: 'Pourquoi les Meetups c est cool?',
      speakers: 'c moi',
      url: 'https://www.youtube.com/watch?v=Duh2Er1n9qs'
    }
    const talk = new Talk(newTalk)
    expect(talk.toString()).toBe(`date : ${newTalk.date},universe : ${newTalk.universe},eventType : ${newTalk.eventType},eventName : ${newTalk.eventName},talkTitle : ${newTalk.talkTitle},speakers : ${newTalk.speakers},url : ${newTalk.url}`)
  })
})
