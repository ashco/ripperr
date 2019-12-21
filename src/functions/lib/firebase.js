"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This import loads the firebase namespace along with all its type information.
const firebase = require("firebase/app");
// These imports load individual services into the firebase namespace.
require("firebase/auth");
require("firebase/database");
const firebaseui = require("firebaseui");
const config = ({
// your config
});
// This is our firebaseui configuration object
const uiConfig = ({
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    tosUrl: '/terms-of-service' // This doesn't exist yet
});
// This must run before any other firebase functions
firebase.initializeApp(config);
// This sets up firebaseui
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// This adds firebaseui to the page
// It does everything else on its own
exports.startFirebaseUI = function (elementId) {
    ui.start(elementId, uiConfig);
};
//# sourceMappingURL=firebase.js.map