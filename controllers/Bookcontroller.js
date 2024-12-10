
const express = require('express')
const book = express.Router();


book.get('/list2',(req,res)=>{
    res.send('hello book list')
})

book.post('/upload',(req,res)=>{
    try{
        const myfile = req.files.myFile;

        myfile.mv('./uploads/'+ myfile.name,(err)=>{
            if(err){
                res.status(500).send({error:err})
            }
        })
        res.send({message:'success'})
    }catch(e){
        res.status(500).send({error:e.me})
    }
})
module.exports = book;