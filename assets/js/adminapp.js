var db;

var admin = [
    { id: 1, userName: "abebe", password: "abebe"},
   
   
];

document.addEventListener('DOMContentLoaded', () => {

    // create the database
    let userDB = indexedDB.open('admin', 1);
    
    userDB.onsuccess = function() {
        db = userDB.result;
        populateUserData();
    }

    userDB.onupgradeneeded = function(event) {
        var db = event.target.result;

        db.onerror = function() {
            console.log('Error loading database.');
        };

        var usersStore = db.createObjectStore('admin', {keyPath: 'id'});
        usersStore.createIndex('userName', 'userName', {unique: false});
        usersStore.createIndex('password', 'password', {unique: false});
       

    }


    function populateUserData() {
        var userTransaction = db.transaction(['admin'], 'readwrite');
        var userStore = userTransaction.objectStore('admin');
        for(let i = 0; i < admin.length ; i++) {
          var request = userStore.put(admin[i]);
        };
    
        userTransaction.oncomplete = function() {
        //   console.log('User table Populated');
        };

    }
});