const mongoose = require('mongoose');
const { ObjectId, Mixed } = mongoose.Schema.Types;

const itemSchemaJoin = mongoose.Schema({
   loot_id: ObjectId,
   quantity: Number,
   nickname: String,
   details: [String],
   bonuses: [Mixed],
   carried: Boolean,
});

const item = mongoose.Schema({
   name: String,
   type: {
      type: String,
      enum: ['weapon', 'armor', 'gear'],
   },
   description: String,
   weight: Number,
   data: {
      type: Object,
      enum: [
         {
            damage: String,
            range: String,
         },
         {
            defense: String,
         },
      ],
   },
});

const itemModel = module.exports = mongoose.model('Item', item);
itemModel.itemSchemaJoin = itemSchemaJoin;
