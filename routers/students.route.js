
const { postStudent, getStudent, getStudentById, updateStudent, deleteStudent } = require('../models/students.model')
const route=require('express').Router()
const jwt=require('jsonwebtoken')



var privateKey="ayaaya18"

verifyToken=(req,res,next)=>{
    let token=req.headers.authorization
    //let token=req.header('authorization')
    if(!token){
        res.status(400).json({msg:'access rejected...!!'})
    }

    try{
        let verif=jwt.verify(token,privateKey)
        next()
    }catch(err){
        res.status(400).json({msg:err})
    }
}



route.post('/addstudent', verifyToken, (req,res,next)=>{
    postStudent(req.body.fullname,req.body.email,req.body.age)
    .then((doc)=>res.json(doc))
    .catch((err)=>res.status(400).json(err))
})


route.get('/getstudents', verifyToken,  (req,res,next)=>{
    getStudent()
    .then((doc)=>res.status(200).send(doc))
    .catch((err)=>res.status(400).send(err))
})


route.get('/getstudent/:id',verifyToken, (req,res,next)=>{
    getStudentById(req.params.id)
    .then((doc)=>res.status(200).send(doc))
    .catch((err)=>res.status(400).send(err))
})


route.put('/updatestudent/:id',verifyToken, (req,res,next)=>{
    updateStudent(req.params.id,req.body.fullname,req.body.email,req.body.age)
    .then((doc)=>res.json(doc))
    .catch((err)=>res.status(400).json(err))
})


route.delete('/deletestudent/:id',verifyToken, (req,res,next)=>{
    deleteStudent(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})



module.exports=route