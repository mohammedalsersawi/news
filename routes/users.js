const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMeddleware");
const validator=require('../middleware/validatoMiddlewere')
const { param,body,check, validationResult } = require('express-validator');
const register=require("../controllers/registerController")
const userModel=require("../models/userModel");
const bcrypt = require('bcrypt');
/* GET users listing. */
router.post('/regester',
    check('name').notEmpty().withMessage('name required').isLength({min:1,max:25}).withMessage('bettwen 3,25'),
    check('email').notEmpty().withMessage('email required').isEmail().withMessage('Invalid email address').
   custom((val)=>
        userModel.findOne({email:val}).then((data)=> {
            if (data) {
                return Promise.reject(new Error("email already in user"))
            }
        })
    ),
    // body('phone').notEmpty().withMessage('phone required').
    // custom((val)=>
    //     userModel.findOne({phone:val}).then((data)=>{
    //         if(data){
    //             return Promise.reject(new Error("phone already in user"))
    //         }
    //     })
    // ),
    body('password').notEmpty().withMessage('password required').isLength({min:6,max:25}).
    custom((password,{req})=>{
     // if (password !== req.body.passwordConfaim){
     //     console.log(req.body.passwordConfaim)
     //     console.log(password)
     //
     //     throw new Error("Password Conformation incorrect")
     // }
     return true
    }),
    // body('passwordConfaim').notEmpty().withMessage('password required').isLength({min:6,max:25}),

validator,register.storeUser);

router.post("/update",
    body('name').notEmpty().withMessage('name required').isLength({min:1,max:25}).withMessage('bettwen 3,25'),
    body('email').notEmpty().withMessage('email required').isEmail().withMessage('Invalid email address'),
    body('phone').notEmpty().withMessage('phone required')
    ,validator,register.updateUser)

router.post('/changePassword',
    body('passwordold').notEmpty().withMessage('password required').isLength({min:6,max:25}).withMessage("password must 3-25").
    custom( async(passwordold,{req})=>{
        console.log(passwordold)

            const data=await userModel.findById({_id:req.body.id});
            const p=await bcrypt.compare(req.body.passwordold,data.password)
        if (!p){
            throw new Error("Password  incorrect")

        }

        }

    ),

body('passwordUpdate').notEmpty().withMessage('password required').isLength({min:6,max:25}).
    custom((password,{req})=>{
        if (password !== req.body.passwordConfaim){
            console.log(req.body.passwordConfaim)
            console.log(password)

            throw new Error("Password Conformation incorrect")
        }
        return true
    }),
    body('passwordConfaim').notEmpty().withMessage('password required').isLength({min:6,max:25}),validator,register.updatePassword)

router.post("/login",
    body('password').notEmpty().withMessage('password required').isLength({min:6,max:25}).withMessage("password must 3-25"),
    body('email').notEmpty().withMessage('email required').isEmail().withMessage('Invalid email address').
    custom((val)=>
        userModel.findOne({email:val}).then((data)=> {
            if (!data) {
                return Promise.reject(new Error("email already in user"))
            }
        })
    )
    ,validator,register.login)

router.get("/profile/:id",auth,register.profile);
module.exports = router;
