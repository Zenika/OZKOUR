const index = require('../index')
describe('index', () => {
  it('should return true if the server started correctly', async () => {
    expect(await index.initTest()).toBeTruthy()
  })
})
