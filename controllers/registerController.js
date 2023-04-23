const userModel=require("../models/userModel");
const mongoose=require('mongoose');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const storeUser=(req,res,next)=>{

    // const { image } = req.files;
    //
    // // If no image submitted, exit
    // if (!image) return res.sendStatus(400);
    //
    // // If does not have image mime type prevent from uploading
    // if (/^image/.test(image.mimetype)) return res.sendStatus(400);
    //
    // // Move the uploaded image to our upload folder
    // image.mv(__dirname + '/upload/' + image.name);
    //
    // // All good
    // // res.sendStatus(200);
    // res.status(201).json({"staus":true,"data":image.name})



    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var imagepath="safdsafsaf";
    var password=req.body.password;

    userModel.create({name,phone,email,imagepath,password}).then((data)=>{
        var token = jwt.sign(
            { user_id: data._id },
            "mohamed2562289mbn",
            {
                expiresIn: "2h",
            }
        );
        data["token"]=token;
        console.log(data)
        res.status(201).json({"staus":true,"data":data})
    }).catch((err)=>{
        res.status(400).json({"staus":false,"data":err})
    })
}
const updateUser=(req,res)=>{
    var id=req.body.id
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    userModel.findByIdAndUpdate({_id:id},{name:name,phone:phone,email:email}).then((data)=>{
        res.status(201).json({"staus":true,"data":data})
    }).catch((err)=>{
        res.status(400).json({"staus":false,"error":err})
    })
}
const updatePassword=async (req,res)=>{
    var id=req.body.id
    var passwordUpdate=await bcrypt.hash(req.body.passwordUpdate,12);


    userModel.findByIdAndUpdate({_id:id},{password:passwordUpdate}).then((data)=>{
        res.status(201).json({"staus":true,"data":data})
    }).catch((err)=>{
        res.status(400).json({"staus":false,"error":err})
    })
}
const login = (req,res) => {
 var email= req.body.email
    userModel.findOne({email}).then(async (data)=>{
       var password= await bcrypt.compare(req.body.password,data.password)
        if (password){
            const token = jwt.sign(
                { user_id: data._id },
                "mohamed2562289mbn",
                {
                    expiresIn: "2h",
                }
            );
            data.token=token
            res.status(201).json({"staus":true,"data":data})

        }else{
            res.status(400).json({"staus":false,"data":"البيانات غير متطابقة"})
        }

    }).catch((err)=>res.status(500).json({"staus":false,"data":"dfgfd"}))

}
const profile=(req,res)=>{
    var id=req.params.id
    console.log(id);
    userModel.findOne({_id:id}).then((data)=>{
        res.status(201).json({"staus":true,data,})

    }).catch((err)=>{
        res.status(201).json({"staus":false,"data":"err",})
    })

}


module.exports={
    storeUser,
    updateUser,
    updatePassword,
    login,
    profile
}