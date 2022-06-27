// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://192.168.0.146:8000/api",
  assetsUrl : "https://prof.blob.core.windows.net/stockage/",
  mapboxAccessToken : "pk.eyJ1IjoidmljdG9yZHJuZCIsImEiOiJjanR3eHhhY3oxNDUwNDNsemE1aG5peGl2In0.YeRJsFQXOp8GFHBiQsoHEQ",
  publicStripeKey : "pk_test_EgijVNj7OVzXPr5onG0G31Zo",
  videoApiKey : "3416b90f-3295-4acb-b012-5d862ddde049",
  chatServer : "http://192.168.0.146:3000",
  socketServer : "http://192.168.0.146:3005"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
