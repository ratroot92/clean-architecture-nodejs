
const db=require('./../..//db/db.js');
const userModal=require('./../..//local_app/models/user.model');
const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');

const SECRETKEY ='asd';


const verfiyTheToken=(req,res,next)=>{
    //getting token from headers 
    console.log(req.headers);
    const bearer=req.headers["authorization"];
    if(bearer){
       
        const bearerToken=bearer.split(" ");
        console.log(bearerToken[1]);
        const token=bearerToken[1]
        jwt.verify(token,SECRETKEY,(err,data)=>{
            if(err){
                console.log(err);
                res.sendStatus(403);
    
            }
            else{
                req.verifiedUserData=data;
                next();
            }
        });
    }
    else{
        console.log("verifyToken bearer failed");
        res.sendStatus(403);
    }
   
}


router.get('/users',verfiyTheToken,(req,res,next)=>{
    console.log("****************************************************")
    console.log("route called : ' api/login/users ' &&  request body is  : ")
    console.log("----------------------------------------------------")
    console.log(req.body);
    console.log("----------------------------------------------------")
    console.log("******************token verified********************")
userModal.find({},(err,result)=>{
    if(!err){
           

        let io = app.get("io");
              console.log(result);
             // res.json({
              //  status: 200,
              //  userList: result,
              //  message: "success",
               // info: "list of all users "
            //  });
            }
    else{
        res.sendStatus(403);
    }
   
})
});





router.post('/',(req,res,next)=>{
    console.log("****************************************************")
    console.log("route called : ' api/login ' &&  request body is  : ")
    console.log("----------------------------------------------------")
    console.log(req.body);
    console.log("----------------------------------------------------")
    console.log("******************token sent************************")
    userModal.findOne({email:req.body.email,password:req.body.password},(err,result)=>{
      if(err){
        res.json({error:err,status:500,message:'failure',info:'internal server error / query error'})
       
      }
      else if(result){
          jwt.sign({result},SECRETKEY,(err,token)=>{
              if(err){
                  res.sendStatus(403);
              }
              else{
                res.json({token,status:200,message:'success',info:'user validated'})
              }
          })
      
      }
       else{
        res.json({status:401,message:'failure',info:'user unathorized'})
       }
    })


});




module.exports=router;