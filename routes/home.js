const { randomInt } = require("crypto")
const express=require("express")
const router=express.Router()


router.get('/',(req,res)=>{
    res.send("I am inside home")
})

router.get('/hello',(req,res)=>{
    res.send("I am inside hello")
})

module.exports=router