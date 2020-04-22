// https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase
// https://stackoverflow.com/questions/57348446/skipwaiting-is-not-installing-new-service-worker-which-is-stuck-in-waiting-pha
//https://medium.com/dev-channel/how-to-add-a-web-app-manifest-and-mobile-proof-your-site-450e6e485638

// self.addEventListener('install', event => {
//   console.log('Installing…');
//
//   // don't wait
//   self.skipWaiting();
// });

self.addEventListener('fetch', (event) => {});
