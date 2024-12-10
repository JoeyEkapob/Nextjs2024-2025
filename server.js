const express = require('express');
const app = express();
 const bodyParser = require('body-parser')

const { PrismaClient } = require('@prisma/client');
const { error } = require('console');
const { errorMonitor } = require('events');

const prisma = new PrismaClient()

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const bookController = require('./controllers/Bookcontroller')
const customerController =  require('./controllers/CustomerController')
dotenv.config();

const fileUpload =require('express-fileupload');
app.use(fileUpload());

app.use('/uploads',express.static('uploads'));

app.get('/customer/list',(req,res)=>customerController.list(req,res));
app.use('/book',bookController)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) 

const cors = require('cors')
app.use(cors())

function checksingin(req,res,next){
    try{
        const secret = process.env.TOKEN_SECRET
        const token = req.headers['authorization']
        const result = jwt.verify(token,secret)

        if (result != undefined){
            next();
        }
    }catch(e){
        console.log(e)
        res.status(500).send({error : e.message})
    }
}

app.get('/user/info',checksingin,(req,res,next)=>{
    try{
        res.send('hello back office user info')
    }catch(e){
        res.status(500).send({error:e})
    }
})

app.post('/testupload',(req,res)=>{
    try{
        const myFile = req.files.myFile;

        myFile.mv('./uploads/'+ myFile.name,(err)=>{
            if(err){
                res.status(500).send({error:err})
            }
        })
        res.send({message:'success'})
    }catch(e){
        res.status(500).send({error:e.message})
    }
})
app.post('/readflie',(req,res)=>{
    try{
        const fs = require('fs');
        fs.readFile('test.txt',(err,data)=>{
            if(err){
                throw err;
            }
            res.send(data)
        })
    }catch(e){
        res.status(500).send({error: e.message})
    }
})
app.post('/writefile',(req,res)=>{
    try{
        const fs = require('fs');
        fs.writeFile('test.txt','hello by joey',(err)=>{
            if(err){
                throw err;
            }
            res.send({message : 'success'})
        })
    }catch(e){
        res.status(500).send({error: e.message})
    }
})
app.post('/removefile',(req,res)=>{
    try{
        const fs = require('fs');
        fs.unlinkSync('test.txt')
            res.send({message : 'success'})
        
    }catch(e){
        res.status(500).send({error: e.message})
    }
})
app.post('/fileexists',(req,res)=>{
    try{
        const fs = require('fs');
        const found = fs.existsSync('package.json')
            res.send({found:found})
        
    }catch(e){
        res.status(500).send({error:e.message})
    }
})

app.post('/createpdf',(req,res)=>{
    try{
        const PDFDocument = require('pdfkit')
        const fs =  require('fs')
        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream('output.pdf'));

        doc
        .font('Kanit/Kanit-Medium.ttf')
        .fontSize(25)
        .text('สวัสดี',100,100);
        doc
        .addPage()
        .fontSize(25)
        .text('Here is some vector graphics...',100,100)
        doc.end()
        res.send({message:'success'})
    }catch(e){
        res.status(500).send({error:e.message})

    }
})

app.post('/readexcel',async (req,res)=>{
    try{
        const excel = require("exceljs")
        const wb = new excel.Workbook();
        await wb.xlsx.readFile("productExport.xlsx")
        const ws = wb.getWorksheet(1)

        for (let i = 1; i <= ws.rowCount; i++){
            const row = ws.getRow(i);
            const barcode = row.getCell(1).value
            const name = row.getCell(2).value
            const cost = row.getCell(3).value
            const sale = row.getCell(4).value
            const send = row.getCell(5).value
            const unit = row.getCell(6).value
            const point = row.getCell(7).value
            const producttypeid = row.getCell(8).value


            console.log(barcode,name,cost,sale,send,unit,point,producttypeid)
        }
        res.send({message:'success'})
    }catch(e){
        res.status(500).send({error:e.message})
    }
})
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

/* app.get('/book/list', async (req,res)=>{
    const data = await prisma.user.findMany();
    res.send({data:data})
}) */
    app.get('/book/list', async (req, res) => {
        try {
            const data = await prisma.book.findMany();
            res.send({ data: data });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Something went wrong' });
        }
    });
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
app.delete('/orderdetail/remove/:id', async (req,res)=>{
    try{
        await prisma.orderDetail.delete({
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

app.get('/book/findyearmonth', async(req,res)=>{
    try{
        const data = await prisma.book.findMany({
            where:{
                registerDate:new Date('2024-12-06')
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})
app.get('/book/yearmonth',async (req,res)=>{
    try{
        const data = await prisma.book.findMany({
            where:{
                registerDate:{
                    gte: new Date('2024-12-01'),
                    lte: new Date('2024-12-31')
                }
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})
app.get('/book/year',async (req,res)=>{
    try{
        const data = await prisma.book.findMany({
            where:{
                registerDate:{
                    gte: new Date('2024-01-01'),
                    lte: new Date('2024-12-31')
                }
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e})
    }
})
app.get('/user/createtoken', (req,res)=>{
    try{
        const secret = process.env.TOKEN_SECRET
        const payload = {
            id: 100,
            name: 'joey',
            level: 'admin'
        }
        const token = jwt.sign(payload,secret,{expiresIn:'1d'})

        res.send({token:token})
    }catch(e){
        res.status(500).send({error:e})
    }
})
app.get('/user/verifytoken',(req,res)=>{
    try{
        const secret = process.env.TOKEN_SECRET;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJuYW1lIjoiam9leSIsImxldmVsIjoiYWRtaW4iLCJpYXQiOjE3MzM2NzE5NzIsImV4cCI6MTczMzc1ODM3Mn0.KRU52iD8lAQ3ey5JYZIEvQuvnbq5VfJprE5nnoOJJXw'
        const result = jwt.verify(token,secret)

        res.send({result:result})
    }catch(e){
        res.status(500).send({error:e})
    }
})
app.get('/onetoone',async (req,res)=>{
    try{
        const data = await prisma.OrderDetail.findMany({
            include:{
                book:true
            }
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e.message})
    }
   
})
app.get('/onetomany',async (req,res)=>{
    try{
        const data = await prisma.book.findMany({
            include:{
                orderDetail:true,
            }
            
            
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e.message})
    }
   
})
app.get('/multimodel',async (req,res)=>{
    try{
        const data = await prisma.customer.findMany({
            include:{
                Order:{
                    include:{
                        orderDetail:true
                    }
                }
            }
            
            
        })
        res.send({result:data})
    }catch(e){
        res.status(500).send({error:e.message})
    }
   
})
app.listen(3001, () =>{
    console.log("sever on http://localhost:3001")
});