/**
 * custom typings so typescript knows about the schema-fields
 */

import { RxDocument, RxCollection, RxDatabase } from 'rxdb';


// Make an entry here for each new tables to be implemented offline
// *** User 
export interface RxUserDocumentType {
    secCode: string;
    typeCode: string;
    passWord: string;
    expirationDate: string;
    graceLoginLeft: number;
    isActive: boolean;
}

interface RxUserDocMethods {
    userAge(): number,
}

export type RxUserDocument = RxDocument<RxUserDocumentType, RxUserDocMethods>
export type RxUserCollection = RxCollection<RxUserDocumentType, RxUserDocMethods, {}>
export interface RxUsersCollections {
    users: RxHeroCollection 
}

export type RxLocalDatabase = RxDatabase<RxUsersCollection>

