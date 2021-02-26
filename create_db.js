window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var request = window.indexedDB.open("ethioBus", 1); 
request.onerror = function(event) {
  console.error("Database error: " + event.target.errorCode);
};
request.onupgradeneeded  = function(event) {
  db = event.target.result;
  userStore=db.createObjectStore('users',{autoIncrement: true});
  userStore.createIndex("name", "name", { unique: false })
  userStore.createIndex("email", "email", { unique: true })
  ticketStore=db.createObjectStore('ticket',{autoIncrement: true});
  ticketStore.createIndex("start","start",{ unique: false })
  ticketStore.createIndex("end","end",{ unique: false })
  messageStore=db.createObjectStore('messages',{autoIncrement: true});
  pendingStore=db.createObjectStore('pending',{autoIncrement: true});
  pendingStore.createIndex('ticket','ticket',{multiEntry: true})
  pendingStore.createIndex('users','ticket',{multiEntry: true})
};