const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const { PrismaClient } = require('@prisma/client');
const { error } = require('console');
const e = require('express');
const { errorMonitor } = require('events');

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
app.post('/book/createManual', async (req,res)=>{
    const result = await prisma.book.create({
        data:{
            isbn:'1002',
            name: 'PHP',
            price:850
        }

    })

    res.send({result:result})
})

app.put('/book/updata/:id', async (req,res)=>{
    try{
        await prisma.book.update({
            data: { 
                isbn:'10022',
                name:'test updata',
                price:1000
            },
            where:{
                id:parseInt(req.params.id)
            }
        })
        res.send({message:'success'})
    }catch(e){
        res.status(500).send({error:e })
    }
})

app.delete('/book/remove/:id', async (req,res)=>{
    try{
        await prisma.book.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.send({message:'success'})
    }catch(e){
        res.status(500).send({error:e})
    }
})

app.post('/book/searh/',async (req,res)=>{
    try{
        const keyword =req.body.keyword;
        const data = await prisma.book.findMany({
            where:{
                name:{
                    contains:keyword
                }
            }
           
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})

app.post('/book/startwith',async(req,res)=>{
    try{
        const keyword =req.body.keyword;
        const data = await prisma.book.findMany({
            where:{
                name:{
                    startsWith:keyword
                }
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})

app.post('/book/endwith', async (req,res)=>{
    try{
        const keyword = req.body.keyword;
        const data = await prisma.book.findMany({
            where:{
                name:{
                    endsWith:keyword
                }
               
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})

app.get('/book/orderBy',async(req,res)=>{
    try{
        const data = await prisma.book.findMany({
            orderBy:{
                price:'desc'
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})
app.get('/book/gt',async (req,res)=>{
    try{
        const data = await prisma.book.findMany({
            where:{
                price:{
                    gt:900
                }
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})
app.get('/book/lt',async (req,res)=>{
    try{
        const data = await prisma.book.findMany({
            where:{
                price:{
                    lt:900
                }
            }
        })
        res.send({reults:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})
app.get('/book/notNull', async (req,res)=>{
    try{
        const data = await prisma.book.findMany({
            where:{
                detail:{
                    not:null

                }
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})
app.get('/book/isnull',async (req,res)=>{
    try{
        const data = await prisma.book.findMany({
            where:{
                detail:null
            }
        })
        res.send({result:data})
    }catch(e){
        console.log(e)
        res.status(500).send({error:e})
    }
})

app.get('/book/between',async (req,res)=>{
    try{
        const data = await prisma.book.findMany({
            where:{
                price:{
                    lte:1500,
                    gte:900
                }
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})
app.get('/book/sum',async (req,res)=>{
    try{
        const data = await prisma.book.aggregate({
            _sum:{
                price:true
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }

})
app.get('/book/max',async(req,res)=>{
    try{
        const data = await prisma.book.aggregate({
            _max:{
                price:true
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})

app.get('/book/avg',async(req,res)=>{
    try{
        const data = await prisma.book.aggregate({
            _avg:{
                price:true
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})
app.listen(3001, () =>{
    console.log("sever on http://localhost:3001")
});