'use strict'

const bcrypt = require('bcrypt');
class Users {

    constructor(db){
        this.db = db;
        this.ref = this.db.ref('/');
        this.collection = this.ref.child('users')

    }

    async createUser(data){        
        const dataUser = {
            ...data
        }
        data.password  = await this.constructor.encrypt(dataUser.password)
        const newUser = this.collection.push();
        newUser.set(dataUser);
        return newUser.key
    }

    static async encrypt(password){
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds) ;
        return hashedPassword
    }


}

module.exports = Users