    const express = require('express');

    const router = express.Router();
    // const users = require('./users')
    const usermodel = require('./usermodels')
    const { genPassword, validPassword } = require ('./encrypt/password')

    // router.get('/', function(request,response){
    //     response.status(200).send("hello world")
    // })


    router.post("/login", async (request, response) =>{
        // console.log(request.body);
        const {email, password} = request.body
        console.log(email);
        // let userModel = new usermodel()
        let responseData = await usermodel.findOne({email})
        if (responseData) {
            
        
        const isValid =  validPassword(password, responseData.salt, responseData.hash)
        
        if (isValid) {
            
                response.status(200).send({ success: true, message:"successful"})
            }else {
                response.status(300).send ({ failure: true, message:"wrong username or password"})
            }
        } else {
            response.status(400).send ({goaway: true, message: "user doesn't exist"})
            
        }
         
        
        // let user = users.filter(res => res.username === username)
        // console.log(user);
        // response.send("login")
        // if (user.length >0){
        //     if(user [0].password === password){
        //         response.send({message:"login successfull"})
        //     }
        //     response.send("user or password is wrong")
        // }
        // else {
        //     response.send({message:"user does not exist"})
        // }
    })

    // router.get('/allusers', function(request,response){
    //     response.status(200).send(users)
    // })


    router.post('/signup', async (request,response) => {
        const { username, password, email } = request.body
        const saltHash = genPassword(password)
        const salt = saltHash.salt
        const hash =saltHash.hash 
      
        try{
            let newuser = new usermodel({ username, email, salt, hash})

             responseData =  await newuser.save()
             response.status(200).send({message:"you have successfully signed up. You can login now!!!", data: responseData})
        }catch (error){
            response.status(400).send({message:error})
        }
        console.log("new user added");
    })
    module.exports = router;