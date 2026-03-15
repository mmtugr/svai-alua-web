(function () {
  'use strict';

  const firebaseConfig = {
    apiKey: "AIzaSyDK7gvUbxugTZun6XDgpyJmADWnTn155wY",
    authDomain: "too-alua.firebaseapp.com",
    projectId: "too-alua",
    storageBucket: "too-alua.firebasestorage.app",
    messagingSenderId: "654043161686",
    appId: "1:654043161686:web:7674fcc440108e1906c7f7"
  };

  firebase.initializeApp(firebaseConfig);
  window.firebaseDb = firebase.firestore();
  window.firebaseAuth = firebase.auth();
})();
