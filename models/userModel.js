const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const usertSchema=mongoose.Schema({
    imagepath:{
        type:String
    },
    name:{
        required:[ true,"name required"],
        type:String
    },
    email:{
        required: [ true,"email required"],
        unique:true,
        type:String,
    },
    // phone:{
    //     required:[ true,"phone required"],
    //     unique:true,
    //     type:String,
    // },
    password:{
        required:[ true,"password required"],
        type:String,
        minLength:[6,"short password"]
    },
    token: { type: String },

},{
    timestamps:true
})
usertSchema.pre("save",async function(next){
    // if (!this.isModified("password"))return next()
this.password=await  bcrypt.hash(this.password,12)
    next();
});
module.exports=mongoose.model('users',usertSchema)