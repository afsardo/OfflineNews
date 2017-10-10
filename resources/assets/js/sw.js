import Offline from './offline/offline.js';

const expectedCaches = ['static-v1'];
const version = 1;
var files = [
    'app.js',

];

self.addEventListener('install', event => {
    //console.log('V1 installing…');

    event.waitUntil(
        caches.open('static-v1').then(cache => {
            cache.addAll(files);
        })
    );
});

self.addEventListener('activate', event => {
    // delete any caches that aren't in expectedCaches
    // which will get rid of static-v1
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!expectedCaches.includes(key)) {
                    return caches.delete(key);
                }
            })
        )).then(() => {
            //console.log('V1 now ready to handle fetches!');
        })
    );
});

self.addEventListener('fetch', event => {
    if (Offline.canHandle("/api", event.request)) {
        event.respondWith(Offline.handle(event.request).then(response => {
            return response;
        }));
        return;
    }

    const url = new URL(event.request.url);
    if (event.request.method!=="GET" || url.pathname.includes('/api')) { // Ignore some requests
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function(cached) {
            var networked = fetch(event.request).then(fetchedFromNetwork, unableToResolve).catch(unableToResolve);

            //console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
            return cached || networked;

            function fetchedFromNetwork(response) {
                var cacheCopy = response.clone();

                //console.log('WORKER: fetch response from network.', event.request.url);

                caches.open(version + 'pages').then(function add(cache) {
                    cache.put(event.request, cacheCopy);
                }).then(function() {
                    //console.log('WORKER: fetch response stored in cache.', event.request.url);
                });

                // Return the response so that the promise is settled in fulfillment.
                return response;
            }

            function unableToResolve () {
                //console.log('WORKER: fetch request failed in both cache and network.');

                return new Response('<h1>Your device doesn\'t support the offline capability.</h1>', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/html'
                    })
                });
            }
        })
    );
});