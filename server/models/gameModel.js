const mongoose = require('mongoose');
const { itemSchemaJoin } = require('./itemModel');
const { ObjectId } = mongoose.Schema.Types;

const game = new mongoose.Schema({
   owner_id: String,
   name: String,
   players: [String],
   createdOn: { type: Date, default: Date.now, immutable: true },
   lastOpened: { type: Date, default: Date.now },
   items: ObjectId,
   npcs: ObjectId,
   timeline: ObjectId,
   party: {
      type: Object,
      players: [String],
      npcs: [ObjectId],
      party_loot: [itemSchemaJoin],
   },
   party: Object,
});

module.exports = mongoose.model('Game', game);
