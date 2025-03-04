/* Schema for user table */
import { dbDexie } from "@/database/dexieDB"

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
        typecode: {
            type: 'string'
        },
        password: {
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

const mySchema = {
    keyCompression: true, // set this to true, to enable the keyCompression
    version: 0,
    title: 'human schema with composite primary',
    primaryKey: {
        // where should the composed string be stored
        key: 'id',
        // fields that will be used to create the composed key
        fields: [
            'firstName',
            'lastName'
        ],
        // separator which is used to concat the fields values.
        separator: '|'
    },
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        }
    },
    required: [
      'id', 
      'firstName',
      'lastName'
    ]
  };

export const userCollection = await dbDexie.addCollections({
    Users: {
        schema: userSchema,
        statics: {},                          // (optional) ORM-functions for this collection
        methods: {},                          // (optional) ORM-functions for documents
        attachments: {},                      // (optional) ORM-functions for attachments
        options: {},                          // (optional) Custom parameters that might be used in plugins
        migrationStrategies: {},              // (optional)
        autoMigrate: true                     // (optional) [default=true]
        // cacheReplacementPolicy: function(){}, // (optional) custom cache replacement policy
        // conflictHandler: function(){}         // (optional) a custom conflict handler can be used
    }
})
