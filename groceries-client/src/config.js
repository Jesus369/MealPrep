var firebaseConfig = {
  apiKey: "AIzaSyDZ1mfxRNzZ044bHuaX0YRnVcJZ508ksfU",
  authDomain: "groceryapp-efc9f.firebaseapp.com",
  projectId: "groceryapp-efc9f",
  storageBucket: "groceryapp-efc9f.appspot.com"
};

firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();

var storageRed = storage.ref();
