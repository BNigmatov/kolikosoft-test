import { caching } from 'cache-manager';


const DEF_TTL = 5 * 1000; // 5s

export const memoryCache = await caching('memory', {
    max: 100,
    ttl: DEF_TTL,
});
