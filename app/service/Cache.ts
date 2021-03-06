import { Service } from 'egg';

export default class CacheService extends Service {
  async get(key) {
    const { redis, logger } = this.app;
    const t = Date.now();
    let data = await redis.get(key);
    if (!data) return;
    data = JSON.parse(data);
    const duration = Date.now() - t;
    logger.debug('Cache', 'get', key, (duration + 'ms'));
    return data;
  }

  async setex(key, value, seconds) {
    const { redis, logger } = this.app;
    const t = Date.now();
    value = JSON.stringify(value);
    await redis.set(key, value, 'EX', seconds);
    const duration = Date.now() - t;
    logger.debug('Cache', 'set', key, (duration + 'ms'));
  }

  async incr(key, seconds) {
    const { redis, logger } = this.app;
    const t = Date.now();
    const result = await redis
      .multi()
      .incr(key)
      .expire(key, seconds)
      .exec();
    const duration = Date.now() - t;
    logger.debug('Cache', 'set', key, (duration + 'ms'));
    return result[0][1];
  }
}
