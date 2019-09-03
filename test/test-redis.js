const Redis = require('ioredis')

const redis = new Redis({}) //this is a class from ioredis,we can new a Example to use this
//redis is instanse of Redis

const test = async (key,value)=>{
  await redis.set(key,value)
  const keys = await redis.keys('*')
  console.log(a)
}

// module.exports = test


class RedisIo {
  async getRedis(key) {
    const result = await redis.get(key)
    console.log(result)
  }
}

module.exports = RedisIo