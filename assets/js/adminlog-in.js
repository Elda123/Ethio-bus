var userDatabase;
const userNameInput = document.getElementById('userName');
const pwdInput = document.getElementById('password');
const form = document.getElementById('login-form');
const showError = document.querySelector('.show-error');

var userAuthenticated = false;

let userDB = indexedDB.open('admin', 1);
    
userDB.onsuccess = function() {
    userDatabase = userDB.result;
}

form.addEventListener('submit', authenticate);

function authenticate(event) {
    event.preventDefault();

    var user = userNameInput.value;
    var pwd = pwdInput.value;

    let transaction = userDatabase.transaction('admin');
    let userStore = transaction.objectStore('admin');

    userStore.openCursor().onsuccess = function(e) {
        let cursor = e.target.result;

        if (cursor) {
            if ((user == cursor.value.userName) && (pwd == cursor.value.password)) {
                userAuthenticated = true;
            } 
            cursor.continue();
        }
    }  

    transaction.oncomplete = function() {
        if (userAuthenticated) {
            event.target.submit();
            
        } else {
            showError.textContent = "Incorrect username or password entered.";

        }
    }
    
}