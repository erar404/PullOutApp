import { createRxDatabase, addRxPlugin } from 'rxdb/plugins/core';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';
import { inject, Plugin } from 'vue';

import { 
    RxUserDocument,
    RxUserCollection,
    RxUsersCollections,
    RxUserDocumentType,
    RxLocalDatabase
 } from '@/RxDB';
 
import userSchema from '@/schemas/User.schema';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { removeRxDatabase } from 'rxdb';
import { RxDBCleanupPlugin } from 'rxdb/plugins/cleanup';
            
const KEY_DATABASE = Symbol('database');
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBMigrationSchemaPlugin);
addRxPlugin(RxDBJsonDumpPlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

if (process.env.NODE_ENV === 'development') {
    // in dev-mode we add the dev-mode plugin
    // which does many checks and adds full error messages
    // const collectionDoc = await RxLocalDatabase.collectionsCollection.findOne({name: "users"}).exec();
    // await collectionDoc.remove();
    console.log('dev mode on')
    addRxPlugin(RxDBDevModePlugin);
    addRxPlugin(RxDBCleanupPlugin)
    removeRxDatabase('rgmclocaldb',  getRxStorageDexie());
    console.log('cleanup complete')
  }


export function useDatabase(): RxLocalDatabase {
    return inject(KEY_DATABASE) as RxLocalDatabase;
}

export async function createDatabase(): Promise<Plugin> {
    console.log('Database: Creating Local Database..');
    const db = await createRxDatabase<RxUsersCollections>({
        name: 'rgmclocaldb',
        storage: wrappedValidateAjvStorage ({
            storage : getRxStorageDexie()
        }),
        multiInstance: true,
        cleanupPolicy: {}
    })
    console.log('DatabaseService: created database');
    (window as any).db = db; // write to window for debugging

    db.waitForLeadership().then(() => {
        console.log('Leader')
        document.title = '♛ ' + document.title;
    });

    
    // Create Collections
    console.log('Database: Create collections')
    
    await db.addCollections({
        users: {
            schema: userSchema,
            methods: {
                userAge(this: RxUserDocument): number {
                    return this.graceLoginLeft;
                }
            }
        }
    })

    // Collection Hooks
    console.log('creating hooks')
    db.collections.users.preInsert((docObj: RxUserDocumentType) => {
        const secCode = docObj.secCode;
        return db.collections.users.findOne({
            selector: {
                secCode,
            },
        }).exec().then((has: RxUserDocument | null) => {
            if (has != null) {
                alert('SecCode Already Exists');
                throw new Error('SecCode ' + secCode + 'Already  Exists')
            }
            return db;
        });
    }, true );

    return {
        install(app: any) {
            app.provide(KEY_DATABASE, db);
        }
    }
}
