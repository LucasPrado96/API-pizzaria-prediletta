import { Sequelize } from 'sequelize';
import configDatabase from '../config/database'
import mongoose from 'mongoose';

import Users from '../app/models/Users'
import Products from '../app/models/Products'
import Category from '../app/models/Category';

const models = [Users, Products, Category];

class Database{
    constructor(){
        this.init();
        this.mongo()
    }

    init(){
        this.connection = new Sequelize('postgresql://postgres:TFiZAyKNlESZnjpNFysELbkutRjDJtau@junction.proxy.rlwy.net:43732/railway');
        models.map((model) => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models))
        
    }

    mongo() {
        this.mongoConnection = mongoose.connect('mongodb://mongo:COiPeSidBtXebQXRNfszwSCzrDWWoers@autorack.proxy.rlwy.net:17056')
    };

}

export default new Database()