const express = require('express')
const { route } = require('./routers/students.route')

const app= express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.setHeader('Access Control Allow Origin','*')
    res.setHeader('Access Control Request Method','*')
    res.setHeader('Access Control Allow Headers','*')
    next()
})




app.use('/',route)

app.listen(3000, ()=>{
    console.log('port is listining')
})