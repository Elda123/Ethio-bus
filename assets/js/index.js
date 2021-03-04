//create database
const db = new Dexie('from');
db.version(1).stores({
    table1:`name,age`
})
db.open();