const { filterFilesBetween2Dates } = require('../google-api/drive')
describe('google drive', () => {
  describe('talk file filter', () => {
    it('should return an error if no file match', () => {
      // given
      const files = [
        {
          ..._createValidFile(),
          name: 'unvalid name 1'
        },
        {
          ..._createValidFile(),
          name: '2021 - unvalid name'
        }
      ]
      // then
      expect(() => { filterFilesBetween2Dates('2021-12-21', '2022-12-21', files) }).toThrow('no talk file for those dates in the folder')
    })
    it('should return an array of object {name : nameOfFile, id : idOfFile} if at least on file match', () => {
      // given
      const files = [_createValidFile()]
      // when
      const res = filterFilesBetween2Dates('2021-12-21', '2022-12-21', files)
      // then
      expect(res[0]).toHaveProperty('name')
      expect(res[0]).toHaveProperty('id')
    })
    it('should return an array that contains object which have a name that match', () => {
      // given
      const files = [
        _createValidFile(),
        {
          ..._createValidFile(),
          name: '2021 - unvalid name'
        }
      ]
      // when
      const res = filterFilesBetween2Dates('2021-12-21', '2022-12-21', files)
      // then
      expect(res[0]).toMatchObject({ name: '2022 - Les Evénements et talks Zenika  (Zenika talks and events)' })
      expect(res).toHaveLength(1)
    })
    it('should return only objects in which the year within the name match the dates ', () => {
      // given
      const files = [
        _createValidFile(),
        {
          ..._createValidFile(),
          name: '2020 - Les Evénements et talks Zenika  (Zenika talks and events)'
        }
      ]
      // when
      const res = filterFilesBetween2Dates('2021-12-21', '2022-12-21', files)
      // then
      expect(res[0]).toMatchObject({ name: '2022 - Les Evénements et talks Zenika  (Zenika talks and events)' })
      expect(res).toHaveLength(1)
    })
    it('should return only objects in which the name part without the year match the usual talk file name', () => {
      // given
      const files = [
        _createValidFile(),
        {
          ..._createValidFile(),
          name: '2021 - invalid name'
        }
      ]
      // when
      const res = filterFilesBetween2Dates('2021-12-21', '2022-12-21', files)
      // then
      expect(res[0]).toMatchObject({ name: '2022 - Les Evénements et talks Zenika  (Zenika talks and events)' })
      expect(res).toHaveLength(1)
    })
  })
})

function _createValidFile () {
  return {
    name: '2022 - Les Evénements et talks Zenika  (Zenika talks and events)',
    id: '1DQOJSZNdqslijfqeq'
  }
}
