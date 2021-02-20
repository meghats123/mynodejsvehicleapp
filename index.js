const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
var {vehicleModel}=require("./model/vehicle")
var app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb+srv://megha:test123@cluster0.crp2x.mongodb.net/bookdb?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
app.post('/vehicleadd',async(req,res)=>{
    try{
        var data=req.body;
        var vehicleData=new vehicleModel(data);
        var result=await vehicleData.save();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error)

    }

})
app.get("/viewall",async(req,res)=>{
    try{
        var result=await vehicleModel.find().exec();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error)

    }
})
app.post("/search",(req,res)=>{
    try{
        vehicleModel.find(req.body,(error,data)=>{
            if(error){
                throw error;
            }
            else{
                res.json(data)
            }
        })

    }
    catch(error){
        res.status(500).send(error)

    }
})
app.post("/delete",async(req,res)=>{
    try{
        vehicleModel.findByIdAndDelete(req.body.id,(error,data)=>{
            if(error){
                res.send(error)
            }
            else{
                res.json({'status':'success'})
            }
        })

    }
    catch{
        res.status(500).send(error)

    }
})
app.post("/update",async(req,res)=>{
    try{
        vehicleModel.findByIdAndUpdate(req.body.id,
            {
                vehicleno:req.body.vehicleno,
                manufacturename:req.body.manufacturename,
                manufacturingyear:req.body.manufacturingyear,
                modelname:req.body.modelname,
                ownername:req.body.ownername,
                address:req.body.address,
                phoneno:req.body.phoneno,
            },(error,data)=>{
                if(error){
                    throw error
                }
                else{
                    res.json({'status':'success'})
                }
            })
            

    }
    catch(error){
        res.status(500).send(error) 
    }
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Your node js server is running")
})
