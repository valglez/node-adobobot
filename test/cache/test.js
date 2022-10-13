const Cache = require('../../src/cache/cache')
const cache = new Cache()

describe('Unit tests for Cache module', () => {
    cache.set(1, 'user1')

    describe('Basic functionality', () => {
        it('Check that the cache object belongs to the Cache class.', () => {
            expect(cache.set()).toEqual(cache)
    })
        it('Should return the correct value from key', () => {
            expect(cache.get(1)).toEqual('user1')
    })
  })
})