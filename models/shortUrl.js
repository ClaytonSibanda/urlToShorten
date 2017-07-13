/**
 * Created by Clayza on 2017-07-10.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema =new Schema({

    originalUrl: String,
    shortUrl: String
}   ,{timestamps: true});

const modelClass = mongoose.model('shortUrl',urlSchema);

module.exports = modelClass;


