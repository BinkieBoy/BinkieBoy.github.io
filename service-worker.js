
var cacheName = 'v1.0';

var cacheAssets = [
    'index.html',
]

// installation
self.addEventListener('install', e => {
      console.log('Service Worker: Installed');
      e.waitUntil(
            caches
              .open(cacheName)
              .then(cache => {
                console.log('Service Worker: Caching Files');
              })
              .then(() => self.skipWaiting())
          );

});    

self.addEventListener('activate', e => {
	console.log('Service worker is nu actief');
});


self.addEventListener('fetch', e => {
	e.respondWith(
	
		// Deze functie wilt een Promise; 
		// 'async function(){..}() wordt door JavaScript 
		// AUTOMATISCH in een Promise verpakt! :-)
		
		async function() {
	
			console.log(`Request onderschept met data: `);
			console.dir(ev.request);
			
			if (e.request.url.indexOf('bgg')>-1){
			
				let oudRequest = e.request;
				let nieuweURL = oudRequest.url.replace('edwalter','stinow');
			
				let nieuwRequest = new Request(
					nieuweURL,
					{
						method: oudRequest.method,
						headers: oudRequest.headers,
						mode: oudRequest.mode,
						credentials: oudRequest.credentials
					}
				);
			
				return fetch(nieuwRequest); //Hier wordt een Promise verwacht
			} else {
				return fetch(e.request);
			}
		}()
	);
});
