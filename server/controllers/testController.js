const Test = require('../models/testModel');

module.exports = {
   getItems: async (req, res) => {
      try {
         const items = await Test.find();
         res.status(200).send(items);
         return items;
      } catch (error) {
         res.status(400).send(error);
      }
   },

   getItem: async (req, res) => {
      try {
         const id = req.params.id;
         const item = await Test.findById(id);
         res.status(200).send(item);
      } catch (error) {
         res.status(400).send(error);
      }
   },

   addItem: async (req, res) => {
      try {
         const item = new Test({ ...req.body });
         const newItem = await item.save();
         res.status(200).send(newItem);
      } catch (error) {
         res.status(400).send(error);
      }
   },

   updateItem: async (req, res) => {
      try {
         const id = req.params.id;
         const item = req.body;
         const { ...updateData } = item;
         const update = await Test.findByIdAndUpdate(id, updateData, { new: true });
         res.status(200).send(update);
      } catch (error) {
         res.status(400).send(error)
      }
   },

   deleteItem: async (req, res) => {
      try {
         const id = req.params.id;
         const item = await Test.findByIdAndRemove(id);
         res.status(200).send('Delete successful');
      } catch (error) {
         res.status(400).send(error);
      }
   }
};
