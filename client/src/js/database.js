// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
    openDB('contacts', 1, {
        upgrade(db) {
           if(db.objectStoreNames.contains('contacts_ListDB')) {
            //    db.deleteObjectStore('contacts');
            console.log('ERROR contacts_ListDB database already exists');
            return
           }
           db.createObjectStore('contacts_ListDB', {keyPath: 'id', autoIncrement: true});
           console.log('contacts_ListDB database created');
        }
    });


};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    console.log('postDb function called');

    //open the database
    const contactsDB = await openDB('contacts', 1);
    //create a transaction
    const tx = contactsDB.transaction('contacts_ListDB', 'readwrite');
    console.log('transaction created', tx);
    //get the object store from the transaction
    const store = tx.objectStore('contacts_ListDB');
    console.log('store created', store);

    //add the data to the object store
    store.add({name: name, home_phone: home, cell_phone: cell, email: email});
    console.log('data added to store');

 
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
    console.log('getDb function called');
    //open the database
    const contactsDB = await openDB('contacts', 1);
    //create a transaction
    const tx = contactsDB.transaction('contacts_ListDB', 'readonly');
    console.log('transaction created', tx);
    //get the object store from the transaction
    const store = tx.objectStore('contacts_ListDB');
    console.log('store created', store);

    //get all the data from the object store
    const result = await store.getAll();
    console.log('data retrieved from store', result);
    return result;
  
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    console.log("deleteDb function called",id);
    const contactsDB = await openDB('contacts', 1); //open the database
    const tx = contactsDB.transaction('contacts_ListDB', 'readwrite'); //create a transaction
    const store = tx.objectStore('contacts_ListDB'); //get the object store from the transaction
    const request = store.delete(id); //delete the data from the object store
    console.log('data deleted from store', request);
    const result = await request;
    return result;
  
};

initdb();
