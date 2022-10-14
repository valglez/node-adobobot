const Cache = require('../../src/cache/cache')
const cache = new Cache()

describe('Unit tests for Cache module', () => {

  describe('Basic functionality', () => {
    it('Check that the cache object belongs to the Cache class.', () => {
      expect(cache instanceof Cache).toEqual(true)
    })
    it('Check the memory increase when inserting an item', () => {
      const wasOK = cache.set(1, 'user1')
      cache.set(2, 'user2')
      cache.set('pepe', 'userpepe')
      expect(wasOK).toEqual(true)
      expect(cache.getSize()).toEqual(3)
    })
    it('Check the memory doesn´t increase when inserting wrong items', () => {
      const wasOK = cache.set()
      expect(wasOK).toEqual(false)
      expect(cache.getSize()).toEqual(3)
    })
    it('Check get cache user', () => {
      expect(cache.get('pepe')).toEqual('userpepe')
    })
    it('Check get cache user', () => {
      expect(cache.get()).toEqual(false)
    })
    it('Check duplicated inserts', () => {
      cache.set(1000, 'user1000')
      cache.set(1000, 'userupdate')
      expect(cache.get(1000)).toEqual('userupdate')
    })
    it('Check key doesn`t exist', () => {
      expect(cache.get(423)).toEqual(false)
    })
  })
})