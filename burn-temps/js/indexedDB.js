import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8/+esm';

const DB_NAME = 'recordsDB';
const STORE_NAME = 'records';

// Open the database
export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'Id' });
            }
        }
    });
};

// Add records to the store
export const saveRecords = async records => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    // Clear existing records
    store.clear();

    // Add new records
    records.forEach(record => {
        store.add(record);
    });

    await tx.done;
};

// Get all records from the store
export const getAllRecords = async () => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    return store.getAll();
};
