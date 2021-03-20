const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const testSchema = new mongoose.Schema({
   title: String,
   age: Number,
   owner_id: ObjectId,
});

module.exports = mongoose.model('Test', testSchema);
