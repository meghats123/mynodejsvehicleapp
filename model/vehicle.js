const mongoose=require("mongoose");
const vehicleSchema=new mongoose.Schema(
    {
        vehicleno:{type:Number},
        manufacturename:{type:String},
        manufacturingyear:{type:Number},
        modelname:{type:String},
        ownername:{type:String},
        address:{type:String},
        phoneno:{type:Number},
        
});
var vehicleModel=mongoose.model('vehicles',vehicleSchema);
module.exports={vehicleModel}