import { api } from '@/api/apiConfig'
import { setActivePinia, createPinia } from 'pinia'
import { dataSetFactory } from './dataset/talks.dataset.js'

import { useTalkStore } from '@/stores/talks'

jest.mock('@/api/apiConfig')

describe('Talk Store', () => {
  /** @type{ ReturnType< import('./dataset/talks.dataset.js').dataSetFactory> } */
  let talksDataSet
  beforeEach(() => {
    talksDataSet = dataSetFactory()
    setActivePinia(createPinia())
  })

  it('updateTalks', () => {
    const talk = useTalkStore()
    expect(talk.retrieved.length).toBe(0)
    talk.updateTalks(talksDataSet.allTalks)
    expect(talk.retrieved.length).toBe(talksDataSet.allTalks.length)
    expect(talk.retrieved).toStrictEqual(talksDataSet.allTalks)
  })

  it('getSelectedTalks give all talks by default ', () => {
    const talk = useTalkStore()
    expect(talk.retrieved.length).toBe(0)
    talk.updateTalks(talksDataSet.allTalks)
    expect(talk.getSelectedTalks.length).toBe(talksDataSet.allTalks.length)
    expect(talk.retrieved).toStrictEqual(talksDataSet.allTalks)
  })

  it('getSelectedTalksTitle give all talkTitles by default ', () => {
    const talk = useTalkStore()
    expect(talk.retrieved.length).toBe(0)
    talk.updateTalks(talksDataSet.allTalks)
    expect(talk.getSelectedTalksTitle.length).toBe(talksDataSet.allTalks.length)
    expect(talk.getSelectedTalksTitle).toStrictEqual(talksDataSet.allTalks.map(el => el.talkTitle))
  })

  describe('generateSlidesForSelectedTalks action', () => {
    it('should return the slide\'s link given status code to be 200', async () => {
      const talk = useTalkStore()

      talk.updateTalks(talksDataSet.allTalks)

      api.post.mockResolvedValueOnce({
        data: {
          link: 'https://monliendeslide.com'
        }
      })
      const res = await talk.generateVisualForSelectedTalks('E-mailing')

      expect(res.link).toBe('https://monliendeslide.com')
    })
    it('should return null when the visual is unknown', async () => {
      const talk = useTalkStore()

      talk.updateTalks(talksDataSet.allTalks)

      const res = await talk.generateVisualForSelectedTalks('blblblb')

      expect(res.link).toBe(null)
    })
  })
  describe('getTalks action', () => {
    it('should return the retrieved talks', async () => {
      const talk = useTalkStore()

      api.get.mockResolvedValueOnce({
        data: talksDataSet.allTalks.map((el) => {
          return {
            date: el.date,
            universe: el.universe,
            eventType: el.eventType,
            eventName: el.eventName,
            talkTitle: el.talkTitle,
            speakers: el.speakers
          }
        })
      })
      const res = await talk.getTalks()

      expect(res).toStrictEqual(talksDataSet.allTalks)
    })
  })
  describe('changeSelectionTalk action', () => {
    it('should inverse the checked attributed', async () => {
      const talk = useTalkStore()

      talk.updateTalks(talksDataSet.allTalks)

      talk.changeSelectionTalk(talksDataSet.allTalks[0])
      expect(talk.retrieved[0].checked).toBe(false)
    })
  })
  describe('sort action', () => {
    it('should return the sorted talk according to a key', async () => {
      const talk = useTalkStore()
      const valueEmitted = { selectedColumnKey: 'talkTitle', orderIsAscending: true, events: talksDataSet.allTalks }

      const talksOrdered = talksDataSet.allTalks

      api.post.mockResolvedValueOnce({
        data: talksOrdered
      })
      await talk.sort(valueEmitted)
      expect(talk.retrieved).toStrictEqual(talksOrdered)
    })
  })
})
