'use strict'

const bcrypt = require('bcrypt');
class Users {

    constructor(db){
        this.db = db;
        this.ref = this.db.ref('/');
        this.collection = this.ref.child('users')

    }

    async createUser(data){        
        let dataUser = {
            ...data
        }        
        dataUser.password  = await this.constructor.encrypt(dataUser.password)
        const newUser = this.collection.push();
        newUser.set(dataUser);
        return newUser.key
    }

    static async encrypt(password){
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds) ;
        return hashedPassword
    }

    async validateUser(data){
        const userQuery = await this.collection.orderByChild('email').equalTo(data.email).once('value');
        const userFound = userQuery.val();
        if(userFound){
            
            console.log(Object.keys(userFound)[0]);
            const userId = Object.keys(userFound)[0];
            
            const passwdRight = await bcrypt.compare(data.password,userFound[userId].password)
            const result = (passwdRight) ? userFound[userId] : false;
            return result;
        }

        

    }
}

module.exports = Users