const makeUser = require('./user')
const { UniqueConstraintError } = require('../helpers/errors')
const catchAsync = require('../helpers/catch-async')
module.exports = function makeUserList({ database }) {
    return Object.freeze({
        add,
        findByEmail,
        findById,
        getItems,
        remove,
        replace,
        update,
    })

    async function getItems({ max = 100, before, after } = {}) {
        const db = await database
        const query = {}
        if (before || after) {
            query._id = {}
            query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
            query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
        }

        return (await db.collection('users').find(query).limit(Number(max)).toArray()).map(documentToUser)
    }

    async function add({ userId, ...user }) {
        return catchAsync(async () => {
            const db = await database
            if (userId) {
                console.log('db.makeId', db.makeId.toString())
                user._id = db.makeId(userId)
            }
            const { result, ops } = await db
                .collection('users')
                .insertOne(user)
                .catch((mongoError) => {
                    const [errorCode] = mongoError.message.split(' ')
                    if (errorCode === 'E11000') {
                        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
                        throw new UniqueConstraintError(mongoIndex === 'UserEmailIndex' ? 'email' : 'userId')
                    }
                    throw mongoError
                })
            console.log('result ==>', result)
            console.log('ops ==>', ops)
            return {
                success: result.ok === 1,
                created: documentToUser(ops[0]),
            }
        })
    }

    async function findById({ userId }) {
        const db = await database
        const found = await db.collection('users').findOne({ _id: db.makeId(userId) })
        if (found) {
            return documentToUser(found)
        }
        return null
    }

    async function findByEmail({ email }) {
        const db = await database
        const results = await db.collection('users').find({ email }).toArray()
        return results.map(documentToUser)
    }

    async function remove({ userId, ...user }) {
        const db = await database
        if (userId) {
            user._id = db.makeId(userId)
        }

        const { result } = await db.collection('users').deleteMany(user)
        return result.n
    }

    // todo:
    async function replace(user) {}

    // todo:
    async function update(user) {}

    function documentToUser({ _id: userId, ...doc }) {
        return makeUser({ userId, ...doc })
    }
}
