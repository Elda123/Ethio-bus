var db;

var users = [
    { id: 1, userName: "Eden", password: "123"},
    { id: 2, userName: "Elda", password: "456"},
    { id: 3, userName: "Mekdi", password: "789"},
    
];

document.addEventListener('DOMContentLoaded', () => {

    // create the database
    let userDB = indexedDB.open('users', 1);
    
    userDB.onsuccess = function() {
        db = userDB.result;
        populateUserData();
    }

    userDB.onupgradeneeded = function(event) {
        var db = event.target.result;

        db.onerror = function() {
            console.log('Error loading database.');
        };

        var usersStore = db.createObjectStore('users', {keyPath: 'id'});
        usersStore.createIndex('userName', 'userName', {unique: false});
        usersStore.createIndex('password', 'password', {unique: false});
       

    }


    function populateUserData() {
        var userTransaction = db.transaction(['users'], 'readwrite');
        var userStore = userTransaction.objectStore('users');
        for(let i = 0; i < users.length ; i++) {
          var request = userStore.put(users[i]);
        };
    
        userTransaction.oncomplete = function() {
        //   console.log('User table Populated');
        };

    }
});