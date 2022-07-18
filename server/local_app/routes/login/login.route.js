const app = require("express");
const router = app.Router();




const db = require("./../../..//db/db.js");
const userModal = require("./../..//models/user.model");

router.get("/", (req, res, next) => {
  res.render("login", { isSignUp: "false" });
});


router.get("/twitter/dashboard", (req, res, next) => {
  res.render("dashboard/twitterdashboard",{layout: false});
});



router.get("/chart", (req, res, next) => {
  console.log("route called");
  res.render("chart" );
});


router.get("/logout", (req, res, next) => {
  req.session.user=null;
  req.session.message = {
    type: "success",
    intro: "User Session",
    message: "User logged out successfully "
  };
  res.status(200).redirect('/')
  });

router.get("/dashboard", (req, res, next) => {
    let user=req.session.user;
    let listUsers;
    if(user){
        req.session.message = {
            type: "",
            intro: "",
            message: ""
          };
          
        res.render("dashboard/dashboard");
    }
    else{
res.redirect('/');
    }
   
  });

router.get('/socket',(req,res,next)=>{
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const sendRandomData = () => {
    const facebook = getRandomInt(50);
    const twitter = getRandomInt(50);
    const linkedin = getRandomInt(50);
    const news = getRandomInt(50);
    const instagram = getRandomInt(50);

  //   const data= [{
  //     "name": "Facebook ",
  //     "value": facebook,
  // }, {
  //     "name": "Twitter ",
  //     "value": twitter,
  // }, {
  //     "name": "Linked In ",
  //     "value": linkedin,
  // }, {
  //     "name": "News ",
  //     "value": news,
  // }, {
  //     "name": "Instagram ",
  //     "value": instagram,
  // },];

  
  const data= [facebook,twitter,linkedin,news,instagram,instagram];


   // const data = {facebook,twitter,linkedin,news,instagram};
     // data=JSON.parse(data);
    global.io.emit('news', data);
    console.log(data);
};

const interval = setInterval(sendRandomData, 1000);  
});
  

  


router.post("/login", (req, res, next) => {
  userModal.findOne({ email: req.body.email, password: req.body.password },(err, user) => {
      if (!err && user) {
        console.log("user found ");
        console.log(user);
        req.session.user=user;
        userModal.count({},(err,result)=>{
          console.log("query successfull")
          if(err){
            console.log(err);
          }
          else{
          
            console.log('UserList : '+result)
            res.render("./dashboard/dashboard",{user:user,message:{type:'success',intro:'Login',message:'Welcome '+user.name,},userList:result});
          }
         
      })
         
      } 
     
      
      else {
        console.log("error : " + err);
        req.session.message = {
            type: "danger",
            intro: "Log In",
            message: "Login attempt failed "
          };
        res.status(500).redirect('/');
      }
    }
  );
});

router.post("/signup", (req, res, next) => {
  let new_user_modal = new userModal({
    _id: new db.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  new_user_modal.save((err, user) => {
    if (!err) {
      console.log("user created ");
      console.log(JSON.stringify(user));
      req.session.message = {
        type: "success",
        intro: "Sign Up",
        message: "User created successfully"
      };
      // res.render('login',{isSignUp:'true',user:user});
      res.status(200).redirect("/");
    } else {
      console.log("error is "+err);
      req.session.message = {
        type: "warning",
        intro: "Sign Up",
        message: "User creation failed"
      };
      res.status(500).redirect("/");
    }
  });
});

// router.get('/',(req,res,next)=>{
//     let pyramid_chart= {
//         "instagram":10,
//         "linkedin":25,
//         "news":100,
//         "facebook":84,
//         "twitter":55,
//         }

// res.render('index',{pyramid_chart});
// });

// router.get('/ajax_loaded_pyramid_chart',(req,res,next)=>{
//     let pyramid_chart= {
//         "instagram":10,
//         "linkedin":25,
//         "news":100,
//         "facebook":84,
//         "twitter":55,
//         }

// res.json(pyramid_chart);
// });

// router.post('/login',(req,res)=>{
//     console.log("request recived ")
//     console.log(req.body);
//     });

module.exports = router;
