


const app=require('express');
const router=app.Router();


router.get('/',(req,res)=>{
res.render('signup');
});



router.post('/login',(req,res)=>{
    console.log("request recived ")
    console.log(req.body);
    });



module.exports=router;