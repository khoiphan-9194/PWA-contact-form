// TODO: Create a service worker that caches static assets:

// this will define how the service worker should do the caching or customizing the caching rules. 


import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Import the expiration plugin
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);// The precacheAndRoute function is used to precache the assets that are part of the webpack build.

// Register route for caching dynamic CSS and JS files.
// i.e. bootstrap, jQuery, ...
// The StaleWhileRevalidate strategy serves content from cache AND loads it from source if needed.
registerRoute(
  ({ request }) => {
    console.log(request);
    return (
      // CSS
      request.destination === 'style' ||
      // JavaScript
      request.destination === 'script'||
      //worker
      request.destination === 'worker'

    );
  },
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // The statuses option is used to specify the status codes that should be cached.
      }),
    ],
  })
);

// Register route for caching dynamic images
// The cache first strategy is often the best choice for images because it saves bandwidth and improves performance.
registerRoute(
  ({ request }) => request.destination === 'image',// The destination option is used to specify the destination of the request.
  new CacheFirst({
    cacheName: 'my-image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],// The statuses option is used to specify the status codes that should be cached.
      }),
      new ExpirationPlugin({
        maxEntries: 20, // The maxEntries option is used to specify the maximum number of entries that should be cached.
        maxAgeSeconds: 30 * 24 * 60 * 60, // The maxAgeSeconds option is used to specify the maximum age of the cache entries.
        // The maxAgeSeconds option is set to 30 days. if the cache entry is older than 30 days, it will be deleted.
      }),
    ],
  })
);
