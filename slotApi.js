const slotModel = require('../model/slotModel');
const fs = require("fs/promises");

async function getAllSlots(vehicleType) {
    try {
        console.log("vehicleType",vehicleType);
        console.log( typeof vehicleType);

      let result = await slotModel.find({ vehicleType: vehicleType, 
        isAvailable: true }).exec(); 
      // Fetch slots based on vehicleType and status
      console.log(result, "res");
      return result;
    } catch (error) {
      console.error('Error fetching slots from the database:', error);
      throw error;
    }
  }

async function updateSlot(slotId){
  const filter = {_id: slotId};
  const update = { $set: {isAvailable: false}}
  return await slotModel.updateOne(filter, update)

}

module.exports = {
    getAllSlots, updateSlot
};