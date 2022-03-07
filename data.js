const jwt=require("jsonwebtoken")
const db = require('./service/db')

const register=(id,name,age) =>{

    return db.User.findOne({id}).then(user =>{
        //console.log(user)
        if(user){
            return{
                statuscode:401,
                message:"user already exist"
            }
        }
        else{
            const newUser = new db.User({id,name,age})
            newUser.save()
            return{
                statuscode:200,
                message:"added",
            }
        }
    })
}

const login=(id,name) => {
    return db.User.findOne({id}).then(user =>{
        //console.log(user)
        //console.log(user.id)
        if(user){
            if(user.name == name){
                const cid = id
                const cname = user.name
                const token = jwt.sign({cid:id},'mysecretkey@098')
                return{
                    statuscode:200,
                    message: "login success..",
                    cid,
                    cname,
                    token
                }
            }
            else{
                return{
                    statuscode:401,
                    message: "invalid name!!!"
                }
            }

        }
        else{
            return{
                statuscode:404,
                message: "invalid user id!!!"
            }
        }

    })

}

const display = (id, uname) =>{
    return db.User.findOne({id}).then(cuser => {
        if(cuser){
            if(cuser.name == uname){
                console.log("cuser: "+cuser)
                const id = cuser.id
                const name = cuser.name
                const age = cuser.age
                return{
                    statuscode : 200,
                    message : cuser,
                    id,
                    name,
                    age
                }
            }
            else{
                return{
                    statuscode:400,
                    message:'invalid name'
                }
            }
        } 
        else{
            return{
                statuscode: 404,
                message: 'no such user'
            }
        }   
    })
}

const update = (id, uname, age) =>{
    return db.User.findOneAndUpdate({id},{$set:{"age":age}}).then(cuser => {
        cuser.save()
        if(cuser){
            if(cuser.name == uname){
                return{
                    statuscode : 200,
                    message : "updated",
                    id,
                    uname,
                    age
                }
            }
            else{
                return{
                    statuscode:400,
                    message:'invalid name'
                }
            }
        } 
        else{
            return{
                statuscode: 404,
                message: 'no such user'
            }
        }   
    })
}

const deleteuser = (id)=>{
    return db.User.deleteOne({id}).then((cuser) => {
        console.log(cuser)
        if(cuser){
            return{
                statuscode : 200,
                message:'Account Deleted'
            }
        }
        else{
            return{
                statuscode : 401,
                message : "Operation Denied" 
            }
        }
    })
}

module.exports={
    register,
    login,
    display,
    update,
    deleteuser
}









// users={
//     1000:{"id":1000,"name":"abc","age":27},
//     1001:{"id":1001,"name":"def","age":29},
//     1002:{"id":1002,"name":"ghi","age":26}
// }

// const register=(id,name,age) =>{

//     if(id in users){
//         return{
//             statuscode:401,
//             message:"already exist"
//         }
//     }
//     else{
//         users[id]={id,name,age}
//         return{
//             statuscode:200,
//             message:"added",

//         }

//     }
// }

// const login=(id,uname) => {
//     if(id in users){
//         if(uname == users[id].name){
//             const token = jwt.sign({cid:id},'mysecretkey@098')
//             return{
//                 statuscode:200,
//                 message: "login success..",
//                 token
//             }
//         }
//         else{
//             return{
//                 statuscode:401,
//                 message: "invalid name!!!"
//             }
//         }
//     }
//     else{
//         return{
//             statuscode:404,
//             message: "invalid user!!!"
//         }
//     }
// }

// const display = (id, uname) =>{
//     if(id in users){
//         if(uname == users[id].name){
//             return{
//                 statuscode:200,
//                 message: users[id],
    
//             }
//         }
//         else{
//             return{
//                 statuscode:400,
//                 message:'invalid name'
//             }
            
//         }
        
//     }
//     else{
//         return{
//             statuscode: 404,
//             message: 'no such user'
//         }
//     }
// }