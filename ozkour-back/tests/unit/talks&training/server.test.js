const { init } = require('@/server')

describe('server', () => {
  describe('GET /', () => {
    let server

    beforeEach(async () => {
      server = await init()
    })

    afterEach(async () => {
      await server.stop()
    })

    it('responds with 200', async () => {
      const res = await server.inject({
        method: 'get',
        url: '/ping'
      })
      expect(res.statusCode).toBe(200)
    })
  })
})
