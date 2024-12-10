import { useEffect, useState } from "react";
import './hello.css'
import MyComponent from "./components/Mycomponent";
import dayjs from 'dayjs';
import axios from "axios";
import config from "./config";

function Hello(){
/* 
    const [name , setName] =useState('joey')
    const changeName = () =>{
        setName('Fewef')
    }
    return <>
    <div>Hello React by {name}
    <button onClick={changeName}>Click here</button>
    </div>
    </> */

    /* const [product,setProduct] = useState (['java','php','C#','react','node.js'])

    return <>
    {
        product.map(item => 
        <div> {item} </div>
    )}
    </> */
/* 
    const [product,setProduct] = useState (['java','php','C#','react','node.js'])

    return <>
    {product.length >0 ? <div>มีข้อมูลล</div> : <div>ไม่มีข้อมูล</div>}
    {product.map(item =>
        <div> {item}</div>
    )}
    </> */
/* 
    const [name,setName] = useState('')

    const showName = () =>{
        console.log(name)
    }

    return <>
    <input onChange={e => setName(e.target.value)} />
    <button onClick={showName}>
        Showname
    </button>
    </> */

    /* const [value,setvalue] = useState('100')

    return <>
     <select name="" id="" onChange={e=>setvalue(e.target.value)}>
        <option value="100">JAVA</option>
        <option value="200">PHP</option>
        <option value="300">Node.js</option>
     </select>
     <div>{value}</div>
    </> */
   /* const [value,setvalue] = useState()

   return <>
   <input type="checkbox" onClick={e => setvalue(e.target.value)} /> Agree
   {value ? <div>Checked</div> : <div>unchecked</div>}
   </> */

   /* const [items,setItems] = useState([])

   useEffect(()=>{
    console.log('start page')
   },[])

   return <>
   <div>useEffect example</div>
   </> */


   /* const [items,setItems] = useState([])

   useEffect(()=>{
    console.log('start page')
   },[items])

   const newitem = () =>{
    setItems(['1,3,5,7,9'])
   }
   return <>
   <div>useEffect example</div>
   <button onClick={newitem}>Add Item</button>
   </> */

   /* return
   <>
    <div style={{backgroundColor:'red',color:'white',padding:'20px',}}>Hello</div>
   </> */

   /* return<> */
   {/*  <div style={{backgroundColor:'red',color:'white',padding:'20px',}}>hello</div> */}
   {/*  <div className="bg-danger text-white p-4 h4"><i className="fa fa-home"></i>hello</div>
    <MyComponent name='Joey' />
   </> */}


    /* const [name , setName] = useState('');
    const [email,setEmail] = useState('');
    const [user,setUser] = useState({})

    const handsingin = () =>{
        console.log(user)
    }
    return<>
    <div className="container p-5">
        <div>Name</div>
        <input type="text" className="form-control" onChange={e => setUser({...user,name : e.target.value})} />

   
    <div className="mt-3">
        <div>Email</div>
        <input type="text" className="form-control" onChange={e => setUser({...user,email : e.target.value})} />
    </div>
    <button className="btn btn-primary mt-3" onClick={handsingin}><i className="fa fa-check mr-2"></i> Sing in</button>
    </div>
    </> */

    /* const [income,setIncome] = useState(10000);

    return <>
        <div>{income.toLocaleString('th-TH')}</div>
    </> */

    /* const [payDate,setPayDate] = useState(new Date())

    return <>
    <div>{dayjs(payDate).format('DD/MM/YYYY')}</div>
    </> */
/* 
    const  getmethod = async () =>{
        try{ */
           /*  await axios.get('http://localhost:3001/user/info',{
                headers:{
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJuYW1lIjoiam9leSIsImxldmVsIjoiYWRtaW4iLCJpYXQiOjE3MzM4NDE1NTgsImV4cCI6MTczMzkyNzk1OH0.acRZv3Q61R27moKBO3oyud8i9zHk_DJ0795iKAItvro'
                }
            }); */
        /*     await axios.get(config.apiPath +'/user/info',config.headersValue)
        }catch(e){
            console.log(e)
        }

    } */
/* 
    return <>
    <div>
        <button className="btn btn-primary" onClick={getmethod}> Call Api</button>
    </div>
    </> */

    const [fileselected,setfileselected] = useState({})

    const selectedfile = (fileinput) =>{
        if(fileinput !== undefined){
            if(fileinput.length>0){
                setfileselected(fileinput[0])
            }
        }
    }
    const uploadfile = async () =>{
        try {
            const formdata = new FormData();
            formdata.append('myFile',fileselected)

            await axios.post(config.apiPath +'/testupload/',formdata,{
                header:{
                    'Content-Type':'multipart/form-data'
                }
            })
        }catch(e){
            console.log(e)
        }
    }
    return<>
    <div>
        <input type="file" onChange={e=>selectedfile(e.target.files)} />
        <button className="btn btn-primary" onClick={uploadfile}> Upload Now</button>
    </div>
    </>
}

export default Hello;