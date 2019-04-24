// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDlib_eSWxnRwHnABW8YwxyUo-uHD3EMPg',
    authDomain: 'me-arash.firebaseapp.com',
    databaseURL: 'https://me-arash.firebaseio.com',
    projectId: 'me-arash',
    storageBucket: 'me-arash.appspot.com',
    messagingSenderId: '305977168091'
  },
  apiUrl: 'http://localhost:5000/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
