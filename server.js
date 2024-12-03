const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
 app.get('/',(req,res)=>{
    res.send('hello world test')
}) 
app.get('/hello/:name',(req,res)=>{
    res.send('hello' + req.params.name)
})

app.get('/hi/:name/:age',(req,res)=>{
    const name = req.params.name;
    const age = req.params.age;

   /*  res.send('name = ' + name + ' age = ' + age) */
    res.send(`name = ${name} age = ${age}`)
})

app.post('/hello',(req,res)=>{
    res.send(req.body)
})

app.put('/myput',(req,res)=>{
    res.send(req.body)
})
app.delete('/delete/:id',(req,res)=>{
    res.send('my delete id =' + req.params.id)
})
app.put('/updateCustomer/:id',(req,res)=>{
    const id = req.params.id;
    const data = req.body

   /*  res.send('id = ' + id +' data = '+ data) */
   res.send({id:id,data:data})
})

app.delete('/detele/:id', (req,res)=>{
    res.send('id = ' + req.params.id)
})

app.get('/book/list', async (req,res)=>{
    const data = await prisma.book.findMany();
    res.send({data:data})
})
app.post('/book/create', async (req,res)=>{
    const data = req.body;
    const result = await prisma.book.create({data:data})
    res.send({result:result})

})
app.listen(3001);