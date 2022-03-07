const express=require('express')
const fun=require('./data')
const jwt=require('jsonwebtoken')
const app=express()
const cors = require('cors')
app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200'
}))

//jwtmiddleware to validate token

const jwtmiddleware = (req,res,next) =>{
    try{
        //const token = req.body.token
        const token = req.headers['x-access-token']
        const data = jwt.verify(token,'mysecretkey@098')
        //req.cid = data.cid
        next()
    }
    catch{
        res.json({
            statuscode:404,
            message: 'pls login..'
        })
        
    }
}

app.post('/register',async (req,res) => {
        try{
            const result = await fun.register(req.body.id, req.body.name, req.body.age)
            res.status(result.statuscode).json(result).send()
        }catch(error){
            res.status(500)
        }
        //console.log(req.body)
        // fun.register(req.body.id, req.body.name, req.body.age).then(result =>{
        //     res.status(result.statuscode).json(result)  
        // })
})

app.post('/login',(req,res) => {
    //console.log(req.body)
    fun.login(req.body.id, req.body.name).then(result =>{
        res.status(result.statuscode).json(result)
    })
    
})

app.post('/display',jwtmiddleware,(req,res) =>{
    fun.display(req.body.id,req.body.name).then(result =>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/update',jwtmiddleware,(req,res) =>{
    fun.update(req.body.id,req.body.name,req.body.age).then(result =>{
        res.status(result.statuscode).json(result)
    })
})

app.delete('/delete',jwtmiddleware,(req,res) =>{
    fun.deleteuser(req.body.id).then(result =>{
        res.status(result.statuscode).json(result)
    })
})

// app.get('/display',jwtmiddleware,(req,res) =>{
//     fun.display(req.body.id,req.body.name).then(result =>{
//         res.status(result.statuscode).json(result).send()
//     })
// })

app.listen(3000,()=>{
    console.log("server is up")
})





















// app.post('/register',(req,res) => {
//     const result=fun.register(req.body.id, req.body.name, req.body.age)
//     console.log(req.body)
//     console.log(result)
//     res.status(result.statuscode).json(result)
//     //res.send(result.message)
// })


// app.post('/login',(req,res) =>{
//     const result=fun.login(req.body.id, req.body.name)
//     res.status(result.statuscode).json(result)
//     //res.json(result)
//     //res.send(result.message)
// })
// app.put('/login',(req,res) =>{
//     const result=fun.login(req.body.id, req.body.name)
//     res.status(result.statuscode).json(result)
//     //res.json(result)
//     //res.send(result.message)
// })
// app.get('/display',jwtmiddleware,(req,res) =>{
//     const result=fun.display(req.body.id,req.body.name)
//     res.status(result.statuscode).json(result)
// })

// app.post('/display',jwtmiddleware,(req,res) =>{
//     const result=fun.display(req.body.id,req.body.name)
//     res.status(result.statuscode).json(result)
// })

