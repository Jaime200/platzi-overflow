'use strict'
class Questions {
    constructor(db){
        console.log('Se inicio constructor Questions');
        this.db = db
        this.ref = this.db.ref('/')
        this.collection = this.ref.child('questions')
    }

    async create(data, user){        
        data.owner = user;
        const newData = {
            ...data
        }        
        const question = this.collection.push()
        question.set(newData);
        return question.key
    }

    async getLast(amount){
        const query = await this.collection.limitToLast(amount).once('value')
        const data = query.val();
        return data;
    }


}

module.exports = Questions