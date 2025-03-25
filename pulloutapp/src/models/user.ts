/* Schema for user table */
import { RxDocument, RxCollection, RxDatabase } from "rxdb"
import { dbDexie } from "@/database/dexieDB"
import { mobileDatabase } from "@/main"

interface RxUserDocumentType {
    secCode: string;
    typeCode: string;
    passWord: string;
    expirationDate: string;
    graceLoginLeft: number;
    isActive: boolean;
}

type RxUserDocument = RxDocument<RxUserDocumentType>
type RxUserCollection = RxCollection<RxUserDocumentType>

const userSchema = {
    title: 'user schema',
    version: 0,
    description: 'used for credential management',
    primaryKey: 'secCode',
    type: 'object',
    properties: {
        secCode: {
            type: 'string',
            maxLength : 100
        },
        typeCode: {
            type: 'string'
        },
        passWord: {
            type: 'string'
        },
        expirationDate: {
            type: 'string',
            format: 'date-time'
        },
        graceLoginLeft: {
            type: 'number'
        },
        isActive: {
            type: 'boolean',
            default: true
        }
    },
    required : [
        'secCode',
        'isActive'
    ]
}

// export const userCollection = await dbDexie.addCollections({
//     Users: {
//         schema: userSchema,
//         statics: {},                          // (optional) ORM-functions for this collection
//         methods: {},                          // (optional) ORM-functions for documents
//         attachments: {},                      // (optional) ORM-functions for attachments
//         options: {},                          // (optional) Custom parameters that might be used in plugins
//         migrationStrategies: {},              // (optional)
//         autoMigrate: true                     // (optional) [default=true]
//         // cacheReplacementPolicy: function(){}, // (optional) custom cache replacement policy
//         // conflictHandler: function(){}         // (optional) a custom conflict handler can be used
//     }
// })
// --------- Transfer function top index
