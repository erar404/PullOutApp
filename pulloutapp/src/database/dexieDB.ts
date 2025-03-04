// use the Dexie.js RxStorage that stores data in IndexedDB.
import { createRxDatabase } from 'rxdb/plugins/core';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

export const dbDexie = await createRxDatabase({
  name: 'RGMCLocalDb',
  storage: getRxStorageDexie()
});


