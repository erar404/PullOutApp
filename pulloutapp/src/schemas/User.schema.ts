// RxD Schema for SystemUser
import { RxJsonSchema } from 'rxdb';
import { RxUserDocumentType } from '@/RxDB';

const userSchema : RxJsonSchema<RxUserDocumentType> = {
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
            type: 'string'
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
        'isActive',
        'expirationDate'
    ]
}


export default userSchema